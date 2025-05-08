import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/styles';

type alunoMedia = {
    aluno: string;
    nota1: number;
    nota2: number;
}

const FazerMedia = (props: alunoMedia) => {
    const media = (props.nota1 + props.nota2) / 2;

    function aprovar() {


        if (media >= 7) {
            return 'Aprovado';
        } else {
            return 'Reprovado';
        }

    }

    return (
        <View>
            <Text> {props.aluno}  tem nota {props.nota1} + {props.nota2} média final: {media} </Text>
            <Text> {aprovar()} </Text>
        </View>
    );

};

const VerMedia = () => {
    return (
        <FazerMedia
            aluno={'gustavo'}
            nota1={5}
            nota2={8}

        />
    );
};
export default FazerMedia

