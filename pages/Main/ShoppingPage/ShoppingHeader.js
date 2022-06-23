import { View, Text } from 'react-native';
import React from 'react';
import Category from '../../../components/Category';
import ContentSlider from '../../../components/ContentSlider';
const ShoppingHeader = () => {
    return (
        <View>
            {/* Banner */}
            <ContentSlider
                isCoin={false}
                isTitle={false}
                backgroundColorContainer={null}
                containerMarginTop={0}
                autoplay={true}
            />
            {/* end Banner */}
            <Category />
        </View>
    );
};

export default ShoppingHeader;
