import React, { useState, useEffect, useCallback } from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    ScrollView,
    Image,
    Dimensions,
    SafeAreaView,
    ScrollViewComponent,
    ScrollViewBase,
} from 'react-native';
const { width, height } = Dimensions.get('window');

import HomeHeader from './HomeHeader';
import HomeBody from './HomeBody';

//
//

function Home({ navigation }) {
    //

    //

    return (
        <SafeAreaView style={styles.home_container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.home_wrap}>
                    <HomeHeader />
                    <HomeBody navigation={navigation} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

let primary_color = '#006db6';
let header_color = '#FFC54D';

const styles = StyleSheet.create({
    home_container: {
        flex: 1,
        // height: height,
        // width: width,
        backgroundColor: header_color,
    },
    home_wrap: {
        // marginBottom: 10,
        // height: height,
        // width: width,
        // flex: 1,
        // backgroundColor: 'orange',
        // height: '30%',
    },
});

export default Home;
