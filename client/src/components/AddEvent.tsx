import { EventState, EventStatus } from "helpers/interfaces";
import { Owner } from "helpers/types";
import { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { saveEvent } from "redux/eventReducers";
import { useAppDispatch } from '../helpers/hooks';

const AddEvent = ({totalEvents}: {totalEvents: number}) => {
    const [show, setShow] = useState(false);
    const [newOwners, setNewOwners] = useState([{ name: '' }]);
    const dispatch = useAppDispatch();
  const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const uuid = () => {
    var chars = '0123456789abcdef'.split('');

    var uuid = [], rnd = Math.random, r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4'; // version 4

    for (var i = 0; i < 36; i++) {
        if (!uuid[i]) {
            r = 0 | rnd() * 16;

            uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r & 0xf];
        }
    }

    return uuid.join('');
}
    const onFormSubmit = (e: any) => {
        e.preventDefault();
        const { domain, subdomain, description } = e.target;
        let timestamp = new Date();

        const adjOwners: Owner[] = newOwners.map((owner => ({name: owner.name, role: 'Supervisor', uid: uuid()} )))
        const newEventData:EventState = {
            id: totalEvents + 1,
            uid: uuid(),
            domain: domain.value,
            subdomain: subdomain.value,
            description: description.value,
            status: EventStatus.OnGoing,
            created: timestamp.toUTCString(),
            owners: adjOwners
        }
        dispatch(saveEvent(newEventData));
        handleClose();

    }
    
    const handleAddOwner = () => {
        setNewOwners(newOwners.concat([{ name: '' }]));
    }

    const handleRemoveOwner = (idx: number) => {
        setNewOwners(newOwners.filter((owner, index) => index !== idx));
    }

    const handleOwnerNameChange = (idx: number) => (e: any) => {
        console.log(`Name changed: ${e.target.value}`);
    const newOwnersData = newOwners.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: e.target.value };
    });

    setNewOwners(newOwnersData);
  };

    return <>
        <Container>
            <Button onClick={handleShow}>Create Event</Button>
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Event</Modal.Title>
        </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onFormSubmit}>
      <Form.Group className="mb-3" controlId="domain">
        <Form.Label>Domain</Form.Label>
        <Form.Control placeholder="Enter domain" />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="subdomain">
        <Form.Label>Subdomain</Form.Label>
        <Form.Control  placeholder="Enter subdomain" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control placeholder="Enter description" />
      </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Owners</Form.Label>
                            <Row>
                                {newOwners.map((o, i) => (<><Col xs={10}><Form.Control placeholder={`Owner #${i + 1} name`} onChange={handleOwnerNameChange(i) } /></Col>
                                <Col><Button className="small" onClick={() => handleRemoveOwner(i)}>-</Button></Col></>))}
                            </Row>
                            <Row className="mt-2">
                                <Button onClick={handleAddOwner}>Add Owner</Button>
                            </Row>
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                
                </Modal.Footer>
            </Modal>
        </Container>
    </>
}

export default AddEvent;