import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';

const User = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [comorbidade, setComorbidade] = useState('');

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

      <Text>Possui comorbidade?</Text>
      <TextInput placeholder="Sim ou Não" value={comorbidade} onChangeText={setComorbidade} />

      <Button title="Cadastrar" onPress={() => {}} />
      <Button title="Cancelar" onPress={() => {}} />
    </View>
  );
};

export default User;
