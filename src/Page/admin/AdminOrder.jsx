import styled from "styled-components";
import AdminLayout from "../../components/layout/AdminLayout";
import GoBackButton from "../../components/common/GoBackButton";
import StyledImgContainer from "../../components/common/StyledImgContainer";
import { useNavigate, useParams } from "react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { API_HOST } from "../../constants";
import { fetchOrderData, processDetailedOrder } from "../../apiHelpers";
import AdminTable from "../../components/common/AdminTable";

const productSummaryHeaders = [
    { label: "Product img", key: "productImg" },
    { label: "Product name", key: "name" },
    { label: "Quantity", key: "quantity" },
    { label: "Total cost", key: "totalCost", unitSymbol: "$" },
];

const AdminOrder = () => {
    const { orderId } = useParams();
    const [orderInf, setOrderInf] = useState({});
    const selectRef = useRef();
    const navigation = useNavigate();

    const goAdminHome = () => navigation("/admin/home");

    const fetchOrder = async () => {
        try {
            const orderData = await fetchOrderData(orderId);

            const processedOrderData = await processDetailedOrder(orderData);

            setOrderInf(processedOrderData);
        } catch (err) {
            console.error(err);
            goAdminHome();
        }
    };

    const productSummaryDatas = useMemo(() => {
        if (!orderInf.orderProducts) return [];

        return orderInf.orderProducts.map((product) => {
            return {
                ...product,
                totalCost: product.price * product.quantity,
                productImg: (
                    <ProductImg $imgUrl={product.imgUrl}>
                        <div></div>
                    </ProductImg>
                ),
            };
        });
    }, [orderInf.orderProducts]);

    const handleSave = async () => {
        console.log(selectRef.current.value);
        try {
            const patchData = {
                status: selectRef.current.value,
            };
            axios.patch(
                `${API_HOST}/orders/${orderId}`,
                patchData,
            );
            console.log(patchData);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, [fetchOrder]);
    return (
        <AdminLayout>
            <StyledOrderPage>
                <GoBackButton />
                <StyledOrderContainer>
                    <h3>Order id : {orderId}</h3>
                    <StyledOrderInfContainer>
                        <StyledOrderInf>
                            <h3>Customer</h3>
                            <h4>{orderInf.customerName}</h4>
                        </StyledOrderInf>
                        <StyledOrderInf>
                            <h3>Date</h3>
                            <h4>{orderInf.date}</h4>
                        </StyledOrderInf>
                    </StyledOrderInfContainer>
                    <ProductsTableContainer>
                        <AdminTable
                            headers={productSummaryHeaders}
                            datas={productSummaryDatas}
                            dataLoaded={true}
                        />
                    </ProductsTableContainer>
                    <OrderCostInfContainer>
                        <div>
                            <StyledCost>
                                <h3>Subtotal</h3>
                                <h3>{orderInf.subTotal}$</h3>
                            </StyledCost>
                            <StyledCost>
                                <h3>Shipping</h3>
                                <h3>{orderInf.shipping}$</h3>
                            </StyledCost>
                            <hr />
                            <StyledCost>
                                <h3>Total</h3>
                                <h3>
                                    {orderInf.subTotal + orderInf.shipping}$
                                </h3>
                            </StyledCost>
                        </div>
                        <div>
                            <h3>Order Status: </h3>
                            {orderInf.status && (
                                <select
                                    defaultValue={orderInf.status}
                                    ref={selectRef}
                                >
                                    <option value="2">complete</option>
                                    <option value="0">incomplete</option>
                                </select>
                            )}
                            <button onClick={handleSave}>Save</button>
                        </div>
                    </OrderCostInfContainer>
                </StyledOrderContainer>
            </StyledOrderPage>
        </AdminLayout>
    );
};

export default AdminOrder;

const StyledOrderPage = styled.div`
    width: 100%;
    padding: 16px;
`;

const StyledOrderContainer = styled.div`
    width: 100%;
    margin-top: 64px;
    padding: 16px;
    border: 4px solid #8d5524;
    border-radius: 20px;

    & > h3 {
        font-size: 28px;
        padding: 16px 8px;
    }
`;

const StyledOrderInf = styled.div`
    border: 3px solid #8d5524;
    flex: 1;
    h3,
    h4 {
        padding: 8px;
    }

    h3 {
        font-size: 24px;
        border-bottom: 3px solid #8d5524;
    }

    h4 {
        text-align: center;
        font-size: 28px;
    }

    @media screen and (max-width: 540px) {
        flex: none;
        width: 100%;
    }
`;

const StyledOrderInfContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;

    ${StyledOrderInf}:last-child {
        flex: 2;
    }
`;

const ProductImg = styled(StyledImgContainer)`
    margin: 8px auto;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 5px 15px;
    width: 80px;
    border-radius: 20px;
`;

const ProductsTableContainer = styled.div`
    margin: 16px 0px;
`;

const OrderCostInfContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;

    & > div {
        flex: 2;
        border: 3px solid #8d5524;
        padding: 16px;

        @media screen and (max-width: 540px) {
            flex: none;
            width: 100%;
        }
    }

    & > div:nth-child(2) {
        border: none;
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        justify-content: end;
        align-items: end;

        @media screen and (max-width: 540px) {
            flex-wrap: wrap;
        }

        select,
        button,
        h3 {
            font-size: 24px;
            padding: 8px 16px;
            border-radius: 20px;
            display: inline-block;
            width: 100%;
        }

        select {
            display: block;
        }
    }

    hr {
        margin: 0px 16px;
        border: none;
        border-top: 3px solid #8d5524;
    }
`;

const StyledCost = styled.div`
    width: 100%;
    padding: 16px 0px;
    display: flex;
    justify-content: space-between;
`;
