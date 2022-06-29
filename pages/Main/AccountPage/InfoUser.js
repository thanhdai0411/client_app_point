import {
    View,
    Text,
    Dimensions,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import CustomInput from '../../../components/CustomInput';
import CustomLabelInput from '../../../components/CustomLabelInput';
import { useForm, Controller } from 'react-hook-form';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import ButtonCustom from '../../../components/Button';
import CustomHeader from '../../../components/CustomHeader';
import UploadImg from '../../../components/UploadImg';

let header_color = '#178dde';

const { width, height } = Dimensions.get('window');
const InfoUser = ({ navigation }) => {
    const [imageUpload, setImageUpload] = useState(null);
    const { control, handleSubmit } = useForm();

    const submitForm = (data) => {
        console.log(data);
    };

    return (
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
                                source={require('../../../assets/img/see.jpg')}
                                style={{
                                    width: 150,
                                    height: 150,
                                    borderRadius: 100,
                                    borderWidth: 3,
                                    borderColor: 'white',
                                    marginHorizontal: 'auto',
                                }}
                                resizeMode="cover"
                            />
                        )}

                        <Text style={{ marginTop: 10, fontSize: 25 }}>Thanh Dai</Text>
                    </View>
                    {/* update info */}
                    <View style={{ top: -70 }}>
                        <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
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
                                defaultValue="Thanh Dai"
                                placeholder={'Nguyen Van A'}
                                rules={{ required: 'Bạn bắt buôc phải nhập trường này' }}
                                name={'full_name'}
                                borderWidth={0}
                                borderBottomWidth={1}
                                paddingLeft={5}
                                paddingVertical={null}
                                paddingBottom={5}
                                iconRight={
                                    <EvilIcons name="pencil" size={35} color="#aaa" />
                                }
                            />
                            {/* number phone */}
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
                                defaultValue={'0776858522'}
                                placeholder={'09xxx'}
                                rules={{ required: 'Bạn bắt buôc phải nhập trường này' }}
                                name={'number_phone'}
                                borderWidth={0}
                                borderBottomWidth={1}
                                paddingLeft={5}
                                paddingVertical={null}
                                paddingBottom={5}
                                iconRight={
                                    <EvilIcons name="pencil" size={35} color="#aaa" />
                                }
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
                                defaultValue={'ngothanhdai123@gmail.com'}
                                placeholder={'Email  cua ban'}
                                rules={{ required: 'Bạn bắt buôc phải nhập trường này' }}
                                name={'email'}
                                borderWidth={0}
                                borderBottomWidth={1}
                                paddingLeft={5}
                                paddingVertical={null}
                                paddingBottom={5}
                                color={'red'}
                                iconRight={
                                    <EvilIcons name="pencil" size={35} color="#aaa" />
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
                                defaultValue={'Ao Đôi, Bình Tân, Hồ Chí Minh'}
                                placeholder={'Địa chỉ của bạn'}
                                rules={{ required: 'Bạn bắt buôc phải nhập trường này' }}
                                name={'address'}
                                borderWidth={0}
                                borderBottomWidth={1}
                                paddingLeft={5}
                                paddingVertical={null}
                                paddingBottom={5}
                                iconRight={
                                    <EvilIcons name="pencil" size={35} color="#aaa" />
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
