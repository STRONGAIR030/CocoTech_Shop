import { NavLink } from "react-router"
import DefaultLayout from "../../components/layout/defaultLayout"

const RegisterPage = () => {
    return (
        <DefaultLayout>
            <h3>RegisterPage</h3>
            <NavLink to="/account/login">Login</NavLink>
            <NavLink to="/">go back to home</NavLink>
        </DefaultLayout>
    )
}

export default RegisterPage