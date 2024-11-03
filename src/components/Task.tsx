import { useState, MouseEvent } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteTask, updateTask } from '../redux/taskSlice';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

import { TaskListItem } from '../types';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type Props = {
  listId: string;
  task: TaskListItem;
  index: number;
  icon: IconDefinition;
};

const Task = ({ listId, task, index, icon }: Props) => {
  const [isEdited, setIsEdited] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [content, setContent] = useState(task.content);

  const dispatch = useDispatch();

  const saveTask = (e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    if (title === '') {
      alert('Tytuł wymagany!');
    } else {
      dispatch(updateTask({ id: task.id, title, content }));
      setIsEdited(false);
    }
  };

  console.log(icon);

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
          <FontAwesomeIcon icon={faCheckCircle} onClick={saveTask} />
          <FontAwesomeIcon icon={faTimesCircle} onClick={() => setIsEdited(false)} />
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
              <FontAwesomeIcon icon={icon} className={`float-right ${icon.iconName !== 'pen-to-square' && 'pr-1'}`} />
            </div>
            <div>
              <FontAwesomeIcon icon={faEdit} className='edit' onClick={() => setIsEdited(true)} />
            </div>
            <div>
              <FontAwesomeIcon icon={faTrash} onClick={() => dispatch(deleteTask({ id: task.id, listId }))} />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
