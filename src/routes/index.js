const express = require("express");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const newsRoute = require("./news.route");
const categoryRoute = require("./category.route");
const mealRoute = require("./meal.route");
const mealHistoryRoute = require("./mealHistory.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/news",
    route: newsRoute,
  },
  {
    path: "/categories",
    route: categoryRoute,
  },
  {
    path: "/meals",
    route: mealRoute,
  },
  {
    path: "/meals_histories",
    route: mealHistoryRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
