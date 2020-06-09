module.exports = (app) => {
    const routes = getRoutes(app._router && app._router.stack);
    routes.forEach((r, idx) => {
      routes[idx] = r.join(' ')
    });
    console.log('using routes...');
    console.log(routes.join('\n'))
  };
  
  /**
   * Converts Express 4 app routes to an array representation suitable for easy parsing.
   * @arg {Array} stack An Express 4 application middleware list.
   * @returns {Array} An array representation of the routes in the form [ [ 'GET', '/path' ], ... ].
   */
  function getRoutes(stack) {
    return (stack || [])
    // We are interested only in endpoints and router middleware.
        .filter(it => it.route || it.name === 'router')
        // The magic recursive conversion.
        .reduce((result, it) => {
          if (!it.route) {
            // We are handling a router middleware.
            const stack = it.handle.stack;
            const routes = getRoutes(stack);
  
            return result.concat(routes)
          }
  
          // We are handling an endpoint.
          const methods = it.route.methods;
          const path = it.route.path;
  
          const routes = Object
              .keys(methods)
              .map(m => [m.toUpperCase(), path]);
  
          return result.concat(routes)
        }, [])
        // We sort the data structure by route path.
        .sort((prev, next) => {
          const [prevMethod, prevPath] = prev;
          const [nextMethod, nextPath] = next;
  
          if (prevPath < nextPath) {
            return -1
          }
  
          if (prevPath > nextPath) {
            return 1
          }
  
          return 0
        })
  }
  