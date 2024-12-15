import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { Task } from '../models/Task';
import { deleteTask } from '../services/taskService';

const TaskList = ({ tasks, onTaskDeleted }: { tasks: Task[]; onTaskDeleted: (taskId: string) => void }) => {
  const handleDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      onTaskDeleted(taskId);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Add a render for when there are no tasks
  if (!tasks || tasks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text>No tasks available</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id || Math.random().toString()} // Fallback key generator
      renderItem={({ item }) => (
        <View style={styles.taskItem}>
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.description}</Text>
          <Button title="Delete" onPress={() => handleDelete(item.id)} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  taskItem: { padding: 15, borderBottomWidth: 1, borderColor: '#ccc' },
  title: { fontWeight: 'bold' },
  emptyContainer: { 
    padding: 20, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
});

export default TaskList;