import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Platform,
  Image, Autocomplete, Text, InputComponent, Picker, TextInput, TouchableOpacity, StyleSheet, ScrollView  } from 'react-native';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';


export default function CadastrarFatoObservado( { navigation }){

  const [usuario_id,setIdUser] = useState('');
  const [data_fato,setData] = useState('');
  const [tipo_fato,setTipo] = useState('');
  const [conteudo_id, setConteudo] = useState('');
  const [pauta_id, setPauta] = useState('');
  const [desc_fato, setFato] = useState('');
  const [desc_atividade, setAtividade] = useState('');
  const [desc_providencia, setProvidencia] = useState('');
  const [avaliador_id, setAvaliador] = useState('');
  const [nome_avaliado,setAvaliado] = useState('');
  const [curso_id,setCurso] = useState('');

  const [conteudos,setListaConteudos] = useState([]);
  const [pautas,setListaPautas] = useState([]);

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
  
  async function selecionarConteudo(itemValue){
    setConteudo(itemValue);
    await api.get(`conteudos/${conteudo_id}/pautas`).then(resp => {
      setListaPautas(resp.data.pautas);
    })
  };

  useEffect(() => {
    carregarUsuario();
    api.get('conteudos').then(resp => {
        setListaConteudos(resp.data);
    })
    console.log(usuario_id);
    console.log(avaliador_id);
  }, []);

  async function cadastrar(event){
    const fato = {avaliador_id: avaliador_id,data_fato: data_fato, tipo_fato: tipo_fato,
    conteudo_id: conteudo_id, pauta_id: pauta_id,
    desc_fato: desc_fato, desc_atividade: desc_atividade,
    desc_providencia: desc_providencia, nome_avaliado: nome_avaliado}

    await api.post(`curso/avaliador/fo`,fato).then(resp => {
        return resp.data;
    }).catch(console.log(`Error: ${console.error}`));
    
    navigation.navigate('AvaliadorHome');
  }

  async function cancelar(event){
    navigation.navigate('AvaliadorHome');
  }

  return(
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.label}>FATO OBSERVADO</Text>
            <View style={styles.form}>
                <Text style={styles.label}>Data/Hora</Text>
                
                <TextInput
                    id="data"
                    style={styles.Input}
                    placeholder="Insira a data AAAA/MM/DD"
                    placeholderTextColor= "#999"
                    type="date"
                    titulo="data_fato"
                    defaultValue={data_fato}
                    onChangeText={data_fato => setData(data_fato)}
                />

                <Text style={styles.label}>Indicador</Text>
                <Picker selectedValue={tipo_fato}
                    onValueChange={(itemValue, itemIndex) => setTipo(itemValue)}>
                      <Picker.Item label="Neutro" value="Neutro"></Picker.Item>
                      <Picker.Item label="Positivo" value="Positivo"></Picker.Item>
                      <Picker.Item label="Negativo" value="Negativo"></Picker.Item>
                </Picker>
                      
                <Text style={styles.label}>Avaliado</Text>
                <TextInput
                    style={styles.Input}
                    placeholder="Informe o avaliado"
                    placeholderTextColor= "#999"
                    autoCorrect={false}
                    titulo = "nome_avaliado"
                    defaultValue={nome_avaliado}
                    onChangeText={nome_avaliado => setAvaliado(nome_avaliado)}
                  />
                {/*
                <Picker selectedValue={avaliado_id}
                  onValueChange={(itemValue, itemIndex) => setAvaliado(itemValue)}>
                    {avaliados.map(avaliado => (
                      <Picker.Item
                        key={avaliado.usuarioAvaliado.id}
                        label={avaliado.usuarioAvaliado.nome_avaliado}
                        value={avaliado.usuarioAvaliado.id}
                      />
                    ))}
                </Picker>
                */}    

                <Text style={styles.label}>Atividade</Text>
                  <TextInput
                    style={styles.Input}
                    placeholder="Informe a atividade"
                    placeholderTextColor= "#999"
                    autoCorrect={false}
                    titulo = "desc_atividade"
                    defaultValue={desc_atividade}
                    onChangeText={desc_atividade => setAtividade(desc_atividade)}
                  />
                
                <Text style={styles.label}>Fato</Text>
                  <TextInput
                    style={styles.Input}
                    placeholder="Informe o fato"
                    placeholderTextColor= "#999"
                    autoCorrect={false}
                    titulo = "desc_fato"
                    defaultValue={desc_fato}
                    onChangeText={desc_fato => setFato(desc_fato)}
                  />

                <Text style={styles.label}>Providência</Text>
                  <TextInput
                    style={styles.Input}
                    placeholder="Informe a Providência"
                    placeholderTextColor= "#999"
                    autoCorrect={false}
                    titulo = "desc_providencia"
                    defaultValue={desc_providencia}
                    onChangeText={desc_providencia => setProvidencia(desc_providencia)}
                  />

                <Text style={styles.label}>Conteúdos</Text>
                <Picker selectedValue={conteudo_id}
                  onValueChange={(itemValue, itemIndex) => {selecionarConteudo(itemValue)}}>
                    {conteudos.map(conteudos => (
                      <Picker.Item
                        key={conteudos.id}
                        label={conteudos.nome_conteudo}
                        value={conteudos.id}
                      />
                    ))}
                </Picker>

                <Text style={styles.label}>Pauta</Text>
                <Picker selectedValue={pauta_id}
                  onValueChange={(itemValue, itemIndex) =>  setPauta(itemValue)}>
                    {pautas.map(pautas => (
                      <Picker.Item
                        key={pautas.id}
                        label={pautas.desc_pauta}
                        value={pautas.id}
                      />
                    ))}
                </Picker>

                <TouchableOpacity style={styles.button} onPress={cadastrar}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={cancelar} style={styles.button}>
                    <Text style={styles.buttonText}>Deletar</Text>
                </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  dateComponente:{
    width: 370,
  },  
  
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