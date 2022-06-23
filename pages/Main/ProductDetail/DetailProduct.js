import { View, Text } from 'react-native';
import React from 'react';

const DetailProduct = ({ color_table = '#fafafa', detail = [] }) => {
    return (
        <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: '500', paddingBottom: 8 }}>
                {' '}
                Chi tiết sản phẩm
            </Text>
            {detail.map((item, index) => (
                <View
                    key={index}
                    style={{
                        flexDirection: 'row',
                        paddingVertical: 10,
                        paddingHorizontal: 8,
                        backgroundColor: color_table,
                        borderWidth: 0.5,
                        borderColor: '#eee',
                    }}>
                    <Text style={{ fontSize: 16, flex: 1 }}>{item.title}</Text>
                    <Text style={{ fontSize: 16, flex: 2 }}>{item.text}</Text>
                </View>
            ))}
        </View>
    );
};

export default DetailProduct;
