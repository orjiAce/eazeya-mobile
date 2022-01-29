import React from 'react';

import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Feather} from "@expo/vector-icons";
import {fontPixel} from "../../utils/normalize";

const TopBar = ({routeName,navigation }: {routeName: string,navigation:any}) => {
    return (
        <View style={{
            width:'100%',
            alignItems:'center',
            justifyContent:'space-between',
            height:80,
            flexDirection:'row'
        }}>
            <Image source={require('../../assets/logo/adaptive-icon.png')}

            style={{
                width:30,
                height:30
            }}/>

            <View>
                <Text style={{
                    fontFamily:'GT-medium',
                    color:'#1B1B1B',
                    fontSize:fontPixel(16)
                }}>
                    {routeName}
                </Text>
            </View>
<TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={{
    width:35,
    height:35,
    alignItems:'center',
    justifyContent:'center'
}}>


            <Feather name="bell" size={24} color="black" />
</TouchableOpacity>
        </View>
    );
};

export default TopBar;
