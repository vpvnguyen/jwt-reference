CREATE DATABASE jwt_reference;

-- need to set extension for uuid_generate_v4() with uuid-ossp
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- create a table of users using uuid to generate a longer hash than SERIAL ID
CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- insert mock user
INSERT INTO users (name, email, password)
VALUES ('Vincent', 'user@gmail.com', '1234');

