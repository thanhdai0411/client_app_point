import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Dimensions,
    TouchableOpacity,
    TouchableHighlight,
} from 'react-native';
import React, { useState, Fragment } from 'react';
import Swiper from 'react-native-swiper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Coin from '../components/Coin';
import { box_shadow } from './GlobalStyles';
import CardItem from './CardHorizontal';

const { width, height } = Dimensions.get('window');
let dataContent = [
    {
        img: require('../assets/img/b1.jpg'),
    },
    {
        img: require('../assets/img/b2.png'),
    },
    {
        img: require('../assets/img/b3.jpg'),
    },
    {
        img: require('../assets/img/b4.jpg'),
    },
];
const ContentSlider = ({
    data = dataContent,
    title_left = 'Ưu đãi mới nhất 🤤',
    timePlay = 5,
    autoplay = false,
    onPressShowAll,
    onPressImg,
    isCoin = true,
    isTitle = true,
    backgroundColorContainer = '#fff',
    containerMarginTop = 10,
    topContainer = null,
    marginTopSwiper = 3,
    borderRadiusImg = 20,
    heightImg = 170,
    heightSwiper = heightImg + 20,
    widthImg = '95%',
    borderImg = 1,
    resizeModeImg = 'stretch',
    position = null,
    activeOpacity = 0.5,
    navigation,
    ...styleContainer
}) => {
    const [imgLoad, setImgLoad] = useState(false);
    return (
        <View
            style={{
                marginTop: containerMarginTop,
                backgroundColor: backgroundColorContainer,
                position: position,
                ...styleContainer,
            }}>
            {isTitle && (
                <View style={styles.title}>
                    <Text style={styles.title_left}>{title_left}</Text>
                    <TouchableOpacity onPress={onPressShowAll} activeOpacity={0.3}>
                        <Text style={styles.title_right}>Tất cả</Text>
                    </TouchableOpacity>
                </View>
            )}

            <Swiper
                style={{
                    marginTop: marginTopSwiper,
                    height: heightSwiper,
                }}
                showsButtons={false}
                autoplay={autoplay}
                autoplayTimeout={timePlay}>
                {data.map((item, index) => (
                    <Fragment key={item._id}>
                        <CardItem
                            onPress={() =>
                                navigation.navigate('DetailExchange', {
                                    id: item._id,
                                })
                            }
                            height={165}
                            borderRadius={8}
                            coinNumber={item.number_point_buy}
                            nameCompany={null}
                            title={item.title}
                            imageLink={{ uri: item.image }}
                            borderWidth={1}
                            borderColor={'#ccc'}
                            shadowColor="#000000"
                            shadowOffset={{ width: 0, height: 0 }}
                            shadowOpacity={0.3}
                            shadowRadius={8}
                            elevation={5}
                        />
                    </Fragment>
                ))}
            </Swiper>
        </View>
    );
};
let primary_color = '#006db6';

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        backgroundColor: '#fff',
    },
    title: {
        position: 'relative',
        marginVertical: 15,
        marginHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title_left: {
        fontSize: 18,
        fontWeight: '500',
    },
    title_right: {
        fontSize: 18,
        fontWeight: '500',
        color: 'red',
    },
    wrapper: {
        marginTop: 3,
        height: 190,
    },
    slide1: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ContentSlider;
