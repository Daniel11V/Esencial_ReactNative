import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native"


function Device({ info }) {
    return (
        <TouchableOpacity style={styles.wrapper} onPress={info.onPress}>
            <View style={styles.wrapperLeft}>
                <Image style={styles.iconLeft} source={info.iconLeft} />
            </View>
            <View style={styles.wrapperName}>
                <Text style={styles.name}>{info.name ? info.name : info.id}</Text>
            </View>
            <Image style={styles.iconRight} source={info.iconRight} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        justifyContent: "space-between"

    },
    wrapperLeft: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderColor: "gray",
        borderWidth: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    iconLeft: {
        width: 20,
        height: 20
    },
    wrapperName: {
        flex: 1,
        justifyContent: "flex-start",
        marginLeft: 15
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        color: "rgba(0,0,0,0.7)"
    },
    iconRight: {

    }
})

export default Device


