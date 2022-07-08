import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CustomHeader = ({
    title,
    navigation,
    iconLeft = true,
    colorIconLeft = 'black',
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
    backgroundColorHeader = 'white',
    borderHeader = 1,
    ...styleHeader
}) => {
    const handelBackScreen = () => {
        navigation.goBack();
    };
    let onPressIconLeft = onPressLeft || handelBackScreen;
    return (
        <View
            style={{
                backgroundColor: backgroundColorHeader,
                borderBottomWidth: borderHeader,
                borderColor: '#ccc',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                ...styleHeader,
            }}>
            {iconLeft && (
                <TouchableOpacity onPress={onPressIconLeft} style={{ ...styleIconLeft }}>
                    <AntDesign name="left" size={25} color={colorIconLeft} />
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
