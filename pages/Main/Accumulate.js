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
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useIsFocused } from '@react-navigation/native';

// import
import CustomStatusBar from '../../components/CustomStatusBar';
import request from '../../utils/request';
import CustomLabelInput from '../../components/CustomLabelInput';

const Accumulate = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [textScan, setTextScan] = useState(null);
    const [score, setCore] = useState(0);
    //
    const [plusScore, setPlusScore] = useState(0);

    // console.log(exits);

    const isFocused = useIsFocused();
    const idUserFake = '62bac5a1e3a866f3b6d758e7';

    useEffect(() => {
        const fetchData = async () => {
            const res = await request.get('point/get_all');
            const data = res && res.data.data ? res.data.data : [];
            setCore(data.length);
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
                setCore((scorePrev) => scorePrev + 1);
                Alert.alert('Quét mã tích điểm thành công. Bạn được cộng 50 điểm');
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
        // fetData(data);
        setScanned(true);
        setTextScan(data);
        handleFetchCodeScanner(data);
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

            <View style={styles.container}>
                <View>
                    <Image
                        source={require('../../assets/img/logo.png')}
                        style={{ width: 130, height: 130, marginBottom: 20 }}
                    />
                </View>
                <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                    <Text style={styles.text_score}>Hiện tại điểm của bạn là : </Text>
                    <Text
                        style={[styles.text_score, { fontWeight: '500', color: 'red' }]}>
                        {score * 50}
                    </Text>
                    <Text style={styles.text_score}> Điểm</Text>
                </View>
                <View style={styles.barcodebox}>
                    {isFocused ? (
                        <BarCodeScanner
                            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                            style={{ height: 400, width: 400 }}
                        />
                    ) : null}
                </View>
                <Text style={styles.maintext}>{textScan}</Text>

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
        paddingTop: 10,
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
        // marginTop: 20,
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
