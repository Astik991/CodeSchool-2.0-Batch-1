-- Active: 1692271565953@@127.0.0.1@5432@uber@public

CREATE TABLE
    Users(
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        phone VARCHAR(15) NOT NULL UNIQUE CHECK (LENGTH(phone) = 10),
        name VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR NOT NULL,
        user_role_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now()
    );

DROP TABLE Users;

--insert updated

INSERT INTO
    Users(
        phone,
        name,
        email,
        password,
        user_role_id
    )
VALUES (
        '9876423211',
        'Rahul',
        'rahul@gmail.com',
        md5('r@gh123' || 'uber'),
        0
    ), (
        '8876723212',
        'Sagar',
        'sagar@gmail.com',
        md5('s@gh123' || 'uber'),
        0
    ), (
        '6876783213',
        'Sandya',
        'sandya@gmail.com',
        md5('ra@gh123' || 'uber'),
        0
    ), (
        '9999999999',
        'Sanju',
        'sanju@gmail.com',
        md5('s@gh123' || 'uber'),
        1
    ), (
        '9876434514',
        'Nikil',
        'nikil@gmail.com',
        md5('n@gh123' || 'uber'),
        0
    ), (
        '9126423215',
        'Abhinow',
        'abhinow@gmail.com',
        md5('ab@gh123' || 'uber'),
        1
    ), (
        '9876423806',
        'Akash',
        'akash@gmail.com',
        md5('ak@gh123' || 'uber'),
        0
    ), (
        '9876423307',
        'Avinya',
        'avinya@gmail.com',
        md5('av@gh123' || 'uber'),
        1
    ), (
        '9876425028',
        'Vihan',
        'vihan@gmail.com',
        md5('vi@gh123' || 'uber'),
        0
    ), (
        '9555423219',
        'Lakshmi',
        'lakshmi@gmail.com',
        md5('la@gh123' || 'uber'),
        1
    ), (
        '9876890010',
        'Raghav',
        'raghav@gmail.com',
        md5('rag@gh123' || 'uber'),
        1
    ), (
        '9844423211',
        'Mohammad',
        'mohammad@gmail.com',
        md5('m@gh123' || 'uber'),
        0
    ), (
        '9875663802',
        'Raju',
        'raju@gmail.com',
        md5('ak@gh123' || 'uber'),
        0
    ), (
        '6666423303',
        'Lavanya',
        'lavanya@gmail.com',
        md5('av@gh123' || 'uber'),
        1
    ), (
        '9812350024',
        'Sam',
        'sam@gmail.com',
        md5('vi@gh123' || 'uber'),
        0
    ), (
        '9555423215',
        'Pranay',
        'pranay@gmail.com',
        md5('la@gh123' || 'uber'),
        1
    ), (
        '9823490016',
        'Jaggu',
        'jaggu@gmail.com',
        md5('rag@gh123' || 'uber'),
        1
    ), (
        '9844412348',
        'Yamuna',
        'yamuna@gmail.com',
        md5('m@gh123' || 'uber'),
        0
    );

--truncate Riders

TRUNCATE TABLE Riders;

--select Riders

select * from Users;

--create Address

CREATE TABLE
    Location_Address(
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        state VARCHAR,
        city VARCHAR,
        area VARCHAR,
        pincode INTEGER,
        latitude NUMERIC NOT NULL,
        longitude NUMERIC NOT NULL,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now()
    );

--drop table Address

DROP TABLE Location_Address;

--insert into address

INSERT INTO
    Location_Address(
        state,
        city,
        area,
        pincode,
        latitude,
        longitude
    )
VALUES (
        'Telangana',
        'Hyderabad',
        'Kukatpally',
        567555,
        17.494793,
        78.399643
    ), (
        'Andhra Pradesh',
        'Vijaywada',
        'Benz Circle',
        789666,
        16.506174,
        80.648018
    ), (
        'Andhra Pradesh',
        'visakapatnam',
        'Rishi Valley',
        575557,
        17.686815,
        83.218483
    ), (
        'Goa',
        'Goa',
        'Goa beach',
        900619,
        15.299326,
        74.123993
    ), (
        'Telangana',
        'Hyderabad',
        'SR Nagar',
        900626,
        17.443920,
        78.443250
    ), (
        'Telangana',
        'Nizampet',
        'Nizampet',
        900632,
        16.494793,
        16.399643
    ), (
        'TamilNadu',
        'Kanyakumari',
        'Sunrise Valley',
        678945,
        66.498793,
        76.399643
    ), (
        'Telangana',
        'Karimnagar',
        'karimnagar',
        565634,
        18.544793,
        78.309643
    ), (
        'Telangana',
        'Hyderabad',
        'Ameerpet',
        907555,
        9.494793,
        77.394543
    ), (
        'Telangana',
        'Hyderabad',
        'Bnajara hills',
        569555,
        16.494793,
        62.567643
    ), (
        'Telangana',
        'Hyderabad',
        'Jubilee hills',
        678901,
        15.494893,
        67.390643
    ), (
        'Telangana',
        'Hyderabad',
        'RTC cross roads',
        900003,
        18.684793,
        79.398743
    ), (
        'Telangana',
        'Hyderabad',
        'Madhapur',
        900004,
        89.498793,
        77.399643
    ), (
        'Telangana',
        'Hyderabad',
        'Hitech city',
        900005,
        65.544793,
        66.309643
    ), (
        'Telangana',
        'Hyderabad',
        'Gachibowli',
        677771,
        19.494793,
        77.394543
    ), (
        'Telangana',
        'Hyderabad',
        'Gopanpally',
        900087,
        20.494793,
        62.567643
    ), (
        'Telangana',
        'Hyderabad',
        'Ayyapa society',
        900086,
        35.494893,
        47.390643
    ), (
        'Telangana',
        'Hyderabad',
        'Sandhya theatre',
        233343,
        48.684793,
        69.398743
    );

--select address

SELECT * from Location_Address;

--create Address

CREATE TABLE
    Destination_Address(
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        state VARCHAR,
        city VARCHAR,
        area VARCHAR,
        pincode INTEGER,
        latitude NUMERIC NOT NULL,
        longitude NUMERIC NOT NULL,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now()
    );

--drop table Address

DROP TABLE Destination_Address;

--insert into address

INSERT INTO
    Destination_Address(
        state,
        city,
        area,
        pincode,
        latitude,
        longitude
    )
VALUES (
        'Telangana',
        'Hyderabad',
        'SR Nagar',
        567555,
        17.494793,
        78.399643
    ), (
        'Andhra Pradesh',
        'Vijaywada',
        'Ring Road',
        789666,
        16.506174,
        80.648018
    ), (
        'Andhra Pradesh',
        'visakapatnam',
        'Beach Road',
        575557,
        17.686815,
        83.218483
    ), (
        'Goa',
        'Goa',
        'Goa Food street',
        900619,
        15.299326,
        74.123993
    ), (
        'Telangana',
        'Hyderabad',
        'Madhapur',
        900626,
        17.443920,
        78.443250
    ), (
        'Telangana',
        'Karimnagar',
        'Karimnagar',
        900632,
        16.494793,
        16.399643
    ), (
        'Kerala',
        'Alipi',
        'Alipi',
        678945,
        66.498793,
        76.399643
    ), (
        'Telangana',
        'Nizampet',
        'Nizampet',
        565634,
        18.544793,
        78.309643
    ), (
        'Telangana',
        'Hyderabad',
        'Kukatpally',
        907555,
        9.494793,
        77.394543
    ), (
        'Telangana',
        'Hyderabad',
        'Jubilee hills',
        569555,
        16.494793,
        62.567643
    ), (
        'Telangana',
        'Hyderabad',
        'Banjara hills',
        678901,
        15.494893,
        67.390643
    ), (
        'Telangana',
        'Hyderabad',
        'Lakdikaoor',
        900003,
        18.684793,
        79.398743
    ), (
        'Telangana',
        'Hyderabad',
        'RTC cross roads',
        900004,
        89.498793,
        77.399643
    ), (
        'Telangana',
        'Hyderabad',
        'Gachibowli',
        900005,
        65.544793,
        66.309643
    ), (
        'Telangana',
        'Hyderabad',
        'Panjagutta',
        677771,
        19.494793,
        77.394543
    ), (
        'Telangana',
        'Hyderabad',
        'Hitech city',
        900087,
        20.494793,
        62.567643
    ), (
        'Telangana',
        'Hyderabad',
        'Sandhya theatre',
        900086,
        35.494893,
        47.390643
    ), (
        'Telangana',
        'Hyderabad',
        'Ayyapa society',
        233343,
        48.684793,
        69.398743
    );

--select address

SELECT * from Destination_Address;

--create Ride_Types

CREATE TABLE
    Ride_Types(
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name varchar(20) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now()
    );

--drop Ride_Types

DROP TABLE Ride_types 

--insert ride_types

INSERT INTO Ride_Types(name)
VALUES ('Uber Auto'), ('Uber Go'), ('Uber Premier'), ('Uber Connect'), ('Uber Rentals');

--select ride_types

SELECT * FROM ride_types;

--create Drivers TABLE

CREATE TABLE
    Drivers(
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        ride_types_id INTEGER NOT NULL REFERENCES ride_types(id),
        users_id INTEGER NOT NULL UNIQUE REFERENCES users(id),
        rating NUMERIC(2, 1) CHECK(rating <= 5.0) DEFAULT 1.0,
        no_of_rides INTEGER,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now()
    );

--drop Drivers

DROP TABLE Drivers;

--insert into Drivers

INSERT INTO
    Drivers(
        ride_types_id,
        rating,
        users_id,
        no_of_rides
    )
VALUES (1, 4.9, 4, 5), (2, 4.0, 6, 10), (3, 3.8, 8, 7), (2, 4.5, 10, 20), (1, 2.8, 11, 18), (5, 4.9, 14, 5), (4, 3.0, 16, 10), (3, 3.8, 17, 7);

--select Drivers

SELECT * FROM drivers;

--Vehicle Details

CREATE TABLE
    Vehicles(
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name varchar(20) NOT NULL,
        type VARCHAR(10) NOT NULL,
        number VARCHAR(15) NOT NULL UNIQUE,
        ride_types_id INTEGER NOT NULL REFERENCES ride_types(id),
        drivers_id INTEGER NOT NULL REFERENCES drivers(id),
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now()
    );

--drop Vehicle Details

DROP TABLE Vehicles;

--insert vehicles

INSERT INTO
    Vehicles(
        name,
        type,
        number,
        ride_types_id,
        drivers_id
    )
VALUES (
        'Tata Auto',
        'Electric',
        'AP39R1322',
        1,
        1
    ), (
        'Kia Sonet',
        'Petrol',
        'AP38R1322',
        2,
        2
    ), (
        'Benz A6',
        'Electric',
        'AP39Q1522',
        3,
        3
    ), (
        'Suzuki Desire',
        'Petrol',
        'AP39A6868',
        2,
        4
    ), (
        'Mahindra Auto',
        'Petrol',
        'AP39C1112',
        1,
        5
    ), (
        'Innovo',
        'Deisel',
        'AP39B6688',
        5,
        6
    ), (
        'Ford',
        'Deisel',
        'AP38J8899',
        4,
        7
    ), (
        'Audi',
        'Petrol',
        'AP39K4422',
        3,
        8
    );

--select Vehicles

SELECT * FROM Vehicles;

--Trip TABLE

CREATE TABLE
    Trips(
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        drivers_id INTEGER NOT NULL REFERENCES drivers(id),
        users_id INTEGER NOT NULL REFERENCES users(id),
        pickup INTEGER NOT NULL,
        destination INTEGER NOT NULL,
        price NUMERIC,
        trip_start_date DATE NOT NULL,
        trip_start_time TIME NOT NULL,
        trip_end_date DATE NOT NULL,
        trip_end_time TIME NOT NULL,
        duration TIME NOT NULL,
        status VARCHAR NOT NULL,
        ride_types_id INTEGER NOT NULL REFERENCES ride_types(id),
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now()
    );

--drop trips

DROP TABLE Trips;

--insert trips

INSERT INTO
    Trips (
        drivers_id,
        users_id,
        pickup,
        destination,
        price,
        trip_start_date,
        trip_start_time,
        trip_end_date,
        trip_end_time,
        duration,
        status,
        ride_types_id
    )
VALUES (
        1,
        5,
        1,
        2,
        500,
        '2023-08-21',
        '12:06:07',
        '2023-08-21',
        '12:10:07',
        '00:10:00',
        'completed',
        1
    ), (
        1,
        5,
        5,
        5,
        600,
        '2023-08-20',
        '11:06:07',
        '2023-08-20',
        '12:06:07',
        '01:00:00',
        'completed',
        1
    ), (
        1,
        3,
        3,
        3,
        300,
        '2023-08-20',
        '12:06:07',
        '2023-08-20',
        '12:10:07',
        '00:10:00',
        'completed',
        1
    ), (
        1,
        10,
        10,
        10,
        1500,
        '2023-08-19',
        '09:06:07',
        '2023-08-19',
        '09:06:07',
        '00:00:00',
        'User declined',
        1
    ), (
        1,
        11,
        11,
        11,
        80,
        '2023-08-22',
        '18:48:07',
        '2023-08-22',
        '18:50:07',
        '00:02:30',
        'Inprogress',
        1
    ), (
        2,
        5,
        3,
        3,
        1800,
        '2023-08-21',
        '09:00:07',
        '2023-08-21',
        '09:30:07',
        '00:30:00',
        'completed',
        2
    ), (
        2,
        1,
        1,
        1,
        2000,
        '2023-08-21',
        '11:06:07',
        '2023-08-21',
        '11:47:07',
        '00:41:00',
        'completed',
        2
    ), (
        2,
        13,
        13,
        13,
        800,
        '2023-08-21',
        '12:06:07',
        '2023-08-21',
        '12:10:07',
        '00:04:00',
        'completed',
        2
    ), (
        2,
        18,
        18,
        18,
        900,
        '2023-06-21',
        '09:00:07',
        '2023-06-21',
        '09:30:07',
        '00:30:00',
        'completed',
        2
    ), (
        2,
        16,
        16,
        16,
        1000,
        '2023-06-21',
        '11:06:07',
        '2023-06-21',
        '11:47:07',
        '00:41:00',
        'completed',
        2
    ), (
        2,
        13,
        14,
        14,
        300,
        '2023-06-21',
        '12:06:07',
        '2023-06-21',
        '12:10:07',
        '00:04:00',
        'completed',
        2
    ), (
        3,
        1,
        1,
        1,
        20,
        '2023-05-21',
        '09:00:07',
        '2023-05-21',
        '09:30:07',
        '00:30:00',
        'completed',
        3
    ), (
        3,
        7,
        7,
        7,
        90,
        '2023-05-21',
        '11:06:07',
        '2023-05-21',
        '11:47:07',
        '00:41:00',
        'Driver declined',
        3
    ), (
        3,
        14,
        14,
        14,
        780,
        '2023-05-21',
        '12:06:07',
        '2023-05-21',
        '12:10:07',
        '00:04:00',
        'completed',
        3
    ), (
        4,
        11,
        5,
        5,
        670,
        '2023-07-16',
        '09:00:07',
        '2023-07-16',
        '09:30:07',
        '00:30:00',
        'completed',
        2
    ), (
        4,
        9,
        9,
        9,
        433,
        '2023-07-16',
        '11:06:07',
        '2023-07-16',
        '11:47:07',
        '00:41:00',
        'Completed',
        2
    ), (
        4,
        6,
        6,
        6,
        788,
        '2023-07-16',
        '12:06:07',
        '2023-07-16',
        '12:10:07',
        '00:04:00',
        'completed',
        2
    ), (
        5,
        12,
        12,
        12,
        987,
        '2023-07-09',
        '09:00:07',
        '2023-07-09',
        '09:30:07',
        '00:30:00',
        'completed',
        1
    ), (
        5,
        3,
        1,
        1,
        234,
        '2023-07-09',
        '11:06:07',
        '2023-07-09',
        '11:47:07',
        '00:41:00',
        'Driver declined',
        1
    ), (
        5,
        1,
        1,
        1,
        454,
        '2023-07-09',
        '12:06:07',
        '2023-07-09',
        '12:10:07',
        '00:04:00',
        'Driver declined',
        1
    ), (
        6,
        11,
        11,
        11,
        888,
        '2023-07-16',
        '09:00:07',
        '2023-07-16',
        '09:30:07',
        '00:30:00',
        'completed',
        5
    ), (
        6,
        16,
        16,
        16,
        674,
        '2023-07-16',
        '11:06:07',
        '2023-07-16',
        '11:47:07',
        '00:41:00',
        'Completed',
        5
    ), (
        6,
        1,
        1,
        1,
        324,
        '2023-07-16',
        '12:06:07',
        '2023-07-16',
        '12:10:07',
        '00:04:00',
        'completed',
        5
    ), (
        7,
        11,
        11,
        11,
        777,
        '2023-08-26',
        '09:00:07',
        '2023-07-26',
        '09:30:07',
        '00:30:00',
        'Yet to Pickup',
        4
    ), (
        7,
        18,
        18,
        18,
        882,
        '2023-03-22',
        '11:06:07',
        '2023-03-22',
        '11:47:07',
        '00:41:00',
        'completed',
        4
    ), (
        7,
        9,
        9,
        9,
        221,
        '2023-07-16',
        '12:06:07',
        '2023-07-16',
        '12:10:07',
        '00:04:00',
        'completed',
        4
    ), (
        8,
        1,
        1,
        1,
        112,
        '2023-08-26',
        '09:00:07',
        '2023-07-26',
        '09:30:07',
        '00:30:00',
        'delivered',
        3
    ), (
        8,
        3,
        3,
        3,
        909,
        '2023-03-22',
        '11:06:07',
        '2023-03-22',
        '11:47:07',
        '00:41:00',
        'User declined',
        3
    ), (
        8,
        4,
        4,
        4,
        666,
        '2023-07-16',
        '12:06:07',
        '2023-07-16',
        '12:10:07',
        '00:04:00',
        'delivered',
        3
    );

--select trips

SELECT * FROM Trips;

--create payment TABLE

CREATE TABLE
    Payments(
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        amount NUMERIC NOT NULL,
        trips_id INTEGER REFERENCES trips(id),
        type varchar(20) NOT NULL,
        status VARCHAR(30) NOT NULL
    );

--drop payment TABLE

DROP TABLE Payments;

--insert Payments

INSERT INTO
    Payments(amount, type, trips_id, status)
VALUES (
        500,
        'UPI payment',
        1,
        'completed'
    ), (
        600,
        'UPI payment',
        2,
        'completed'
    ), (
        300,
        'Credit Card',
        3,
        'completed'
    ), (
        1500,
        'Debit Card',
        4,
        'Not initiated'
    ), (
        80,
        'UPI payment',
        5,
        'completed'
    ), (
        1800,
        'UPI payment',
        6,
        'completed'
    ), (
        2000,
        'Credit Card',
        7,
        'completed'
    ), (
        800,
        'Uber Cash',
        8,
        'completed'
    ), (
        900,
        'UPI payment',
        9,
        'completed'
    ), (
        1000,
        'UPI payment',
        10,
        'completed'
    ), (
        300,
        'Credit Card',
        11,
        'completed'
    ), (
        20,
        'Uber Cash',
        12,
        'completed'
    ), (
        90,
        'UPI payment',
        13,
        'Not initiated'
    ), (
        780,
        'Credit Card',
        14,
        'completed'
    ), (
        670,
        'Uber Cash',
        15,
        'completed'
    ), (
        433,
        'Credit Card',
        16,
        'completed'
    ), (
        788,
        'Uber Cash',
        17,
        'completed'
    ), (
        987,
        'Uber Cash',
        18,
        'completed'
    ), (
        234,
        'UPI payment',
        19,
        'Not initiated'
    ), (
        454,
        'UPI payment',
        20,
        'Not initiated'
    ), (
        888,
        'Credit Card',
        21,
        'completed'
    ), (
        674,
        'Uber Cash',
        22,
        'completed'
    ), (
        324,
        'Credit Card',
        23,
        'completed'
    ), (
        777,
        'Credit Card',
        24,
        'Prepayment completed'
    ), (
        882,
        'Uber Cash',
        25,
        'completed'
    ), (
        221,
        'Credit Card',
        26,
        'completed'
    ), (
        112,
        'Credit Card',
        27,
        'completed'
    ), (
        909,
        'Uber Cash',
        28,
        'Not initiated'
    ), (
        666,
        'Credit Card',
        29,
        'completed'
    );

--1)get the total no of users who are not drivers

SELECT COUNT(*) FROM users where user_role_id=0;

--2)get the driver names in uber

SELECT name FROM users where user_role_id=1;

--3)payments done above 1000;

SELECT * from payments where amount>1000;

--4)select driver name,service type,vehicle details

SELECT
    drivers.id,
    users.name,
    ride_types.name as "service type",
    vehicles.name as vehicle,
    vehicles.type,
    vehicles.number
FROM users
    INNER JOIN drivers ON users.id = drivers.users_id
    INNER JOIN ride_types on drivers.ride_types_id = ride_types.id
    INNER JOIN vehicles ON drivers.id = vehicles.drivers_id;

--5)count the no of vehicles in each service type

SELECT
    ride_types.name,
    count(vehicles.name) as no_of_vehicles
from ride_types
    INNER JOIN vehicles ON ride_types.id = vehicles.ride_types_id
GROUP BY ride_types.name;

--6)select best driver based on rating and no of rides minimum 8 rides

select name, phone, email
from users
where id = (
        select users_id
        from drivers
        where no_of_rides >= 8
        ORDER BY rating DESC
        LIMIT 1
    );

--7)get trips completed by particular user

SELECT
    users.id,
    users.name,
    users.phone,
    location_address.area as location,
    destination_address.area as destination,
    trips.trip_start_date,
    trips.trip_end_date
from users
    INNER JOIN trips on trips.users_id = users.id
    INNER JOIN location_address ON trips.pickup = location_address.id
    INNER JOIN destination_address on trips.destination = destination_address.id
where
    users.id = 5
    and trips.status = 'completed';

--8)get trips completed by particular driver

SELECT
    trips.drivers_id,
    users.id,
    users.name,
    users.phone,
    location_address.area as location,
    destination_address.area as destination,
    trips.trip_start_date,
    trips.trip_end_date
from users
    INNER JOIN trips on trips.users_id = users.id
    INNER JOIN location_address ON trips.pickup = location_address.id
    INNER JOIN destination_address on trips.destination = destination_address.id
where
    trips.drivers_id = 1
    and trips.status = 'completed';

--9)get trips completed by particular driver on specific date

SELECT
    trips.drivers_id,
    users.id,
    users.name,
    users.phone,
    location_address.area as location,
    destination_address.area as destination,
    trips.trip_start_date,
    trips.trip_end_date
from users
    INNER JOIN trips on trips.users_id = users.id
    INNER JOIN location_address ON trips.pickup = location_address.id
    INNER JOIN destination_address on trips.destination = destination_address.id
where
    trips.drivers_id = 1
    and trips.status = 'completed'
    and trips.trip_start_date = '2023-08-20';

--10)get driver  names information who have declined their trips and how many times they have declined

SELECT
    drivers.id,
    users.name,
    count(*) as no_of_times_declined
from trips
    INNER JOIN drivers on trips.drivers_id = drivers.id
    INNER JOIN users on drivers.users_id = users.id
where
    trips.status = 'Driver declined'
GROUP BY
    drivers.id,
    users.name;

--11)get the users who are not drivers

SELECT name from users where user_role_id=0;

--12)for every completed ride 10% of price goes to drivers how much they have earned in descending

SELECT
    drivers.id,
    users.name,
    sum(round(10 * trips.price / 100)) as commission
FROM users
    INNER JOIN drivers ON users.id = drivers.users_id
    INNER JOIN trips ON trips.drivers_id = drivers.id
WHERE
    trips.status = 'completed'
    or trips.status = 'delivered'
GROUP BY
    drivers.id,
    users.name
ORDER BY commission DESC;

--13)get all the user names whose name starts with 'R'

SELECT name,email,phone from users where name LIKE 'R%';

--14)get the trips declined by driver

SELECT
    trips.drivers_id,
    trips.users_id,
    trip_start_date,
    trips.status
FROM trips
WHERE status = 'User declined';

--15)get the all the payments history  by specific user

SELECT
    payments.id,
    trips.users_id,
    payments.type,
    payments.amount,
    payments.status
from payments
    INNER JOIN trips ON payments.trips_id = trips.id
where trips.users_id = 5;