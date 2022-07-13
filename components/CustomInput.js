import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Controller } from 'react-hook-form';

const CustomInput = ({
    control,
    name = 'firstName',
    rules = {},
    placeholder = 'fistName',
    secureTextEntry,
    iconRight = null,
    onPressIcon,
    editable,
    value,
    defaultValue,
    refInput,
    fontSizeInput = 17,
    colorInput = 'black',
    borderColorWrapInput = '#bbb',
    autoFocus = false,
    keyboardType = null,
    ...styleInput
}) => {
    return (
        <Controller
            control={control}
            rules={rules}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <>
                    <View
                        style={[
                            {
                                backgroundColor: 'white',
                                width: '100%',

                                borderWidth: 1.5,
                                borderRadius: 8,

                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',

                                paddingLeft: 15,
                                paddingVertical: 15,
                                textAlign: 'center',

                                ...styleInput,

                                // marginVertical: 5,
                            },
                            { borderColor: error ? 'red' : borderColorWrapInput },
                        ]}>
                        <TextInput
                            style={{
                                fontSize: fontSizeInput,
                                color: colorInput,

                                // flex: 1,
                            }}
                            textAlign="center"
                            ref={refInput}
                            returnKeyType="done"
                            autoFocus={autoFocus}
                            keyboardType={keyboardType}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            // value={value}
                            defaultValue={defaultValue}
                            placeholder={placeholder}
                            secureTextEntry={secureTextEntry}
                            editable={editable}
                        />
                        <TouchableOpacity oPress={onPressIcon}>
                            {iconRight}
                        </TouchableOpacity>
                    </View>
                    {error && (
                        <Text
                            style={{ color: 'red', alignSelf: 'stretch', fontSize: 17 }}>
                            {error.message || 'Error'}
                        </Text>
                    )}
                </>
            )}
            name={name}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',

        borderWidth: 1.5,
        borderRadius: 8,

        paddingLeft: 15,
        paddingVertical: 15,
        // marginVertical: 5,
    },
    input: {
        fontSize: 17,
        color: 'gray',
        // flex: 1,
    },
});

export default CustomInput;
