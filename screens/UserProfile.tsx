import React, {memo, useCallback, useEffect, useState} from 'react';

import {
    ActivityIndicator,
    Image,
    ImageBackground,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {fontPixel, pixelSizeHorizontal} from "../utils/normalize";
import TopBar from "../components/view/TopBar";
import {SafeAreaView} from 'react-native-safe-area-context'
import Colors from "../constants/Colors";
import {Feather} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {signOut} from 'firebase/auth';

import {auth, db} from '../firebase';
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage"
import {loginUser, logoutUser, setAuthenticated, setUser, setUserImage} from "../app/slices/userSlice";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import Toast from "../components/Toast";
import {doc, getDoc, updateDoc} from "firebase/firestore";
// update path to your firestore config


const UserProfile = ({navigation}: any) => {
    const dispatch = useAppDispatch();

    const storage = getStorage()

    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [responseState, setResponseState] = useState(false);
    const [responseType, setResponseType] = useState('');

    const user = useAppSelector(state => state.user)
    const {
        userData: {
            email,
            uid,
            emailVerified,
            photoURL,
            firstName,
            lastName
        }
    } = user
    const [warning, setWarning] = useState(false);
    const [uploading, setUploading] = useState(false);

    const requestPermission = useCallback(() => {

        (async () => {
            if (Platform.OS !== "web") {
                const libraryResponse =
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                const photoResponse = await ImagePicker.requestCameraPermissionsAsync();

                if (
                    libraryResponse.status !== "granted" ||
                    photoResponse.status !== "granted"
                ) {
                    setWarning(true)
                    //alert("Sorry, we need camera roll permissions to make this work!");
                }
            }
        })()
    }, [])



    const pickImage = async () => {
        requestPermission()

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });

        if (!result.cancelled) {
            setUploading(true)
            const reference = ref(storage, uid); //how the image will be addressed inside the storage

            //convert image to array of bytes
            const img = await fetch(result.uri);
            const bytes = await img.blob();
            if(bytes.size > 5000000){
                setResponseType('error')
                setResponseState(true)
                setResponseMessage("File too large")
            }
             uploadBytes(reference, bytes).then((uploadRes) =>{
                  const url =getDownloadURL(uploadRes.ref)
                 url.then(url => {
                     const noteRef = doc(db, "users", uid);
                     updateDoc(noteRef, {
                         photoURL: url
                     }).then(r => {
                             //getUser(url);
                         dispatch(setUserImage(url))
                             setResponseType('success')
                             setResponseState(true)
                             setResponseMessage("File uploaded")
                         setUploading(false)
                         }
                     ).catch(err => (
                         console.log(err)
                     ));
                 }
                 )

             });
           //upload images
        }
    };




    useEffect(() => {
        if (responseState || responseMessage) {


            const time = setTimeout(() => {
                setResponseState(false)
                setResponseMessage('')
            }, 3500)
            return () => {
                clearTimeout(time)
            };
        }
    }, [responseState, responseMessage]);

    const goToPage = (link: string) => {
        navigation.navigate(link)
    }


    const logout = () => {
        signOut(auth)
            .then(() => {
                dispatch(logoutUser())
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            paddingHorizontal: pixelSizeHorizontal(24),
            backgroundColor: '#fff',
            alignItems: 'center'

        }}>
            <Toast title={responseType} message={responseMessage} state={responseState} type={responseType}/>

            <ScrollView scrollEnabled

                        showsVerticalScrollIndicator={false}
                        style={{
                            width: '100%'
                        }}
                        contentContainerStyle={{
                            alignItems: 'flex-start',
                            justifyContent: 'center'
                        }}
            >


                <TopBar navigation={navigation} routeName="Dashboard"/>
                <View style={{
                    height: 100,
                    width: '95%',
                    marginLeft: 10,
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
                    width: '100%',
                }}>

                    <TouchableOpacity onPress={pickImage} style={styles.profilePicBtn}>
                                <ImageBackground
                                       accessible={true}
                                       source={{uri: photoURL !== null ? photoURL : 'https://www.minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg'}}
                                       style={{
                                           width: 60,
                                           height: 60,
                                           borderRadius: 100,
                                           alignItems:'center',
                                           justifyContent:'center'
                                       }}>
                                    {
                                        uploading && <ActivityIndicator color={Colors.primaryColor} size="small"/>
                                    }
                                </ImageBackground>

                    </TouchableOpacity>


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
                            {email}
                        </Text>
                        <Text style={{
                            padding: 2,
                            fontFamily: 'GT-medium',
                            color: '#333',
                            fontSize: fontPixel(22)
                        }}>
                            {lastName} {firstName}
                        </Text>

                    </View>


                </View>
                {/*
END Profile image and names
*/}


                <View style={styles.profileButtonsWrap}>
                    {
                        ButtonData.map((({id, icon, title, type, link}) => (

                            <TouchableOpacity onPress={() => goToPage(link)} key={id} style={styles.buttons}>
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
                                        type === 'link' && <Feather name="external-link" size={18} color={"#636363"}/>
                                    }
                                    {
                                        type === 'screen' &&
                                        < Feather name="chevron-right" size={20} color={"#636363"}/>
                                    }
                                </View>
                            </TouchableOpacity>
                        )))
                    }

                </View>

                <TouchableOpacity onPress={logout} style={{
                    width: 130,
                    padding: 10,
                    flexDirection: 'row',
                    height: 50,
                    alignItems: 'center'
                }}>
                    <Feather name="log-out" size={20} color={Colors.primaryColor}/>
                    <Text style={{
                        fontFamily: 'GT-medium',
                        marginLeft: 5,
                        color: Colors.primaryColor
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
        link: "UpdateInfo"
    },
    {
        id: "2",
        title: "Payment method",
        icon: "credit-card",
        type: 'screen',
        link: "AddPayment",
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
    },
    profilePicBtn:{
        width: 60,
        height: 60,
        borderRadius: 100,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#eee'
    }
})

export default memo(UserProfile);
