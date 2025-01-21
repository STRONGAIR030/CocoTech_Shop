import { useNavigate, useParams } from "react-router";
import AdminLayout from "../../components/layout/AdminLayout";
import { useEffect, useState } from "react";
import { API_HOST } from "../../constants";
import axios from "axios";
import GoBackButton from "../../components/common/GoBackButton";
import styled from "styled-components";
import StyledTableContainer from "../../components/common/StyledTableContainer";
import StyledImgContainer from "../../components/common/StyledImgContainer";

const NoOrder = () => {
  return <StyledNoOrder>
    <h3>This customer has no orders!</h3>
  </StyledNoOrder>;
};

const AdminCustomer = () => {
  const { customerId } = useParams();
  const [orderList, setOrderList] = useState([]);
  const [orderDataLoaded, setLoaded] = useState(false);
  const navigate = useNavigate()
  const goAdminOrderById = (orderId) => {
    navigate(`/admin/orders/${orderId}`);
  };

  useEffect(() => {
    const fectCustomerOrder = async () => {
      try {
        console.log(customerId);
        const {data : customerData} = await axios.get(`${API_HOST}/customers/${customerId}`)
        const { data: orderData } = await axios.get(
          `${API_HOST}/orders?customersId=${customerId}`
        );
        const updateData = orderData.map((order) => {
          const updataOrder = {
            id: order.id,
            customerId,
            customerName: customerData.name,
            status: order.status,
            total: order.shipping + order.subTotal,
            date: order.date,
          };

          return updataOrder;
        });        
        console.log(updateData);
        
        setOrderList(updateData);
        setLoaded(true);
      } catch (err) {
        console.error();
        (err);
      }
    };

    fectCustomerOrder();
  }, []);

  return (
    <AdminLayout>
      <StyledCustomerPage>
        <GoBackButton />
        <h3>CustomerId : {customerId}</h3>
        {orderDataLoaded && orderList.length ? (
        <StyledCustomerOrdersContainer>
          <StyledTableContainer $minWidth="800px">
            <table>
              <tbody>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Edit</th>
                </tr>
                {orderList.map((order) => {
                  return (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customerName}</td>
                      <td>{order.status}</td>
                      <td>{order.date}</td>
                      <td>{order.total}$</td>
                      <td>
                        <button
                          onClick={() => {
                            goAdminOrderById(order.id);
                          }}
                        >
                          <StyledImgContainer $imgUrl="/img/orderEdit.svg">
                            <div />
                          </StyledImgContainer>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </StyledTableContainer>
        </StyledCustomerOrdersContainer>
        ) : (
          <NoOrder />
        )}
      </StyledCustomerPage>
    </AdminLayout>
  );
};

export default AdminCustomer;

const StyledCustomerPage = styled.div`
    width: 100%;
    height: 100%;

    & > h3{
        padding: 16px;
        font-size: 32px;

        @media screen and (max-width: 746px){
            font-size: 24px;
        }
    }
`;

const StyledNoOrder = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;

    h3{
        text-align: center;
        padding: 16px;
        font-size: 48px;
    }
`;

const StyledCustomerOrdersContainer = styled.div`
    width: 100%;
    padding: 16px 16px 16px 16px;

    & > h3{
        font-size: 28px;
        padding: 16px 8px;
    }

    td button {
    width: 40px;
    border-radius: 15px;
    padding: 8px;
    cursor: pointer;
  }
`