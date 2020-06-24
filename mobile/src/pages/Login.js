import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, Platform, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.jpg';


export default function Login( { navigation }){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');


    //Após logado direcionar diretamente para a próxima tela
    /*
    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user){
                navigation.navigate('List');
            }
        })
    }, []);
    
*/
    async function handleSubmit(){
        const response = await api.post('/session', {
            email
        })

        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id);

        //ir para proxima tela
       navigation.navigate('HomeAvaliador');
        
    }

    return(
        <View style={styles.container}>
            <Image source={logo} />

            <View style={styles.form}>
                <Text style={styles.label}>SEU E-MAIL *</Text>
                <TextInput
                    style={styles.Input}
                    placeholder="Seu e-mail"
                    placeholderTextColor= "#999"
                    keyboardType="email-address"
                    autoCapitalize="none"    
                    autoCorrect={false} 
                    value={email}     
                    onChangeText={setEmail}     
                    titulo="email_usuario"                           
                    
                    />

                <Text style={styles.label}>SUA SENHA *</Text>
                <TextInput
                    style={styles.Input}
                    secureTextEntry={true} 
                    placeholder="Sua senha"
                    placeholderTextColor= "#999"
                    autoCorrect={false}   
                    titulo="senha_usuario" 
                    //value={senha}     
                    //onChangeText={setSenha}  
                                                

                    
                    />    

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>ENTRAR</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 50,
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop: 30
    },

    input: {
       borderWidth: 1,
       borderColor: '#ddd',
       paddingHorizontal: 20,
       fontSize: 18,
       color: '#444',
       height: 44,
       marginBottom: 20,
       borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: '#006400',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 30,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }

});

