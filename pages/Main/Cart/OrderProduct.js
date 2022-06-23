import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import React, { Fragment, useState } from 'react';
import CardOrder from '../../../components/CardOrder';
import ShopOrder from '../../../components/ShopOrder';
import CustomHeader from '../../../components/CustomHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector, useDispatch } from 'react-redux';
import {
    cardSelector,
    pressPlus,
    pressSubtract,
    deleteProduct,
} from '../../../redux/reducers/Card/cardSlice';
import Nothing from '../../../components/Nothing';
import ButtonCustom from '../../../components/Button';

const { width, height } = Dimensions.get('window');

const OrderProduct = ({ navigation }) => {
    const [isChecked, setIsChecked] = useState(true);
    const [isCheckedAll, setIsCheckedAll] = useState(false);
    const dispatch = useDispatch();

    const productIntoCart = useSelector(cardSelector);

    // handle subtract, add product
    const handleSubtract = (id) => {
        const product = productIntoCart.find((item) => item.id == id);
        dispatch(pressSubtract(product));

        if (product.total == 1) {
            dispatch(deleteProduct(product));
        }
    };
    const handlePlus = (id) => {
        const product = productIntoCart.find((item) => item.id == id);
        dispatch(pressPlus(product));
    };

    // delete product
    const handlePressDelete = (id) => {
        const product = productIntoCart.find((item) => item.id == id);
        dispatch(deleteProduct(product));
    };

    // is product
    let isProduct = false;

    // discount
    let disCount = 20;

    return (
        <SafeAreaView style={{ backgroundColor: 'white', height: height }}>
            {/* header */}
            <CustomHeader
                navigation={navigation}
                title={'Giỏ hàng của bạn'}
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
                    width: 25,
                    height: 25,
                    right: 15,
                    top: 42,
                    borderRadius: 50,

                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text
                    style={{
                        color: 'white',
                        fontWeight: 'bold',
                    }}>
                    {productIntoCart.reduce((acc, item) => {
                        return acc + item.total;
                    }, 0)}
                </Text>
            </View>
            {/* end header */}
            {productIntoCart.reduce((acc, item) => {
                isProduct = true;
                return acc + item.total;
            }, 0) ? (
                <ScrollView style={{ backgroundColor: '#eee' }}>
                    <View style={{ paddingBottom: 80 }}>
                        <View style={{ marginTop: 10 }}>
                            {/* <ShopOrder onValueChange={setIsChecked} valueBox={isChecked} /> */}
                            <View>
                                {productIntoCart.map((item) => (
                                    <Fragment key={item.id}>
                                        <CardOrder
                                            onValueChange={setIsChecked}
                                            valueBox={isChecked}
                                            imgProduct={item.image}
                                            titleProduct={item.title}
                                            price_original={item.price}
                                            typeProduct={item.category}
                                            onPressSubtract={() =>
                                                handleSubtract(item.id)
                                            }
                                            onPressPlus={() => handlePlus(item.id)}
                                            numberProduct={item.total}
                                            onPressDeleteProduct={() =>
                                                handlePressDelete(item.id)
                                            }
                                        />
                                    </Fragment>
                                ))}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            ) : (
                <Nothing
                    text="Bạn không có sản phẩm nào"
                    flex={null}
                    backgroundColor={'white'}
                    height={'100%'}
                    marginBottom={-100}
                    button={
                        <ButtonCustom
                            name="Mua sắm ngay thôi"
                            marginHorizontal={null}
                            borderRadius={10}
                            backgroundColor={null}
                            borderWidth={2}
                            marginTop={15}
                            borderColor={'orange'}
                            colorText={'black'}
                            onPress={() => navigation.goBack()}
                        />
                    }
                />
            )}
            {/* btn bottom */}

            {isProduct && (
                <View
                    style={{
                        paddingBottom: 40,
                        backgroundColor: '#fff',
                        width: width,
                        bottom: 0,
                        position: 'absolute',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <View style={{ flex: 2, paddingTop: 7, paddingLeft: 20 }}>
                        <Text style={{ fontSize: 17, marginBottom: 5 }}>
                            Tổng thanh toán
                        </Text>
                        <Text
                            style={{
                                fontSize: 20,
                                color: 'red',
                                fontWeight: '500',
                                // marginTop: 5,
                            }}>
                            {productIntoCart.reduce((acc, item) => {
                                let totalMoney = item.price * item.total;

                                let totalDiscount =
                                    ((item.price * disCount) / 100) * item.total;

                                return parseFloat((acc + totalDiscount).toFixed(2));
                            }, 0)}
                            đ
                        </Text>
                    </View>
                    <ButtonCustom
                        onPress={() => navigation.navigate("InfoOrder")}
                        name={'Đặt hàng'}
                        marginHorizontal={null}
                        borderRadius={0}
                        sizeText={18}
                        flex={1}
                        top={-2}
                    />
                </View>
            )}

            {/* end btn bottom */}
        </SafeAreaView>
    );
};

export default OrderProduct;
