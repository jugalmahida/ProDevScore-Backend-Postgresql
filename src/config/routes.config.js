import pricingPlanRoute from "../routes/pricingplan.route.js";

export const setupRoutes = (app) => {
  const routes = {
    pricingPlan: pricingPlanRoute,
  };
  Object.entries(routes).forEach(([path, router]) => {
    app.use(`/api/${process.env.VERSION}/${path}`, router);
  });
};
