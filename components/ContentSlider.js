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
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.title_left}>{title_left}</Text>
                <Text style={styles.title_right} onPress={onPressShowAll}>
                    Tất cả
                </Text>
            </View>

            <Swiper
                style={styles.wrapper}
                showsButtons={false}
                autoplay={autoplay}
                autoplayTimeout={timePlay}>
                {data.map((item, index) => (
                    <TouchableOpacity
                        activeOpacity={0.5}
                        accessible={true}
                        onPress={onPressImg}>
                        <View style={styles.slide1}>
                            <Image
                                source={item.img}
                                style={styles.slide_img}
                                resizeMode="stretch"
                            />
                            <View style={styles.icon_coin}>
                                <FontAwesome5
                                    name="coins"
                                    size="23"
                                    color="yellow"
                                    // style={styles.header_number_icon}
                                />
                                <Text
                                    style={{
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        fontSize: 20,
                                    }}>
                                    {' '}
                                    100
                                </Text>
                            </View>
                            <Image />
                            {/* <Text style={styles.text}>Hello Swiper</Text> */}
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
        // marginHorizontal: 20
        marginTop: 10,
        // marginBottom: 20,
        // paddingBottom: 20,
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
        // top: 20,
        // width: width,
        // height: 200,
        marginTop: 3,
        height: 190,
    },
    slide1: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide_img: {
        overflow: 'hidden',
        shadowColor: 'red',
        shadowRadius: 10,
        shadowOpacity: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        width: '95%',
        height: 170,
        borderRadius: 20,
    },
    icon_coin: {
        backgroundColor: primary_color,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 5,
        top: -50,
        left: -120,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
});

export default ContentSlider;
