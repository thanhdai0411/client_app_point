import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import AppLoading from 'expo-app-loading';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    useFonts,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';

export default function HomeHeader() {
    let [fontsLoaded] = useFonts({
        Poppins_300Light,
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <>
            <View style={styles.home_header}>
                <View>
                    <Text style={styles.header_name}>
                        Thanh Dai<Text> ơi !</Text>
                    </Text>
                    <View style={styles.header_coin}>
                        <FontAwesome5
                            name="coins"
                            size="20"
                            color="yellow"
                            style={styles.header_number_icon}
                        />
                        <Text style={styles.header_number_coins}> 100</Text>
                    </View>
                    <Image />
                </View>
                <View>
                    <Image
                        source={require('../../../assets/img/pikachu_1.png')}
                        style={styles.header_logo}
                    />
                </View>
            </View>
            {/* Category */}
            <View style={styles.header_category}>
                <View style={styles.header_category_container}>
                    <View style={styles.header_category_item}>
                        <Ionicons name="barcode" size="40" color="orange" />
                        <Text style={styles.header_category_name}>Thành viên</Text>
                    </View>
                    <View style={styles.header_category_item}>
                        <Ionicons name="gift-outline" size="40" color="red" />
                        <Text style={styles.header_category_name}>Ưu đãi</Text>
                    </View>
                    <View style={styles.header_category_item}>
                        <Ionicons name="trophy-outline" size="40" color="green" />
                        <Text style={styles.header_category_name}>Thử thách</Text>
                    </View>
                    <View style={styles.header_category_item}>
                        <MaterialCommunityIcons
                            name="inbox-full-outline"
                            size="42"
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
let header_color = '#FFC54D';
let header_category = 'white';

const styles = StyleSheet.create({
    home_header: {
        // flex: 1,
        width: '100%',
        height: 170,
        backgroundColor: header_color,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        position: 'relative',
    },
    header_name: {
        marginTop: 20,
        color: '#F9F9F9',
        fontSize: 20,
        fontFamily: 'Poppins_600SemiBold',
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
        marginTop: 135,
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
