import { useState, useEffect } from "react";
import { Alert, Pressable, FlatList, StyleSheet, Text, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { Aluno } from "../types/Aluno";
import { ConsultaAlunoProps } from "../navigation/HomeNavigator";
import { styles } from '../styles/styles';

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

  const formatarDataNascimento = (data: any) => {
    if (!data) return "";

    if (data.toDate) {
      data = data.toDate();
    }

    const date = new Date(data);

    const dia = String(date.getUTCDate()).padStart(2, "0");
    const mes = String(date.getUTCMonth() + 1).padStart(2, "0");
    const ano = date.getUTCFullYear();

    return `${dia}/${mes}/${ano}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Alunos</Text>

      <FlatList
        data={alunos}
        renderItem={({ item, index }) => (
          <ItemAluno
            numeroOrdem={index + 1}
            aluno={item}
            onDeletar={deletarAluno}
            onAlterar={alterarDados}
            formatarDataNascimento={formatarDataNascimento}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma aluno cadastrado</Text>}

        keyExtractor={(item) => item.id ?? ""}
      />

      <View style={styles.centralizar}>
        <Pressable
          style={styles.botaoVoltar} onPress={() => props.navigation.goBack()} >
          <Text style={styles.buttonTextVoltar}>Voltar</Text>
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
  formatarDataNascimento: (data: any) => string;
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
        <Pressable style={styles.botaoAlterar} onPress={() => aluno.id && onAlterar(aluno.id)}>
          <Text style={styles.textoBotaoAcao}>Editar</Text>
        </Pressable>
        <Pressable style={styles.botaoExcluir} onPress={() => aluno.id && onDeletar(aluno.id)}>
          <Text style={styles.textoBotaoAcao}>Excluir</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ConsultaAluno;

