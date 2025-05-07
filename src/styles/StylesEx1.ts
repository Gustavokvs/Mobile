import React from 'react';
import { Text } from 'react-native';
import { styles } from './styles';
import { StyleSheet, View } from "react-native";





const StylesEx1 = StyleSheet.create({

    titulo: {
        marginTop: 100, flex: 1, alignItems: 'center'
    },

    painel: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },
    imagem: {

        marginTop: 50, marginBottom: 50, width: 100, height: 100
    },
    camposEscritos: {

        fontSize: 22,
        fontWeight: '500',
        marginBottom: 5,  // Espaço abaixo de cada campo de texto
        textAlign: 'center', // Alinha o texto ao centro

    },
    campoContainer: {

        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,  // Espaçamento entre cada campo
        width: '100%',
    },
    input: {

        height: 40,
        borderColor: 'gray',
        borderWidth: 1, 
        borderRadius: 5, 
        paddingLeft: 10, 
        marginTop: 10, 
        width: '50%', 

    },
    botoes: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        width: '60%',
        marginBottom: 80
    }
})

export { StylesEx1 }