import { useState, MouseEvent } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../redux/taskSlice';
import { TaskListItem } from '../types';

type TaskProps = {
  listId: string;
  task: TaskListItem;
  index: number;
  icon: string;
};

const Task = ({ listId, task, index, icon }: TaskProps) => {
  const [isEdited, setIsEdited] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [content, setContent] = useState(task.content);

  const dispatch = useDispatch();

  const saveTask = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (title === '') {
      alert('Tytuł wymagany!');
    } else {
      dispatch(updateTask({ id: task.id, title, content }));
      setIsEdited(false);
    }
  };

  return isEdited ? (
    <form>
      <div className='card shadow'>
        <div className='card-body'>
          <input
            className='card-title'
            name='title'
            autoComplete='off'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Wpisz tytuł...'
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.preventDefault();
            }}
          />
          <textarea
            className='card-subtitle'
            rows={3}
            cols={25}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='Tutaj wpisz opis...'
          />
        </div>
        <div className='icons'>
          <i className='fas fa-check-circle' onClick={saveTask} />
          <i className='fas fa-times-circle' onClick={() => setIsEdited(false)} />
        </div>
      </div>
    </form>
  ) : (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div className='card' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div className='card-body'>
            <h3 className='card-title'>{task.title}</h3>
            <p className='card-subtitle'>{task.content}</p>
          </div>
          <div className='icons'>
            <div>
              <i className={icon} />
            </div>
            <div>
              <i className='far fa-edit edit' onClick={() => setIsEdited(true)} />
            </div>
            <div>
              <i className='fas fa-trash' onClick={() => dispatch(deleteTask({ id: task.id, listId }))} />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
