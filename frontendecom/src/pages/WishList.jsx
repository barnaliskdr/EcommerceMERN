// import React,{ useState} from 'react'
// import Cards from '../components/Cards';
// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { getAllWishList } from '../actions/WishListActions.js';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import { toast } from 'react-toastify';
// import Singleproduct from '../components/Singleproduct';
// import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
// // import { addToCart, removeFromCart } from '../slices/cartSlices';
// import { removeFromWishList } from '../actions/WishListActions.js';
// import { addToCart,removeFromCart } from '../actions/cartActions';

// import Typography from '@mui/material/Typography';

// const WishList = () => {

//       const dispatch = useDispatch();
//       const [visible, setVisible] = useState(false);
//       const [selectedProduct, setSelectedProduct] = useState(null);
//       const [products, setProducts] = useState([]);
//       const [showToast, setShowToast] = useState(false);
//       const productsAdded  = useSelector((state)=> state);
//       const [wishlisted, setWishlisted] = useState(false);
//       //const [productData, setProductData] = useState([]); 
//       //const {data: products, isloading, isError} = useGetProductsQuery(); //reduxtoolkit
//       const [currentPage, setCurrentPage] = useState(1);
//       const itemsPerPage = 4;
      
//       const userData = sessionStorage.getItem("token");
//       const userId = sessionStorage.getItem("id");

//       const wishList = useSelector((state) => state.wishlist.wishListedItems || []);
//       console.log("wishList:", wishList);

//     useEffect(()=>
//     {
//         dispatch((getAllWishList(userId)));
        
//     },[dispatch]);

//      const viewDetailsHandle = (product) => {
//         setSelectedProduct(product);
//         setVisible(true);
//       };
    
    
//       const handleAddToCart = (product) => {
//         //console.log("called Add to cart",product);
//         if(userData !== null)
//         {
//           dispatch(addToCart(product));
//         }
//         else
//         {
//           setShowToast(true);
//           toast.info("Please login to add items to cart");
//         }
//       };
    
//       const handleRemoveFromWishlist = (product) => {
//        // console.log("called Remove from cart",product);
//         dispatch(removeFromWishList(product,userId));
//       };
    

//     return (
//       <div className="d-flex flex-wrap justify-content-center m-4 gap-5">
//         {wishList.map((item)=>{
//           return(<Card sx={{ maxWidth: 345 }}>
//           <CardMedia
//             sx={{ height: 140 }}
//             image={item.image}
//             title={item.name}
//           />
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="div">
//               {item.name}
//             </Typography>
//             <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//               {item.description}
//             </Typography>
//           </CardContent>
//           <CardActions>
//             {/* <Button size="small">Share</Button>
//             <Button size="small">Learn More</Button> */}
//             <div className="d-flex justify-content-center align-items-center gap-5 small">
//               <Button
//                 className="bg-light border text-dark w-3"
//                 size="small"
//                 onClick={() => viewDetailsHandle(item)}
//               >
//                 View Details
//               </Button>
//               {/* <Button className="bg-light border text-dark w-3 small"
//                 style={{ fontSize:"12px"}}
//                 onClick={() => wishlistHandler(product)}>
//                 {wishlisted ? <IoMdHeart /> : <IoMdHeartEmpty /> }
                
//                 Add to Wishlist
//               </Button> */}
//                 <Button className="bg-light border text-dark w-3" size="small" onClick={() => handleAddToCart(item)}>Move To Cart</Button>
//               </div>
//           </CardActions>
//           <CardActions>
//             <Button className="bg-light border text-dark w-3" size="small" onClick={() => handleRemoveFromWishlist(item)}>Remove From Wishlist</Button>
//           </CardActions>
//         </Card>)
//         })}
//         {selectedProduct && (
//         <Singleproduct
//           product={selectedProduct}
//           setVisible={setVisible}
//           visible={visible}
//         />
//         )}
//       </div>
//     )
// }

// export default WishList;



import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllWishList, removeFromWishList } from '../actions/WishListActions.js';
import { addToCart } from '../actions/cartActions';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import Singleproduct from '../components/Singleproduct';

const WishList = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const userData = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("id");

  const wishList = useSelector((state) => state.wishlist.wishListedItems || []);
  useEffect(() => {
    if (userId) {
      dispatch(getAllWishList(userId));
    }
  }, [dispatch, userId]);

  const viewDetailsHandle = (product) => {
    setSelectedProduct(product);
    setVisible(true);
  };

  const handleAddToCart = (product) => {
    if (userData !== null) {
      dispatch(addToCart(product));
      toast.success("Moved to cart!");
      // Optionally, remove from wishlist after adding to cart
      dispatch(removeFromWishList(product, userId)).then(() => {
        dispatch(getAllWishList(userId));
      });
    } else {
      setShowToast(true);
      toast.info("Please login to add items to cart");
    }
  };

  const handleRemoveFromWishlist = (product) => {
    dispatch(removeFromWishList(product, userId)).then(() => {
      dispatch(getAllWishList(userId));
    });
  };

  return (
    <div className="d-flex flex-wrap justify-content-center m-4 gap-5">
      {wishList.length === 0 && (
        <Typography variant="h6" color="text.secondary">
          Your wishlist is empty.
        </Typography>
      )}
      {wishList.map((item) => (
        <Card sx={{ maxWidth: 345 }} key={item._id}>
          <CardMedia
            sx={{ height: 140 }}
            image={item.image}
            title={item.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </CardContent>
          <CardActions>
            <div className="d-flex justify-content-center align-items-center gap-5 small">
              <Button
                className="bg-light border text-dark w-3"
                size="small"
                onClick={() => viewDetailsHandle(item)}
              >
                View Details
              </Button>
              <Button
                className="bg-light border text-dark w-3"
                size="small"
                onClick={() => handleAddToCart(item)}
              >
                Move To Cart
              </Button>
            </div>
          </CardActions>
          <CardActions>
            <Button
              className="bg-light border text-dark w-3"
              size="small"
              onClick={() => handleRemoveFromWishlist(item)}
            >
              Remove From Wishlist
            </Button>
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
  );
};

export default WishList;