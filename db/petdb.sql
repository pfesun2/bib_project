
# in mySQL
CREATE SCHEMA `petdb` ;

CREATE TABLE `petdb`.`pet_info` (
  `id` INT NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `address` MEDIUMTEXT NOT NULL,
  `zipcode` INT NOT NULL,
  `pet_name` VARCHAR(45) NOT NULL,
  `pet_kind` TINYINT NOT NULL,
  `gender` VARCHAR(45) NOT NULL,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));


# If you cannot import csv, find secure_file_priv in my.ini and remove it!
SHOW VARIABLES LIKE "secure_file_priv"

LOAD DATA LOCAL INFILE 'C:/Users/ultrasound/Documents/Bibi_coding/Bib_project/db/MOCK_DATA.csv' INTO TABLE petdb.pet_info
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'

SELECT * FROM petdb.pet_info;


# in clearDB on Heroku

CREATE TABLE `heroku_d6129f995c862b0`.`pet_info` (
  `id` INT NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `address` MEDIUMTEXT NOT NULL,
  `zipcode` INT NOT NULL,
  `pet_name` VARCHAR(45) NOT NULL,
  `pet_kind` TINYINT NOT NULL,
  `gender` VARCHAR(45) NOT NULL,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

LOAD DATA LOCAL INFILE 'C:/Users/ultrasound/Documents/Bibi_coding/Bib_project/db/MOCK_DATA.csv' INTO TABLE heroku_d6129f995c862b0.pet_info
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'

SELECT * FROM heroku_d6129f995c862b0.pet_info;






