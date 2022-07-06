import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import HistoryCard from '../../../components/HistoryCard';

const HAcumulated = () => {
    return (
        <View style={{ backgroundColor: '#eee' }}>
            <ScrollView style={{ height: '100%' }}>
                <View style={{ paddingBottom: 150 }}>
                    <HistoryCard image_link={require('../../../assets/img/money.png')} />
                    <HistoryCard />
                    <HistoryCard />
                    <HistoryCard />
                    <HistoryCard />
                </View>
            </ScrollView>
        </View>
    );
};

export default HAcumulated;
