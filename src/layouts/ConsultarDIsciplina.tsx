import { useState, useEffect } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { Disciplina } from "../types/Disciplina";
import { ConsultarDisciplinaProps } from "../navigation/HomeNavigator";
import { styles } from '../styles/styles';


const ConsultarDisciplina = (props: ConsultarDisciplinaProps) => {
  const [disciplina, setDisciplina] = useState<Disciplina[]>([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('disciplinas')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Disciplina, 'id'>),
        }));
        console.log("Disciplinas carregadas:", data);  // Log para depuração
        setDisciplina(data);
      });

    return () => unsubscribe();
  }, []);

  function deletarDisciplina(id: string) {
    if (!id) {
      Alert.alert("Erro", "ID da disciplina não encontrado.");
      return;
    }

    firestore()
      .collection("disciplinas")
      .doc(id)
      .delete()
      .then(() => {
        Alert.alert("Disciplina", "Removida com sucesso");
      })
      .catch(error => Alert.alert("Erro", String(error)));
  }

  function alterarDisciplina(id: string) {
    if (!id) {
      Alert.alert("Erro", "ID da disciplina não encontrado.");
      return;
    }
    props.navigation.navigate("AlterarCadDisciplina", { id });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Consulta de Disciplinas</Text>

      <FlatList
        data={disciplina}
        keyExtractor={(item) => item.id || String(item.id)}
        renderItem={({ item, index }) => (
          <ItemDisciplina
            numeroOrdem={index + 1}
            disciplina={item}
            onDeletar={deletarDisciplina}
            onAlterar={alterarDisciplina}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma disciplina cadastrada</Text>}
      />

      <View style={styles.centralizar}>
        <Pressable style={styles.botaoVoltar} onPress={() => props.navigation.goBack()}>
          <Text style={styles.textoBotao}>Voltar</Text>
        </Pressable>
      </View>
    </View>
  );
};

type ItemDisciplinaProps = {
  numeroOrdem: number;
  disciplina: Disciplina;
  onDeletar: (id: string) => void;
  onAlterar: (id: string) => void;
};

const ItemDisciplina = ({ numeroOrdem, disciplina, onDeletar, onAlterar }: ItemDisciplinaProps) => {

  return (
    <View style={styles.card}>
      <View style={styles.dadosCard}>
        <Text style={styles.tituloCard}>{numeroOrdem + " - " + disciplina.nome}</Text>
        <Text style={styles.textoCard}>Carga horária: {disciplina.horas}</Text>
      </View>

      <View style={styles.botoesCard}>
        <Pressable style={styles.botaoAlterar} onPress={() => onAlterar(disciplina.id || '')}>
          <Text style={styles.textoBotaoAcao}>Editar</Text>
        </Pressable>
        <Pressable style={styles.botaoExcluir} onPress={() => onDeletar(disciplina.id || '')}>
          <Text style={styles.textoBotaoAcao}>Excluir</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ConsultarDisciplina;

