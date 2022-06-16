import { View, Text } from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

let primary_color = '#006db6';

const Coin = ({ backgroundColor = primary_color, count = 100, ...styleProp }) => {
    return (
        <View
            style={{
                backgroundColor: backgroundColor,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: 'white',
                paddingVertical: 6,
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',

                ...styleProp,
            }}>
            <FontAwesome5
                name="coins"
                size="23"
                color="yellow"
                // style={styles.header_number_icon}
            />
            <Text
                style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 20,
                }}>
                {' '}
                {count}
            </Text>
        </View>
    );
};

export default Coin;
