import { Alert, Pressable, Text, TextInput, View, Image } from 'react-native';
import { styles } from '../styles/styles';
import { useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { CadastroDisciplinaProps } from '../navigation/HomeNavigator';
import { useNavigation } from '@react-navigation/native';


const CadastroDisciplina = (props: CadastroDisciplinaProps) => {
    const [nome, setNome] = useState('');
    const [horas, setHoras] = useState('');

    function cadastrar() {
        if (verificaCampos()) {
            const disciplina = {
                nome: nome,
                horas: horas,
            };

            firestore()
                .collection('disciplinas')
                .add(disciplina)
                .then(() => {
                    Alert.alert("Disciplina", "Cadastrada com sucesso!");
                    props.navigation.goBack();
                })
                .catch((error) => {
                    Alert.alert("Erro", String(error));
                });
        }
    }

    function verificaCampos() {
        if (!nome.trim() || !/^[A-Za-zÀ-ÿ\s]+$/.test(nome)) {
            Alert.alert("Validação", "O nome deve conter apenas letras e espaços.");
            return false;
        }
        if (!horas) {
            Alert.alert("Vaa carga horariae nascimento válida.");
            return false;
        }
        return true;
    }

    function limparCampos() {
        setNome('');
        setHoras('');
    }

    return (
        <View style={styles.containerPrincipal}>
            <Text style={styles.title}>CADASTRO DE DISCIPLINA</Text>

            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2913/2913465.png' }}
                style={styles.image}
            />

            <Text style={styles.label}>Nome:</Text>
            <TextInput
                placeholder="Nome da Disciplina"
                placeholderTextColor="#666"
                style={styles.input}
                value={nome}
                onChangeText={setNome}
            />

            <Text style={styles.label}>Carga Horária:</Text>
            <TextInput
                placeholder="Carga Horária:"
                placeholderTextColor="#666"
                style={styles.input}
                value={horas}
                onChangeText={setHoras}
                keyboardType="numeric"
            />

            <View style={styles.buttonContainer}>
                <Pressable style={styles.buttonCadastro} onPress={cadastrar}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </Pressable>
                <Pressable style={styles.buttonApagar} onPress={limparCampos}>
                    <Text style={styles.buttonText}>Apagar Campos</Text>
                </Pressable>
                <Pressable style={styles.botaoVoltar} onPress={() => props.navigation.goBack()}>
                    <Text style={styles.textoBotao}>Voltar</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default CadastroDisciplina;
