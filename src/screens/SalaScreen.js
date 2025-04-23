import { useEffect, useState } from "react";
import api from "../axios/axios";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

export default function SalaScreen() {
  const [salas, setSalas] = useState([]);
  const [salaSelecionada, setSalaSelecionada] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSalas();
  }, []);

  async function fetchSalas() {
    try {
      const response = await api.getSalas();
      setSalas(response.data.sala);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar salas:", error);
    }
  }

  async function abrirModalComDescricao(sala) {
    try {
      const response = await api.getSalaPorid(sala.id_sala);
      setSalaSelecionada(response.data.sala);
      setModalVisible(true);
    } catch (error) {
      console.error("Erro ao buscar descrição da sala", error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Salas Disponíveis</Text>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={salas}
          keyExtractor={(item) => item.id_sala.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.salaCard}
              onPress={() => abrirModalComDescricao(item)}
            >
              <Text style={styles.salaNumero}>Sala {item.numero}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <Text > Sala: {salaSelecionada.numero}</Text>
          <Text>Descrição: {salaSelecionada.descricao}</Text>
          {ingressos.length === 0 ? (
            <Text>Nenhum ingresso encontrado</Text>
          ) : (
            <FlatList
            data={sala}
            keyExtractor={(item) => item.id_sala.toString()}
            renderItem={({ item }) => (
              <View style={styles.salaItem}>
                <Text>nome: {item.numero}</Text>
                <Text>descricao: {item.descricao}</Text>
                <Text>capacidade: {item.capacidade}</Text>
              </View>
            )}
          />
            )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={{ color: "white" }}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  salaCard: {
    padding: 15,
    backgroundColor: "#f1f1f1",
    marginBottom: 10,
    borderRadius: 8,
  },
  salaNumero: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "blue",
    padding: 10,
    alignItems: "center",
    borderRadius: 6,
  },
});
