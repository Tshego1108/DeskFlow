import React, {useContext, useState} from 'react';
import {useForm} from 'react-hook-form';
import {PlusCircle, SendHorizonal} from 'lucide-react';
import {AuthContext} from '../context/AuthContext';

function TicketForm({onCreated}){
  const {api} = useContext(AuthContext);
  const {register, handleSubmit, reset, formState:{errors}} = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.post('/tickets', data);
      reset();
      onCreated && onCreated();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="ticket-form-card">
      <div className="panel__header">
        <div>
          <p className="eyebrow">Create request</p>
          <h3>New support ticket</h3>
        </div>
        <div className="panel__icon">
          <PlusCircle size={18} />
        </div>
      </div>

      {error && <div className="alert alert--error">{error}</div>}
      <form onSubmit={handleSubmit(onSubmit)} className="ticket-form">
        <div className="field">
          <label className="field__label">Title</label>
          <div className={`field__input ${errors.title ? 'field__input--error' : ''}`}>
            <input placeholder="Brief summary of the issue" {...register('title',{required:true})} />
          </div>
          {errors.title && <p className="field__error">Title is required</p>}
        </div>

        <div className="field">
          <label className="field__label">Description</label>
          <div className={`field__input ${errors.description ? 'field__input--error' : ''}`}>
            <textarea rows="4" placeholder="Describe what you need help with" {...register('description',{required:true})} />
          </div>
          {errors.description && <p className="field__error">Description is required</p>}
        </div>

        <div className="field">
          <label className="field__label">Priority</label>
          <div className={`field__input ${errors.priority ? 'field__input--error' : ''}`}>
            <select {...register('priority',{required:true})}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          {errors.priority && <p className="field__error">Priority is required</p>}
        </div>

        <button className="button button--primary ticket-form__button" type="submit" disabled={loading}>
          <SendHorizonal size={16} />
          <span>{loading ? 'Creating...' : 'Create ticket'}</span>
        </button>
      </form>
    </div>
  );
}

export default TicketForm;
