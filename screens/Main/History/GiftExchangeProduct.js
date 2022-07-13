import { View, Text, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import React, { Fragment } from 'react';

import CardItem from '../../../components/CardHorizontal';
import { useIsFocused } from '@react-navigation/native';
import useFetch from '../../../hooks/useFetch';
import Nothing from '../../../components/Nothing';

const GiftExchangeProduct = ({ navigation }) => {
    const isFocused = useIsFocused();
    const { isLoading, dataFetch } = useFetch('gift/get/type/product_gift');

    return (
        <>
            <View style={{ height: '100%' }}>
                <ScrollView>
                    {isLoading ? (
                        <ActivityIndicator size="large" style={{ marginTop: 50 }} />
                    ) : (
                        <View style={{ paddingBottom: 150 }}>
                            {dataFetch && dataFetch.length > 0 ? (
                                dataFetch.map((item) => {
                                    return (
                                        <Fragment key={item._id}>
                                            <CardItem
                                                onPress={() =>
                                                    navigation.navigate(
                                                        'DetailExchange',
                                                        {
                                                            id: item._id,
                                                        }
                                                    )
                                                }
                                                coinNumber={item.number_point_buy}
                                                nameCompany={null}
                                                title={item.title}
                                                imageLink={{ uri: item.image }}
                                            />
                                        </Fragment>
                                    );
                                })
                            ) : (
                                <Nothing text="Hiện tại chưa có phần quà nào" />
                            )}
                        </View>
                    )}
                </ScrollView>
            </View>
        </>
    );
};

export default GiftExchangeProduct;
