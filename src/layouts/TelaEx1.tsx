import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Pressable, Alert, Image } from 'react-native';
import { StylesEx1 } from '../styles/StylesEx1';
import { Paciente } from '../types/Paciente';
import { TelaEx1Props } from '../navigation/HomeNavigator';
import firestore from "@react-native-firebase/firestore";


const TelaEx1 = (Props: TelaEx1Props) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [comorbidade, setComorbidade] = useState(false);

  function Cadastrar() {
    if (VerificarCampos()) {
      let Paciente = {
        nome: nome,
        email: email,
        telefone: telefone,
        comorbidade: comorbidade
      } as Paciente;


      firestore()
        .collection('Paciente')
        .add(Paciente)
        .then(() => {
          Alert.alert("Paciente", "Cadastrado com sucesso");
        })
        .catch((error) => {
          Alert.alert("Erro", String(error));
        });

    }
  }

  function VerificarCampos() {
    if (!nome) {
      Alert.alert("Campo nome vazio")
      return (false)
    }
    if (!email) {
      Alert.alert("Campo email vazio")
      return (false)
    }
    if (!telefone) {
      Alert.alert("Campo telefone vazio")
      return (false)
    }


    return (true)

  }





  return (
    <View style={StylesEx1.painel}>
      <Text style={StylesEx1.titulo}>Cadastro de Paciente</Text>

      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2922/2922510.png' }}
        style={StylesEx1.imagem}
      />


      <View style={StylesEx1.campoContainer}>
        <Text style={StylesEx1.camposEscritos}>Nome:</Text>
        <TextInput
          style={StylesEx1.input}
          placeholder="Digite o nome"
          value={nome}
          onChangeText={setNome}
        />
      </View>


      <View style={StylesEx1.campoContainer}>
        <Text style={StylesEx1.camposEscritos}>Email:</Text>
        <TextInput
          style={StylesEx1.input}
          placeholder="Digite o e-mail"
          value={email}
          onChangeText={setEmail}
        />
      </View>


      <View style={StylesEx1.campoContainer}>
        <Text style={StylesEx1.camposEscritos}>Telefone:</Text>
        <TextInput
          style={StylesEx1.input}
          placeholder="Digite o telefone"
          value={telefone}
          onChangeText={setTelefone}
        />
      </View>


      <View style={StylesEx1.campoContainer}>
        <Text style={StylesEx1.camposEscritos}>Possui Comorbidade?</Text>
        <Switch
          value={comorbidade}
          onValueChange={(value) => { setComorbidade(value) }}
        />
      </View>


      <View style={StylesEx1.botoes}>
        <Pressable onPress={() => { Cadastrar() }}>
          <Text>Cadastrar</Text>
        </Pressable>

        <Pressable onPress={() => { Props.navigation.goBack() }}>
          <Text>Cancelar</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TelaEx1;
