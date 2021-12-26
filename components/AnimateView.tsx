import React, {useReducer} from 'react';
import {StyleSheet, Pressable} from 'react-native';

import {MotiView, AnimatePresence} from 'moti';



export default function AnimateView({children, style}: any) {
    const [visible, toggle] = useReducer((s) => !s, true);

    return (


            <MotiView
            from={{
                opacity: 0,
                scale: 0.9,
            }}
            animate={{
                opacity: 1,
                scale: 1,
            }}
            exit={{
                opacity: 0,
                scale: 0.9,
            }}
            style={style}
        >
            {children}
        </MotiView>


    );
}

