Drop database if exists factFetcherdb;

CREATE DATABASE factFetcherdb;

USE factFetcherdb;

CREATE TABLE users (
    id integer auto_increment not null,
    username varchar(30),
    password varchar(30),
    primary key (id)
)

#Connects to 0, 1, or many different users (kind of like the join we did between roles and departments)
#UserCats with the most users can be in a "most popular" list
CREATE TABLE userCats (
    id integer auto_increment not null,
    category varchar(30),
    user_id foreign key
)

#Connects to 1 or many users (pages that the user favorites)
CREATE TABLE userPages (
    id integer auto_increment not null,
    page varchar(30) not null,
    user_id foreign key
)

