import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const Listar = () => {

    const [nomeLista, setNomeLista] = useState<string[]>([]) //CRIA A LISTA
    const [campoTexto, setCampoTexto] = useState<string>('') //CAMPO DE DIGITAÇÃO
    const [campoSelecionado, setCampoSelecionado] = useState<string>('') //CAMPO ONDE VAI MOSTRAR O ITEM CLICADO

    const adicionar = (nome: string) => {

        setNomeLista((burro) => [...burro, nome]); //ADICIONA O NOME DIGITADO À LISTA

        setCampoTexto('') //LIMPA O CAMPO DE TEXTO DEPOIS DE ADICIONAR
    }

    function selecionar(selecionado: string) {
        /* A FUNÇÃO SELECIONAR RECEBE UMA STRING (QUE É A MESMA DO ITEMSIMPLES (ONCLICK)) */
        setCampoSelecionado(selecionado)
        /* ELE ATUALIZA O CAMPOSELECIONADO (COM O VALOR DE ONCLICK DO ITEMSIMPLES)
        FAZENDO COM QUE O CAMPOSELECIONADO SEJA O MESMO NOME QUE O ITEM */
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

            {/* AQUI É A LISTA COM OS NOMES ADICIONADOS */}
            <FlatList
                style={styles.lista}
                data={nomeLista} //o tipo de dados q eu vou ler, nesse caso é  que tem a propriedade de listaProps

                //o renderItem é ele MOSTRAR esse dado em forma de "quebrado", eu escolho oq quero q mostre
                renderItem={(coisaNaLista /*nome que eu quiser dar pra variavel*/) => {
                    return (
                        /* CHAMO O COMPONENTE ITEMSIMPLES (SEGUINDO AS REGRAS DE 
                        ITEMPROPS) PARA MOSTRAR O ITEM */
                        <ItemSimples item={coisaNaLista.item} onClick={selecionar} />
                        /* item (DE ITEMSIMPLES PROPS.ITEM) RECEBE COMO STRING O NOME DA LISTA */
                        /* onClick (DE ITEMSIMPLES, JÁ ESTAVA DEFINIDO PARA TER A MESMA STRING
                        DO QUE O ITEM) EXECUTA O MÉTODO SELECIONAR, QUE POR SUA VEZ RECEBE A STRING
                        DO ONCLICK (MESMA DO ITEM), ATUALIZANDO O CAMPOSELECIONADO.
                        */
                    )
                }}
            />

            {/* MOSTRA O ITEM CLICADO NA LISTA */}
            <Text style={styles.resultado}>Selecionado: {campoSelecionado}</Text>
        </View>
    )
}

/*ISSO É UMA PROPS (BASICAMENTE UM PARÂMETRO) QUE ESTÁ SENDO CRIADO PARA
SIMPLIFICAR A PASSAGEM DO ITEM (NOME)*/
type ItemProps = {
    item: string; //UMA STRING DEVE SER PASSADA
    onClick: (itemLista: string) => void //UMA FUNÇÃO QUE PEGA O VALOR DE UMA STRING E NÃO FAZ NADA
}

const ItemSimples = (props: ItemProps) => { //UMA CONSTANTE QUE TEM Q OBEDECER O "PARÂMETRO" ITEMPROPS
    return (
        //UM BOTÃO QUE AO SER APERTADO, CHAMA A FUNÇÃO ONCLICK (DO ITEMPROPS) E PASSA A STRING COMO
        //O PRÓPRIO ITEM (STRING) DO ITEMPROPS
        <Pressable onPress={() => { props.onClick(props.item) }} style={styles.itemLista}>
            <Text style={styles.itemTexto}>
                {props.item}
            </Text>
        </Pressable>
    );
}

// ESTILOS DA TELA
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
        maxHeight: 200, // LIMITA O TAMANHO PRA NÃO EMPURRAR O TEXTO PRA BAIXO
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
});

export default Listar;
