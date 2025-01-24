import axios from "axios"
import { API_HOST } from "./constants"

/*--------------------------------------
    fetch function
----------------------------------------*/

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

export const fetchAllCustomersData = async () => {
    try {
        const {data: customersData} = await axios.get(`${API_HOST}/customers`)
        return customersData
    } catch (err) {
        console.error(`Error fetching customers data:`, err);
        throw err
    } 
}

/*--------------------------------------
    process function
----------------------------------------*/

export const processOrderProductsData = async (order) => {
    const processedOrderProducts = await Promise.all(order.detail.map( async (product) => {

        try {
            const productData = await fetchProductData(product.productId)             

            return {
                id: productData.id,
                price: Number(productData.price),
                imgUrl: productData.img[0],
                name: productData.name,
                quantity: product.quantity
            }

        } catch (err) {
            console.error(err);
            return null   
        }
    }))

    return processedOrderProducts.filter(product => product !== null)
}

export const processOrderData = async (order) => {
    try {
        const customerData = await fetchCustomerData(order.customersId)

        const formattedOrderData = {
            id: order.id,
            customersId: order.customersId,
            subTotal: order.subTotal,
            shipping: order.shipping,
            total: order.subTotal + order.shipping,
            date: order.date,
            customerName: customerData.name,
            status: `${order.status}`,
        }

        return formattedOrderData
    } catch (err) {
        console.error(`Error processing order ${order.id}:`, err);
        return null
    }
}

export const processDetailedOrder = async (order) => {
    const orderData = await processOrderData(order)
    const productData = await processOrderProductsData(order)
    const processedDetailedOrder = {
        ...orderData,
        orderProducts: productData,
    }

    return processedDetailedOrder
}

export const processOrdersData = async (orders) => {
    const processedOrdersData = await Promise.all(orders.map(async (order) => {
        return await processOrderData(order)
    }))
    return processedOrdersData.filter(order => order !== null);
}

export const processDetailedOrders = async (orders) => {
    const processedOrdersData = await Promise.all(orders.map(async (order) => {
        return await processDetailedOrder(order)
    }))
    return processedOrdersData.filter(order => order !== null);
}
