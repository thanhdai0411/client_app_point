import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const ButtonCustom = ({
    name = 'Button',
    onPress,
    iconBtn = null,
    opacityBtn = 0.5,
    colorText = 'white',
    disabled,
    sizeText = 17,
    weightText = '500',
    primary_color = '#006db6',
    ...styleProp
}) => {
    const {} = styleProp;
    return (
        <TouchableOpacity
            activeOpacity={opacityBtn}
            onPress={onPress}
            disabled={disabled}
            style={{
                alignItems: 'center',
                backgroundColor: primary_color,
                padding: 15,
                textAlign: 'center',
                marginHorizontal: 100,
                borderRadius: 100,
                flexDirection: 'row',
                justifyContent: 'center',
                ...styleProp,
            }}>
            {iconBtn}
            <Text
                style={{ color: colorText, fontSize: sizeText, fontWeight: weightText }}>
                {name}
            </Text>
        </TouchableOpacity>
    );
};

export default ButtonCustom;
