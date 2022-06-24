import { View, Text } from 'react-native';
import React from 'react';

const CustomLabelInput = ({ name = 'Label is me', require = true, ...styleLabel }) => {
    return (
        <Text style={{ fontSize: 17, fontWeight: '500', marginBottom: 6, ...styleLabel }}>
            <Text
                style={{
                    color: 'red',
                    fontSize: 20,
                }}>
                {require && '* '}
            </Text>
            {name}
        </Text>
    );
};

export default CustomLabelInput;
