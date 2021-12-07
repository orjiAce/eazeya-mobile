import React, {useCallback, useMemo, useRef, useState} from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    KeyboardAvoidingView, Platform
} from "react-native";

import {SafeAreaView} from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import {fontPixel, heightPixel, pixelSizeHorizontal, widthPixel} from "../utils/normalize";
import DefaultTextInput from "../components/inputs/DefaultTextInput";

import * as yup from 'yup';
import {useFormik} from "formik";
import {BottomSheetModal} from "@gorhom/bottom-sheet";
import ResetPassword from "../components/form/ResetPassword";

const formSchema = yup.object().shape({
    password: yup.string().required('Password is required'),
    email: yup.string().email().required('Email is is required'),
})


const LoginScreen = ({navigation}: any) => {

    //for reset password form

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);
    // ref
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    // variables
    const snapPoints = useMemo(() => ['2%', '75%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {

        bottomSheetRef.current?.present();


    }, []);


    const [focusEmail, setFocusEmail] = useState<boolean>(false);
    const [contentEmail, setContentEmail] = useState<string>('');


    //hide and show password
    const [togglePass, setTogglePass] = useState(true)


    const [focusPassword, setFocusPassword] = useState<boolean>(false);
    const [contentPassword, setContentPassword] = useState<string>('');


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
            email: '', password: '',
        },
        onSubmit: (values) => {
            const {email, password} = values;
            const userData = new FormData();
            userData.append("email", email);
            userData.append("password", password);

        }
    });

    return (
        <>
            <SafeAreaView style={{
                flex: 1,
                paddingHorizontal: pixelSizeHorizontal(24),
                backgroundColor: '#fff',
                alignItems: 'center'
            }}>
                <ScrollView scrollEnabled
                            showsVerticalScrollIndicator={false}
                            style={{
                                width: '100%'
                            }}
                            contentContainerStyle={{
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                    <View style={
                        {
                            width: '100%',
                            height: 170,
                            alignItems: 'center',
                            justifyContent: "flex-start"
                        }
                    }>


                        <View style={{
                            width: '100%',
                            marginTop: '15%',
                            alignItems: 'flex-start',
                            height: heightPixel(100),
                            justifyContent: 'space-evenly'
                        }}>
                            <Text style={{
                                fontFamily: 'GT-bold',
                                color: '#07070C',
                                fontSize: fontPixel(30)
                            }}>
                                Welcome
                            </Text>

                            <Text style={{
                                fontFamily: 'GT-medium',
                                color: Colors.tintText,
                                fontSize: fontPixel(18)
                            }}>
                                No risk, you only pay when you earn.
                            </Text>
                        </View>


                    </View>


                    <View style={styles.formContainer}>

                        <KeyboardAvoidingView keyboardVerticalOffset={-64} style={styles.inputWrap}
                                              behavior={Platform.OS === "ios" ? "padding" : "height"}>

                            <View style={styles.formWrap}>
                                <DefaultTextInput placeholder="Email" label="Email"
                                                  autoCapitalize='none'
                                                  keyboardAppearance='dark'
                                                  keyboardType='default'
                                                  returnKeyType='next'
                                                  returnKeyLabel='next'
                                                  touched={touched.email}
                                                  error={errors.email}
                                                  onFocus={() => setFocusEmail(true)}
                                                  onChangeText={(e) => {
                                                      handleChange('email')(e);
                                                      setContentEmail(e);
                                                  }}
                                                  onBlur={(e) => {
                                                      handleBlur('email')(e);
                                                      setFocusEmail(false);
                                                  }}
                                                  focus={focusEmail}
                                                  value={contentEmail}
                                />

                            </View>


                            <View style={styles.formWrap}>
                                <DefaultTextInput placeholder="Password" label="Password"
                                                  autoCapitalize='none'
                                                  keyboardAppearance='dark'
                                                  password
                                                  action={() => setTogglePass(!togglePass)}
                                                  secureTextEntry={togglePass}
                                                  keyboardType='default'
                                                  returnKeyType='go'
                                                  returnKeyLabel='go'
                                                  touched={touched.password}
                                                  error={errors.password}
                                                  onFocus={() => setFocusPassword(true)}
                                                  onChangeText={(e) => {
                                                      handleChange('password')(e);
                                                      setContentPassword(e);
                                                  }}
                                                  onBlur={(e) => {
                                                      handleBlur('password')(e);
                                                      setFocusPassword(false);
                                                  }}
                                                  focus={focusPassword}
                                                  value={contentPassword}
                                />

                            </View>
                            <View style={{
                                width: '95%',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                                height: 40
                            }}>
                                <Text onPress={handlePresentModalPress} style={{
                                    fontFamily: 'GT-medium',
                                    color: '#161D4D'
                                }}>
                                    Forgot password?
                                </Text>

                            </View>

                            <View style={[styles.buttonContainer, {
                                backgroundColor: Colors.primaryColor
                            }]}>


                                <TouchableOpacity
                                    onPress={() => {
                                        handleSubmit();
                                    }}

                                    activeOpacity={0.7}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Text style={{
                                        color: 'white',
                                        fontSize: fontPixel(20),
                                        fontFamily: 'GT-bold'
                                    }}> Login
                                    </Text>

                                </TouchableOpacity>
                            </View>

                        </KeyboardAvoidingView>
                    </View>


                    <View style={{
                        marginTop: 55,
                        height: heightPixel(180),
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            width: '90%',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            height: 20
                        }}>


                            <View style={styles.border}/>
                            <Text style={{
                                color: Colors.tintText,
                                fontSize: fontPixel(14),
                                fontFamily: 'GT-medium'
                            }}>
                                or Sign in with Google
                            </Text>
                            <View style={styles.border}/>
                        </View>


                        <TouchableOpacity onPress={() => navigation.navigate('Root')} style={{
                            width: widthPixel(350),
                            height: 60,
                            backgroundColor: '#eee',
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row'
                        }}>
                            <Image
                                source={{uri: 'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png'}}

                                style={{
                                    marginHorizontal: 5,
                                    resizeMode: 'cover',
                                    width: 30,
                                    height: 30
                                }}/>
                            <Text style={{
                                marginHorizontal: 5,
                                color: "#333",
                                fontSize: fontPixel(18),
                                fontFamily: 'GT-medium'
                            }}>
                                Google
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={{
                            width: '90%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}>
                            <Text style={{
                                fontSize: fontPixel(14),
                                fontFamily: 'GT-medium',
                                marginHorizontal: 5,
                                color: "#5A6071"
                            }}>
                                Don’t have an account?
                            </Text>
                            <View style={{
                                padding: 5,
                                backgroundColor: Colors.tintPrimary,
                                borderRadius: 5,
                                marginHorizontal: 5,
                            }}>
                                <Text style={{
                                    fontFamily: 'GT-medium',
                                    fontSize: fontPixel(14),
                                    color: Colors.primaryColor
                                }}>
                                    Sign Up
                                </Text>
                            </View>
                        </TouchableOpacity>

                    </View>


                </ScrollView>

            </SafeAreaView>
            <ResetPassword handleSheetChanges={handleSheetChanges} bottomSheetRef={bottomSheetRef}
                           snapPoints={snapPoints}/>
        </>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        height: heightPixel(350),
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    },
    inputWrap: {
        height: '100%',
        justifyContent: 'space-evenly',
        width: '100%',
        alignItems: 'center',
    },
    formWrap: {
        width: '100%',
    },
    buttonContainer: {
        width: '100%',
        height: heightPixel(64),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    border: {
        width: '25%',
        borderWidth: 1,
        borderColor: "#EEEEEE"
    }
});

export default LoginScreen

