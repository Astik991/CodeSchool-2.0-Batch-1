-- Active: 1692350877415@@127.0.0.1@5432@swiggy@public

CREATE DATABASE swiggy;

CREATE TABLE
    swiggy_users(
        users_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        phone VARCHAR(10) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(10) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    Restaurants (
        Restaurants_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        address VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        phone VARCHAR(10) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    Orders (
        orders_id SERIAL PRIMARY KEY,
        users_id INT REFERENCES swiggy_users(users_id) NOT NULL,
        Restaurants_id INT REFERENCES Restaurants(restaurants_id) NOT NULL,
        order_total DECIMAL(10, 2) NOT NULL,
        delivery_status VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    Delivery_Agents (
        Delivery_Agents_id SERIAL PRIMARY KEY,
        users_id INT REFERENCES swiggy_users(users_id) NOT NULL,
        Restaurants_id INT REFERENCES Restaurants(restaurants_id) NOT NULL,
        name VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL UNIQUE,
        location VARCHAR(200) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    Payment (
        Payment_id SERIAL PRIMARY KEY,
        users_id INT REFERENCES swiggy_users(users_id) NOT NULL,
        orders_id INT REFERENCES Orders(orders_id) NOT NULL,
        payment_method VARCHAR(20) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        status VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    Address(
        Address_id SERIAL PRIMARY KEY,
        users_id INT REFERENCES swiggy_users(users_id) NOT NULL,
        state VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        street VARCHAR(255) NOT NULL,
        pincode INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    Menu (
        menu_id SERIAL PRIMARY KEY,
        Restaurants_id INT REFERENCES Restaurants(Restaurants_id) NOT NULL,
        item_name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- Inserting Values

INSERT INTO
    swiggy_users (
        users_id,
        name,
        phone,
        email,
        password
    )
VALUES (
        101,
        'John Doe',
        '9988776655',
        'john@gmail.com',
        'John@123'
    ), (
        102,
        'Jane Smith',
        '9875437210',
        'jane@gmail.com',
        'Jane12'
    ), (
        103,
        'Olivia Young',
        '8767765437',
        'olivia@gmail.com',
        'Green9'
    ), (
        104,
        'Gavin Carr',
        '7893256745',
        'gavin@gmail.com',
        'carr.51'
    ), (
        105,
        'Slean Slatter',
        '6478397567',
        'slean@gmail.com',
        'slatter'
    );

SELECT * FROM swiggy_users;

INSERT INTO
    Restaurants (
        Restaurants_id,
        name,
        address,
        email,
        phone
    )
VALUES (
        201,
        'Farzi Cafe',
        '8-9 Jubilee Hills',
        'farzi@gmail.com',
        '9844443333'
    ), (
        202,
        'Little Italy',
        '92 Jubilee Hills',
        'italy@example.com',
        '7654523432'
    ), (
        203,
        'Truffle Cafe',
        '98 Film City',
        'Truggle@gmail.com',
        '8765423409'
    ), (
        204,
        'MC Donalds',
        '92 Jubilee Hills',
        'mcd@example.com',
        '7623450986'
    );

SELECT * FROM Restaurants;

INSERT INTO
    Orders (
        users_id,
        Restaurants_id,
        order_total,
        delivery_status
    )
VALUES (101, 201, 520.00, 'Pending'), (102, 202, 105.25, 'Delivered'), (103, 203, 1220.00, 'In-Transit'), (104, 201, 1500.45, 'Delivered'), (105, 204, 2090.00, 'In-Transit'), (101, 203, 920.00, 'delivered');

SELECT * FROM Orders;

INSERT INTO
    Delivery_Agents (
        users_id,
        Restaurants_id,
        Delivery_Agents_id,
        name,
        phone,
        location,
        email
    )
VALUES (
        101,
        201,
        301,
        'Harry',
        '1234567890',
        'Banjara Hills',
        'harry@gmail.com'
    ), (
        102,
        202,
        302,
        'Alex',
        '9876543210',
        'Madhapur',
        'alex@gmail.com'
    ), (
        103,
        203,
        303,
        'Adam',
        '8843091276',
        'Mehidipatnam',
        'adam@gmail.com'
    ), (
        104,
        204,
        304,
        'Phillip',
        '6523498546',
        'Shaikpet',
        'phillip@gmail.com'
    ), (
        105,
        202,
        305,
        'Clark',
        '6789012345',
        'Hi-Tech City',
        'clark@gmail.com'
    );

SELECT * FROM Delivery_Agents;

INSERT INTO
    Payment (
        users_id,
        orders_id,
        Payment_id,
        payment_method,
        amount,
        status
    )
VALUES (
        101,
        1,
        501,
        'Cash',
        590.00,
        'Completed'
    ), (
        102,
        2,
        502,
        'Cash',
        3450.00,
        'completed'
    ), (
        104,
        3,
        503,
        'gpay',
        590.00,
        'Completed'
    ), (
        105,
        4,
        504,
        'net-banking',
        3450.00,
        'pending'
    );

SELECT * FROM payment;

INSERT INTO
    Address (
        users_id,
        Address_id,
        state,
        city,
        street,
        pincode
    )
VALUES (
        101,
        601,
        'Telangana',
        'Banjara_Hills',
        '64',
        500031
    ), (
        102,
        602,
        'Telangana',
        'Film_City',
        '10/11',
        500091
    ), (
        103,
        603,
        'Telangana',
        'Madhapur',
        '202',
        500022
    ), (
        104,
        604,
        'Telangana',
        'Jubilee_Hills',
        '12',
        500039
    ), (
        105,
        605,
        'Telangana',
        'Lanco_Hills',
        '4',
        500054
    );

SELECT * FROM Address;

INSERT INTO
    Menu (
        Restaurants_id,
        menu_id,
        item_name,
        price
    )
VALUES (201, 701, 'Soup', 500.00), (203, 702, 'Pizza', 2000.99), (201, 703, 'Pasta', 850.00), (202, 704, 'Frito-Pie', 1600.21), (204, 705, 'Salad', 1000.49), (202, 706, 'Corn-Tikki', 750.00), (202, 707, 'Biryani', 2000.99), (201, 708, 'Paneer', 950.00);

SELECT * FROM Menu;

-- QUERIES

SELECT
    o.orders_id,
    u.name AS user_name,
    r.name AS restaurant_name,
    o.order_total,
    o.delivery_status
FROM Orders AS o
    INNER JOIN swiggy_users AS u ON o.users_id = u.users_id
    INNER JOIN Restaurants AS r ON o.Restaurants_id = r.Restaurants_id
WHERE
    o.delivery_status = 'Pending';

SELECT
    COUNT (*) AS mcdonalds_orders
FROM Orders AS o
    INNER JOIN Restaurants AS r ON o.Restaurants_id = r.Restaurants_id
WHERE r.name = 'MC Donalds';

SELECT
    r.name,
    o.delivery_status
FROM Restaurants AS r
    INNER JOIN Orders AS o ON r.Restaurants_id = o.Restaurants_id;

SELECT count(*) AS order_count FROM orders WHERE order_total > 750;

SELECT
    u.name,
    p.payment_method
FROM swiggy_users AS u
    INNER JOIN payment AS p on u.users_id = p.users_id;

SELECT
    u.name,
    a.city,
    a.state,
    p.status
FROM swiggy_users AS u
    INNER JOIN Address AS a ON u.users_id = a.users_id
    INNER JOIN payment AS p on u.users_id = p.users_id;

SELECT
    o.orders_id,
    s.name AS user_name
FROM Orders AS o
    LEFT JOIN swiggy_users AS s ON o.users_id = s.users_id;

SELECT
    r.name AS restaurant_name,
    m.item_name
FROM Restaurants AS r
    LEFT JOIN Menu AS m ON r.Restaurants_id = m.Restaurants_id;

SELECT
    o.orders_id,
    p.status as payment_status,
    o.delivery_status
FROM orders AS o
    INNER JOIN payment AS p on o.orders_id = p.orders_id;

SELECT
    m.item_name,
    COUNT(o.orders_id) as many_times_ordered
FROM Menu AS m
    INNER JOIN Restaurants AS r ON m.Restaurants_id = r.Restaurants_id
    INNER JOIN Orders AS o ON r.Restaurants_id = o.Restaurants_id
GROUP BY m.item_name
ORDER BY
    many_times_ordered DESC;

SELECT DISTINCT r.name
FROM Restaurants AS r
    LEFT JOIN Orders AS o ON r.Restaurants_id = o.Restaurants_id
    LEFT JOIN swiggy_users AS u ON o.users_id = u.users_id AND u.email = 'john@gmail.com'
WHERE u.users_id = 101;

SELECT
    s.name,
    s.email,
    SUM(o.order_total) as total_cost
FROM swiggy_users AS s
    INNER JOIN Orders AS o ON s.users_id = o.users_id
    INNER JOIN Restaurants AS r ON o.Restaurants_id = r.Restaurants_id
WHERE r.name = 'Farzi Cafe'
GROUP BY s.name, s.email;

SELECT
    u.name as user_name,
    a.state,
    a.city,
    a.street,
    a.pincode,
    o.orders_id,
    o.users_id,
    p.payment_method,
    p.status AS payment_status,
    d.name AS delivery_agent_name
FROM
    orders AS o,
    swiggy_users AS u,
    address AS a,
    payment AS p,
    delivery_agents AS d,
    menu AS m,
    restaurants AS r
where
    o.users_id = u.users_id
    and u.users_id = a.users_id
    and u.users_id = a.users_id
    and o.orders_id = p.orders_id
    and o.restaurants_id = d.restaurants_id
    and o.restaurants_id = m.restaurants_id
    and m.item_name = 'Pizza'
    and r.name = 'Truffle Cafe';

SELECT
    o.orders_id,
    u.name AS user_name,
    r.name AS restaurant_name,
    o.order_total,
    o.delivery_status,
    p.status AS payment_status
FROM Orders o
    INNER JOIN swiggy_users AS u ON o.users_id = u.users_id
    INNER JOIN Restaurants AS r ON o.restaurants_id = r.restaurants_id
    INNER JOIN Payment AS p ON o.orders_id = p.orders_id
WHERE
    o.delivery_status = 'delivered'
    OR p.status = 'completed';

SELECT
    r.name,
    AVG(o.order_total) :: NUMERIC(10, 2) AS total_avg
FROM Restaurants AS r
    LEFT JOIN Orders AS o ON r.Restaurants_id = o.Restaurants_id
GROUP BY r.name
ORDER BY total_avg DESC;