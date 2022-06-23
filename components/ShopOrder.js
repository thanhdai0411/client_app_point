import { View, Text, Image } from 'react-native';
import Checkbox from 'expo-checkbox';

import React from 'react';

const ShopOrder = ({
    valueBox,
    onValueChange,
    nameShop = 'AWACO SHOP',
    numberBuy = 1,
    totalOrder = 1,
    totalMoney = '100.0000',
    avatarShop = require('../assets/img/logo.png'),
}) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'white',
                padding: 13,
                borderBottomWidth: 1,
                borderColor: '#eee',
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <Checkbox
                    style={{ marginRight: 8 }}
                    value={valueBox}
                    onValueChange={onValueChange}
                />
                <Image
                    source={avatarShop}
                    style={{ width: 60, height: 60, marginRight: 10, borderRadius: 50 }}
                    resizeMode="stretch"
                />
                <View>
                    <Text
                        style={{
                            fontWeight: '700',
                            fontSize: 16,
                            marginBottom: 8,
                            textTransform: 'uppercase',
                        }}>
                        {nameShop}
                    </Text>
                    <Text style={{ color: '#aaa', fontSize: 14 }}>
                        {numberBuy}/{totalOrder} Sản phẩm
                    </Text>
                </View>
            </View>
            <Text style={{ color: 'red', fontSize: 18, fontWeight: '400' }}>
                {totalMoney}đ
            </Text>
        </View>
    );
};

export default ShopOrder;
