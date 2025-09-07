export const addToCartFromServer = async (userId, product) => {
    try{
    const productId = product._id;
    const response = await fetch(`http://localhost:5000/api/carts/addToCart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, items: [{ _id: productId, count: 1 }] })
    })
        return response.status(200).json({message: 'Added to cart successFully'})
    }
    catch(error){
        console.log("Error in adding to cart:", error);
        throw error;
    }
}



export const getCartFromServer = async (userId) => {
    try
    {
        const response = await fetch(`http://localhost:5000/api/carts/getCart/${userId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log("response-->", response);
        return response.json({message:  'Cart fetched successFully', cart: response});
    }
    catch(error)
    {
        console.log("Error in getting cart:", error);
        throw error;
    }
}