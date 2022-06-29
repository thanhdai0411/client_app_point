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
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import CustomInput from '../../../components/CustomInput';
import ButtonCustom from '../../../components/Button';
import CustomLabelInput from '../../../components/CustomLabelInput';
import Ionicons from 'react-native-vector-icons/Ionicons';

import UploadImg from '../../../components/UploadImg';
import SelectDropdown from 'react-native-select-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import SelectDropdownCustom from '../../../components/SelectDropdownCustom';

import { vietnamProvincesAPI } from '../../../api';
import useFetch from '../../../hooks/useFetch';
import { setStatusBarBackgroundColor, setStatusBarTranslucent } from 'expo-status-bar';

import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

export default function RegisterDealer() {
    const { control, handleSubmit } = useForm();

    // image piker
    const [image, setImage] = useState(null);
    const [isDataForm, setIsDataForm] = useState(false);
    const submitForm = (data) => {
        console.log(data);
        setIsDataForm(true);
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

    //fetch provinces

    // provinces

    const [provincesId, setProvincesId] = useState();
    const [districtId, setDistrictId] = useState();
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
    return (
        <SafeAreaView style={{ backgroundColor: '#fff' }}>
            <ScrollView style={{ height: '100%' }} showsVerticalScrollIndicator={false}>
                <View style={{ paddingBottom: isKeyboardVisible ? 300 : 100 }}>
                    {/* info */}
                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        <CustomLabelInput name="Họ và tên người đăng kí" />
                        <CustomInput
                            control={control}
                            placeholder={'Nguyễn Văn A'}
                            rules={{ required: 'Bạn bắt buôc phải nhập trường này' }}
                            name={'full_name'}
                        />
                    </View>
                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        <CustomLabelInput name="Sản phẩm kinh doanh" />
                        <CustomInput
                            control={control}
                            placeholder={'Nước đóng chai'}
                            rules={{ required: 'Bạn bắt buôc phải nhập trường này' }}
                            name={'full_name'}
                        />
                    </View>

                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        <CustomLabelInput name="Tên đại lý" />
                        <CustomInput
                            control={control}
                            placeholder={'AWACO SHOP'}
                            rules={{ required: 'Bạn bắt buôc phải nhập trường này' }}
                            name={'shop_name'}
                        />
                    </View>

                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        <CustomLabelInput name="Số điện thoại" />
                        <CustomInput
                            control={control}
                            placeholder={'09xxx'}
                            rules={{ required: 'Bạn bắt buôc phải nhập trường này' }}
                            name={'phone_number'}
                        />
                    </View>

                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        <CustomLabelInput name="Email" />
                        <CustomInput
                            control={control}
                            placeholder={'example@gmail.com'}
                            rules={{ required: 'Bạn bắt buôc phải nhập trường này' }}
                            name={'email'}
                        />
                    </View>

                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        <CustomLabelInput name="Tỉnh/Thành phố" />
                        <RNPickerSelect
                            onValueChange={(value) => setProvincesId(value)}
                            items={provinces.map((item) => {
                                return { label: item.name, value: item.code };
                            })}
                            style={pickerSelectStyles}
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
                    </View>
                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        <CustomLabelInput name="Quận/Huyện" />
                        <RNPickerSelect
                            onValueChange={(value) => setDistrictId(value)}
                            items={districts.map((item) => {
                                return { label: item.name, value: item.code };
                            })}
                            placeholder={placeholder_d}
                            style={pickerSelectStyles}
                            disabled={districts.length > 0 ? false : true}
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
                    </View>
                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        <CustomLabelInput name="Phường/Xã" />
                        <RNPickerSelect
                            onValueChange={(value) => console.log(value)}
                            items={wards.map((item) => {
                                return { label: item.name, value: item.code };
                            })}
                            placeholder={placeholder_w}
                            style={pickerSelectStyles}
                            disabled={wards.length > 0 ? false : true}
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
                    </View>
                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        <CustomLabelInput name="Địa chỉ cụ thể(Số nhà, tên đường,...)" />
                        <CustomInput
                            control={control}
                            placeholder={'Địa chỉ'}
                            rules={{ required: 'Bạn bắt buôc phải nhập trường này' }}
                            name={'address_nha'}
                        />
                    </View>

                    {/* upload img */}
                    <UploadImg
                        label="Hình đại diện cho đại lý"
                        getImgUpload={(image) => {
                            setImage(image);
                        }}
                    />
                    {/* end upload img */}

                    {/* end info */}
                </View>
            </ScrollView>

            {/* buton submit */}
            <View
                style={{
                    paddingBottom: 35,
                    // backgroundColor: '#eee',
                    width: '100%',
                    bottom: 0,
                    position: 'absolute',
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                }}>
                <ButtonCustom
                    sizeText={18}
                    name={'Gửi yêu cầu'}
                    marginHorizontal={null}
                    borderRadius={10}
                    flex={1}
                    opacityBtn={0.7}
                    onPress={handleSubmit(submitForm)}
                />
            </View>
            {/* end btn submit */}
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
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});
