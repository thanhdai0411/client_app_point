import { View, Text } from 'react-native';
import React from 'react';
import CustomInput from '../../../components/CustomInput';
import { useForm } from 'react-hook-form';
import ButtonCustom from '../../../components/Button';

const InviteCode = () => {
    const { control, handleSubmit } = useForm();

    const submitForm = (data) => {
        console.log(data);
    };
    return (
        <View style={{ marginHorizontal: 20, backgroundColor: '#eee', height: '100%' }}>
            <View>
                <Text
                    style={{
                        fontSize: 17,
                        marginTop: 30,
                        marginBottom: 20,
                        lineHeight: 25,
                    }}>
                    Nhập mã để tích điểm đổi quà từ người giới thiệu hoặc từ nhà sản xuất
                </Text>
            </View>
            <CustomInput
                control={control}
                placeholder={'Nhập mã đổi quà'}
                borderWidth={1}
                colorInput={'black'}
                autoFocus={true}
                rules={{ required: 'Mã không đúng hoặc mã đã được sử dụng' }}
            />
            <View
                style={{
                    // paddingBottom: 50,
                    marginTop: 180,
                    // backgroundColor: '#fff',
                    width: '100%',
                    // position: 'absolute',
                    flexDirection: 'row',
                    // paddingHorizontal: 20,
                    // top: -160,
                }}>
                <ButtonCustom
                    sizeText={18}
                    name={'Hoàn thành'}
                    marginHorizontal={null}
                    borderRadius={10}
                    flex={1}
                    opacityBtn={0.7}
                    onPress={handleSubmit(submitForm)}
                />
            </View>
        </View>
    );
};

export default InviteCode;
