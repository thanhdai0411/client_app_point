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
            }}>
            {iconLeft && (
                <TouchableOpacity
                    onPress={onPressIconLeft}
                    style={{
                        left: 10,
                        position: 'absolute',
                        fontWeight: 'bold',
                    }}>
                    {iconLeft}
                </TouchableOpacity>
            )}

            <Text
                style={{
                    fontSize: 18,
                    marginVertical: marginVertical,
                    fontWeight: '500',
                    justifyContent: 'center',
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
