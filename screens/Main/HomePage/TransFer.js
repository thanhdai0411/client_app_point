import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Keyboard,
    Alert,
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

//import
import { box_shadow } from '../../../components/GlobalStyles';
import { userSelector, getUserDB } from '../../../redux/reducers/userSlice';
import CustomInput from '../../../components/CustomInput';
import Coin from '../../../components/Coin';
import CustomLabelInput from '../../../components/CustomLabelInput';
import ButtonCustom from '../../../components/Button';
import request from '../../../utils/request';
import useFetch from '../../../hooks/useFetch';
import ModalLoading from '../../../components/ModalLoading';

const color = '#CEE5D0';
const TransFer = () => {
    const { info_user } = useSelector(userSelector);
    const { control, handleSubmit } = useForm();
    const [loadingTransfer, setLoadingTransfer] = useState(false);

    const inputRef = useRef();
    const inputRef_1 = useRef();
    const inputRef_2 = useRef();

    const dispatch = useDispatch();

    const handleFocus = () => {
        inputRef.current.focus();
    };

    // detect keyboard
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true); // or some other action
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false); // or some other action
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const presentNumberPont = info_user.number_point;
    const phoneNumberUser = info_user.phone_number;
    const idUser = info_user._id;

    const handleTransferPoint = ({
        note_transfer,
        number_point_transfer,
        phone_number_transfer,
    }) => {
        console.log({ phone_number_transfer });
        if (phone_number_transfer != phoneNumberUser) {
            setLoadingTransfer(true);
            (async () => {
                const res = await request(`user/get_phone/${phone_number_transfer}`);
                const data = res && res.data.data ? res.data.data : null;

                if (data) {
                    if (presentNumberPont >= number_point_transfer) {
                        const pointRemain = presentNumberPont - number_point_transfer;

                        const handleTransfer = async () => {
                            const res = await request.put(
                                `user/update_user_id/${idUser}`,
                                {
                                    number_point: pointRemain,
                                }
                            );
                            const res_2 = await request.put(
                                `user/update_user_phone/${phone_number_transfer}`,
                                {
                                    number_point_transfer:
                                        data.number_point_transfer +
                                        +number_point_transfer,
                                    number_point:
                                        data.number_point + +number_point_transfer,
                                }
                            );

                            // history
                            const htrUser = {
                                user_id: idUser,
                                transfer_points: number_point_transfer,
                                info_transfer_points: ` do chuyển điểm cho ${phone_number_transfer} với nối dung chuyển "${note_transfer}"`,
                            };
                            const htrFriend = {
                                phone_number: phone_number_transfer,
                                donate_points: number_point_transfer,
                                info_donate_points: ` từ ${phoneNumberUser} chuyển với nội dung "${note_transfer}"`,
                            };
                            const htr_user = await request.post(
                                'history_point/add_id',
                                htrUser
                            );
                            const htr_friend = await request.post(
                                'history_point/add_phone',
                                htrFriend
                            );

                            if (
                                res.data.success &&
                                res_2.data.success &&
                                htr_user.data.success &&
                                htr_friend.data.success
                            ) {
                                dispatch(getUserDB());

                                Alert.alert(
                                    'Thông báo',
                                    `Bạn đã chuyển ${number_point_transfer}đ thành công cho ${phone_number_transfer}`
                                );
                            } else {
                                Alert.alert(
                                    'Thông báo',
                                    `Bạn đã chuyển ${number_point_transfer}đ không thành công cho ${phone_number_transfer}`
                                );
                            }
                            setLoadingTransfer(false);
                        };

                        Alert.alert(
                            'Thông báo',
                            `Bạn chắc chắn chuyển ${number_point_transfer}đ cho ${phone_number_transfer} số điểm còn lại của bạn sẽ là ${pointRemain}đ`,
                            [
                                {
                                    text: 'Trở lại',
                                    style: 'cancel',
                                },
                                {
                                    text: 'Chuyển ngay',
                                    onPress: () => handleTransfer(),
                                },
                            ]
                        );
                    } else {
                        setLoadingTransfer(false);

                        Alert.alert(
                            'Thông báo',
                            `Bạn hiện có ${presentNumberPont}đ không đủ ${number_point_transfer}đ để chuyển`
                        );
                    }
                } else {
                    setLoadingTransfer(false);

                    Alert.alert(
                        'Cảnh báo',
                        'Vui lòng nhập người giới thiệu là người đã sử dụng App'
                    );
                }
            })();
        } else {
            Alert.alert('Cảnh báo', 'Không được chuyển tiền cho chính bản thân');
        }

        //
    };

    return (
        <View style={{ backgroundColor: color, flex: 1 }}>
            <StatusBar barStyle={'dark-content'} />
            <View
                style={{
                    paddingTop: 20,
                    paddingBottom: 30,
                    paddingHorizontal: 15,
                    backgroundColor: color,
                }}>
                <Text style={{ fontSize: 30, fontWeight: '800' }}>
                    <Text>Hi, </Text>
                    <Text>{info_user.username}</Text>
                </Text>
                <Text style={{ fontSize: 16, marginTop: 8 }}>
                    Số điện thoại {info_user.phone_number}
                </Text>
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <View
                        style={{
                            backgroundColor: '#EEEEEE',
                            width: 300,
                            // borderTopLeftRadius: 30,
                            borderRadius: 20,
                            // borderBottomRightRadius: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 10,
                            borderWidth: 1,
                            borderColor: '#ccc',
                            ...box_shadow,
                        }}>
                        <Text style={{ fontSize: 20, marginBottom: 2, marginTop: 5 }}>
                            Số điểm hiện tại của bạn
                        </Text>
                        <Text style={{ fontSize: 28, fontWeight: '700' }}>
                            {' '}
                            ${info_user.number_point}{' '}
                        </Text>
                    </View>
                </View>
            </View>
            <View
                style={{
                    backgroundColor: '#fff',
                    height: '100%',
                    borderTopRightRadius: 30,
                    borderTopLeftRadius: 30,
                    marginTop: isKeyboardVisible ? -100 : 0,
                }}>
                <Text
                    style={{
                        fontSize: 30,
                        textAlign: 'center',
                        marginTop: 23,
                        fontWeight: '500',
                    }}>
                    Thông tin chuyển điểm
                </Text>
                <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                    <CustomLabelInput
                        name="Số điểm thoại người muốn chuyển"
                        require={false}
                        paddingLeft={5}
                        marginBottom={8}
                        marginTop={10}
                        fontSize={18}
                    />
                    <CustomInput
                        control={control}
                        keyboardType={'number-pad'}
                        placeholder="Nhập số điện thoại "
                        refInput={inputRef}
                        rules={{
                            required: 'Bạn bắt buôc phải nhập trường này',
                        }}
                        name={'phone_number_transfer'}
                        borderWidth={0}
                        borderBottomWidth={1}
                        paddingLeft={5}
                        paddingVertical={null}
                        paddingBottom={5}
                        iconRight={
                            <TouchableOpacity activeOpacity={0.5} onPress={handleFocus}>
                                <EvilIcons name="pencil" size={35} color="#aaa" />
                            </TouchableOpacity>
                        }
                    />
                </View>
                <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                    <CustomLabelInput
                        name="Số điểm muôn chuyển"
                        require={false}
                        paddingLeft={5}
                        marginBottom={8}
                        marginTop={10}
                        fontSize={18}
                    />
                    <CustomInput
                        control={control}
                        keyboardType={'number-pad'}
                        placeholder="Nhập số điểm muốn chuyển"
                        refInput={inputRef_1}
                        rules={{
                            required: 'Bạn bắt buôc phải nhập trường này',
                        }}
                        name={'number_point_transfer'}
                        borderWidth={0}
                        borderBottomWidth={1}
                        paddingLeft={5}
                        paddingVertical={null}
                        paddingBottom={5}
                        iconRight={
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => inputRef_1.current.focus()}>
                                <EvilIcons name="pencil" size={35} color="#aaa" />
                            </TouchableOpacity>
                        }
                    />
                </View>
                <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                    <CustomLabelInput
                        name="Nội dung chuyển điểm"
                        require={false}
                        paddingLeft={5}
                        marginBottom={8}
                        marginTop={10}
                        fontSize={18}
                    />
                    <CustomInput
                        control={control}
                        placeholder="Nội dung chuyển"
                        // keyboardType={'email-address'}
                        returnKeyType="done"
                        refInput={inputRef_2}
                        rules={{
                            required: 'Bạn bắt buôc phải nhập trường này',
                        }}
                        name={'note_transfer'}
                        borderWidth={0}
                        borderBottomWidth={1}
                        paddingLeft={5}
                        paddingVertical={null}
                        paddingBottom={5}
                        iconRight={
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => inputRef_2.current.focus()}>
                                <EvilIcons name="pencil" size={35} color="#aaa" />
                            </TouchableOpacity>
                        }
                    />
                </View>
                <View style={{ marginTop: 70 }}>
                    <ButtonCustom
                        name="Xác nhận chuyển điểm"
                        marginHorizontal={20}
                        borderRadius={10}
                        backgroundColor={'#FEB139'}
                        onPress={handleSubmit(handleTransferPoint)}
                    />
                </View>
                {loadingTransfer && <ModalLoading />}
            </View>
        </View>
    );
};

export default TransFer;
