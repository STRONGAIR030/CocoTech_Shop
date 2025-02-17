import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { counterAction } from "../redux/slice/counterSlice";
import { useEffect } from "react";
import { useGetOrdersWithDetailByCustomerIdQuery } from "../redux/api/orderApi";

const TestPage = () => {
    const { data: orderList, isSuccess } =
        useGetOrdersWithDetailByCustomerIdQuery(1);
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isSuccess) {
            console.log("loading...");
        } else {
            console.log(orderList);
        }
    }, [orderList, isSuccess]);

    return (
        <StyledContainer>
            <CounterContainer>
                <h1>Count: {count} </h1>
                <button onClick={() => dispatch(counterAction.increment())}>
                    +1
                </button>
                <button onClick={() => dispatch(counterAction.decrement())}>
                    -1
                </button>
                <button onClick={() => dispatch(counterAction.reset())}>
                    -1
                </button>
            </CounterContainer>
        </StyledContainer>
    );
};

export default TestPage;

const StyledContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CounterContainer = styled.div`
    width: 500px;
    height: 500px;
    background-color: red;
    border-radius: 20px;

    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button {
        height: 40px;
        width: 100px;
    }
`;
