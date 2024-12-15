import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import { Task } from '../models/Task';
import { deleteTask, updateTask } from '../services/taskService';
import TaskUpdateForm from './TaskUpdate';

const TaskList = ({ tasks, onTaskDeleted, onTaskUpdated }: { tasks: Task[]; onTaskDeleted: (taskId: string) => void; onTaskUpdated: (task: Task) => void }) => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      onTaskDeleted(taskId);
    } catch (error) {
      console.error('Error deleting task:', error);
      Alert.alert('Error', 'Failed to delete task.');
    }
  };

  const handleUpdate = async (task: Task) => {
    setEditingTask(task);
  };

  const handleCloseUpdateForm = () => {
    setEditingTask(null);
  };

  if (editingTask) {
    return (
      <TaskUpdateForm
        task={editingTask}
        onTaskUpdated={onTaskUpdated}
        onClose={handleCloseUpdateForm}
      />
    );
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id || Math.random().toString()}
      renderItem={({ item }) => {
        return (
          <View style={styles.taskItem}>
            <Text style={[styles.title, item.completed && styles.completed]}>
              {item.title}
            </Text>
            <Text>{item.description}</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Delete"
                onPress={() => item.id ? handleDelete(item.id) : console.error('Invalid task ID')}
              />
              <Button
                title="Update"
                onPress={() => handleUpdate(item)}
              />
            </View>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  taskItem: { padding: 15, borderBottomWidth: 1, borderColor: '#ccc' },
  title: { fontWeight: 'bold' },
  completed: { textDecorationLine: 'line-through', color: 'gray' },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default TaskList;
