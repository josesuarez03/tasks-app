import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { fetchTasks } from '../services/taskService';
import { Task } from '../models/Task';

const TaskScreen = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    loadTasks();
  }, []);

  const handleTaskAdded = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const handleTaskDeleted = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <View style={styles.container}>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskList tasks={tasks} onTaskDeleted={handleTaskDeleted} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});

export default TaskScreen;