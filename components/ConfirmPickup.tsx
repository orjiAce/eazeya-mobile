import React, {useState} from 'react';

import {Text, View, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import {fontPixel, heightPixel} from "../utils/normalize";
import Colors from "../constants/Colors";
import numberWithCommas from "../utils/NumberWithComma";

import {geohashQueryBounds} from 'geofire-common'
import {collection, doc, DocumentData, getDoc, getDocs, getFirestore, query, setDoc, where} from "firebase/firestore";
import {db} from "../firebase";
import {isPointWithinRadius} from "geolib";
import {useSelector} from "react-redux";
import {selectDestination, selectOrigin} from "../app/slices/navigationSlice";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {setResponse, setRider} from "../app/slices/userSlice";
import {FontAwesome5, MaterialCommunityIcons} from "@expo/vector-icons";
import {IF} from './helper/ConditionJsx';


let SURGE_CHARGE_RATE = 1.5;

interface props {
    location: string | undefined,
    price: number | undefined,
    rideType:string

}


const ConfirmPickup = ({location, price,rideType}: props) => {

    const firestore = getFirestore();
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false);

    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);

    const user = useAppSelector(state => state.user);
    const {ride, userData: {phone}} = user
    // console.log(numberWithSpace(39983444251383440))
    const driverRef = collection(db, "drivers");


    const triggerDriver = (driverDetails: {}) => {
        setDoc(doc(firestore, "rides", driverDetails.rider.uid),
            driverDetails.rider,
        ).then(r => {
                getDoc(doc(db, 'rides', driverDetails.rider.uid)).then(() =>{
                    setLoading(false)
                    dispatch(setRider(driverDetails))
                }).catch(err =>{
                    console.error(err)
                    }
                )

            }
        ).catch(err =>{
                console.error(err)
            }
        )
    }

    const confirmPickupLocation = async (type: string) => {

        setLoading(true)
        const q = await query(driverRef, where("rideStatus", "==", false),
            where("online", "==", true),
            where("type", "==", type));

        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            setLoading(false)
            dispatch(setResponse({
                responseMessage: 'No driver available',
                responseState: true,
                responseType: 'error',
            }))
            return
        }


        const promise: DocumentData[] = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            promise.push(doc.data())
        });
//console.log(promise)

        const closest = promise.map((driver) => {
            const coord = driver.currentLoc
            return {
                coord,
                driver,
                dist: isPointWithinRadius({latitude: origin?.location.lat, longitude: origin?.location.lng},
                    {latitude: coord.latitude, longitude: coord.longitude}, 1000)
            }
        })
//sort((a, b) => a.dist - b.dist)[0]

        const filter = await closest.find(driver => driver.dist)
        if(filter){

            const driverDetails = {
                type: filter?.driver.type,
                onARide: false,
                rider: {
                    firstName: filter?.driver.firstName,
                    lastName: filter?.driver.lastName,
                    accepted: false,
                    cost: price,
                    pickup: location,
                    userContact: phone,
                    destination: destination?.description,
                    uid: filter?.driver.uid,
                    type:type
                }
            }
            triggerDriver(driverDetails)
            setLoading(false)
        }else{
            setLoading(false)
            dispatch(setResponse({
                responseMessage: 'No driver withing the location',
                responseState: true,
                responseType: 'error',
            }))
        }


       //

    }


    /*
    navigator.geolocation.getCurrentPosition(
        position => {
            console.log(position);
            console.log({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null
            });
        },
            error => console.error({ error: error.message }),
            { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 }

    )*/

    return (
        <View style={styles.confirmPickup}>
            <Text style={styles.title}>
                Confirm pickup location
            </Text>

            <View style={styles.info}>
                <Text style={styles.pickup}>
                    {location}
                </Text>
                <View style={{
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row'
                }}>
                    <Text style={styles.price}>
                        ₦ {numberWithCommas(((price || 0) * SURGE_CHARGE_RATE * 100) / 100)} |&nbsp;
                    </Text>
                    {
                        rideType === 'Delivery' ?

                            <MaterialCommunityIcons name="motorbike" size={18} color={Colors.tintText}/>
                            :
                            <FontAwesome5 name="taxi" size={18} color={Colors.tintText}/>
                    }
                </View>
            </View>

            <IF condition={ride.rider.firstName === ''}>
                <TouchableOpacity
                    disabled={loading}
                    onPress={() => confirmPickupLocation('Ride')}
                    style={[styles.continue, {
                        backgroundColor: Colors.primaryColor,
                    }]}>
                    {
                        loading ? <ActivityIndicator color={Colors.tint} size="small"/> :

                            <Text style={{
                                fontFamily: 'GT-bold',
                                color: '#fff',
                                fontSize: fontPixel(20)
                            }}>
                                Confirm
                            </Text>
                    }
                </TouchableOpacity>
            </IF>

            <IF condition={ride.rider.firstName !== ''}>
                <Text>
                    Waiting for driver {ride.rider.lastName}
                </Text>
            </IF>

        </View>
    );
};

const styles = StyleSheet.create({
    confirmPickup: {
        height: '90%',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        width: '100%'
    },
    title: {
        color: "#333",
        fontFamily: 'GT-medium',
        fontSize: fontPixel(20)
    },
    continue: {
        marginTop: 20,
        width: '90%',
        height: 60,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    info: {
        height: heightPixel(80),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    pickup: {
        color: "#333",
        fontFamily: 'GT-bold',
        fontSize: fontPixel(25)
    },
    price: {
        color: Colors.tintText,
        fontFamily: 'GT-medium',
        fontSize: fontPixel(18)
    }
})

export default ConfirmPickup;
