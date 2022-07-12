import {
    View,
    Text,
    StyleSheet,
    Alert,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import React, { Fragment } from 'react';
import CardVertical from '../../../components/CardVertical';
import ProductDetail from '../ProductDetail/ProducDetail';
import useFetch_1 from '../../../hooks/useFetch_1';
import Loading from '../../../components/Loading';

const AllProduct = ({ navigation }) => {
    const { dataFetch, isLoading, isError } = useFetch_1(
        'https://fakestoreapi.com/products'
    );

    if (isLoading) {
        return <Loading />;
    }
    return (
        <ScrollView>
            <View>
                <View style={styles.body}>
                    {dataFetch.map((item) => (
                        <Fragment key={item.id}>
                            <CardVertical
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
                        </Fragment>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    body: {
        // margin: 5,s
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: '100%',
        // height: '100%',
    },
});

export default AllProduct;
