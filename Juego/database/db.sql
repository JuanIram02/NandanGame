create database miau;
use miau;
CREATE TABLE `puntuaciones` (
  `p_id` int NOT NULL AUTO_INCREMENT,
  `p_nombre` varchar(45) DEFAULT NULL,
  `p_stringpuntuacion` varchar(10) DEFAULT NULL,
  `p_puntuacion` int DEFAULT 0,
  `p_monedas` int DEFAULT 0

  PRIMARY KEY (`p_id`)
) 
