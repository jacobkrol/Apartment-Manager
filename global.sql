--
-- initialize schema
--

DROP SCHEMA IF EXISTS global;
CREATE SCHEMA global;
USE home;
SET AUTOCOMMIT=0;

---
--- establish Listings table
---

DROP TABLE IF EXISTS `Listings`;
CREATE TABLE `Listings` (
    `id` INT(6) NOT NULL AUTO_INCREMENT,
    `address` CHAR(64) NOT NULL,
    `nickname` CHAR(64),
    `img` CHAR(128),
    `rent` INT(6) NOT NULL,
    `sqft` INT(6),
    `beds` INT(6),
    `baths` FLOAT,
    `inUnit` TINYINT(1) DEFAULT 0,
    `transitPublic` INT(6),
    `transitFoot` INT(6),
    `details` CHAR(128),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO Listings (address, nickname, img, rent, sqft, beds, baths, inUnit, transitPublic, transitFoot, details) VALUES ('719 S Loomis St Apt 2','Zaib House','https://photos.zillowstatic.com/uncropped_scaled_within_1536_1152/ISq1ehop8o8pi90000000000.webp', 2400, 1400, 4, 1.0, 0, 10, 20, 'blackboard wall');
COMMIT;
