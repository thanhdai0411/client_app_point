import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import React, { Fragment } from 'react';

import CardItem from '../../../components/CardHorizontal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomHeader from '../../../components/CustomHeader';
import useFetch from '../../../hooks/useFetch';
import Nothing from '../../../components/Nothing';

const ShowAllSlider = ({ route, navigation }) => {
    const { title, type } = route.params;
    const { isLoading, dataFetch } = useFetch(`gift/get/type/${type}`);

    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <CustomHeader title={title} navigation={navigation} />
            {isLoading ? (
                <ActivityIndicator
                    size="large"
                    color={'orange'}
                    style={{ marginTop: 50, height: '100%' }}
                />
            ) : (
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
                            <Nothing text="Hiện chưa có phần quà nào" />
                        )}
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default ShowAllSlider;
