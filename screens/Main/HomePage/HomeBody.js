import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Dimensions,
    ImageEditor,
    Alert,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
const { width, height } = Dimensions.get('window');
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector, useDispatch } from 'react-redux';

import ContentSlider from '../../../components/ContentSlider';
import SlideMarketing from '../../../components/SlideMarketing';
import useFetch from '../../../hooks/useFetch';
import { giftSelector, getGiftDB } from '../../../redux/reducers/giftSlice';

const HomeBody = ({ navigation }) => {
    const dispatch = useDispatch();

    const { giftProduct, giftMoney } = useSelector(giftSelector);

    return (
        <View style={styles.home_body}>
            {/* Banner */}
            <SlideMarketing
                isCoin={false}
                data={[
                    {
                        img: require('../../../assets/img/b2.png'),
                    },
                    {
                        img: require('../../../assets/img/b3.jpg'),
                    },
                    {
                        img: require('../../../assets/img/b4.jpg'),
                    },
                ]}
                autoplay={true}
                heightImg={150}
                timePlay={5}
                isTitle={false}
                backgroundColorContainer={null}
                containerMarginTop={70}
            />
            {/* end Banner */}

            {/* slider contennt */}
            {giftMoney && giftMoney.length > 0 && (
                <ContentSlider
                    data={giftMoney}
                    title_left={'Đổi điểm thành tiền mặt ngay 🤤'}
                    onPressShowAll={() =>
                        navigation.navigate('ShowAllSlider', {
                            title: 'Đổi điểm thành tiền mặt ngay 🤤',
                            type: 'money_gift',
                        })
                    }
                    navigation={navigation}
                    containerMarginTop={-5}
                />
            )}

            {giftProduct && giftProduct.length > 0 && (
                <ContentSlider
                    data={giftProduct}
                    title_left={'Có không đổi hết đừng buồn 😆'}
                    onPressShowAll={() =>
                        navigation.navigate('ShowAllSlider', {
                            title: 'Có không đổi hết đừng buồn 😆',
                            type: 'product_gift',
                        })
                    }
                    navigation={navigation}
                    containerMarginTop={-5}
                />
            )}

            {/* end slider content */}
        </View>
    );
};

let primary_color = '#006db6';
let header_color = '#ff9300';
let body_color = '#eee';

const styles = StyleSheet.create({
    home_body: {
        // flex: 1,
        width: '100%',
        height: '100%',

        backgroundColor: body_color,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        // paddingBottom: 10,
    },
    home_body_img: {
        borderRadius: 20,
        width: width * 0.91,
        height: height * 0.18,
    },
    home_body_wrap_img: {
        flex: 1,
        alignItems: 'center',
        width: width,
        height: height * 0.25,
    },
    home_body_wrap: {
        top: 70,
        width: width,
        position: 'relative',
    },
    home_body_wrap_dots: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        zIndex: 1,
        top: 195,
        right: 0,
        left: 0,
    },
    home_body_dotActive: {
        color: 'red',
        height: 8,
        width: 8,
        backgroundColor: 'orange',
        borderRadius: '50%',
        display: 'inline-block',
        margin: 6,
    },
    home_body_dot: {
        color: 'black',
        height: 6,
        width: 6,
        backgroundColor: '#ccc',
        borderRadius: '50%',
        display: 'inline-block',
        margin: 6,
    },
    body_type_wrap: {
        backgroundColor: '#fff',
        marginTop: -2,
        paddingHorizontal: 8,
        paddingVertical: 15,
    },
    body_type: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // marginHorizontal: 15,
        borderRadius: 20,
    },
    type_item: {
        width: '25%',
        alignItems: 'center',
    },
    type_name: {
        marginTop: 6,
        marginBottom: 8,
        fontSize: 17,
        fontWeight: '500',
    },
    body_type_title: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 13,
        marginLeft: 10,
        textAlign: 'center',
    },
});

export default HomeBody;
