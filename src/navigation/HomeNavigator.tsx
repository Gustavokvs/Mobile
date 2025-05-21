
import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import TelaPrincipal from "../layouts/TelaPrincipal";
import TelaNova from "../layouts/TelaNova";
import CampoDeTexto from "../layouts/CampoDeTexto";
import FazerMedia from "../layouts/Exer3";
import Listar from "../layouts/Exer7";
import TelaEx1 from "../layouts/TelaEx1";
import CadastroPaciente from "../layouts/CadastrarPaciente";
import ConsultarPaciente from "../layouts/ConsultarPaciente";
import PacienteUpa from "../layouts/CadastroUpa";
import CadastroTurma from "../layouts/CadastroDeTurma";
import ConsultaAluno from "../layouts/ConsultaAluno";
import TelaConsTurma from "../layouts/ConsultarTurma";
import CadastroAluno from "../layouts/CadastroAluno";
import CadastroProfessor from "../layouts/CadastroProfessor";
import CadastroDisciplina from "../layouts/CadastroDisciplina";


//Define quais as telas e os parâmetros de cada tela
type RootStackParamList = {
  TelaPrincipal: undefined;
  TelaNova: undefined;
  Listar: undefined
  CampoDeTexto: { onPressBotao?: (texto: string) => void };
  FazerMedia: {
    aluno: string;
    nota1: number;
    nota2: number;
  }
  TelaEx1: undefined;
  CadastroPaciente: undefined;
  ConsultarPaciente: undefined
  PacienteUpa: undefined
  CadastroTurma: undefined
  ConsultaAluno: undefined
  TelaConsTurma: undefined
  CadastroAluno: undefined
  CadastroProfessor: undefined
  CadastroDisciplina: undefined

};

//Cria a Stack (tipo de navegação onde as telas estão em uma "pilha")
//com o RootStackParamList definindo as telas da stack
const Stack = createNativeStackNavigator<RootStackParamList>();

//Cria o navegador da pilha
const HomeNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="TelaPrincipal" //nome da tela inicial
      screenOptions={{ headerShown: false }} //headerShown define se o cabeçalho irá ser exibido
    >

      {/* define uma tela dando um nome(igual ao RootStackParamList) e qual o componente será carregado */}
      <Stack.Screen name="TelaPrincipal" component={TelaPrincipal} />
      <Stack.Screen name="TelaNova" component={TelaNova} />
      <Stack.Screen name="CampoDeTexto" component={CampoDeTexto} />
      <Stack.Screen name="FazerMedia" component={FazerMedia} />
      <Stack.Screen name="Listar" component={Listar} />
      <Stack.Screen name="TelaEx1" component={TelaEx1} />
      <Stack.Screen name="CadastroPaciente" component={CadastroPaciente} />
      <Stack.Screen name="ConsultarPaciente" component={ConsultarPaciente} />
      <Stack.Screen name="PacienteUpa" component={PacienteUpa} />
      <Stack.Screen name="CadastroTurma" component={CadastroTurma} />
      <Stack.Screen name="ConsultaAluno" component={ConsultaAluno} />
      <Stack.Screen name="TelaConsTurma" component={TelaConsTurma} />
      <Stack.Screen name="CadastroAluno" component={CadastroAluno} />
      <Stack.Screen name="CadastroDisciplina" component={CadastroDisciplina} />
      <Stack.Screen name="CadastroProfessor" component={CadastroProfessor} />




    </Stack.Navigator>
  );
}

//cria as propriedades da TelaPrincipal, que nesse caso é undefined
//essas propriedades são usadas lá em layouts/TelaPincipal.tsx
type PrincipalProps = NativeStackScreenProps<RootStackParamList,
  'TelaPrincipal'>;

type NovaProps = NativeStackScreenProps<RootStackParamList,
  'TelaNova'>;

type CampoProps = NativeStackScreenProps<RootStackParamList,
  'CampoDeTexto'>

type FazerMediaProps = NativeStackScreenProps<RootStackParamList,
  'FazerMedia'>

type TelaConsTurmaProps = NativeStackScreenProps<RootStackParamList,
  'TelaConsTurma'>

  type CadastroAlunoProps = NativeStackScreenProps<RootStackParamList,
  'CadastroAluno'>

type ListarProps = NativeStackScreenProps<RootStackParamList,
  'Listar'>

type TelaEx1Props = NativeStackScreenProps<RootStackParamList,
  'TelaEx1'>

type CadastrarPacienteProps = NativeStackScreenProps<RootStackParamList,
  'CadastroPaciente'>

type ConsultarPacienteProps = NativeStackScreenProps<RootStackParamList,
  'ConsultarPaciente'>

type PacienteUpaProps = NativeStackScreenProps<RootStackParamList,
  'PacienteUpa'>

type CadastroTurmaProps = NativeStackScreenProps<RootStackParamList,
  'CadastroTurma'>

type ConsultaAlunoProps = NativeStackScreenProps<RootStackParamList,
  'ConsultaAluno'>
type CadastroProfessorProps = NativeStackScreenProps<RootStackParamList,
  'CadastroProfessor'>
  type CadastroDisciplinaProps = NativeStackScreenProps<RootStackParamList,
  'CadastroDisciplina'>

//exporta o navegador da pilha para ficar visível para outros arquivos    
export default HomeNavigator;

//exporta os tipos de dados para ficar visível para outros arquivos
export type {
  PrincipalProps,
  NovaProps,
  CampoProps,
  FazerMediaProps,
  ListarProps,
  TelaEx1Props,
  CadastrarPacienteProps,
  ConsultarPacienteProps,
  PacienteUpaProps,
  CadastroTurmaProps,
  ConsultaAlunoProps,
  TelaConsTurmaProps,
  CadastroAlunoProps,
  CadastroDisciplinaProps,
  CadastroProfessorProps
};
