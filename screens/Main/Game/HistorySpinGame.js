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

const HistorySpinGame = () => {
    const { info_user } = useSelector(userSelector);
    const { isLoading, dataFetch } = useFetch(`user/get_id/${info_user._id}`);
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
                                    if (htr.game_spin) {
                                        return (
                                            <Fragment key={htr._id}>
                                                <HistoryCard
                                                    title="Vòng quay may mắn"
                                                    sub_action={null}
                                                    point={null}
                                                    action={htr.info_game_spin}
                                                    date={moment(htr.createdAt).format(
                                                        'DD/MM/YYYY'
                                                    )}
                                                    time={moment(htr.createdAt).format(
                                                        'HH:mm:ss'
                                                    )}
                                                    image_link={require('../../../assets/img/wof.jpg')}
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

export default HistorySpinGame;
