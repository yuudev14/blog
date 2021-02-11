CREATE DATABASE blog;

CREATE table account (
    user_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY ,
    email VARCHAR(100) NOT NULL,
    username  VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    UNIQUE(username),
    UNIQUE(email)
);

CREATE TABLE blogs (
    blog_id uuid NOT NULL PRIMARY KEY,
    date DATE NOT NULL DEFAULT now(),
    user_id uuid  NOT NULL REFERENCES account(user_id),
    blog TEXT NOT NULL
);