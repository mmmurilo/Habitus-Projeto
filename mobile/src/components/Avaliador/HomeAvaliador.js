import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, Image, Text, StyleSheet } from 'react-native';
import api from '../../services/api';
import logo from '../../assets/logo.jpg';

export default function HomeAvaliador( { navigation }){
    const [usuario_id,setIdUser] = useState('');
    const [usuarioConec,setUsuario] = useState('');
    
    useEffect(() => {
        carregarUsuario();
    }, []);

    async function carregarUsuario(){
        try{
            const usuario = await AsyncStorage.getItem('usuario');
            setIdUser(JSON.parse(usuario).id);
            await api.get(`usuarios/${usuario_id}`).then(resp => {
                setUsuario(resp.data);
            })
        }catch(e){
            alert(e)
        }
    }

    return(
        <View style={styles.container}>
            <Image source={logo} />
            <Text style={styles.label}>Bem vindo {usuarioConec.nome_usuario}!</Text>
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
        marginTop: 10,
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

