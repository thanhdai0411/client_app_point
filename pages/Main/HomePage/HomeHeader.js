import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import React from 'react';
import AppLoading from 'expo-app-loading';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useSelector } from 'react-redux';
// import
import Coin from '../../../components/Coin';
import { pointSelector } from '../../../redux/reducers/pointSlice';

//
import { box_shadow } from '../../../components/GlobalStyles';

export default function HomeHeader({ navigation }) {
    const points = useSelector(pointSelector);
    // console.log({ points });
    const { point_introduce, point_user } = points;

    return (
        <>
            {/* <ImageBackground source={require('../../../assets/img/wall.jpg')}> */}
            <View style={styles.home_header}>
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.header_name}>
                        Thanh Dai<Text> ơi !</Text>
                    </Text>
                    <Coin count={point_user} />
                    <Image />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => navigation.navigate('Thông báo')}
                        style={{ marginRight: 10 }}>
                        <Ionicons
                            name="ios-notifications-outline"
                            size={35}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        backgroundColor: 'red',
                        width: 25,
                        height: 25,
                        position: 'absolute',
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        top: 40,
                        right: 15,
                        borderWidth: 1,
                        borderColor: 'white',
                    }}>
                    <Text style={{ color: 'white', fontWeight: '500' }}>0</Text>
                </View>
            </View>
            {/* </ImageBackground> */}
            {/* Category */}
            <View style={{ ...styles.header_category, ...box_shadow }}>
                <View style={styles.header_category_container}>
                    <View style={styles.header_category_item}>
                        <Ionicons name="barcode" size={40} color="orange" />
                        <Text style={styles.header_category_name}>Thành viên</Text>
                    </View>
                    <View style={styles.header_category_item}>
                        <Ionicons name="gift-outline" size={40} color="red" />
                        <Text style={styles.header_category_name}>Ưu đãi</Text>
                    </View>
                    <View style={styles.header_category_item}>
                        <Ionicons name="trophy-outline" size={40} color="green" />
                        <Text style={styles.header_category_name}>Thử thách</Text>
                    </View>
                    <View style={styles.header_category_item}>
                        <MaterialCommunityIcons
                            name="inbox-full-outline"
                            size={42}
                            color="blue"
                        />
                        <Text style={styles.header_category_name}>Hộp thư </Text>
                    </View>
                </View>
            </View>

            {/* End Category */}
        </>
    );
}

let primary_color = '#006db6';
let header_color = '#178dde';
let header_category = 'white';

const styles = StyleSheet.create({
    home_header: {
        // flex: 1,
        width: '100%',
        height: 200,
        backgroundColor: header_color,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        position: 'relative',
        paddingTop: 50,
    },
    header_name: {
        color: 'white',
        fontSize: 20,
        marginBottom: 5,
        fontWeight: '500',
    },
    header_coin: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 45,
        backgroundColor: primary_color,
        flexDirection: 'row',
        // flex: 1
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    header_number_coins: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },

    header_logo: {
        width: 119,
        height: 119,
        marginRight: 10,
    },
    header_category: {
        backgroundColor: header_category,
        marginHorizontal: 15,
        position: 'absolute',
        // top: '10%',
        marginTop: 150,
        zIndex: 1,
        left: 0,
        right: 0,
        borderRadius: 20,
    },
    header_category_container: {
        marginVertical: 5,

        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 11,
        // borderRadius: 20,
    },
    header_category_item: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    header_category_name: {
        textAlign: 'center',
        // marginVertical: 5,
        // fontFamily: 'Poppins_500Medium',
        fontWeight: '500',
        marginTop: 3,
        fontSize: 15,
    },
});
