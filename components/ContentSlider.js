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
import React from 'react';
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
}) => {
    return (
        <View
            style={{
                marginTop: containerMarginTop,
                backgroundColor: backgroundColorContainer,
            }}>
            {isTitle && (
                <View style={styles.title}>
                    <Text style={styles.title_left}>{title_left}</Text>
                    <Text style={styles.title_right} onPress={onPressShowAll}>
                        Tất cả
                    </Text>
                </View>
            )}

            <Swiper
                style={styles.wrapper}
                showsButtons={false}
                autoplay={autoplay}
                autoplayTimeout={timePlay}>
                {data.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={0.5}
                        accessible={true}
                        onPress={onPressImg}>
                        <View style={{ ...styles.slide1, ...box_shadow }}>
                            <Image
                                source={item.img}
                                style={styles.slide_img}
                                resizeMode="stretch"
                            />
                            {isCoin && (
                                <Coin
                                    top={-50}
                                    left={-120}
                                    paddingHorizontal={20}
                                    marginBottom={-20}
                                    width={90}
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
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },
    slide_img: {
        borderWidth: 1,
        borderColor: '#ddd',
        width: '95%',
        height: 170,
        borderRadius: 20,
    },
});

export default ContentSlider;
