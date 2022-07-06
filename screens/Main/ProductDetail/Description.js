import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import DetailProduct from './DetailProduct';
let color_table = '#fafafa';

const detailDefault = [
    {
        title: 'Danh mục',
        text: 'Nước đóng chai',
    },
    {
        title: 'Xuất xử',
        text: 'Việt Nam',
    },
    {
        title: 'Gửi từ',
        text: 'TP.Ho Chi Minh',
    },
    {
        title: 'Thành phần',
        text: 'Magnesium, Sodium,...',
    },
];
const text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non lacinia dolor, et facilisis libero. Sed bibendum lacus ut nisi sodales, vitae commodo elit rhoncus. Sed at quam quis nunc tincidunt porttitor. Maecenas sodales maximus ipsum, sed sollicitudin lorem vehicula vitae. Nunc aliquam maximus porttitor. Donec scelerisque ut nunc sagittis efficitur. Integer maximus auctor pretium. Morbi pharetra augue non nulla rhoncus ullamcorper. Sed non rhoncus felis. Duis gravida lobortis augue, a faucibus sem bibendum a. Ut vel commodo quam. Donec lacinia, lorem condimentum pulvinar malesuada, ex magna ornare metus, eu ultrices ex magna at tortor. Praesent aliquet sed velit nec tempus.';
const Description = ({ text_desc = text, detail = detailDefault }) => {
    return (
        <View style={styles.desc_product}>
            <DetailProduct detail={detail} />
            <View style={{ marginVertical: 10 }}>
                <Text style={styles.title}>Mô tả sản phẩm</Text>
                <View>
                    <Text style={{ fontSize: 16, textAlign: 'justify' }}>
                        {text_desc}
                    </Text>
                </View>
            </View>
        </View>
    );
};
let desc_product_color = 'white';

const styles = StyleSheet.create({
    desc_product: {
        backgroundColor: desc_product_color,
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        paddingBottom: 8,
    },
});

export default Description;
