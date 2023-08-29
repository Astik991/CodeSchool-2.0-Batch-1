-- Active: 1692271708418@@127.0.0.1@5432
CREATE DATABASE redBus;
CREATE TABLE users(
    user_ID int not null PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(30),
    Password VARCHAR(20),
    Contact_No VARCHAR(10),
    Address VARCHAR(100)
    
);

CREATE TABLE buses(
Bus_ID int PRIMARY KEY NOT NULL,
Bus_No int,
No_Of_Seats int,
Seating_Type VARCHAR(10),
Ac_Type VARCHAR(10),
Driver_ID int,
FOREIGN KEY(Driver_ID) REFERENCES drivers(Driver_ID)
);
CREATE TABLE drivers(
Driver_ID int PRIMARY KEY NOT NULL,
Driver_Name VARCHAR(50),
Contact_No VARCHAR(10)
);
CREATE TABLE routes(
    Route_ID int PRIMARY KEY NOT NULL,
    Source_Location VARCHAR(50),
    Destination_Location VARCHAR(50),
    Fare FLOAT,
    Bus_ID  int ,
    FOREIGN KEY (Bus_ID) REFERENCES buses(Bus_ID)
);
CREATE TABLE seats(
Seat_ID int PRIMARY KEY,
Bus_ID int,
FOREIGN KEY(Bus_ID) REFERENCES buses(Bus_ID)
);
CREATE TABLE bookings (
    Booking_ID INT PRIMARY KEY,
    Date DATE,
    Time TIME,
    Bus_ID INT,
    Seat_ID INT,
    FOREIGN KEY (Bus_ID) REFERENCES buses (Bus_ID),
    FOREIGN KEY (Seat_ID) REFERENCES seats (Seat_ID)
);

CREATE TABLE tickets(
Ticket_ID int PRIMARY KEY,
Travel_Date DATE,
User_ID int,
Bus_ID int,
Route_ID int,
FOREIGN KEY(User_ID) REFERENCES users(User_ID),
FOREIGN KEY(Route_ID) REFERENCES routes(Route_ID)
);
CREATE TABLE payments(
Payment_ID int PRIMARY KEY,
Payment_Method VARCHAR(20),
Amount BIGINT,
Ticket_ID int,
dates date,
status varchar(10),
FOREIGN key(Ticket_ID) REFERENCES Tickets(Ticket_ID)
);

INSERT INTO users(user_ID , FirstName , LastName , Email , Password , Contact_No , Address  ) VALUES
(1,'Akhil','Maliga','akhil@gmail.com','123qwe','9123457869','L.b.nagar'),
(2,'Ajay','kaliyug','ajay@gmail.com','Ajay123','8197897650','DilshukNagar');
INSERT INTO users(user_ID , FirstName , LastName , Email ,Password , Contact_No , Address  ) VALUES
(3,'Akhila','Arati','akhila@gmail.com','123456789','9123457868','Jubilee Hills'),
(4,'Vijay','Etikala','vijay@gmail.com','Vijay123','8197897760','Yamjal');
INSERT INTO users(user_ID , FirstName , LastName , Email ,Password , Contact_No , Address  ) VALUES
(5,'Nikhil','Etikala','Nikhil@gmail.com','123QWEasd@','9213457868','Banjara Hills'),
(6,'Abhilash','Gaddam','abhi@gmail.com','abhi123','8917897760','Koti'),
(7,'Harsha','kathula','harsha@gmail.com','harsha123','8917879760','Nizamabad'),
(8,'Nithish','Boddu','nithish@gmail.com','nithish123','8917898900','vijayawada'),
(9,'Goutam','maliga','goutham@gmail.com','goutham123','9867123421','Chintalkunta'),
(10,'Naveen','Alakanti','naveen@gmail.com','naveen123','9848341942','Hayatnagar');

INSERT INTO drivers(Driver_ID,Driver_Name,Contact_No) VALUES
(300,'Abhijeeth','8179898986');


INSERT INTO drivers(Driver_ID,Driver_Name,Contact_No) VALUES
(301,'Nithin','8123456789'),
(302,'Vijay','7657890534'),
(303,'Naresh','9878653425'),
(304,'Srikanth','9087654321'),
(305,'Dileep','9087653421'),
(306,'Dheeraj','9087654321'),
(307,'Nagarjuna','9876234567'),
(308,'Akhilesh','9712345120'),
(309,'Naveen','9040263421');
INSERT INTO  buses(Bus_ID ,Bus_No ,No_Of_Seats ,Seating_Type ,Ac_Type,Driver_ID) VALUES
(100,1000,35,'Sleeper','Ac',300);
INSERT INTO  buses(Bus_ID ,Bus_No ,No_Of_Seats ,Seating_Type ,Ac_Type,Driver_ID) VALUES
(101,1001,60,'NonSleeper','Non-Ac',301),
(102,1002,26,'Sleeper','Ac',302),
(103,1003,40,'NonSleeper','Non-Ac',303),
(104,1004,60,'NonSleeper','Non-Ac',304),
(105,1005,30,'Sleeper','Ac',305),
(106,1006,60,'NonSleeper','Non-Ac',306),
(107,1007,28,'Sleeper','Ac',307),
(108,1008,60,'NonSleeper','Non-Ac',308),
(109,1009,35,'Sleeper','Ac',309)
;

INSERT INTO routes( Route_ID , Source_Location , Destination_Location , Fare ,Bus_ID ) VALUES
(200,'L.B.nagar','Tirupati',1200,100);
INSERT INTO routes( Route_ID , Source_Location , Destination_Location , Fare ,Bus_ID ) VALUES
(201,'Hyderabad','Vizag',1600,101),
(202,'Tirupati','Vizag',2600,102),
(203,'Tanuku','Vijayawada',2000,103),
(204,'Vijayawada','Vizag',1500,104),
(205,'Banglore','Hyderabad',2500,105),
(206,'Hyderabad','TamilNadu',4000,106),
(207,'Nalgonda','Hyderabad',200,107),
(208,'Kadapa','Hyderabad',2000,108),
(209,'Hyderabad','Amaravathi',1500,109)
;
INSERT INTO seats(Seat_ID ,Bus_ID) VALUES(400,100);
INSERT INTO seats(Seat_ID ,Bus_ID) VALUES(401,100),(402,100),(415,100),(403,100),(404,100),(405,100),
(406,101),(407,101),(408,101),(409,101),(410,101),(411,102),(412,103),(413,104),(414,105);
INSERT INTO bookings(Booking_ID ,Date ,Time ,Bus_ID ,Seat_ID) VALUES(11,'2023-07-11','11:11:11',100,400);
INSERT INTO bookings (Booking_ID, Date, Time, Bus_ID, Seat_ID)
VALUES
    (12, '2023-07-11', '12:10:43', 101, 401),
    (13, '2023-08-21', '10:10:34', 102, 403),
    (14, '2023-08-22', '10:20:00', 102, 404);
    INSERT INTO bookings (Booking_ID, Date, Time, Bus_ID, Seat_ID)
VALUES
    (15, '2023-07-11', '07:10:43', 103, 405),
    (16, '2023-08-21', '06:10:34', 104, 406),
    (17, '2023-08-22', '08:20:00', 106, 407),
     (18, '2023-06-11', '06:15:43', 107, 407);
INSERT INTO tickets(Ticket_ID ,Travel_Date ,User_ID ,Bus_ID ,Route_ID) VALUES (20,'2023-08-23',1,100,200);
INSERT INTO tickets (Ticket_ID, Travel_Date, User_ID, Bus_ID, Route_ID)
VALUES 
    (21, '2023-08-24', 2, 101, 201),
    (22, '2023-08-30', 3, 102, 202),
    (23, '2023-09-02', 4, 103, 203),
    (24, '2023-09-03', 5, 103, 204),
    (25, '2023-09-10', 6, 104, 204),
    (26, '2023-07-08', 7, 105, 205);
    INSERT INTO tickets VALUES(21,'2023-08-24', 2, 101, 201);
INSERT INTO payments(Payment_ID ,Payment_Method,Amount,Ticket_ID,dates,status) VALUES (50,'Credit Card',1700,20,'2023-08-21','success');
INSERT INTO payments(Payment_ID ,Payment_Method,Amount,Ticket_ID,dates,status) VALUES (51,'Debit Card',1900,null,'2023-08-21','Fail'),
(52,'UPI',2600,22,'2023-08-30','Success'),(53,'Debit Card',2000,23,'2023-09-02','Success');
INSERT INTO payments(Payment_ID ,Payment_Method,Amount,Ticket_ID,dates,status) VALUES (54,'UPI ',1900,24,'2023-08-21','success'),
(55,'Credit Card',2600,25,'2023-08-30','Success'),(56,'Debit Card',2000,26,'2023-09-02','Success');
select * from payments where Ticket_ID is null;
delete from payments where payment_ID=51;

-- Query to find DriverName who is driving bus no.1000
select Driver_Name from drivers join buses on drivers.Driver_ID=buses.Driver_ID join routes on buses.Bus_ID=routes.Bus_ID where Bus_No =1000 ;

-- Query to find buses start from Hyderabad
select Bus_No,source_Location,Destination_Location from buses join routes on buses.Bus_ID=routes.Bus_ID where source_Location='Hyderabad';
-- query to find count of buses start from all locations
SELECT count(*),source_Location from buses join routes on buses.Bus_ID=routes.Bus_ID group by Source_Location;
-- Query to find payment failed passenger
select FirstName,LastName from users join tickets on users.user_ID=tickets.user_ID join payments on tickets.Ticket_ID=payments.Ticket_ID where payments.Ticket_ID is null;
SELECT * FROM payments where status='Fail';
-- Query to find Driver details
select Driver_Name,contact_No from drivers join buses on drivers.Driver_ID=buses.Driver_ID join routes on buses.Bus_ID=routes.Bus_ID where source_Location='Hyderabad' and Destination_Location='Vizag';
-- Query to find count of status
select count(*),status from payments group by status;
-- Query to find Ac and Non Ac buses
select count(*),AC_Type from buses group by Ac_Type;
-- Query to find sleeper and non sleeper buses count
select Seating_Type,count(*) from buses group by Seating_Type;
-- query to find journeys of buses
select Travel_Date,Source_Location,Destination_Location from tickets join routes on tickets.route_ID=routes.Route_ID;
-- Query to find count of passengers travelling in every journey
select count(*),Source_Location  from tickets join routes on tickets.route_ID=routes.Route_ID group by source_Location;
-- Query to fetch users who have not booked tickets
SELECT users.user_ID,FirstName FROM users left join tickets on users.user_ID=tickets.user_ID where tickets.user_ID is NULL;
-- Query to fetch remaning seats from buses
SELECT No_Of_Seats,count(Ticket_ID) AS Booked,No_of_seats-count(Ticket_ID) as Remaining ,buses.bus_ID from buses JOIN tickets on buses.bus_ID=tickets.bus_ID group by buses.bus_ID;
-- Query to select seats booked in particular bus
SELECT  seats.seat_ID FROM seats JOIN bookings on seats.seat_ID=bookings.seat_ID where bookings.bus_ID=101 AND bookings.date='2023-07-11';
-- Query to find the Passenger details who travlled on particular date and particular bus
SELECT FirstName,LastName from users join tickets  on users.user_ID=tickets.user_ID where travel_Date='2023-08-30' and bus_ID=102;
-- Query to  select Driver names and their respective vehicles
SELECT drivers.Driver_ID,Driver_Name,Contact_No,bus_ID from drivers  join buses on drivers.driver_ID=buses.driver_ID;
-- Query to fetch tickets which are not issued for failed payments
SELECT * from payments left join tickets on tickets.Ticket_ID=payments.Ticket_ID where tickets.ticket_ID is  null;