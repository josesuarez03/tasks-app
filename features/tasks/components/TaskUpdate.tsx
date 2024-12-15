import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Switch, Text, Alert } from 'react-native';
import { Task } from '../models/Task';
import { updateTask } from '../services/taskService';

const TaskUpdateForm = ({
  task,
  onTaskUpdated,
  onClose,
}: {
  task: Task;
  onTaskUpdated: (updatedTask: Task) => void;
  onClose: () => void;
}) => {
  const [completed, setCompleted] = useState(task.completed);

  useEffect(() => {
    setCompleted(task.completed);
  }, [task]);

  const handleUpdate = async () => {
    try {
      const updatedTask = { ...task, completed }; // Update only the completed field
      const result = await updateTask(updatedTask);
      onTaskUpdated(result); // Notify parent component of the updated task
      onClose(); // Close the update form
    } catch (error) {
      console.error('Error updating task:', error);
      Alert.alert('Error', 'Failed to update task.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Text>Completed</Text>
        <Switch
          value={completed}
          onValueChange={(newValue) => setCompleted(newValue)}
        />
      </View>
      <Button title="Update Task" onPress={handleUpdate} />
      <Button title="Cancel" onPress={onClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default TaskUpdateForm;
