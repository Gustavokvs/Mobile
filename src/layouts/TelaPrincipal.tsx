import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { PrincipalProps } from '../navigation/HomeNavigator';
import { styles } from '../styles/styles';
import User from './TelaEx1';
import TelaEx1 from './TelaEx1';
import ExemploStylesText from '../components/ExemploStyleText';
import ExemploStylesView from '../components/ExemploStyleView';
import Exemplo14_ParametroFunction from '../components/Exemplo14_ParametroFunction';
import Exemplo13_State from '../components/Exemplo13_State';
import CampoDeTexto from '../components/CampoDeTexto';
import Listar from '../components/Exer7';

//Componente chamado TelaPrincipal que recebe 
//PrincipalProps 
//como parametro e constrói uma View com o componente 
//HelloWorld e Exemplo1 dentro
const TelaPrincipal = (props: PrincipalProps) => {
 
   
  

  return (
    <View
      style={[styles.tela]}>
      <Listar />

    </View>
  );
}

//exportando o componente TelaPrincipal para ficar visível para outros arquivos
export default TelaPrincipal;
