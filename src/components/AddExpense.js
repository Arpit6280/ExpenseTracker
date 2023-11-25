import React, { useState } from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from './UI/Modal';

function AddExpense(props) {
    console.log('kk');
    const [description,setDescription]=useState('')
    const [date,setDate]=useState('')
    const [price,setPrice]=useState('')
    const [category,setCategory]=useState('');
  
    const descriptionHandler=(e)=>{
      setDescription(e.target.value)
    }
    const dateHandler=(e)=>{
        setDate(e.target.value)
    }
    const priceHandler=(e)=>{
         setPrice(e.target.value)
    }
    const categoryHandler=(e)=>{
        setCategory(e.target.value)
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        let expense={
            description:description,
            date:date,
            price:price,
            category:category
        }
        props.addExpenses(expense)
        props.closeExpenseForm()
    }
  return (
    <Modal>
   <Form onSubmit={submitHandler}>
      <Row className="mb-3">
        <Form.Group as={Col} >
          <Form.Label>Description</Form.Label>
          <Form.Control type="text"  value={description} onChange={descriptionHandler}/>
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Date</Form.Label>
          <Form.Control type="date"  value={date} onChange={dateHandler} />
        </Form.Group>
      </Row>


      <Row className="mb-3">
        <Form.Group as={Col} >
          <Form.Label>Price</Form.Label>
          <Form.Control type='text' value={price} onChange={priceHandler} />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Category</Form.Label>
          <Form.Select defaultValue="Choose..." onChange={categoryHandler}>
            <option value="Entertainment">Entertainment</option>
            <option value="Fuel"> Fuel</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit">
        Cancel
      </Button>
      <Button variant="primary" type="submit" >
        Submit
      </Button>
    </Form>
    </Modal>
  )
}

export default AddExpense