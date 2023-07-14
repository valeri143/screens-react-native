import React from 'react';
import { Image, Text, View, Pressable } from "react-native"
import { styles } from "./PostsScreen.styled"
import add from '../../images/add.png'

export const PostsScreen = () => {
return(
<View style={{paddingLeft:16, paddingTop:32}}>
<View style={styles.container}>
    <View style={styles.imageContainer}></View>
    <Image source={add} style={styles.imageAdd}/>
    <View style={{marginTop:"auto", marginBottom:"auto"}}>
    <Text>Name</Text>
    <Text>Email</Text>
    </View>
</View>
</View> 
)
}
