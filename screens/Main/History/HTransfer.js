import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import React, { Fragment, useState } from 'react';
import HistoryCard from '../../../components/HistoryCard';

import { useSelector } from 'react-redux';
import { userSelector } from '../../../redux/reducers/userSlice';
import Nothing from '../../../components/Nothing';
import moment from 'moment';

import useFetch from '../../../hooks/useFetch';
import Loading from '../../../components/Loading';

const HTransfer = () => {
    const { info_user } = useSelector(userSelector);
    const { isLoading, dataFetch } = useFetch(`user/get_id/${info_user._id}`);

    let isYes = false;
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
                                    if (htr.transfer_points) {
                                        return (
                                            <Fragment key={htr._id}>
                                                <HistoryCard
                                                    title="Chuyển điểm thành công"
                                                    sub_action="Bạn bị trừ"
                                                    action={htr.info_transfer_points}
                                                    point={htr.transfer_points}
                                                    date={moment(htr.createdAt).format(
                                                        'DD/MM/YYYY'
                                                    )}
                                                    time={moment(htr.createdAt).format(
                                                        'HH:mm:ss'
                                                    )}
                                                    image_link={require('../../../assets/img/transfer.jpg')}
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

export default HTransfer;
