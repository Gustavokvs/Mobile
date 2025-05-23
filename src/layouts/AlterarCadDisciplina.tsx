import { useEffect, useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { styles } from "../styles/styles";
import { AlterarDisciplinaProps } from "../navigation/HomeNavigator"; 

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
          setHoras(dados?.horas ? String(dados.horas) : '');
        }
      })
      .catch((error) => {
        Alert.alert("Erro", "Não foi possível carregar a disciplina: " + error);
      });
  }, [id]);

  function validarCampos() {
  if (!nome.trim() || !horas.trim()) {
    Alert.alert("Erro", "Preencha todos os campos");
    return false;
  }

  // Validar nome: só letras, espaços e letras acentuadas
  if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nome.trim())) {
    Alert.alert("Erro", "O nome deve conter apenas letras e espaços.");
    return false;
  }

  // Validar carga horária: apenas números inteiros positivos, não começando com zero
  if (!/^[1-9][0-9]*$/.test(horas.trim())) {
    Alert.alert("Erro", "Informe uma carga horária válida (número inteiro positivo, sem zeros à esquerda).");
    return false;
  }

  return true;
}


  function salvarAlteracoes() {
    if (!validarCampos()) {
      return;
    }

    const horasNum = Number(horas);

    firestore()
      .collection("disciplinas")
      .doc(id)
      .update({ nome: nome.trim(), horas: horasNum })
      .then(() => {
        Alert.alert("Sucesso", "Disciplina alterada com sucesso");
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert("Erro", "Não foi possível alterar: " + error);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Alterar Disciplina</Text>

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

      <Pressable style={styles.botao} onPress={salvarAlteracoes}>
        <Text style={styles.texto_botaoSalvar}>Salvar</Text>
      </Pressable>
      <Pressable style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonTextVoltar}>Voltar</Text>
      </Pressable>
    </View>
  );
};

export default TelaAltDisciplina;
