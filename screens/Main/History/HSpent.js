import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import React, { Fragment, useState, useRef } from 'react';
import HistoryCard from '../../../components/HistoryCard';

import { useSelector } from 'react-redux';
import { userSelector } from '../../../redux/reducers/userSlice';
import Nothing from '../../../components/Nothing';
import moment from 'moment';

import useFetch from '../../../hooks/useFetch';
import Loading from '../../../components/Loading';

const HSpent = () => {
    const { info_user } = useSelector(userSelector);
    const { isLoading, dataFetch } = useFetch(`user/get_id/${info_user._id}`);

    const isYesRef = useRef(false);
    return (
        <View style={{ backgroundColor: 'white' }}>
            <ScrollView style={{ height: '100%' }}>
                {isLoading ? (
                    <ActivityIndicator
                        size="large"
                        style={{ marginTop: 50 }}
                        color="orange"
                    />
                ) : (
                    <>
                        <View style={{ paddingBottom: 150 }}>
                            {dataFetch.history_point &&
                                dataFetch.history_point.length > 0 &&
                                dataFetch.history_point.reverse().map((htr) => {
                                    isYesRef.current = false;
                                    if (htr.exchange_point) {
                                        isYes = true;
                                        return (
                                            <Fragment key={htr._id}>
                                                <HistoryCard
                                                    title="Đổi điểm thành công"
                                                    sub_action="Bạn bị trừ"
                                                    action={htr.info_exchange_point}
                                                    point={htr.exchange_point}
                                                    date={moment(htr.createdAt).format(
                                                        'DD/MM/YYYY'
                                                    )}
                                                    time={moment(htr.createdAt).format(
                                                        'HH:mm:ss'
                                                    )}
                                                    image_link={require('../../../assets/img/exchange.jpg')}
                                                />
                                            </Fragment>
                                        );
                                    } else {
                                        isYesRef.current = true;
                                    }
                                })}
                        </View>
                    </>
                )}
            </ScrollView>
        </View>
    );
};

export default HSpent;
