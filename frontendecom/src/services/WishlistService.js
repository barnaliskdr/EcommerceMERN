export const getAllWishListFromServer = async (userId) => {
  try {
    const response = await fetch('http://localhost:5000/api/products/getAllWishlistItems', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });

    if (!response.ok) {
      throw new Error("Failed to fetch wishlist items");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching wishlist items:", error);
    throw error;
  }
};

export const removeFromWishListServer = async (product, userId) => {
  try {
    console.log("Removing from wishlist - userId:", userId, " productId:", product._id);
    const productId = product._id;
    const response = await fetch('http://localhost:5000/api/products/wishlist/remove', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, productId })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Failed to remove from wishlist");
    }

    return await response.json();
  } catch (error) {
    console.log("Error in removing from wishlist:", error);
    throw error;
  }
};

export const AddToWishListFromServer = async (productId, userId) => {
  try {
    console.log("Adding to wishlist - userId:", userId, " productId:", productId);

    const response = await fetch('http://localhost:5000/api/products/wishlist/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, productId })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Failed to add to wishlist");
    }

    return await response.json();
  } catch (error) {
    console.log("Error in adding to wishlist:", error);
    throw error;
  }
};
