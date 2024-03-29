const express = require("express");
const app = express();
const port = 7000;
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51OkhDgSDjGYeKK2dQ8XIpbsZ2S8cvxreY5SSBGfzzR7fZnfg9xNkwwuDz3itKQEr3FeJI3u5dZWWCvVdcwK4wkph00FLgAbAwD"
);
// "sk_test_51OGD1UBZ38hpuCTdhlVnMUcqfXXrmdaQ503Cb5qayyPRsJcwp5mfucmgn64FmZ0bAWpFiTF6DmVKjsL787oBOnfe00O47QDcaq"
// "sk_test_51OkhDgSDjGYeKK2dRuQsx0FJfyjm4o77fFXUdmDtQjDf483bZ2Tvr9oafkHu6HZzuDdtlDwHfmZ1MBWTNNxAqgXu00tpBXbLTD"

app.use(express.json());
app.use(cors());
app.get("", (req, res) => {
  res.send("Hello World!1111");
});

app.post("/api/create-checkout-session", async (req, res) => {
  const { cart } = req.body;
  console.log("🚀 ~ file: app.js:17 ~ app.post ~ cart:", cart);
  console.log(cart);
  const lineItems = cart.items.map((res) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: res.card.info.name,
      },
      unit_amount: Math.round(res.price),
    },
    quantity: res.cartQuantity,
  }));
  console.log(lineItems);
  //   res.send(lineItems);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: "http://localhost:1234/success",
      cancel_url: "http://localhost:1234/cancel",
    });
    res.json({ id: session.id });
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
