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
    if (!turma.nome.trim() || !/^[A-Za-zÀ-ÿ0-9\s]+$/.test(turma.nome)) {
            Alert.alert("Validação", "O nome da turma deve conter letras, números ou espaços.");
            return false;
        }

        if (!turma.sala.trim() || !/^[0-9]+$/.test(turma.sala)) {
            Alert.alert("Validação", "A sala deve conter apenas números.");
            return false;
        }

        if (!turma.turno.trim() || !/^(Manhã|Tarde|Noite)$/i.test(turma.turno)) {
            Alert.alert("Validação", "Turno inválido. Use: Manhã, Tarde ou Noite.");
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

      <Text style={styles.label}>Nome da Turma:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={turma.nome}
        onChangeText={(text) => setTurma({ ...turma, nome: text })}
      />

      <Text style={styles.label}>Número da sala:</Text>
      <TextInput
        style={styles.input}
        placeholder="Sala"
        keyboardType="numeric"
        value={turma.sala}
        onChangeText={(text) => setTurma({ ...turma, sala: text })}
      />


      <Text style={styles.label}>Nome do turno:</Text>
      <TextInput
        style={styles.input}
        placeholder="Turno"
        value={turma.turno}
        onChangeText={(text) => setTurma({ ...turma, turno: text })}
      />

      <Pressable style={styles.botao} onPress={salvarAlteracoes}>
        <Text style={styles.texto_botaoSalvar}>Salvar</Text>
      </Pressable>

      <Pressable style={styles.botaoVoltar} onPress={() => props.navigation.goBack()}>
        <Text style={styles.buttonTextVoltar}>Voltar</Text>
      </Pressable>
    </View>
  );
};

export default AlterarTurma;
