import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import Coin from './Coin';
import { box_shadow } from './GlobalStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Avatar } from 'react-native-paper';
import ButtonCustom from './Button';
const CardOrder = ({
    imgProduct = 'https://picsum.photos/200',
    titleProduct = 'Lorem ipsum dolor sit amet consectetur adipisicing elit Praesentium officia voluptatem dignissimos officiis iste similique',
    onPressTitleProduct,
    onPressSubtract,
    onPressPlus,
    numberProduct = 1,
    price_original = '200.000',
    disCount = 20,
    typeProduct = 'Food',
    valueBox,
    onValueChange,
    key,
    onPressDeleteProduct,
}) => {
    let priceProduct = (price_original * numberProduct).toFixed(2);
    return (
        <View key={key}>
            <View style={{ ...styles.container, ...box_shadow }}>
                <View style={styles.img_item}>
                    <Checkbox
                        style={{ marginRight: 8 }}
                        value={valueBox}
                        onValueChange={onValueChange}
                    />
                    <Image
                        source={{ uri: imgProduct }}
                        style={styles.img}
                        resizeMode="stretch"
                    />
                </View>

                <View style={styles.product_info}>
                    <TouchableOpacity activeOpacity={0.3} onPress={onPressTitleProduct}>
                        <Text numberOfLines={2} style={{ fontSize: 16 }}>
                            {titleProduct}
                        </Text>
                    </TouchableOpacity>
                    <Text style={{ backgroundColor: '#eee', padding: 5 }}>
                        Phân loại: <Text>{typeProduct}</Text>
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text
                            style={{
                                textDecorationLine: 'line-through',
                                marginRight: 8,
                                fontSize: 16,
                            }}>
                            {priceProduct}
                        </Text>
                        <Text style={{ color: 'red', fontWeight: '500', fontSize: 16 }}>
                            {(priceProduct * (disCount / 100)).toFixed(2)}
                        </Text>
                    </View>
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <TouchableOpacity
                                onPress={onPressSubtract}
                                activeOpacity={0.5}
                                style={{
                                    borderWidth: 1,
                                    padding: 4,
                                    borderColor: '#ccc',
                                    borderTopLeftRadius: 5,
                                    borderBottomLeftRadius: 5,
                                }}>
                                <AntDesign
                                    name="minus"
                                    size={20}
                                    color="#aaa"
                                    style={{ paddingHorizontal: 3 }}
                                />
                            </TouchableOpacity>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: '500',
                                    paddingVertical: 3,
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    paddingHorizontal: 20,
                                }}>
                                {numberProduct}
                            </Text>
                            <TouchableOpacity
                                onPress={onPressPlus}
                                activeOpacity={0.5}
                                style={{
                                    borderWidth: 1,
                                    padding: 4,
                                    borderColor: '#ccc',
                                    borderTopRightRadius: 5,
                                    borderBottomRightRadius: 5,
                                }}>
                                <AntDesign
                                    name="plus"
                                    size={20}
                                    color="#aaa"
                                    style={{ paddingHorizontal: 3 }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <ButtonCustom
                                name="Xóa"
                                marginHorizontal={null}
                                borderRadius={6}
                                paddingHorizontal={13}
                                paddingVertical={6}
                                backgroundColor={'red'}
                                onPress={onPressDeleteProduct}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        // padding: 10,
        paddingHorizontal: 13,
        height: 150,
        // marginBottom: 8,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    product_info: {
        flex: 3,
        height: '100%',
        paddingLeft: 10,
        justifyContent: 'space-around',
        paddingVertical: 6,
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
});

export default CardOrder;
