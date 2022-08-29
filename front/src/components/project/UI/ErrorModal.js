import { useContext } from 'react';
import AuthContext from '../stores/AuthContext';
import { Button, Modal } from 'react-bootstrap';
import '../../styles/modal.css';

const ErrorModal = () => {
  const context = useContext(AuthContext);

  const errorModalCheck = () => {
    context.setModalText('');
  };

  return (
    <div className="modal-background">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>사이트가 많이 아파요...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{context.modalText}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="modal-button" onClick={errorModalCheck}>
            그렇군요...
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default ErrorModal;
