import React from 'react';

import {Text, TouchableOpacity,StatusBar, View} from 'react-native';
import {AnimatePresence, MotiView} from "moti";
import Colors from "../constants/Colors";
import {fontPixel, heightPixel} from "../utils/normalize";
import {Ionicons} from "@expo/vector-icons";


interface ToastInterface {
    message: string,
    title: string,
    state: boolean,
    type: string,
    action?: () => void
}


const Toast = ({
                   title,
                   message, state, type
               }: ToastInterface) => {

    let color;
    if (type === 'error') {
        color = Colors.tintRed
    } else if (type === 'success') {
        color = Colors.success
    } else {
        color = Colors.primaryColor;
    }


    return (
        <AnimatePresence exitBeforeEnter>
            {
                state &&

                <MotiView from={{
                    opacity: 0,
                    translateY: 50,
                }}
                          animate={{
                              opacity: 1,
                              translateY: 0,
                          }}
                          exit={{
                              opacity: 0,
                              translateY: 50,
                          }}
                          style={{
                              top: heightPixel(50),
                              backgroundColor: color,
                              width: '90%',
                              borderRadius: 20,
                              minHeight: 80,
                              alignItems: 'flex-start',
                              justifyContent: 'space-evenly',
                              position: 'absolute',
                              zIndex: 100,
                              padding: 20,
                              flexDirection: 'row',
                          }}>

                    <Ionicons name="checkmark-circle-outline" size={20} color="black"/>
                    <View style={{
                        height: '90%',
                        width: '95%',
                        justifyContent: 'center',
                        paddingLeft: 8,
                        flexDirection: 'column',
                        alignItems: 'flex-start'
                    }}>
                        <Text style={{
                            lineHeight: 18,
                            textTransform:'uppercase',
                            color: '#333',
                            fontSize: fontPixel(14),
                            fontFamily: 'GT-bold',
                            textAlign: 'center'
                        }}>
                            {title}
                        </Text>
                        <Text style={{
                            lineHeight: 16,
                            color: '#333',
                            fontSize: fontPixel(14),
                            fontFamily: 'GT-regular',
                            textAlign: 'center'
                        }}>
                            {message}
                        </Text>

                    </View>


                </MotiView>
            }
        </AnimatePresence>
    );
};

export default Toast;
