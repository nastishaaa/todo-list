import { useAppDispatch } from '../../redux/hooks';
import { login } from '../../redux/auth/operations';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useId } from 'react';
import toast from 'react-hot-toast';
import type { FormValues } from '../RegistrationForm/RegistrationForm';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.module.css'

const FeedbackSchema = Yup.object().shape({
    email: Yup.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email').required('Requaried'),
    password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/, 'Invalid password').min(6, 'Too short').max(15, 'Too long').required('Requaried'),
});

const initialValues: FormValues = {
    name: '',
    email: '', 
    password: '',
}

export default function LoginForm () {
    const emailField = useId();
    const passwordField = useId();
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const handleSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
        try {
            const resultAction = await dispatch(login(values));
    
            if (login.fulfilled.match(resultAction)) {
                toast.success('Successful login!');
                actions.resetForm();
                navigate('/dashboard');
            } else {
                toast.error("Please register first!");

            }
        } catch {
            toast.error("Something went wrong!");
        }
  };

    return (
        <>
            <Formik initialValues={initialValues}
                validationSchema={FeedbackSchema}
                onSubmit={handleSubmit}>

                <Form >
                    <label htmlFor={emailField}>Email</label>
                    <Field type='email'
                        name='email'
                        id={emailField}
                        autoComplete='off' />
                    <ErrorMessage name='email' component='span'></ErrorMessage>
                        
                    <label htmlFor={passwordField}>Password</label>
                    <Field type='password'
                        name='password'
                        id={passwordField}
                        autoComplete='off' />
                    <ErrorMessage name='password' component='span'></ErrorMessage>
                        
                    <button type='submit'>Log in</button>
                </Form>
            </Formik>
            <div><Link to='/registration'>Don't have an account yet? Register!</Link></div>
        </>
    );
};