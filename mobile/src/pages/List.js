import React, { useState, useEffect} from 'react';
import {  SafeAreaView, StyleSheet, Image, View, AsyncStorage, Text } from 'react-native';


import logo from '../assets/logo.jpg';


export default function List() {
    const [email, setEmail] = useState([]);

return <Text>{email}</Text>
/*
    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
           const techsArray =  storagedTechs.split(',').map(tech => tech.trim());
           setTechs(techsArray);
        })
    }, []);
*/

    return(
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />
            
            {techs.map(tech => <SpotList key={tech} tech={tech} />)}
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop: 70,
    }
});

