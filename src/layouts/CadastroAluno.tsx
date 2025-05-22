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

    // Carregar as turmas disponíveis
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

    // Função para cadastrar o aluno
    const cadastrar = () => {
        if (verificaCampos()) {
            // Encontrar a turma com base no turmaId selecionado
            const turmaSelecionada = turmas.find(turma => turma.id === turmaId);

            if (turmaSelecionada) {
                // Remover os caracteres não numéricos da data
                const dataFormatada = data_nascimento.replace(/[^0-9]/g, '');

                // Verificar se a data tem o formato correto (ddmmyyyy)
                if (dataFormatada.length === 8) {
                    // Formatar a data para o formato 'yyyy-mm-dd' para criar um objeto Date válido
                    const data = `${dataFormatada.slice(4, 8)}-${dataFormatada.slice(2, 4)}-${dataFormatada.slice(0, 2)}`;

                    // Criar o objeto Date e garantir que seja no UTC (para evitar problemas com fusos horários)
                    const dataParts = data.split('-');  // data no formato yyyy-mm-dd
                    const timestamp = Date.UTC(Number(dataParts[0]), Number(dataParts[1]) - 1, Number(dataParts[2]));  // mês começa do 0

                    if (isNaN(timestamp)) {
                        Alert.alert('Erro', 'Data de nascimento inválida');
                        return;
                    }

                    const aluno: Aluno = {
                        nome,
                        data_nascimento: timestamp, // Salva a data como timestamp
                        email,
                        turma: turmaSelecionada, // Agora associamos o objeto da turma ao aluno
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

    // Verificar se os campos estão preenchidos corretamente
    const verificaCampos = () => {
        if (!nome.trim() || !/^[A-Za-zÀ-ÿ\s]+$/.test(nome)) {
            Alert.alert("Validação", "O nome deve conter apenas letras e espaços.");
            return false;
        }

        if (!data_nascimento || !/^\d{2}\/\d{2}\/\d{4}$/.test(data_nascimento)) {
            Alert.alert("Validação", "Informe uma data de nascimento válida no formato dd/mm/aaaa.");
            return false;
        }

        if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
            Alert.alert("Validação", "Informe um e-mail válido.");
            return false;
        }
        if (!turmaId) {
            Alert.alert('Turma não selecionada', 'Selecione uma turma');
            return false;
        }
        return true;
    };

    // Função para formatar a data conforme o usuário digita
    const formatarDataNascimento = (text: string) => {
        // Remove todos os caracteres não numéricos
        let dataFormatada = text.replace(/[^0-9]/g, '');

        // Adiciona a barra após o dia, mês e ano, se houver
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
                onChangeText={formatarDataNascimento}  // Aqui chamamos a função que formata a data
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
