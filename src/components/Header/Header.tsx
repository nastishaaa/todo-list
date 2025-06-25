import { NavLink } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { logout } from "../../redux/auth/operations"
import toast from "react-hot-toast"
import { selectIsLoggedIn } from "../../redux/auth/selectors"
import './Header.module.css'

export const Header = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const handleLogout = () => {
        dispatch(logout());
        toast.success('Logged Out')
    }
    return (
        <>
            <nav >
                <NavLink to='/'>Home Page</NavLink>
                <NavLink to='/registration'>Registration Page</NavLink>
                <NavLink to='/login'>Login Page</NavLink>
                <NavLink to='/dashboard'>Todo List</NavLink>
                <button className="btn btn-soft btn-secondary" type="button" disabled={!isLoggedIn} onClick={handleLogout}>Logout</button>
            </nav>
        </>
    )
}