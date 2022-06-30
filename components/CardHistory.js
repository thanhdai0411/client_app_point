import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { box_shadow } from '../components/GlobalStyles';

const bgc_color = 'rgba(248, 248, 248, 1)';
const CardHistory = ({
    imgLink = require('../assets/img/logo.png'),
    name = 'Lịch sử giao dịch điểm',
    onPress,
}) => {
    return (
        // <View
        //     style={{
        //         paddingHorizontal: 20,
        //         paddingVertical: 30,
        //         flexDirection: 'row',
        //         flexWrap: 'wrap',
        //         justifyContent: 'space-between',
        //     }}>

        <View
            style={{
                backgroundColor: bgc_color,
                width: '50%',
                padding: 10,
                margin: -8,
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: '#eee',
                marginBottom: 22,

                shadowColor: '#000000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
                elevation: 3,
            }}>
            <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20,
                        borderColor: '#eee',
                        padding: 10,
                        borderWidth: 1,
                        backgroundColor: 'white',
                        marginHorizontal: 35,
                        marginTop: 5,

                        shadowColor: '#000000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.2,
                        shadowRadius: 5,
                        elevation: 3,
                    }}>
                    <Image source={imgLink} style={{ width: 50, height: 50 }} />
                </View>
                <Text
                    style={{
                        textAlign: 'center',
                        marginTop: 25,
                        marginBottom: 10,
                        fontSize: 13,
                        fontWeight: '500',
                    }}>
                    {name}
                </Text>
            </TouchableOpacity>
        </View>
        // </View>
    );
};

export default CardHistory;
