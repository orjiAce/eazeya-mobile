import * as React from 'react';
import {ScrollView, View, Text, StyleSheet, TouchableOpacity,} from 'react-native';

import {SafeAreaView} from "react-native-safe-area-context";
import {fontPixel, heightPixel, pixelSizeHorizontal} from "../utils/normalize";
import TopBar from "../components/view/TopBar";
import Colors from "../constants/Colors";
import {Feather} from "@expo/vector-icons";

import {useAppSelector} from "../app/hooks";
import {DocumentData, getDoc, limit, where} from "firebase/firestore";
import {db} from '../firebase'; // update with your path to firestore config
import {collection, query, getDocs} from "firebase/firestore";
import {useEffect} from "react";
import {getDistance, getPreciseDistance, isPointWithinRadius} from 'geolib'


export default function Dashboard({navigation}: any) {
    const user = useAppSelector(state => state.user)
    const {
        userData: {
            lastName
        }
    } = user




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
                            width: '100%',
                            backgroundColor: '#fff',
                        }}
            >


                <TopBar navigation={navigation} routeName="Dashboard"/>
                <View style={{
                    height: 100,
                    width: '95%',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'flex-start'
                }}>

                    <Text style={{
                        fontSize: fontPixel(26),
                        fontFamily: 'GT-medium',
                        color: '#1b1b1b'
                    }}>
                        Welcome,
                    </Text>
                    <Text style={{
                        marginHorizontal: 5,
                        fontSize: fontPixel(26),
                        fontFamily: 'GT-bold',
                        color: '#1b1b1b',
                        textTransform: 'capitalize'
                    }}>
                        {lastName}
                    </Text>
                </View>


                <View style={styles.container}>
                    <View style={{
                        width: '95%',

                    }}>
                        <Text style={{
                            fontSize: fontPixel(14),
                            color: Colors.tintText
                        }}>
                            Where are we going today?
                        </Text>
                    </View>


                    <View style={{
                        borderColor: Colors.primaryColor,
                        borderRadius: 10,
                        borderWidth: 1,
                        height: 60,
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly'
                    }}>
                        <View style={{
                            width: '10%',
                            height: '90%',
                            alignItems: 'center',
                            justifyContent: 'center',

                        }}>
                            <Feather name="map-pin" size={20} color="black"/>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('LocationScreen')}
                            style={{
                                borderLeftColor: '#F0F0F0',
                                borderLeftWidth: 1,
                                width: '80%',
                                height: '80%',
                                padding: 8,
                                justifyContent: 'center'
                            }}

                        >
                            <Text style={styles.tintText}>
                                Give us a location
                            </Text>
                        </TouchableOpacity>


                    </View>


                </View>


                <View style={styles.quickActions}>
                    <View style={{
                        width: '95%'
                    }}>
                        <Text style={{
                            fontFamily: 'GT-bold',
                            color: "#333"
                        }}>
                            Quick action
                        </Text>
                    </View>


                    <View style={styles.actionButtonsWrap}>

                        <TouchableOpacity onPress={() => navigation.navigate('LocationScreen')}
                                          style={styles.actionButtons}>
                            <View style={{
                                width: '15%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'transparent'
                            }}>

                                <Feather name="send" size={24} color={Colors.primaryColor}/>

                            </View>
                            <View style={{
                                width: '70%',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                backgroundColor: 'transparent'
                            }}>
                                <Text style={{
                                    fontFamily: 'GT-medium',
                                    fontSize: fontPixel(16)
                                }}>
                                    Start here
                                </Text>
                            </View>

                            <View style={{
                                width: '10%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'transparent'
                            }}>
                                <Feather name="chevron-right" size={24} color={Colors.primaryColor}/>
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('AddPayment')}
                                          style={styles.actionButtons}>
                            <View style={{
                                width: '15%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'transparent'
                            }}>

                                <Feather name="credit-card" size={24} color={"#333"}/>

                            </View>
                            <View style={{
                                width: '70%',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                backgroundColor: 'transparent'
                            }}>
                                <Text style={{
                                    fontFamily: 'GT-medium',
                                    fontSize: fontPixel(16)
                                }}>
                                    Add payment
                                </Text>
                            </View>

                            <View style={{
                                width: '10%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'transparent'
                            }}>
                                <Feather name="chevron-right" size={24} color={Colors.primaryColor}/>
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButtons}>
                            <View style={{
                                width: '15%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'transparent'
                            }}>

                                <Feather name="phone-call" size={24} color="black"/>

                            </View>
                            <View style={{
                                width: '70%',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                backgroundColor: 'transparent'
                            }}>
                                <Text style={{
                                    fontFamily: 'GT-medium',
                                    fontSize: fontPixel(16)
                                }}>
                                    Support
                                </Text>
                            </View>

                            <View style={{
                                width: '10%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'transparent'
                            }}>
                                <Feather name="chevron-right" size={24} color={Colors.primaryColor}/>
                            </View>

                        </TouchableOpacity>

                    </View>


                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 90
    },
    title: {
        fontSize: fontPixel(20),
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    quickActions: {
        marginTop: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: "center"
    },
    actionButtonsWrap: {
        height: heightPixel(400),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    actionButtons: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        justifyContent: 'space-between',
        backgroundColor: '#F8F9F9',
        height: 100
    },
    tintText: {
        fontFamily: 'GT-medium',
        fontSize: fontPixel(14),
        color: Colors.tintText
    }
});
