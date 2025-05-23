import { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';

import { styles } from '../styles/styles';
import { AlterarCadProfessorProps } from '../navigation/HomeNavigator';
import { Professor } from '../types/Professor';
import { Disciplina } from '../types/Disciplina';

const AlterarProfessor = (props: AlterarCadProfessorProps) => {
    const { id } = props.route.params;

    const [professor, setProfessor] = useState<Professor>({
        id: '',
        nome: '',
        telefone: 0,
        disciplina: {} as Disciplina,
    });

    const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
    const [disciplinaId, setDisciplinaId] = useState('');

    useEffect(() => {
        // Buscar disciplinas para o Picker
        const unsubscribe = firestore()
            .collection('disciplinas')
            .onSnapshot(snapshot => {
                const lista = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...(doc.data() as Omit<Disciplina, 'id'>),
                }));
                setDisciplinas(lista);
            });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        // Buscar dados do professor
        firestore()
            .collection('professor')
            .doc(id)
            .get()
            .then(doc => {
                if (doc.exists) {
                    const data = doc.data() as Professor;
                    setProfessor({
                        id: doc.id,
                        nome: data.nome,
                        telefone: data.telefone,
                        disciplina: data.disciplina,
                    });
                    setDisciplinaId(data.disciplina?.id ?? '');
                } else {
                    Alert.alert('Erro', 'Professor não encontrado.');
                    props.navigation.goBack();
                }
            })
            .catch(error => {
                console.error('Erro ao buscar professor:', error);
                Alert.alert('Erro', 'Erro ao buscar dados.');
                props.navigation.goBack();
            });
    }, [id]);

    const validarCampos = () => {
        if (!professor.nome.trim() || !/^[A-Za-zÀ-ÿ\s]+$/.test(professor.nome)) {
            Alert.alert('Validação', 'O nome deve conter apenas letras e espaços.');
            return false;
        }
        const telefoneStr = professor.telefone.toString();
        if (!telefoneStr.trim() || !/^\d{8,15}$/.test(telefoneStr)) {
            Alert.alert('Validação', 'Digite um telefone válido com apenas números (mínimo 8 dígitos).');
            return false;
        }
        if (!disciplinaId) {
            Alert.alert('Validação', 'Selecione uma disciplina.');
            return false;
        }

        return true;
    };

    const salvarAlteracoes = () => {
        if (!validarCampos()) return;

        const disciplinaSelecionada = disciplinas.find(d => d.id === disciplinaId);
        if (!disciplinaSelecionada) {
            Alert.alert('Erro', 'Disciplina não encontrada.');
            return;
        }

        firestore()
            .collection('professor')
            .doc(id)
            .update({
                nome: professor.nome,
                telefone: professor.telefone,
                disciplina: disciplinaSelecionada,
            })
            .then(() => {
                Alert.alert('Sucesso', 'Professor atualizado com sucesso!');
                props.navigation.goBack();
            })
            .catch(error => {
                console.error('Erro ao atualizar professor:', error);
                Alert.alert('Erro', 'Não foi possível atualizar os dados.');
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Alterar Professor</Text>

            <Text style={styles.label}>Nome da professor/a:</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={professor.nome}
                onChangeText={(text) => setProfessor({ ...professor, nome: text })}
            />

            <Text style={styles.label}>Número de telefone:</Text>
            <TextInput
                style={styles.input}
                placeholder="Telefone"
                keyboardType="numeric"
                value={professor.telefone.toString()}
                onChangeText={(text) => setProfessor({ ...professor, telefone: Number(text) })}
            />

            <Text style={styles.label}>Disciplina:</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={disciplinaId}
                    onValueChange={(itemValue) => setDisciplinaId(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Selecione uma disciplina" value="" />
                    {disciplinas.map((disciplina) => (
                        <Picker.Item
                            key={disciplina.id}
                            label={disciplina.nome}
                            value={disciplina.id}
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

export default AlterarProfessor;
