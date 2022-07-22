import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import AccountHeader from './AccountHeader';
import AccountBody from './AccountBody';

const Account = ({ navigation }) => {
    return (
        <View style={styles.account_container}>
            <View showsVerticalScrollIndicator={false}>
                <View style={styles.account_wrap}>
                    <AccountHeader />
                    <AccountBody navigation={navigation} />
                </View>
            </View>
        </View>
    );
};

let primary_color = '#006db6';
let header_color = '#178dde';

const styles = StyleSheet.create({
    account_container: {
        flex: 1,
        backgroundColor: header_color,
    },
    account_wrap: {},
});

export default Account;
