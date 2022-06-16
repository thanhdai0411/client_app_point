import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

let primary_color = '#006db6';
const ButtonCustom = ({
    name,
    onPress,
    iconBtn = null,
    opacityBtn = 0.5,
    colorText = 'white',
    sizeText = 17,
    weightText = '500',
    ...styleProp
}) => {
    const {} = styleProp;
    return (
        <TouchableOpacity
            activeOpacity={opacityBtn}
            onPress={onPress}
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
