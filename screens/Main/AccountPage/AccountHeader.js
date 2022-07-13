import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
// import
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Coin from '../../../components/Coin';
import { userSelector } from '../../../redux/reducers/userSlice';
import { pointSelector } from '../../../redux/reducers/pointSlice';

const AccountHeader = () => {
    const { info_user } = useSelector(userSelector);
    return (
        <View style={styles.ac_header}>
            {/* <SimpleLineIcons name="user" size={50} color="blue" /> */}
            {info_user.avatar ? (
                <Image
                    source={{ uri: info_user.avatar }}
                    style={{ width: 80, height: 80, borderRadius: 10 }}
                />
            ) : (
                <Image
                    source={require('../../../assets/img/non_user.jpg')}
                    style={{ width: 80, height: 80, borderRadius: 10 }}
                />
            )}
            <View style={styles.ac_info}>
                <Text style={styles.ac_user_name}>
                    {info_user.username ? info_user.username : info_user.phone_number}
                </Text>
                <Coin marginLeft={null} count={info_user.number_point} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    ac_header: {
        width: '100%',
        height: 125,
        flexDirection: 'row',
        paddingLeft: 15,
        paddingTop: 30,
        // backgroundColor: 'red',
    },
    ac_avatar: {
        backgroundColor: '#fff',
        width: 80,
        height: 80,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    ac_user_name: {
        fontSize: 20,
        marginBottom: 5,
        fontWeight: '500',
        color: 'white',
    },
    ac_info: {
        marginTop: 5,
        marginLeft: 20,
    },
});

export default AccountHeader;
