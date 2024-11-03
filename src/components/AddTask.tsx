import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { v4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faEdit, faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { addTask } from '../redux/taskSlice';
import { ListItem, Inputs } from '../types';

type Props = {
  list: ListItem;
  listId: string;
};

const AddTask = ({ list, listId }: Props) => {
  const [formOpen, setFormOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<Inputs> = ({ title, content }) => {
    const id = v4();
    const icon = list.icon;
    dispatch(addTask({ id, listId, title, content, icon }));
    reset();
    setFormOpen(false);
  };

  return (
    <>
      <div className='add-task'>
        <div className='list-info'>
          <h4>
            {list.title} <span>({list.tasks.length})</span>
          </h4>
        </div>
        <div className='button'>
          <span className='badge' onClick={() => setFormOpen(!formOpen)}>
            Dodaj <FontAwesomeIcon icon={formOpen ? faMinus : faPlus} />
          </span>
        </div>
      </div>
      <form style={{ display: formOpen ? 'block' : 'none' }} onSubmit={handleSubmit(onSubmit)}>
        <div className='card shadow'>
          <div className='card-body'>
            <input
              className='card-title'
              autoComplete='off'
              placeholder='Wpisz tytuł...'
              {...register('title', { required: true })}
            />
            {errors.title && <span className='error'>Pole wymagane</span>}
            <textarea
              className='card-subtitle'
              rows={3}
              cols={25}
              placeholder='Tutaj wpisz opis...'
              {...register('content')}
            />
          </div>
          <div className='icons'>
            <FontAwesomeIcon icon={listId === 'list-1' ? faEdit : listId === 'list-2' ? faCheckCircle : faCircle} />
            <button type='submit'>
              <FontAwesomeIcon icon={faPlus} className='form' />
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddTask;
