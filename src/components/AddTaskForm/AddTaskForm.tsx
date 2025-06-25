import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik"
import * as Yup from 'yup';
import { useId } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { addTodo } from "../../redux/todos/operations";
import c from './AddTaskForm.module.css'

interface todoValues {
    name: string,
    description: string, 
}
const FeedbackSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Too short').max(15, 'Too long').required('Requaried'),
    description: Yup.string().min(3, 'Too short').max(35, 'Too long').required('Requaried'),
});

const initialValues: todoValues = {
    name: '',
    description: '', 
}

export const AddTaskForm = () => {
    const nameField = useId();
    const descriptionField = useId();

    const dispatch = useAppDispatch();

    const handleSubmit = async (values: todoValues, actions: FormikHelpers<todoValues>) => {
        dispatch(addTodo({...values}));
        actions.resetForm();
    };

return (
    <>
        <Formik initialValues={initialValues}
            validationSchema={FeedbackSchema}
            onSubmit={handleSubmit}>
            
            <Form className={c.form}>
                <label className={c.label} htmlFor={nameField}>Name</label>
                <Field className={c.input}
                    name='name'
                    id={nameField}
                    autoComplete='off' />
                <ErrorMessage name='todoName' component='span'></ErrorMessage>
                                    
                <label className={c.label} htmlFor={descriptionField}>Description</label>
                <Field className={c.input}
                    name='description'
                    id={descriptionField}
                    autoComplete='off' />
                <ErrorMessage name='description' component='span'></ErrorMessage>
                                    
                <button type='submit'>Add task</button>
            </Form>
        </Formik>
    </>
)
}