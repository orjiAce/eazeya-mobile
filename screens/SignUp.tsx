import React, {useRef, useState} from 'react';

import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import * as yup from 'yup';
import {useFormik} from "formik";
import {fontPixel, heightPixel, pixelSizeHorizontal, widthPixel} from "../utils/normalize";
import {SafeAreaView} from "react-native-safe-area-context";
import DefaultTextInput from "../components/inputs/DefaultTextInput";
import Colors from "../constants/Colors";
import PhoneInput from "react-native-phone-number-input";


const formSchema = yup.object().shape({
    password: yup.string().required('Password is required'),
    lastName: yup.string().required('Last name is required'),
    firstName: yup.string().required('First name is required'),
    email: yup.string().email().required('Email is is required'),
})


const SignUp = ({navigation}:any) => {

    const [focusEmail, setFocusEmail] = useState<boolean>(false);
    const [contentEmail, setContentEmail] = useState<string>('');


    //hide and show password
    const [togglePass, setTogglePass] = useState(true)


    const [focusPassword, setFocusPassword] = useState<boolean>(false);
    const [contentPassword, setContentPassword] = useState<string>('');


    const [focusFirstName, setFocusFirstName] = useState<boolean>(false);
    const [contentFirstName, setContentFirstName] = useState<string>('');

    const [focusLastName, setFocusLastName] = useState<boolean>(false);
    const [contentLastName, setContentLastName] = useState<string>('');


    const [focusPhone, setFocusPhone] = useState<boolean>(false);
    const [contentPhone, setContentPhone] = useState<string>('');


    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef<PhoneInput>(null);
    const [phoneNumberError, setPhoneNumberError] = useState('Phone number is invalid');


    const checkNumber = () => {
        const checkValid = phoneInput.current?.isValidNumber(value);
        setShowMessage(true);
        setValid(checkValid ? checkValid : false);
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
            email: '', password: '', firstName: '', lastName: '', phone: ''
        },
        onSubmit: (values) => {
            const {email, password, lastName, firstName, phone} = values;
            const userData = new FormData();
            userData.append("email", email);
            userData.append("password", password);

        }
    });

    return (
        <SafeAreaView style={{
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
                        alignItems: 'flex-start',
                        justifyContent: "center"
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
                            fontSize: fontPixel(20)
                        }}>
                            Create account
                        </Text>

                        <Text style={{
                            fontFamily: 'GT-medium',
                            color: Colors.tintText,
                            fontSize: fontPixel(18)
                        }}>
                            Pickup and delivery safe and on time
                        </Text>
                    </View>

                </View>

                    <KeyboardAvoidingView keyboardVerticalOffset={-64} style={styles.inputWrap}
                                          behavior={Platform.OS === "ios" ? "padding" : "height"}>

                        <DefaultTextInput
                            placeholder="FirstName" label="First Name"
                            autoCapitalize='none'
                            keyboardAppearance='dark'
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
                            focus={focusFirstName}
                            value={contentFirstName}
                        />


                        <DefaultTextInput
                            placeholder="Last Name" label="Last Name"
                            autoCapitalize='none'
                            keyboardAppearance='dark'
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
                            focus={focusLastName}
                            value={contentLastName}
                        />


                        <DefaultTextInput placeholder="Email" label="Email"
                                          autoCapitalize='none'
                                          keyboardAppearance='dark'
                                          keyboardType='email-address'
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

                        <View style={{
                            width: '100%',
                            justifyContent: "flex-start",

                        }}>
                            <Text style={[{
                                color: '#333'
                            },
                                styles.label]}>
                                Phone Number
                            </Text>
                            <PhoneInput
                                containerStyle={{
                                    borderRadius: 10,
                                    borderColor: '#ddd',
                                    width: '100%',
                                    height: 60,
                                    marginTop: 8,
                                    marginBottom: 5,
                                    borderWidth: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor:'#fff'
                                }}
                                ref={phoneInput}
                                defaultValue={value}
                                defaultCode="NG"
                                layout="first"
                                onChangeText={(text) => {
                                    setValue(text);
                                    checkNumber()
                                }}
                                onChangeFormattedText={(text) => {
                                    setFormattedValue(text);

                                }}
                               // withDarkTheme
                                //autoFocus
                            />
                            <View style={{
                                paddingBottom: 20,
                                justifyContent: 'flex-start',
                            }}>
                                {
                                    valid && <Text style={styles.errorMessage}>{phoneNumberError}</Text>
                                }
                            </View>

                        </View>


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

                        <TouchableOpacity
                            onPress={() => {
                                handleSubmit();
                            }}

                            activeOpacity={0.7}
                            style={{
                                borderRadius: 10,
                                backgroundColor:Colors.primaryColor,
                                width: widthPixel(350),
                                height: 60,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Text style={{
                                color: 'white',
                                fontSize: fontPixel(20),
                                fontFamily: 'GT-bold'
                            }}> Creat account
                            </Text>

                        </TouchableOpacity>

                    </KeyboardAvoidingView>


                <View style={{
                    width: '90%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    height: 20,
                    marginTop:40
                }}>


                    <View style={styles.border}/>
                    <Text style={{
                        color: Colors.tintText,
                        fontSize: fontPixel(14),
                        fontFamily: 'GT-medium'
                    }}>
                        or Sign up with Google
                    </Text>
                    <View style={styles.border}/>
                </View>


                <TouchableOpacity onPress={() => navigation.navigate('Root')} style={{
                    width: widthPixel(350),
                    marginTop:20,
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


                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={{
                    width: '90%',
                    marginTop:50,
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
                        Already have an account?
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
                            Login
                        </Text>
                    </View>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    formContainer: {
     flex:1,
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
    },
    inputWrap: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    label: {
        marginLeft: 10,
        fontSize: fontPixel(14),
        fontFamily: 'GT-bold',
    },
    errorMessage: {
        position: 'absolute',
        right: 10,
        lineHeight: 15,
        fontSize: fontPixel(10),
        color: Colors.errorRed,
        textTransform: 'capitalize',
        fontFamily: 'GT-bold',
    },
    border: {
        width: '25%',
        borderWidth: 1,
        borderColor: "#EEEEEE"
    }
})

export default SignUp;
