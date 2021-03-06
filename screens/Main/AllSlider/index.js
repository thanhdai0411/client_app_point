import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CardItem from '../../../components/CardHorizontal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomHeader from '../../../components/CustomHeader';
import useFetch from '../../../hooks/useFetch';
import Nothing from '../../../components/Nothing';
import { giftSelector } from '../../../redux/reducers/giftSlice';

const ShowAllSlider = ({ route, navigation }) => {
    const { title, type } = route.params;
    let dataFetch = [];
    if (type == 'money_gift') {
        const { giftMoney } = useSelector(giftSelector);
        dataFetch = giftMoney;
    } else {
        const { giftProduct } = useSelector(giftSelector);
        dataFetch = giftProduct;
    }

    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <CustomHeader title={title} navigation={navigation} />

            <ScrollView style={{ backgroundColor: '#eee', height: '100%' }}>
                <View style={{ marginTop: 10, paddingBottom: 100 }}>
                    {dataFetch && dataFetch.length > 0 ? (
                        dataFetch.map((item) => (
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
                        ))
                    ) : (
                        <Nothing text="Hi???n ch??a c?? ph???n qu?? n??o" />
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ShowAllSlider;
