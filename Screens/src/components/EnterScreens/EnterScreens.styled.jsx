import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerBackground: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
      },
    container: {
    position: 'relative',
      backgroundColor: '#fff',
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
    },
    image: {
        flex: 1,
        justifyContent: 'flex-end',
      },
    imageContainer:{
        position: 'absolute',
        left: 128,
        top: -60,
        backgroundColor: '#F6F6F6',
        width: 120,
        height: 120,
        borderRadius: 16,
    },
    imageAdd: {
        position:'absolute',
        top: 21,
        right: 130,
    },
    text:{
        color: '#212121',
        fontWeight: 500,
        fontSize: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 32,
    },
    input:{
        width: 343,
        height: 50,
        marginBottom: 16,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderWidth: 1,
        padding: 16,
        backgroundColor: '#F6F6F6',
        borderColor: '#E8E8E8',
        borderRadius: 8,
    },
    inputFocused: {
      borderColor: '#FF6C00',
    },
    textAccent:{
        position: 'absolute',
        right: 35,
        top: 16,
        color: '#1B4371',
    },
    inputPassword:{
        position: 'relative',
        marginBottom: 16,
    },
    button:{
        backgroundColor: '#FF6C00',
        paddingHorizontal: 111.5, 
        paddingVertical: 16,
        borderRadius: 25,
        height:51,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 43,
        marginBottom: 16,
        justifyContent: 'center'
    },
    textButton: {
        fontSize: 16,
        color: '#fff',
      },
    textEnterButton:{
        color: '#1B4371',
        marginLeft: 'auto',
        marginRight: 'auto',
      }
  });