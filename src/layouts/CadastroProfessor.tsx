import { Alert, Image, Pressable, Text, TextInput, View } from 'react-native';
import { styles } from '../styles/styles';
import { useState, useEffect } from 'react';
import { Professor } from '../types/Professor';
import { CadastroProfessorProps } from '../navigation/HomeNavigator';
import firestore from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import { Disciplina } from '../types/Disciplina';

const CadastroProfessor = (props: CadastroProfessorProps) => {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [disciplinaId, setDisciplinaId] = useState('');
    const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('disciplinas')
            .onSnapshot(snapshot => {
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...(doc.data() as Omit<Disciplina, 'id'>),
                }));
                setDisciplinas(data);
            });
        return () => unsubscribe();
    }, []);

    const cadastrar = async () => {
        if (verificaCampos()) {
            const disciplinaSelecionada = disciplinas.find(d => d.id === disciplinaId);

            if (!disciplinaSelecionada) {
                Alert.alert('Erro', 'Disciplina não encontrada.');
                return;
            }

            const professor: Professor = {
                nome,
                telefone: parseInt(telefone, 10),
                disciplina: disciplinaSelecionada,  // Agora estamos salvando o objeto completo da disciplina
            };

            try {
                await firestore().collection('professor').add(professor); // Aqui deve ser 'professor' e não 'aluno'
                Alert.alert('Professor', 'Cadastrado com sucesso!');
                props.navigation.goBack();
            } catch (error) {
                Alert.alert('Erro', String(error));
            }
        }
    };

    const verificaCampos = () => {
        if (!nome) {
            Alert.alert('Nome em branco', 'Digite um nome');
            return false;
        }
        if (!telefone) {
            Alert.alert('Telefone em branco', 'Digite um telefone');
            return false;
        }
        if (!disciplinaId) {
            Alert.alert('Disciplina em branco', 'Escolha uma disciplina');
            return false;
        }
        return true;
    };

    const limparCampos = () => {
        setNome('');
        setTelefone('');
        setDisciplinaId('');
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

            <Text style={styles.label}>Telefone:</Text>
            <TextInput
                placeholder="Digite o telefone"
                placeholderTextColor="#666"
                style={styles.input}
                value={telefone}
                onChangeText={setTelefone}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Disciplina:</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={disciplinaId}
                    onValueChange={itemValue => setDisciplinaId(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Selecione uma disciplina" value="" />
                    {disciplinas.map(disciplina => (
                        <Picker.Item key={disciplina.id} label={disciplina.nome} value={disciplina.id} />
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

export default CadastroProfessor;
