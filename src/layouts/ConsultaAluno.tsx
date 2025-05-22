import { useState, useEffect } from "react";
import { Alert, Pressable, FlatList, StyleSheet, Text, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { Aluno } from "../types/Aluno";
import { ConsultaAlunoProps } from "../navigation/HomeNavigator";

const ConsultaAluno = (props: ConsultaAlunoProps) => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  useEffect(() => {
    const subscribe = firestore()
      .collection("aluno")
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Aluno[];

        setAlunos(data);
      });

    return () => subscribe();
  }, []);

  function deletarAluno(id: string) {
    firestore()
      .collection("aluno")
      .doc(id)
      .delete()
      .then(() => {
        Alert.alert("Aluno", "Removido com sucesso!");
      })
      .catch(error => console.log(error));
  }

  function alterarDados(id: string) {
    props.navigation.navigate("AlterarCadAluno", { id: id });
  }

  // Função para formatar a data de nascimento no formato dd/mm/yyyy
  const formatarDataNascimento = (data: any) => {
    if (!data) return ""; // Se a data for inválida, retorna uma string vazia

    // Se a data for um timestamp do Firestore
    if (data.toDate) {
      data = data.toDate(); // Converte o Timestamp para um objeto Date
    }

    // Ajusta para o fuso horário local corretamente
    const date = new Date(data);

    // Usando getUTCDate, getUTCMonth e getUTCFullYear para evitar o problema do dia a menos
    const dia = String(date.getUTCDate()).padStart(2, "0");
    const mes = String(date.getUTCMonth() + 1).padStart(2, "0"); // Meses começam em 0
    const ano = date.getUTCFullYear();

    return `${dia}/${mes}/${ano}`; // Retorna no formato dd/mm/yyyy
  };

  return (
    <View style={styles.tela}>
      <Text style={styles.titulo}>Lista de Alunos</Text>

      <FlatList
        data={alunos}
        renderItem={({ item, index }) => (
          <ItemAluno
            numeroOrdem={index + 1}
            aluno={item}
            onDeletar={deletarAluno}
            onAlterar={alterarDados}
            formatarDataNascimento={formatarDataNascimento} // Passa a função para formatar a data
          />
        )}
        keyExtractor={(item) => item.id ?? ""}
      />

      <View style={styles.centralizar}>
        <Pressable
          style={[styles.botao, { width: "40%" }]}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={styles.textoBotao}>Voltar</Text>
        </Pressable>
      </View>
    </View>
  );
};

type ItemAlunoProps = {
  numeroOrdem: number;
  aluno: Aluno;
  onDeletar: (id: string) => void;
  onAlterar: (id: string) => void;
  formatarDataNascimento: (data: any) => string; // Função para formatar a data
};

const ItemAluno = ({ numeroOrdem, aluno, onDeletar, onAlterar, formatarDataNascimento }: ItemAlunoProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.dadosCard}>
        <Text style={styles.tituloCard}>{numeroOrdem + " - " + aluno.nome}</Text>
        <Text style={styles.textoCard}>ID: {aluno.id}</Text>
        <Text style={styles.textoCard}>Nome: {aluno.nome}</Text>
        <Text style={styles.textoCard}>Data de Nascimento: {formatarDataNascimento(aluno.data_nascimento)}</Text>
        <Text style={styles.textoCard}>Email: {aluno.email}</Text>
        <Text style={styles.textoCard}>Turma: {aluno.turma?.nome}</Text>
      </View>

      <View style={styles.botoesCard}>
        <Pressable style={styles.botaoExcluir} onPress={() => aluno.id && onDeletar(aluno.id)}>
          <Text style={styles.textoBotaoAcao}>X</Text>
        </Pressable>
        <Pressable style={styles.botaoAlterar} onPress={() => aluno.id && onAlterar(aluno.id)}>
          <Text style={styles.textoBotaoAcao}>A</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ConsultaAluno;

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0D47A1",
    marginBottom: 20,
    textAlign: "center",
  },
  centralizar: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  botao: {
    backgroundColor: "#1976D2",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  textoBotao: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },

  card: {
    borderWidth: 2,
    borderColor: "grey",
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
  },
  dadosCard: {
    flex: 1,
  },
  tituloCard: {
    fontSize: 30,
    color: "black",
  },
  textoCard: {
    fontSize: 20,
  },
  botoesCard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  botaoExcluir: {
    backgroundColor: "red",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginLeft: 5,
  },
  botaoAlterar: {
    backgroundColor: "yellow",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginLeft: 5,
  },
  textoBotaoAcao: {
    fontWeight: "bold",
    fontSize: 28,
    color: "black",
  },
});
