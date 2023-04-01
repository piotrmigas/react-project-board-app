import { createSlice } from '@reduxjs/toolkit';
import { addTask, deleteTask } from './taskSlice';
import { List } from '../types';

const initialState: List = {
  'list-0': {
    id: 'list-0',
    tasks: ['task-0', 'task-1'],
    title: 'Do zrobienia',
    icon: 'far fa-circle',
  },
  'list-1': {
    id: 'list-1',
    tasks: ['task-2', 'task-3'],
    title: 'W trakcie',
    icon: 'far fa-edit',
  },
  'list-2': {
    id: 'list-2',
    tasks: ['task-4'],
    title: 'Zrobione',
    icon: 'far fa-check-circle',
  },
};

export const slice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    dragHappened: (
      state,
      { payload: { droppableIdStart, droppableIdEnd, droppableIndexEnd, droppableIndexStart } }
    ) => {
      // w obrębie tej samej listy
      if (droppableIdStart === droppableIdEnd) {
        const list = state[droppableIdStart];
        const task = list.tasks.splice(droppableIndexStart, 1);
        list.tasks.splice(droppableIndexEnd, 0, ...task);
        state[droppableIdStart] = list;
      }

      // na inną listę
      if (droppableIdStart !== droppableIdEnd) {
        const listStart = state[droppableIdStart];
        const task = listStart.tasks.splice(droppableIndexStart, 1);
        const listEnd = state[droppableIdEnd];
        listEnd.tasks.splice(droppableIndexEnd, 0, ...task);
        state[droppableIdStart] = listStart;
        state[droppableIdEnd] = listEnd;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTask, (state, { payload: { listId, id } }) => {
      state[listId].tasks.push(`task-${id}`);
    });

    builder.addCase(deleteTask, (state, { payload: { listId, id } }) => {
      state[listId].tasks = state[listId].tasks.filter((taskId) => taskId !== id);
    });
  },
});

export const { dragHappened } = slice.actions;

export default slice.reducer;
