import React, {useState} from 'react';

import {ScrollView, Text, TextInput as RNTextInput, StyleSheet, View, TouchableOpacity} from 'react-native';

import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel} from "../utils/normalize";

import {SafeAreaView} from 'react-native-safe-area-context'
import TopNav from "../components/TopNav";
import {CardNumberTextInput, CardDateTextInput} from "rn-credit-card-textinput";
import Colors from "../constants/Colors";
import * as yup from "yup";
import {useFormik} from "formik";


const formSchema = yup.object().shape({
    cardNumber: yup.string().required('Card number is required'),
    cardDate: yup.string().email().required('Card is required'),
})


const AddPayment = ({navigation}: any) => {

    const [cardNumValue, setCardNumValue] = useState('');
    const [focusCardNum, setFocusCardNum] = useState<boolean>(false);

    const [cardDateValue, setCardDateValue] = useState('');
    const [focusCardDateNum, setFocusCardDateNum] = useState<boolean>(false);

    const [cardCodeValue, setCardCodeValue] = useState('');
    const [focusCardCodeNum, setFocusCardCodeNum] = useState<boolean>(false);


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
            cardDate: cardDateValue, cardNum: cardNumValue, cardCode: '',
        },
        onSubmit: (values) => {
            const {cardCode, cardDate} = values;

        }
    });

    const updateCardNum = (number: string) => {
        setCardNumValue(number)
        setFieldValue('cardNum', number)
    }
    const updateCardDate = (cardDate: string) => {
        setCardDateValue(cardDate)
        setFieldValue('cardDate', cardDate)
    }
    const updateCardCode = (code: string) => {
        setCardCodeValue(code)
        setFieldValue('cardCode', code)
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            paddingHorizontal: pixelSizeHorizontal(24),
            backgroundColor: '#fff',
        }}>
            <TopNav title={"Add payment"} navigation={navigation}/>
            <ScrollView scrollEnabled

                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.container}>

                <View style={{
                    marginTop: 50,
                    height: heightPixel(500),
                    width: '100%',
                    alignItems: 'center'
                }}>

                    <CardNumberTextInput
                        error={errors.cardNum}
                        autoFocus={true}

                        focus={focusCardNum}
                        onFocus={() => setFocusCardNum(true)}
                        labelStyle={{
                            fontFamily: 'GT-medium'
                        }}
                        touched={touched.cardNum}
                        onBlur={(e) => {
                            handleBlur('cardNum')(e);
                            setFocusCardNum(false);
                        }}
                        label="Card number"
                        errorColor={Colors.errorRed}
                        defaultBorderColor={"#ddd"}
                        inputWrapStyle={styles.cardInput}
                        inputStyle={{
                            fontFamily: 'GT-medium',
                            color: '#333'
                        }}
                        defaultValue={cardNumValue}
                        value={values.cardNum}
                        focusColor={Colors.success}
                        placeholder={"Credit card"}
                        updateTextVal={(text) => {
                            updateCardNum(text)
                        }}/>

                    <View style={styles.bottom}>
                        <CardDateTextInput
                            updateCardDateText={(text) => {
                                updateCardDate(text)
                            }}
                            focus={focusCardDateNum}
                            focusColor={Colors.success}
                            touched={touched.cardDate}
                            onBlur={(e) => {
                                handleBlur('cardDate')(e);
                                setFocusCardDateNum(false);
                            }}
                            onFocus={() => setFocusCardDateNum(true)}
                            labelStyle={{
                                fontFamily: 'GT-medium'
                            }}
                            label="Expiry date"
                            errorColor={Colors.errorRed}
                            defaultBorderColor={"#ddd"}
                            inputWrapStyle={styles.cardDateInput}
                            inputStyle={{
                                fontFamily: 'GT-medium',
                                color: '#333'
                            }}

                            placeholder="MM/YY"
                            value={values.cardDate}
                            defaultValue={cardDateValue}/>

                        <View style={styles.codeWrap}>
                            <Text style={styles.label}>
                                Secure code
                            </Text>
                            <RNTextInput defaultValue={cardCodeValue}
                                         value={values.cardCode}
                                         onChangeText={text => {
                                             updateCardCode(text)
                                         }}
                                         placeholder="CVC 2 code"
                                         maxLength={3}
                                         keyboardType="number-pad"
                                         style={[styles.cardCodeInput, {}]}/>
                        </View>


                    </View>

                    <Text style={[styles.noticeTxt, {color: Colors.tintText}]}>
                        You may be charged a small fee to confirm your card details
                    </Text>

                    <TouchableOpacity style={styles.submitBtn}>

                        <Text style={styles.btnText}>
                            Add card
                        </Text>
                    </TouchableOpacity>

                </View>


            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    cardInput: {
        width: '100%',
        marginTop: 8,
        padding: 10,
        borderRadius: 10,
        borderWidth: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'GT-medium'
    },
    cardDateInput: {
        width: widthPixel(170),
        borderRadius: 10,
        borderWidth: 2,
        height: 60,
        fontFamily: 'GT-medium',
        padding: 10,
    },
    cardCodeInput: {
        width: '100%',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#ddd",
        height: 60,
        fontFamily: 'GT-medium',
        padding: 10,
    },
    bottom: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',

        flexDirection: 'row'

    },
    container: {
        width: '100%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    submitBtn: {
        borderRadius: 10,
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
    },
    noticeTxt: {
        fontFamily: 'GT-medium',
        fontSize: fontPixel(14),
        marginVertical: pixelSizeVertical(10)
    },
    label: {
        textTransform: 'capitalize',
        marginLeft: 10,
        fontFamily: 'GT-medium',
        marginBottom: 10,
    },
    codeWrap: {
        width: '45%',
        alignItems: 'flex-start',
        height: '100%',
        justifyContent: 'flex-start'
    },
    errorMessage: {
        position: 'absolute',
        right: 10,
        lineHeight: 15,
        fontSize: fontPixel(10),
        textTransform: 'capitalize',
    },
    btnText: {
        fontFamily: 'GT-bold',
        color: "#fff",
        fontSize: fontPixel(18)
    }
})

export default AddPayment;
