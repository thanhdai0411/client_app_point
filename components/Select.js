import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { vietnamProvincesAPI } from '../../../api/VietnamProvinces';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default HowPoint = () => {
    const [provincesId, setProvincesId] = useState();
    const [districtId, setDistrictId] = useState();
    const [districts, setDistricts] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [wards, setWards] = useState([]);

    const placeholder_p = {
        label: 'Chọn Tỉnh/Thành Phố',
        value: null,
        color: '#9EA0A4',
    };
    const placeholder_d = {
        label: 'Chọn Quận/Huyện',
        value: null,
        color: '#9EA0A4',
    };
    const placeholder_w = {
        label: 'Chọn Phường/Xã',
        value: null,
        color: '#9EA0A4',
    };

    // provinces
    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await axios.get(vietnamProvincesAPI.provinces);
                let data = res && res.data ? res.data : [];
                setProvinces(data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, []);

    //districts
    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await axios.get(
                    vietnamProvincesAPI.get_provinces(provincesId, 2)
                );
                let data = res && res.data ? res.data : [];
                setDistricts(data.districts);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [provincesId]);

    //wards
    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await axios.get(
                    vietnamProvincesAPI.get_districts(districtId, 2)
                );
                let data = res && res.data ? res.data : [];
                setWards(data.wards);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [districtId]);

    return (
        <View>
            <RNPickerSelect
                onValueChange={(value) => setProvincesId(value)}
                items={provinces.map((item) => {
                    return { label: item.name, value: item.code };
                })}
                style={pickerSelectStyles}
                placeholder={placeholder_p}
                Icon={() => {
                    return (
                        <FontAwesome
                            name={'chevron-down'}
                            color={'#aaa'}
                            size={18}
                            style={{ top: 12, right: 10 }}
                        />
                    );
                }}
            />
            <RNPickerSelect
                onValueChange={(value) => setDistrictId(value)}
                items={districts.map((item) => {
                    return { label: item.name, value: item.code };
                })}
                placeholder={placeholder_d}
                style={pickerSelectStyles}
                disabled={districts.length > 0 ? false : true}
            />
            <RNPickerSelect
                onValueChange={(value) => console.log(value)}
                items={wards.map((item) => {
                    return { label: item.name, value: item.code };
                })}
                style={pickerSelectStyles}
                placeholder={placeholder_w}
                disabled={wards.length > 0 ? false : true}
            />
        </View>
    );
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1.5,
        borderColor: '#bbb',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: '#bbb',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});
