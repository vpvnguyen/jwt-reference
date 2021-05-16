# jwt-reference

## What is JWT?

- Authentication - process of checking if the user is actually the claimed user
- Authorization - process of checking what the user is allowed to do

## How it works

### JWT Token

Encoded string: HEADER.PAYLOAD.SIGNATURE

- String is encrypted in base64
- String can be decrypted to see information being sent
- Signature is HEADER + PAYLOAD + a secret key

### User Registration

- Check if user's email / account does not exist
- Encrypt user's password using bcrypt
- Store user's credentials into DB
- Get user's uuid from DB and generate a JWT
- Generate and verify JWT when user calls authorized API routes

## Setup

- `npm init -y`
- `npm express pg cors jsonwebtoken bcrypt dotenv`
