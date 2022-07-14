import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CardItem from '../../../components/CardHorizontal';
import { useIsFocused } from '@react-navigation/native';
import useFetch from '../../../hooks/useFetch';
import Nothing from '../../../components/Nothing';
import { giftSelector } from '../../../redux/reducers/giftSlice';

const { width, height } = Dimensions.get('window');

const GiftExchangeMoney = ({ navigation }) => {
    const isFocused = useIsFocused();
    const { giftMoney } = useSelector(giftSelector);
    return (
        <>
            <View style={{ height: '100%' }}>
                {giftMoney && giftMoney.length > 0 ? (
                    <ScrollView>
                        {giftMoney.map((item) => {
                            return (
                                <Fragment key={item._id}>
                                    <CardItem
                                        onPress={() =>
                                            navigation.navigate('DetailExchange', {
                                                id: item._id,
                                            })
                                        }
                                        coinNumber={item.number_point_buy}
                                        nameCompany={null}
                                        title={item.title}
                                        imageLink={{ uri: item.image }}
                                    />
                                </Fragment>
                            );
                        })}
                    </ScrollView>
                ) : (
                    <Nothing
                        text="Hiện tại chưa có phần quà nao"
                        flex={1}
                        height={'100%'}
                        paddingBottom={150}
                    />
                )}
            </View>
        </>
    );
};

export default GiftExchangeMoney;
