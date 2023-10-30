CREATE TABLE IF NOT EXISTS `BC105_pocketpay`.`user` (
    id INT PRIMARY KEY auto_increment,
    email VARCHAR(20) unique not null,
    password VARCHAR(20),
    phone_number INT,
    country_code VARCHAR(20)
);
CREATE TABLE IF NOT EXISTS  `BC105_pocketpay`.`personal_details` (
    id INT PRIMARY KEY,
    first_name VARCHAR(60),
    last_name VARCHAR(60),
    country_residency VARCHAR(60),
    current_address VARCHAR(60),
    city VARCHAR(60),
    postal_code VARCHAR(60),
    dob DATE,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES `user`(id)
);