import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { Picker } from '@react-native-picker/picker';

import { styles } from "../styles/styles";
import { Aluno } from "../types/Aluno";
import { AlterarAlunoProps } from "../navigation/HomeNavigator";
import { Turma } from "../types/Turma";



const formatarDataNascimento = (data: any) => {
    if (!data) return "";

    if (data.toDate) {
        data = data.toDate();
    }

    const date = new Date(data);
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const ano = date.getFullYear();

    return `${dia}/${mes}/${ano}`;
};

const converterDataParaTimestamp = (data: string): number => {
    const [dia, mes, ano] = data.split("/").map(Number);
    const dataFormatada = new Date(ano, mes - 1, dia).getTime();
    return dataFormatada;
};

const AlterarAluno = (props: AlterarAlunoProps) => {
    const { id } = props.route.params;

    const [aluno, setAluno] = useState<Aluno>({
        id: "",
        nome: "",
        data_nascimento: 0,
        email: "",
        turma: {} as Turma,
    });

    const [turma, setTurmas] = useState<Turma[]>([]);
    const [turmaId, setTurmaId] = useState('');
    const [dataNascimentoInput, setDataNascimentoInput] = useState<string>("");


    useEffect(() => {
        const unsubscribe = firestore()
            .collection('turmas')
            .onSnapshot(snapshot => {
                const lista = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...(doc.data() as Omit<Turma, 'id'>),
                }));
                setTurmas(lista);
            });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        firestore()
            .collection("aluno")
            .doc(id)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    const data = doc.data() as Aluno;
                    const formattedData = formatarDataNascimento(data.data_nascimento);

                    setAluno({
                        id: doc.id,
                        nome: data.nome,
                        data_nascimento: data.data_nascimento,
                        email: data.email,
                        turma: data.turma,
                    });

                    setDataNascimentoInput(formattedData);

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
        if (!aluno.nome.trim() || !/^[A-Za-zÀ-ÿ\s]+$/.test(aluno.nome)) {
            Alert.alert("Validação", "O nome deve conter apenas letras e espaços.");
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
        if (!turmaId) {
            Alert.alert('Validação', 'Selecione uma turma.');
            return false;
        }

        return true;
    }

    function salvarAlteracoes() {
        if (!validarCampos()) return;

        const turmaSelecionada = turma.find(d => d.id === turmaId);
        if (!turmaSelecionada) {
            Alert.alert('Erro', 'Turma não encontrada.');
            return;
        }

        firestore()
            .collection("aluno")
            .doc(id)
            .update({
                nome: aluno.nome,
                data_nascimento: aluno.data_nascimento,
                email: aluno.email,
                turma: turmaSelecionada,
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

    function handleDataNascimentoChange(text: string) {
        let cleanedText = text.replace(/\D/g, "");

        if (cleanedText.length >= 3) {
            cleanedText = cleanedText.slice(0, 2) + "/" + cleanedText.slice(2);
        }
        if (cleanedText.length >= 6) {
            cleanedText = cleanedText.slice(0, 5) + "/" + cleanedText.slice(5);
        }

        setDataNascimentoInput(cleanedText);

        if (cleanedText.length === 10) {
            const novaData = converterDataParaTimestamp(cleanedText);
            setAluno({ ...aluno, data_nascimento: novaData });
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Alterar Aluno</Text>

            <Text style={styles.label}>Nome do aluno/a:</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={aluno.nome}
                onChangeText={(text) => setAluno({ ...aluno, nome: text })}
            />

            <Text style={styles.label}>Data de nascimento:</Text>
            <TextInput
                style={styles.input}
                placeholder="Data de Nascimento (dd/mm/yyyy)"
                keyboardType="numeric"
                value={dataNascimentoInput}
                onChangeText={handleDataNascimentoChange}
            />

            <Text style={styles.label}>Email do aluno ou responsável:</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={aluno.email}
                onChangeText={(text) => setAluno({ ...aluno, email: text })}
                keyboardType="email-address"
            />

            <Text style={styles.label}>Disciplina:</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={turmaId}
                    onValueChange={(itemValue) => setTurmaId(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Selecione uma disciplina" value="" />
                    {turma.map((turma) => (
                        <Picker.Item
                            key={turma.id}
                            label={turma.nome}
                            value={turma.id}
                        />
                    ))}
                </Picker>
            </View>
            <Pressable style={styles.botao} onPress={salvarAlteracoes}>
                <Text style={styles.texto_botaoSalvar}>Salvar</Text>
            </Pressable>

            <Pressable style={styles.botaoVoltar} onPress={() => props.navigation.goBack()}>
                <Text style={styles.buttonTextVoltar}>Voltar</Text>
            </Pressable>
        </View>
    );
};

export default AlterarAluno;
