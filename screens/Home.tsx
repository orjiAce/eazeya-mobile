import * as React from 'react';

import Constants from 'expo-constants';
import {ScrollView,View,Text, StyleSheet, TextInput as RNTextInput, TouchableOpacity,} from 'react-native';

import {RootTabScreenProps} from '../types';

import {SafeAreaView} from "react-native-safe-area-context";
import {fontPixel, heightPixel, pixelSizeHorizontal} from "../utils/normalize";
import TopBar from "../components/view/TopBar";
import Colors from "../constants/Colors";
import {Feather} from "@expo/vector-icons";

//const GOOGLE_PLACES_API_KEY = 'AIzaSyCE71u7ryI37ySHtISd10smNBS9KsZU1hs'; // never save your real api key in a snack!
import { GOOGLE_MAPS_API_KEY } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const Home = ({navigation}:any) => {
    return (
        <SafeAreaView style={{
            flex: 1,
            paddingHorizontal: pixelSizeHorizontal(24),
            backgroundColor: '#fff',

        }}>


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
                    color: '#1b1b1b'
                }}>
                    Joseph
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
                        Where are sending your package to?
                    </Text>
                </View>


            <GooglePlacesAutocomplete
                styles={{
                    textInputContainer:{
                        borderColor: Colors.primaryColor,
                        borderRadius: 10,
                        padding:10,
                        borderWidth: 1,
                        height: 60,
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly'
                    },

                    textInput:{
                        height:'90%',
                        width:'80%'
                    }

                }}
                renderLeftButton={() =><Feather name="map-pin" size={20} color="black"/>}
                autoFillOnNotFound={true}
                currentLocationLabel="click"
                listViewDisplayed="auto"
                listUnderlayColor={"#333"}
                nearbyPlacesAPI="GooglePlacesSearch"
                debounce={400}
                currentLocation={true}
                placeholder="Where from?"
                enablePoweredByContainer={false}
                minLength={2}
                fetchDetails={true}
                query={{
                    key: GOOGLE_MAPS_API_KEY,
                    language: 'en', // language of the results
                }}
                onPress={(data, details = null) => console.log(data)}
                onFail={(error) => console.error(error)}
                requestUrl={{
                    url:
                        'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
                    useOnPlatform: 'web',
                }} // this in only required for use on the web. See https://git.io/JflFv more for details.
            />


            </View>

     {/*            <View style={styles.quickActions}>
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

                        <TouchableOpacity style={styles.actionButtons}>
                            <View style={{
                                width:'15%',
                                justifyContent:'center',
                                alignItems:'center',
                                backgroundColor:'transparent'
                            }}>

                                <Feather name="send" size={24} color={Colors.primaryColor}  />

                            </View>
                            <View style={{
                                width:'70%',
                                alignItems:'flex-start',
                                justifyContent:'center',
                                backgroundColor:'transparent'
                            }}>
                                <Text style={{
                                    fontFamily:'GT-medium',
                                    fontSize:fontPixel(16)
                                }}>
                                    Send item
                                </Text>
                            </View>

                            <View style={{
                                width:'10%',
                                justifyContent:'center',
                                alignItems:'center',
                                backgroundColor:'transparent'
                            }}>
                                <Feather name="chevron-right" size={24} color={Colors.primaryColor} />
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButtons}>
                            <View style={{
                                width:'15%',
                                justifyContent:'center',
                                alignItems:'center',
                                backgroundColor:'transparent'
                            }}>

                                <Feather name="credit-card" size={24} color={"#333"} />

                            </View>
                            <View style={{
                                width:'70%',
                                alignItems:'flex-start',
                                justifyContent:'center',
                                backgroundColor:'transparent'
                            }}>
                                <Text style={{
                                    fontFamily:'GT-medium',
                                    fontSize:fontPixel(16)
                                }}>
                                    Add payment
                                </Text>
                            </View>

                            <View style={{
                                width:'10%',
                                justifyContent:'center',
                                alignItems:'center',
                                backgroundColor:'transparent'
                            }}>
                                <Feather name="chevron-right" size={24} color={Colors.primaryColor} />
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButtons}>
                            <View style={{
                                width:'15%',
                                justifyContent:'center',
                                alignItems:'center',
                                backgroundColor:'transparent'
                            }}>

                                <Feather name="phone-call" size={24} color="black" />

                            </View>
                            <View style={{
                                width:'70%',
                                alignItems:'flex-start',
                                justifyContent:'center',
                                backgroundColor:'transparent'
                            }}>
                                <Text style={{
                                    fontFamily:'GT-medium',
                                    fontSize:fontPixel(16)
                                }}>
                                    Support
                                </Text>
                            </View>

                            <View style={{
                                width:'10%',
                                justifyContent:'center',
                                alignItems:'center',
                                backgroundColor:'transparent'
                            }}>
                                <Feather name="chevron-right" size={24} color={Colors.primaryColor} />
                            </View>

                        </TouchableOpacity>

                    </View>


                </View>*/}


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({


    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
height:190
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
        marginTop: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: "center"
    },
    actionButtonsWrap:{
        height:heightPixel(400),
        width:'100%',
        alignItems:'center',
        justifyContent:'space-evenly'
    } ,
    actionButtons:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        padding:15,
        borderRadius:10,
        justifyContent:'space-between',
        backgroundColor:'#F8F9F9',
        height:100
    }
});

export default Home;
