import { useAppDispatch } from 'helpers/hooks';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { searchQuery } from '../redux/searchReducer';

const MyForm = () => {
    const dispatch = useAppDispatch();
    const [text, setText] = useState('');
    const onSubmit = () => {
        dispatch(searchQuery({text}));
    }

    const onChange = (e: any) => (setText(e.target.value));

    return (
        <Form>
            <Form.Group className="mb-1" controlId="formBasicEmail">
                <Form.Label>Search events</Form.Label>
                <Form.Control placeholder="Search..." value={text} onChange={onChange} />
                {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text> */}
            </Form.Group>

           
           
            <Button variant="primary" onClick={onSubmit}>
                Search
            </Button>
        </Form>
    );
}

export default MyForm;