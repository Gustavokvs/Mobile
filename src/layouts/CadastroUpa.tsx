import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, FlatList, StyleSheet } from 'react-native';
import { PacienteUpaProps } from '../navigation/HomeNavigator';


type novoPaciente = {
    nome: string;
    idade: string;
    enfermidade: string;
    risco: string;
};

const PacienteUpa = (props: PacienteUpaProps) => {

    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [enfermidade, setEnfermidade] = useState('');
    const [risco, setRisco] = useState('');
    const [filaAtendimento, setFilaAtendimento] = useState<novoPaciente[]>([]);

    const CadastrarPaciente = () => {
        if (nome === '' || idade === '' || enfermidade === '' || isNaN(Number(risco)) || Number(risco) < 1 || Number(risco) > 5) {
            Alert.alert('Preencha os campos adequadamente por favor.')
        } else {
            const novoPaciente = {
                nome,
                idade,
                enfermidade,
                risco
            };

            setFilaAtendimento([...filaAtendimento, novoPaciente]);

            setNome('');
            setIdade('');
            setEnfermidade('');
            setRisco('');

            // Mostrar alerta de sucesso
            Alert.alert('Paciente cadastrado com sucesso');
        }
    };

    const declararRisco = (risco: string) => {
        return risco == '1' ? 'blue' :
            risco == '2' ? 'green' :
                risco == '3' ? 'yellow' :
                    risco == '4' ? 'orange' :
                        risco == '5' ? 'red' : '';
    };

    return (
        <View style={styles.container}>
            <Text>Nome do Paciente:</Text>
            <TextInput
                value={nome}
                onChangeText={setNome}
                placeholder="Digite o nome"
                style={styles.input}
            />

            <Text>Idade:</Text>
            <TextInput
                value={idade}
                onChangeText={setIdade}
                placeholder="Digite a idade"
                style={styles.input}
            />

            <Text>Enfermidade:</Text>
            <TextInput
                value={enfermidade}
                onChangeText={setEnfermidade}
                placeholder="Digite a enfermidade"
                style={styles.input}
            />

            <Text>Risco (1-5):</Text>
            <TextInput
                value={risco}
                onChangeText={setRisco}
                placeholder="Nível de risco (1-5)"
                style={styles.input}
            />

            <Pressable onPress={CadastrarPaciente} style={styles.botao}>
                <Text style={styles.botaoTexto}>Cadastrar</Text>
            </Pressable>


            <FlatList
                data={filaAtendimento}
                renderItem={({ item }) => (
                    <View style={[styles.itemContainer, { borderColor: declararRisco(item.risco) }]}>
                        <Text>{item.nome}</Text>
                        <Text>{item.idade} anos</Text>
                        <Text>{item.enfermidade}</Text>
                        <Text style={{ color: declararRisco(item.risco) }}>Risco: {item.risco}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    botao: {
        backgroundColor: '#007bff',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 15,
    },
    botaoTexto: {
        color: 'white',
        fontWeight: 'bold',
    },
    itemContainer: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        borderWidth: 2,
    },
});

export default PacienteUpa;
