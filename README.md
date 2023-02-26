# cf-workers-url-redirect-resolver
A dead-simple cloudflare worker for resolving URL redirects.  
It does not perform any caching or whatsoever.

## Setup
Set the environment variable `ACCEPTED_API_TOKENS` to a list of accepted Bearer Tokens seperated by spaces.

i.e. `ACCEPTED_API_TOKENS="token1 token2 token3"`

### Dev
Run the project locally using `yarn start --local --var ACCEPTED_API_TOKENS:justtesting`

## Usage
GET `<worker url>/?target=[url to resolve]`  
Send one of the configured API Tokens as a Bearer Token in the Authorization header.

### Example
HTTPIE: `http -A bearer -a justtesting "http://localhost:8787/?target=https://amzn.to"`  
CURL: `curl -H "Authorization: Bearer justtesting" "http://localhost:8787/?target=https://amzn.to"`

## License
This work is licensed under the [CC-0 (No Rights Reserved) License](https://creativecommons.org/share-your-work/public-domain/cc0/).  
Do what you want, I'm not liable for anything you do with this code.
