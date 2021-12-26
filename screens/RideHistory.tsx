import * as React from 'react';
import {Dimensions, ImageBackground, ScrollView, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {SafeAreaView} from "react-native-safe-area-context";
import {fontPixel, pixelSizeHorizontal, pixelSizeVertical} from "../utils/normalize";
import SegmentedControl from 'rn-segmented-control';
import Colors from "../constants/Colors";


export default function RideHistory() {


    const [tabIndex, setTabIndex] = React.useState(0);
    const handleTabsChange = (index: number) => {
        setTabIndex(index);
    };
  return (
      <SafeAreaView style={{
        flex: 1,
alignItems:'center',
        backgroundColor: '#fff',
      }}>
          <ImageBackground resizeMethod="scale" resizeMode="cover" source={require('../assets/images/Topography2.png')} style={{
              width:'100%',
              height:100,
              alignItems:'center',
              justifyContent:'center',
              backgroundColor:'#1B1B1B'
          }}>
              <Text style={{
                  fontFamily:'GT-bold',
                  fontSize:fontPixel(20),
                  color:'#fff'
              }}>
                  Ride history
              </Text>
          </ImageBackground>

          <View style={{
              width:'100%',
              height:100,
              alignItems:'center',
              justifyContent:'center',
              backgroundColor:Colors.tintPrimary
          }}>


          <SegmentedControl
              tabs={['Completed', 'Canceled', 'In progress']}
              currentIndex={tabIndex}
              onChange={handleTabsChange}
              segmentedControlBackgroundColor={Colors.tintPrimary}
              activeSegmentBackgroundColor={Colors.primaryColor}
              activeTextColor='white'
              textColor='black'
              activeTextWeight={"600"}
              paddingVertical={10}
              width={Dimensions.get('screen').width - 20}
              containerStyle={{
                  marginVertical: pixelSizeVertical(20),
                  backgroundColor:Colors.tintPrimary,
                  height:50,
              }}

              textStyle={{
                  fontSize:fontPixel(16),
                fontFamily:'GT-medium'
              }}
          />
          </View>

        <ScrollView scrollEnabled

                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: pixelSizeHorizontal(24),
                      alignItems: 'center',
                      width:'100%',
                      backgroundColor: '#fff',
                    }}
        >






    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>

    </View>
        </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
