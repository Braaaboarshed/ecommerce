import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function StripeReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const sessionId = params.get("session_id");  // Stripe returns session_id after payment completion

  useEffect(() => {
    if (sessionId) {
      
      // Retrieve orderId from session storage
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
      
      // Dispatch action to confirm the payment
      dispatch(capturePayment({ sessionId, orderId })).then((data) => {
        if (data?.payload?.success) {
          // If payment is successful, remove the order ID from session storage
          sessionStorage.removeItem("currentOrderId");
          // Redirect user to the success page
          console.log|('xxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
          window.location.href = "/shop/home";
        }
      });
    }
  }, [sessionId, dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment...Please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default StripeReturnPage;
  