import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider,initialWindowMetrics } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {KeyboardAvoidingView, Platform} from "react-native";
import {store} from "./app/store";
import {Provider} from "react-redux";


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
        <Provider store={store}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>

        <Navigation />

        <StatusBar style={ 'dark'} />
      </SafeAreaProvider>
        </Provider>
    );
  }
}
