import { useDispatch, useSelector } from "react-redux";
import { createNewOrder } from "@/store/shop/order-slice";
import { clearCart } from "../../store/shop/cart-slice"; //   
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardTitle } from "../../components/ui/card"; 

function PaymentSuccessPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.shopOrder);

  useEffect(() => {
    console.log(user)
    const processOrder = async () => {

        try {
          //  
          await dispatch(
            createNewOrder({
              items: cartItems,
              total: cartItems.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              ),
              userId: user.id, //  
            })
          );

          //     
          await dispatch(clearCart(user.id));  //    
        } catch (error) {
          console.error("Error while processing order:", error);
        }
      }
    ;

    processOrder();
  }, [user.id]);

  return (
    <Card className="p-10">
      <CardHeader className="p-0">
        <CardTitle className="text-4xl">Payment is successful!</CardTitle>
      </CardHeader>
      {isLoading ? (
        <p className="mt-5">Processing your order...</p>
      ) : (
        <Button className="mt-5" onClick={() => navigate("/shop/account")}>
          View Orders
        </Button>
      )}
    </Card>
  );
}

export default PaymentSuccessPage;
