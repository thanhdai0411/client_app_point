import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    StatusBar,
} from 'react-native';
import ShoppingHeader from './ShoppingHeader';
import ShoppingBody from './ShoppingBody';
import CustomHeader from '../../../components/CustomHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import { cardSelector } from '../../../redux/reducers/Card/cardSlice';
import CustomStatusBar from '../../../components/CustomStatusBar';

let primary_color = '#178dde';

function Shopping({ navigation }) {
    const products = useSelector(cardSelector);
    const [scrollHeader, setScrollHeader] = useState(false);

    return (
        <View style={styles.shopping_container}>
            {/* header */}
            <CustomStatusBar barStyle={'light-content'} />
            <View
                style={{
                    width: '100%',
                    backgroundColor: primary_color,
                    height: 100,
                    position: 'absolute',
                    zIndex: 5,
                    color: 'black',
                    // borderBottomWidth: scrollHeader ? 1 : null,
                    // borderColor: '#ccc',
                }}>
                <View
                    style={{
                        height: 50,
                        width: '100%',
                        // top: -200,
                        marginTop: 45,
                        position: 'absolute',

                        zIndex: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <View
                        style={{
                            backgroundColor: 'white',
                            paddingVertical: 10,
                            paddingLeft: 15,
                            marginHorizontal: 10,
                            marginLeft: 15,
                            borderRadius: 8,
                            flexDirection: 'row',
                            alignItems: 'center',
                            // flex: 7,
                            flex: 1,
                            borderWidth: 1,
                            borderColor: '#ccc',
                        }}>
                        <AntDesign
                            name="search1"
                            size={20}
                            color={'#aaa'}
                            style={{ marginRight: 8 }}
                        />
                        <TextInput placeholder="Bạn muốn mua gì hôm nay ?" />
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.3}
                        onPress={() => navigation.navigate('OrderProduct')}>
                        <AntDesign
                            name="shoppingcart"
                            size={30}
                            color={'white'}
                            style={{ marginRight: 30 }}
                        />
                    </TouchableOpacity>
                    <View
                        style={{
                            backgroundColor: 'orange',
                            position: 'absolute',
                            width: 25,
                            height: 25,
                            right: 15,
                            top: 0,
                            borderRadius: 50,

                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{
                                color: 'white',
                                fontWeight: 'bold',
                            }}>
                            {products.reduce((acc, item) => {
                                return acc + item.total;
                            }, 0)}
                        </Text>
                    </View>
                </View>
            </View>

            {/* end header */}
            <ScrollView style={{ backgroundColor: '#eee' }} scrollEventThrottle={0}>
                <View style={styles.shopping_wrap}>
                    <ShoppingHeader />
                    <ShoppingBody navigation={navigation} />
                </View>
            </ScrollView>
        </View>
    );
}

let header_color = '#fff';

const styles = StyleSheet.create({
    shopping_container: {
        flex: 1,
        backgroundColor: header_color,
    },
    shopping_wrap: {
        paddingBottom: 40,
        // paddingTop: 10,
    },
});

export default Shopping;
