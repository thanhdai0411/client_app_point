import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

// import
import HistoryCard from '../../../components/HistoryCard';
import { userSelector } from '../../../redux/reducers/userSlice';
import Nothing from '../../../components/Nothing';
import useFetch from '../../../hooks/useFetch';
import Loading from '../../../components/Loading';

const HAcumulated = () => {
    const { info_user } = useSelector(userSelector);
    const { isLoading, dataFetch } = useFetch(`user/get_id/${info_user._id}`);
    console.log(dataFetch);
    return (
        <View style={{ backgroundColor: 'white' }}>
            <ScrollView style={{ height: '100%' }}>
                {isLoading ? (
                    <ActivityIndicator size="large" />
                ) : (
                    <>
                        <View style={{ paddingBottom: 150 }}>
                            {dataFetch.history_point &&
                                dataFetch.history_point.length > 0 &&
                                dataFetch.history_point.reverse().map((htr) => {
                                    if (htr.accumulate_point) {
                                        return (
                                            <Fragment key={htr._id}>
                                                <HistoryCard
                                                    image_link={require('../../../assets/img/ac2.jpg')}
                                                    point={htr.accumulate_point}
                                                    date={moment(htr.createdAt).format(
                                                        'DD/MM/YYYY'
                                                    )}
                                                    time={moment(htr.createdAt).format(
                                                        'HH:mm:ss'
                                                    )}
                                                />
                                            </Fragment>
                                        );
                                    }
                                })}
                        </View>
                    </>
                )}
            </ScrollView>
        </View>
    );
};

export default HAcumulated;
