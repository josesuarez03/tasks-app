import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TaskScreen } from '@/features/tasks';
import { UploadScreen } from '@/features/uploads';
import { SafeAreaView, StyleSheet } from 'react-native';

// Definir tipos para los parámetros de navegación
export type RootStackParamList = {
  Tasks: undefined;
  Uploads: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
    <Stack.Navigator 
      initialRouteName="Tasks"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f5f5f5',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Tasks"
        component={TaskScreen}
        options={{ 
          title: 'Task Manager',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name="Uploads"
        component={UploadScreen}
        options={{ 
          title: 'File Uploads',
          headerTitleAlign: 'center'
        }}
      />
    </Stack.Navigator>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});