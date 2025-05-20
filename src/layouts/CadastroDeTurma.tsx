import { Alert, Pressable, Text, TextInput, View, Image } from 'react-native';
import { styles } from '../styles/styles';
import { useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { CadastroTurmaProps } from '../navigation/HomeNavigator';
import { useNavigation } from '@react-navigation/native';



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

    function verificaCampos() {
        if (!nome) {
            Alert.alert("Nome em branco", "Digite um nome");
            return false;
        }
        if (!sala) {
            Alert.alert("Sala em branco", "Digite uma sala");
            return false;
        }
        if (!turno) {
            Alert.alert("Turno em branco", "Digite o turno");
            return false;
        }
        return true;
    }

    function limparCampos() {
        setNome('');
        setSala('');
        setTurno('');
    }

    return (
        <View style={styles.containerPrincipal}>
            <Text style={styles.title}>CADASTRO DE TURMA</Text>

            <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2933/2933245.png' }}
                style={styles.image}
            />

            <Text style={styles.label}>Nome da Turma:</Text>
            <TextInput
                placeholder="Ex: 3º Ano A"
                placeholderTextColor="#666"
                style={styles.input}
                value={nome}
                onChangeText={setNome}
            />

            <Text style={styles.label}>Sala:</Text>
            <TextInput
                placeholder="Ex: Sala 102"
                placeholderTextColor="#666"
                style={styles.input}
                value={sala}
                onChangeText={setSala}
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
                <Pressable style={styles.button} onPress={cadastrar}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </Pressable>
                <Pressable style={[styles.button, styles.cancelButton]} onPress={limparCampos}>
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
