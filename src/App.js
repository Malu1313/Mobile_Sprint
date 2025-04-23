import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./screens/Login";
import Cadastro from './screens/Cadastro';
import ListaSalas from './screens/ListaSalas';
import SalaScreen from './screens/SalaScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="ListaSalas" component={ListaSalas} />
        <Stack.Screen name="SalaScreen">{()=>(
          <Layout>
            <SalaScreen/>
          </Layout>
        )}</Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}