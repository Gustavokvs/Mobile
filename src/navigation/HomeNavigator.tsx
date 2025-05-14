
import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import TelaPrincipal from "../layouts/TelaPrincipal";
import TelaNova from "../layouts/TelaNova";
import CampoDeTexto from "../layouts/CampoDeTexto";
import FazerMedia from "../layouts/Exer3";
import Listar from "../layouts/Exer7";

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

type ListarProps = NativeStackScreenProps<RootStackParamList,
  'Listar'>

//exporta o navegador da pilha para ficar visível para outros arquivos    
export default HomeNavigator;

//exporta os tipos de dados para ficar visível para outros arquivos
export type {
  PrincipalProps,
  NovaProps,
  CampoProps,
  FazerMediaProps,
  ListarProps
};
