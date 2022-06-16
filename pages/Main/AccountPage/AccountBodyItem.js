import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

let iconDefault = <FontAwesome name="user-o" size={25} />;
const AccountBodyItem = ({ icon = iconDefault, text }) => {
    return (
        <View style={styles.item_ac}>
            {icon}
            <Text style={styles.item_title}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    item_ac: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingLeft: 20,
        borderWidth: 0.5,
        borderColor: '#ddd',
    },
    item_title: {
        fontSize: 17,
        marginLeft: 10,
        paddingVertical: 17,
    },
});

export default AccountBodyItem;
