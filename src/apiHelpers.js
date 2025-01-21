import axios from "axios"
import { API_HOST } from "./constants"

export const fetchProductData = async (productId) => {
    try {
        const {data: productData} = await axios.get(`${API_HOST}/products/${productId}`)
        return productData
    } catch (err) {
        console.error(`Error fetching product data for ${productId}`, err);
        throw err
    }
}

export const fetchAllProductData = async () => {
    try {
        const {data: productsData} = await axios.get(`${API_HOST}/products`)
        return productsData
    } catch (err) {
        console.error(`Error fetching all product data:`, err);
        throw err
    }
}

export const fetchOrderData = async (orderId) => {
    try {
        const {data: orderData} = await axios.get(`${API_HOST}/orders/${orderId}`)
        return orderData
    } catch (err) {
        console.error(`Error fetching order data for ${orderId}`, err);
        throw err
    }
}

export const fetchOrderDataByCustomerId = async (customerId) => {
    try{
        const {data: ordersData} = await axios.get(`${API_HOST}/orders?customersId=${customerId}`)
        return ordersData
    } catch (err) {
        console.error(`Error fetching order data for customerId ${customerId}:`, err);
        throw err
    }
}

export const fetchAllOrderData = async() => {
    try {
        const {data: ordersData} = await axios.get(`${API_HOST}/orders`)
        return ordersData
    } catch (err) {
        console.error(`Error fetching orders data:`, err);
        throw err
    } 
}


export const fetchCustomerData = async (customerId) => {
    try {
        const {data : customerData} = await axios.get(`${API_HOST}/customers/${customerId}`)
        return customerData
    } catch (err) {
        console.error(`Error fetching customer data for ${customerId}`, err);
        throw err
    }
}