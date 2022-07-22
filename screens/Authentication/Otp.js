import { View, Text, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import * as SecureStore from 'expo-secure-store';
import firebase from 'firebase/compat';
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

// import
import ButtonCustom from '../../components/Button';
import { getPhoneNumber, getUserDB } from '../../redux/reducers/userSlice';
import CustomStatusBar from '../../components/CustomStatusBar';
import request from '../../utils/request';

const Otp = ({ route, navigation }) => {
    const { verificationId } = route.params;
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const [verificationCode, setVerificationCode] = useState('');

    let keyStore = 'phone_number';

    const saveUserStore = async (key, value) => {
        try {
            await SecureStore.setItemAsync(key, value);
            console.log('Login success');
            dispatch(getPhoneNumber());
        } catch (err) {
            console.log({ save_err: err.message });
        }
    };
    const confirmCode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            verificationCode
        );

        firebase
            .auth()
            .signInWithCredential(credential)
            .then(() => {
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        (async () => {
                            try {
                                let phone_number = user.phoneNumber;
                                let string = phone_number.split('');
                                string.splice(0, 3, '0');
                                let result = string.join('');
                                console.log(result);

                                // save number phone into db
                                const res = await request.post('user/add', {
                                    phone_number: result,
                                });
                                console.log('>>> res ', res.data.success);

                                // default then login for 10 spin free
                                const res_1 = await request.post('game/add', {
                                    phone_number: result,
                                });
                                console.log('>>> res_1', res_1.data.success);

                                if (res.data.success && res_1.data.success) {
                                    await saveUserStore('phone_number', result);
                                    dispatch(getUserDB(result));

                                    Alert.alert(
                                        'Thông báo',
                                        'Bạn hãy đi tới Tài khoản để cập nhật đầy đủ thông tin cá nhân để chúng tôi hiểu bạn hơn',
                                        [
                                            {
                                                text: 'Đồng ý',
                                                onPress: () =>
                                                    Alert.alert(
                                                        'Thông báo',
                                                        'Bạn hãy đi tới Tài khoản để cập nhật đầy đủ thông tin cá nhân để chúng tôi hiểu bạn hơn',
                                                        [
                                                            {
                                                                text: 'Đi ngay',
                                                                onPress: () =>
                                                                    navigation.navigate(
                                                                        'InfoUser'
                                                                    ),
                                                            },
                                                        ]
                                                    ),
                                            },
                                        ]
                                    );
                                }
                            } catch (err) {
                                console.log({ save_phone_number_login_err: err.message });
                            }
                        })();
                        // console.log(user.uid, user.phoneNumber);
                    } else {
                        console.log('User loggout');
                        // User not logged in or has just logged out.
                    }
                });
            })
            .catch((error) => {
                Alert.alert('Đăng nhập thát bại. Vui lòng nhập đúng mã gồm 6 kí tự');
            });
    };
    let color = '#09843d';

    return (
        <>
            {isFocused ? <CustomStatusBar /> : null}
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    backgroundColor: 'white',
                    paddingTop: 80,
                }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/img/otp_icon.png')}
                        style={{ width: 150, height: 150 }}
                    />
                    <Text style={{ fontSize: 20, marginTop: 20 }}>
                        Nhập mã OTP để xác nhận
                    </Text>
                </View>

                <OTPInputView
                    pinCount={6}
                    style={{ width: '80%', height: 180 }}
                    autoFocusOnLoad
                    editable={!!verificationId}
                    codeInputFieldStyle={{
                        width: 45,
                        height: 45,
                        borderWidth: 2,
                        borderColor: '#ccc',
                        color: 'black',
                        fontSize: 20,
                        fontWeight: '500',
                        borderRadius: 5,
                    }}
                    codeInputHighlightStyle={{
                        borderColor: color,
                        // backgroundColor: 'orange',
                        color: 'white',
                    }}
                    onCodeFilled={(code) => {
                        setVerificationCode(code);
                    }}
                    // clearInputs
                />
                <ButtonCustom
                    name="Xác nhận"
                    disabled={!verificationCode}
                    backgroundColor={color}
                    marginHorizontal={null}
                    borderRadius={5}
                    borderWidth={1}
                    borderColor={'white'}
                    width={300}
                    onPress={confirmCode}
                />
            </View>
        </>
    );
};

export default Otp;
