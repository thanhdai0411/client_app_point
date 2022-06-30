import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    Linking,
    Image,
    Alert,
    TextInput,
    Keyboard,
} from 'react-native';
import React, { useState, useEffect, useInsertionEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useIsFocused } from '@react-navigation/native';

// import
import CustomStatusBar from '../../components/CustomStatusBar';
import request from '../../utils/request';
import CustomLabelInput from '../../components/CustomLabelInput';
import ButtonCustom from '../../components/Button';

const Accumulate = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [textScan, setTextScan] = useState(null);
    const [scoreUser, setScoreUser] = useState(0);
    const [scoreIntroduce, setScoreIntroduce] = useState(0);
    const [number, setNumber] = useState('');
    const isFocused = useIsFocused();

    //========================================

    const idUserFake = '62bd071706b5d8bca5a8ab16'; // Thanh Dai scanner
    const phoneUserIntroduce = '0123456789';
    //setting add coin
    const settingAccumulate = {
        user: 500,
        introduced: 300,
    };

    //========================================

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res_1 = await request.get(`user/get_id/${idUserFake}`);
                const res_2 = await request.get(`user/get_phone/${phoneUserIntroduce}`);
                const data_1 = res_1 && res_1.data.data ? res_1.data.data : [];
                const data_2 = res_2 && res_2.data.data ? res_2.data.data : [];
                // console.log({ data_1, data_2 });
                const presentNumberPointUser = data_1.number_point;
                const presentNumberPointIntroduce = data_2.number_point_introduce;

                setScoreUser(presentNumberPointUser);
                setScoreIntroduce(presentNumberPointIntroduce);
            } catch (err) {
                console.log({ error_fetch_data_start: err });
            }
        };
        fetchData();
    }, []);

    const handleFetchCodeScanner = async (data) => {
        let codeScan = {
            userID: idUserFake,
            code_scanner: data,
        };

        try {
            const res = await request.post('point/add', codeScan);

            if (res.data.success) {
                // post point
                /**
                 *1. cong 500 ng ủe, cong 300 người git
                 *
                 */
                setScoreUser((prev) => prev + settingAccumulate.user);
                setScoreIntroduce((prev) => prev + settingAccumulate.introduced);

                const postPointIntroduce = async () => {
                    const pointIntroducePost =
                        scoreIntroduce + settingAccumulate.introduced;
                    const pointUserPost = scoreUser + settingAccumulate.user;

                    try {
                        const res_1 = await request.put(
                            `user/add_number_point_id/${idUserFake}`,
                            { number_point: pointUserPost }
                        );
                        const res_2 = await request.put(
                            `user/add_number_point_phone/${phoneUserIntroduce}`,
                            { number_point_introduce: pointIntroducePost }
                        );
                        if (res_1.data.success && res_2.data.success) {
                            Alert.alert(
                                'Quét mã tích điểm thành công. Bạn được cộng 500đ. Bạn của bạn được 300đ'
                            );
                        }
                    } catch (err) {
                        console.log({ error_post_point: err });
                    }
                };
                postPointIntroduce();

                // end post point
            } else {
                Alert.alert('Quét mã tích điểm không thành công. Do mã đã qua sử dụng');
            }
        } catch (error) {
            console.log(error);

            if (error.res.data) return error.res.data;
            else return { success: false, message: error.message };
        }
    };

    //
    const askPermissionCamera = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    };

    useEffect(() => {
        askPermissionCamera();
    }, []);

    const handleBarCodeScanned = ({ type, data, bounds }) => {
        setScanned(true);
        setTextScan(data);
        handleFetchCodeScanner(data);
    };
    // phone number
    const handleNumberPhone = () => {
        console.log(number);
        const fetchUser = async () => {
            const res = await request.get(`user/get_phone/${number}`);
            const data = res && res.data ? res.data.data : [];
            if (res.data.data.length > 0) {
                Alert.alert(`Số điện thoại ${number} nhập thành công `);
            } else {
                Alert.alert(`Số điện thoại ${number} không tồn tại `);
            }
        };
        fetchUser();
    };

    const openSettingCamera = () => {
        Linking.openSettings();
    };

    if (hasPermission === false) {
        return (
            <>
                {isFocused ? <CustomStatusBar barStyle="dark-content" /> : null}

                <View style={styles.container_open_setting}>
                    <View style={styles.text_open}>
                        <View>
                            <Image
                                source={require('../../assets/img/logo.png')}
                                style={{ width: 130, height: 130, marginBottom: 20 }}
                            />
                        </View>
                        <Text
                            style={{
                                margin: 10,
                                textAlign: 'center',
                                fontSize: 25,
                                fontWeight: '500',
                            }}>
                            Chưa bật camera
                        </Text>
                        <Text
                            style={{
                                textAlign: 'center',
                                marginBottom: 20,
                                fontSize: 17,
                            }}>
                            Để quét QR, trước tiên cần phải bật camera trong phần cài đặt
                            của ứng dụng
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.buttonOpenSetting}
                        onPress={openSettingCamera}>
                        <Text
                            style={{
                                fontSize: 19,
                                color: 'white',
                                fontWeight: '500',
                            }}>
                            Vào cài đặt ngay
                        </Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    }

    return (
        <>
            {isFocused ? <CustomStatusBar barStyle="dark-content" /> : null}

            <View
                style={{
                    flex: 1,
                    backgroundColor: color_screen_scan,
                    alignItems: 'center',
                    paddingTop: 50,
                    // justifyContent: 'center',
                }}>
                <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                    <Text
                        style={[styles.text_score, { fontWeight: '500', color: 'red' }]}>
                        Intro: {scoreIntroduce} - User: {scoreUser}
                    </Text>
                </View>
                <View style={styles.barcodebox}>
                    {isFocused && !scanned ? (
                        <BarCodeScanner
                            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                            style={{ height: 400, width: 400 }}
                        />
                    ) : null}
                </View>

                {/* <Text style={styles.maintext}>{textScan}</Text> */}
                {scanned && (
                    <TouchableOpacity
                        style={styles.buttonOpenSetting}
                        onPress={() => setScanned(false)}>
                        <Text style={{ fontSize: 19, color: 'white', fontWeight: '500' }}>
                            Scan Again
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </>
    );
};

let color_button = 'orange';
let color_screen_scan = '#fff';

const styles = StyleSheet.create({
    container_open_setting: {
        flex: 1,
        backgroundColor: color_screen_scan,
        alignItems: 'center',
        paddingTop: 90,
        // justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 50,
        // justifyContent: 'center',
    },
    maintext: {
        fontSize: 17,
        margin: 17,
    },

    barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        borderWidth: 4,
        borderColor: 'black',
        backgroundColor: 'tomato',
    },
    buttonOpenSetting: {
        alignItems: 'center',
        backgroundColor: color_button,
        paddingHorizontal: 50,
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    text_open: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 30,
    },
    text_score: {
        fontSize: 17,
    },
});

export default Accumulate;
