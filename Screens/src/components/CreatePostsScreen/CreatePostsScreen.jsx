import React from 'react';
import { View, Image, Text, TextInput, Pressable } from "react-native"
import { styles } from "./CreatePostsScreen.styled"
import camera from "../../images/camera.png"
import map from "../../images/map.png"
import trash from "../../images/trash.png"

export const CreatePostsScreen = () =>{
    return(
        <View style={{paddingTop:32, marginLeft:"auto", marginRight:"auto"}}>
            <View style={styles.container}>
                <View style={styles.circle}>
                    <Image source={camera} style={styles.image}/>
                </View>
            </View>
            <Text style={{color:"#BDBDBD", marginBottom:32}}>Завантажте фото</Text>
            <TextInput placeholder="Назва..." style={styles.input}/>
            <View>
            <TextInput placeholder="Місцевість..." style={[styles.input,styles.inputWithMap]}/>
            <Image source={map} style={styles.imageMap}/>
            </View>
            <Pressable style={styles.button} disabled>
                <Text style={{color: '#BDBDBD', fontSize:16}}>Опубліковати</Text>
            </Pressable>
            <Pressable style={styles.buttonTrash}>
                <Image source={trash}/>
            </Pressable>
         </View>
    )
}