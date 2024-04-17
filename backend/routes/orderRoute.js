const express = require("express")
const router = express()
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth")
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController")

router.route("/order/new").post(isAuthenticatedUser , newOrder)


router.route("/order/me").get(isAuthenticatedUser , myOrders)
// The reason the order matters is that if you define the /admin/order/:id route before the /order/:id route, all requests to URLs like "/order/123" will be handled by the /admin/order/:id route because it matches the pattern. As a result, the /order/:id route would never be reached, which might not be the intended behavior.

// So, when defining routes, you should start with the more specific routes and then define the more general routes. In your case, the /admin/order/:id route is more specific than /order/:id, so it should be defined after the latter.
router.route("/order/:id").get(isAuthenticatedUser ,getSingleOrder)

router.route("/admin/orders").get(isAuthenticatedUser , authorizeRoles("admin") , getAllOrders)

router.route("/admin/order/:id").put(isAuthenticatedUser , authorizeRoles("admin") , updateOrder).delete(isAuthenticatedUser , authorizeRoles("admin") , deleteOrder)




module.exports = router