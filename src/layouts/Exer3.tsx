import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { FazerMediaProps } from '../navigation/HomeNavigator';

const FazerMedia = (props: FazerMediaProps) => {
    const media = (props.route.params.nota1 + props.route.params.nota2) / 2;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {props.route.params.aluno} tem nota {props.route.params.nota1} + {props.route.params.nota2}. Média final: {media}
            </Text>

            {
                media === 0 ? (
                    <Text style={styles.warningText}>Nem veio</Text>
                ) : (
                    media >= 7 ? (
                        <Text style={styles.successText}>Parabéns pelo esforço, não fez mais que o mínimo</Text>
                    ) : (
                        <Text style={styles.errorText}>Reprovado, deveria ter se esforçado mais</Text>
                    )
                )
            }

            <Pressable onPress={() => { props.navigation.goBack(); }} style={styles.button}>
                <Text style={styles.buttonText}>Voltar</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    warningText: {
        color: 'red',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },
    successText: {
        color: 'green',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },
    errorText: {
        color: 'orange',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },
    button: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default FazerMedia;
