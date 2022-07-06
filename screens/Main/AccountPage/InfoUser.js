import {
    View,
    Text,
    Dimensions,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import
import CustomInput from '../../../components/CustomInput';
import CustomLabelInput from '../../../components/CustomLabelInput';
import { useForm, Controller } from 'react-hook-form';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import ButtonCustom from '../../../components/Button';
import CustomHeader from '../../../components/CustomHeader';
import UploadImg from '../../../components/UploadImg';

import request from '../../../utils/request';

import { userSelector, getUserDB } from '../../../redux/reducers/userSlice';
let header_color = '#178dde';

const { width, height } = Dimensions.get('window');
const InfoUser = ({ navigation }) => {
    const [imageUpload, setImageUpload] = useState(null);
    const { control, handleSubmit } = useForm();
    const { info_user } = useSelector(userSelector);

    const inputRef = useRef(null);
    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);

    const dispatch = useDispatch();

    const handleFocus = () => {
        inputRef.current.focus();
    };

    const submitForm = (data) => {
        const dataInfoUser = {
            ...data,
            phone_number: info_user.phone_number,
            avatar: imageUpload,
        };
        // console.log(dataInfoUser);
        if (
            dataInfoUser.email &&
            dataInfoUser.address &&
            dataInfoUser.avatar &&
            dataInfoUser.username
        )
            (async () => {
                try {
                    const res = await request.put(
                        `user/update_user_phone/${info_user.phone_number}`,
                        dataInfoUser
                    );

                    if (res.data.success) {
                        navigation.navigate('Main');
                        dispatch(getUserDB());
                        Alert.alert('Cập nhật thông tin cá nhân thành công');
                    }
                } catch (err) {
                    Alert.alert('Cập nhật thông tin cá nhân thất bại');
                }
            })();

        const updateUser = async (data, field, message) => {
            try {
                const res = await request.put(
                    `user/update_user_phone/${info_user.phone_number}`,
                    { [field]: data }
                );

                if (res.data.success) {
                    navigation.navigate('Main');
                    dispatch(getUserDB());
                    Alert.alert(`Cập nhật thông tin ${message} thành công`);
                }
            } catch (err) {
                Alert.alert('Cập nhật thông tin cá nhân thất bại');
            }
        };

        if (dataInfoUser.email) updateUser(dataInfoUser.email, 'email', 'Email');
        if (dataInfoUser.address) updateUser(dataInfoUser.address, 'address', 'Địa chỉ');
        if (dataInfoUser.username)
            updateUser(dataInfoUser.username, 'username', 'Tên cá nhâ');
        if (dataInfoUser.avatar)
            updateUser(dataInfoUser.avatar, 'avatar', 'Hình đại diện');
    };

    return (
        // <>
        //     {info_user.username ? () : ()}
        // </>
        <View style={{ backgroundColor: header_color }}>
            <ScrollView>
                <View
                    style={{
                        backgroundColor: header_color,
                        height: height / 5,
                        width: width,
                    }}></View>
                <View
                    style={{
                        backgroundColor: '#fff',
                        // height: height,
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        top: -55,
                        paddingBottom: 50,
                        height: '100%',
                    }}>
                    <View
                        style={{
                            // position: 'absolute',
                            // justifyContent: 'center',
                            alignItems: 'center',
                            top: -60,
                        }}>
                        {imageUpload ? (
                            <Image
                                source={{ uri: imageUpload }}
                                style={{
                                    width: 150,
                                    height: 150,
                                    borderRadius: 100,
                                    borderWidth: 3,
                                    borderColor: '#eee',
                                    marginHorizontal: 'auto',
                                }}
                                resizeMode="cover"
                            />
                        ) : (
                            <Image
                                source={
                                    info_user.avatar
                                        ? { uri: info_user.avatar }
                                        : require('../../../assets/img/non_user.jpg')
                                }
                                style={{
                                    width: 150,
                                    height: 150,
                                    borderRadius: 100,
                                    borderWidth: 3,
                                    borderColor: '#eee',
                                    marginHorizontal: 'auto',
                                }}
                                resizeMode="cover"
                            />
                        )}

                        <Text style={{ marginTop: 10, fontSize: 25 }}>
                            {info_user.username ? info_user.username : 'Nguyen Van A'}
                        </Text>
                    </View>
                    {/* update number_phone */}
                    <View style={{ top: -70 }}>
                        <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                            {/* number phone */}

                            <CustomLabelInput
                                name="Họ và tên"
                                require={false}
                                paddingLeft={5}
                                marginBottom={8}
                                marginTop={10}
                                fontSize={18}
                            />
                            <CustomInput
                                control={control}
                                placeholder="Nguyen Van A"
                                defaultValue={
                                    info_user.username ? info_user.username : null
                                }
                                refInput={inputRef}
                                rules={
                                    info_user.username
                                        ? null
                                        : {
                                              required:
                                                  'Bạn bắt buôc phải nhập trường này',
                                          }
                                }
                                name={'username'}
                                borderWidth={0}
                                borderBottomWidth={1}
                                paddingLeft={5}
                                paddingVertical={null}
                                paddingBottom={5}
                                iconRight={
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        onPress={handleFocus}>
                                        <EvilIcons name="pencil" size={35} color="#aaa" />
                                    </TouchableOpacity>
                                }
                            />
                            <CustomLabelInput
                                name="Số điện thoại"
                                require={false}
                                paddingLeft={5}
                                // marginBottom={null}
                                marginBottom={8}
                                marginTop={15}
                                fontSize={18}
                            />
                            <CustomInput
                                control={control}
                                defaultValue={info_user.phone_number}
                                editable={false}
                                value={info_user.phone_number}
                                // placeholder={'09xxx'}
                                // rules={{ required: 'Bạn bắt buôc phải nhập trường này' }}
                                name={'phone_number'}
                                borderWidth={0}
                                borderBottomWidth={1}
                                paddingLeft={5}
                                paddingVertical={null}
                                paddingBottom={5}
                            />
                            {/* email */}
                            <CustomLabelInput
                                name="Email"
                                require={false}
                                paddingLeft={5}
                                // marginBottom={null}
                                marginBottom={8}
                                marginTop={15}
                                fontSize={18}
                            />
                            <CustomInput
                                control={control}
                                // defaultValue={'ngothanhdai123@gmail.com'}
                                defaultValue={info_user.email ? info_user.email : null}
                                rules={
                                    info_user.email
                                        ? null
                                        : {
                                              required:
                                                  'Bạn bắt buôc phải nhập trường này',
                                          }
                                }
                                placeholder={'Email cua ban'}
                                name={'email'}
                                borderWidth={0}
                                borderBottomWidth={1}
                                paddingLeft={5}
                                paddingVertical={null}
                                paddingBottom={5}
                                color={'red'}
                                refInput={inputRef1}
                                iconRight={
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        onPress={() => inputRef1.current.focus()}>
                                        <EvilIcons name="pencil" size={35} color="#aaa" />
                                    </TouchableOpacity>
                                }
                            />
                            {/* address */}
                            <CustomLabelInput
                                name="Địa chỉ"
                                require={false}
                                paddingLeft={5}
                                // marginBottom={null}
                                marginBottom={8}
                                marginTop={15}
                                fontSize={18}
                            />
                            <CustomInput
                                control={control}
                                // defaultValue={'Ao Đôi, Bình Tân, Hồ Chí Minh'}
                                defaultValue={
                                    info_user.address ? info_user.address : null
                                }
                                rules={
                                    info_user.address
                                        ? null
                                        : {
                                              required:
                                                  'Bạn bắt buôc phải nhập trường này',
                                          }
                                }
                                placeholder={'Địa chỉ của bạn'}
                                name={'address'}
                                borderWidth={0}
                                borderBottomWidth={1}
                                paddingLeft={5}
                                paddingVertical={null}
                                paddingBottom={5}
                                refInput={inputRef2}
                                iconRight={
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        onPress={() => inputRef2.current.focus()}>
                                        <EvilIcons name="pencil" size={35} color="#aaa" />
                                    </TouchableOpacity>
                                }
                            />

                            {/* avatar user */}
                            <UploadImg
                                label="Thay đổi hình đại diện"
                                requireLabel={false}
                                paddingHorizontal={null}
                                marginTopWrap={8}
                                getImgUpload={(image) => {
                                    setImageUpload(image);
                                }}
                            />
                        </View>
                    </View>
                </View>
                {/* end update info */}
            </ScrollView>
            {/* buton submit */}
            <View
                style={{
                    paddingBottom: 50,
                    backgroundColor: '#fff',
                    width: '100%',
                    bottom: 0,
                    position: 'absolute',
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    // top: -160,
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
        </View>
    );
};

export default InfoUser;
