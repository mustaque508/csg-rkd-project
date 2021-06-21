-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: csg_rkd_db
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `distribution_details`
--

DROP TABLE IF EXISTS `distribution_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `distribution_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `distribution_date` datetime DEFAULT NULL,
  `area` varchar(255) DEFAULT NULL,
  `qty` int DEFAULT NULL,
  `NGO` varchar(45) DEFAULT NULL,
  `incharge` varchar(255) DEFAULT NULL,
  `csg_volunteers` varchar(255) DEFAULT NULL,
  `data_collected` varchar(25) DEFAULT NULL,
  `mohalla_masjid_jamat` varchar(255) DEFAULT NULL,
  `contact_person` varchar(255) DEFAULT NULL,
  `cp_phone` varchar(45) DEFAULT NULL,
  `vehicle_used` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `purchase_details`
--

DROP TABLE IF EXISTS `purchase_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `purchase_date` datetime DEFAULT NULL,
  `supplier` varchar(255) DEFAULT NULL,
  `qty` varchar(45) DEFAULT NULL,
  `rate` varchar(45) DEFAULT NULL,
  `delivered_by` varchar(255) DEFAULT NULL,
  `recieved_by` varchar(255) DEFAULT NULL,
  `loaded_by` varchar(255) DEFAULT NULL,
  `unloaded_by` varchar(255) DEFAULT NULL,
  `vehicle_used` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rkd_data`
--

DROP TABLE IF EXISTS `rkd_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rkd_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) DEFAULT NULL,
  `contact_no` varchar(45) DEFAULT NULL,
  `aadhar_rationcard_no` varchar(45) DEFAULT NULL,
  `APL_BPL` varchar(20) DEFAULT NULL,
  `no_of_dependents` int DEFAULT NULL,
  `occupation` varchar(45) DEFAULT NULL,
  `no_of_children_below_15years_age` int DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `area_location` varchar(255) DEFAULT NULL,
  `mohalla_masjid_jamat` varchar(45) DEFAULT NULL,
  `contact_person` varchar(255) DEFAULT NULL,
  `cp_phone` varchar(45) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `role_details`
--

DROP TABLE IF EXISTS `role_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int DEFAULT NULL,
  `module_id` int DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  `module` varchar(45) DEFAULT NULL,
  `read` varchar(45) DEFAULT '0',
  `write` varchar(45) DEFAULT '0',
  `delete` varchar(45) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_register`
--

DROP TABLE IF EXISTS `user_register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_register` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) DEFAULT NULL,
  `contact_no` varchar(45) DEFAULT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `isAuthorized` int DEFAULT '0',
  `role_id` int DEFAULT '0',
  `created_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-21 20:09:41
