import React, { useState,useEffect }from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useGetProductByNameQuery } from '../slices/productsApiSlice';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import '../components/Cards.scss';

const SearchedProducts = () => {

    const navigate = useNavigate();
    const { name } = useParams();
    console.log(name);
    const {data: searchResult, isLoading, isError, error}= useGetProductByNameQuery(name,{
        skip: !name, // Skip the query if no name is provided
      });

    // useEffect(() => {
    //     if (name) {
    //       // Optionally trigger any additional side effects
        
    //       console.log(`Fetching products with name: ${name}`);
    //     }
    //   }, [name]);
       
    const viewDetailsFromSearch = (product) => {
        console.log(product.name);
        navigate(`/product/details/${product.name}`);
    }
    console.log(searchResult,"in searchProducts page");

    //   if (isLoading) return <div>Loading...</div>;
    //   if (isError) return <div>Error fetching products</div>;
    if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (isError) {
        console.log(searchResult);
        return (
          <div>
            {/* Error handling based on the specific error */}
            {searchResult?.message === "Product not found" ? (
              <p>No products found</p>
            ) : (
              <p>Error fetching products: {error.message}</p>
            )}
          </div>
        );
      }
  return (
    <div className="d-grid gap-4 d-flex flex-row justify-content-center flex-wrap m-3">
         {searchResult?.data && searchResult.data?.length > 0 && (
          searchResult.data.map((product) => (
            <Card style={{ width: '20rem',height: '30rem' }} className="p-2" key={product.id}>
                <Card.Img variant="top" src={product.image} className="card-img-custom"></Card.Img>
                <Card.Body className="fit-content">
                    <h2>{product.name}</h2>
                    <div>{product.description}</div>
                    <div>{product.price}$</div>
                    <div>{product.quantity}: {product.portion}</div>
                    <div>seller: {product.brandrand}</div>
                </Card.Body>
                <Button
                className="bg-light border border-info text-dark m-1"
                onClick={() => viewDetailsFromSearch(product)}>
                    View Details
                </Button>
                <div className="d-flex justify-content-center align-items-center w-5 h-4 bg-info text-white m-2">
                    <Button variant="outline-primary text-white">-</Button>
                    <span className="px-2">Add To Cart</span>
                    <Button variant="outline-primary text-white">+</Button>
                </div>
            </Card>
          ))
      ) }
    </div>
  )
}

export default SearchedProducts
