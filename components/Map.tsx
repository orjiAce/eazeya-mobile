import MapView, { MarkerAnimated, Callout,Marker,AnimatedRegion, Animated ,PROVIDER_GOOGLE } from "react-native-maps";
import React, {useEffect, useRef, useState} from "react";
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInfo,
} from "../app/slices/navigationSlice";
import { useDispatch, useSelector } from "react-redux";

import { GOOGLE_MAPS_API_KEY } from "@env";
import MapViewDirections from "react-native-maps-directions";
import {Platform} from "react-native";
import Colors from "../constants/Colors";
import {useNavigation} from "@react-navigation/native";


const Map = () => {

  const navigation = useNavigation()

  const {isFocused} = navigation
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef<MapView>(null);
  const [state, setState] = useState(1);

  useEffect(() =>{
 setState(Math.random())
  },[])

  useEffect(() => {
    if (!origin || !destination) return;

    mapRef.current?.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [state]);



  useEffect(() => {

    if (!origin || !destination) return;

    const getTravelTime = async () => {
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      dispatch(setTravelTimeInfo(data.rows[0].elements[0]));
      console.log(data)
    };

    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_API_KEY]);




  return (
    <MapView

        onMarkerDrag={(data) => console.log(data)}
        onMarkerDragStart={(data) => console.log(data)}
        showsTraffic={false}
        loadingEnabled={true}
        loadingIndicatorColor={Colors.primaryColor}
        zoomEnabled={true}
        zoomControlEnabled={true}
        provider={PROVIDER_GOOGLE}
        style={{
          flex:1
        }}

      ref={mapRef}
      initialRegion={{
        latitude: origin?.location?.lat || 37.78825,
        longitude: origin?.location?.lng || -122.4324,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
        mapType={Platform.OS == "android" ? "standard" : "standard"}

    >
    {/*  {origin &&(
      <Callout tooltip={true} alphaHitTest={true}/>
      )}*/}
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={5}
          strokeColor="blue"
          lineDashPhase={9}
          mode="DRIVING"

          lineDashPattern={[0]}
          optimizeWaypoints={true}
//zoom out on the map once it loads
          onReady={(result) => {
            mapRef.current?.fitToSuppliedMarkers(["origin", "destination"], {
              edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
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

      {destination?.location && (
        <MarkerAnimated
            draggable
            flat={true}
            onDragStart={(data) => console.log(data)}
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
