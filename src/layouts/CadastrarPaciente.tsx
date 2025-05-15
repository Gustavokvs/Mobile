import React, { useState } from 'react';
import { Paciente } from "../types/Paciente";
import { View, Text, Image, ScrollView, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import firestore from "@react-native-firebase/firestore";
import { CadastrarPacienteProps } from '../navigation/HomeNavigator';



const CadastroPaciente = (props: CadastrarPacienteProps) => {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [comorbidade, setComorbidade] = useState('');

    function Cadastrar() {
        if (VerificarCampos()) {
            let Paciente = {
                nome: nome,
                email: email,
                telefone: telefone,
                comorbidade: comorbidade
            } as Paciente;


            firestore().collection('Paciente').add(Paciente).then(() => { Alert.alert("Paciente", "cadastrado com sucesso") })

        }
    }

    function VerificarCampos() {
        if (!nome) {
            Alert.alert("Campo nome vazio")
            return (false)
        }
        if (!email) {
            Alert.alert("Campo email vazio")
            return (false)
        }
        if (!telefone) {
            Alert.alert("Campo telefone vazio")
            return (false)
        }
        if (!comorbidade) {
            Alert.alert("Campo comorbidade vazio")
            return (false)

        }

        return (true)

    }


    return (
        <View>

        </View>
    )



}

export default CadastroPaciente;