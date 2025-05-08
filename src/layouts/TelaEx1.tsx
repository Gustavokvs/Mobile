import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Pressable, Alert, Image } from 'react-native';
import { StylesEx1 } from '../styles/StylesEx1';

const TelaEx1 = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [ativado, setAtivado] = useState(false);

  function exibirCadastro() {

    Alert.alert(
      'Cadastro Realizado',
      'Nome: ' + nome + '\n' +
      'Email: ' + email + '\n' +
      'Telefone: ' + telefone + '\n' +
      'Comorbidade: ' + (ativado ? 'Possui' : 'Não')
    );

  }

  function limparCampos() {
    setNome('');
    setEmail('');
    setTelefone('');
    setAtivado(false);
  }
  

  return (
    <View style={StylesEx1.painel}>
      <Text style={StylesEx1.titulo}>Cadastro de Cliente</Text>

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
          value={ativado}
          onValueChange={(value) => { setAtivado(value) }}
        />
      </View>


      <View style={StylesEx1.botoes}>
        <Pressable onPress={() => { exibirCadastro() }}>
          <Text>Cadastrar</Text>
        </Pressable>

        <Pressable onPress={() => { limparCampos() }}>
          <Text>Cancelar</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TelaEx1;
