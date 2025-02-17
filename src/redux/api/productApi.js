import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_HOST } from "../../constants";

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${API_HOST}/` }),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => "products",
            transformResponse: (res) => {
                return res.map((product) => {
                    const newProduct = { ...product };
                    delete newProduct.reviews;
                    return newProduct;
                });
            },
        }),
        getProductById: builder.query({
            query: (id) => `products/${id}`,
        }),
    }),
});

export const { useGetAllProductsQuery, useGetProductByIdQuery } = productsApi;
