import { Alert, Pressable, Text, TextInput, View, Image } from 'react-native';
import { styles } from '../styles/styles';
import { useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { CadastroTurmaProps } from '../navigation/HomeNavigator';



const CadastroTurma = (props: CadastroTurmaProps) => {
    const [nome, setNome] = useState('');
    const [sala, setSala] = useState('');
    const [turno, setTurno] = useState('');

    function cadastrar() {
        if (verificaCampos()) {
            const turma = {
                nome: nome,
                sala: sala,
                turno: turno
            };

            firestore()
                .collection('turmas')
                .add(turma)
                .then(() => {
                    Alert.alert("Turma", "Cadastrada com sucesso!");
                    props.navigation.goBack();
                })
                .catch((error) => {
                    Alert.alert("Erro", String(error));
                });
        }
    }

    const verificaCampos = () => {
        if (!nome.trim() || !/^[A-Za-zÀ-ÿ0-9\s]+$/.test(nome)) {
            Alert.alert("Validação", "O nome da turma deve conter letras, números ou espaços.");
            return false;
        }

        if (!sala.trim() || !/^[0-9]+$/.test(sala)) {
            Alert.alert("Validação", "A sala deve conter apenas números.");
            return false;
        }

        if (!turno.trim() || !/^(Manhã|Tarde|Noite)$/i.test(turno)) {
            Alert.alert("Validação", "Turno inválido. Use: Manhã, Tarde ou Noite.");
            return false;
        }

        return true;
    };


    function limparCampos() {
        setNome('');
        setSala('');
        setTurno('');
    }

    return (
        <View style={styles.containerPrincipal}>
            <Text style={styles.title}>CADASTRO DE TURMA</Text>

            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3062/3062634.png' }}
                style={styles.image}
            />

            <Text style={styles.label}>Nome:</Text>
            <TextInput
                placeholder="Ex: 3ºA"
                placeholderTextColor="#666"
                style={styles.input}
                value={nome}
                onChangeText={setNome}
            />

            <Text style={styles.label}>Sala:</Text>
            <TextInput
                placeholder="Ex: 102"
                placeholderTextColor="#666"
                style={styles.input}
                value={sala}
                onChangeText={setSala}
                keyboardType="numeric"

            />

            <Text style={styles.label}>Turno:</Text>
            <TextInput
                placeholder="Ex: Manhã"
                placeholderTextColor="#666"
                style={styles.input}
                value={turno}
                onChangeText={setTurno}
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

export default CadastroTurma;
