import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EventList from './components/EventList';
import MyForm from 'components/MyForm';


function EventsSection () {
    return <Container>
        <Row className='my-2'>
        <MyForm></MyForm>
        </Row>
        
        <Row>
            <EventList ></EventList>
        </Row>
    </Container>
}

export default EventsSection;