import MapView, {MarkerAnimated, Polyline, Marker, AnimatedRegion, Animated, PROVIDER_GOOGLE} from "react-native-maps";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {
    selectDestination,
    selectOrigin,
    setTravelTimeInfo,
} from "../app/slices/navigationSlice";
import {useDispatch, useSelector} from "react-redux";

import {GOOGLE_MAPS_API_KEY} from "@env";
import MapViewDirections from "react-native-maps-directions";
import {Platform} from "react-native";
import Colors from "../constants/Colors";
import {useNavigation} from "@react-navigation/native";
import * as Location from 'expo-location'

Location.installWebGeolocationPolyfill()

const Map = () => {

    const navigation = useNavigation()

    const {isFocused} = navigation
    const dispatch = useDispatch();
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef<MapView>(null);
    const [state, setState] = useState(1);

    useEffect(() => {
        setState(Math.random())
    }, [])

    useEffect(() => {
        if (!origin || !destination) return;

        mapRef.current?.fitToSuppliedMarkers(["origin", "destination"], {
            edgePadding: {top: 100, right: 100, bottom: 100, left: 100},
        });
    }, [state]);


    useEffect(() => {

        if (!origin || !destination) return;

        const getTravelTime = async () => {
            const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();
            dispatch(setTravelTimeInfo(data.rows[0].elements[0]));
            //console.log(data)
        };

        getTravelTime();
    }, [origin, destination, GOOGLE_MAPS_API_KEY]);





    //  navigator.geolocation.getCurrentPosition((l) => console.log('location:',location));


    return (
        <MapView
            //onUserLocationChange={() => getUserCurrentLocation()}

            //showsUserLocation={true}
            //followsUserLocation={true}
            //userLocationPriority="high"
            //showsTraffic={true}
            loadingEnabled={true}
            loadingIndicatorColor={Colors.primaryColor}
            zoomEnabled={true}
            zoomControlEnabled={true}
            provider={PROVIDER_GOOGLE}
            style={{
                flex: 1
            }}

            onMapReady={() => {
                mapRef.current?.fitToSuppliedMarkers(["origin", "destination"], {
                    edgePadding: {top: 100, right: 100, bottom: 100, left: 100},
                });
            }}
            ref={mapRef}
            initialRegion={{
                latitude: origin?.location?.lat || 37.78825,
                longitude: origin?.location?.lng || -122.4324,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
            region={{
                latitude: origin?.location?.lat || 47.78825,
                longitude: origin?.location?.lng || -222.4324,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}

            mapType={Platform.OS == "android" ? "standard" : "standard"}

        >
            {/*  {origin &&(
      <Callout tooltip={true} alphaHitTest={true}/>
      )}*/}

            {/*   {origin &&(
            <Polyline coordinates={{
                latitude: origin?.location?.lat || 37.78825,
                longitude: origin?.location?.lng || -122.4324,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}/>
        )
        }*/}
            {origin && destination && (
                <MapViewDirections
                    origin={origin.description}
                    destination={destination.description}
                    apikey={GOOGLE_MAPS_API_KEY}
                    strokeWidth={3}
                    strokeColor="blue"
                    mode="DRIVING"
                    lineCap={"butt"}
                    lineDashPattern={[1]}
                    optimizeWaypoints={true}
                    //zoom out on the map once it loads
                    onReady={(result) => {
                        mapRef.current?.fitToSuppliedMarkers(["origin", "destination"], {
                            edgePadding: {top: 100, right: 100, bottom: 100, left: 100},
                        });
                    }}
                    onError={(errorMessage) => {
                        // console.log('GOT AN ERROR');
                    }}
                />
            )}

            {origin?.location && (
                <Marker

                    draggable={true}
                    coordinate={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng,
                    }}
                    title="Origin"
                    description={origin.description}
                    identifier="origin"
                />
            )}


           {/* {destination?.location && (
                <Marker

                    image={require('../assets/images/car.png')}
                    draggable={true}
                    coordinate={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng,
                    }}
                    title="userLocation"
                    description={destination.description}
                    identifier="userLocation"
                />
            )}*/}

            {destination?.location && (
                <Marker
                    draggable
                    //onDragStart={(data) => console.log(data)}
                    coordinate={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng,
                    }}
                    title="Destination"
                    description={destination.description}
                    identifier="destination"
                />
            )}
        </MapView>
    );
};

export default Map;
