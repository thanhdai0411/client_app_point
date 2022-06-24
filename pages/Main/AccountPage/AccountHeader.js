import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Coin from '../../../components/Coin';
const AccountHeader = () => {
    return (
        <View style={styles.ac_header}>
            <View style={styles.ac_avatar}>
                <SimpleLineIcons name="user" size={50} color="blue" />
                {/* <Image
                    source={require('../../../assets/img/logo.png')}
                    style={{ width: 60, height: 60 }}
                /> */}
            </View>
            <View style={styles.ac_info}>
                <Text style={styles.ac_user_name}>Thanh Dai</Text>
                <Coin marginLeft={null} width={90} count={100} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    ac_header: {
        width: '100%',
        height: 125,
        flexDirection: 'row',
        marginLeft: 15,
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
