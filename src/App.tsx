import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import './App.css';
import List from './components/List';
import Header from './components/Header';
import { dragHappened } from './redux/listSlice';
import { RootState } from './redux/store';
import { TaskListItem } from './types';

function App() {
  const dispatch = useDispatch();

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;
    dispatch(
      dragHappened({
        droppableIdStart: source.droppableId,
        droppableIdEnd: destination.droppableId,
        droppableIndexStart: source.index,
        droppableIndexEnd: destination.index,
      })
    );
  };

  const lists = useSelector((state: RootState) => state.list);
  const listOrder = Object.keys(lists);
  const tasks = useSelector((state: RootState) => state.task);

  return (
    <div className='wrapper'>
      <div className='sidebar' />
      <div className='main-wrapper'>
        <Header />
        <div className='app'>
          <DragDropContext onDragEnd={onDragEnd}>
            {listOrder.map((listId) => {
              const list = lists[listId];
              const listTasks: TaskListItem[] = list.tasks.map((taskId) => tasks[taskId]);
              return <List key={list.id} list={list} tasks={listTasks} />;
            })}
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default App;
