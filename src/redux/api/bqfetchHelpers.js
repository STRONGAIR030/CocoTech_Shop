const fetchBQData = async (endpoints, fetchWithBQ) => {
    const res = await fetchWithBQ(endpoints);
    if (res.error) throw new Error(res.error);
    return res.data;
};

export const fetchAllOrderBQ = async (fetchWithBQ) => {
    const orders = await fetchBQData(`orders`, fetchWithBQ);
    return orders;
};

export const fetchOrdersByCustomerIdBQ = async (customerId, fetchWithBQ) => {
    const orders = await fetchBQData(
        `orders?customersId=${customerId}`,
        fetchWithBQ,
    );
    return orders;
};

export const fetchProductByIdBQ = async (productId, fetchWithBQ) => {
    const product = await fetchBQData(`products/${productId}`, fetchWithBQ);
    return product;
};

export const fetchCustomerByIdBQ = async (customerId, fetchWithBQ) => {
    const customer = await fetchBQData(`customers/${customerId}`, fetchWithBQ);
    return customer;
};

export const fecthOrderProductBQ = async (order, fetchWithBQ) => {
    const orderProdcuts = await Promise.all(
        order.detail.map(async (product) => {
            try {
                const productData = await fetchProductByIdBQ(
                    product.productId,
                    fetchWithBQ,
                );

                return {
                    id: productData.id,
                    price: Number(productData.price),
                    imgUrl: productData.img[0],
                    name: productData.name,
                    quantity: product.quantity,
                };
            } catch (err) {
                console.error(err);
                return null;
            }
        }),
    );

    return orderProdcuts;
};

export const fecthOrderWithDetailBQ = async (order, fetchWithBQ) => {
    const customer = await fetchCustomerByIdBQ(order.customersId, fetchWithBQ);
    const orderProducts = await fecthOrderProductBQ(order, fetchWithBQ);
    const orderWhithDetail = {
        id: order.id,
        subTotal: order.subTotal,
        shipping: order.shipping,
        total: order.subTotal + order.shipping,
        date: order.date,
        orderProducts,
        customersId: order.customersId,
        customerName: customer.name,
        status: `${order.status}`,
    };

    return orderWhithDetail;
};
