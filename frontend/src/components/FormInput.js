import React from 'react';

function FormInput({ label, name, type = 'text', register, rules = {}, icon: Icon, placeholder, error }) {
  return (
    <div className="field">
      {label && <label className="field__label" htmlFor={name}>{label}</label>}
      <div className={`field__input ${error ? 'field__input--error' : ''}`}>
        {Icon && <Icon size={18} />}
        {type === 'textarea' ? (
          <textarea id={name} placeholder={placeholder} {...register(name, rules)} />
        ) : (
          <input id={name} type={type} placeholder={placeholder} {...register(name, rules)} />
        )}
      </div>
      {error && <p className="field__error">{error}</p>}
    </div>
  );
}

export default FormInput;
