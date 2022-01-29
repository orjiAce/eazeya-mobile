import {Text, TextInputProps, TextInput as RNTextInput, StyleSheet, View, TouchableOpacity} from "react-native";
import React, {FC} from "react";

import Colors from "../../constants/Colors";
import {fontPixel} from "../../utils/normalize";
import {Ionicons} from "@expo/vector-icons";
import {CardDateTextInput} from "rn-credit-card-textinput";

interface Props extends TextInputProps {
    placeholder: string;
    error?: string;
    label: string;
    touched?: boolean;
    password?: boolean;
    focus: boolean;
    value: string;
    action?: any;
    passState?: boolean
}


const BottomSheetInput: FC<Props> = ({
                                         label,
                                         password,
                                         placeholder,
                                         error,
                                         touched,
                                         focus,
                                         value,
                                         action,
                                         passState,
                                         ...props
                                     }) => {


    let validationColor = !touched ? '#ddd' : error ? '#FF5A5F' : focus ? Colors.success : '#ddd'

    return (
        <View style={{
            width: '100%',
            justifyContent: "flex-start",

        }}>
            <Text style={[{
                color: '#333'
            },
                styles.label]}>
                {label}
            </Text>
            <View style={{
                borderColor: validationColor,
                width: '100%',
                height: 60,
                marginTop: 8,
                marginBottom: 5,
                borderRadius: 10,
                borderWidth: 2,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }}>

                <RNTextInput
                    {...props}
                    placeholder={placeholder}

                    placeholderTextColor="#6D6D6D"
                    style={[styles.input, {
                        //  backgroundColor:  'rgba(151, 151, 151, 0.25)',
                        width: password ? '90%' : '100%',
                        color: '#131313',
                        alignItems: 'center'
                    }]}/>
                {
                    password
                    &&
                    <TouchableOpacity onPress={action} style={{
                        height: '100%',
                        width: '10%',
                        alignItems: 'center',
                        justifyContent: "center"
                    }}>
                        {
                            passState ? <Ionicons name="md-eye" size={18} color="#C4C4C4"/>
                                : <Ionicons name="md-eye-off" size={18} color="#C4C4C4"/>
                        }

                    </TouchableOpacity>

                }
            </View>
            <View style={{
                paddingBottom: 20,
                justifyContent: 'flex-start',

            }}>
                {error && touched &&
                    <Text style={styles.errorMessage}>{error}</Text>
                }
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    input: {

        fontSize: fontPixel(14),
        lineHeight: 20,
        padding: 10,
        fontFamily: 'GT-medium',
        height: '100%',
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


})

export default BottomSheetInput
