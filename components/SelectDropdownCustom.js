import { View, Text } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import SelectDropdown from 'react-native-select-dropdown';
const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SelectDropdownCustom = ({
    data = countries,
    onSelectData,
    defaultButtonText,
    searchPlaceHolder,
    onFocus,
    onBlur,
}) => {
    return (
        <SelectDropdown
            data={data}
            onSelect={(selectedItem, index) => {
                onSelectData(selectedItem, index);
            }}
            buttonStyle={{
                width: '100%',
                borderWidth: 1.5,
                borderRadius: 8,
                backgroundColor: 'white',
                borderColor: '#bbb',
            }}
            defaultButtonText={defaultButtonText}
            buttonTextStyle={{ textAlign: 'left' }}
            dropdownStyle={{ borderRadius: 5, height: '100%' }}
            rowTextStyle={{ textAlign: 'left', marginLeft: 20 }}
            searchPlaceHolder={searchPlaceHolder}
            search
            renderSearchInputLeftIcon={() => {
                return <AntDesign name="search1" size={20} color="#aaa" />;
            }}
            statusBarTranslucent={true}
            renderDropdownIcon={(isOpened) => {
                return (
                    <FontAwesome
                        name={isOpened ? 'chevron-up' : 'chevron-down'}
                        color={'#aaa'}
                        size={18}
                    />
                );
            }}
            onFocus={onFocus}
            onBlur={onBlur}
        />
    );
};

export default SelectDropdownCustom;
