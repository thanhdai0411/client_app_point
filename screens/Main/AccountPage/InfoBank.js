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

import { useSelector, useDispatch } from 'react-redux';

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
import request from '../../../utils/request';

import { userSelector, getUserDB } from '../../../redux/reducers/userSlice';

export default function InfoBank({ navigation }) {
    const { control, handleSubmit, setValue } = useForm();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();

    const [image, setImage] = useState(null);
    const [publishDate, setPublishDate] = useState('');
    const [infoBank, setInfoBank] = useState([]);

    const { info_user } = useSelector(userSelector);

    // console.log(info_user);

    ///=================
    const idUserScan = info_user._id; // Thanh Dai scanner

    ///=================

    const submitForm = (data) => {
        const dataFormBank = {
            ...data,
            date_publish_cmnd: publishDate,
            user_id: idUserScan,
        };

        const updateInfoBank = async (value, field, message) => {
            const res = await request.put(`info_bank/update/${info_user.info_bank._id}`, {
                [field]: value,
            });
            const data = res && res.data ? res.data.data : [];
            if (res.data.success) {
                navigation.navigate('Main');
                Alert.alert(`C???p th??ng tin ${message} ng??n h??ng th??nh c??ng`);
                dispatch(getUserDB());
            }
        };

        if (
            dataFormBank.name_bank &&
            dataFormBank.number_cmnd &&
            dataFormBank.branch_bank &&
            dataFormBank.account_number &&
            dataFormBank.name_account &&
            dataFormBank.cmnd_issued_by &&
            dataFormBank.date_publish_cmnd
        )
            (async () => {
                const res = await request.post('info_bank/add', dataFormBank);

                if (res.data.success) {
                    navigation.navigate('Main');
                    Alert.alert('C???p th??ng tin ng??n h??ng th??nh c??ng');
                    dispatch(getUserDB());
                }
            })();
        else if (
            dataFormBank.name_bank ||
            dataFormBank.number_cmnd ||
            dataFormBank.branch_bank ||
            dataFormBank.account_number ||
            dataFormBank.name_account ||
            dataFormBank.cmnd_issued_by ||
            dataFormBank.date_publish_cmnd
        ) {
            if (dataFormBank.name_bank)
                updateInfoBank(dataFormBank.name_bank, 'name_bank', 't??n');
            if (dataFormBank.branch_bank)
                updateInfoBank(dataFormBank.branch_bank, 'branch_bank', 'chi nh??nh');
            if (dataFormBank.account_number)
                updateInfoBank(
                    dataFormBank.account_number,
                    'account_number',
                    's??? t??i kho???n'
                );
            if (dataFormBank.name_account)
                updateInfoBank(
                    dataFormBank.name_account,
                    'name_account',
                    ' t??n ch??? t??i kho???n'
                );
            if (dataFormBank.number_cmnd)
                updateInfoBank(dataFormBank.number_cmnd, 'number_cmnd', null);
            if (dataFormBank.date_publish_cmnd)
                updateInfoBank(dataFormBank.date_publish_cmnd, 'date_publish_cmnd', null);
            if (dataFormBank.cmnd_issued_by)
                updateInfoBank(dataFormBank.cmnd_issued_by, 'cmnd_issued_by', null);
        } else {
            Alert.alert('B???n kh??ng c?? s??? thay ?????i n??o');
        }
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
        label: 'Ch???n Ng??n h??ng',
        value: null,
        color: '#9EA0A4',
    };
    const placeholder_cn = {
        label: 'Ch???n Chi nh??nh',
        value: null,
        color: '#9EA0A4',
    };
    const placeholder_nc = {
        label: 'Ch???n N??i c???p',
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
        <View style={{ backgroundColor: '#fff' }}>
            {isFocused && <CustomStatusBar />}

            <ScrollView style={{}} showsVerticalScrollIndicator={false}>
                <View style={{ paddingBottom: isKeyboardVisible ? 330 : 120 }}>
                    {/* info */}
                    <View
                        style={{
                            paddingHorizontal: 10,
                            marginTop: 10,
                        }}>
                        <CustomLabelInput name="T??n ng??n h??ng" />
                        <Controller
                            control={control}
                            name={'name_bank'}
                            rules={
                                info_user.info_bank && info_user.info_bank.name_bank
                                    ? info_user.info_bank.name_bank
                                    : null
                                    ? !info_user.info_bank.name_bank
                                    : { required: 'B???n b???t bu??c ph???i nh???p tr?????ng n??y' }
                            }
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => (
                                <>
                                    {info_user.info_bank ? (
                                        <Text style={{ fontSize: 17, marginBottom: 10 }}>
                                            Ng??n h??ng b???n ???? ch???n:{' '}
                                            {info_user.info_bank.name_bank}
                                        </Text>
                                    ) : null}
                                    <>
                                        <RNPickerSelect
                                            items={listBank.map((item) => {
                                                return {
                                                    label: item.shortName,
                                                    value: item.shortName,
                                                };
                                            })}
                                            pickerProps={{
                                                style: {
                                                    height: 214,
                                                    overflow: 'hidden',
                                                },
                                            }}
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
                                </>
                            )}
                        />
                    </View>

                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        <CustomLabelInput name="T??n chi nh??nh" />
                        <CustomInput
                            control={control}
                            defaultValue={
                                info_user.info_bank
                                    ? info_user.info_bank.branch_bank
                                    : null
                            }
                            placeholder={'Chi nh??nh B??nh T??n'}
                            rules={
                                info_user.info_bank && info_user.info_bank.branch_bank
                                    ? info_user.info_bank.branch_bank
                                    : null
                                    ? !info_user.info_bank.branch_bank
                                    : { required: 'B???n b???t bu??c ph???i nh???p tr?????ng n??y' }
                            }
                            name={'branch_bank'}
                        />
                    </View>
                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        <CustomLabelInput name="T??n ch??? t??i kho???n" />
                        <CustomInput
                            control={control}
                            defaultValue={
                                info_user.info_bank
                                    ? info_user.info_bank.name_account
                                    : null
                            }
                            placeholder={'Nguyen Van A'}
                            rules={
                                info_user.info_bank && info_user.info_bank.name_account
                                    ? info_user.info_bank.name_account
                                    : null
                                    ? !info_user.info_bank.name_account
                                    : { required: 'B???n b???t bu??c ph???i nh???p tr?????ng n??y' }
                            }
                            name={'name_account'}
                        />
                    </View>
                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        <CustomLabelInput name="S?? t??i kho???n" />
                        <CustomInput
                            control={control}
                            defaultValue={
                                info_user.info_bank
                                    ? info_user.info_bank.account_number
                                    : null
                            }
                            keyboardType="number-pad"
                            placeholder={'9999 999...'}
                            // keyBoardType={""}
                            rules={
                                info_user.info_bank && info_user.info_bank.account_number
                                    ? info_user.info_bank.account_number
                                    : null
                                    ? !info_user.info_bank.account_number
                                    : { required: 'B???n b???t bu??c ph???i nh???p tr?????ng n??y' }
                            }
                            name={'account_number'}
                        />
                    </View>
                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        <CustomLabelInput name="S??? CMND" />
                        <CustomInput
                            control={control}
                            keyboardType="number-pad"
                            defaultValue={
                                info_user.info_bank
                                    ? info_user.info_bank.number_cmnd
                                    : null
                            }
                            placeholder={'036...'}
                            rules={
                                info_user.info_bank
                                    ? info_user.info_bank.number_cmnd
                                    : null
                                    ? !info_user.info_bank.number_cmnd
                                    : { required: 'B???n b???t bu??c ph???i nh???p tr?????ng n??y' }
                            }
                            name={'number_cmnd'}
                        />
                    </View>
                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        <CustomLabelInput name="Ng??y c???p CMND" />
                        {info_user.info_bank ? (
                            <Text style={{ fontSize: 17, marginBottom: 10 }}>
                                Ng??y c???p b???n ???? ch???n:{' '}
                                {info_user.info_bank.date_publish_cmnd}
                            </Text>
                        ) : null}
                        <SelectDate valueSelect={(value) => setPublishDate(value)} />
                    </View>

                    {/*  */}
                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        <CustomLabelInput name="N??i c???p CMND" />
                        <Controller
                            control={control}
                            name={'cmnd_issued_by'}
                            rules={
                                info_user.info_bank
                                    ? info_user.info_bank.cmnd_issued_by
                                    : null
                                    ? !info_user.info_bank.cmnd_issued_by
                                    : { required: 'B???n b???t bu??c ph???i nh???p tr?????ng n??y' }
                            }
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => (
                                <>
                                    {info_user.info_bank ? (
                                        <Text style={{ fontSize: 17, marginBottom: 10 }}>
                                            N??i c???p b???n ???? ch???n:{' '}
                                            {info_user.info_bank.cmnd_issued_by}
                                        </Text>
                                    ) : null}
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
                    backgroundColor: '#eee',
                    width: '100%',
                    bottom: 0,
                    position: 'absolute',
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                }}>
                <ButtonCustom
                    sizeText={18}
                    name={'C???p nh???t th??ng tin'}
                    marginHorizontal={null}
                    borderRadius={10}
                    flex={1}
                    opacityBtn={0.7}
                    onPress={handleSubmit(submitForm)}
                />
            </View>
            {/* end btn submit */}
        </View>
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
