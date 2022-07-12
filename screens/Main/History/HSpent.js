import { View, Text, ScrollView } from 'react-native';
import React, { Fragment, useState } from 'react';
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

    let isYes = false;
    return (
        <View style={{ backgroundColor: 'white' }}>
            <ScrollView style={{ height: '100%' }}>
                {isLoading ? (
                    <Loading />
                ) : (
                    <>
                        <View style={{ paddingBottom: 150 }}>
                            {dataFetch.history_point &&
                                dataFetch.history_point.length > 0 &&
                                dataFetch.history_point.map((htr) => {
                                    if (htr.exchange_point) {
                                        return (
                                            <Fragment key={htr._id}>
                                                <HistoryCard
                                                    title="Đổi điểm thành công"
                                                    sub_action="Bạn bị trừ"
                                                    action="từ hành động đổi quà"
                                                    point={htr.exchange_point}
                                                    date={moment(htr.createdAt).format(
                                                        'DD/MM/YYYY'
                                                    )}
                                                    time={moment(htr.createdAt).format(
                                                        'HH:mm:ss'
                                                    )}
                                                />
                                            </Fragment>
                                        );
                                    } else {
                                        isYes = true;
                                    }
                                })}
                        </View>
                        {isYes && <Nothing text="Chưa có lịch sử tiêu điểm nào" />}
                    </>
                )}
            </ScrollView>
        </View>
    );
};

export default HSpent;
