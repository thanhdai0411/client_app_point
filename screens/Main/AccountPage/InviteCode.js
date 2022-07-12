import { View, Text, Alert } from 'react-native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
// import
import CustomInput from '../../../components/CustomInput';
import ButtonCustom from '../../../components/Button';
import request from '../../../utils/request';
import { userSelector, getUserDB } from '../../../redux/reducers/userSlice';
const InviteCode = () => {
    const { control, handleSubmit } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const { info_user } = useSelector(userSelector);
    const dispatch = useDispatch();

    const submitForm = (data) => {
        const { number_phone_presenter } = data;

        if (number_phone_presenter != info_user.phone_number)
            (async () => {
                setIsLoading(true);
                const res = await request(`user/get_phone/${number_phone_presenter}`);
                const data = res && res.data.data ? res.data.data : null;
                setIsLoading(false);

                if (data) {
                    const res_1 = await request.put(
                        `user/update_user_phone/${info_user.phone_number}`,
                        { number_phone_presenter }
                    );

                    if (res_1.data.success) {
                        Alert.alert('Nhập số điện thoại người giới thiệu thành công');
                        dispatch(getUserDB());
                    }
                } else {
                    Alert.alert('Vui lòng nhập người giới thiệu là người đã sử dụng App');
                }
            })();
        else {
            Alert.alert('Không được nhập chính bản thân là người giới thiệu');
        }
    };
    return (
        <View style={{ paddingHorizontal: 20, backgroundColor: '#eee', height: '100%' }}>
            <View>
                <Text
                    style={{
                        fontSize: 18,
                        marginTop: 30,
                        marginBottom: 20,
                        lineHeight: 25,
                        fontWeight: '500',
                    }}>
                    Nhập số điện thoại người giới thiệu để khi tích điểm cả hai đều có
                    điểm
                </Text>
            </View>
            {info_user.number_phone_presenter ? (
                <View>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: '500',
                            color: 'red',
                        }}>
                        Số điện thoại người giới thiệu hiện tại{' '}
                    </Text>
                    <Text style={{ fontSize: 18, marginVertical: 10 }}>
                        {info_user.number_phone_presenter}
                    </Text>
                </View>
            ) : (
                <View>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: '500',
                            color: 'red',
                        }}>
                        Số điện thoại người giới thiệu hiện tại{' '}
                    </Text>
                    <Text style={{ fontSize: 18, marginVertical: 10 }}>
                        Chưa nhập số điện thoại người giới thiệu
                    </Text>
                </View>
            )}
            <CustomInput
                control={control}
                placeholder={'Nhập số điện thoại'}
                borderWidth={1}
                colorInput={'black'}
                keyboardType="number-pad"
                autoFocus={true}
                defaultValue={info_user.number_phone_presenter}
                rules={{
                    required: 'Bạn chưa nhập số điện thoại người giới thiệu',
                }}
                name="number_phone_presenter"
            />
            <View
                style={{
                    // paddingBottom: 50,
                    marginTop: 30,
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
