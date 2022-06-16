import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import AccountHeader from './AccountHeader';
import AccountBody from './AccountBody';
const Account = () => {
    return (
        <SafeAreaView style={styles.account_container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.account_wrap}>
                    <AccountHeader />
                    <AccountBody />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

let primary_color = '#006db6';
let header_color = '#FFC54D';

const styles = StyleSheet.create({
    account_container: {
        flex: 1,
        backgroundColor: header_color,
    },
    account_wrap: {},
});

export default Account;
