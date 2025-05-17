import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Switch, Pressable, Alert, Image, FlatList, StyleSheet } from 'react-native';
import { Paciente } from '../types/Paciente';
import firestore from "@react-native-firebase/firestore";
import { styles } from '../styles/styles';
import { ConsultarPacienteProps } from '../navigation/HomeNavigator';
import { useNavigation } from '@react-navigation/native';

const ConsultarPaciente = (props: ConsultarPacienteProps) => {

    const [paciente, setPaciente] = useState<Paciente[]>([]);
    const navigation = useNavigation();

    useEffect(() => {
        const subscribe = firestore()
            .collection('Paciente').onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                }) as Paciente[];
                setPaciente(data);
            });
        return () => subscribe();
    }, []);

    function deletarPaciente(id: string) {
        firestore()
            .collection('Paciente')  // Alterado para 'Paciente'
            .doc(id)
            .delete()
            .then(() => {
                Alert.alert("Paciente", "Removido com sucesso")
            })
            .catch((error) => console.log(error));
    }

    return (
        <View style={styles.tela}>

            <Text style={styles.tituloTela}>Listagem de Produtos</Text>
            <FlatList
                data={paciente}
                renderItem={(info) =>
                    <ItemPaciente
                        numeroOrdem={info.index + 1}
                        prod={info.item}
                        onDeletar={deletarPaciente} />} />


            <View
                style={styles.centralizar}>
                <Pressable
                    style={[styles.botao, { width: '40%' }]}
                    onPress={() => { props.navigation.goBack() }}>
                    <Text style={styles.texto_botao}>Voltar</Text>
                </Pressable>
            </View>
        </View>
    );
}

type ItemPacienteProps = {
    numeroOrdem: number;
    prod: Paciente;
    onDeletar: (id: string) => void;
}

const ItemPaciente = (props: ItemPacienteProps) => {

    return (
        <View style={styles_local.card}>
            <View style={styles_local.dados_card}>
                <Text style={{ fontSize: 30, color: 'black' }}>
                    {props.numeroOrdem + ' - ' + props.prod.nome}
                </Text>
                <Text style={{ fontSize: 20 }}>
                    Id: {props.prod.id}
                </Text>
                <Text style={{ fontSize: 20 }}>
                    Idade: {props.prod.email} email
                </Text>
                <Text style={{ fontSize: 20 }}>
                    CPF: {props.prod.telefone} telefone
                </Text>
                <Text style={{ fontSize: 20 }}>
                    Endereço: {props.prod.comorbidade} Comorbidade
                </Text>
            </View>

            <View style={styles_local.botoes_card}>
                <View style={styles_local.botao_deletar}>
                    <Pressable onPress={() => props.prod.id && props.onDeletar(props.prod.id)}>
                        <Text style={styles_local.texto_botao_card}>X</Text>
                    </Pressable>
                </View>


            </View>
        </View>
    );
}

const styles_local = StyleSheet.create({
    card: {
        borderWidth: 2,
        borderColor: 'grey',
        margin: 5,
        borderRadius: 10,
        padding: 3,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    dados_card: {
        flex: 1
    },
    botoes_card: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    botao_deletar: {
        backgroundColor: 'red',
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botao_alterar: {
        backgroundColor: 'yellow',
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    texto_botao_card: {
        fontWeight: "bold",
        fontSize: 40,
        color: 'black'
    }
});

export default ConsultarPaciente;
