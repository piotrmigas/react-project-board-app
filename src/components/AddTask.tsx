import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { v4 } from 'uuid';
import { addTask } from '../redux/taskSlice';

type Props = {
  list: ListItem;
  listId: string;
};

type Inputs = {
  title: string;
  content: string;
};

const AddTask = ({ list, listId }: Props) => {
  const [form, setForm] = useState(false);
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
    setForm(false);
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
          <span className='badge' onClick={() => setForm(!form)}>
            Dodaj <i className={form ? 'fas fa-minus' : 'fas fa-plus'} />
          </span>
        </div>
      </div>
      <form style={{ display: form ? 'block' : 'none' }} onSubmit={handleSubmit(onSubmit)}>
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
            <i
              className={
                listId === 'list-1' ? 'far fa-edit' : listId === 'list-2' ? 'far fa-check-circle' : 'far fa-circle'
              }
            />
            <button type='submit'>
              <i className='fas fa-plus form' />
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddTask;
