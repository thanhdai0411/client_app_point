import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import Category from '../../../components/Category';
import SlideMarketing from '../../../components/SlideMarketing';
const { width, height } = Dimensions.get('window');

let primary_color = '#178dde';

const ShoppingHeader = () => {
    return (
        <View style={{ backgroundColor: 'white' }}>
            {/* Banner */}
            <View
                style={{
                    backgroundColor: primary_color,
                    width: width,
                    height: height / 5,
                    borderBottomLeftRadius: 30,
                    borderBottomRightRadius: 30,
                }}></View>
            <SlideMarketing
                isCoin={false}
                isTitle={false}
                autoplay={true}
                timePlay={5}
                activeOpacity={0.99}
                borderRadiusImg={10}
                backgroundColorContainer={null}
                containerMarginTop={null}
                widthImg={'92%'}
                heightImg={160}
                position={'absolute'}
                top={100}
                zIndex={5}
            />
            {/* end Banner */}

            {/* category */}
            <Category marginTop={95} title={true} titleColor={'red'} />
        </View>
    );
};

export default ShoppingHeader;
