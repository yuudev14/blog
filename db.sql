CREATE DATABASE blog;

CREATE table account (
    user_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY ,
    email VARCHAR(100) NOT NULL,
    first_name  VARCHAR(50) NOT NULL,
    last_name  VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    UNIQUE(email)
);

CREATE TABLE blogs (
    blog_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY ,
    date DATE NOT NULL DEFAULT now(),
    user_id uuid  NOT NULL REFERENCES account(user_id),
    title TEXT NOT NULL,
    preview_img VARCHAR(100),
    blog TEXT[] NOT NULL
);

CREATE TABLE reactions (
    reaction_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    blog_id uuid NOT NULL REFERENCES blogs(blog_id),
    user_id uuid  NOT NULL REFERENCES account(user_id),
    date DATE NOT NULL DEFAULT now(),
    reaction VARCHAR(50) NOT NULL
);

CREATE TABLE activeTokens (
    token VARCHAR(500) NOT NULL PRIMARY KEY
);