/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {FontAwesome} from '@expo/vector-icons';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';

import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import {RootStackParamList, StartTabParamList} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import StartScreen from "../screens/StartScreen";
import LoginScreen from "../screens/LoginScreen";




import BottomNav from "../components/BottomNav";
import SignUp from "../screens/SignUp";
import MapScreen from "../screens/MapScreen";
import LocationScreen from "../screens/LocationsScreen";






export default function Navigation() {

    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={DefaultTheme}>
            <RootNavigator/>

        </NavigationContainer>
    );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            gestureEnabled: true,
            animation:'slide_from_left',
            animationTypeForReplace: 'push',
        }}>
            <Stack.Screen name="Start" component={StartNavigation} options={{headerShown: false}}/>
            <Stack.Screen name="LocationScreen" component={LocationScreen} options={{headerShown: false}}/>
            <Stack.Screen name="MapScreen" component={MapScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Root" component={BottomNav} options={{headerShown: false}} />
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
            <Stack.Group screenOptions={{presentation: 'modal'}}>
                <Stack.Screen name="Modal" component={ModalScreen}/>
            </Stack.Group>
        </Stack.Navigator>
    );
}

const StartNav = createNativeStackNavigator<StartTabParamList>();

function StartNavigation() {
    return(
    <StartNav.Navigator screenOptions={{
        gestureEnabled:true,
        headerShown:false,
        animation:'slide_from_left',
        animationTypeForReplace: 'push',
    }}>
        <StartNav.Screen  name='StartScreen' component={StartScreen}/>
        <StartNav.Screen name='LoginScreen' component={LoginScreen}/>
        <StartNav.Screen name='SignUp' component={SignUp}/>
    </StartNav.Navigator>
    )
}





/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={30} style={{marginBottom: -3}} {...props} />;
}


