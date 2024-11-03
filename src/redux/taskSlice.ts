import { createSlice } from '@reduxjs/toolkit';
import { faEdit, faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons';
import { TaskList } from '../types';

const initialState: TaskList = {
  'task-0': {
    id: 'task-0',
    list: 'list-0',
    title: 'Poprawki karta',
    content: 'Wprowadzenie poprawek na karcie',
    icon: faCircle,
  },
  'task-1': {
    id: 'task-1',
    list: 'list-0',
    title: 'Komponenty dla Mubi',
    content: 'Dodanie brakujących komponentów',
    icon: faCircle,
  },
  'task-2': {
    id: 'task-2',
    list: 'list-1',
    title: 'Poprawki dokumenty',
    content: 'Wprowadzenie optymalizacji w wyświetlaniu dokumentów',
    icon: faEdit,
  },
  'task-3': {
    id: 'task-3',
    list: 'list-1',
    title: 'Tablica dokumentów',
    content: 'Zaprojektowanie tablicy dokumentów',
    icon: faEdit,
  },
  'task-4': {
    id: 'task-4',
    list: 'list-2',
    title: 'Test A/B',
    content: 'Przeprowadzanie testów A/B',
    icon: faCheckCircle,
  },
};

export const slice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, { payload: { id, listId, title, content, icon } }) => {
      const newTask = {
        id: `task-${id}`,
        list: listId,
        title,
        content,
        icon,
      };
      state[`task-${id}`] = newTask;
    },
    deleteTask: (state, { payload: { id } }) => {
      const newState = state;
      delete newState[id];
      return newState;
    },
    updateTask: (state, { payload: { id, title, content } }) => {
      state[id].title = title;
      state[id].content = content;
      state[`task-${id}`] = state[id];
    },
  },
});

export const { addTask, deleteTask, updateTask } = slice.actions;

export default slice.reducer;
