import { View, Text, Image } from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

let primary_color = '#006db6';
let color_coin = '#e9b534';
const Coin = ({
    backgroundColor = null,
    colorPoint = '#fff',
    count = 100,
    ...styleProp
}) => {
    return (
        <View
            style={{
                backgroundColor: backgroundColor,
                borderRadius: 20,
                borderWidth: 0,
                borderColor: 'white',
                paddingVertical: 6,
                // justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',

                ...styleProp,
            }}>
            <View
                style={{
                    borderWidth: 1,
                    borderColor: 'orange',
                    borderRadius: 50,
                    padding: 5,
                    backgroundColor: color_coin,
                }}>
                <Image
                    source={require('../assets/img/logo_coin.png')}
                    style={{ width: 20, height: 20 }}
                />
            </View>
            {/* <FontAwesome5
                name="coins"
                size={23}
                color="yellow"
                // style={styles.header_number_icon}
            /> */}
            <Text
                style={{
                    color: colorPoint,
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
