import { View, Text } from 'react-native';
import React from 'react';
import CustomStatusBar from '../../../components/CustomStatusBar';
import Nothing from '../../../components/Nothing';
const HistoryPoint = () => {
    return (
        <>
            <CustomStatusBar />
            <Nothing text={'Hiện chưa có lịch sử đổi thưởng nào'} />
        </>
    );
};

export default HistoryPoint;
