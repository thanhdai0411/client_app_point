import {
    View,
    Text,
    StyleSheet,
    Alert,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

// import
import React, { Fragment } from 'react';
import CardVertical from '../../../components/CardVertical';
import ProductDetail from '../ProductDetail/ProducDetail';
import useFetch from '../../../hooks/useFetch';
import Loading from '../../../components/Loading';

const { widthS, heightS } = Dimensions.get('window');
const ShoppingBody = ({ navigation }) => {
    const { dataFetch, isLoading, isError } = useFetch(
        'https://fakestoreapi.com/products'
    );

    if (isLoading) {
        return (
            <View
                style={{
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: widthS,
                }}>
                <Image
                    source={require('../../../assets/img/loading_icon.gif')}
                    style={{ width: 100, height: 100 }}
                />
            </View>
        );
    }
    ``;
    return (
        <View style={{ backgroundColor: '#fff', marginTop: 10, paddingBottom: 10 }}>
            <View>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: '500',
                        marginVertical: 13,
                        marginLeft: 15,
                        color: 'red',
                    }}>
                    DÀNH RIÊNG CHO BẠN
                </Text>
            </View>
            <View style={styles.shopping_body}>
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
    );
};

const styles = StyleSheet.create({
    shopping_body: {
        // margin: 5,s
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: '100%',
        // height: '100%',
    },
});

export default ShoppingBody;
