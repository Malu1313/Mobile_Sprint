import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import api from "../axios/axios";

export default function Salas() {
  const [salas, setSalas] = useState([]);

  useEffect(() => {
    async function fetchSalas() {
      try {
        const response = await api.getSalas();
        setSalas(response.data.sala);
        console.log("Salas:", response.data.sala);
      } catch (error) {
        console.error("Erro ao buscar salas:", error);
      }
    }

    fetchSalas();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.itemText}>{item.numero}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
    <Icon name="person" size={28} color="#000" style={styles.icon} />
      </View>
      <Image
          source={require("../../assets/senai.png")}
          style={styles.logo}
          resizeMode="contain"
        />
    

      <View style={styles.quadrado}>
        <Text style={styles.title}>Salas disponíveis :</Text>
        <FlatList
          data={salas}
          keyExtractor={(item) => item.id_sala.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 40,
  },
  header: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 800,
    marginBottom: 5,
  },
  logo: {
    width: 140,
    height: 40,
    marginBottom: 20,
  },
  icon: {
    paddingRight: 10,
  },
  quadrado: {
    backgroundColor: "#d9d9d9",
    width: "90%",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  list: {
    width: "100%",
    paddingBottom: 100,
  },
  item: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    width: 400,
  },
  itemText: {
    fontSize: 16,
    color: "#000",
  },
});
