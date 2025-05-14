import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { ListarProps } from '../navigation/HomeNavigator';

const Listar = (props: ListarProps) => {
    const [nomeLista, setNomeLista] = useState<string[]>([]); // Cria a lista
    const [campoTexto, setCampoTexto] = useState<string>(''); // Campo de digitação
    const [campoSelecionado, setCampoSelecionado] = useState<string>(''); // Campo onde vai mostrar o item clicado

    const adicionar = (nome: string) => {
        setNomeLista((burro) => [...burro, nome]); // Adiciona o nome digitado à lista
        setCampoTexto(''); // Limpa o campo de texto depois de adicionar
    };

    function selecionar(selecionado: string) {
        setCampoSelecionado(selecionado); // Atualiza o campo selecionado
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='Digite o nome a adicionar'
                value={campoTexto}
                onChangeText={setCampoTexto}
                style={styles.input}
            />

            <Pressable onPress={() => adicionar(campoTexto)} style={styles.botao}>
                <Text style={styles.botaoTexto}>Adicionar</Text>
            </Pressable>

            {/* Lista com os nomes adicionados */}
            <FlatList
                style={styles.lista}
                data={nomeLista}
                renderItem={({ item }) => {
                    return <ItemSimples item={item} onClick={selecionar} />;
                }}
            />

            {/* Mostra o item clicado na lista */}
            <Text style={styles.resultado}>Selecionado: {campoSelecionado}</Text>

            <Pressable onPress={() => props.navigation.goBack()} style={styles.botaoVoltar}>
                <Text style={styles.botaoTexto}>Voltar</Text>
            </Pressable>
        </View>
    );
};

// ItemSimples para renderizar os itens da lista
type ItemProps = {
    item: string;
    onClick: (itemLista: string) => void;
};

const ItemSimples = (props: ItemProps) => {
    return (
        <Pressable onPress={() => { props.onClick(props.item) }} style={styles.itemLista}>
            <Text style={styles.itemTexto}>{props.item}</Text>
        </Pressable>
    );
};

// Estilos da tela
const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
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
    lista: {
        maxHeight: 200, // Limita o tamanho para não empurrar o texto para baixo
        marginBottom: 15,
    },
    itemLista: {
        padding: 10,
        backgroundColor: '#f2f2f2',
        marginBottom: 5,
        borderRadius: 4,
    },
    itemTexto: {
        fontSize: 16,
    },
    resultado: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
    },
    // Estilo específico para o botão "Voltar"
    botaoVoltar: {
        backgroundColor: '#f44336', // Cor de fundo vermelha para o botão Voltar
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 15,
    },
});

export default Listar;
