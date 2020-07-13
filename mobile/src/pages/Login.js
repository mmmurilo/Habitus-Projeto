import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../services/api';

import logo from '../assets/logo.jpg';

export default function Login( { navigation }){
    const [email_usuario, setEmail] = useState('');
    const [senha_usuario, setSenha] = useState('');

    useEffect(() => {
        // TODO: carregar a sessao do usuario
    });

    async function login(){
        const user = await api.post(`login`, {
          email_usuario,
          senha_usuario
        });
        const id = user.data.id;
        try{
            await AsyncStorage.setItem('usuario',JSON.stringify({id}));
        }catch(e){
            alert(e)
        }
        
        if(user.data.tipo_usuario === 'Avaliado'){
            navigation.navigate('Avaliado');
        } else if (user.data.tipo_usuario === 'Avaliador'){
            navigation.navigate('Avaliador');
        }
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
                    defaultValue={email_usuario}
                    onChangeText={email_usuario => setEmail(email_usuario)}
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
                    defaultValue={senha_usuario}
                    onChangeText={senha_usuario => setSenha(senha_usuario)}
                />

                <TouchableOpacity onPress={login} style={styles.button}>
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

