import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Image,
    Dimensions,
    TouchableOpacity,
    Alert,
    Modal,
} from 'react-native';
import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { cardSelector, addCart } from '../../../redux/reducers/Card/cardSlice';

// import screens
import Label from '../../../components/Label';
import ButtonCustom from '../../../components/Button';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Description from './Description';
import ProductRelated from './ProductRelated';
import CustomHeader from '../../../components/CustomHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import useFetch from '../../../hooks/useFetch';

const imageLink = [
    require('../../../assets/img/sp2.jpg'),
    require('../../../assets/img/sp2.jpg'),
    require('../../../assets/img/sp2.jpg'),
];
const { width, height } = Dimensions.get('window');

const ProductDetail = ({ route, navigation }) => {
    const { idProduct } = route.params;
    const [imgIndex, setImgIndex] = useState(0);
    const [clickAdd, setClickAdd] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    //

    const [visible, setVisible] = React.useState(false);

    const hideDialog = () => setVisible(false);

    //

    //dispatch
    const dispatch = useDispatch();
    // use state redux
    const products = useSelector(cardSelector);
    //

    const { dataFetch, isLoading, isError } = useFetch(
        `https://fakestoreapi.com/products/${idProduct}`
    );

    let disCount = 20;

    // find index img when scroll
    const handleScroll = ({ nativeEvent }) => {
        const index = Math.ceil(
            nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
        );
        if (dataFetch.image.length > 1)
            if (index > imageLink.length - 1) {
                setImgIndex(imageLink.length - 1);
            } else {
                setImgIndex(index);
            }
    };

    // handle press add into cart
    const handlePressAddCart = () => {
        if (dataFetch) dispatch(addCart(dataFetch));
        setModalVisible(true);
        setTimeout(() => {
            setModalVisible(false);
        }, 1000);
    };
    // handle press buy product

    // loading fetch api
    if (isLoading) {
        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    backgroundColor: 'white',
                }}>
                <Image
                    source={require('../../../assets/img/loading_icon.gif')}
                    style={{
                        width: 200,
                        height: 200,
                    }}
                />
            </View>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            {/* header */}
            <CustomHeader
                navigation={navigation}
                title={'Chi tiết sản phẩm'}
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
            {/* modal */}
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    backgroundColor>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={{ color: 'white', fontSize: 17 }}>
                                Đã thêm vào giỏ{' '}
                            </Text>
                        </View>
                    </View>
                </Modal>
            </View>
            {/* end modal */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ backgroundColor: '#eee' }}>
                <View>
                    <View style={styles.detail_header}>
                        <View>
                            <ScrollView
                                onScroll={handleScroll}
                                scrollEventThrottle={0}
                                style={{
                                    width: width,
                                    height: height / 2.5,
                                    backgroundColor: 'white',
                                }}
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}>
                                <View key={dataFetch.id}>
                                    <Image
                                        source={{ uri: dataFetch.image }}
                                        resizeMode="contain"
                                        style={{
                                            width: width,
                                            height: height / 2.5,
                                        }}
                                    />
                                </View>
                                {/* {imageLink.map((item, index) => (
                                    <View key={index}>
                                        <Image
                                            source={item}
                                            resizeMode="stretch"
                                            style={{
                                                width: width,
                                                height: height / 2.5,
                                            }}
                                        />
                                    </View>
                                ))} */}
                            </ScrollView>
                            {/* <View
                                style={{
                                    top: 20,
                                    position: 'absolute',
                                    right: 20,
                                    backgroundColor: '#ddd',
                                    borderRadius: 10,
                                    paddingHorizontal: 10,
                                    paddingVertical: 5,
                                }}>
                                <Text style={{ fontSize: 17 }}>
                                    {imgIndex + 1} / {imageLink.length}
                                </Text>
                            </View> */}
                        </View>
                        <View style={styles.detail_info}>
                            <View style={styles.title_product}>
                                <Text numberOfLines={2} style={styles.title}>
                                    {dataFetch.title}
                                </Text>
                                <Label
                                    position={null}
                                    heightItem={33}
                                    rightItem={40}
                                    rate_discount={disCount}
                                />
                            </View>
                            <View style={styles.price}>
                                <Text style={styles.price_discount}>
                                    {(dataFetch.price * (disCount / 100)).toFixed(2)}
                                    <Text>đ</Text>
                                </Text>
                                <Text style={styles.price_origin}>
                                    {dataFetch.price}
                                    <Text>đ</Text>
                                </Text>
                            </View>
                            <Text style={{ color: '#aaa' }}>
                                Phân loại:{' '}
                                <Text style={{ color: 'blue' }}>
                                    {dataFetch.category}
                                </Text>
                            </Text>
                        </View>
                        {/* <View style={styles.detail_info}>
                            <View style={styles.title_product}>
                                <Text numberOfLines={2} style={styles.title}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing
                                    elit. Praesentium officia voluptatem dignissimos
                                    officiis iste similique quas repellat, sed, esse hic
                                    ratione sunt voluptate aperiam? Doloribus soluta aut
                                    libero enim minima.
                                </Text>
                                <Label position={null} heightItem={33} rightItem={40} />
                            </View>
                            <View style={styles.price}>
                                <Text style={styles.price_origin}>
                                    200.000<Text>đ</Text>
                                </Text>
                                <Text style={styles.price_discount}>
                                    100.000<Text>đ</Text>
                                </Text>
                            </View>
                            <Text style={{ color: '#aaa' }}>
                                Thương hiệu: <Text style={{ color: 'blue' }}>Awaco</Text>
                            </Text>
                        </View> */}
                    </View>
                    {/* info manufacture */}
                    <View style={styles.manufacture}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                source={require('../../../assets/img/logo.png')}
                                style={styles.avatar}
                                resizeMode="cover"
                            />
                            <View style={styles.manufacture_info}>
                                <Text style={{ fontSize: 17 }}>Awaco Shop</Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginVertical: 5,
                                    }}>
                                    <EvilIcons
                                        name="location"
                                        size={20}
                                        color="black"
                                        style={{ margin: 0 }}
                                    />
                                    <Text>TP.Ho Chi Minh</Text>
                                </View>
                                {/* number product */}
                                <Text>
                                    <Text style={{ color: 'red' }}>{110}</Text> Sản phẩm
                                </Text>
                            </View>
                        </View>

                        <ButtonCustom
                            name={'Xem Shop'}
                            marginHorizontal={0}
                            borderRadius={5}
                            backgroundColor={null}
                            borderWidth={1}
                            borderColor={'red'}
                            colorText="red"
                            padding={10}
                            height={45}
                            onPress={() => navigation.navigate('InfoShop', { idShop: 1 })}
                        />
                        {/* end manufacture */}
                    </View>

                    {/* description product */}
                    <Description text_desc={dataFetch.description} />
                    {/* end description product */}

                    {/* san pham lien quan */}
                    <ProductRelated
                        navigation={navigation}
                        relateProduct={dataFetch.category}
                    />
                    {/* end san pham lien quan */}
                </View>
            </ScrollView>
            {/* show notify buy product */}

            {/* show notify buy product */}
            {/* btn bottom */}
            <View style={styles.btn_group}>
                <ButtonCustom
                    sizeText={18}
                    name={'Thêm vào giỏ hàng'}
                    marginHorizontal={null}
                    borderRadius={0}
                    backgroundColor={'orange'}
                    flex={1}
                    onPress={handlePressAddCart}
                />
                <ButtonCustom
                    sizeText={18}
                    name={'Mua ngay'}
                    marginHorizontal={null}
                    borderRadius={0}
                    flex={1}
                    onPress={() => navigation.navigate('InfoOrder')}
                />
            </View>
            {/* end btn bottom */}
        </SafeAreaView>
    );
};
let header_color = '#fff';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: header_color,
    },
    detail_header: {},
    detail_info: {
        padding: 10,
        backgroundColor: 'white',
    },
    img_product: {
        width: width,
        height: height / 3,
        // height: '40%',
    },
    title: {
        width: width - 60,
        fontSize: 16,
        marginRight: 5,
    },
    title_product: {
        width: width,
        flexDirection: 'row',
        // justifyContent: 'center',
    },
    price: {
        marginVertical: 6,
    },
    price_origin: {
        marginTop: 3,
        fontSize: 17,
        textDecorationLine: 'line-through',
    },
    price_discount: {
        marginTop: 3,
        fontSize: 17,
        color: '#bbb',
        color: 'red',
        fontWeight: '500',
    },
    btn_group: {
        paddingBottom: 35,
        backgroundColor: '#eee',
        width: width,
        bottom: 0,
        position: 'absolute',
        flexDirection: 'row',
    },
    manufacture: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        width: width,
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 10,
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 50,
    },
    manufacture_info: {
        marginLeft: 15,
        // alignItems: 'center',
        justifyContent: 'center',
    },
    desc_product: {},
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 22,
        width: width,
        height: height,
    },
    modalView: {
        margin: 20,
        backgroundColor: '#555555',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        position: 'absolute',
        bottom: 100,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default ProductDetail;
