import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Container geral para telas
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  // Título da tela principal (EMERGÊNCIA)
  titulo1: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#0D47A1",
    marginBottom: 40,
    textAlign: "center",
  },

  // Container principal do cadastro (mais espaçado e centralizado)
  containerPrincipal: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: "center",
  },

  // Títulos das telas
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0D47A1",
    marginBottom: 20,
    textAlign: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0D47A1",
    marginBottom: 30,
  },

  // Estilo para inputs de texto
  input: {
    width: "100%",
    height: 45,
    borderColor: "#90CAF9",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#FFF",
    fontSize: 16,
    color: "#333",
  },

  // Botões principais
  botao: {
    backgroundColor: "#1E88E5",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
    elevation: 3,
    width: "100%",
  },

  // Texto dentro do botão principal
  texto_botao: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
  },

  button: {
    backgroundColor: "#1E88E5",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 3,
    marginVertical: 5,
    width: "48%",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  // Botão de cancelar/limpar campos
  cancelButton: {
    backgroundColor: "#EF5350",
  },

  // Botão Voltar (com estilo diferente para destaque)
  botaoVoltar: {
    backgroundColor: "#1565C0",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 15,
    alignItems: "center",
    elevation: 3,
  },

  textoBotao: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  // Imagem para o cadastro
  image: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0D47A1",
    alignSelf: "flex-start",
    marginBottom: 5,
  },

  // Container para os botões lado a lado no cadastro
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  // Estilos da lista (ConsultaAluno)
  itemContainer: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dadosContainer: {
    flex: 1,
  },

  itemTexto: {
    fontSize: 16,
    color: "#0D47A1",
    marginBottom: 2,
  },

  acoesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  botaoAcaoExcluir: {
    backgroundColor: "#EF5350",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 8,
    elevation: 2,
  },

  textoBotaoAcao: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    width: 100
  },

  picker: {
    height: 50,
    width: '100%',
    color: '#000',
  },

});
