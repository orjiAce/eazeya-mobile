import React from 'react';

import {Text, StyleSheet, View} from 'react-native';
import LottieView from "lottie-react-native";
import {heightPixel} from "../utils/normalize";

const DeliverAnime = () => {
    return (
        <View style={[StyleSheet.absoluteFillObject,{
            width:'100%',
            height:heightPixel(250),
            justifyContent:"center",
            alignItems:"center",
            zIndex:1,
        }]}>

            <LottieView style={{

                height:'100%',
                width:'90%',
                alignItems:'center',
                justifyContent:"center",
            }} speed={2} source={require('../assets/lottie/delivery-boy.json')} autoPlay loop/>
        </View>
    );
};

export default DeliverAnime;
