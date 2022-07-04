import {
    View,
    Text,
    ImageBackground,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import React from 'react';
import { useIsFocused } from '@react-navigation/native';

import {
    ImageHeaderScrollView,
    TriggeringView,
} from 'react-native-image-header-scroll-view';

// import
import Ticket from '../../../components/Ticket';
import CustomStatusBar from '../../../components/CustomStatusBar';
import Coin from '../../../components/Coin';
import ButtonCustom from '../../../components/Button';
import AntDesign from 'react-native-vector-icons/AntDesign';

const { width, height } = Dimensions.get('window');
let color = '#178dde';
import request from '../../../utils/request';

const DetailExchange = ({ navigation }) => {
    const isFocused = useIsFocused();

    const handleExchange = () => {
        Alert.alert('Bạn đổi điểm thành công. Chúng tôi sẽ trao thưởng sớm nhất đến bạn');
        const exchangePoint = async () => {
            // const res = await request.post()
        };
    };

    const handleCheckInfoBank = () => {
        navigation.navigate('InfoBank');
    };

    return (
        <>
            {isFocused && <CustomStatusBar />}

            <ImageHeaderScrollView
                maxHeight={220}
                minHeight={100}
                headerImage={require('../../../assets/img/see.jpg')}
                renderFixedForeground={() => (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigation.goBack()}
                        style={{
                            backgroundColor: 'white',
                            width: 35,
                            height: 35,
                            position: 'absolute',
                            zIndex: 1,
                            top: 45,
                            left: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 50,
                        }}>
                        <AntDesign name="left" size={20} color="black" />
                    </TouchableOpacity>
                )}>
                {/* </Text> */}
                <View style={{ backgroundColor: '#eee' }}>
                    <Ticket />
                    <View
                        style={{
                            backgroundColor: 'white',
                            // height: height,
                            top: -50,
                            padding: 15,
                        }}>
                        <View
                            style={{
                                // padding: 10,
                                paddingBottom: 15,
                                borderBottomWidth: 1.5,
                                borderColor: '#ccc',

                                // paddingVertical: 15,
                            }}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: '500',
                                    color: color,
                                }}>
                                Thông tin đổi thưởng
                            </Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    fontSize: 17,
                                    textAlign: 'justify',
                                    marginTop: 10,
                                }}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Omnis porro voluptatum minima ut officiis adipisci labore
                                repellendus non temporibus eveniet ducimus rem esse, eaque
                                cumque sunt vitae officia aliquid incidunt. Lorem ipsum
                                dolor sit amet consectetur adipisicing elit. Omnis porro
                                voluptatum minima ut officiis adipisci labore repellendus
                                non temporibus eveniet ducimus rem esse, eaque cumque sunt
                                vitae officia aliquid incidunt.vitae officia aliquid
                                incidunt Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Omnis porro voluptatum minima ut
                                officiis adipisci labore repellendus non temporibus
                                eveniet ducimus rem esse, eaque cumque sunt vitae officia
                                aliquid incidunt. Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Omnis porro voluptatum minima ut
                                officiis adipisci labore repellendus non temporibus
                                eveniet ducimus rem esse, eaque cumque sunt vitae officia
                                aliquid incidunt.vitae officia aliquid incidunt
                            </Text>
                        </View>
                    </View>
                </View>
            </ImageHeaderScrollView>
            <View style={{ backgroundColor: 'white', flexDirection: 'row' }}>
                <ButtonCustom
                    name="Kiểm tra lại thông tin"
                    borderRadius={10}
                    marginBottom={30}
                    marginTop={10}
                    // flex={1}
                    // paddingHorizontal={30}
                    marginHorizontal={10}
                    backgroundColor="orange"
                    onPress={handleCheckInfoBank}
                />
                <ButtonCustom
                    name="Đổi ngay"
                    borderRadius={10}
                    marginBottom={30}
                    marginTop={10}
                    flex={1}
                    // paddingHorizontal={30}
                    marginHorizontal={10}
                    backgroundColor="blue"
                    onPress={handleExchange}
                />
            </View>
        </>
    );
};

export default DetailExchange;
