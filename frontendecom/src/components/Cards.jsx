import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import Rating from './Rating';
import { toast } from 'react-toastify';
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { addToWishList, removeFromWishList, getAllWishList } from '../actions/WishListActions.js';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Singleproduct from './Singleproduct';

const Cards = ({ productType }) => {

  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [wishlistedItems, setWishlistedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const dispatch = useDispatch();
  const userData = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("id");
  const wishlist = useSelector((state) => state.wishlist);
  console.log("Hii wishList:", wishlist);

  useEffect (() => {
    dispatch((getAllWishList(userId))); 
    // setWishlistedItems(wishlist);
  },[])
  const wishlistHandler = (product) => {
    setWishlistedItems((prev) =>{
      if(prev.includes(product._id))
      {
            if(userData){

             toast.info("Product removed from Wishlist");
             dispatch(removeFromWishList(product, userId));
             return prev.filter((id) => id !== product._id);
            }
            else
            {
              toast.info("Please login to add items to wishlist");
            }
      } // remove if already wishlisted
      else
      {
        if(userData){
        toast.info("Product added to Wishlist");
        dispatch(addToWishList(product._id, userId));
        return [...prev, product._id];
        }// add if not wishlisted
        else{
          toast.info("Please login to remove items from wishlist");
        }
      }
    })
  };

  const viewDetailsHandle = (product) => {
    setSelectedProduct(product);
    setVisible(true);
  };

  const handleAddToCart = (product) => {
    if (userData !== null) {
      dispatch(addToCart(userId,product));
    } else {
      setShowToast(true);
      toast.info("Please login to add items to cart");
    }
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(userId,product));
  };

  const getAllProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const specifyTypes = (productType) => {
    if (!products) return [];
    switch (productType) {
      case 'Fruits':
        return products.filter((product) => product.category === 'Fruits');
      case 'Vegetables':
        return products.filter((product) => product.category === 'Vegetables');
      case 'Dairy':
        return products.filter((product) => product.category === 'Dairy');
      case 'Bakery':
        return products.filter((product) => product.category === 'Bakery');
      case 'Spices':
        return products.filter((product) => product.category === 'Spices');
      case 'Frozen':
        return products.filter((product) => product.category === 'Frozen');
      case 'Grain':
        return products.filter((product) => product.category === 'Grain');
      case 'Dairy Alternatives':
        return products.filter((product) => product.category === 'Dairy Alternatives');
      default:
        return products;
    }
  };

  const filteredProducts = specifyTypes(productType);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const currentItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <Button
          variant={currentPage === i ? "contained" : "outlined"}
          key={i}
          sx={{ mx: 0.5, minWidth: 36 }}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </Button>
      );
    }
    return pageNumbers;
  };

  // return (
  //   <>
  //     <Box sx={{ flexGrow: 1, py: 3 }}>
  //       <Grid container spacing={3} justifyContent="center">
  //         {currentItems.map((product) => (
  //           <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
  //             <Card sx={{ width: '100%', minHeight: 350, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
  //               <CardMedia
  //                 component="img"
  //                 height="160"
  //                 image={product.image}
  //                 alt={product.name}
  //                 sx={{ objectFit: 'contain', p: 2 }}
  //               />
  //               <CardContent>
  //                 <Typography gutterBottom variant="h6" component="div">{product.name}</Typography>
  //                 <Typography>Price: ${product.price}</Typography>
  //                 <Typography variant="body2" color="text.secondary">
  //                   <Rating value={product.rating} />
  //                 </Typography>
  //               </CardContent>
  //               <CardActions sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
  //                 <Button
  //                   variant="outlined"
  //                   size="small"
  //                   onClick={() => viewDetailsHandle(product)}
  //                 >
  //                   View Details
  //                 </Button>
  //                 <Button
  //                   variant="outlined"
  //                   size="small"
  //                   color={wishlisted ? "error" : "primary"}
  //                   onClick={() => wishlistHandler(product)}
  //                   startIcon={wishlisted ? <IoMdHeart /> : <IoMdHeartEmpty />}
  //                 >
  //                   Add to Wishlist
  //                 </Button>
  //                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
  //                   <Button variant="outlined" size="small" onClick={() => handleRemoveFromCart(product)}>-</Button>
  //                   <Typography variant="body2" sx={{ px: 1 }}>Add To Cart</Typography>
  //                   <Button variant="outlined" size="small" onClick={() => handleAddToCart(product)}>+</Button>
  //                 </Box>
  //               </CardActions>
  //             </Card>
  //           </Grid>
  //         ))}
  //       </Grid>
  //     </Box>
  //     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2 }}>
  //       <Button
  //         variant="outlined"
  //         onClick={handlePreviousPage}
  //         disabled={currentPage === 1}
  //         sx={{ mx: 1 }}
  //       >
  //         Previous
  //       </Button>
  //       {renderPageNumbers()}
  //       <Button
  //         variant="outlined"
  //         onClick={handleNextPage}
  //         disabled={currentPage === totalPages}
  //         sx={{ mx: 1 }}
  //       >
  //         Next
  //       </Button>
  //     </Box>
  //     {selectedProduct && (
  //       <Singleproduct
  //         product={selectedProduct}
  //         setVisible={setVisible}
  //         visible={visible}
  //       />
  //     )}
  //   </>
  // );

  return (
  <>
    <div className="d-flex flex-wrap justify-content-center m-4 gap-5">
      {currentItems.map((product) => (
        <Card>
          <CardMedia
            sx={{ height: 140 }}
            image={product.image}
            title={product.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography>Price: ${product.price}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              <Rating value={product.rating} />
            </Typography>
          </CardContent>
          <CardActions>
            <div className="d-flex justify-content-center align-items-center gap-2 small">
              <Button
                className="bg-light border text-dark w-3"
                size="small"
                onClick={() => viewDetailsHandle(product)}
              >
                View Details
              </Button>
              <Button
                className="bg-light border text-dark w-3"
                size="small"
                onClick={() => wishlistHandler(product)}>
                {wishlistedItems.includes(product._id) ? <IoMdHeart /> : <IoMdHeartEmpty />}
                Add to Wishlist
              </Button>
            </div>
          </CardActions>
          <CardActions>
            <Button sx={{ fontSize: '1.5rem'}} size="small" onClick={() => handleRemoveFromCart(product)}>-</Button>
                <span className="px-2">Add To Cart</span>
            <Button sx={{ fontSize: '1.5rem'}} size="small" onClick={() => handleAddToCart(product)}>+</Button>               
          </CardActions>
        </Card>
      ))}
      {selectedProduct && (
        <Singleproduct
          product={selectedProduct}
          setVisible={setVisible}
          visible={visible}
        />
      )}
    </div>
    <div className="d-flex justify-content-center align-items-center small my-3">
      <Button
        variant="light"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        style={{ border: '1px solid lightgrey', borderRadius: '0px' }}
      >
        Previous
      </Button>
      {renderPageNumbers()}
      <Button
        variant="light"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        style={{ border: '1px solid lightgrey', borderRadius: '0px' }}
      >
        Next
      </Button>
    </div>
  </>
);
};

export default Cards;