import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Coin from './Coin';
import { box_shadow } from './GlobalStyles';

const CardItem = ({
    nameCompany = 'AWACO',
    title = 'FreeSip cho đơn hàng đầu tiên',
    imageLink = require('../assets/img/f1.webp'),
    coinNumber = 5,
    onPress,
    height = 150,
    backgroundColor = '#fff',
    isBoxShadow = true,
    borderRadius = 10,
    ...style
}) => {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: backgroundColor,
                    marginHorizontal: 10,
                    borderRadius: borderRadius,

                    // padding: 10,
                    paddingHorizontal: 15,
                    height: height,
                    marginVertical: 8,
                    ...box_shadow,
                    ...style,
                }}>
                <View style={styles.name}>
                    <Text style={styles.name_company}>{nameCompany}</Text>
                    <Text style={styles.name_title} numberOfLines={2}>
                        {title}
                    </Text>
                    <Coin
                        count={coinNumber}
                        backgroundColor={null}
                        borderWidth={0}
                        bottom={-10}
                        colorPoint={'black'}
                    />
                </View>
                <View style={styles.img_item}>
                    <Image source={imageLink} style={styles.img} resizeMode="stretch" />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
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
        fontSize: 16,
        fontWeight: '500',
    },
    img_item: {
        flex: 2.5,
    },
    img: {
        width: 145,
        height: 125,
        borderRadius: 5,
    },
});

export default CardItem;
