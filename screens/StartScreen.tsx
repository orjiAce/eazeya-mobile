import React from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel} from "../utils/normalize";
import Colors from "../constants/Colors";
import DeliverAnime from "../components/DeliveryAnime";

const StartScreen = ({navigation}: any) => {
    return (
        <SafeAreaView style={{
            flex: 1,
            paddingHorizontal: pixelSizeHorizontal(24),
            backgroundColor: '#fff'
        }}>



            <ScrollView scrollEnabled
                        style={{
                            width: '100%'
                        }}
                        contentContainerStyle={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                <View style={{
                    height: heightPixel(400),
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                    <View style={{
                        width: widthPixel(350),
                        height: widthPixel(250),
                        borderRadius: 10,
                        backgroundColor: Colors.tint

                    }}>

                        <DeliverAnime/>
                    </View>

                </View>


                <View style={{
                    height: heightPixel(200),
                    width: '80%',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontFamily: 'GT-bold',
                        fontSize: fontPixel(25),
                        color: '#1B1B1B'
                    }}>
                        Professional service
                    </Text>

                    <Text style={{
                        fontFamily: 'GT-medium',
                        fontSize: fontPixel(16),
                        color: Colors.tintText,
                        lineHeight: 16,
                        textAlign: 'center',
                        marginVertical: pixelSizeVertical(10)
                    }}>
                        Ship and track parcels and
                        packages in real time
                    </Text>

                </View>


                <View style={styles.buttonWrap}>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={{
                        width: widthPixel(250),
                        height: 60,
                        borderRadius: 10,
                        backgroundColor: Colors.primaryColor,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            fontFamily: 'GT-bold',
                            color: '#fff',
                            fontSize: fontPixel(20)
                        }}>
                            START HERE
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={{
                        width: '65%',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}>
                        <Text style={{
                            fontFamily: 'GT-regular',
                            color: '#1b1b1b',
                            fontSize: fontPixel(16)
                        }}>
                            Already have an account?
                        </Text>
                        <Text style={{
                            fontFamily: 'GT-regular',
                            color: Colors.primaryColor,
                            fontSize: fontPixel(16)
                        }}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    buttonWrap: {
        height: heightPixel(200),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    }
})

export default StartScreen;
