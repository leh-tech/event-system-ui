import { useAppSelector, useAppDispatch } from "helpers/hooks"
import { ListGroup } from "react-bootstrap"
import Sort from "./Sort"

const EventList = (props) => {
    const count = useAppSelector((state) => state.events.events);
    const dispatch = useAppDispatch();
    const eventClicked = () => {
        alert('You clicked the third ListGroupItem');
    };

    return <ListGroup defaultActiveKey="#link1">
        <ListGroup.Item action href="#link1">
            Link 1
        </ListGroup.Item>
        <ListGroup.Item action href="#link2" disabled>
            Link 2
        </ListGroup.Item>
        <ListGroup.Item action onClick={eventClicked}>
            This one is a button
        </ListGroup.Item>
    </ListGroup>
}