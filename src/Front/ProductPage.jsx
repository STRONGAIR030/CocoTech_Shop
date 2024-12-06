import { useParams } from "react-router"

const ProductPage = () => {
    const {productId} = useParams();

    return (
        <div>
            ProductPage {productId}
        </div>

    )
}

export default ProductPage