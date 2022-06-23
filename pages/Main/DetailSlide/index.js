import { View, Text } from 'react-native';
import React from 'react';
import Nothing from '../../../components/Nothing';
import CustomHeader from '../../../components/CustomHeader';
const DetailSlide = ({ route }) => {
    const { idSlide } = route.params;

    return <Nothing text={`Chi tiết sản phẩm ${idSlide} đang được cập nhật`} />;
};

export default DetailSlide;
