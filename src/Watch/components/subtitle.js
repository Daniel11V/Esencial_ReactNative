import React from "react"
import { View, Text, Switch, StyleSheet } from "react-native"

function Subtitle(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.line} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginVertical: 15,
        alignItems: "center"
    },
    title: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: "bold",
        color: "gray"
    },
    line: {
        borderBottomWidth: 1,
        marginLeft: 5,
        flex: 1,
        marginTop: 3,
        borderColor: "#eceff1"
    }
})
export default Subtitle