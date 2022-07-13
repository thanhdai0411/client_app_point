import {
    View,
    Text,
    ImageBackground,
    Dimensions,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,
    Modal,
    Pressable as Preservable,
    StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

import {
    ImageHeaderScrollView,
    TriggeringView,
} from 'react-native-image-header-scroll-view';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

// import
import Ticket from '../../../components/Ticket';
import CustomStatusBar from '../../../components/CustomStatusBar';
import Coin from '../../../components/Coin';
import ButtonCustom from '../../../components/Button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import request from '../../../utils/request';
import { userSelector, getUserDB } from '../../../redux/reducers/userSlice';
import useFetch from '../../../hooks/useFetch';
import CustomInput from '../../../components/CustomInput';
import CustomLabelInput from '../../../components/CustomLabelInput';

const { width, height } = Dimensions.get('window');
let color = '#178dde';

const DetailDescription = ({ dataFetch, marginTop }) => {
    return (
        <View style={{ marginTop: marginTop }}>
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
                        lineHeight: 25,
                    }}>
                    {dataFetch.description}
                    <Text style={{ fontWeight: '500' }}>
                        {'\n'}- Số lượng quà còn lại : {dataFetch.number_count}
                    </Text>
                </Text>
            </View>
        </View>
    );
};

const DetailExchange = ({ navigation, route }) => {
    const { id } = route.params;
    const dispatch = useDispatch();

    const { isLoading, dataFetch } = useFetch(`gift/get/${id}`);
    const [modalVisible, setModalVisible] = useState(false);
    const isFocused = useIsFocused();

    const { info_user } = useSelector(userSelector);
    const { control, handleSubmit } = useForm();

    const numberPresentPointUser = info_user.number_point;
    const idUser = info_user._id;
    const numberPointGift = dataFetch.number_point_buy;
    const numberCountGift = dataFetch.number_count;
    const idGift = dataFetch._id;

    const handleConfirmExchange = ({ amount_gift: data }) => {
        const totalPointGift = numberPointGift * data;
        const amountGift = numberCountGift - data;

        const exChange = () => {
            if (numberPresentPointUser >= totalPointGift) {
                const pointUserRemain = numberPresentPointUser - totalPointGift;

                (async () => {
                    try {
                        //update number point user again
                        const res = await request.put(`user/update_user_id/${idUser}`, {
                            number_point: pointUserRemain,
                        });

                        // update amount gift
                        console.log({ amountGift });
                        let res_1;
                        if (amountGift == 0) {
                            res_1 = await request.delete(`gift/delete/${idGift}`, {
                                number_count: amountGift,
                            });
                        } else {
                            res_1 = await request.put(`gift/update/${idGift}`, {
                                number_count: amountGift,
                            });
                        }

                        // update history exchange
                        const htrUser = {
                            user_id: idUser,
                            exchange_point: totalPointGift,
                            info_exchange_point: ` do đổi ${data} quà "${dataFetch.title}"`,
                        };
                        const htr_user = await request.post(
                            'history_point/add_id',
                            htrUser
                        );

                        if (
                            res.data.success &&
                            res_1.data.success &&
                            htr_user.data.success
                        ) {
                            setModalVisible(false);
                            navigation.goBack();
                            Alert.alert(
                                'Đổi điểm thành công! Chúng tôi sẽ trao quà sớm nhất đến bạn '
                            );
                            dispatch(getUserDB());
                        } else {
                            Alert.alert('Đổi điểm không thành công ');
                        }
                    } catch (err) {
                        console.log({ exchange_gift_err: err.message });
                    }
                })();
            } else {
                Alert.alert(
                    'Bạn không có đủ điểm để đổi. Hãy tích thêm điểm và quay lại đổi bạn nhé !'
                );
            }
        };

        Alert.alert(
            'Thông báo',
            `Bạn chắc chắn đổi ${data} quà này. Bạn sẽ bị trừ ${totalPointGift}đ vào điểm của bạn`,
            [
                {
                    text: 'Quay lại',
                    style: 'cancel',
                },
                { text: 'Đổi ngay', onPress: () => exChange() },
            ]
        );

        // if (numberPresentPointUser >= totalPointGift) {
        //     const pointUserRemain = numberPresentPointUser - totalPointGift;

        //     (async () => {
        //         try {
        //             //update number point user again
        //             const res = await request.put(`user/update_user_id/${idUser}`, {
        //                 number_point: pointUserRemain,
        //             });

        //             // update amount gift
        //             console.log({ amountGift });
        //             const res_1 = await request.put(`gift/update/${idGift}`, {
        //                 number_count: amountGift,
        //             });

        //             if (res.data.success && res_1.data.success) {
        //                 setModalVisible(false);
        //                 navigation.goBack();
        //                 Alert.alert(
        //                     'Đổi điểm thành công! Chúng tôi sẽ trao quà sớm nhất đến bạn '
        //                 );
        //                 dispatch(getUserDB());
        //             } else {
        //                 Alert.alert('Đổi điểm không thành công ');
        //             }
        //         } catch (err) {
        //             console.log({ exchange_gift_err: err.message });
        //         }
        //     })();
        // } else {
        //     Alert.alert(
        //         'Bạn không có đủ điểm để đổi. Hãy tích thêm điểm và quay lại đổi bạn nhé !'
        //     );
        // }
    };

    const handleExchange = () => {
        if (info_user.info_bank && info_user.email) {
            setModalVisible(true);

            //
        } else if (!info_user.email || !info_user.info_bank) {
            Alert.alert(
                'Bạn chưa cập nhập đầy đủ thông tin cá nhân hoặc thông tin ngân hàng. Vui lòng cập nhật đầy đủ thông tin để đổi thưởng'
            );
        }
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
                headerImage={{ uri: dataFetch.image }}
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
                    <Ticket
                        title={dataFetch.title}
                        dead_time={dataFetch.deadline}
                        number_coin={dataFetch.number_point_buy}
                        sub_title={`Đôi điềm thành ${dataFetch.type_gift}`}
                    />
                    <View
                        style={{
                            backgroundColor: 'white',
                            top: -50,
                            padding: 15,
                            height: '100%',
                        }}>
                        <DetailDescription dataFetch={dataFetch} />
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
                    backgroundColor="#006db6"
                    onPress={handleExchange}
                />
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    }}>
                    <View
                        style={{
                            backgroundColor: 'white',
                            borderRadius: 10,
                            padding: 20,
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 5,
                            width: 300,
                            marginBottom: 100,
                        }}>
                        <Text style={{ fontSize: 18 }}>Nhập số lượng quà muốn đổi</Text>
                        <CustomInput
                            control={control}
                            keyboardType={'number-pad'}
                            rules={{ required: 'Bạn phải nhập số lượng muốn dổi' }}
                            placeholder={'Nhập số lượng quà muốn đổi'}
                            name={'amount_gift'}
                            marginVertical={15}
                            padding={null}
                            textAlign={'center'}
                        />
                        <View
                            style={{
                                flexDirection: 'row',
                            }}>
                            <ButtonCustom
                                name="Xác nhận"
                                marginHorizontal={null}
                                borderRadius={5}
                                padding={10}
                                marginRight={10}
                                onPress={handleSubmit(handleConfirmExchange)}
                            />
                            <ButtonCustom
                                name="Quay lại"
                                marginHorizontal={null}
                                borderRadius={5}
                                padding={10}
                                backgroundColor={'orange'}
                                onPress={() => setModalVisible(false)}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default DetailExchange;
