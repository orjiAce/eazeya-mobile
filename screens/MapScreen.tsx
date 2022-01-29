import {TouchableOpacity, View, Text, StyleSheet} from "react-native";


import Map from "../components/Map";
import {selectTravelTimeInfo} from "../app/slices/navigationSlice";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {fontPixel, heightPixel} from "../utils/normalize";
import {Ionicons} from "@expo/vector-icons";
import {useSelector} from "react-redux";
import RideInfo from "../components/RideInfo";
import BottomSheet from "@gorhom/bottom-sheet";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import Toast from "../components/Toast";
import {useSetResponse} from "../app/slices/userSlice";


const SURGE_CHARGE_RATE = 1.5;

const MapScreen = ({navigation, route}: any) => {

    const {rideType} = route.params

    const [selected, setSelected] = useState<RidesData[0] | null>(null);
    const dispatch = useAppDispatch()
    const travelTimeInformation = useSelector(selectTravelTimeInfo);

    const user = useAppSelector(state => state.user)

    const {responseMessage, responseType, responseState} = user

    const sheetRef = useRef<BottomSheet>(null);

    // variables
    const snapPoints = useMemo(() => ["75%", "100%"], []);

    // callbacks
    const handleSheetChange = useCallback((index) => {
        console.log("handleSheetChange", index);

    }, []);

    useEffect(() => {
        if (responseState || responseMessage) {


            const time = setTimeout(() => {
                dispatch(useSetResponse())
            }, 3500)
            return () => {
                clearTimeout(time)
            };
        }
    }, [responseState, responseMessage]);

    return (
        <View style={{
            alignItems: 'center',
            flex: 1
        }}>
            <Toast title={responseType} message={responseMessage} state={responseState} type={responseType}/>
            <View style={styles.topBar}>

                <TouchableOpacity onPress={() => navigation.goBack()} style={{
                    width: 40,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Ionicons name="arrow-back-outline" size={24} color="black"/>

                </TouchableOpacity>


                <View style={styles.travelInfo}>

                    <Text style={styles.travelTime}>
                        {travelTimeInformation?.duration?.text} Ride
                    </Text>

                    <Text style={styles.distance}>
                        {travelTimeInformation?.distance.text}les

                    </Text>
                </View>

                <View style={{
                    width: 40,
                    height: 40
                }}>

                </View>

            </View>

            <View style={{
                height: "70%",
                width: '100%'
            }}>
                <Map/>
            </View>
            <View style={styles.rideInfo}>

                <RideInfo rideType={rideType} snapPoints={snapPoints} sheetRef={sheetRef} handleSheetChange={handleSheetChange}/>
            </View>
        </View>
    );
};

type RidesData = {
    id: string;
    title: string;
    multiplier: number;
    image: string;
}[];

const styles = StyleSheet.create({
    travelTime: {
        color: '#161D4D',
        fontSize: fontPixel(18),
        fontFamily: 'GT-bold'
    },
    distance: {
        color: '#6D6D6D',
        fontSize: fontPixel(14),
        fontFamily: 'GT-medium'
    },
    topBar: {
        shadowColor: "black",
        shadowOffset: {
            width: 5,
            height: 10
        },
        elevation: 14,
        shadowOpacity: 0.2,
        shadowRadius: 10,
        top: '8%',
        borderRadius: 20,
        zIndex: 10,
        position: 'absolute',
        height: 60,
        backgroundColor: '#fff',
        width: '80%',
        alignItems: 'center',
        padding: 15,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    travelInfo: {
        alignItems: 'center',
        height: '100%',
        justifyContent: 'space-between'
    },
    rideInfo: {
        position: "absolute",
        width: '100%',
        height: heightPixel(350),
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default MapScreen;
