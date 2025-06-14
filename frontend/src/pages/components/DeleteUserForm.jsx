import React, { useState } from 'react';
import Modal from '../Modal';
import DangerButton from '../DangerButton';
import SecondaryButton from '../SecondaryButton';
import InputLabel from '../InputLabel';
import TextInput from '../TextInput';
import InputError from '../InputError';

const DeleteUserForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleDelete = (e) => {
    e.preventDefault();
    // TODO: Implement delete account API call with password confirmation
    alert('Delete account submitted. Implement API call.');
  };

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-lg font-medium text-gray-900">Eliminar Cuenta</h2>
        <p className="mt-1 text-sm text-gray-600">
          Una vez que su cuenta sea eliminada, todos sus recursos y datos serán eliminados permanentemente. Antes de eliminar su cuenta, descargue cualquier dato o información que desee conservar.
        </p>
      </header>

      <DangerButton onClick={openModal}>Eliminar Cuenta</DangerButton>

      <Modal show={showModal} onClose={closeModal} focusable>
        <form onSubmit={handleDelete} className="p-6">
          <h2 className="text-lg font-medium text-gray-900">
            ¿Está seguro que desea eliminar su cuenta?
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Una vez que su cuenta sea eliminada, todos sus recursos y datos serán eliminados permanentemente. Por favor ingrese su contraseña para confirmar que desea eliminar su cuenta permanentemente.
          </p>

          <div className="mt-6">
            <InputLabel htmlFor="password" value="Contraseña" className="sr-only" />
            <TextInput
              id="password"
              name="password"
              type="password"
              className="mt-1 block w-3/4"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <InputError messages={errors} className="mt-2" />
          </div>

          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>
            <DangerButton className="ms-3" type="submit">Eliminar Cuenta</DangerButton>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default DeleteUserForm;
