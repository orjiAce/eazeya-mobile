import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider,initialWindowMetrics } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {store,persistor} from "./app/store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <Navigation />

        <StatusBar style={ 'dark'} />
      </SafeAreaProvider>
          </PersistGate>
        </Provider>
    );
  }
}
