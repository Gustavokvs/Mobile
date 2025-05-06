import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, Switch, Pressable, Alert } from 'react-native';

const TelaEx1 = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [ativado, setAtivado] = useState(false);

  return (
    <View>
      <Text>Cadastro de Cliente</Text>

      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2922/2922510.png' }}
        style={{ width: 100, height: 100 }}
      />
      <Text>Nome:</Text>
      <TextInput placeholder="Digite o nome" value={nome} onChangeText={setNome} />

      <Text>Email:</Text>
      <TextInput placeholder="Digite o e-mail" value={email} onChangeText={setEmail} />

      <Text>Telefone:</Text>
      <TextInput placeholder="Digite o telefone" value={telefone} onChangeText={setTelefone} />

      <Text>Possui Comorbidade?</Text>
      <Switch
        value={ativado}
        onValueChange={(value) => { setAtivado(value) }} />


      <Pressable
        onPress={() => { Alert.alert('Cadastrar') }}>
        <Text>Cadastrar</Text>
      </Pressable>

      <Pressable
        onPress={() => { Alert.alert('Cancelar') }}>
        <Text>Cancelar</Text>
      </Pressable>


    </View>
  );
};

export default TelaEx1;
