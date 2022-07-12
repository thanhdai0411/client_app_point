import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import React, { useRef, Fragment } from 'react';
import CardVertical from '../../../components/CardVertical';
import useFetch_1 from '../../../hooks/useFetch_1';
import Loading from '../../../components/Loading';

const { width, height } = Dimensions.get('window');
const ProductRelated = ({ relateProduct, navigation }) => {
    const handleShowAllProduct = () => {
        navigation.navigate('AllProduct');
    };
    const { dataFetch, isLoading, isError } = useFetch_1(
        'https://fakestoreapi.com/products'
    );

    return (
        <View
            style={{
                backgroundColor: 'white',
                marginVertical: 10,
                paddingBottom: 80,
            }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: '500',
                        paddingBottom: 8,
                        padding: 10,
                    }}>
                    Sản phẩm liên quan
                </Text>
                <TouchableOpacity onPress={handleShowAllProduct}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '500',
                            paddingBottom: 8,
                            padding: 10,
                            color: 'red',
                        }}>
                        Xem tất cả
                    </Text>
                </TouchableOpacity>
            </View>
            {isLoading ? (
                <Loading />
            ) : (
                <ScrollView horizontal pagingEnabled>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                        }}>
                        {dataFetch.map((item) => (
                            <Fragment key={item.id}>
                                {item.category == relateProduct.category &&
                                    relateProduct.id != item.id && (
                                        <CardVertical
                                            width={width / 2}
                                            paddingItem={4}
                                            imgFetch={item.image}
                                            typeProduct={item.category}
                                            title={item.title}
                                            price_origin={item.price}
                                            disCount={20}
                                            imageLink={null}
                                            onPress={() =>
                                                navigation.navigate('ProductDetail', {
                                                    idProduct: item.id,
                                                })
                                            }
                                        />
                                    )}
                            </Fragment>
                        ))}
                    </View>
                </ScrollView>
            )}
        </View>
    );
};

export default ProductRelated;
