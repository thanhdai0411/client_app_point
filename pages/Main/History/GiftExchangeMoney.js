import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import CardItem from '../../../components/CardHorizontal';
import { useIsFocused } from '@react-navigation/native';

const GiftExchangeMoney = ({ navigation }) => {
    const isFocused = useIsFocused();
    return (
        <>
            <View style={{ height: '100%' }}>
                <ScrollView>
                    <View style={{ paddingBottom: 150 }}>
                        <CardItem
                            onPress={() =>
                                navigation.navigate('DetailExchange', { id: 1 })
                            }
                            coinNumber={5000}
                            nameCompany={null}
                            title={'Đổi 500.000 VNĐ'}
                            imageLink={require('../../../assets/img/m_4.jpg')}
                        />
                        <CardItem
                            coinNumber={10000}
                            nameCompany={null}
                            title={'Đổi 1.000.000 VNĐ'}
                            imageLink={require('../../../assets/img/m_4.jpg')}
                        />
                        <CardItem
                            coinNumber={15000}
                            nameCompany={null}
                            title={'Đổi 2.500.000 VNĐ'}
                            imageLink={require('../../../assets/img/m_4.jpg')}
                        />
                        <CardItem
                            coinNumber={50000}
                            nameCompany={null}
                            title={'Đổi 6.000.000 VNĐ'}
                            imageLink={require('../../../assets/img/m_4.jpg')}
                        />
                    </View>
                </ScrollView>
            </View>
        </>
    );
};

export default GiftExchangeMoney;
