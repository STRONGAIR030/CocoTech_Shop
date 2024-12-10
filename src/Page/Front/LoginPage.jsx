import { NavLink } from "react-router"
import DefaultLayout from "../../components/layout/defaultLayout"

const LoginPage = () => {
    return (
        <DefaultLayout>
            <h3>LoginPage</h3>
            <NavLink to="/account/register">Register</NavLink>
            <NavLink to="/">go back to home</NavLink>
        </DefaultLayout>
    )
}

export default LoginPage