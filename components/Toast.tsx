import React from 'react';

import {Text, TouchableOpacity, View} from 'react-native';
import {AnimatePresence, MotiView} from "moti";
import Colors, {errorRed} from "../constants/Colors";
import {fontPixel} from "./utils/normalize";


interface ToastInterface {
    message: string,
    state: boolean,
    type: string,
    action?: () => void
}


const Toast = ({
                   message, state, type
               }: ToastInterface) => {

    let color;
    if (type === 'error') {
        color = errorRed
    } else if (type === 'success') {
        color = Colors.successTint
    } else {
        color = Colors.primary;
    }


    return (
        <AnimatePresence exitBeforeEnter>
            {
                state &&

                <MotiView from={{
                    opacity: 0,
                    translateY: -50,
                }}
                          animate={{
                              opacity: 1,
                              translateY: 0,
                          }}
                          exit={{
                              opacity: 0,
                              translateY: -50,
                          }}

                          style={{
                              backgroundColor: color,
                              width: '100%',
                              borderBottomRightRadius: 10,
                              borderBottomLeftRadius: 10,
                              height: 120,
                              alignItems: 'center',
                              justifyContent: 'flex-end',
                              position: 'absolute',
                              zIndex: 10,
                              padding: 20,
                          }}>
                    <Text style={{
                        lineHeight: 18,
                        color: '#eee',
                        fontSize: fontPixel(14),
                        fontFamily: 'inter-bold',
                        textAlign: 'center'
                    }}>
                        {message}
                    </Text>


                </MotiView>
            }
        </AnimatePresence>
    );
};

export default Toast;
