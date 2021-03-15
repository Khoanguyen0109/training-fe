export function generateRoutesFromConfigs(configs, auth) {
  let allRoutes = [];
  configs.forEach((config) => {
    allRoutes = [...allRoutes, ...setRoutes(config, auth)];
  });
  return allRoutes;
}

export function setRoutes(config, defaultAuth) {
  let routes = [...config.routes];

  routes = routes.map((route) => {
    let auth =
      config.auth || config.auth === null ? config.auth : defaultAuth || null;
    auth = route.auth || route.auth === null ? route.auth : auth;

    return {
      ...route,
      auth,
    };
  });

  return [...routes];
}

export function getNavigation(routes, auth) {}
