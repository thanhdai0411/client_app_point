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

import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useIsFocused } from '@react-navigation/native';

// import
import CustomInput from '../../../components/CustomInput';
import ButtonCustom from '../../../components/Button';
import CustomLabelInput from '../../../components/CustomLabelInput';
import SelectDate from '../../../components/SelectDate';

import UploadImg from '../../../components/UploadImg';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import SelectDropdownCustom from '../../../components/SelectDropdownCustom';

import { vietnamBankAPI, vietnamProvincesAPI } from '../../../api';

import axios from 'axios';
import CustomStatusBar from '../../../components/CustomStatusBar';

export default function InfoBank() {
    const { control, handleSubmit, setValue } = useForm();
    const isFocused = useIsFocused();
    const [image, setImage] = useState(null);
    const [publishDate, setPublishDate] = useState('');

    // image piker

    const submitForm = (data) => {
        const dataFormBank = {
            ...data,
            date_publish_cmnd: publishDate,
        };
        console.log(dataFormBank);
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

    const [listBank, setListBank] = useState([]);
    const [provinces, setProvinces] = useState([]);

    const placeholder_name = {
        label: 'Chọn Ngân hàng',
        value: null,
        color: '#9EA0A4',
    };
    const placeholder_cn = {
        label: 'Chọn Chi nhánh',
        value: null,
        color: '#9EA0A4',
    };
    const placeholder_nc = {
        label: 'Chọn Nơi cấp',
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

    // list bank
    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await axios.get(vietnamBankAPI.list_banks);
                let data = res && res.data ? res.data.data : [];
                // console.log(data);
                setListBank(data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, []);

    return (
        <SafeAreaView style={{ backgroundColor: '#fff' }}>
            {isFocused && <CustomStatusBar />}

            <ScrollView style={{ height: '100%' }} showsVerticalScrollIndicator={false}>
                <View style={{ paddingBottom: isKeyboardVisible ? 300 : 100 }}>
                    {/* info */}
                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        <CustomLabelInput name="Tên ngân hàng" />
                        <Controller
                            control={control}
                            name={'name_bank'}
                            rules={{ required: 'Bạn bắt buôc phải nhập trường này' }}
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => (
                                <>
                                    <RNPickerSelect
                                        items={listBank.map((item) => {
                                            return {
                                                label: item.shortName,
                                                value: item.shortName,
                                            };
                                        })}
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
                                        placeholder={placeholder_name}
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
                            )}
                        />
                    </View>

                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        <CustomLabelInput name="Tên chi nhánh" />
                        <CustomInput
                            control={control}
                            placeholder={'Chi nhánh Bình Tân'}
                            rules={{ required: 'Bạn bắt buôc phải nhập trường này' }}
                            name={'branch_bank'}
                        />
                    </View>
                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        <CustomLabelInput name="Tên chủ tài khoản" />
                        <CustomInput
                            control={control}
                            placeholder={'Nguyen Van A'}
                            rules={{ required: 'Bạn bắt buôc phải nhập trường này' }}
                            name={'name_account'}
                        />
                    </View>
                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        <CustomLabelInput name="Sô tài khoản" />
                        <CustomInput
                            control={control}
                            placeholder={'9999 999...'}
                            // keyBoardType={""}
                            rules={{ required: 'Bạn bắt buôc phải nhập trường này' }}
                            name={'account_number'}
                        />
                    </View>
                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        <CustomLabelInput name="Số CMND" />
                        <CustomInput
                            control={control}
                            placeholder={'036...'}
                            rules={{ required: 'Bạn bắt buôc phải nhập trường này' }}
                            name={'number_cmnd'}
                        />
                    </View>
                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        <CustomLabelInput name="Ngày cấp CMND" />
                        <SelectDate valueSelect={(value) => setPublishDate(value)} />
                    </View>

                    {/*  */}
                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        <CustomLabelInput name="Nơi cấp CMND" />
                        <Controller
                            control={control}
                            name={'cmnd_issued_by'}
                            rules={{ required: 'Bạn bắt buôc phải nhập trường này' }}
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => (
                                <>
                                    <RNPickerSelect
                                        onValueChange={onChange}
                                        items={provinces.map((item) => {
                                            return { label: item.name, value: item.name };
                                        })}
                                        style={{
                                            inputIOS: {
                                                fontSize: 16,
                                                paddingVertical: 15,
                                                paddingHorizontal: 15,
                                                borderWidth: 1.5,
                                                borderColor: error ? 'red' : '#bbb',
                                                borderRadius: 8,
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
                                        placeholder={placeholder_nc}
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
                            )}
                        />
                    </View>
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
                    name={'Cập nhật thông tin'}
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
