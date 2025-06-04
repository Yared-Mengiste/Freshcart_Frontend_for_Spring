import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useCart } from "../context/CartProvider";
import { useMessage } from "../context/MessageContext";
import { useUser } from "../context/UserContext";

const PaymentReturnPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { user } = useUser();
  const { showMessage } = useMessage();

  const tx_ref = new URLSearchParams(location.search).get("tx_ref");

  useEffect(() => {
    const verify = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/payments/verify?tx_ref=${tx_ref}`
        );
        if (data.status === "success" && data.data.status === "success") {
          console.log("Payment verified successfully", data);
          const stored = JSON.parse(localStorage.getItem("order_payload"));
          if (!stored) throw new Error("No stored order");
          const { tx_ref, ...orders } = stored;
          console.log("Order payload", orders);

          let ttPrice = cart.reduce(
            (a, item) => a + item.price * item.quantity,
            0
          );

          const orderPayload = {
            userId: user.id,
            totalPrice: ttPrice,
            status: "PROCESSING",
            items: cart.map((item) => ({
              productId: parseInt(item.id, 10),
              quantity: parseInt(item.quantity, 10),
              price: parseFloat(item.price),
            })),
          };
          console.log("Order Payload:", orderPayload);
          setTimeout(console.log("working"), 10000);

          try {
            const response = await axiosInstance.post("/orders", orderPayload);
            console.log("Order placed:", response.data);
            if (response.data.id) {
              clearCart();
              alert("Successful Bought");
              navigate("/products");
              showMessage(`${ttPrice} Birr Order is placed`, "success");
              localStorage.removeItem("order_payload");
            }
            return response.data;
          } catch (error) {
            console.error("Failed to place order:", error);
            // alert(error.data.code);
            showMessage("Failed to place order. Please try again.", "error");
          }
        } else {
          console.error("Payment verification failed", data);
          showMessage("Payment verification failed.", "error");
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      } catch (err) {
        console.error("Verification error", err);
        showMessage("Error verifying payment", "error");
        console.error("Error verifying payment:", err);
      }
    };
    if (tx_ref) verify();
  }, [tx_ref]);

  return <h2>Verifying payment...</h2>;
};

export default PaymentReturnPage;
