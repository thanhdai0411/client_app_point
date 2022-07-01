import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AccountBodyItem from './AccountBodyItem';
import ButtonCustom from '../../../components/Button';

let header_color = '#178dde';

const AccountBody = ({ navigation }) => {
    const { navigate } = navigation;
    return (
        <View style={styles.ac_body}>
            <View style={styles.item_group}>
                <AccountBodyItem
                    onPress={() => navigate('InfoUser')}
                    text="Thông tin cá nhân"
                    icon={<FontAwesome name="user-o" size={25} />}
                />
                <AccountBodyItem
                    onPress={() => navigate('InfoBank')}
                    text="Thông tin ngân hàng"
                    icon={<MaterialCommunityIcons name="bank-outline" size={25} />}
                />

                <AccountBodyItem
                    onPress={() => navigate('InviteCode')}
                    text="Nhập mã giới thiệu"
                    icon={<MaterialIcons name="input" size={25} />}
                />
                <AccountBodyItem
                    onPress={() => navigate('HowPoint')}
                    text="Cách tích điểm"
                    icon={<MaterialIcons name="control-point" size={25} />}
                />
            </View>
            <View style={styles.item_group}>
                <AccountBodyItem
                    onPress={() => navigate('RegisterDealer')}
                    text="Đăng kí làm đại lý"
                    icon={<AntDesign name="form" size={25} />}
                />
                <AccountBodyItem
                    onPress={() => navigate('Contact')}
                    text="Thông tin liên hệ"
                    icon={<Ionicons name="call-outline" size={25} />}
                />
                <AccountBodyItem
                    onPress={() => navigate('Terms')}
                    text="Điều khoản sử dụng ứng dụng"
                    icon={<FontAwesome name="sticky-note-o" size={25} />}
                />
                <AccountBodyItem
                    onPress={() => navigate('Security')}
                    text="Chính sách bảo mật"
                    icon={<SimpleLineIcons name="lock" size={25} />}
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
                marginTop={30}
                marginHorizontal={20}
            />
        </View>
    );
};

let color_ac_body = '#eee';
const styles = StyleSheet.create({
    ac_body: {
        height: '100%',
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
