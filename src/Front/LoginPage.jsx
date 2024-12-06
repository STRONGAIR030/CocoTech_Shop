import { NavLink } from "react-router"

const LoginPage = () => {
    return (
        <div>
            <h3>LoginPage</h3>
            <NavLink to="/account/register">Register</NavLink>
            <NavLink to="/">go back to home</NavLink>
        </div>
    )
}

export default LoginPage