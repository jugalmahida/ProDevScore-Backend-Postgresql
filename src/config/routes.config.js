import pricingPlanRoute from "../routes/pricingplan.route.js";
import usersRoute from "../routes/users.route.js";

export const setupRoutes = (app) => {
  const routes = {
    pricingPlan: pricingPlanRoute,
    users: usersRoute,
  };
  Object.entries(routes).forEach(([path, router]) => {
    app.use(`/api/${process.env.VERSION}/${path}`, router);
  });
};
