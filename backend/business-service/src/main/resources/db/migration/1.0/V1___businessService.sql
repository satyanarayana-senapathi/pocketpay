CREATE TABLE IF NOT EXISTS `BC105_pocketpay`.`business_type` (
    id INT PRIMARY KEY auto_increment,
    category VARCHAR(60),
    sub_category VARCHAR(60),
    business_size ENUM('10-50', '50-100', '100-1000')
);

CREATE TABLE IF NOT EXISTS `BC105_pocketpay`.`business` (
    id INT PRIMARY KEY auto_increment,
    business_name VARCHAR(60),
    registered_address VARCHAR(60),
    registered_number INT,
    user_id INT,
    business_type_id INT,
    FOREIGN KEY (user_id) REFERENCES `user`(id),
    FOREIGN KEY (business_type_id) REFERENCES business_type(id)
);

CREATE TABLE IF NOT EXISTS `BC105_pocketpay`.`owner` (
    id INT PRIMARY KEY auto_increment,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    country_of_residency VARCHAR(60),
    dob DATE,
    type ENUM('director', 'share_holder'),
    business_id INT,
    FOREIGN KEY (business_id) REFERENCES business(id)
);