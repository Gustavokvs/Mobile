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

//Componente chamado TelaPrincipal que recebe 
//PrincipalProps 
//como parametro e constrói uma View com o componente 
//HelloWorld e Exemplo1 dentro
const TelaPrincipal = (props: PrincipalProps) => {
  function funcaoclick() {

  }

  // A FUNÇÃO DO CAMPO DE TEXTO, TEM QUE RECEBER POR PARÂMETRO UM STRING
  // PORTANTO É PRECISO DEIXAR A FUNÇÃO ATUAL (funcaoclick2) PARA RECEBER PARAMETRO STRING
  function funcaoclick2(texto: string) {
    Alert.alert("Bom dia" + texto)
  }

  return (
    <View
      style={[styles.tela]}>
      <CampoDeTexto
        // ONPRESSBOTAO TEM POR PARAMETRO UMA FUNCAO QUE TENHA STRING (OBRIGATORIAMENTE), PORTANTO
        // É NECESSÁRIO COLOCAR UMA FUNÇAÕ QUE CONTENHA ESSES PARAMETROS (funcaoclick2 nesse caso).
        onPressBotao={funcaoclick2} />
    </View>
  );
}

//exportando o componente TelaPrincipal para ficar visível para outros arquivos
export default TelaPrincipal;
