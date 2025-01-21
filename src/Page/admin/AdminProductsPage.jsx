import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import axios from "axios";
import { API_HOST } from "../../constants";
import EditButton from "../../components/common/EditButton";
import { useNavigate } from "react-router";
import StyledTableContainer from "../../components/common/StyledTableContainer";
import styled from "styled-components";

const AdminProductsPage = () => {
  const [productList, setProductList] = useState([]);
  const [dataLoaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const goAdminProductById = (productId) => {
    navigate(`/admin/products/${productId}`);
  };

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
        setLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProductList();
  }, []);

  return (
    <AdminLayout>
      <StyledAdminProductsPage>
        <h3>Product List</h3>
        <StyledTableContainer $minWidth="800px">
          <table>
            <tbody>
              <tr>
                <th>Product ID</th>
                <th>name</th>
                <th>Price</th>
                <th>stock</th>
                <th>Edit</th>
              </tr>
              {dataLoaded &&
                productList.length &&
                productList.map((product) => {
                  return (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.price}$</td>
                      <td>{product.stock}</td>
                      <td>
                        <EditButton
                          handleClick={() => {
                            goAdminProductById(product.id);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </StyledTableContainer>
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
