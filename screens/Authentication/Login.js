import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Button,
    Alert,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
// import

import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../../firebase-config';
import firebase from 'firebase/compat';

import ButtonCustom from '../../components/Button';
import CustomInput from '../../components/CustomInput';
import CustomLabelInput from '../../components/CustomLabelInput';
import request from '../../utils/request';
import { getUserDB } from '../../redux/reducers/userSlice';
import { getGiftDB } from '../../redux/reducers/giftSlice';

const Login = ({ navigation }) => {
    const { control, handleSubmit } = useForm();
    const recaptchaVerifier = useRef(null);
    const dispatch = useDispatch();

    const submitNumberPhone = ({ phone_number }) => {
        let string = phone_number.split('');
        string.splice(0, 1, '+84');
        let result = string.join('');

        (async () => {
            try {
                const res = await request.get(`user/get_phone/${phone_number}`);
                const data = res && res.data ? res.data.data : {};
                if (data) {
                    dispatch(getUserDB(data.phone_number));
                    dispatch(getGiftDB());
                } else {
                    const phoneProvider = new firebase.auth.PhoneAuthProvider();
                    phoneProvider
                        .verifyPhoneNumber(result, recaptchaVerifier.current)
                        .then((value) => {
                            navigation.navigate('Otp', {
                                verificationId: value,
                            });
                        })
                        .catch((err) => {
                            console.log(err.message);
                        });
                }
            } catch (err) {
                console.log({ get_login_err: err.message });
            }
        })();
    };

    return (
        <View>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
                attemptInvisibleVerification={true}
            />
            <View style={styles.login_container}>
                <View style={styles.login_container_1}>
                    <Image
                        source={require('../../assets/img/logo.png')}
                        style={{ width: 80, height: 80 }}
                    />
                    <Text style={styles.login_title}>Đăng nhập</Text>
                </View>
            </View>

            <View style={styles.login_info_number}>
                <Text style={styles.login_number}>Số điện thoại</Text>
                <CustomInput
                    control={control}
                    autoFocus
                    rules={{ required: 'Bạn bắt buôc phải nhập trường này' }}
                    placeholder="Nhập số điện thoại của bạn"
                    keyboardType="number-pad"
                    name="phone_number"
                />
            </View>

            <ButtonCustom
                name="Tiếp tục"
                sizeText={20}
                weightText="bold"
                backgroundColor={'orange'}
                borderWidth={1}
                borderColor="white"
                marginTop={30}
                borderRadius={10}
                marginHorizontal={60}
                onPress={handleSubmit(submitNumberPhone)}
            />
        </View>
    );
};
let primary_color = '#ff9300';

const styles = StyleSheet.create({
    login_container: {
        backgroundColor: primary_color,
    },
    login_container_1: {
        marginTop: 70,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        marginBottom: 30,
    },

    login_title: {
        color: 'white',
        fontSize: 30,
        marginLeft: 20,
        fontWeight: 'bold',
    },
    login_info_number: {
        marginHorizontal: 25,
    },
    login_number: {
        fontSize: 22,
        marginVertical: 20,
        fontWeight: '500',
    },
    login_input: {
        borderRadius: 10,
        paddingLeft: 20,
        height: 50,
        borderColor: 'gray',
        borderWidth: 2,
        fontSize: 17,
    },
});
export default Login;
