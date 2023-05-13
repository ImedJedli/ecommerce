import axios from "axios";

export const sendInvoiceByEmail = async (orderId, userEmail) => {
  try {
    const response = await axios.post("/api/invoice/send-invoice", {
      orderId: orderId,
      userEmail: userEmail,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};