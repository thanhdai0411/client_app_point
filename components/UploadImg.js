import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Text, TouchableOpacity } from 'react-native';
import ButtonCustom from '../components/Button';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomLabelInput from './CustomLabelInput';

import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';

import request from '../utils/request';

export default function UploadImg({
    label = 'Tải hình lên',
    requireLabel,
    paddingHorizontal = 10,
    marginTopWrap = 0,
    getImgUpload,
}) {
    // upload img
    const [image, setImage] = useState(null);

    // const openImageLibrary = async () => {
    //     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    //     if (status !== 'granted') {
    //         alert('Sorry, we need camera roll permissions to make this work!');
    //     }

    //     if (status === 'granted') {
    //         const response = await ImagePicker.launchImageLibraryAsync({
    //             mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //             allowsEditing: true,
    //         });

    //         if (!response.cancelled) {
    //             setImage(response.uri);
    //             getImgUpload(response.uri);
    //         }
    //     }
    // };

    const pickImage = async () => {
        let result = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            getImgUpload(result.uri);
        }
    };

    return (
        <View style={{ paddingHorizontal: paddingHorizontal, marginTop: 10 }}>
            <CustomLabelInput name={label} require={requireLabel} />
            <View
                style={{
                    borderWidth: 1.5,
                    borderStyle: 'dashed',
                    borderColor: 'red',
                    // height: 100,
                    paddingVertical: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: marginTopWrap,
                }}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={pickImage}
                    style={{ flex: 1 }}>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Ionicons name="cloud-upload-outline" size={40} color="#bbb" />
                        <Text style={{ color: '#aaa', fontSize: 16, marginTop: 5 }}>
                            Nhấp để tải hình lên
                        </Text>
                    </View>
                </TouchableOpacity>
                {image && (
                    <Image
                        source={{ uri: image }}
                        style={{ width: 150, height: 150, marginTop: 10 }}
                        resizeMode="contain"
                    />
                )}
            </View>
        </View>
    );
}
