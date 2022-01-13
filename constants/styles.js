import { StyleSheet } from "react-native";
import { COLORS } from "./colors";

export const STYLES = StyleSheet.create({
    screenContainer: {
        paddingHorizontal: 20,
        paddingTop: 15,
        width: "100%",
        minHeight: "100%",
        backgroundColor: COLORS.backgroundScreen,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: 'rgba(0, 0, 0, 0.7)',
        marginBottom: 10,
    },
    bigTitle: {
        fontSize: 28,
        fontWeight: "bold",
        color: 'rgba(0, 0, 0, 0.8)',
    },
    smalltitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: 'rgba(0, 0, 0, 0.7)',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: 'rgba(0, 0, 0, 0.6)',
        marginTop: 20,
        marginBottom: 5,
    },
    userEmail: {
        fontSize: 13,
        color: "rgba(0, 0, 0, 0.6)",
    },
    userName: {
        fontSize: 17,
        color: 'rgba(0, 0, 0, 0.8)',
    },
    normalText: {
        fontSize: 15,
        color: 'rgba(0, 0, 0, 0.6)',
    },
    normalText2: {
        fontSize: 18,
        color: 'rgba(0, 0, 0, 0.6)',
    },
    bigText: {
        fontSize: 20,
        color: 'rgba(0, 0, 0, 0.6)',
    },
    boxesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    roundedItem: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: 12,
        backgroundColor: COLORS.backgroundItem,
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 3,
        borderColor: COLORS.backgroundItem,
    },
    roundedItemMiddle: {
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: COLORS.backgroundItem,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: COLORS.backgroundItem,

        // Middle
        width: "49%",
        flexGrow: 0,
    },
    btnPrimary: {
        //BoxRounded
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,

        // btnStyle
        borderColor: COLORS.primary,
        backgroundColor: COLORS.primary,
    },
    btnPrimaryText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: "bold",
    },
    btnSecondary: {
        //BoxRounded
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,

        // btnStyle
        borderColor: COLORS.primary,
        backgroundColor: "#fff",
    },
    btnSecondaryMiddle: {
        //BoxRounded
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,

        // btnStyle
        borderColor: COLORS.primary,
        backgroundColor: "#fff",

        // Middle
        width: "49%",
        flexGrow: 0,
    },
    btnSecondaryText: {
        color: COLORS.primary,
        fontSize: 16,
        fontWeight: "bold",
    },
    btnThirdText: {
        fontSize: 15,
        fontWeight: "bold",
        borderBottomWidth: 1,
        borderBottomColor: COLORS.primary,
        color: COLORS.primary,
        alignSelf: 'center',
    },
    actionBoxFixed: {
        position: 'absolute',
        bottom: 0,
        height: 75,
        width: '100%',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: "#fff",
    },
    tinyBankImg: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginRight: 10,
        backgroundColor: '#fff'
    },
    titleBankImg: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginRight: 10,
        backgroundColor: '#fff'
    },
    tinyParticipantImg: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginRight: 10,
        backgroundColor: '#fff'
    },
    flatListSetup: {
        flexGrow: 0,
    },
    textInput: {
        marginTop: 30,
        marginBottom: 10,
        paddingLeft: 8,
        paddingBottom: 18,
        fontSize: 20,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.primary,
    },
    pickerInput: {
        marginTop: 15,
        marginBottom: 10,
        minHeight: 65,
        fontSize: 20,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.primary,
    },
    middle: {
        width: '45%',
    },
    incompleteInput: {
        color: COLORS.deleteRed,
        fontStyle: "italic",
        fontSize: 15,
    },
    invisible: {
        display: "none",
        opacity: 0,
    },
    modal: {
        backgroundColor: COLORS.tinyGray,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
});
