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
import React, { useState } from 'react';
import Swiper from 'react-native-swiper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Coin from '../components/Coin';
import { box_shadow } from './GlobalStyles';

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
const SlideMarketing = ({
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
                    <TouchableOpacity
                        key={index}
                        activeOpacity={activeOpacity}
                        accessible={true}
                        onPress={onPressImg}>
                        <View style={{ ...styles.slide1, ...box_shadow }}>
                            <Image
                                source={item.img}
                                style={{
                                    borderWidth: borderImg,
                                    borderColor: '#ddd',
                                    width: widthImg,
                                    height: heightImg,
                                    borderRadius: borderRadiusImg,
                                }}
                                resizeMode={resizeModeImg}
                            />
                            {isCoin && (
                                <Coin
                                    top={-50}
                                    left={-120}
                                    paddingHorizontal={20}
                                    marginBottom={-20}
                                    // width={90}
                                />
                            )}
                        </View>
                    </TouchableOpacity>
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

export default SlideMarketing;
