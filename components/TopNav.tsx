import React from 'react';

import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {fontPixel, heightPixel} from "../utils/normalize";
import Colors from "../constants/Colors";


interface navProps {
    title: string,
    navigation: (a: string) => void
}

const TopNav = ({navigation, title}: navProps) => {

    const cancel = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.topNav}>
            <TouchableOpacity style={styles.cancelBtn} onPress={cancel}>
                <Text style={styles.text}>
                    Cancel
                </Text>
            </TouchableOpacity>
            <View style={styles.titleWrap}>
                <Text style={styles.title}>
                    {title}
                </Text>
            </View>
            <View style={styles.cancelBtn}>

            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    topNav: {
        width: '100%',
        height: heightPixel(40),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        color: Colors.primaryColor,
        fontFamily: 'GT-regular',
        fontSize: fontPixel(14)
    },
    title: {
        color:"#333",
        fontFamily: 'GT-bold',
        fontSize: fontPixel(15)
    },
    cancelBtn: {
        width: '20%',
        height: '90%',
        alignItems:'center',
        justifyContent:'center'
    },
    titleWrap:{
        width: '50%',
        height: '90%',
        alignItems:'center',
        justifyContent:'center'
    }
})
export default TopNav;
