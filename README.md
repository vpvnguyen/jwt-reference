# jwt-reference

Experimental sandbox for JWT

## Technologies

- React
- Express
- jsonwebtoken
- crypto
- dotenv

## Setup

- Use `crypto` library built into Node to generate tokens

```
# terminal

node

require('crypto').randomBytes(64).toString();
```

- Create `.env` and store tokens

```
# .env

ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
```

## Workflow

#### Generate Refresh Token

- Client sends user's creds
- Validate user's creds
- Generate refresh token
- Store refresh token in memory or DB
- Send refresh token to client

#### Generate Access Token / Refreshing Tokens

- Client sends refresh token
- Verify refresh token
- Generate access token with expiration
- Send access token to client

#### Authentication

- Client sends access token to endpoint
- Verify access token through middleware
- Grant access if token is valid

#### Removing Access

- Get refresh token
- Delete refresh token from memory or DB
