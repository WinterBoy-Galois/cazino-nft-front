REGISTER  
LOGIN  
ME_ENDPOINT  
LOGOUT  
LOGOUT_MODAL


      for (const err of graphQLErrors) {
        switch (err?.extensions?.code) {
          case 'FORBIDDEN':
            fetch(`${appConfig.apiBasePath}/refresh_tokens`, {
              method: 'POST',
              credentials: 'include',
            })
              .then(result => result.json().then(json => json.accessToken))
              .then(accessToken => {
                console.log('new token', accessToken);
                const { exp } = jwtDecode(accessToken);
                if (exp > getEpoch()) {
                  // modify the operation context with a new token
                  const oldHeaders = operation.getContext().headers;
                  operation.setContext({
                    headers: {
                      ...oldHeaders,
                      authorization: accessToken,
                    },
                  });
                  // retry the request, returning the new observable
                  return forward(operation);
                }
              });
        }
      }

const customFetch = async (uri: any, options: any) => {
const initialRequest = fetch(uri, options);
// This reference to the refreshingPromise will let us check later on if we are executing getting the refresh token.
let refreshingPromise: any = null;

    // Create initial fetch, this is what would normally be executed in the link without the override

    const isTokenValidOrUndefined = () => {
      if (accessToken) {
        const { exp } = jwtDecode(accessToken);

        if (exp < getEpoch()) {
          return false;
        }
      } else if (isAuthorized) {
        return false;
      }

      return true;
    };

    return initialRequest.then(response => {
      return response.json().then(json => {
        console.log('request', json);
        if (
          !isTokenValidOrUndefined() ||
          json?.errors?.some((error: Error) =>
            error?.message.includes('You are not authorized to access this resourse')
          )
        ) {
          if (!refreshingPromise) {
            refreshingPromise = fetch(`${appConfig.apiBasePath}/refresh_tokens`, {
              method: 'POST',
              credentials: 'include',
            }).then(refresh_token_repsonse => {
              if (refresh_token_repsonse.ok) {
                return refresh_token_repsonse.json().then(refreshJSON => refreshJSON.accessToken);
              } else {
                if (isAuthorized) {
                  return onSignOut();
                }
              }
            });
          }
          return refreshingPromise.then((newAccessToken: string) => {
            refreshingPromise = null;

            options.headers.authorization = `Bearer ${newAccessToken}`;
            return fetch(uri, options);
          });
        }
        // If there were no errors in the initialRequest, we need to repackage the promise and return it as the final result.
        return initialRequest;
      });
    });
};