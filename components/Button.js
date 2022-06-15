import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const ButtonCustom = ({ name, onPress, ...styleBtn }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.intro_btn}>
            <Text style={styles.intro_text_btn}>{name}</Text>
        </TouchableOpacity>
    );
};
let primary_color = '#006db6';

const styles = StyleSheet.create({
    intro_btn: {
        alignItems: 'center',
        backgroundColor: primary_color,
        padding: 15,
        textAlign: 'center',
        marginHorizontal: 100,
        borderRadius: 100,
        marginTop: 50,
        outline: 'none',
    },
    intro_text_btn: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
    },
});

export default ButtonCustom;
