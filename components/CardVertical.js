import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { box_shadow } from './GlobalStyles';
import Label from './Label.js';

const CardVertical = ({
    price_origin = '2.100.100',
    disCount = 50,
    typeProduct = 'Water',
    nameCompany = 'Awaco',
    title = 'FreeShip cho đơn hàng đầu tiên, cho đơn hàng đầu tiên',
    imageLink = require('../assets/img/sp2.jpg'),
    imgFetch,
    onPress,
    width = '50%',

    paddingItem = 5,
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.6}
            style={{ width: width, padding: paddingItem }}
            onPress={onPress}>
            <View style={{ ...styles.box, ...box_shadow }}>
                <View style={styles.img_item}>
                    {imageLink ? (
                        <Image
                            source={imageLink}
                            style={styles.img}
                            resizeMode="stretch"
                        />
                    ) : (
                        <Image
                            source={{ uri: imgFetch }}
                            style={styles.img}
                            resizeMode="stretch"
                        />
                    )}
                </View>
                <View style={styles.info_product}>
                    <View style={styles.title}>
                        <Text style={styles.name_title} numberOfLines={2}>
                            {title}
                        </Text>
                    </View>
                    <View style={styles.price}>
                        <Text style={styles.price_origin}>{price_origin}đ</Text>
                        <Text style={styles.price_discount}>
                            {(price_origin * (disCount / 100)).toFixed(2)}đ
                        </Text>
                    </View>
                    <View style={styles.category}>
                        <Text numberOfLines={1} style={styles.type}>
                            {typeProduct}
                        </Text>
                        <Text style={styles.manufacturer}>{nameCompany}</Text>
                    </View>
                </View>
                {/* label discount */}
                <Label rate_discount={disCount} />
            </View>
        </TouchableOpacity>
    );
};
const border_radius_item = 0;
const styles = StyleSheet.create({
    box: {
        backgroundColor: 'white',
        borderRadius: border_radius_item,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    img_item: {},
    img: {
        marginTop: 5,
        width: '100%',
        height: 165,
        borderTopLeftRadius: border_radius_item,
        borderTopRightRadius: border_radius_item,
    },
    title: {},
    info_product: {
        padding: 8,
    },
    name_title: {
        fontSize: 15,
    },
    price: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    price_discount: {
        color: 'red',
        fontSize: 16,
    },
    price_origin: {
        // textDecorationLine: 2,
        textDecorationLine: 'line-through',
        color: '#aaa',
        fontSize: 16,
    },
    category: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    type: {
        color: 'gray',
        fontSize: 15,
        flex: 1,
    },
    manufacturer: {
        color: 'gray',
        fontSize: 15,
        flex: 1,
        textAlign: 'right',
    },
});

export default CardVertical;
