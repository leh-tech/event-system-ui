import { useAppDispatch } from 'helpers/hooks';
import Form from 'react-bootstrap/Form';
import { changeStatus } from 'redux/eventReducers';

const MySelect = ({uid, eventStatus,}: {uid: string, eventStatus: string}) => {
    const dispatch = useAppDispatch();
    const onChange = (e: any) => {
        const changeData = { 
            uid,
            status: e.target.value
        }

        dispatch(changeStatus(changeData))
    }
  return (
    <Form.Select aria-label="Change event status" value={eventStatus} onChange={onChange}>
      <option>Open this select menu</option>
      <option value="Ongoing">OnGoing</option>
      <option value="Completed">Completed</option>
      <option value="Canceled">Canceled</option>
    </Form.Select>
  );
}

export default MySelect;