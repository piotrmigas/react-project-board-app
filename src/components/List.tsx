import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import AddTask from './AddTask';

type Props = {
  list: ListItem;
  tasks: TaskList;
};

const List = ({ list, tasks }: Props) => (
  <div>
    <AddTask list={list} listId={list.id} />
    <Droppable droppableId={list.id}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef} className='dropzone'>
          {tasks.map((task: TaskListItem, index: number) => (
            <Task key={task.id} task={task} listId={list.id} icon={list.icon} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

export default List;
