import { useAppDispatch } from '../../redux/hooks';
import { register } from '../../redux/auth/operations';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useId } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import c from './RegistrationForm.module.css'

export type FormValues = {
    name: string;
    email: string;
    password: string;
}

const FeedbackSchema = Yup.object().shape({
    email: Yup.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email').required('Requaried'),
    password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/, 'Invalid password').min(6, 'Too short').max(15, 'Too long').required('Requaried'),
});

const initialValues: FormValues = {
    name: '',
    email: '', 
    password: '',
}

export default function RegisterForm () {
    const emailField = useId();
    const passwordField = useId();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
        try {
            const resultAction = await dispatch(register(values));
            if (register.fulfilled.match(resultAction)) {
                toast.success('Successful registration!');
                actions.resetForm();
                navigate('/dashboard');
            } else {
                toast.error("Something went wrong. Try again!");
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

                <Form className={c.form}>
                    <label className={c.label} htmlFor={emailField}>Email</label>
                    <Field
                        className={c.input}
                        type='email'
                        name='email'
                        id={emailField}
                        autoComplete='off' />
                    <ErrorMessage name='email' component='span'></ErrorMessage>
                        
                    <label  className={c.label} htmlFor={passwordField}>Password</label>
                    <Field  className={c.input} type='password'
                        name='password'
                        id={passwordField}
                        autoComplete='off' />
                    <ErrorMessage name='password' component='span'></ErrorMessage>
                        
                    <button className={c.button} type='submit'>Register</button>
                </Form>
            </Formik>
            <div><Link to='/login'>Already have an account? Log in!</Link></div>
        </>
    );
};