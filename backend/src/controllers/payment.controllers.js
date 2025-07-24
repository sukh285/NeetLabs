import Razorpay from "razorpay";
import crypto from "crypto";
import { db } from "../libs/db.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Plan prices in paise
const prices = {
  PRO: parseInt(process.env.PLAN_PRICE_PRO),
  ADVANCED: parseInt(process.env.PLAN_PRICE_ADVANCED),
};

//create and process order
export const createOrder = async (req, res) => {
  try {
    const { planKey } = req.body;

    // FREE plan handling
    if (planKey === "FREE") {
      return res.json({ orderId: null, amount: 0 });
    }

    const amount = prices[planKey];
    if (!amount) {
      return res.status(400).json({ error: "Invalid plan key" });
    }

    const options = {
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({ orderId: order.id, amount: order.amount });
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

//verify payment after user pays
export const verifyPayment = async (req, res) => {
  const { order_id, payment_id, signature, planKey } = req.body;

  const body = order_id + "|" + payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isValid = expectedSignature === signature;

  if (!isValid) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid payment signature." });
  }

  try {
    //Update user's plan in DB after verification of payment
    const userId = req.user.id;

    await db.user.update({
      where: { id: userId },
      data: {
        plan: planKey,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Payment verified and plan activated!",
    });
  } catch (error) {
    console.error("Error updating user plan:", error);
    return res.status(500).json({
      success: false,
      error: "Payment verified but failed to update user plan.",
    });
  }
};
