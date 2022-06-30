import { View, Text } from 'react-native';
import React from 'react';
import Nothing from '../../../components/Nothing';
import ButtonCustom from '../../../components/Button';

const Complete = ({ navigation }) => {
    return (
        <Nothing
            text="Hiện tại bạn chưa có đơn hàng nào"
            marginTop={-250}
            button={
                <ButtonCustom
                    name="Đi mua săm ngay thôi"
                    marginHorizontal={null}
                    borderRadius={5}
                    backgroundColor={null}
                    colorText={'red'}
                    borderWidth={1}
                    borderColor={'red'}
                    marginTop={20}
                    onPress={() => navigation.navigate('Mua sắm')}
                />
            }
        />
    );
};

export default Complete;
