import { View, Text, ScrollView } from 'react-native';
import React from 'react';

const InfoBankCheckItem = ({ name, info }) => {
    return (
        <View
            style={{
                borderBottomWidth: 1.5,
                borderBottomColor: '#ddd',
                paddingBottom: 5,
                marginTop: 10,
            }}>
            <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 7 }}>
                {name}
            </Text>
            <Text style={{ fontSize: 17 }}>{info}</Text>
        </View>
    );
};

const InfoBankCheck = () => {
    return (
        <View
            style={{
                backgroundColor: 'white',
                height: '100%',
                paddingHorizontal: 15,
                // paddingTop: 10,
            }}>
            <ScrollView>
                <InfoBankCheckItem name={'Tên ngân hàng'} info="Aribank" />
                <InfoBankCheckItem name={'Tên chi nhánh'} info="Aribank" />
                <InfoBankCheckItem name={'Tên chủ tài khoản'} info="Aribank" />
                <InfoBankCheckItem name={'Số tài khoản'} info="Aribank" />
                <InfoBankCheckItem name={'Số CMND'} info="Aribank" />
                <InfoBankCheckItem name={'Ngày cấp'} info="Aribank" />
                <InfoBankCheckItem name={'Nơi cấp'} info="Aribank" />
            </ScrollView>
        </View>
    );
};

export default InfoBankCheck;
