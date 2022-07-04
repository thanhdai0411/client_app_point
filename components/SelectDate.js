import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Fontisto from 'react-native-vector-icons/Fontisto';

const SelectDate = ({ valueSelect, borderColorProp = '#bbb' }) => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    let MyDateString =
        ('0' + date.getDate()).slice(-2) +
        '/' +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        '/' +
        date.getFullYear();

    // !show ? valueSelect(MyDateString) : '';
    valueSelect(MyDateString);
    return (
        <View>
            <View
                style={{
                    backgroundColor: 'white',
                    width: '100%',

                    borderWidth: 1.5,
                    borderRadius: 8,

                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderColor: borderColorProp,

                    paddingLeft: 15,
                    paddingVertical: 15,
                }}>
                <Text style={{ fontSize: 17 }}>{MyDateString}</Text>
                <TouchableOpacity
                    onPress={() => setShow(!show)}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text
                        style={{
                            fontSize: 17,
                            marginRight: 10,
                            color: 'orange',
                            fontWeight: '500',
                        }}>
                        {show ? 'Đóng' : 'Mở'}
                    </Text>
                    <Fontisto
                        name={'date'}
                        color={'black'}
                        size={20}
                        style={{ marginRight: 10 }}
                    />
                </TouchableOpacity>
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    onChange={onChange}
                    display="spinner"
                />
            )}
        </View>
    );
};

export default SelectDate;
