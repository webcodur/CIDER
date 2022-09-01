import React, { useContext } from 'react';

import AuthContext from '../stores/AuthContext';
import ErrorModalContext from '../../stores/ErrorModalContext';
import { Button } from 'react-bootstrap';

const AddButton = () => {
  const context = useContext(AuthContext);
  const errorModalContext = useContext(ErrorModalContext);

  return (
    <div className="mt-3 text-center mb-4 row">
      <div className="col-sm-20">
        <Button
          className="btn btn-primary toggleTarget"
          onClick={() => {
            context.setIsAdding(true);
            console.log(errorModalContext.modalText);
          }}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default AddButton;
