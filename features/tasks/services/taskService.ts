import { supabase } from '@/core/supabase/client';
import { Task } from '../models/Task';

// Obtener todas las tareas
export const fetchTasks = async (): Promise<Task[]> => {
  const { data, error } = await supabase.from('tasks').select('*');
  
  if (error) {
    console.error('Error fetching tasks:', error);
    throw new Error('Error fetching tasks: ' + error.message);
  }

  return data as Task[];  // Asegura que data es tratado como un array de tareas
};

// Añadir una nueva tarea
export const addTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const { data, error } = await supabase
    .from('tasks')
    .insert(task)
    .single();  // Usamos .single() porque estamos esperando una sola fila de respuesta

  if (error) {
    console.error('Error adding task:', error);
    throw new Error('Error adding task: ' + error.message);
  }

  console.log('Inserted task with ID:', data);  // Debugging: Verifica lo que se devuelve
  return data as Task;
};

// Actualizar solo el estado 'completed' de la tarea
export const updateTask = async (task: Task): Promise<Task> => {
  console.log('Updating task with id:', task.id, 'completed:', task.completed);  // Depuración

  const { data, error } = await supabase
    .from('tasks')
    .update({ completed: task.completed })  // Solo actualizamos el estado 'completed'
    .eq('id', task.id)  // Filtramos por el id de la tarea
    .single();  // Asegura que se actualiza solo una fila

  if (error) {
    console.error('Error updating task:', error);
    throw new Error('Error updating task: ' + error.message);
  }

  return data as Task;
};

// Eliminar una tarea
export const deleteTask = async (taskId: string): Promise<void> => {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', taskId);  // Filtramos por el id de la tarea

  if (error) {
    console.error('Error deleting task:', error);
    throw new Error('Error deleting task: ' + error.message);
  }
};
