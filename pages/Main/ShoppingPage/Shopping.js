import * as React from 'react';
import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import ShoppingHeader from './ShoppingHeader';
import ShoppingBody from './ShoppingBody';
import CustomHeader from '../../../components/CustomHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import { cardSelector } from '../../../redux/reducers/Card/cardSlice';

function Shopping({ navigation }) {
    const products = useSelector(cardSelector);
    return (
        <SafeAreaView style={styles.shopping_container}>
            {/* header */}
            <CustomHeader
                navigation={navigation}
                title={'Mua sắm ngay thôi'}
                iconLeft={false}
                iconRight={
                    <TouchableOpacity
                        activeOpacity={0.3}
                        onPress={() => navigation.navigate('OrderProduct')}>
                        <AntDesign
                            name="shoppingcart"
                            size={35}
                            color={'black'}
                            style={{ marginRight: 20 }}
                        />
                    </TouchableOpacity>
                }
            />
            <View
                style={{
                    backgroundColor: 'orange',
                    position: 'absolute',
                    width: 30,
                    height: 30,
                    right: 15,
                    top: 40,
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
            {/*  end header */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ backgroundColor: '#eee' }}>
                <View style={styles.shopping_wrap}>
                    <ShoppingHeader />
                    <ShoppingBody navigation={navigation} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

let primary_color = '#006db6';
let header_color = '#fff';

const styles = StyleSheet.create({
    shopping_container: {
        flex: 1,
        backgroundColor: header_color,
    },
    shopping_wrap: {
        paddingBottom: 40,
        paddingTop: 10,
    },
});

export default Shopping;
