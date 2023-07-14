import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        marginBottom: 32,
        display: "flex",
        flexDirection: "row",
        gap: 8,
    },
    imageContainer:{
        backgroundColor: '#F6F6F6',
        width: 60,
        height: 60,
        borderRadius: 16,
        position:'relative',
    },
    imageAdd: {
        position:'absolute',
        height: 20,
        width: 20,
        bottom: 0,
        left: 45,
    },
})