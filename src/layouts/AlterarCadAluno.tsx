import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { styles } from "../styles/styles";
import { Aluno } from "../types/Aluno";
import { AlterarAlunoProps } from "../navigation/HomeNavigator";

const AlterarAluno = (props: AlterarAlunoProps) => {
    const { id } = props.route.params;

    const [aluno, setAluno] = useState<Aluno>({
        id: "",
        nome: "",
        data_nascimento: 0,
        email: "",
        turma: null, // adicionando conforme o tipo exige
    });

    useEffect(() => {
        firestore()
            .collection("aluno")
            .doc(id)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    const data = doc.data() as Aluno;
                    setAluno({
                        id: doc.id,
                        nome: data.nome,
                        data_nascimento: data.data_nascimento,
                        email: data.email,
                        turma: data.turma ?? null,
                    });
                } else {
                    Alert.alert("Erro", "Aluno não encontrado.");
                    props.navigation.goBack();
                }
            })
            .catch((error) => {
                console.error("Erro ao buscar aluno:", error);
                Alert.alert("Erro", "Erro ao buscar dados do aluno.");
                props.navigation.goBack();
            });
    }, [id]);

    function validarCampos() {
        if (!aluno.nome.trim()) {
            Alert.alert("Validação", "O nome não pode estar em branco.");
            return false;
        }

        if (!aluno.email.trim() || !/^\S+@\S+\.\S+$/.test(aluno.email)) {
            Alert.alert("Validação", "Informe um e-mail válido.");
            return false;
        }

        if (!aluno.data_nascimento || isNaN(aluno.data_nascimento)) {
            Alert.alert("Validação", "Informe uma data de nascimento válida.");
            return false;
        }

        return true;
    }

    function salvarAlteracoes() {
        if (!validarCampos()) return;

        firestore()
            .collection("aluno")
            .doc(id)
            .update({
                nome: aluno.nome,
                data_nascimento: aluno.data_nascimento,
                email: aluno.email,
                // turma não está sendo alterada aqui
            })
            .then(() => {
                Alert.alert("Sucesso", "Dados atualizados com sucesso!");
                props.navigation.goBack();
            })
            .catch((error) => {
                console.error("Erro ao atualizar:", error);
                Alert.alert("Erro", "Não foi possível atualizar os dados.");
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Alterar Aluno</Text>

            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={aluno.nome}
                onChangeText={(text) => setAluno({ ...aluno, nome: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Data de Nascimento (yyyyMMdd)"
                keyboardType="numeric"
                value={aluno.data_nascimento ? aluno.data_nascimento.toString() : ""}
                onChangeText={(text) =>
                    setAluno({ ...aluno, data_nascimento: Number(text) })
                }
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={aluno.email}
                onChangeText={(text) => setAluno({ ...aluno, email: text })}
                keyboardType="email-address"
            />

            <Pressable style={styles.botao} onPress={salvarAlteracoes}>
                <Text style={styles.texto_botao}>Salvar</Text>
            </Pressable>

            <Pressable style={styles.botaoVoltar} onPress={() => props.navigation.goBack()}>
                <Text style={styles.texto_botao}>Voltar</Text>
            </Pressable>
        </View>
    );
};

export default AlterarAluno;
