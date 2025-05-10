import React, { useState } from 'react';
import { styles } from '../styles/styles';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';



const Listar = () => {

    const [nomeLista, setNomeLista] = useState<string[]>([])
    const [campoTexto, setCampoTexto] = useState<string>('')
    const adicionar = (nome: string) => {

        setNomeLista((burro) => [...burro, nome]);

        setCampoTexto('')
    }
    return (

        <View>
            <TextInput placeholder='Digite o nome a adicionar'
                value={campoTexto} onChangeText={setCampoTexto} />
            <Pressable onPress={() => adicionar(campoTexto)}>
                <Text> Adicionar </Text>
            </Pressable>

            <FlatList
                data={nomeLista} //o tipo de dados q eu vou ler, nesse caso é  que tem a propriedade de listaProps

                //o renderItem é ele MOSTRAR esse dado em forma de "quebrado", eu escolho oq quero q mostre
                renderItem={(coisaNaLista /*nome que eu quiser dar pra variavel*/) => {
                    return (
                        <Text>
                            nome: {coisaNaLista.item}
                        </Text> /* eu to ali em cima só dizendo que quero q me mostre o ITEM (nome) que contem na minha lista*/
                    )
                }}
            />
        </View>
    )
}
export default Listar