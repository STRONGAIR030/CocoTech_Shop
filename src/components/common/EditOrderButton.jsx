import { useNavigate } from "react-router";
import EditButton from "./EditButton";
import PropTypes from "prop-types";

const EditOrderButton = ({ orderId }) => {
    const navigate = useNavigate();

    const goAdminOrderById = () => {
        navigate(`/admin/orders/${orderId}`);
    };

    return <EditButton handleClick={goAdminOrderById} />;
};

EditOrderButton.propTypes = {
    orderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
};

export default EditOrderButton;
