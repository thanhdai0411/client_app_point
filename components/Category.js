import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Category = ({ title = false, titleColor = 'black', marginTop = -2 }) => {
    const dataType = [
        {
            icon: <Ionicons name="fast-food-outline" size={40} color="#FCDA05" />,
            description: 'Ẩm thực',
        },
        {
            icon: <Ionicons name="game-controller-outline" size={40} color="#EC9B3B" />,
            description: 'Giải trí',
        },
        {
            icon: (
                <MaterialCommunityIcons
                    name="face-woman-shimmer-outline"
                    size={40}
                    color="#F4BFBF"
                />
            ),
            description: 'Làm đẹp',
        },
        {
            icon: <AntDesign name="skin" size={40} color="#14C38E" />,
            description: 'Thời trang',
        },
        {
            icon: (
                <MaterialCommunityIcons
                    name="lightbulb-on-outline"
                    size={40}
                    color="#FF1F5A"
                />
            ),
            description: 'Tiện ích',
        },
        {
            icon: <AntDesign name="book" size={40} color="#6088BB" />,
            description: 'Giáo dục',
        },
        {
            icon: <AntDesign name="shoppingcart" size={40} color="#9D2503" />,
            description: 'Mua sắm',
        },
        {
            icon: (
                <MaterialCommunityIcons
                    name="collapse-all-outline"
                    size={40}
                    color="#AD8C45"
                />
            ),
            description: 'Tất cả',
        },
    ];
    return (
        <View
            style={{
                backgroundColor: '#fff',
                marginTop: marginTop,
                paddingHorizontal: 8,
                paddingVertical: 15,
            }}>
            {title && (
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: '500',
                        marginBottom: 13,
                        marginLeft: 10,
                        color: titleColor,
                    }}>
                    DANH MỤC
                </Text>
            )}

            <View
                style={{
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // marginHorizontal: 15,
                    borderRadius: 20,
                }}>
                {dataType.map((item, index) => (
                    <View style={styles.type_item} key={index}>
                        {item.icon}
                        <Text style={styles.type_name}>{item.description}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    body_type_wrap: {
        backgroundColor: '#fff',
        marginTop: -2,
        paddingHorizontal: 8,
        paddingVertical: 15,
    },
    body_type: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // marginHorizontal: 15,
        borderRadius: 20,
        marginTop: 100,
    },
    type_item: {
        width: '25%',
        alignItems: 'center',
    },
    type_name: {
        marginTop: 6,
        marginBottom: 8,
        fontSize: 17,
        fontWeight: '500',
    },
    body_type_title: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 13,
        marginLeft: 10,
        // textAlign: 'center',
    },
});

export default Category;
