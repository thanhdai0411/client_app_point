import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Dimensions,
    ImageEditor,
} from 'react-native';
import React, { useState, useRef } from 'react';
const { width, height } = Dimensions.get('window');
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ContentSlider from '../../../components/ContentSlider';

const HomeBody = ({ navigation }) => {
    const dataType = [
        {
            icon: <Ionicons name="fast-food-outline" size={50} color="#FCDA05" />,
            description: 'Ẩm thực',
        },
        {
            icon: <Ionicons name="game-controller-outline" size={50} color="#EC9B3B" />,
            description: 'Giải trí',
        },
        {
            icon: (
                <MaterialCommunityIcons
                    name="face-woman-shimmer-outline"
                    size={50}
                    color="#F4BFBF"
                />
            ),
            description: 'Làm đẹp',
        },
        {
            icon: <AntDesign name="skin" size={50} color="#14C38E" />,
            description: 'Thời trang',
        },
        {
            icon: (
                <MaterialCommunityIcons
                    name="lightbulb-on-outline"
                    size={50}
                    color="#FF1F5A"
                />
            ),
            description: 'Tiện ích',
        },
        {
            icon: <AntDesign name="book" size={50} color="#6088BB" />,
            description: 'Giáo dục',
        },
        {
            icon: <AntDesign name="shoppingcart" size={50} color="#9D2503" />,
            description: 'Mua sắm',
        },
        {
            icon: (
                <MaterialCommunityIcons
                    name="collapse-all-outline"
                    size={50}
                    color="#AD8C45"
                />
            ),
            description: 'Tất cả',
        },
    ];
    let dataContent = [
        {
            img: require('../../../assets/img/img_6.jpg'),
        },
        {
            img: require('../../../assets/img/tich_diem.jpg'),
        },
    ];

    return (
        <View style={styles.home_body}>
            {/* Banner */}
            <ContentSlider
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
                autoplay={false}
                isTitle={false}
                backgroundColorContainer={null}
                containerMarginTop={55}
            />
            {/* end Banner */}

            {/* slider contennt */}
            <ContentSlider
                onPressShowAll={() =>
                    navigation.navigate('ShowAllSlider', { title: 'Ưu đãi mới nhất 🤤' })
                }
                onPressImg={() => navigation.navigate('DetailSlider', { idSlide: 1 })}
                containerMarginTop={-5}
            />
            <ContentSlider
                data={dataContent}
                title_left={'Có không đổi hết đừng buồn 😆'}
                onPressShowAll={() =>
                    navigation.navigate('ShowAllSlider', {
                        title: 'Có không đổi hết đừng buồn 😆',
                    })
                }
                onPressImg={() => navigation.navigate('DetailSlider', { idSlide: 1 })}
            />

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
        // height: '80%',
        backgroundColor: body_color,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingBottom: 30,
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
