import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Text, StyleSheet, Platform, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import BottomSheet, {
    BottomSheetTextInput,
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetModalProvider
} from '@gorhom/bottom-sheet';
import ModalBorderTextInput from "../inputs/SheetInput";

import * as Yup from "yup";
import {useFormik} from "formik";
import Colors from "../../constants/Colors";
import {fontPixel, pixelSizeVertical} from "../../utils/normalize";
import DefaultTextInput from "../inputs/DefaultTextInput";
import SheetInput from "../inputs/SheetInput";


const schema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
});

const ResetPassword = ({snapPoints, bottomSheetRef, handleSheetChanges}: any) => {
    // callbacks


    const {
        handleChange, handleSubmit, handleBlur,
        values,
        isValid,
        errors,
        touched,
        resetForm
    } = useFormik({
        validationSchema: schema,
        initialValues: {
            email: '', password: '',
        },
        onSubmit: (values) => {
            const {email} = values;
            const data = JSON.stringify({
                "email": email,
            });

            resetForm()
        }
    });

    const [focusEmail, setFocusEmail] = useState<boolean>(false);
    const [contentEmail, setContentEmail] = useState<string>('');


    // renders
    return (
        <BottomSheetModalProvider>
            <KeyboardAvoidingView style={styles.container}
                                  behavior={Platform.OS === "ios" ? "padding" : "height"}>

                <BottomSheetModal
                    keyboardBlurBehavior="restore"
                    detached={true}
                    enableContentPanningGesture
                    enableOverDrag
                    enablePanDownToClose={true}
                    backdropComponent={BottomSheetBackdrop}
                    ref={bottomSheetRef}
                    index={1}
                    snapPoints={snapPoints}
                    keyboardBehavior="fillParent"
                    onChange={handleSheetChanges}
                >
                    <View style={styles.contentContainer}>
                        <Text style={{
                            marginVertical:pixelSizeVertical(15),
                            fontFamily:'GT-medium',
                            fontSize:fontPixel(16),
                            color:'#333'
                        }}>
                            Input your email address below to get a reset link
                        </Text>
                        {/*
                        INPUT HERE
                        */}


                            <SheetInput placeholder="Email" label="Email"
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



                        <View style={{
                            width: '100%',
                            height:60,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginVertical: 12
                        }}>




                                <TouchableOpacity disabled={!isValid} onPress={()=>handleSubmit()} style={[{
                                    backgroundColor: Colors.primaryColor,
                                }, styles.loginBtn]}>
                                    <Text style={{
                                        color: '#fff',
                                        fontFamily: 'GT-bold',
                                        fontSize: fontPixel(14)
                                    }}>
                                  Submit
                                    </Text>
                                </TouchableOpacity>




                        </View>
                    </View>
                </BottomSheetModal>

            </KeyboardAvoidingView>
        </BottomSheetModalProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'grey',
    },
    contentContainer: {
        width: '100%',
        padding: 20,
        alignItems: 'center',
    },
    input: {
        marginTop: 8,
        marginBottom: 10,
        borderRadius: 10,
        fontSize: 16,
        lineHeight: 20,
        padding: 8,
        backgroundColor: 'rgba(151, 151, 151, 0.25)',
    },
    loginBtn:{
        width: '80%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    }

});

export default ResetPassword;
