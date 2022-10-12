import { useAppDispatch, useAppSelector } from 'helpers/hooks';
import { useState, useEffect } from 'react';
import { Button, Col, Container, Form, ListGroup, Modal, Row } from 'react-bootstrap';
import { EventState } from '../helpers/interfaces';
import { deleteEvent, fetchEvents } from '../redux/eventReducers'
import MySelect from './MySelect';

const MyListGroupItem = ({ event, i }: { event: EventState, i: number }) => {
  const updated = useAppSelector((state) => state.events.updated);
  const [showState, setShowState] = useState(false);
  const dispatch = useAppDispatch();
  const handleClose = () => setShowState(false);
  const handleShow = () => setShowState(true);
  const handleDelete = () => {
    dispatch(deleteEvent({ uid: event.uid }));
    dispatch(fetchEvents());
    handleClose();
  };

  useEffect(() => {
    if (updated) {
      handleClose()
    }
  }, [updated]
  );
  
    return  <>
        <ListGroup.Item key={i} action onClick={handleShow}>
           <Row>
                        <Col className="mr-0">{i + 1}</Col>
                        <Col>
                            <h6>Domain</h6>
                        </Col>
                        <Col>
                            <h6>Sub-domain</h6>
                        </Col>
                        <Col><h6>Status</h6></Col>
                        <Col><h6>Created</h6></Col>
                    </Row>
                    <Row>
                        <Col>{ ''}</Col>
                        <Col>{event.domain}</Col>
                        <Col>{event.subdomain}</Col>
                        <Col>{event.status}</Col>
                        <Col><p>{new Date(event.created).toUTCString()}</p></Col>
                    </Row>
                   
                    <Row className="text-center">
                    <p>click for more</p> 
                    </Row>
                  
         
        </ListGroup.Item>

        <Modal show={showState} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Description</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              {event.description}
            </Row>
            <hr />
            <Row className='text-center'>
              {event.owners.map((owner) => (<Col>
                <Row>
                  <p><strong>{owner.name}</strong></p>
                </Row>
                <Row>
                  <p>{owner.role}</p>
                </Row>
              </Col>))}
              <Col>

              </Col>
            </Row>
            <hr />
            <Row>
              <Form.Label>Change this event status</Form.Label>
              <MySelect uid={event.uid} eventStatus={event.status} />
            </Row>
          </Container>
        </Modal.Body>
       
        
        <Modal.Footer>
          
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete this event
          </Button>
        </Modal.Footer>
      </Modal>
    </>
};

export default MyListGroupItem;