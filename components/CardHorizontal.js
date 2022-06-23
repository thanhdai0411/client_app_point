import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Coin from './Coin';
import { box_shadow } from './GlobalStyles';

const CardItem = ({
    nameCompany = 'AWACO',
    title = 'FreeSip cho đơn hàng đầu tiên',
    imageLink = require('../assets/img/sp1.png'),
    coinNumber = 5,
    onPress,
}) => {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
            <View style={{ ...styles.container, ...box_shadow }}>
                <View style={styles.name}>
                    <Text style={styles.name_company}>{nameCompany}</Text>
                    <Text style={styles.name_title}>{title}</Text>
                    <Coin
                        count={coinNumber}
                        backgroundColor="#FFB562"
                        width={80}
                        top={10}
                    />
                </View>
                <View style={styles.img_item}>
                    <Image source={imageLink} style={styles.img} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 10,
        borderRadius: 10,
        // padding: 10,
        paddingHorizontal: 15,
        height: 150,
        marginVertical: 8,
    },
    name: {
        flex: 3,
        height: '100%',
        paddingRight: 10,
    },
    name_company: {
        fontWeight: 'bold',
        color: '#ccc',
        marginTop: 10,
    },
    name_title: {
        marginVertical: 10,
        fontSize: 18,
        fontWeight: '500',
    },
    img_item: {
        flex: 2,
    },
    img: {
        width: 120,
        height: 120,
        borderRadius: 5,
    },
});

export default CardItem;
