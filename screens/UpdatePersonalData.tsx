import React, {useCallback, memo,useEffect, useState} from 'react';

import {
    ActivityIndicator,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet, Text,
    TouchableOpacity
} from 'react-native';
import TopNav from "../components/TopNav";
import {fontPixel, pixelSizeHorizontal, pixelSizeVertical} from "../utils/normalize";
import {SafeAreaView} from 'react-native-safe-area-context'
import Colors from "../constants/Colors";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import * as ImagePicker from "expo-image-picker";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../firebase";
import {setUserImage, updateInfo} from "../app/slices/userSlice";
import DefaultTextInput from "../components/inputs/DefaultTextInput";
import {useFormik} from "formik";
import * as yup from "yup";
import Toast from "../components/Toast";

const phoneRegExp = /^[+]?\d*$/


const formSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    phone: yup.string()
        .matches(phoneRegExp, 'Wrong input')
        .min(2, "Phone number is Too short")
        .required("Phone number is required"),
})

const UpdatePersonalData = ({navigation}: any) => {


    const dispatch = useAppDispatch();
    const storage = getStorage()
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [responseState, setResponseState] = useState(false);
    const [responseType, setResponseType] = useState('');

    const user = useAppSelector(state => state.user)
    const {
        userData: {
            uid,
            emailVerified,
            photoURL,
            firstName,
            lastName,
            phone
        }
    } = user


    const [contentFirstName, setContentFirstName] = useState<string>(firstName);
    const [focusFirstName, setFocusFirstName] = useState<boolean>(false);

    const [contentLastName, setContentLastName] = useState<string>(lastName);
    const [focusLastName, setFocusLastName] = useState<boolean>(false);

    const [contentPhone, setContentPhone] = useState<number>(phone);
    const [focusPhone, setFocusPhone] = useState<boolean>(false);


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
            if (bytes.size > 5000000) {
                setResponseType('error')
                setResponseState(true)
                setResponseMessage("File too large")
            }
            uploadBytes(reference, bytes).then((uploadRes) => {
                const url = getDownloadURL(uploadRes.ref)
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


    const updateProfile = (phone:number,lastName:string, firstName:string) => {
        setLoading(true)
        const noteRef = doc(db, "users", uid);
        updateDoc(noteRef, {
            phone: phone,
            lastName:lastName,
            firstName:firstName
        }).then(r => {

                dispatch(updateInfo({
                    phone: phone,
                    lastName:lastName,
                    firstName:firstName
                }))
                setResponseType('success')
                setResponseState(true)
                setResponseMessage("Profile updated")
                setLoading(false)
            }
        ).catch(err => {
            setResponseType('error')
            setResponseState(true)
            setResponseMessage("Error:" +err)
            setLoading(false)
            console.log(err)
        });
    }


    const {
        handleChange, handleSubmit, handleBlur,
        setFieldValue,
        values,
        errors,
        touched,
        isValid
    } = useFormik({
        validationSchema: formSchema,
        initialValues: {
            firstName: contentFirstName, lastName: contentLastName, phone: contentPhone
        },
        onSubmit: (values) => {
            const {firstName, lastName, phone} = values;

            updateProfile(phone,lastName,firstName)
        }
    });


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


    return (
        <SafeAreaView style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: '#fff',
        }}>

            <TopNav title={"Update profile"} navigation={navigation}/>
            <Toast title={responseType} message={responseMessage} state={responseState} type={responseType}/>

            <ScrollView scrollEnabled
                        showsVerticalScrollIndicator={false}
                        style={{
                            width: '100%',
                            paddingHorizontal: pixelSizeHorizontal(24),
                        }}
                        contentContainerStyle={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>

                <TouchableOpacity onPress={pickImage} style={styles.profilePicBtn}>
                    <ImageBackground
                        accessible={true}
                        source={{uri: photoURL !== null ? photoURL : 'https://www.minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg'}}
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: 100,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        {
                            uploading && <ActivityIndicator color={Colors.primaryColor} size="small"/>
                        }
                    </ImageBackground>

                </TouchableOpacity>

                <KeyboardAvoidingView keyboardVerticalOffset={-64} style={styles.inputWrap}
                                      behavior={Platform.OS === "ios" ? "padding" : "height"}>


                    <DefaultTextInput placeholder="First Name" label="First Name"
                                      autoCapitalize='none'
                                      keyboardType='default'
                                      returnKeyType='next'
                                      returnKeyLabel='next'
                                      touched={touched.firstName}
                                      error={errors.firstName}
                                      onFocus={() => setFocusFirstName(true)}
                                      onChangeText={(e) => {
                                          handleChange('firstName')(e);
                                          setContentFirstName(e);
                                      }}
                                      onBlur={(e) => {
                                          handleBlur('firstName')(e);
                                          setFocusFirstName(false);
                                      }}
                                      defaultValue={contentFirstName}
                                      focus={focusFirstName}
                                      value={values.firstName}
                    />

                    <DefaultTextInput placeholder="Last Name" label="Last Name"
                                      autoCapitalize='none'
                                      keyboardType='default'
                                      returnKeyType='next'
                                      returnKeyLabel='next'
                                      touched={touched.lastName}
                                      error={errors.lastName}
                                      onFocus={() => setFocusLastName(true)}
                                      onChangeText={(e) => {
                                          handleChange('lastName')(e);
                                          setContentLastName(e);
                                      }}
                                      onBlur={(e) => {
                                          handleBlur('lastName')(e);
                                          setFocusLastName(false);
                                      }}
                                      defaultValue={contentLastName}
                                      focus={focusLastName}
                                      value={contentLastName}
                    />

                    <DefaultTextInput placeholder="Phone" label="Phone number"
                                      autoCapitalize='none'
                                      keyboardType='number-pad'
                                      returnKeyType='go'
                                      returnKeyLabel='Done'
                                      touched={touched.phone}
                                      error={errors.phone}
                                      onFocus={() => setFocusPhone(true)}
                                      onChangeText={(e) => {
                                          handleChange('phone')(e);
                                          setContentPhone(e);
                                      }}
                                      onBlur={(e) => {
                                          handleBlur('phone')(e);
                                          setFocusPhone(false);
                                      }}
                                      defaultValue={contentPhone}
                                      focus={focusPhone}
                                      value={values.phone}
                    />

                    <TouchableOpacity onPress={() => handleSubmit()} disabled={!isValid || loading}
                                      style={[styles.submitBtn, {
                                          backgroundColor: !isValid ? "#ddd" : Colors.primaryColor,
                                      }]}>


                        {
                            loading ? <ActivityIndicator color={Colors.light.background} size={"large"}/>
                                :
                                <Text style={styles.btnText}>
                                  Submit
                                </Text>
                        }
                    </TouchableOpacity>


                </KeyboardAvoidingView>


            </ScrollView>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    inputWrap: {
        width: '100%',
        alignItems: 'center',
    },
    profilePicBtn: {
        marginVertical: pixelSizeVertical(20),
        width: 80,
        height: 80,
        borderRadius: 100,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#eee'
    },
    submitBtn: {
        borderRadius: 10,
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',

    },
    btnText: {
        fontFamily: 'GT-bold',
        color: "#fff",
        fontSize: fontPixel(18)
    }
})

export default memo(UpdatePersonalData);
