import { useParams } from "react-router"
import DefaultLayout from "../../components/layout/defaultLayout";

const ProductPage = () => {
    const {productId} = useParams();

    return (
        <DefaultLayout>
            ProductPage {productId}
        </DefaultLayout>

    )
}

export default ProductPage