import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000); 
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Carregando...</Text> 
      </View>
    );
  }

  return (
    <View style={styles.center}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.empty}>Nenhum dado encontrado (Empty State).</Text> 
      <Button 
        title="Ir para Details" 
        onPress={() => navigation.navigate('Details', { id: '1' })} 
      />
    </View>
  );
}

function DetailsScreen({ route }) {
  const { id } = route.params || { id: 'Desconhecido' };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true); 

  const carregar = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  useEffect(() => carregar(), []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="red" />
        <Text>Buscando ID {id}...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Erro ao carregar dados!</Text>
        <Button 
          title="Tentar Novamente" 
          onPress={() => { setError(false); carregar(); }} 
        /> 
      </View>
    );
  }

  return (
    <View style={styles.center}>
      <Text style={styles.title}>Details</Text>
      <Text>Exibindo dados do ID: {id}</Text> 
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Profile</Text>
    </View>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const linking = {
    prefixes: ['meuapp://'],
    config: {
      screens: {
        Tabs: {
          screens: {
            HomeStack: {
              screens: { Details: 'details/:id' } 
            }
          }
        }
      }
    }
  };

  return (
    <NavigationContainer linking={linking}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Tabs" component={HomeStack} options={{ tabBarLabel: 'Home' }} /> 
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: true }} />
      </Tab.Navigator>
    </NavigationContainer> 
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  empty: { color: 'gray', marginBottom: 15 },
  error: { color: 'red', marginBottom: 15, fontWeight: 'bold' }
});