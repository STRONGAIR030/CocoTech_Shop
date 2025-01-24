import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import axios from "axios";
import { API_HOST } from "../../constants";
import EditButton from "../../components/common/EditButton";
import { useNavigate } from "react-router";
import styled from "styled-components";
import AdminTable from "../../components/common/AdminTable";
import PropTypes from "prop-types";

const EditProductButton = ({productId}) => {
    const navigate = useNavigate();
    const goAdminProductById = () => {
        console.log(productId);
        
        navigate(`/admin/products/${productId}`);
    };

    return <EditButton handleClick={goAdminProductById} />
}

EditProductButton.propTypes = {
    productId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}

const productListHeaders = [
    { label: "Product ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Price", key: "price", unitSymbol: "$" },
    { label: "Stock", key: "stock" },
    { label: "Edit", key: "editButton" },
]

const AdminProductsPage = () => {
    const [productList, setProductList] = useState([]);
    const [productDataLoaded, setProductDataLoaded] = useState(false);
    
    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const { data: productsData } = await axios.get(`${API_HOST}/products`);
                console.log(productsData);
                
                const updateProductList = productsData.map((product) => {
                    return {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        stock: product.stock,
                    };
                });
                console.log(updateProductList);
                setProductList(updateProductList);
                setProductDataLoaded(true);
            } catch (err) {
                console.error(err);
            }
        };
        
        fetchProductList();
    }, []);
    
    const produtListDatas = useMemo(() => {
        return productList.map((product) => {
            return {
                ...product,
                editButton: <EditProductButton productId={product.id} />
            }
        })
    }, [productList])
    
    return (
        <AdminLayout>
            <StyledAdminProductsPage>
                <h3>Product List</h3>
                <AdminTable 
                    headers={productListHeaders}
                    datas={produtListDatas}
                    dataLoaded={productDataLoaded}
                />
            </StyledAdminProductsPage>
        </AdminLayout>
  );
};

export default AdminProductsPage;

const StyledAdminProductsPage = styled.div`
    width: 100%;
    padding: 16px;
    & > h3 {
        font-size: 24px;
        padding: 16px 0px;
    }
`;
