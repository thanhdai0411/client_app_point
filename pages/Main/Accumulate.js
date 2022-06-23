import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    Linking,
    Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';

const Accumulate = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [textScan, setTextScan] = useState('Not yet scanned');
    const [X, setX] = useState(0);
    const [Y, setY] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

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
        const { size, origin } = bounds;
        setScanned(true);
        setTextScan(data);
        console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Requesting for camera permission</Text>
            </View>
        );
    }

    const openSettingCamera = () => {
        Linking.openSettings();
    };
    if (hasPermission === false) {
        return (
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
                    <Text style={{ textAlign: 'center', marginBottom: 20, fontSize: 17 }}>
                        Để quét QR, trước tiên cần phải bật camera trong phần cài đặt của
                        ứng dụng
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.buttonOpenSetting}
                    onPress={openSettingCamera}>
                    <Text style={{ fontSize: 19, color: 'white', fontWeight: '500' }}>
                        Vào cài đặt ngay
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <View style={styles.barcodebox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ height: 400, width: 400 }}
                />
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
        justifyContent: 'center',
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
    },
    text_open: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 30,
    },
});

export default Accumulate;
