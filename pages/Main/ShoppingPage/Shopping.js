import * as React from 'react';
import { Text, View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import CardItem from '../../../components/CardItem';
function Shopping() {
    return (
        <SafeAreaView style={styles.shopping_container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.shopping_wrap}>
                    <CardItem />
                    <CardItem />
                    <CardItem />
                    <CardItem />
                    <CardItem />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

let primary_color = '#006db6';
let header_color = '#eee';

const styles = StyleSheet.create({
    shopping_container: {
        flex: 1,
        backgroundColor: header_color,
    },
    shopping_wrap: {
        paddingBottom: 40,
        paddingTop: 10,
    },
});

export default Shopping;
