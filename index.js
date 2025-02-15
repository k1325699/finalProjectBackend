const express = require("express");
const bodyParser = require("body-parser");
const productsController = require("./controllers/products");
const userController = require("./controllers/users");
const orderController = require("./controllers/orders");
const discountController = require("./controllers/discounts");
const cartController = require("./controllers/carts");
const TransactionController = require("./controllers/transactions");
const auth = require("./middleware/auth");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extend: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/createProducts", auth, productsController.create);
app.post("/updateProducts", auth, productsController.update);
app.get("/findProducts/:id", productsController.find);
app.get("/findAllProducts", productsController.findAllProducts);
app.get("/deleteProducts/:id", auth, productsController.delete);
app.get("/searchProducts/:name", productsController.search);

app.post("/register", userController.postRegister);
app.post("/login", userController.postLogin);
app.get("/user", auth, userController.getUser);
app.post("/user", auth, userController.postUpdateUser);
app.post("/update-password", auth, userController.postUpdatePassword);

app.post("/newOrder", auth, orderController.newOrder);
app.get("/getAllOrder", auth, orderController.getAll);
app.get("/getOneOrder/:id", auth, orderController.getOneOrder);
app.get("/deleteOrder/:id", auth, orderController.deleteOrder);
app.get("/acceptOrder/:id", auth, orderController.acceptOrder);
app.get("/completeOrder/:id", auth, orderController.completeOrder);
app.post("/updateOrder", auth, orderController.updateOrder);
app.get("/getHistory", auth, orderController.getHistory);

app.post("/createDiscounts", auth, discountController.create);
app.post("/updateDiscounts", auth, discountController.update);
app.get("/findDiscounts/:id", auth, discountController.find);
app.get("/findAllDiscounts", auth, discountController.findAllDiscounts);
app.get("/deleteDiscounts/:id", auth, discountController.delete);
app.get("/searchDiscounts/:name", auth, discountController.search);

app.get("/getAllCartItems", auth, cartController.getAll);
app.post("/addCartItem", auth, cartController.addItem);
app.post("/updateCartItem/:id", auth, cartController.updateItem);
app.get("/deleteCartItem/:id", auth, cartController.deleteItem);
app.get("/deleteAllCartItems", auth, cartController.deleteAll);

app.get("/getHotSell", TransactionController.getHotSell);
app.get("/getTransactions/:orderId", auth, TransactionController.getTractionsByOrderId);

//錯誤處理的middleware
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ success: false, message });
});

app.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

app.listen(port, () => {
  console.log(`Backend is listening at http://localhost:${port}`);
});

