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
    ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect, useInsertionEffect } from 'react';
import { BarCodeScanner, requestPermissionsAsync } from 'expo-barcode-scanner';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

// import
import CustomStatusBar from '../../components/CustomStatusBar';
import request from '../../utils/request';
import CustomLabelInput from '../../components/CustomLabelInput';
import ButtonCustom from '../../components/Button';
import { pointSelector, globalPoint } from '../../redux/reducers/pointSlice';
import { userSelector, getUserDB } from '../../redux/reducers/userSlice';
import ModalLoading from '../../components/ModalLoading';

const Accumulate = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [textScan, setTextScan] = useState(null);
    const [scoreUser, setScoreUser] = useState(0);
    const [scoreIntroduce, setScoreIntroduce] = useState(0);
    const [scoreUserIntroduce, setScoreNumberUserIntroduce] = useState(0);

    const [number, setNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [isSettingAccumulate, setSettingAccumulate] = useState([]);
    const isFocused = useIsFocused();

    const { info_user } = useSelector(userSelector);

    // redux
    const dispatch = useDispatch();

    //========================================

    const idUserScan = info_user._id;

    const phoneUserIntroduce = info_user.number_phone_presenter;

    // console.log({ scoreUser, scoreIntroduce, scoreUserIntroduce });

    //========================================

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res_3 = await request.get(`point_setting/get_all`);
                const data_3 = res_3 && res_3.data.data ? res_3.data.data : [];

                setSettingAccumulate(data_3);
            } catch (err) {
                console.log({ error_fetch_point_setting: err });
            }
        };
        fetchData();
    }, []);

    let arr = [];
    isSettingAccumulate.forEach((settingAccumulate) => {
        arr.push(settingAccumulate.prefix);
    });

    const handleFetchCodeScanner = (data) => {
        let regexp = /[a-z]/gi;
        let qrScan = data.match(regexp).join('');

        // let result = arr.includes(qrScan);
        let result = arr.find((item) => item == qrScan);

        if (result) {
            let codeScan = {
                userID: idUserScan,
                phoneUserIntroduce,
                code_scanner: data,
                prefix_scan: result,
            };
            setIsLoading(true);
            (async () => {
                const res = await request.post('point/add', codeScan);
                const { success, user, point, message } = res.data;

                if (success) {
                    if (user === 'both') {
                        const htrUser = {
                            user_id: idUserScan,
                            accumulate_point: point.user,
                        };

                        const htrIntroducer = {
                            phone_number: phoneUserIntroduce,
                            donate_points: point.introducer,
                            info_donate_points: ` t??? ${info_user.phone_number}`,
                        };

                        const htr_user = await request.post(
                            'history_point/add_id',
                            htrUser
                        );
                        const htr_introduce = await request.post(
                            'history_point/add_phone',
                            htrIntroducer
                        );
                    } else if (user === 'only') {
                        const htrUser = {
                            user_id: idUserScan,
                            accumulate_point: point.user,
                        };
                        const htr_user = await request.post(
                            'history_point/add_id',
                            htrUser
                        );
                    }

                    Alert.alert('Th??ng b??o', `${message}`);
                    dispatch(getUserDB());
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                    Alert.alert('Th??ng b??o', `${message}`);
                }
            })();
        } else {
            Alert.alert('Qu??t m?? t??ch ??i???m kh??ng th??nh c??ng. Do QRCode kh??ng ????ng ');
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
        console.log('>>> qr: ', data);
        handleFetchCodeScanner(data);
    };

    const openSettingCamera = () => {
        Linking.openSettings();
    };

    if (hasPermission === false) {
        return (
            <>
                {isFocused ? <CustomStatusBar barStyle="dark-content" /> : null}
                {isLoading ? (
                    <ActivityIndicator size="large" />
                ) : (
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
                                Ch??a b???t camera
                            </Text>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    marginBottom: 20,
                                    fontSize: 17,
                                }}>
                                ????? qu??t QR, tr?????c ti??n c???n ph???i b???t camera trong ph???n c??i
                                ?????t c???a ???ng d???ng
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
                                V??o c??i ?????t ngay
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
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
                        style={[
                            styles.text_score,
                            { fontWeight: '500', color: 'red' },
                        ]}></Text>
                </View>
                <View style={styles.barcodebox}>
                    {isFocused && !scanned ? (
                        <BarCodeScanner
                            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                            style={{ height: 400, width: 400 }}
                        />
                    ) : (
                        <View>
                            <Text style={{ color: 'white', fontSize: 18 }}>
                                Nh???p Scan Again ????? ti???p t???c qu??t
                            </Text>
                        </View>
                    )}
                </View>

                {scanned && (
                    <TouchableOpacity
                        style={styles.buttonOpenSetting}
                        onPress={() => setScanned(false)}>
                        <Text style={{ fontSize: 19, color: 'white', fontWeight: '500' }}>
                            Scan Again
                        </Text>
                    </TouchableOpacity>
                )}

                {isLoading && <ModalLoading />}
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
        borderWidth: 2,
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
