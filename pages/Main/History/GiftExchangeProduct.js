import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import CardItem from '../../../components/CardHorizontal';

const GiftExchangeProduct = () => {
    return (
        <View style={{ height: '100%' }}>
            <ScrollView>
                <View style={{ paddingBottom: 150 }}>
                    <CardItem />
                    <CardItem />
                    <CardItem />
                    <CardItem />
                    <CardItem />
                </View>
            </ScrollView>
        </View>
    );
};

export default GiftExchangeProduct;
