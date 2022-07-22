import { View, Text, Modal, ActivityIndicator } from 'react-native';
import React from 'react';

const ModalLoading = ({ loading, text = 'Vui lòng chờ xíu ạ ...' }) => {
    return (
        <Modal animationType="fade" transparent={true} visible={loading}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                }}>
                <ActivityIndicator size={'large'} color="white" />
                <Text style={{ fontSize: 24, color: 'white' }}>{text}</Text>
            </View>
        </Modal>
    );
};

export default ModalLoading;
