import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import CardVertical from '../../../components/CardVertical';

const { width, height } = Dimensions.get('window');
const ProductRelated = ({ navigation }) => {
    const handleShowAllProduct = () => {
        navigation.goBack();
    };
    return (
        <View
            style={{
                backgroundColor: 'white',
                marginVertical: 10,
                paddingBottom: 80,
            }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: '500',
                        paddingBottom: 8,
                        padding: 10,
                    }}>
                    Sản phẩm liên quan
                </Text>
                <TouchableOpacity onPress={handleShowAllProduct}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '500',
                            paddingBottom: 8,
                            padding: 10,
                            color: 'red',
                        }}>
                        Xem tất cả
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal pagingEnabled>
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }}>
                    <CardVertical width={width / 2} paddingItem={4} />
                    <CardVertical width={width / 2} paddingItem={4} />
                    <CardVertical width={width / 2} paddingItem={4} />
                    <CardVertical width={width / 2} paddingItem={4} />
                    <CardVertical width={width / 2} paddingItem={4} />
                    <CardVertical width={width / 2} paddingItem={4} />

                    {/* <CardVertical /> */}
                    {/* <CardVertical /> */}
                </View>
            </ScrollView>
        </View>
    );
};

export default ProductRelated;
