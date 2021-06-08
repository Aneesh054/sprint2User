import { Button, ListGroup, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateRefUser } from "../redux/UserReducer";

export function UserModal() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const updateRefObj = () => {
    dispatch(updateRefUser({}));
  };

  return (
    <Modal show={state.user.refuser.user_id} onHide={() => updateRefObj()}>
      <Modal.Header closeButton>
        <Modal.Title>Hello, {state.user.refuser.user_name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          <ListGroup.Item>
            User Name - {state.user.refuser.user_name}
          </ListGroup.Item>
          <ListGroup.Item>
            User Email - {state.user.refuser.user_email}
          </ListGroup.Item>
          <ListGroup.Item>
            User Mobile - {state.user.refuser.user_mobile}
          </ListGroup.Item>
          <ListGroup.Item>
            Password - {state.user.refuser.user_password}
          </ListGroup.Item>
          <ListGroup.Item>
            User Type - {state.user.refuser.user_type}
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => updateRefObj()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
