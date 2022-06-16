import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import AccountBodyItem from './AccountBodyItem';
import ButtonCustom from '../../../components/Button';
const AccountBody = () => {
    return (
        <View style={styles.ac_body}>
            <View style={styles.item_group}>
                <AccountBodyItem
                    text="Thông tin cá nhân"
                    icon={<FontAwesome name="user-o" size={25} />}
                />
                <AccountBodyItem
                    text="Lịch sử tích - đổi"
                    icon={<FontAwesome name="user-o" size={25} />}
                />

                <AccountBodyItem
                    text="Nhập mã giới thiệu"
                    icon={<FontAwesome name="user-o" size={25} />}
                />
            </View>
            <View style={styles.item_group}>
                <AccountBodyItem
                    text="Thương hiệu"
                    icon={<FontAwesome name="user-o" size={25} />}
                />
                <AccountBodyItem
                    text="Thông tin liên hệ"
                    icon={<FontAwesome name="user-o" size={25} />}
                />

                <AccountBodyItem
                    text="Điều khoản sử dụng ứng dụng"
                    icon={<FontAwesome name="user-o" size={25} />}
                />
                <AccountBodyItem
                    text="Chính sách bảo mật"
                    icon={<FontAwesome name="user-o" size={25} />}
                />
                <AccountBodyItem
                    text="Chính sách bảo mật"
                    icon={<FontAwesome name="user-o" size={25} />}
                />
            </View>

            <ButtonCustom
                name={'Đăng xuất'}
                iconBtn={
                    <Octicons
                        name="sign-out"
                        size={25}
                        style={{ marginRight: 10, color: 'red' }}
                    />
                }
                opacityBtn={0.7}
                colorText="red"
                sizeText={20}
                backgroundColor="#fff"
                color="white"
                borderWidth={2}
                borderRadius={10}
                borderColor="pink"
                marginTop={10}
                marginHorizontal={20}
                marginBottom={50}
            />
        </View>
    );
};

let color_ac_body = '#ddd';
const styles = StyleSheet.create({
    ac_body: {
        flex: 1,

        backgroundColor: color_ac_body,
    },
    item_group: {
        marginBottom: 10,
    },
    item_ac: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingLeft: 20,
        borderWidth: 0.5,
        borderColor: '#ddd',
    },
    item_title: {
        fontSize: 17,
        marginLeft: 10,
        paddingVertical: 17,
    },
});

export default AccountBody;
