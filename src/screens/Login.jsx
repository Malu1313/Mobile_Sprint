import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from "react-native";
import api from '../axios/axios';

export default function Login({ navigation }){
    const [user, setUser] = useState ({ 
        email: "",
        password: "",
    });

    async function handleLogin(){
        await api.postLogin(user).then(
            (response)=>{
                Alert.alert("OK", response.data.message);
            navigation.navigate("Home");
            },(error)=>{
                Alert.alert('Erro',error.response.data.error)
            }
        )
    }
        
    return(
        <View style={styles.container}>
        <Text style={styles.title}> Faça Login</Text>
        <TextInput 
        style={styles.input}
        placeholder="Email"
        value={user.email}
        onChangeText={(value)=> {
            setUser({...user, email: value});
        }}
        />
        <TextInput
        style={styles.input}
        placeholder="Senha"
        value={user.password}
        onChangeText={(value)=> {
            setUser({...user, password: value});
        }}
        />
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text>Entrar</Text>
        </TouchableOpacity>
        <Button title="Cadastro" onPress={()=> navigation.navigate("Cadastro")}/>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#b22222",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    padding: 17,
    marginBottom: 30,
    borderRadius: 20,
    fontSize: 16,
    border: '1px solid rgba(28, 27, 27, 0.404)',
    height: '30px',
  },
  button: {
    width: "100%",
    backgroundColor: "#ff4500",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    marginTop: 10,
    color: "white",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
