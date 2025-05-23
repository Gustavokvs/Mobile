import { useState, useEffect } from "react";
import { Alert, Pressable, FlatList, StyleSheet, Text, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { ConsultarProfessorProps } from "../navigation/HomeNavigator";
import { Professor } from "../types/Professor";
import { styles } from '../styles/styles';

const ConsultarProfessor = (props: ConsultarProfessorProps) => {
    const [professor, setProfesor] = useState<Professor[]>([]);

    useEffect(() => {
        const subscribe = firestore()
            .collection("professor")
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Professor[];

                setProfesor(data);
            });

        return () => subscribe();
    }, []);

    function deletarProfessor(id: string) {
        firestore()
            .collection("professor")
            .doc(id)
            .delete()
            .then(() => {
                Alert.alert("Professor", "Removido com sucesso!");
            })
            .catch(error => console.log(error));
    }

    function alterarDados(id: string) {
        props.navigation.navigate("AlterarCadProfessor", { id: id });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Lista de Professores</Text>

            <FlatList
                data={professor}
                renderItem={({ item, index }) => (
                    <ItemProfessor
                        numeroOrdem={index + 1}
                        professor={item}
                        onDeletar={deletarProfessor}
                        onAlterar={alterarDados}
                    />
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>Nenhum professor/a cadastrada</Text>}

            />

            <View style={styles.centralizar}>
                <Pressable
                    style={styles.botaoVoltar}
                    onPress={() => props.navigation.goBack()}
                >
                    <Text style={styles.textoBotao}>Voltar</Text>
                </Pressable>
            </View>
        </View>
    );
};

type ItemProfessorProps = {
    numeroOrdem: number;
    professor: Professor;
    onDeletar: (id: string) => void;
    onAlterar: (id: string) => void;
};

const ItemProfessor = ({ numeroOrdem, professor, onDeletar, onAlterar }: ItemProfessorProps) => {
    return (
        <View style={styles.card}>
            <View style={styles.dadosCard}>
                <Text style={styles.tituloCard}>{numeroOrdem + " - " + professor.nome}</Text>
                <Text style={styles.textoCard}>ID: {professor.id}</Text>
                <Text style={styles.textoCard}>Nome: {professor.nome}</Text>
                <Text style={styles.textoCard}>Telefone: {professor.telefone}</Text>
                <Text style={styles.textoCard}>Disciplina: {professor.disciplina && professor.disciplina.nome}</Text>

            </View>

            <View style={styles.botoesCard}>

                <Pressable style={styles.botaoAlterar} onPress={() => professor.id && onAlterar(professor.id)}>
                    <Text style={styles.textoBotaoAcao}>Editar</Text>
                </Pressable>
                <Pressable style={styles.botaoExcluir} onPress={() => professor.id && onDeletar(professor.id)}>
                    <Text style={styles.textoBotaoAcao}>Excluir</Text>
                </Pressable>


            </View>
        </View>
    );
};

export default ConsultarProfessor;


