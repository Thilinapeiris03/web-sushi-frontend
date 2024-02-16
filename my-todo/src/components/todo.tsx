import React, { useEffect, useState } from 'react';
import { Badge, Button, Form, ListGroup, Modal } from "react-bootstrap";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import axios from 'axios';

function TodoList(): JSX.Element {
    const [showModal, setShow] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [data, setData] = useState([]);

    const handleCloseModal = () => setShow(false);
    const handleShow = () => setShow(true);

    const onDelete = (id : any) =>{

        console.log("adad",id);
        
        axios.delete(`http://localhost:4000/todos/${id}`)
            .then(response => {
                alert('Successfuly Deleted!!');
                getlist();
            })
            .catch(error => {
                alert(error);
            });
    };

    const onSave = (val: any) => {
        val.preventDefault();
        const formData = new FormData(val.target), formDataObj = Object.fromEntries(formData.entries());
        console.log(formDataObj);

        axios.post('http://localhost:4000/todos', {
            title: formDataObj.title,
            description: formDataObj.description,
            date: formDataObj.date
        })
            .then(function (response) {
                alert("Success");
                getlist();
            })
            .catch(function (error) {
                alert("Failed");
            });
    };

    const onUpdate = (val: any) => {
        val.preventDefault();
        const formData = new FormData(val.target), formDataObj = Object.fromEntries(formData.entries());
        console.log(formDataObj);
        console.log(formDataObj.id);

        axios.put(`http://localhost:4000/todos/1`, {
            title: formDataObj.title,
            description: formDataObj.description,
            date: formDataObj.date
        })
            .then(()=>{
                alert('Successfull')
                getlist();
            })
            .catch(function (error) {
                alert("Failed");
            });
    };

    useEffect(()=> {
        // Get the list of tos when component renders
        getlist()
    },[])


    
    const getlist = () => {
        axios.get('http://localhost:4000/todos')
            .then(response => {
                setData(response.data);
                console.log(response.data);
            })
            .catch(error => {
                alert(error);
            });
    };


    
    return (
        <div className='container m-5'>
            <div className="m-2" style={{ textAlign: 'right' }}>
                <Button variant="success" onClick={handleShow}>Add Todo</Button>
                <Button className='m-2' variant="info" onClick={getlist}>Update List</Button>
            </div>
            <ListGroup as="ol" numbered>
                {data.map((item: any) => (
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                        key={item?.id}
                    >
                        <div className="ms-2 me-auto" >
                            <div className="fw-bold">{item?.title}
                            <div> &emsp; {item?.date}</div></div>
                            {item?.description}
                        </div>
                        <Button variant="secondary">Update</Button>
                        <Button className='ms-2 ' variant="danger" onClick={()=>onDelete(item?._id)}>Delete</Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Todo Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSave}>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name='title' autoFocus>{}</Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control name='description' as="textarea" rows={2} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Date</Form.Label>
                            <br />
                            <DatePicker name='date' selected={startDate} onChange={(date: any) => setStartDate(date)} />
                        </Form.Group>
                        <div style={{ textAlign: 'right' }}>
                            <Button variant="primary" type='submit'>Add</Button>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleCloseModal}>Update</Button>
                    <Button variant="danger" onClick={handleCloseModal}>Delete</Button>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default TodoList;
