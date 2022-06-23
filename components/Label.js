import { View, Text } from 'react-native';
import React from 'react';

const Label = ({
    label_discount_color = '#ffd839',
    rate_discount = 50,
    status = 'GIẢM',
    position = 'absolute',
    right = 0,
    rightItem = 0,
    widthLabel = 40,
    heightLabel = 33,
    heightItem = 0,
    ...styleLabel
}) => {
    let topItem = heightItem || 33;
    return (
        <>
            <View
                style={{
                    width: widthLabel,
                    height: heightLabel,
                    position: position,
                    right: right,
                    backgroundColor: label_discount_color,
                    ...styleLabel,
                }}>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 13,
                        color: 'red',
                    }}>
                    {rate_discount}%
                </Text>
                <Text style={{ textAlign: 'center', fontSize: 13, color: 'white' }}>
                    {status}
                </Text>
            </View>
            <View
                style={{
                    width: widthLabel,
                    height: 8,
                    right: rightItem,
                    top: topItem,
                    position: position,
                    borderTopWidth: 0,
                    borderEndWidth: 20,
                    borderLeftWidth: 20,
                    borderBottomWidth: 10,

                    borderRightColor: label_discount_color,
                    borderBottomColor: 'transparent',
                    borderLeftColor: label_discount_color,
                }}></View>
        </>
    );
};

export default Label;
