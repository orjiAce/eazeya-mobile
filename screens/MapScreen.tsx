import {TouchableOpacity, View, Text} from "react-native";


import Map from "../components/Map";
import {selectTravelTimeInfo} from "../app/slices/navigationSlice";
import React, {useCallback, useMemo, useRef, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {fontPixel, heightPixel} from "../utils/normalize";
import {Ionicons} from "@expo/vector-icons";
import {useSelector} from "react-redux";
import RideInfo from "../components/RideInfo";
import BottomSheet from "@gorhom/bottom-sheet";


const SURGE_CHARGE_RATE = 1.5;

const MapScreen = ({navigation}: any) => {


    const [height, setHeight] = useState(300);
    const [selected, setSelected] = useState<RidesData[0] | null>(null);
    const travelTimeInformation = useSelector(selectTravelTimeInfo);


    const sheetRef = useRef<BottomSheet>(null);

    // variables
    const snapPoints = useMemo(() => ["35%", "100%"], []);

    // callbacks
    const handleSheetChange = useCallback((index) => {
        console.log("handleSheetChange", index);

    }, []);


    return (
        <View style={{
            alignItems: 'center',
            flex: 1
        }}>

            <View style={{

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
            }}>

                <TouchableOpacity onPress={() => navigation.goBack()} style={{
                    width: 40,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Ionicons name="arrow-back-outline" size={24} color="black"/>


                </TouchableOpacity>


                <View style={{
                    alignItems: 'center',
                    height: '100%',
                    justifyContent: 'space-between'
                }}>


                    <Text style={{
                        color: '#161D4D',
                        fontSize: fontPixel(18),
                        fontFamily: 'GT-bold'
                    }}>
                        {travelTimeInformation?.duration?.text} Ride
                    </Text>

                    <Text style={{
                        color: '#6D6D6D',
                        fontSize: fontPixel(14),
                        fontFamily: 'GT-medium'
                    }}>
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
                height: "80%",
                width: '100%'
            }}>
                <Map/>
            </View>
            <View style={{
                position: "absolute",
                width: '100%',
                height: 350,
                bottom: 0,
                alignItems: 'center',

                justifyContent: 'center'
            }}>
                <RideInfo snapPoints={snapPoints} sheetRef={sheetRef} handleSheetChange={handleSheetChange}/>
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

export default MapScreen;
