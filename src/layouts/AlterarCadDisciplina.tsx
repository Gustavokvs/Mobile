import { useEffect, useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { styles } from "../styles/styles";
import {AlterarDisciplinaProps } from "../navigation/HomeNavigator"; // Ajuste conforme seu tipo

const TelaAltDisciplina = ({ route, navigation }: AlterarDisciplinaProps) => {
  const { id } = route.params;
  const [nome, setNome] = useState('');
  const [horas, setHoras] = useState('');

  useEffect(() => {
    firestore()
      .collection("disciplinas")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const dados = doc.data();
          setNome(dados?.nome || '');
          setHoras(dados?.horas || '');
        }
      })
      .catch((error) => {
        Alert.alert("Erro", "Não foi possível carregar a disciplina: " + error);
      });
  }, [id]);

  function salvarAlteracoes() {
    if (!nome || !horas) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    firestore()
      .collection("disciplinas")
      .doc(id)
      .update({ nome, horas })
      .then(() => {
        Alert.alert("Sucesso", "Disciplina alterada com sucesso");
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert("Erro", "Não foi possível alterar: " + error);
      });
  }

  return (
    <View style={styles.containerPrincipal}>
      <Text style={styles.title}>ALTERAR DISCIPLINA</Text>

      <Text style={styles.label}>Nome da Disciplina:</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Digite o nome"
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>Carga Horária:</Text>
      <TextInput
        style={styles.input}
        value={horas}
        onChangeText={setHoras}
        placeholder="Digite as horas"
        placeholderTextColor="#666"
        keyboardType="numeric"
      />

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={salvarAlteracoes}>
          <Text style={styles.buttonText}>Salvar</Text>
        </Pressable>
        <Pressable style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TelaAltDisciplina;
