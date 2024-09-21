import { Button } from "@material-ui/core";
import React from "react";
import { useStateValue } from "../StateProvider";
import { useHistory } from "react-router-dom"; // Import useHistory
import "../styles/Cart.css";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions

const UserCart = () => {
  const [{ basket, user }] = useStateValue();
  const history = useHistory(); // Initialize useHistory

  const handleProduct = async () => {
    try {
      // Reference to the user_details collection
      const userDetailsCollection = collection(db, "user_details");

      // Add products to the user_details collection
      await Promise.all(
        basket.map((item) =>
          addDoc(userDetailsCollection, {
            name: user.displayName,
            email: user.email,
            product_name: item.cardContent,
            price: item.price,
          })
        )
      );

      // Navigate to the Payment page
      history.push("/payment"); // Redirect to the Payment page

      // Optionally, clear the basket or perform other actions
      alert(
        `${basket.length} Products are in the cart, please confirm booking.`
      );
    } catch (error) {
      console.error("Error adding items to cart: ", error);
    }
  };

  return (
    <div className="cart">
      {basket.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {basket.map((item, index) => (
            <div className="cart_products" key={index}>
              <img src={item.imgSrc} alt="product image" />
              <div className="product_details">
                <p>{item.cardContent}</p>
                <h6>{item.price}</h6>
              </div>
            </div>
          ))}
          <Button variant="contained" color="secondary" onClick={handleProduct}>
            Buy Now
          </Button>
        </>
      )}
    </div>
  );
};

export default UserCart;
