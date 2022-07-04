import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import HistoryCard from '../../../components/HistoryCard';

const HDonated = () => {
    return (
        <View style={{ backgroundColor: '#eee' }}>
            <ScrollView style={{ height: '100%' }}>
                <View style={{ paddingBottom: 150 }}>
                    <HistoryCard
                        title="Bạn có người bạn thật tuyệt"
                        action="từ người người bạn giới thiệu"
                    />
                    <HistoryCard
                        title="Bạn có người bạn thật tuyệt"
                        action="từ người người bạn giới thiệu"
                    />
                    <HistoryCard
                        title="Bạn có người bạn thật tuyệt"
                        action="từ người người bạn giới thiệu"
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default HDonated;
