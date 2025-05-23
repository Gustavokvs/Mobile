import { useState, useEffect } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { Turma } from "../types/Turma";
import { useNavigation } from "@react-navigation/native";
import { styles } from '../styles/styles';


const TelaConsTurma = () => {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('turmas')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Turma, 'id'>),
        }));

        console.log("Turmas carregadas:", data);
        setTurmas(data);
      });

    return () => unsubscribe();
  }, []);


  function deletarTurma(id: string) {
    firestore()
      .collection("turmas")
      .doc(id)
      .delete()
      .then(() => {
        Alert.alert("Turma", "Removida com sucesso");
      })
      .catch(error => Alert.alert("Erro", String(error)));
  }

  function alterarTurma(id: string) {
    navigation.navigate("AlterarCadTurma", { id });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Consulta de Turmas</Text>

      <FlatList
        data={turmas}
        keyExtractor={item => item.id!}

        renderItem={({ item, index }) => (
          <ItemTurma
            numeroOrdem={index + 1}
            turma={item}
            onDeletar={deletarTurma}
            onAlterar={alterarTurma}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma turma cadastrada</Text>}
      />

      <View style={styles.centralizar}>
        <Pressable style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Voltar</Text>
        </Pressable>
      </View>
    </View>
  );
};

type ItemTurmaProps = {
  numeroOrdem: number;
  turma: Turma;
  onDeletar: (id: string) => void;
  onAlterar: (id: string) => void;
};

const ItemTurma = ({ numeroOrdem, turma, onDeletar, onAlterar }: ItemTurmaProps) => {
  return (

    <View style={styles.card}>
      <View style={styles.dadosCard}>
        <Text style={styles.tituloCard}>{numeroOrdem + " - " + turma.nome}</Text>
        <Text style={styles.textoCard}>Sala: {turma.sala}</Text>
        <Text style={styles.textoCard}>Turno: {turma.turno}</Text>
      </View>

      <View style={styles.botoesCard}>
        <Pressable style={styles.botaoAlterar} onPress={() => turma.id && onAlterar(turma.id)}>
          <Text style={styles.textoBotaoAcao}>Editar</Text>
        </Pressable>
        <Pressable style={styles.botaoExcluir} onPress={() => turma.id && onDeletar(turma.id)}>
          <Text style={styles.textoBotaoAcao}>Excluir</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TelaConsTurma;
