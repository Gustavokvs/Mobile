import { useState, useEffect } from "react";
import { Alert, Pressable, FlatList, StyleSheet, Text, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { ConsultarProfessorProps } from "../navigation/HomeNavigator";
import { Professor } from "../types/Professor";

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
        <View style={styles.tela}>
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
                <Pressable style={styles.botaoExcluir} onPress={() => professor.id && onDeletar(professor.id)}>
                    <Text style={styles.textoBotaoAcao}>X</Text>
                </Pressable>
                <Pressable style={styles.botaoAlterar} onPress={() => professor.id && onAlterar(professor.id)}>
                    <Text style={styles.textoBotaoAcao}>A</Text>
                </Pressable>

            </View>
        </View>
    );
};

export default ConsultarProfessor;

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
