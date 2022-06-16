import { StyleSheet } from 'react-native';

const styleCustom = StyleSheet.create({
    box_shadow: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },
});

export const { box_shadow } = styleCustom;
