import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const iconLeftDefault = <AntDesign name="left" size={25} color="#000" />;
const CustomHeader = ({
    title,
    navigation,
    iconLeft = iconLeftDefault,
    iconRight = null,
    onPressLeft = null,
    onPressRight,
    marginVertical = 15,
    styleIconLeft = {
        left: 10,
        position: 'absolute',
        fontWeight: 'bold',
    },
    textColor,
    ...styleHeader
}) => {
    const handelBackScreen = () => {
        navigation.goBack();
    };
    let onPressIconLeft = onPressLeft || handelBackScreen;
    return (
        <View
            style={{
                backgroundColor: 'white',
                borderBottomWidth: 1,
                borderColor: '#ccc',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                ...styleHeader,
            }}>
            {iconLeft && (
                <TouchableOpacity onPress={onPressIconLeft} style={styleIconLeft}>
                    {iconLeft}
                </TouchableOpacity>
            )}

            <Text
                style={{
                    fontSize: 18,
                    marginVertical: marginVertical,
                    fontWeight: '500',
                    justifyContent: 'center',
                    color: textColor,
                }}>
                {title}
            </Text>
            {iconRight && (
                <TouchableOpacity
                    onPress={onPressRight}
                    style={{ right: 10, position: 'absolute', fontWeight: 'bold' }}>
                    {iconRight}
                </TouchableOpacity>
            )}
        </View>
    );
};

export default CustomHeader;
