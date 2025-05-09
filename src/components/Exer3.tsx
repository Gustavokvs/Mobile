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

    return (
        <View>
            <Text>{props.aluno} tem nota {props.nota1} + {props.nota2}. Média final: {media}</Text>

            {
                media === 0 ?
                    <Text>Nem veio</Text>
                    :
                    (media >= 7 ?
                        <Text>Parabéns pelo esforço, não fez mais que o mínimo</Text>
                        :
                        <Text>Reprovado, deveria ter se esforçado mais</Text>
                    )
            }
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

export default FazerMedia;
