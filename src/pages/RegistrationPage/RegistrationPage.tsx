import RegisterForm from "../../components/RegistrationForm/RegistrationForm"
import c from './RegistrationPage.module.css'

export default function RegistrationPage() {
    return (
        <>
            <h2 className={c.header}>Register</h2>
            <RegisterForm />
        </>
    )
}