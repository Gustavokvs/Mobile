import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { PrincipalProps } from '../navigation/HomeNavigator';
import { styles } from '../styles/styles';

const TelaPrincipal = (props: PrincipalProps) => {
  return (
    <View style={styles.containerTela}>
      <Text style={styles.tituloTela}>CADASTRO ESCOLAR</Text>


{/* <Pressable onPress={() => props.navigation.navigate('TelaNova')} style={styles.button}>
        <Text style={styles.buttonText}>Botão navegar</Text>
      </Pressable>

      <Pressable onPress={() => {
        props.navigation.navigate('CampoDeTexto', {
          onPressBotao: (nome: string) => {
            Alert.alert(nome);
          }
        });
      }} style={styles.button}>
        <Text style={styles.buttonText}>Alert </Text>
      </Pressable>

      <Pressable onPress={() => {
        props.navigation.navigate('FazerMedia', { aluno: 'Gustavo', nota1: 1, nota2: 3 });
      }} style={styles.button}>
        <Text style={styles.buttonText}>Ver média</Text>
      </Pressable>

      <Pressable onPress={() => props.navigation.navigate('Listar')} style={styles.button}>
        <Text style={styles.buttonText}>Lista de nomes</Text>
      </Pressable>

      <Pressable onPress={() => props.navigation.navigate('TelaEx1')} style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar Paciente</Text>
      </Pressable>

      <Pressable onPress={() => props.navigation.navigate('ConsultarPaciente')} style={styles.button}>
        <Text style={styles.buttonText}>Consultar Paciente</Text>
      </Pressable>

      <Pressable onPress={() => props.navigation.navigate('PacienteUpa')} style={styles.button}>
        <Text style={styles.buttonText}>Upa Cadastro</Text>
      </Pressable> */}

      <Text style={styles.sectionTitle}>Cadastro</Text>
      <View style={styles.sectionContainer}>
        <Pressable
          onPress={() => props.navigation.navigate('CadastroAluno')}
          style={styles.buttonTela}
        >
          <Text style={styles.buttonTextTela}>Cadastrar Aluno</Text>
        </Pressable>

        <Pressable
          onPress={() => props.navigation.navigate('CadastroTurma')}
          style={styles.buttonTela}
        >
          <Text style={styles.buttonTextTela}>Cadastro de Turma</Text>
        </Pressable>

        <Pressable
          onPress={() => props.navigation.navigate('CadastroProfessor')}
          style={styles.buttonTela}
        >
          <Text style={styles.buttonTextTela}>Cadastro Professor</Text>
        </Pressable>

        <Pressable
          onPress={() => props.navigation.navigate('CadastroDisciplina')}
          style={styles.buttonTela}
        >
          <Text style={styles.buttonTextTela}>Cadastro Disciplina</Text>
        </Pressable>
      </View>

      {/* Seção Consulta */}
      <Text style={styles.sectionTitle}>Consulta</Text>
      <View style={styles.sectionContainer}>
        <Pressable
          onPress={() => props.navigation.navigate('ConsultaAluno')}
          style={styles.buttonTela}
        >
          <Text style={styles.buttonTextTela}>Consultar Alunos</Text>
        </Pressable>

        <Pressable
          onPress={() => props.navigation.navigate('TelaConsTurma')}
          style={styles.buttonTela}
        >
          <Text style={styles.buttonTextTela}>Consultar Turmas</Text>
        </Pressable>

        <Pressable
          onPress={() => props.navigation.navigate('ConsultarDisciplina')}
          style={styles.buttonTela}
        >
          <Text style={styles.buttonTextTela}>Consulta Disciplina</Text>
        </Pressable>

        <Pressable
          onPress={() => props.navigation.navigate('ConsultarProfessor')}
          style={styles.buttonTela}
        >
          <Text style={styles.buttonTextTela}>Consulta Professor</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TelaPrincipal;
