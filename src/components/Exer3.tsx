import React from 'react';
import { Text } from 'react-native';
import { styles } from '../styles/styles';

type alunoMedia = {
    aluno: string;
    nota1: number;
    nota2: number;
}

const FazerMedia = (props: alunoMedia) => {
    const media = (props.nota1 + props.nota2) / 2;
    return (
        <Text> {props.aluno}  tem nota {props.nota1} + {props.nota2} média final: {media}  </Text>

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
export default VerMedia

