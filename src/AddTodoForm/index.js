import { Button } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { useForm } from "react-hook-form";
import "./AddTodoForm.css"
import Swal from 'sweetalert2'

function AddTodoForm({ setTodosList }) {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = async newTodoItem => {

        try {
            const response = await fetch(`http://localhost:3001/todo/createTodo`, {
                method: 'POST',
                body: JSON.stringify(newTodoItem),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();

            if (response.ok) {

                // update the list
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                })

                Toast.fire({
                    icon: 'success',
                    title: 'Todo successfully added'
                })

                setTodosList(data)
            }
            else {
                // This is another way to create alerts using a library
                 //https://sweetalert2.github.io/
                 Swal.fire({
                     title: 'Error!',
                     text: data.message,
                    icon: 'error',
                     confirmButtonText: 'Cool'
                })
                //alert('Something went wrong while deleting this todo.')
            }
        } catch (error) {
            console.log("TodoItem -> error", error)
        }

    }
    return (
        <div className="form-container">
            <h2 className="center">Add a new Todo</h2>
            <br />
            <Form onSubmit={handleSubmit(onSubmit)} inline={true}>
                <FormGroup className="mb-4 mr-sm-4 mb-sm-0">
                    <Label for="title">Title</Label>
                    <Input innerRef={register({ required: true })} name="title" id="title" placeholder="Title" required />
                    {errors.title && <span className="error-text">Title is required</span>}
                </FormGroup>
                <FormGroup className="mb-4 mr-sm-4 mb-sm-0">
                    <Label for="category-select">Select a category </Label>
                    <Input type="select" name="category" id="category-select" innerRef={register()}>
                        <option>University</option>
                        <option>Work</option>
                        <option>Family</option>
                        <option>Sport</option>
                    </Input>
                </FormGroup>
                <FormGroup className="mb-4 mr-sm-4 mb-sm-0">
                    <Label for="priority-select">Select a priority </Label>
                    <Input type="select" name="priority" id="priority-select" innerRef={register()}>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </Input>
                </FormGroup>
                <FormGroup className="mb-4 mr-sm-4 mb-sm-0">
                    <Label for="deadline">Deadline</Label>
                    <Input
                        type="date"
                        name="deadline"
                        id="deadline"
                        placeholder="date placeholder"
                        innerRef={register({ required: true })}
                        required />
                </FormGroup>
                <Button color="primary" type="submit">Submit</Button>
            </Form>
        </div >
    );
}

export default AddTodoForm;