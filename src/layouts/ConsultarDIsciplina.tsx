import { useState, useEffect } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { Disciplicina } from "../types/Disciplina";
import { useNavigation } from "@react-navigation/native";

const TelaConsDisciplina = () => {
  const [disciplina, setDisciplina] = useState<Disciplicina[]>([]);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('disciplina')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Disciplicina, 'id'>),
        }));
        console.log("Disciplinas carregadas:", data);
        setDisciplina(data);
      });
  
    return () => unsubscribe();
  }, []);
  

  function deletarDisciplina(id: string) {
    firestore()
      .collection("disciplina")
      .doc(id)
      .delete()
      .then(() => {
        Alert.alert("Disciplina", "Removida com sucesso");
      })
      .catch(error => Alert.alert("Erro", String(error)));
  }

  function alterarDisciplina(id: string) {
    navigation.navigate("TelaAltDisciplina", { id });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consulta de Turmas</Text>

      <FlatList
        data={disciplina}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <ItemTurma
            numeroOrdem={index + 1}
            turma={item}
            onDeletar={deletarDisciplina}
            onAlterar={alterarDisciplina}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma disciplina cadastrada</Text>}
      />

      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </Pressable>
    </View>
  );
};

type ItemDisciplinaProps = {
  numeroOrdem: number;
  turma: Disciplicina;
  onDeletar: (id: string) => void;
  onAlterar: (id: string) => void;
};

const ItemTurma = ({ numeroOrdem, turma, onDeletar, onAlterar }: ItemDisciplinaProps) => (
  <View style={styles.card}>
    <View style={styles.cardInfo}>
      <Text style={styles.cardTitle}>{`${numeroOrdem}. ${turma.nome}`}</Text>
      <Text style={styles.cardText}>Sala: {turma.sala}</Text>
      <Text style={styles.cardText}>Turno: {turma.turno}</Text>
    </View>

    <View style={styles.cardActions}>
      <Pressable style={styles.editButton} onPress={() => onAlterar(turma.id)}>
        <Text style={styles.buttonText}>Editar</Text>
      </Pressable>
      <Pressable style={styles.deleteButton} onPress={() => onDeletar(turma.id)}>
        <Text style={styles.buttonText}>Excluir</Text>
      </Pressable>
    </View>
  </View>
);

export default TelaConsDisciplina;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0D47A1",
    textAlign: "center",
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#999",
    textAlign: "center",
    marginTop: 50,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  cardInfo: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  cardText: {
    fontSize: 18,
    color: "#555",
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  editButton: {
    backgroundColor: "#FFD600",
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#D32F2F",
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#1976D2",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
