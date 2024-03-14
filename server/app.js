const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51OGD1UBZ38hpuCTdhlVnMUcqfXXrmdaQ503Cb5qayyPRsJcwp5mfucmgn64FmZ0bAWpFiTF6DmVKjsL787oBOnfe00O47QDcaq"
);

app.use(express.json());
app.use(cors());
app.get("", (req, res) => {
  res.send("Hello World!1111");
});

app.post("/api/create-checkout-session", async (req, res) => {
  const { cart } = req.body;
  console.log(cart);
  const lineItems = cart.items.map((res) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: res.card.info.name,
      },
      unit_amount: Math.round(res.price  ),
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
