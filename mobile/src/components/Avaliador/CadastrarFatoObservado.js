import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, Platform,
  Image, Autocomplete, Text, InputComponent, TextInput, TouchableOpacity, StyleSheet, ScrollView  } from 'react-native';

import api from '../../services/api';


export default function CadastrarFatoObservado( { navigation }){
  
  const [data_fato,setData] = useState('');
  const [tipo_fato,setTipo] = useState('');
  const [nome_conteudo, setConteudo] = useState('');
  const [desc_pauta, setPauta] = useState('');
  const [desc_fato, setFato] = useState('');
  const [desc_atividade, setAtividade] = useState('');
  const [desc_providencia, setProvidencia] = useState('');
  const [avaliador_id, setAvaliador_id] = useState('');
  const [avaliado_id,setListaAvaliados] = useState('');
  const [fatos,setFatos] = useState('');

  async function cadastrar(event){
    event.preventDefault();

    const fato = {avaliador_id: avaliador_id,data_fato: data_fato, tipo_fato: tipo_fato,
    nome_conteudo: nome_conteudo, desc_pauta: desc_pauta,
    desc_fato: desc_fato, desc_atividade: desc_atividade,
    desc_providencia: desc_providencia, avaliado_id: avaliado_id}

    await api.post(`curso/${avaliador_id}/avaliador/fo`,fato).then(resp => {
        return resp.data;
    }).catch(console.log(`Error: ${console.error}`));

    navigation.navigate('HomeAvaliador');

  }

    async function handleSubmit(){
      /*
        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id);

        //ir para proxima tela
       navigation.navigate('HomeAvaliador');
      */
    }

    return(
      
      <ScrollView>
        
        <View style={styles.container}>
        <Text style={styles.label}>FATO OBSERVADO</Text>   

            <View style={styles.form}>
                <Text style={styles.label}>Data/Hora *</Text>
                <TextInput
                    id="data" 
                    style={styles.Input}
                    placeholder=""
                    placeholderTextColor= "#999"       
                    type="date"
                    titulo="data_fato"
                    value={data_fato}
                    onChange={e => setData(e.target.value)}
                    />

                <Text style={styles.label}>Indicador</Text>

                <TextInput
                    style={styles.Input}
                    placeholder="Informe o indicador"
                    placeholderTextColor= "#999"
                    autoCorrect={false}  
                    value={tipo_fato}
                    onChange={e => setTipo(e.target.value)}           
                    />

                    <Text style={styles.label}>Avaliador</Text>
                    <TextInput
                      style={styles.Input}
                      placeholder="Selecione o avaliador"
                      placeholderTextColor= "#999"
                      autoCorrect={false}
                      titulo = "avaliador_id"
                      type="number"
                      keyboardType = 'numeric'
                      value={avaliador_id}
                      onChange={e => setAvaliador_id((e.target.value))}
                    />
                      <Text style={styles.label}>Avaliados</Text>                     
                      <TextInput
                      style={styles.Input}
                      placeholder="Selecione os avaliados"
                      placeholderTextColor= "#999"
                      autoCorrect={false} 
                      titulo = "listaAvaliados"
                      type="number"
                      keyboardType = 'numeric'
                      value={avaliado_id}
                      onChange={e => setListaAvaliados(e.target.value)}
                    />  

                      <Text style={styles.label}>Atividade</Text>                     
                      <TextInput
                      style={styles.Input}
                      placeholder="Informe a atividade"
                      placeholderTextColor= "#999"
                      autoCorrect={false}  
                      titulo = "desc_atividade"
                      value={desc_atividade}
                      onChange={e => setAtividade(e.target.value)}
                    />  
                            <Text style={styles.label}>Fato</Text>                     
                      <TextInput
                      style={styles.Input}
                      placeholder="Informe o fato"
                      placeholderTextColor= "#999"
                      autoCorrect={false}  
                      titulo = "desc_fato"
                      value={desc_fato}
                      onChange={e => setFato(e.target.value)}

                    />  
                      <Text style={styles.label}>Providência</Text>                     
                      <TextInput
                      style={styles.Input}
                      placeholder="Informe a Providência"
                      placeholderTextColor= "#999"
                      autoCorrect={false}  
                      titulo = "desc_providencia"
                      value={desc_providencia}
                      onChange={e => setProvidencia(e.target.value)}
                    />  
                     
                       <Text style={styles.label}>Conteúdos</Text>                     
                      <TextInput
                      style={styles.Input}
                      placeholder="Selecione os Conteúdos"
                      placeholderTextColor= "#999"
                      autoCorrect={false} 
                      titulo = "nome_conteudo"
                      value={nome_conteudo}
                      onChange={e => setConteudo(e.target.value)}
                      
                    />     
                     <Text style={styles.label}>PAUTAS</Text>

                      <Text style={styles.label}>Pauta</Text>                     
                      <TextInput
                      style={styles.Input}
                      placeholder="Informe a pauta"
                      placeholderTextColor= "#999"
                      autoCorrect={false}  
                      titulo = "desc_pauta"
                      value={desc_pauta}
                      onChange={e => setPauta(e.target.value)}  
                    />       

                <TouchableOpacity style={styles.button} onPress={cadastrar}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Deletar</Text>
                </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
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
        marginBottom: 3,
        marginTop: 50
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

