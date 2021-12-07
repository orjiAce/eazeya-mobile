import React from 'react';

import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {fontPixel, pixelSizeHorizontal} from "../utils/normalize";
import TopBar from "../components/view/TopBar";
import {SafeAreaView} from 'react-native-safe-area-context'
import Colors from "../constants/Colors";
import {Feather} from "@expo/vector-icons";

const UserProfile = ({navigation}: any) => {
    return (
        <SafeAreaView style={{

            paddingHorizontal: pixelSizeHorizontal(24),
            backgroundColor: '#fff',

        }}>
            <ScrollView scrollEnabled

                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{

                            width: '100%',
                            backgroundColor: '#fff',
                        }}
            >


                <TopBar navigation={navigation} routeName="Dashboard"/>
                <View style={{
                    height: 100,
                    width: '95%',
                    marginLeft:10,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'flex-start'
                }}>

                    <Text style={{
                        fontSize: fontPixel(26),
                        fontFamily: 'GT-bold',
                        color: '#1b1b1b'
                    }}>
                        Account
                    </Text>

                </View>

                {/*
Start Profile image and names
*/}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 130,
                    width: '100%'
                }}>

                    <View style={{
                        width: 60,
                        height: 60,
                        borderRadius: 100,
                        backgroundColor: Colors.orange
                    }}>

                    </View>

                    <View style={{
                        marginLeft: 10,
                        height: '100%',
                        width: '90%',
                        alignItems: 'flex-start',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            padding: 2,
                            color: Colors.tintText,
                            fontFamily: 'GT-medium',
                            fontSize: fontPixel(14)
                        }}>
                            mark@gmail.com
                        </Text>
                        <Text style={{
                            padding: 2,
                            fontFamily: 'GT-medium',
                            color: '#333',
                            fontSize: fontPixel(22)
                        }}>
                            Ace mark
                        </Text>

                    </View>


                </View>
                {/*
END Profile image and names
*/}


                <View style={styles.profileButtonsWrap}>
                    {
                        ButtonData.map((({id, icon, title,type}) => (

                            <TouchableOpacity key={id} style={styles.buttons}>
                                <View style={styles.left}>
                                    <Feather name={icon} size={24} color={"#333"}/>
                                    <Text style={{
                                        fontFamily: 'GT-regular',
                                        marginLeft: 15,
                                        color: "#1E1E20",
                                        fontSize: fontPixel(18)
                                    }}>
                                        {title}
                                    </Text>
                                </View>
                                <View>
                                    {
                                        type === 'link' && <Feather name="external-link" size={18} color={"#636363"} />
                                    }
                                    {
                                        type === 'screen' && < Feather name="chevron-right" size={20} color={"#636363"}/>
                                    }
                                </View>
                            </TouchableOpacity>
                        )))
                    }

                </View>

                <TouchableOpacity style={{
                    width:130,
                    padding:10,
                    flexDirection:'row',
                    height:50,
                    alignItems:'center'
                }}>
                    <Feather name="log-out" size={20} color={Colors.primaryColor} />
                    <Text style={{
                        fontFamily:'GT-medium',
                        marginLeft:5,
                        color:Colors.primaryColor
                    }}>
                        Sign out
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};


const ButtonData = [
    {
        id: "1",
        title: "Personal data",
        icon: "user",
        type: 'screen',
        link: "setting"
    },
    {
        id: "2",
        title: "Payment method",
        icon: "credit-card",
        type: 'screen',
        link: "PaymentMethod",
    },
    {
        id: "3",
        title: "Favourite pickup address",
        icon: "map-pin",
        type: 'screen',
        link: "PickupAdd"
    },
    {
        id: "4",
        title: "Offers",
        icon: "gift",
        type: 'screen',
        link: "Offers"
    },
    {
        id: "5",
        title: "Privacy and terms",
        icon: "info",
        type: 'link',
        link: "/"
    },
]

const styles = StyleSheet.create({
    profileButtonsWrap: {
        width: '100%',
        height: 400,
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
    },
    buttons: {
        width: '100%',
        padding: 10,
        height: '15%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    left: {
        width: '80%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    }
})

export default UserProfile;
