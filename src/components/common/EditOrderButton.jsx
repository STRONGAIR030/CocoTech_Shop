import { useNavigate } from "react-router"
import EditButton from "./EditButton";

const EditOrderButton = ({orderId}) => {
    const navigate = useNavigate()

    const goAdminOrderById = () => {
        navigate(`/admin/orders/${orderId}`);
    };

    return <EditButton handleClick={goAdminOrderById} />
}

export default EditOrderButton