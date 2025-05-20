import { Alert, Image, Pressable, Text, TextInput, View } from 'react-native';
import { styles } from '../styles/styles';
import { useState, useEffect } from 'react';
import { Aluno } from '../types/Aluno';
import { CadastroAlunoProps } from '../navigation/HomeNavigator';
import firestore from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import { Turma } from '../types/Turma';

const CadastroAluno = (props: CadastroAlunoProps) => {
    const [nome, setNome] = useState('');
    const [data_nascimento, setDataNascimento] = useState('');
    const [email, setEmail] = useState('');
    const [turmaId, setTurmaId] = useState('');
    const [turmas, setTurmas] = useState<Turma[]>([]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('turmas')
            .onSnapshot(snapshot => {
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...(doc.data() as Omit<Turma, 'id'>),
                }));
                setTurmas(data);
            });
        return () => unsubscribe();
    }, []);

    const cadastrar = () => {
        if (verificaCampos()) {
            const aluno: Aluno = {
                nome,
                data_nascimento: parseInt(data_nascimento, 10),
                email,
                turmaId,
            };

            firestore()
                .collection('aluno')
                .add(aluno)
                .then(() => {
                    Alert.alert('Aluno', 'Cadastrado com sucesso!');
                    props.navigation.goBack();
                })
                .catch(error => {
                    Alert.alert('Erro', String(error));
                });
        }
    };

    const verificaCampos = () => {
        if (!nome) {
            Alert.alert('Nome em branco', 'Digite um nome');
            return false;
        }
        if (!data_nascimento) {
            Alert.alert('Data de nascimento em branco', 'Digite uma data de nascimento');
            return false;
        }
        if (!email) {
            Alert.alert('Email em branco', 'Digite um email');
            return false;
        }
        if (!turmaId) {
            Alert.alert('Turma não selecionada', 'Selecione uma turma');
            return false;
        }
        return true;
    };

    const limparCampos = () => {
        setNome('');
        setEmail('');
        setDataNascimento('');
        setTurmaId('');
    };

    return (
        <View style={styles.containerPrincipal}>
            <Text style={styles.title}>CADASTRO</Text>

            <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2355/2355692.png' }}
                style={styles.image}
            />

            <Text style={styles.label}>Nome:</Text>
            <TextInput
                placeholder="Informe o nome"
                placeholderTextColor="#666"
                style={styles.input}
                value={nome}
                onChangeText={setNome}
            />

            <Text style={styles.label}>Data de nascimento:</Text>
            <TextInput
                placeholder="Digite a data de nascimento"
                placeholderTextColor="#666"
                style={styles.input}
                value={data_nascimento}
                onChangeText={setDataNascimento}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Email:</Text>
            <TextInput
                placeholder="Informe o email"
                placeholderTextColor="#666"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <Text style={styles.label}>Turma:</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={turmaId}
                    onValueChange={itemValue => setTurmaId(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Selecione uma turma" value="" />
                    {turmas.map(turma => (
                        <Picker.Item key={turma.id} label={turma.nome} value={turma.id} />
                    ))}
                </Picker>
            </View>

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

export default CadastroAluno;
