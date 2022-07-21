import React, { useState, useEffect, useRef } from 'react';
import {
    Text,
    View,
    TextInput,
    Button,
    Alert,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Keyboard,
    Switch,
    TouchableOpacity,
    Image,
    StatusBar,
    ActivityIndicator,
    Modal,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import CustomInput from '../../../components/CustomInput';
import ButtonCustom from '../../../components/Button';
import CustomLabelInput from '../../../components/CustomLabelInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';

import UploadImg from '../../../components/UploadImg';
import SelectDropdown from 'react-native-select-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import SelectDropdownCustom from '../../../components/SelectDropdownCustom';

import { getUserDB, userSelector } from '../../../redux/reducers/userSlice';

import { vietnamProvincesAPI } from '../../../api';

import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import request from '../../../utils/request';
import { requestPermissionsAsync } from 'expo-camera';
import { ImageType } from 'expo-camera/build/Camera.types';

export default function RegisterDealer() {
    const { control, handleSubmit } = useForm();

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const { info_user } = useSelector(userSelector);

    // image piker
    const [imageCMND, setImageCMND] = useState(null);
    const [imageAvatar, setImageAvatar] = useState(null);
    const [imageBusiness, setImageBusiness] = useState(null);

    //
    const dataRef = useRef(null);

    const [_ward, setWardGet] = useState(null);
    const [_province, setProvincesGet] = useState(null);
    const [_district, setDistrictGet] = useState(null);

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

    //fetch provinces

    // provinces
    const [provincesId, setProvincesId] = useState(null);
    const [districtId, setDistrictId] = useState(null);
    const [districts, setDistricts] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [wards, setWards] = useState([]);

    const placeholder_p = {
        label: 'Chọn Tỉnh/Thành Phố',
        value: null,
        color: '#9EA0A4',
    };
    const placeholder_d = {
        label: 'Chọn Quận/Huyện',
        value: null,
        color: '#9EA0A4',
    };
    const placeholder_w = {
        label: 'Chọn Phường/Xã',
        value: null,
        color: '#9EA0A4',
    };

    useEffect(() => {
        if (info_user.info_dealer) {
            setImageCMND(info_user.info_dealer.imageCMND);
            setImageAvatar(info_user.info_dealer.imageAvatar);
            setImageBusiness(info_user.info_dealer.imageBusiness);
        }
    }, [info_user.info_dealer]);

    // provinces
    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await axios.get(vietnamProvincesAPI.provinces);
                let data = res && res.data ? res.data : [];
                setProvinces(data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, []);

    //districts
    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await axios.get(
                    vietnamProvincesAPI.get_provinces(provincesId, 2)
                );
                let data = res && res.data ? res.data : [];
                setDistricts(data.districts);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [provincesId]);

    //wards
    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await axios.get(
                    vietnamProvincesAPI.get_districts(districtId, 2)
                );
                let data = res && res.data ? res.data : [];
                setWards(data.wards);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [districtId]);

    //submit form
    const submitForm = ({
        dealer_email,
        dealer_name,
        dealer_phone_number,
        district,
        product_business,
        province,
        shop_name,
        ward,
        address,
    }) => {
        const formData = new FormData();
        const images = [
            {
                name: 'img_cmnd',
                uri: imageCMND,
            },
            {
                name: 'img_avatar',
                uri: imageAvatar,
            },
            {
                name: 'img_business',
                uri: imageBusiness,
            },
        ];
        images.map((item) => {
            formData.append('image_dealer', {
                uri: item.uri,
                type: 'image/jpeg',
                name: item.name,
            });
        });
        formData.append('dealer_email', dealer_email);
        formData.append('dealer_name', dealer_name);
        formData.append('product_business', product_business);
        formData.append('shop_name', shop_name);
        formData.append('address', address);
        formData.append('dealer_phone_number', dealer_phone_number);

        (async () => {
            try {
                setLoading(true);
                let res = await request.get(
                    vietnamProvincesAPI.get_from_code('p', province)
                );
                let res_1 = await request.get(
                    vietnamProvincesAPI.get_from_code('w', ward)
                );
                let res_2 = await request.get(
                    vietnamProvincesAPI.get_from_code('d', district)
                );
                const ward_ = res_1.data.name;
                const province_ = res.data.name;
                const district_ = res_2.data.name;
                formData.append('district', district_);
                formData.append('province', province_);
                formData.append('ward', ward_);

                const postInfoDealer = await request.post('dealer/add', formData, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (postInfoDealer.data.success) {
                    setLoading(false);
                    Alert.alert(
                        'Bạn đăng kí thành công',
                        `Bạn vui lòng kiểm tra email ${dealer_email} để hoàn thành thủ tục đăng kí. Xin cảm ơn`
                    );
                    dispatch(getUserDB());
                }
            } catch (err) {
                console.log('info_dealer_err: ', err.message);
            }
        })();
    };

    const updateForm = ({
        dealer_email,
        dealer_name,
        district,
        product_business,
        dealer_phone_number,
        province,
        shop_name,
        ward,
        address,
    }) => {
        if (
            !dealer_email &&
            !dealer_name &&
            !dealer_phone_number &&
            !district &&
            !product_business &&
            !province &&
            !shop_name &&
            !ward &&
            !address &&
            imageCMND == info_user.info_dealer.imageCMND &&
            imageAvatar == info_user.info_dealer.imageAvatar &&
            imageBusiness == info_user.info_dealer.imageBusiness
        ) {
            return Alert.alert('Thông báo', 'Hình như bạn chưa có sự thay đổi nào ?');
        }
        const formData = new FormData();
        const images = [
            {
                name: 'img_cmnd',
                uri: imageCMND,
            },
            {
                name: 'img_avatar',
                uri: imageAvatar,
            },
            {
                name: 'img_business',
                uri: imageBusiness,
            },
        ];
        images.map((item) => {
            formData.append('image_dealer', {
                uri: item.uri,
                type: 'image/jpeg',
                name: item.name,
            });
        });

        formData.append(
            'dealer_email',
            dealer_email || info_user.info_dealer.dealer_email
        );
        formData.append('dealer_name', dealer_name || info_user.info_dealer.dealer_name);
        formData.append(
            'product_business',
            product_business || info_user.info_dealer.product_business
        );
        formData.append('shop_name', shop_name || info_user.info_dealer.shop_name);
        formData.append('address', address || info_user.info_dealer.address);
        formData.append(
            'dealer_phone_number',
            dealer_phone_number || info_user.info_dealer.dealer_phone_number
        );

        (async () => {
            setLoading(true);

            try {
                let res_1, res, res_2;

                if (province && ward && district) {
                    res = await request.get(
                        vietnamProvincesAPI.get_from_code('p', province)
                    );
                    res_1 = await request.get(
                        vietnamProvincesAPI.get_from_code('w', ward)
                    );
                    res_2 = await request.get(
                        vietnamProvincesAPI.get_from_code('d', district)
                    );
                    const ward_ = res_1.data.name;
                    const province_ = res.data.name;
                    const district_ = res_2.data.name;

                    formData.append('district', district_);
                    formData.append('province', province_);
                    formData.append('ward', ward_);
                } else {
                    formData.append('district', info_user.info_dealer.district);
                    formData.append('province', info_user.info_dealer.province);
                    formData.append('ward', info_user.info_dealer.ward);
                }

                if (imageAvatar && imageBusiness && imageCMND) {
                    const res = await request.put(
                        `dealer/update/${info_user.info_dealer._id}`,
                        formData
                    );
                    if (res.data.success) {
                        setLoading(false);

                        Alert.alert('Thông báo', 'Cập nhật thông tin thành công');
                        dispatch(getUserDB());
                    }
                } else {
                    Alert.alert('Cảnh báo', 'Bạn phải cập nhật đủ hình yêu  cầu');
                }
            } catch (err) {
                setLoading(false);
                console.log('info_dealer_err: ', err.message);
            }
        })();
    };

    return (
        <SafeAreaView style={{ backgroundColor: '#fff' }}>
            <StatusBar barStyle={'dark-content'} />
            <ScrollView style={{ height: '100%' }} showsVerticalScrollIndicator={false}>
                <View style={{ paddingBottom: isKeyboardVisible ? 300 : 100 }}>
                    {/* info */}
                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        <CustomLabelInput name="Họ và tên người đăng kí" />
                        <CustomInput
                            control={control}
                            defaultValue={
                                info_user.info_dealer
                                    ? info_user.info_dealer.dealer_name
                                    : null
                            }
                            placeholder={'Nguyễn Văn A'}
                            rules={
                                info_user.info_dealer && info_user.info_dealer.dealer_name
                                    ? info_user.info_dealer.dealer_name
                                    : null
                                    ? !info_user.info_dealer.dealer_name
                                    : { required: 'Bạn bắt buôc phải nhập trường này' }
                            }
                            name={'dealer_name'}
                        />
                    </View>
                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        <CustomLabelInput name="Sản phẩm kinh doanh" />
                        <CustomInput
                            control={control}
                            defaultValue={
                                info_user.info_dealer
                                    ? info_user.info_dealer.product_business
                                    : null
                            }
                            placeholder={'Nước đóng chai'}
                            rules={
                                info_user.info_dealer &&
                                info_user.info_dealer.product_business
                                    ? info_user.info_dealer.product_business
                                    : null
                                    ? !info_user.info_dealer.product_business
                                    : { required: 'Bạn bắt buôc phải nhập trường này' }
                            }
                            name={'product_business'}
                        />
                    </View>

                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        <CustomLabelInput name="Tên đại lý" />
                        <CustomInput
                            control={control}
                            placeholder={'AWACO SHOP'}
                            defaultValue={
                                info_user.info_dealer
                                    ? info_user.info_dealer.shop_name
                                    : null
                            }
                            rules={
                                info_user.info_dealer && info_user.info_dealer.shop_name
                                    ? info_user.info_dealer.shop_name
                                    : null
                                    ? !info_user.info_dealer.shop_name
                                    : { required: 'Bạn bắt buôc phải nhập trường này' }
                            }
                            name={'shop_name'}
                        />
                    </View>

                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        <CustomLabelInput name="Email" />
                        <CustomInput
                            control={control}
                            placeholder={'example@gmail.com'}
                            defaultValue={
                                info_user.info_dealer
                                    ? info_user.info_dealer.dealer_email
                                    : null
                            }
                            rules={
                                info_user.info_dealer &&
                                info_user.info_dealer.dealer_email
                                    ? info_user.info_dealer.dealer_email
                                    : null
                                    ? !info_user.info_dealer.dealer_email
                                    : {
                                          required: 'Bạn bắt buôc phải nhập trường này',
                                          pattern: {
                                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                              message: 'Email không hợp lệ',
                                          },
                                      }
                            }
                            name={'dealer_email'}
                        />
                    </View>
                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        <CustomLabelInput name="Số điện thoại" />
                        <CustomInput
                            control={control}
                            placeholder={'0xxxx'}
                            defaultValue={
                                info_user.info_dealer
                                    ? info_user.info_dealer.dealer_phone_number
                                    : null
                            }
                            rules={
                                info_user.info_dealer &&
                                info_user.info_dealer.dealer_phone_number
                                    ? info_user.info_dealer.dealer_phone_number
                                    : null
                                    ? !info_user.info_dealer.dealer_phone_number
                                    : {
                                          required: 'Bạn bắt buôc phải nhập trường này',
                                      }
                            }
                            name={'dealer_phone_number'}
                        />
                    </View>

                    <View
                        style={{
                            paddingHorizontal: 10,
                            marginTop: 10,
                        }}>
                        <CustomLabelInput name="Tỉnh/Thành phố" />

                        <Controller
                            control={control}
                            name={'province'}
                            rules={
                                info_user.info_dealer
                                    ? info_user.info_dealer.province
                                    : null
                                    ? !info_user.info_dealer.province
                                    : { required: 'Bạn bắt buôc phải nhập trường này' }
                            }
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => (
                                <>
                                    {info_user.info_dealer ? (
                                        <Text style={{ fontSize: 17, marginBottom: 10 }}>
                                            Tỉnh/Thành phố bạn đã chọn:{' '}
                                            {info_user.info_dealer.province}
                                        </Text>
                                    ) : null}
                                    <>
                                        <RNPickerSelect
                                            items={provinces.map((item) => {
                                                return {
                                                    label: item.name,
                                                    value: item.code,
                                                };
                                            })}
                                            pickerProps={{
                                                style: {
                                                    height: 214,
                                                    overflow: 'hidden',
                                                },
                                            }}
                                            disabled={provinces.length > 0 ? false : true}
                                            onValueChange={onChange}
                                            onClose={() => setProvincesId(value)}
                                            style={{
                                                inputIOS: {
                                                    fontSize: 16,
                                                    paddingVertical: 15,
                                                    paddingHorizontal: 15,
                                                    borderWidth: 1.5,
                                                    borderColor: error ? 'red' : '#bbb',
                                                    borderRadius: 4,
                                                    color: 'black',
                                                    paddingRight: 30, // to ensure the text is never behind the icon
                                                },
                                                inputAndroid: {
                                                    fontSize: 16,
                                                    paddingHorizontal: 10,
                                                    paddingVertical: 8,
                                                    borderWidth: 0.5,
                                                    borderColor: error ? 'red' : 'purple',
                                                    borderRadius: 8,
                                                    color: 'black',
                                                    paddingRight: 30, // to ensure the text is never behind the icon
                                                },
                                            }}
                                            placeholder={placeholder_p}
                                            Icon={() => {
                                                return (
                                                    <FontAwesome
                                                        name={'chevron-down'}
                                                        color={'#aaa'}
                                                        size={18}
                                                        style={{ top: 12, right: 10 }}
                                                    />
                                                );
                                            }}
                                        />

                                        {error && (
                                            <Text
                                                style={{
                                                    color: 'red',
                                                    alignSelf: 'stretch',
                                                    fontSize: 17,
                                                }}>
                                                {error.message || 'Error'}
                                            </Text>
                                        )}
                                    </>
                                </>
                            )}
                        />
                    </View>

                    <View
                        style={{
                            paddingHorizontal: 10,
                            marginTop: 10,
                        }}>
                        <CustomLabelInput name="Quận/Huyện" />
                        <Controller
                            control={control}
                            name={'district'}
                            rules={
                                info_user.info_dealer
                                    ? info_user.info_dealer.district
                                    : null
                                    ? !info_user.info_dealer.district
                                    : { required: 'Bạn bắt buôc phải nhập trường này' }
                            }
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => (
                                <>
                                    {info_user.info_dealer ? (
                                        <Text style={{ fontSize: 17, marginBottom: 10 }}>
                                            Quận/Huyện bạn đã chọn:{' '}
                                            {info_user.info_dealer.district}
                                        </Text>
                                    ) : null}
                                    <>
                                        <RNPickerSelect
                                            items={districts.map((item) => {
                                                return {
                                                    label: item.name,
                                                    value: item.code,
                                                };
                                            })}
                                            pickerProps={{
                                                style: {
                                                    height: 214,
                                                    overflow: 'hidden',
                                                },
                                            }}
                                            disabled={districts.length > 0 ? false : true}
                                            onValueChange={onChange}
                                            onClose={() => setDistrictId(value)}
                                            style={{
                                                inputIOS: {
                                                    fontSize: 16,
                                                    paddingVertical: 15,
                                                    paddingHorizontal: 15,
                                                    borderWidth: 1.5,
                                                    borderColor: error ? 'red' : '#bbb',
                                                    borderRadius: 4,
                                                    color: 'black',
                                                    paddingRight: 30, // to ensure the text is never behind the icon
                                                },
                                                inputAndroid: {
                                                    fontSize: 16,
                                                    paddingHorizontal: 10,
                                                    paddingVertical: 8,
                                                    borderWidth: 0.5,
                                                    borderColor: error ? 'red' : 'purple',
                                                    borderRadius: 8,
                                                    color: 'black',
                                                    paddingRight: 30, // to ensure the text is never behind the icon
                                                },
                                            }}
                                            placeholder={placeholder_d}
                                            Icon={() => {
                                                return (
                                                    <FontAwesome
                                                        name={'chevron-down'}
                                                        color={'#aaa'}
                                                        size={18}
                                                        style={{ top: 12, right: 10 }}
                                                    />
                                                );
                                            }}
                                        />

                                        {error && (
                                            <Text
                                                style={{
                                                    color: 'red',
                                                    alignSelf: 'stretch',
                                                    fontSize: 17,
                                                }}>
                                                {error.message || 'Error'}
                                            </Text>
                                        )}
                                    </>
                                </>
                            )}
                        />
                    </View>
                    <View
                        style={{
                            paddingHorizontal: 10,
                            marginTop: 10,
                        }}>
                        <CustomLabelInput name="Phường/Xã" />
                        <Controller
                            control={control}
                            name={'ward'}
                            rules={
                                info_user.info_dealer
                                    ? info_user.info_dealer.ward
                                    : null
                                    ? !info_user.info_dealer.ward
                                    : { required: 'Bạn bắt buôc phải nhập trường này' }
                            }
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => (
                                <>
                                    {info_user.info_dealer ? (
                                        <Text style={{ fontSize: 17, marginBottom: 10 }}>
                                            Phường/Xã bạn đã chọn:{' '}
                                            {info_user.info_dealer.ward}
                                        </Text>
                                    ) : null}
                                    <>
                                        <RNPickerSelect
                                            items={wards.map((item) => {
                                                return {
                                                    label: item.name,
                                                    value: item.code,
                                                };
                                            })}
                                            pickerProps={{
                                                style: {
                                                    height: 214,
                                                    overflow: 'hidden',
                                                },
                                            }}
                                            disabled={wards.length > 0 ? false : true}
                                            onValueChange={onChange}
                                            style={{
                                                inputIOS: {
                                                    fontSize: 16,
                                                    paddingVertical: 15,
                                                    paddingHorizontal: 15,
                                                    borderWidth: 1.5,
                                                    borderColor: error ? 'red' : '#bbb',
                                                    borderRadius: 4,
                                                    color: 'black',
                                                    paddingRight: 30, // to ensure the text is never behind the icon
                                                },
                                                inputAndroid: {
                                                    fontSize: 16,
                                                    paddingHorizontal: 10,
                                                    paddingVertical: 8,
                                                    borderWidth: 0.5,
                                                    borderColor: error ? 'red' : 'purple',
                                                    borderRadius: 8,
                                                    color: 'black',
                                                    paddingRight: 30, // to ensure the text is never behind the icon
                                                },
                                            }}
                                            placeholder={placeholder_w}
                                            Icon={() => {
                                                return (
                                                    <FontAwesome
                                                        name={'chevron-down'}
                                                        color={'#aaa'}
                                                        size={18}
                                                        style={{ top: 12, right: 10 }}
                                                    />
                                                );
                                            }}
                                        />

                                        {error && (
                                            <Text
                                                style={{
                                                    color: 'red',
                                                    alignSelf: 'stretch',
                                                    fontSize: 17,
                                                }}>
                                                {error.message || 'Error'}
                                            </Text>
                                        )}
                                    </>
                                </>
                            )}
                        />
                    </View>
                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        <CustomLabelInput name="Địa chỉ cụ thể(Số nhà, tên đường,...)" />
                        <CustomInput
                            control={control}
                            placeholder={'Địa chỉ'}
                            defaultValue={
                                info_user.info_dealer
                                    ? info_user.info_dealer.address
                                    : null
                            }
                            rules={
                                info_user.info_dealer
                                    ? info_user.info_dealer.address
                                    : null
                                    ? !info_user.info_dealer.address
                                    : { required: 'Bạn bắt buôc phải nhập trường này' }
                            }
                            name={'address'}
                        />
                    </View>

                    {/* upload img */}

                    <View
                        style={{
                            marginTop: 10,
                        }}>
                        <UploadImg
                            label="Hình đại diện cho đại lý"
                            getImgUpload={(image) => {
                                setImageAvatar(image);
                            }}
                        />
                        {info_user.info_dealer && info_user.info_dealer.imageAvatar ? (
                            <View>
                                <Text
                                    style={{
                                        fontSize: 17,
                                        marginLeft: 10,
                                        marginTop: 5,
                                        marginBottom: 10,
                                    }}>
                                    Hình đại diện đã chọn:{' '}
                                </Text>
                                <View style={{ alignItems: 'center' }}>
                                    <Image
                                        source={{
                                            uri: info_user.info_dealer.imageAvatar,
                                        }}
                                        style={{ width: 200, height: 200 }}
                                    />
                                </View>
                            </View>
                        ) : !imageAvatar ? (
                            <Text
                                style={{
                                    color: 'red',
                                    alignSelf: 'stretch',
                                    fontSize: 17,
                                    paddingLeft: 10,
                                }}>
                                Bạn bắt buộc phải chọn hình
                            </Text>
                        ) : null}
                    </View>

                    <View
                        style={{
                            marginTop: 10,
                        }}>
                        <UploadImg
                            label="Đăng kí kinh doanh"
                            getImgUpload={(image) => {
                                setImageBusiness(image);
                            }}
                        />
                        {info_user.info_dealer && info_user.info_dealer.imageBusiness ? (
                            <View>
                                <Text
                                    style={{
                                        fontSize: 17,
                                        marginLeft: 10,
                                        marginTop: 5,
                                        marginBottom: 10,
                                    }}>
                                    Đăng kí kinh doanh đã chọn:{' '}
                                </Text>
                                <View style={{ alignItems: 'center' }}>
                                    <Image
                                        source={{
                                            uri: info_user.info_dealer.imageBusiness,
                                        }}
                                        style={{ width: 200, height: 200 }}
                                    />
                                </View>
                            </View>
                        ) : !imageBusiness ? (
                            <Text
                                style={{
                                    color: 'red',
                                    alignSelf: 'stretch',
                                    fontSize: 17,
                                    paddingLeft: 10,
                                }}>
                                Bạn bắt buộc phải chọn hình
                            </Text>
                        ) : null}
                    </View>
                    <View
                        style={{
                            marginTop: 10,
                        }}>
                        <UploadImg
                            label="Chứng minh nhân dân người đăng kí"
                            getImgUpload={(image) => {
                                setImageCMND(image);
                            }}
                        />
                        {info_user.info_dealer && info_user.info_dealer.imageCMND ? (
                            <View>
                                <Text
                                    style={{
                                        fontSize: 17,
                                        marginLeft: 10,
                                        marginTop: 5,
                                        marginBottom: 10,
                                    }}>
                                    Chứng minh nhân dân đã chọn:{' '}
                                </Text>
                                <View style={{ alignItems: 'center' }}>
                                    <Image
                                        source={{
                                            uri: info_user.info_dealer.imageCMND,
                                        }}
                                        style={{ width: 200, height: 200 }}
                                    />
                                </View>
                            </View>
                        ) : !imageCMND ? (
                            <Text
                                style={{
                                    color: 'red',
                                    alignSelf: 'stretch',
                                    fontSize: 17,
                                    paddingLeft: 10,
                                }}>
                                Bạn bắt buộc phải chọn hình
                            </Text>
                        ) : null}
                    </View>

                    {/* end upload img */}

                    {/* end info */}
                </View>
            </ScrollView>

            {/* buton submit */}
            <View
                style={{
                    paddingBottom: 30,
                    // backgroundColor: '#eee',
                    width: '100%',
                    bottom: 0,
                    position: 'absolute',
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                }}>
                <ButtonCustom
                    sizeText={18}
                    disabled={info_user.info_dealer ? true : false}
                    name={'Gửi yêu cầu'}
                    backgroundColor={info_user.info_dealer ? '#ccc' : 'blue'}
                    marginHorizontal={null}
                    borderRadius={10}
                    flex={1}
                    opacityBtn={0.7}
                    onPress={handleSubmit(submitForm)}
                />
                <ButtonCustom
                    disabled={info_user.info_dealer ? false : true}
                    sizeText={18}
                    name={'Cập nhật thông tin'}
                    marginHorizontal={null}
                    backgroundColor={info_user.info_dealer ? 'orange' : '#ccc'}
                    borderRadius={10}
                    opacityBtn={0.9}
                    marginLeft={10}
                    onPress={handleSubmit(updateForm)}
                />
            </View>
            {/* end btn submit */}
            {/* modal */}
            <Modal animationType="fade" transparent={true} visible={loading}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    }}>
                    <ActivityIndicator size="large" color={'orange'} />
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 24,
                            fontWeight: '800',
                            marginTop: 20,
                        }}>
                        Bạn vui lòng chờ trong 3 phút
                    </Text>
                </View>
            </Modal>
            {/* end modal */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {},
    btn_group: {
        paddingBottom: 35,
        // backgroundColor: '#eee',
        width: '100%',
        bottom: 0,
        position: 'absolute',
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderWidth: 1.5,
        borderColor: '#bbb',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
    },
});
