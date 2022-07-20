import { View, Text, Modal } from 'react-native';
import React, { useState } from 'react';

const ModalCustom = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                }}>
                <View
                    style={{
                        backgroundColor: 'white',
                        borderRadius: 10,
                        padding: 20,
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                        width: 300,
                        marginBottom: 100,
                    }}>
                    <Text style={{ fontSize: 18 }}>Nhập số lượng quà muốn đổi</Text>
                </View>
            </View>
        </Modal>
    );
};

export default ModalCustom;
