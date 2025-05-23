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
            const turmaSelecionada = turmas.find(turma => turma.id === turmaId);

            if (turmaSelecionada) {
                const dataFormatada = data_nascimento.replace(/[^0-9]/g, '');

                if (dataFormatada.length === 8) {
                    const data = `${dataFormatada.slice(4, 8)}-${dataFormatada.slice(2, 4)}-${dataFormatada.slice(0, 2)}`;

                    const dataParts = data.split('-');  // data no formato yyyy-mm-dd
                    const timestamp = Date.UTC(Number(dataParts[0]), Number(dataParts[1]) - 1, Number(dataParts[2]));  // mês começa do 0

                    if (isNaN(timestamp)) {
                        Alert.alert('Erro', 'Data de nascimento inválida');
                        return;
                    }

                    const aluno: Aluno = {
                        nome,
                        data_nascimento: timestamp,
                        email,
                        turma: turmaSelecionada,
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
                } else {
                    Alert.alert('Erro', 'Data de nascimento inválida');
                }
            } else {
                Alert.alert('Erro', 'Turma não encontrada!');
            }
        }
    };

    const verificaCampos = () => {
        if (!nome.trim() || !/^[A-Za-zÀ-ÿ\s]+$/.test(nome)) {
            Alert.alert('Validação', 'O nome deve conter apenas letras e espaços.');
            return false;
        }

        if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
            Alert.alert('Validação', 'Informe um e-mail válido.');
            return false;
        }

        if (!data_nascimento.trim() || data_nascimento.length < 10) {
            Alert.alert('Validação', 'Informe uma data de nascimento válida no formato dd/mm/yyyy.');
            return false;
        }

        if (!turmaId) {
            Alert.alert('Validação', 'Selecione uma turma.');
            return false;
        }

        return true;
    };


    const formatarDataNascimento = (text: string) => {
        let dataFormatada = text.replace(/[^0-9]/g, '');

        if (dataFormatada.length > 2 && dataFormatada.length <= 4) {
            dataFormatada = `${dataFormatada.slice(0, 2)}/${dataFormatada.slice(2)}`;
        } else if (dataFormatada.length > 4) {
            dataFormatada = `${dataFormatada.slice(0, 2)}/${dataFormatada.slice(2, 4)}/${dataFormatada.slice(4, 8)}`;
        }

        setDataNascimento(dataFormatada);
    };

    const limparCampos = () => {
        setNome('');
        setEmail('');
        setDataNascimento('');
        setTurmaId('');
    };

    return (
        <View style={styles.containerPrincipal}>
            <Text style={styles.title}>CADASTRO DO ALUNO</Text>

            <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/201/201818.png' }}
                style={styles.image}
            />

            <Text style={styles.label}>Nome:</Text>
            <TextInput
                placeholder="Nome do aluno/a"
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
                onChangeText={formatarDataNascimento}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Email:</Text>
            <TextInput
                placeholder="Email do aluno ou responsável"
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

export default CadastroAluno;
