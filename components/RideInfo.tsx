import React, {useCallback, useRef, useMemo, useEffect} from "react";
import {StyleSheet, View, Text, Button, TouchableOpacity, ImageBackground, Image} from "react-native";
import BottomSheet, {BottomSheetBackdrop, BottomSheetView, useBottomSheetSpringConfigs} from "@gorhom/bottom-sheet";
import {fontPixel, heightPixel, pixelSizeHorizontal} from "../utils/normalize";
import {FontAwesome, Ionicons, Octicons} from "@expo/vector-icons";
import Colors from "../constants/Colors";
import {useSelector} from "react-redux";
import {selectDestination, selectOrigin, selectTravelTimeInfo} from "../app/slices/navigationSlice";
import call from 'react-native-phone-call';
import numberWithCommas from "../utils/NumberWithComma";


interface sheetInterface {
    sheetRef: any,
    snapPoints: any,
    handleSheetChange: any
}

let SURGE_CHARGE_RATE = 1.5;

const RideInfo = ({sheetRef, handleSheetChange, snapPoints}: sheetInterface) => {
    // hooks
    // const sheetRef = useRef<BottomSheet>(null);

    // variables
    // const snapPoints = useMemo(() => ["35%", "50%", "90%"], []);

    // callbacks
    /*  const handleSheetChange = useCallback((index) => {
          console.log("handleSheetChange", );
      }, []);*/


    const animationConfigs = useBottomSheetSpringConfigs({
        damping: 80,
        overshootClamping: true,
        restDisplacementThreshold: 0.1,
        restSpeedThreshold: 0.1,
        stiffness: 500,
    });

    // render

    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const travelTimeInformation = useSelector(selectTravelTimeInfo);

    const triggerCall = (phone) => {
        // Check for perfect 10 digit length


        const args = {
            number: phone,
            prompt: true,
        };
        // Make a call
        call(args).catch(console.error);
    };

    function truncate(str: any, n: number) {
        return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
    }

    return (

        <BottomSheet
            index={1}
            ref={sheetRef}
            snapPoints={snapPoints}
            onChange={handleSheetChange}
            style={styles.container}

            handleIndicatorStyle={{
                backgroundColor: '#333'
            }}
            backgroundStyle={{
                backgroundColor: '#fff'
            }}

            animationConfigs={animationConfigs}
        >
            <BottomSheetView style={styles.rideInfoView}>
                <View style={styles.top}>


                    {/**/}


                    <View style={{
                        width: '100%',
                        alignItems: 'center',
                        height: '35%',
                        justifyContent: 'space-between',
                        flexDirection: 'row'
                    }}>

                        <View style={{
                            width: '55%',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'row'
                        }}>


                            <View style={styles.info}>
                                <Text style={{
                                    fontFamily: 'GT-bold'
                                }}>
                                    BIKE
                                </Text>
                            </View>


                            <View style={styles.info}>
                                <Text style={{
                                    fontFamily: 'GT-bold'
                                }}>
                                    3A4 ABJ 23
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity>
                            <Text style={{
                                color: Colors.primaryColor,
                                fontSize: fontPixel(16),
                                fontFamily: 'GT-bold'
                            }}>
                                Cancel
                            </Text>
                        </TouchableOpacity>

                    </View>


                    <View style={{
                        width: '100%',
                        alignItems: 'center',
                        height: '65%',
                        justifyContent: 'space-between',
                        flexDirection: 'row'
                    }}
                    >
                        <View style={{
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                            overflow: 'hidden',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>


                            <Image resizeMethod="scale" resizeMode="cover" style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'cover'
                            }}
                                   source={{uri: 'https://images.unsplash.com/photo-1624234561795-dfe505d1ccbc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTEwfHxibGFjayUyMG1hbiUyMHBvcnRhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'}}/>


                        </View>

                        <View style={{
                            width: '55%',
                            paddingLeft: 10,
                            justifyContent:'space-evenly',
                            height:'80%'
                        }}>
                            <Text style={{
                                fontSize:fontPixel(14),
                                fontFamily: 'GT-medium'
                            }}>
                                Your rider
                            </Text>
                            <Text style={{
                                fontSize:fontPixel(18),
                                fontFamily: 'GT-bold'
                            }}>
                                Joshua Mark
                            </Text>

                            <Text style={{
                                fontSize:fontPixel(14),
                                color:'#BBBBBC',
                                fontFamily: 'GT-medium'
                            }}>
                                1000 rides
                            </Text>


                            <View style={{
                                flexDirection:'row'
                            }}>
                                <Ionicons name="star" size={14} color={Colors.orange} />
                                <Ionicons name="star" size={14} color={Colors.orange} />
                                <Ionicons name="star" size={14} color={Colors.orange} />
                            </View>

                        </View>

                        <View style={{
                            width: '40%',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                color: '#333333',
                                fontFamily: 'GT-bold',
                                fontSize: fontPixel(18)
                            }}>₦{
                      /*   new Intl.NumberFormat("us", {
                                currency: "NGN",
                                style: "currency",
                            }).format(((travelTimeInformation?.duration.value || 0) *
                                SURGE_CHARGE_RATE
                                * 100) / 100).replace('NGN', '₦')*/

                            numberWithCommas( ((travelTimeInformation?.duration?.value || 0)* SURGE_CHARGE_RATE * 100) /100)
                            }
                            </Text>
                            <Text style={{
                                fontFamily: 'GT-medium',
                                fontSize: fontPixel(14)
                            }}>
                                Cash
                            </Text>
                        </View>

                    </View>

                </View>

                <View style={styles.bottom}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '90%'
                    }}>

                        <Octicons name="primitive-dot" size={20} color="black"/>
                        <View style={styles.border}/>
                        <FontAwesome name="map-marker" size={18} color={Colors.primaryColor}/>

                    </View>
                    <View style={{
                        width: '60%',
                        alignItems: 'flex-start',
                        justifyContent: 'space-evenly',
                        height: '90%'

                    }}>
                        <Text style={{
                            fontFamily: 'GT-medium',
                            color: '#161D4D',
                            fontSize: fontPixel(16)
                        }}>
                            {truncate(origin?.description, 25)}
                        </Text>
                        <Text style={{
                            fontFamily: 'GT-medium',
                            color: '#80828B',
                            fontSize: fontPixel(16),

                        }}>
                            {truncate(destination?.description, 25)}
                        </Text>
                    </View>

                    <View style={{
                        width: '20%',
                        height: '90%',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <TouchableOpacity onPress={() => triggerCall('08103684893')} style={{
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: Colors.primaryColor
                        }}>
                            <Ionicons name="call" size={24} color="#fff"/>
                        </TouchableOpacity>
                    </View>

                </View>

            </BottomSheetView>
        </BottomSheet>

    );
};

const styles = StyleSheet.create({
    container: {},
    rideInfoView: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    top: {
        height: '55%',
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        paddingHorizontal: pixelSizeHorizontal(20),
    },
    bottom: {
        paddingHorizontal: pixelSizeHorizontal(20),
        flexDirection: 'row',
        height: '40%',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    border: {
        width: 1,
        height: '20%',
        borderColor: '#BBBBBC',
        borderWidth: 1,
        borderStyle: 'dashed'
    },
    info: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8F9F9',
        borderRadius: 5,

        padding: 10,
    }
});

export default RideInfo;
