import {supabase} from '@/core/supabase/client';
import { Task } from '../models/Task';

export const fetchTasks = async (): Promise<Task[]> => {
  const { data, error } = await supabase.from('tasks').select('*');
  if (error) throw new Error('Error fetching tasks: ' + error.message);
  return data;
};

export const addTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const { data, error } = await supabase.from('tasks').insert(task).single();
  if (error) throw new Error('Error adding task: ' + error.message);
  return data;
};

export const updateTask = async (task: Task): Promise<Task> => {
  const { data, error } = await supabase.from('tasks').update(task).eq('id', task.id).single();
  if (error) throw new Error('Error updating task: ' + error.message);
  return data;
};

export const deleteTask = async (taskId: string): Promise<void> => {
  const { error } = await supabase.from('tasks').delete().eq('id', taskId);
  if (error) throw new Error('Error deleting task: ' + error.message);
};