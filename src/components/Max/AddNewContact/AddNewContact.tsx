import { FC, useState } from 'react';

import { GoSearch } from 'react-icons/go';
import { IoClose } from 'react-icons/io5';

import './AddNewContact.css';

interface AddNewContactProps {
  onAddContact: (phone: string) => void;
  onClose: () => void;
}

const AddNewContact: FC<AddNewContactProps> = ({
  onAddContact,
  onClose,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleAdd = () => {
    const phone = phoneNumber.trim();

    if (phone) {
      onAddContact(phone);
    }
  };

  return (
    <div className='chat-add-modal' onClick={onClose}>
      <div
        className='chat-add-modal__content'
        onClick={event => event.stopPropagation()}
      >
        <div className='chat-add-modal__header'>
          <h2 className='chat-add-modal__title'>Найти по номеру</h2>

          <button
            className='chat-add-modal__close'
            type='button'
            onClick={onClose}
            aria-label='Закрыть'
          >
            <IoClose />
          </button>
        </div>

        <label
          className='chat-add-modal__search'
          htmlFor='addInput'
        >
          <GoSearch className='chat-add-modal__search-icon' />

          <input
            className='chat-add-modal__input'
            id='addInput'
            type='text'
            value={phoneNumber}
            onChange={event => setPhoneNumber(event.target.value)}
            placeholder='Введите номер телефона'
            autoFocus
          />
        </label>

        <button
          className='chat-add-modal__button'
          type='button'
          onClick={handleAdd}
        >
          Найти в MAX
        </button>
      </div>
    </div>
  );
};

export default AddNewContact;