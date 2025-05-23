import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  //cadastro
  containerPrincipal: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: "center",

  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4A148C',
  },

  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },

  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },

  input: {
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },

  pickerContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
  },

  picker: {
    width: '100%',
    height: 45,
  },

  buttonContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },

  buttonCadastro: {
    backgroundColor: '#6A1B9A',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },

  buttonApagar: {
    backgroundColor: '#D32F2F',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },

  botaoVoltar: {
    backgroundColor: '#BDBDBD',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  textoBotao: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },


  //alterar
  container: {
    flex: 1,
    backgroundColor: "#F5F5FF", // tom claro com leve roxo
    padding: 45,
    justifyContent: "center",
  },

  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4B0082", // roxo escuro
    marginBottom: 20,
    textAlign: "center",
  },

  botao: {
    backgroundColor: "#6A0DAD", // roxo vibrante
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },

  texto_botaoSalvar: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  buttonTextVoltar: {
    color: "#333",
    fontSize: 15,
    fontWeight: "bold",
  },

  //consultar

  centralizar: {
    alignItems: "center",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  dadosCard: {
    marginBottom: 12,
  },
  tituloCard: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4B0082",
    marginBottom: 8,
  },
  textoCard: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  botoesCard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  botaoAlterar: {
    backgroundColor: "#FFA500",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  botaoExcluir: {
    backgroundColor: "#DC143C",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
  },
  textoBotaoAcao: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },


  button: {
    backgroundColor: '#6A0DAD', // Roxo escuro
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
    elevation: 2,
  },


  //telaprincipal

  containerTela: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
        justifyContent: "center",

  },
  tituloTela: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  buttonTela: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 6,
    marginBottom: 10,
  },
  buttonTextTela: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },

  emptyText: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#6A0DAD',  // roxo escuro, mesma cor dos botões
  textAlign: 'center',
  marginTop: 30,
  paddingHorizontal: 20,
},


});
