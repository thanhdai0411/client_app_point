import {
    View,
    Text,
    Dimensions,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,
    ImageBackground,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    ImageHeaderScrollView,
    TriggeringView,
} from 'react-native-image-header-scroll-view';

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
    const [imageUpload, setImageUploadAvatar] = useState(null);
    const [imageUploadWall, setImageUploadWall] = useState(null);
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
            wall: imageUploadWall,
        };

        const updateUser = async (data, field, message) => {
            try {
                const res = await request.put(
                    `user/update_user_phone/${info_user.phone_number}`,
                    { [field]: data }
                );

                if (res.data.success) {
                    navigation.navigate('Main');
                    dispatch(getUserDB());
                    Alert.alert(`C???p nh???t th??ng tin ${message} th??nh c??ng`);
                }
            } catch (err) {
                Alert.alert('C???p nh???t th??ng tin c?? nh??n th???t b???i');
            }
        };
        if (
            dataInfoUser.email &&
            dataInfoUser.address &&
            dataInfoUser.avatar &&
            dataInfoUser.username
        ) {
            (async () => {
                try {
                    const res = await request.put(
                        `user/update_user_phone/${info_user.phone_number}`,
                        dataInfoUser
                    );

                    if (res.data.success) {
                        navigation.navigate('Main');
                        dispatch(getUserDB());
                        Alert.alert('C???p nh???t th??ng tin c?? nh??n th??nh c??ng');
                    }
                } catch (err) {
                    Alert.alert('C???p nh???t th??ng tin c?? nh??n th???t b???i');
                }
            })();
        } else {
            if (dataInfoUser.email) updateUser(dataInfoUser.email, 'email', 'dmail');
            if (dataInfoUser.address)
                updateUser(dataInfoUser.address, 'address', '?????a ch???');
            if (dataInfoUser.username)
                updateUser(dataInfoUser.username, 'username', 't??n c?? nh??n');
            if (dataInfoUser.avatar)
                updateUser(dataInfoUser.avatar, 'avatar', 'h??nh ?????i di???n');
            if (dataInfoUser.wall) updateUser(dataInfoUser.wall, 'wall', 'h??nh n???n');
        }
    };

    return (
        // <>
        //     {info_user.username ? () : ()}
        // </>
        <>
            <ImageHeaderScrollView
                maxHeight={280}
                minHeight={80}
                headerImage={
                    imageUploadWall
                        ? { uri: imageUploadWall }
                        : info_user.wall
                        ? { uri: info_user.wall }
                        : require('../../../assets/img/wall.jpg')
                }
                renderFixedForeground={() => (
                    <CustomHeader
                        title={'Th??ng tin c?? nh??n'}
                        backgroundColorHeader={null}
                        borderHeader={null}
                        marginTop={30}
                        navigation={navigation}
                        colorIconLeft={'white'}
                        textColor={'white'}
                        // styleIconLeft={{ color: 'white' }}
                    />
                )}>
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
                                name="H??? v?? t??n"
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
                                                  'B???n b???t bu??c ph???i nh???p tr?????ng n??y',
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
                                name="S??? ??i???n tho???i"
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
                                // rules={{ required: 'B???n b???t bu??c ph???i nh???p tr?????ng n??y' }}
                                name={'phone_number'}
                                borderWidth={0}
                                borderBottomWidth={1}
                                paddingLeft={5}
                                paddingVertical={null}
                                paddingBottom={5}
                            />
                            <CustomLabelInput
                                name="Ch???c danh ng?????i d??ng"
                                require={false}
                                paddingLeft={5}
                                // marginBottom={null}
                                marginBottom={8}
                                marginTop={15}
                                fontSize={18}
                            />
                            <CustomInput
                                control={control}
                                defaultValue={info_user.role}
                                editable={false}
                                value={info_user.role}
                                // placeholder={'09xxx'}
                                // rules={{ required: 'B???n b???t bu??c ph???i nh???p tr?????ng n??y' }}
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
                                                  'B???n b???t bu??c ph???i nh???p tr?????ng n??y',
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
                                name="?????a ch???"
                                require={false}
                                paddingLeft={5}
                                // marginBottom={null}
                                marginBottom={8}
                                marginTop={15}
                                fontSize={18}
                            />
                            <CustomInput
                                control={control}
                                // defaultValue={'Ao ????i, B??nh T??n, H??? Ch?? Minh'}
                                defaultValue={
                                    info_user.address ? info_user.address : null
                                }
                                rules={
                                    info_user.address
                                        ? null
                                        : {
                                              required:
                                                  'B???n b???t bu??c ph???i nh???p tr?????ng n??y',
                                          }
                                }
                                placeholder={'?????a ch??? c???a b???n'}
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
                                label="Thay ?????i h??nh ?????i di???n"
                                requireLabel={false}
                                paddingHorizontal={null}
                                marginTopWrap={8}
                                getImgUpload={(image) => {
                                    setImageUploadAvatar(image);
                                }}
                            />
                            <UploadImg
                                label="Thay ?????i h??nh n???n"
                                requireLabel={false}
                                paddingHorizontal={null}
                                marginTopWrap={8}
                                getImgUpload={(image) => {
                                    setImageUploadWall(image);
                                }}
                            />
                        </View>
                    </View>
                </View>
            </ImageHeaderScrollView>

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
                    name={'C???p nh???t th??ng tin'}
                    marginHorizontal={null}
                    borderRadius={10}
                    flex={1}
                    opacityBtn={0.7}
                    onPress={handleSubmit(submitForm)}
                />
            </View>
        </>
    );
};

export default InfoUser;
