import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import HistoryCard from '../../../components/HistoryCard';

const HSpent = () => {
    return (
        <View style={{ backgroundColor: '#eee' }}>
            <ScrollView style={{ height: '100%' }}>
                <View style={{ paddingBottom: 150 }}>
                    <HistoryCard
                        title="Đổi điểm thành công"
                        sub_action="Bạn bị trừ"
                        action="từ hành động đổi quà"
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default HSpent;
