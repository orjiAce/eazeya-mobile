import {FontAwesome} from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

export default function useCachedResources() {
    const [isLoadingComplete, setLoadingComplete] = React.useState(false);

    // Load any resources or data that we need prior to rendering the app
    React.useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                SplashScreen.preventAutoHideAsync();

                // Load fonts
                await Font.loadAsync({
                    ...FontAwesome.font,
                    'GT-bold': require('../assets/fonts/GTWalsheimPro-Bold.ttf'),
                    'GT-black': require('../assets/fonts/GTWalsheimPro-Black.ttf'),
                    'GT-medium': require('../assets/fonts/GTWalsheimPro-Medium.ttf'),
                    'GT-regular': require('../assets/fonts/GTWalsheimPro-Regular.ttf'),
                    'GT-thin': require('../assets/fonts/GTWalsheimPro-Thin.ttf'),
                    'GT-ultraBold': require('../assets/fonts/GTWalsheimPro-UltraBold.ttf'),
                });
            } catch (e) {
                // We might want to provide this error information to an error reporting service
                console.warn(e);
            } finally {
                setLoadingComplete(true);
                SplashScreen.hideAsync();
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    return isLoadingComplete;
}
