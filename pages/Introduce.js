import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    Image,
    ScrollView,
    ImageEditor,
    Dimensions,
    Animated,
    Button,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native';

import React, { useRef, useState } from 'react';

// width , height display device
const { width, height } = Dimensions.get('window');

const Introduce = ({ navigation }) => {
    const [imgActive, setImgActive] = useState(0);
    const scrollView = useRef();
    const dataBanner = [
        {
            img: require('../assets/img/img_1.jpg'),
            title: 'TÍCH ĐIỂM DỄ DÀNG',
            description_1: 'Dù bạn mua đó, mua đây',
            description_2: 'Chỉ cần mở app là tích điểm ngay',
        },
        {
            img: require('../assets/img/img_2.jpg'),
            title: 'DÙNG ĐIỂM THẬT NHÀN',
            description_1: 'Ô kìa, tích thật nhiều tiền',
            description_2: 'Chỉ cần nhập số là khiêng em về',
        },
        {
            img: require('../assets/img/img_3.jpg'),
            title: 'TIỆN ÍCH VÔ VÀN',
            description_1: 'Nhìn tiện ích, thấy thiệt mê',
            description_2: 'Chỉ cần một nút là phế tấm lòng',
        },
        {
            img: require('../assets/img/img_4.jpg'),
            title: 'CẢM ƠN BẠN VÌ ĐÃ CHỌN CHÚNG TÔI',
        },
    ];

    const handleScroll = ({ nativeEvent }) => {
        const active = Math.ceil(
            nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
        );
        if (active > dataBanner.length - 1) {
            setImgActive(dataBanner.length - 1);
        } else {
            setImgActive(active);
        }
    };

    let count = imgActive;
    const handlePressBtnContinue = ({ nativeEvent }) => {
        count++;
        scrollView.current.scrollTo({ x: width * count, y: height, animated: true });
        if (count == 3) count = 0;
    };
   
    const handlePressBtnStart = () => {
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={styles.intro_container}>
            <View style={styles.intro_wrap}>
                <View style={styles.intro_header}>
                    <Image
                        source={require('../assets/img/logo.png')}
                        style={{ width: 80, height: 80 }}
                    />
                    <Text style={styles.intro_header_title}>Awaco</Text>
                </View>

                <ScrollView
                    onScroll={handleScroll}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={0}
                    style={styles.intro_wrap}
                    ref={scrollView}>
                    {dataBanner.map((item, index) => (
                        <View style={styles.intro_wrap_img} key={index}>
                            <Image
                                source={item.img}
                                resizeMode="stretch"
                                style={styles.intro_img}
                            />
                            <Text style={styles.intro_title}>{item.title}</Text>
                            <View style={styles.intro_detail}>
                                <Text style={styles.intro_des}>{item.description_1}</Text>
                                <Text style={styles.intro_des}>{item.description_2}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                <View style={styles.intro_wrap_dots}>
                    {dataBanner.map((item, index) => (
                        <View
                            key={index}
                            style={
                                imgActive == index
                                    ? styles.intro_dotActive
                                    : styles.intro_dot
                            }>
                            
                            </View>
                    ))}
                </View>

                {imgActive >= dataBanner.length - 1 ? (
                    <TouchableOpacity
                        onPress={handlePressBtnStart}
                        style={styles.intro_btn}>
                        <Text style={styles.intro_text_btn}>Bắt Đầu</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={handlePressBtnContinue}
                        style={styles.intro_btn}>
                        <Text style={styles.intro_text_btn}>Tiếp Tục</Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
};

// css variable
let primary_color = '#006db6';

const styles = StyleSheet.create({
    intro_container: {
        flex: 1,
        display: 'flex',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    intro_header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 70,
    },
    intro_header_title: {
        marginLeft: 10,
        fontSize: 30,
        color: primary_color,
        fontWeight: 'bold',
    },
    intro_title: {
        textAlign: 'center',
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        color: primary_color,
        marginTop: 20,
    },
    intro_detail: {
        // textAlign: 'center',
        marginTop: 20,
    },
    intro_des: {
        textAlign: 'center',
        fontSize: 16,
        fontStyle: 'italic',
    },
    intro_img: {
        width: width * 0.6,
        height: height * 0.27,
    },
    intro_wrap_img: {
        flex: 1,
        alignItems: 'center',
        width: width,
        height: height * 0.25,
    },
    intro_wrap: {
        width: width,
        height: height * 0.77,
    },
    intro_wrap_dots: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    intro_dotActive: {
        color: 'red',
        height: 10,
        width: 10,
        backgroundColor: primary_color,
        borderRadius: '50%',
        display: 'inline-block',
        margin: 6,
    },
    intro_dot: {
        color: 'black',
        height: 7,
        width: 7,
        backgroundColor: '#ccc',
        borderRadius: '50%',
        display: 'inline-block',
        margin: 6,
    },
    intro_btn: {
        alignItems: 'center',
        backgroundColor: primary_color,
        padding: 15,
        textAlign: 'center',
        marginHorizontal: 100,
        borderRadius: 100,
        marginTop: 50,
        outline: 'none',
    },
    intro_text_btn: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
    },
});

export default Introduce;
