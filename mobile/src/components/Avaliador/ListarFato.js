import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, Picker, Text, TextInput,
    TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

import api from '../../services/api';

export default function ListarFato( { navigation }){
    const [usuario_id,setIdUser] = useState('');
    const [avaliador_id,setAvaliador] = useState('');
    const [nome_avaliador,setNome] = useState('');
    const [fatos, setFatos] = useState([]);

    useEffect(() => {
        carregarUsuario();
    }, []);

    async function exibir(){
        api.get(`/curso/fo`, {
            params: {
                avaliador_id
            }
        }).then(resp => {
            setFatos(resp.data);
        }).catch(() => console.log(`Error: ${console.error}`));
    }
    
    async function carregarUsuario(){
        try{
            const usuario = await AsyncStorage.getItem('usuario');
            setIdUser(JSON.parse(usuario).id);
            await api.get(`curso/avaliador/${usuario_id}`).then(resp => {
              setAvaliador(resp.data.id);
              setCurso(resp.data.curso_id);
            })
        }catch(e){
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.label}>LISTAR FATO</Text>
            <View style={styles.form}>
                {/*
                <Text style={styles.label}>Selecione o Avaliador</Text>
                <TextInput
                    style={styles.Input}
                    placeholder="Avaliador"
                    placeholderTextColor= "#999"
                    autoCorrect={false}
                    type="number"
                    keyboardType='numeric'
                    defaultValue= {avaliador_id}
                    onChangeText= {avaliador_id => setAvaliador(avaliador_id)}
                    />
                */}    
                <TouchableOpacity onPress={exibir} style={styles.button}>
                    <Text style={styles.buttonText}>Exibir</Text>
                </TouchableOpacity>

                <SafeAreaView>
                    <ScrollView styles={styles.scrollView}>
                        {fatos.map(fato => <Text>{'\nData: '}{fato.data_fato} {'Tipo: '}{fato.tipo_fato}{'\n'}
                        {'Conteúdo Atitudinal: '} {fato.conteudoFato.nome_conteudo} {'\nPauta: '} {fato.pautaFato.desc_pauta}
                        {'\nFato: '} {fato.fatoFato.desc_fato} {'\nAtividade: '} {fato.atividadeFato.desc_atividade}
                        {'\nProvidência: '} {fato.providenciaFato.desc_providencia} {'\nAlunos: '}
                        {(fato.avaliados).map(usuario => <Text>{usuario.usuarioAvaliado.nome_usuario}{'\n'}</Text>)}
                        </Text>)}
                    </ScrollView>
                </SafeAreaView>

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
    scrollView: {
      backgroundColor: 'pink',
      marginHorizontal: 20
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 50,
        marginBottom: 270
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
        marginBottom: 5
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }
});