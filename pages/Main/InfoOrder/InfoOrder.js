import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import CustomInput from '../../../components/CustomInput';
import ButtonCustom from '../../../components/Button';
import CustomLabelInput from '../../../components/CustomLabelInput';

export default function InfoOrder() {
    const { control, handleSubmit } = useForm();
    const [isDataForm, setIsDataForm] = useState(false);
    const submitForm = (data) => {
        console.log(data);
        setIsDataForm(true);
    };
    //switch
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

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
    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <ScrollView style={{ height: '100%' }} showsVerticalScrollIndicator={false}>
                <View style={{ paddingBottom: isKeyboardVisible ? 300 : 100 }}>
                    {/* info */}
                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        <CustomLabelInput name="Họ tên người nhận" />
                        <CustomInput
                            control={control}
                            placeholder={'Nguyễn Văn A'}
                            rules={{ required: 'Bạn bắt buôc phải nhập trường này' }}
                            name={'full_name'}
                        />
                    </View>

                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        <CustomLabelInput name="Số điện thoại người nhận" />
                        <CustomInput
                            control={control}
                            placeholder={'09xxx'}
                            rules={{ required: 'Bạn bắt buôc phải nhập trường này' }}
                            name={'phone_number'}
                        />
                    </View>

                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        <CustomLabelInput name="Tỉnh/Thành phố" />
                        <CustomInput
                            control={control}
                            placeholder={'Tỉnh/Thành phố...'}
                            rules={{ required: 'Bạn bắt buôc phải nhập trường này' }}
                            name={'address_city'}
                        />
                    </View>
                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        <CustomLabelInput name="Quận/Huyện" />
                        <CustomInput
                            control={control}
                            placeholder={'Quận/Huyện'}
                            rules={{ required: 'Bạn bắt buôc phải nhập trường này' }}
                            name={'address_quan'}
                        />
                    </View>
                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                        <CustomLabelInput name="Phường/Xã" />
                        <CustomInput
                            control={control}
                            placeholder={'Phường/Xã'}
                            rules={{ required: 'Bạn bắt buôc phải nhập trường này' }}
                            name={'address_phuong'}
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
                    {/* set default */}
                    <View
                        style={{
                            paddingHorizontal: 10,
                            marginTop: 15,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <Text style={{ fontSize: 18, fontWeight: '500' }}>
                            Đặt làm mặc địch
                        </Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0fe' }}
                            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
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
                    name={'Hoàn tất'}
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
