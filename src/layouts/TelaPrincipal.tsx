import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { PrincipalProps } from '../navigation/HomeNavigator';

//Componente chamado TelaPrincipal que recebe PrincipalProps como parâmetro e constrói uma View
const TelaPrincipal = (props: PrincipalProps) => {

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tela Principal</Text>

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

      <Pressable onPress={() => props.navigation.navigate('CadastroAluno')} style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar Aluno</Text>
      </Pressable>

      <Pressable onPress={() => props.navigation.navigate('ConsultaAluno')} style={styles.button}>
        <Text style={styles.buttonText}>Consultar Alunos</Text>
      </Pressable>

      <Pressable onPress={() => props.navigation.navigate('CadastroTurma')} style={styles.button}>
        <Text style={styles.buttonText}>Cadastro de turma</Text>
      </Pressable>

      <Pressable onPress={() => props.navigation.navigate('TelaConsTurma')} style={styles.button}>
        <Text style={styles.buttonText}>Consultar Turmas</Text>
      </Pressable>

      <Pressable onPress={() => props.navigation.navigate('CadastroProfessor')} style={styles.button}>
        <Text style={styles.buttonText}>Cadastro Professor</Text>
      </Pressable>

      <Pressable onPress={() => props.navigation.navigate('CadastroDisciplina')} style={styles.button}>
        <Text style={styles.buttonText}>Cadastro Disciplina</Text>
      </Pressable>

<Pressable onPress={() => props.navigation.navigate('ConsultarDisciplina')} style={styles.button}>
        <Text style={styles.buttonText}>Consulta Disciplina</Text>
      </Pressable>

      <Pressable onPress={() => props.navigation.navigate('ConsultarProfessor')} style={styles.button}>
        <Text style={styles.buttonText}>Consulta Professor</Text>
      </Pressable>
    </View>
  );
};

// Estilos para a TelaPrincipal
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TelaPrincipal;
