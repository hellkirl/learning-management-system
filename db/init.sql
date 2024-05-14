CREATE TABLE IF NOT EXISTS users (
                                     id SERIAL PRIMARY KEY,
                                     name VARCHAR(100) NOT NULL,
                                     email VARCHAR(30) NOT NULL UNIQUE,
                                     password VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS lessons (
                                       id SERIAL PRIMARY KEY,
                                       name VARCHAR(100) NOT NULL UNIQUE,
                                       code VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS evaluations (
                                           id SERIAL PRIMARY KEY,
                                           score INT NOT NULL,
                                           created_at DATE NOT NULL,
                                           user_id INT REFERENCES users(id),
                                           lesson_id INT REFERENCES lessons(id)
);
