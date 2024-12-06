import { NavLink } from "react-router"

const RegisterPage = () => {
    return (
        <div>
            <h3>RegisterPage</h3>
            <NavLink to="/account/login">Login</NavLink>
            <NavLink to="/">go back to home</NavLink>
        </div>
    )
}

export default RegisterPage