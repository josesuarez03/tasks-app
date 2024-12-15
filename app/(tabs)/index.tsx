import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TaskScreen } from '@/features/tasks';
import { UploadScreen } from '@/features/uploads';
import { testConnection } from '@/core/supabase/client';
import { SafeAreaView, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    testConnection(); // Llama a la prueba de conexión al cargar la app
  }, []);

  return (
    <SafeAreaView style={styles.container}>
    <Stack.Navigator initialRouteName="Tasks">
      <Stack.Screen
        name="Tasks"
        component={TaskScreen}
        options={{ title: 'Task Manager' }}
      />
      <Stack.Screen
        name="Uploads"
        component={UploadScreen}
        options={{ title: 'File Uploads' }}
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