import { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { styles } from '../styles/styles';
import { Turma } from '../types/Turma';
import { AlterarTurmaProps } from '../navigation/HomeNavigator';

const AlterarTurma = (props: AlterarTurmaProps) => {
  const { id } = props.route.params;

  const [turma, setTurma] = useState<Turma>({
    id: '',
    nome: '',
    sala: '',
    turno: '',
  });

  useEffect(() => {
    // Buscar os dados da turma a ser editada
    firestore()
      .collection('turmas')
      .doc(id)
      .get()
      .then(doc => {
        if (doc.exists) {
          const data = doc.data() as Turma;
          setTurma({ id: doc.id, ...data });
        } else {
          Alert.alert('Erro', 'Turma não encontrada.');
          props.navigation.goBack();
        }
      })
      .catch(error => {
        console.error('Erro ao buscar turma:', error);
        Alert.alert('Erro', 'Erro ao buscar dados.');
        props.navigation.goBack();
      });
  }, [id]);

  const validarCampos = () => {
    if (!turma.nome.trim()) {
      Alert.alert('Validação', 'O nome não pode estar vazio.');
      return false;
    }

    if (!turma.sala.trim()) {
      Alert.alert('Validação', 'A sala não pode estar vazia.');
      return false;
    }

    if (!turma.turno.trim()) {
      Alert.alert('Validação', 'O turno não pode estar vazio.');
      return false;
    }

    return true;
  };

  const salvarAlteracoes = () => {
    if (!validarCampos()) return;

    firestore()
      .collection('turmas')
      .doc(id)
      .update({
        nome: turma.nome,
        sala: turma.sala,
        turno: turma.turno,
      })
      .then(() => {
        Alert.alert('Sucesso', 'Turma atualizada com sucesso!');
        props.navigation.goBack();
      })
      .catch(error => {
        console.error('Erro ao atualizar turma:', error);
        Alert.alert('Erro', 'Não foi possível atualizar os dados.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Alterar Turma</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={turma.nome}
        onChangeText={(text) => setTurma({ ...turma, nome: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Sala"
        value={turma.sala}
        onChangeText={(text) => setTurma({ ...turma, sala: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Turno"
        value={turma.turno}
        onChangeText={(text) => setTurma({ ...turma, turno: text })}
      />

      <Pressable style={styles.botao} onPress={salvarAlteracoes}>
        <Text style={styles.texto_botao}>Salvar</Text>
      </Pressable>

      <Pressable style={styles.botaoVoltar} onPress={() => props.navigation.goBack()}>
        <Text style={styles.texto_botao}>Voltar</Text>
      </Pressable>
    </View>
  );
};

export default AlterarTurma;
