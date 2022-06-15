import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useRef } from 'react';
import ButtonCustom from '../../components/Button';

// Initialize Firebase
//
const Login = () => {
    const [number, setNumber] = useState('');
    const [code, setCode] = useState('');

    return (
        <View>
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
                <TextInput
                    autoFocus
                    keyboardType="number-pad"
                    style={styles.login_input}
                    placeholder="Nhập số điện thoại của bạn"
                    onChangeText={(e) => setNumber(e)}
                    value={number}
                />
            </View>

            <ButtonCustom name="Tiếp tục" />
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
        marginHorizontal: 10,
    },
    login_number: {
        fontSize: 25,
        marginVertical: 20,
        fontWeight: 'bold',
    },
    login_input: {
        borderRadius: 10,
        paddingLeft: 10,
        height: 50,
        borderColor: 'gray',
        borderWidth: 2,
        fontSize: 17,
    },
});
export default Login;
