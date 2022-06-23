import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';

import CardHorizontal from '../../../components/CardHorizontal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomHeader from '../../../components/CustomHeader';

const ShowAllSlider = ({ route, navigation }) => {
    const { title } = route.params;
    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <CustomHeader title={title} navigation={navigation} />
            <ScrollView style={{ backgroundColor: '#eee' }}>
                <View style={{ marginTop: 10, paddingBottom: 100 }}>
                    <CardHorizontal />
                    <CardHorizontal />
                    <CardHorizontal />
                    <CardHorizontal />
                    <CardHorizontal />
                    <CardHorizontal />
                    <CardHorizontal />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ShowAllSlider;
