import React from 'react';

import {ScrollView, Text, View} from 'react-native';
import {pixelSizeHorizontal} from "../utils/normalize";
import TopBar from "../components/view/TopBar";

import {SafeAreaView} from 'react-native-safe-area-context'

const ChatScreen = ({navigation}:any) => {
    return (
        <SafeAreaView style={{
            flex: 1,
            paddingHorizontal: pixelSizeHorizontal(24),
            backgroundColor: '#fff',

        }}>
            <ScrollView scrollEnabled

                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            alignItems: 'center',
                            width:'100%',
                            backgroundColor: '#fff',
                        }}
            >


                <TopBar navigation={navigation} routeName="Support"/>
        <View>

        </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ChatScreen;
