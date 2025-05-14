import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { CampoProps } from '../navigation/HomeNavigator';

const CampoDeTexto = (props: CampoProps) => {
    const [texto, setTexto] = useState('');

    return (
        <View style={styles.container}>

            <TextInput 
                value={texto} 
                onChangeText={setTexto}
                placeholder='Digite algo aqui'
                style={styles.input} 
            />

            <Pressable 
                onPress={() => { 
                    props.route.params.onPressBotao && props.route.params.onPressBotao(texto); 
                }} 
                style={styles.botao}
            >
                <Text style={styles.botaoTexto}>Acionar botão</Text>
            </Pressable>

            <Pressable 
                onPress={() => { 
                    props.navigation.goBack(); 
                }} 
                style={styles.botaoVoltar}
            >
                <Text style={styles.botaoTexto}>Voltar</Text>
            </Pressable>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
        fontSize: 16,
    },
    botao: {
        backgroundColor: '#007bff',
        padding: 12,
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 15,
    },
    botaoTexto: {
        color: 'white',
        fontWeight: 'bold',
    },
    botaoVoltar: {
        backgroundColor: '#f44336', // Cor para o botão voltar (vermelho)
        padding: 12,
        alignItems: 'center',
        borderRadius: 5,
    },
});

export default CampoDeTexto;
