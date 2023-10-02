-- Active: 1692271638519@@127.0.0.1@5432@bookmyshow@public

CREATE TABLE
    movies(
        id SERIAL NOT NULL PRIMARY KEY,
        name VARCHAR(200) NOT NULL UNIQUE,
        description VARCHAR(300),
        duration VARCHAR(100) NOT NULL,
        language VARCHAR(20) NOT NULL,
        release_date DATE,
        genre VARCHAR(30),
        image_url VARCHAR NOT NULL
    );

CREATE TABLE
    cinema_hall(
        id SERIAL NOT NULL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        total_seats INT NOT NULL,
        price INTEGER NOT NULL,
        city VARCHAR(100) NOT NULL,
        address VARCHAR(150) NOT NULL
    );

INSERT INTO
    cinema_hall(
        name,
        total_seats,
        price,
        city,
        address
    )
VALUES (
        'PVR',
        30,
        300,
        'Hyderabad',
        'Panjagutta Hyderabad'
    ), (
        'Asian',
        30,
        150,
        'Hyderabad',
        'Moosapet Hyderabad'
    ), (
        'Sandhya',
        30,
        200,
        'Hyderabad',
        'RTC X road Hyderabad'
    ), (
        'AAA',
        30,
        300,
        'Hyderabad',
        'Ameerpet Hyderabad'
    );

CREATE TABLE
    movie_theaters(
        id SERIAL PRIMARY KEY,
        movie_id INT NOT NULL REFERENCES movies(id),
        cinema_hall_id INT NOT NULL REFERENCES cinema_hall(id)
    );

CREATE TABLE
show (
        id SERIAL NOT NULL PRIMARY KEY,
        start_time VARCHAR(100),
        cinema_hall_id INT REFERENCES cinema_hall(id)
    );

INSERT INTO
show (start_time, cinema_hall_id)
VALUES ('10:15 AM', 1), ('2:30 PM', 1), ('5:45 PM', 1), ('9:00 PM', 1), ('11:45 AM', 2), ('3:00 PM', 2), ('7:45 PM', 2), ('11:00 PM', 2), ('10:35 AM', 3), ('2:50 PM', 3), ('6:45 PM', 3), ('10:00 PM', 3), ('10:00 AM', 4), ('2:30 PM', 4), ('6:25 PM', 4), ('9:30 PM', 4);

CREATE TABLE
    bookings(
        id SERIAL NOT NULL PRIMARY KEY,
        seats VARCHAR NOT NULL,
        show_id INT REFERENCES
        show (id) NOT NULL,
            cinema_hall_id INT REFERENCES cinema_hall(id) NOT NULL,
            movie_id INT REFERENCES movies(id),
            user_id INT REFERENCES users(id)
    );

CREATE TABLE
    users(
        id SERIAL NOT NULL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        mail VARCHAR(100) NOT NULL,
        user_name VARCHAR(200) NOT NULL UNIQUE,
        password VARCHAR(200),
        type VARCHAR(50)
    );

CREATE Table
    cinema_seat (
        id SERIAL PRIMARY KEY,
        seat_number VARCHAR NOT NULL,
        status SMALLINT,
        show_id INT REFERENCES
        show (id),
            movie_id INT REFERENCES movies(id),
            cinema_hall_id INT REFERENCES cinema_hall(id)
    );

INSERT INTO
    users(
        name,
        mail,
        user_name,
        password,
        type
    )
VALUES (
        'admin',
        'admin123@gmail.com',
        'admin_123',
        'admin_123',
        'admin'
    );