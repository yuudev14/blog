CREATE DATABASE blog;

CREATE table account (
    user_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY ,
    email VARCHAR(100) NOT NULL,
    first_name  VARCHAR(50) NOT NULL,
    last_name  VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    UNIQUE(username),
    UNIQUE(email)
);

CREATE TABLE blogs (
    blog_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY ,
    date DATE NOT NULL DEFAULT now(),
    user_id uuid  NOT NULL REFERENCES account(user_id),
    title VARCHAR(50) NOT NULL,
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

SELECT react.count, blogs.title, blogs.preview_img FROM 
(SELECT reactions.blog_id, COUNT(*) AS count FROM reactions JOIN blogs ON reactions.blog_id = blogs.blog_id GROUP BY reactions.blog_id) AS react
JOIN blogs ON react.blog_id = blogs.blog_id ORDER BY react.count DESC;