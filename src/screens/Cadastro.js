import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import api from "../axios/axios";

export default function Cadastro({ navigation }) {
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    cpf: "",
    senha: "",
  });

  async function handleCadastro() {
    await api.postUser(usuario).then(
        (response)=>{
            console.log(response.data);
            Alert.alert('OK',response.data.message)
        },(error)=>{
            console.log(error.response.data);
            Alert.alert('Erro',error.response.data.error)
        }
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.quadrado}>
        <Image
          source={require("../../assets/senai.png")} // Caminho para a sua imagem
          style={styles.image}
        />
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={usuario.nome}
          onChangeText={(value) => {
            setUsuario({ ...usuario, nome: value });
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={usuario.email}
          onChangeText={(value) => {
            setUsuario({ ...usuario, email: value });
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="CPF"
          value={usuario.cpf}
          onChangeText={(value) => {
            setUsuario({ ...usuario, cpf: value });
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={usuario.senha}
          onChangeText={(value) => {
            setUsuario({ ...usuario, senha: value });
          }}
        />
        <TouchableOpacity onPress={handleCadastro} style={styles.button}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Já esta cadastrado? Clique aqui</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F26F6F",
  },
  quadrado: {
    backgroundColor: "#B22222",
    padding: 100,
    borderRadius: 15,
    width: "90%",
    maxWidth: 350,
    alignItems: "center",
  },
  title: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  image: {
    width: 268, // Largura da imagem
    height: 70, // Altura da imagem
    padding: 22,
    marginBottom: 40, // Espaçamento abaixo da imagem
  },
  input: {
    width: "200%",
    padding: 12,
    marginVertical: 12,
    borderRadius: 15,
    fontSize: 16,
    backgroundColor: "#FFF",
  },
  button: {
    width: "150%",
    padding: 15,
    backgroundColor: "#FF0802",
    borderRadius: 15,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    color: "white",
    marginTop: 12,
    fontWeight: "600",
  },
});
