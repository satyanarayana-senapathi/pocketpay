create database BC105_pocketpay;
use BC105_pocketpay;

CREATE TABLE bank_account (
    account_number INT primary key,
    bank_name VARCHAR(60) default null,
    bank_address VARCHAR(200),
    ifsc varchar(60) default null,
    account_type enum('Checking','Saving')
);

CREATE TABLE user (
    id INT PRIMARY KEY auto_increment,
    email VARCHAR(100) unique not null,
    password VARCHAR(50),
    phone_number BIGINT,
    country_code VARCHAR(20)
);


CREATE TABLE business_type (
    id INT PRIMARY KEY auto_increment,
    category VARCHAR(60),
    sub_category VARCHAR(100),
    business_size VARCHAR(60),
);


CREATE TABLE debit_card (
    id INT PRIMARY KEY auto_increment,
    expiry_date DATE,
    cvv INTEGER,
    card_number INTEGER,
);


CREATE TABLE recipient (
    id INT PRIMARY KEY auto_increment,
    email VARCHAR(20) unique not null,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    account_number INTEGER,
    foreign key(account_number) references bank_account(account_number)
);


CREATE TABLE payment_method (
    id INT PRIMARY KEY auto_increment,
    payment_mode ENUM('debit', 'bank'),
    debit_card_id INT,
    bank_account_id integer,
    user_id INT,
    FOREIGN KEY (debit_card_id) REFERENCES debit_card(id),
    FOREIGN KEY (bank_account_id) REFERENCES bank_account(account_number),
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE personal_details (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(60),
    last_name VARCHAR(60),
    country_residency VARCHAR(60),
    current_address VARCHAR(60),
    city VARCHAR(60),
    postal_code VARCHAR(60),
    dob DATE,
    user_id INT not null,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE business (
    id INT PRIMARY KEY auto_increment,
    business_name VARCHAR(100),
    registered_address VARCHAR(200),
    registered_number VARCHAR(20),
    user_id INT,
    business_type_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (business_type_id) REFERENCES business_type(id)
);

CREATE TABLE owner (
    id INT PRIMARY KEY auto_increment,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    country_of_residency VARCHAR(60),
    dob DATE,
    type ENUM('director', 'shareholder'),
    business_id INT,
    FOREIGN KEY (business_id) REFERENCES business(id)
);

CREATE TABLE transfer (
    id INT PRIMARY KEY auto_increment,
    amount_sent DECIMAL(10,2),
    amount_received DECIMAL(10,2)
    payment_purpose VARCHAR(200),
    from_currency VARCHAR(60),
    to_currency VARCHAR(60),
    transfer_rate DECIMAL(10,2),
    transfer_type ENUM('debit', 'bank'),
    status ENUM('sending', 'sent', 'cancelled'),
    recipient_id INT,
    payment_method_id INT,
    user_id INT,
    FOREIGN KEY (recipient_id) REFERENCES recipient(id),
    FOREIGN KEY (payment_method_id) REFERENCES payment_method(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);