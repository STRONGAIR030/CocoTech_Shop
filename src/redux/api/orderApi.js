import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    fecthOrderWithDetailBQ,
    fetchAllOrderBQ,
    fetchOrdersByCustomerIdBQ,
} from "./bqfetchHelpers";
import { API_HOST } from "../../constants";

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${API_HOST}/` }),
    endpoints: (builder) => ({
        getOrdersWithDetailByCustomerId: builder.query({
            async queryFn(customerId, __, ___, fetchWithBQ) {
                try {
                    const orders = await fetchOrdersByCustomerIdBQ(
                        customerId,
                        fetchWithBQ,
                    );
                    const formattedOrderData = await Promise.all(
                        orders.map((order) =>
                            fecthOrderWithDetailBQ(order, fetchWithBQ),
                        ),
                    );
                    console.log(formattedOrderData);
                    return { data: formattedOrderData };
                } catch (err) {
                    return { error: err.message };
                }
            },
        }),
        getAllOrdersWithDetail: builder.query({
            async queryFn(_, __, ___, fetchWithBQ) {
                try {
                    const orders = await fetchAllOrderBQ(fetchWithBQ);
                    const ordersWhithDetail = await Promise.all(
                        orders.map((order) =>
                            fecthOrderWithDetailBQ(order, fetchWithBQ),
                        ),
                    );

                    console.log(ordersWhithDetail);

                    return { data: ordersWhithDetail };
                } catch (err) {
                    return { error: err.message };
                }
            },
        }),
    }),
});

export const {
    useGetAllOrdersWithDetailQuery,
    useGetOrdersWithDetailByCustomerIdQuery,
} = orderApi;
