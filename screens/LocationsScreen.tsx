import React, {useEffect, useState} from 'react';

import {StyleSheet, Text, TouchableOpacity, View, Platform, Pressable} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {fontPixel, heightPixel, pixelSizeHorizontal, widthPixel} from "../utils/normalize";
import {FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons, Octicons} from "@expo/vector-icons";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import Colors from "../constants/Colors";
import {GOOGLE_MAPS_API_KEY} from "@env";
import * as Location from 'expo-location'
import {Constants} from "expo-constants";
import {RadioButton} from 'react-native-paper';
import {useDispatch} from "react-redux";
import {setDestination, setOrigin} from "../app/slices/navigationSlice";


Location.installWebGeolocationPolyfill()
//navigator.geolocation.getCurrentPosition('');

const LocationScreen = ({navigation}: any) => {

    const dispatch = useDispatch()


    const [dropOff, setDropOff] = useState('');
    const [pickup, setPickup] = useState('');

    const [location, setLocation] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState('');

    const [type, setType] = useState('');

    let valid = false
    if(dropOff !== '' && pickup !== '' && type !== ''){
        valid = true
    }


    useEffect(() => {
        (async () => {
            //@ts-ignore
            if (Platform.OS === 'android' && !Constants.isDevice) {
                setErrorMsg(
                    'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
                );
                return;
            }
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, [])

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }


    /*    useEffect(() => {

            navigator.geolocation.getCurrentPosition((l) => console.log('My location:',location));

        }, []);*/


    return (
        <SafeAreaView style={{
            flex: 1,
            paddingHorizontal: pixelSizeHorizontal(24),
            backgroundColor: '#fff',
            alignItems: 'center',
        }}>


            <View style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 80,
                flexDirection: 'row'
            }}>

                <TouchableOpacity onPress={() => navigation.goBack()} style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 30,
                    height: 30
                }}>
                    <Ionicons name={"ios-arrow-back"} color={"#333"} size={24}/>
                </TouchableOpacity>


                <View style={{
                    width: '30%'
                }}>
                    <Text style={{
                        fontFamily: 'GT-medium',
                        color: '#1B1B1B',
                        fontSize: fontPixel(16)
                    }}>
                        Select location
                    </Text>
                </View>
                <View style={{
                    width: '5%'
                }}>

                </View>

            </View>


            <View style={styles.inputCont}>
                <View style={{
                    width: '10%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-evenly'
                }}>

                    <Octicons name="primitive-dot" size={20} color="black"/>
                    <View style={styles.border}/>
                    <FontAwesome name="map-marker" size={20} color={Colors.primaryColor}/>


                </View>

                <View style={styles.inputWrap}>


                    <GooglePlacesAutocomplete

                        styles={{
                            textInputContainer: {
                                borderColor: "#EEEEEE",
                                borderRadius: 10,
                                padding: 10,
                                borderWidth: 1,
                                height: 60,
                                flex: 0,
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-evenly',
                                color: '#333',
                                fontSize: fontPixel(16)
                            },
                            textInput: {
                                height: '90%',
                                width: '80%',
                                color: "#333",
                                fontFamily: 'GT-bold'
                            },

                            listView: {
                                width: '100%',
                                height: 400,
                                backgroundColor: '#fff',
                                position: 'absolute',
                                marginTop: 130,
                            },
                            predefinedPlacesDescription: {
                                color: Colors.primaryColor,
                                fontFamily: 'GT-bold'
                            },

                            row: {
                                backgroundColor: '#FFFFFF',
                                padding: 13,
                                height: 44,
                                flexDirection: 'row',

                            },

                            separator: {
                                height: 0.5,
                                backgroundColor: '#c8c7cc',
                            },
                            description: {
                                color: '#333',
                                fontFamily: 'GT-bold'
                            }
                            ,
                            loader: {
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                height: 20,
                            },
                        }}

                        enableHighAccuracyLocation={true}
                        autoFillOnNotFound={true}
                        //currentLocationLabel="Choose current location"
                        listViewDisplayed="auto"
                        listUnderlayColor={"#333"}
                        nearbyPlacesAPI="GooglePlacesSearch"
                        debounce={400}
                       // currentLocation={true}
                        placeholder="Origin"
                        enablePoweredByContainer={false}
                        minLength={2}
                        fetchDetails={true}
                        isRowScrollable={true}
                        disableScroll={false}
                        query={{
                            key: GOOGLE_MAPS_API_KEY,
                            language: 'en', // language of the results
                        }}
                        onPress={(data, details = null) => {
                            setPickup(data.description)
                            dispatch(setOrigin(
                                {
                                    location: details?.geometry.location,
                                    description: data.description
                                }
                            ))
                        }}

                        onFail={(error) => console.error(error)}
                        requestUrl={{
                            url:
                                'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
                            useOnPlatform: 'web',
                        }} // this in only required for use on the web. See https://git.io/JflFv more for details.
                    />


                    <GooglePlacesAutocomplete
                        styles={{
                            textInputContainer: {
                                borderColor: "#EEEEEE",
                                borderRadius: 10,
                                padding: 10,
                                borderWidth: 1,
                                height: 60,
                                flex: 0,
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-evenly',

                            },

                            textInput: {
                                height: '90%',
                                width: '80%',
                                fontFamily: 'GT-bold',
                                color: '#333',
                                fontSize: fontPixel(16)
                            },
                            listView: {width: '100%', height: 400, position: 'absolute', marginTop: 70,},
                            predefinedPlacesDescription: {
                                color: Colors.primaryColor,
                                fontFamily: 'GT-bold'
                            },

                            row: {
                                backgroundColor: '#FFFFFF',
                                padding: 13,
                                height: 44,
                                flexDirection: 'row',

                            },
                            loader: {
                                borderRadius: 10,
                                backgroundColor: '#eee',
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                height: 20,
                            },
                            separator: {
                                height: 0.5,
                                backgroundColor: '#c8c7cc',
                            },
                            description: {
                                color: '#333',
                                fontFamily: 'GT-bold'
                            }
                            ,

                        }}

                        autoFillOnNotFound={true}
                       // currentLocationLabel="Choose current location"
                        listViewDisplayed="auto"
                        listUnderlayColor={"#333"}
                        nearbyPlacesAPI="GooglePlacesSearch"
                        debounce={400}
                       // currentLocation={true}
                        placeholder="Drop off"
                        enablePoweredByContainer={false}
                        minLength={2}
                        fetchDetails={true}

                        isRowScrollable={true}
                        disableScroll={false}
                        query={{
                            key: GOOGLE_MAPS_API_KEY,
                            language: 'en', // language of the results
                        }}
                        onPress={(data, details = null) => {
                            setDropOff(data.description)
                            dispatch(
                                setDestination({
                                    location: details?.geometry.location,
                                    description: data.description,
                                })
                            );

                        }}
                        onFail={(error) => console.error(error)}
                        requestUrl={{
                            url:
                                'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
                            useOnPlatform: 'web',
                        }} // this in only required for use on the web. See https://git.io/JflFv more for details.
                    />

                </View>


            </View>


            <View style={{
                height: heightPixel(400),
                width: '100%',
                marginTop: 40,
                zIndex: -1,
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly'
                }}>
                    <TouchableOpacity onPress={() => setType('Ride')} style={[styles.selectBox, {
                        backgroundColor: type === 'Ride' ? Colors.tintPrimary : "#F8F9F9",
                        borderColor: type === 'Ride' ? Colors.primaryColor : "#F8F9F9",
                    }]}
                    >

                        <FontAwesome5 name="taxi" size={20} color="black"/>
                        <Text style={styles.selectText}>
                            Ride
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setType('Delivery')} style={[styles.selectBox, {
                        backgroundColor: type === 'Delivery' ? Colors.tintPrimary : "#F8F9F9",
                        borderColor: type === 'Delivery' ? Colors.primaryColor : "#F8F9F9",
                    }]}
                    >

                        <MaterialCommunityIcons name="motorbike" size={20} color="black"/>
                        <Text style={styles.selectText}>
                            Delivery
                        </Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.summary}>

                    <Text style={{
                        width: '90%',
                        fontSize: fontPixel(14),
                        marginBottom: 15,
                        textAlign: 'left',
                        fontFamily: 'GT-medium',
                        color: "#333"
                    }}>
                        Summary
                    </Text>
                    <View style={styles.summaryBox}>
                        <View style={{
                            height: '25%',
                            width:'100%'
                        }}>
                            <Text style={styles.tintTitleText}>
                                Pickup address
                            </Text>
                            <Text style={styles.pickupAdd}>
                                {pickup}
                            </Text>
                        </View>

                        <View style={{
                            height: '25%',

                        }}>
                            <Text style={styles.tintTitleText}>
                               Destination
                            </Text>
                            <Text style={styles.dropOffAdd}>
                                {dropOff}
                            </Text>
                        </View>
                    </View>
                </View>

            </View>


            <TouchableOpacity disabled={!valid} onPress={() => navigation.navigate("MapScreen",{
                rideType:type
            })}
                              style={[styles.continue,{
                                  backgroundColor: valid ? Colors.primaryColor : '#ddd',
                              }]}>
                <Text style={{
                    fontFamily: 'GT-bold',
                    color: '#fff',
                    fontSize: fontPixel(20)
                }}>
                    Continue
                </Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    inputWrap: {
        width: '80%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputCont: {
        flexDirection: 'row',
        height: 140,
        width: '100%',
        alignItems: 'center',

    },
    border: {
        width: 1,
        height: 70,
        borderColor: '#ececec',
        borderWidth: 1,
        borderStyle: 'dashed'
    },
    selectBox: {
        width: '40%',
        height: heightPixel(140),
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectText: {
        marginTop: 10,
        color: "#1B1B1B",
        fontFamily: 'GT-medium',
        fontSize: fontPixel(16)
    },
    continue: {
        marginTop: 20,
        width: '90%',
        height: 60,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    summary: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    summaryBox: {
        padding: 10,
        width: '90%',
        borderRadius: 10,
        height: heightPixel(200),
        borderWidth: 1,
        borderColor: "#E5E5E5"
    },
    tintTitleText: {
        color: Colors.tintText,
        fontSize: fontPixel(12),

    },
    pickupAdd: {
        color: Colors.primaryColor,
        fontFamily: 'GT-medium',
        fontSize: fontPixel(14)
    },
    dropOffAdd: {
        color: "#161D4D",
        fontFamily: 'GT-medium',
        fontSize: fontPixel(14)
    }

})

export default LocationScreen;
