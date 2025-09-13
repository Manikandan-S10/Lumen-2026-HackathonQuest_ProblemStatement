-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: lumen
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `billing_information`
--

DROP TABLE IF EXISTS `billing_information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `billing_information` (
  `billing_id` int NOT NULL,
  `subscription_id` int DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `billing_date` date DEFAULT NULL,
  `payment_status` enum('paid','pending','failed') NOT NULL,
  PRIMARY KEY (`billing_id`),
  KEY `subscription_id` (`subscription_id`),
  CONSTRAINT `billing_information_ibfk_1` FOREIGN KEY (`subscription_id`) REFERENCES `subscriptions` (`subscription_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `billing_information`
--

LOCK TABLES `billing_information` WRITE;
/*!40000 ALTER TABLE `billing_information` DISABLE KEYS */;
INSERT INTO `billing_information` VALUES (1,54,308.56,'2024-01-04','paid'),(2,52,200.11,'2024-05-26','paid'),(3,6,407.49,'2024-06-24','paid'),(4,100,289.68,'2024-04-09','pending'),(5,16,114.07,'2024-11-22','pending'),(6,24,411.41,'2024-11-26','paid'),(7,97,194.83,'2024-08-27','failed'),(8,17,32.64,'2024-09-13','pending'),(9,10,336.98,'2024-09-12','pending'),(10,63,376.25,'2023-12-02','pending'),(11,86,493.15,'2024-06-26','failed'),(12,51,10.43,'2024-07-02','paid'),(13,85,463.86,'2024-02-12','failed'),(14,18,84.45,'2024-08-08','failed'),(15,74,110.86,'2024-07-24','failed'),(16,32,242.59,'2024-04-03','failed'),(17,32,343.47,'2024-04-03','pending'),(18,67,233.40,'2024-07-02','failed'),(19,35,265.41,'2024-02-25','paid'),(20,97,17.89,'2024-03-19','failed'),(21,21,397.44,'2024-03-02','paid'),(22,78,344.58,'2024-11-22','failed'),(23,82,325.23,'2024-01-02','pending'),(24,79,21.76,'2023-12-23','paid'),(25,5,179.99,'2024-04-06','paid'),(26,98,415.26,'2024-05-21','paid'),(27,41,319.60,'2024-02-03','failed'),(28,31,49.62,'2024-07-16','paid'),(29,14,174.55,'2024-11-22','failed'),(30,81,215.18,'2024-09-14','pending'),(31,44,25.95,'2024-08-04','pending'),(32,49,27.60,'2024-09-20','paid'),(33,15,107.52,'2024-08-18','pending'),(34,95,190.84,'2024-08-23','pending'),(35,46,255.43,'2024-03-16','pending'),(36,4,255.62,'2024-08-09','failed'),(37,23,294.52,'2024-08-03','failed'),(38,5,166.90,'2024-07-31','paid'),(39,27,395.99,'2023-12-18','pending'),(40,47,400.19,'2024-05-09','failed'),(41,23,73.93,'2024-07-29','pending'),(42,24,412.08,'2024-09-20','failed'),(43,85,355.81,'2024-03-31','paid'),(44,31,109.12,'2024-04-14','failed'),(45,58,241.17,'2024-01-16','failed'),(46,41,71.74,'2024-02-28','paid'),(47,51,31.32,'2024-07-20','pending'),(48,77,376.94,'2024-10-20','paid'),(49,79,333.97,'2024-11-07','failed'),(50,47,243.13,'2024-11-17','paid'),(51,48,333.59,'2024-04-13','paid'),(52,27,152.27,'2024-05-03','failed'),(53,30,115.25,'2024-04-08','paid'),(54,43,228.58,'2024-11-18','failed'),(55,5,492.47,'2024-11-09','paid'),(56,75,335.56,'2024-07-14','pending'),(57,98,406.19,'2024-09-19','failed'),(58,83,299.26,'2024-04-13','pending'),(59,56,191.19,'2024-09-09','failed'),(60,24,249.58,'2024-02-07','failed'),(61,45,387.56,'2024-01-28','failed'),(62,98,416.63,'2024-10-05','pending'),(63,1,180.02,'2023-12-12','pending'),(64,45,359.57,'2024-09-18','pending'),(65,11,339.43,'2024-10-30','paid'),(66,7,46.86,'2024-09-17','paid'),(67,65,103.39,'2024-11-08','failed'),(68,63,175.25,'2024-03-24','paid'),(69,91,450.52,'2023-12-30','paid'),(70,98,443.56,'2024-09-24','failed'),(71,60,307.79,'2024-08-07','failed'),(72,30,88.54,'2024-01-04','failed'),(73,73,199.46,'2023-12-28','pending'),(74,33,49.01,'2024-08-13','failed'),(75,3,73.47,'2024-03-05','pending'),(76,29,404.86,'2024-10-19','pending'),(77,1,370.16,'2024-07-15','pending'),(78,79,380.28,'2023-12-11','paid'),(79,11,50.87,'2024-10-24','failed'),(80,71,54.44,'2024-05-18','paid'),(81,35,398.69,'2024-01-15','pending'),(82,83,178.46,'2024-05-07','pending'),(83,72,22.97,'2024-05-16','pending'),(84,17,338.12,'2024-10-24','paid'),(85,96,80.31,'2024-04-21','pending'),(86,8,136.46,'2024-05-19','paid'),(87,11,301.57,'2023-12-05','pending'),(88,80,120.49,'2024-08-11','pending'),(89,10,397.80,'2024-11-28','failed'),(90,10,384.03,'2024-03-23','paid'),(91,57,87.02,'2024-09-21','pending'),(92,92,32.19,'2024-03-15','pending'),(93,95,324.39,'2024-05-13','failed'),(94,49,175.98,'2024-09-22','pending'),(95,11,391.85,'2023-12-08','failed'),(96,60,209.74,'2024-05-06','failed'),(97,17,199.35,'2024-06-04','pending'),(98,96,31.25,'2023-12-02','failed'),(99,4,383.33,'2024-05-06','failed'),(100,42,296.99,'2023-12-14','paid');
/*!40000 ALTER TABLE `billing_information` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscription_logs`
--

DROP TABLE IF EXISTS `subscription_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscription_logs` (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `subscription_id` int DEFAULT NULL,
  `current_status` varchar(50) DEFAULT NULL,
  `next_status` varchar(50) DEFAULT NULL,
  `action` varchar(50) DEFAULT NULL,
  `action_date` date DEFAULT NULL,
  PRIMARY KEY (`log_id`),
  KEY `subscription_id` (`subscription_id`),
  CONSTRAINT `subscription_logs_ibfk_1` FOREIGN KEY (`subscription_id`) REFERENCES `subscriptions` (`subscription_id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscription_logs`
--

LOCK TABLES `subscription_logs` WRITE;
/*!40000 ALTER TABLE `subscription_logs` DISABLE KEYS */;
INSERT INTO `subscription_logs` VALUES (1,30,'initialized','paused','renew','2024-05-17'),(2,51,'active','paused','billing_success','2024-10-28'),(3,15,'active','paused','renew','2024-09-18'),(4,69,'active','paused','renew_failed','2024-08-09'),(5,99,'initialized','active','renew_failed','2024-07-23'),(6,62,'initialized','paused','purchase','2024-01-31'),(7,77,'initialized','paused','billing_success','2023-12-26'),(8,75,'active','active','renew_failed','2024-07-17'),(9,74,'active','paused','renew_failed','2024-01-31'),(10,22,'initialized','active','billing_success','2024-06-08'),(11,70,'initialized','active','purchase','2024-03-29'),(12,40,'active','paused','renew_failed','2024-01-11'),(13,28,'initialized','active','purchase','2024-08-29'),(14,17,'initialized','active','billing_success','2024-07-31'),(15,54,'initialized','paused','renew_failed','2024-09-23'),(16,94,'initialized','paused','billing_success','2024-06-15'),(17,81,'active','paused','renew','2024-08-20'),(18,75,'initialized','paused','renew','2023-12-26'),(19,37,'active','paused','renew_failed','2023-12-06'),(20,10,'active','paused','renew_failed','2024-06-10'),(21,78,'active','paused','purchase','2024-07-05'),(22,34,'active','active','renew_failed','2024-07-04'),(23,95,'initialized','paused','purchase','2024-09-16'),(24,6,'active','active','renew','2024-03-07'),(25,19,'active','paused','renew','2023-12-25'),(26,21,'active','active','renew_failed','2024-07-29'),(27,71,'active','paused','purchase','2024-01-21'),(28,56,'active','active','purchase','2024-10-08'),(29,59,'active','active','renew_failed','2024-03-20'),(30,93,'initialized','active','billing_success','2024-10-11'),(31,51,'active','active','billing_success','2024-08-24'),(32,56,'initialized','paused','renew_failed','2024-10-21'),(33,94,'initialized','active','billing_success','2024-05-30'),(34,8,'active','paused','purchase','2024-02-09'),(35,79,'active','paused','renew','2024-04-10'),(36,73,'active','paused','billing_success','2024-01-05'),(37,64,'active','paused','purchase','2024-03-17'),(38,96,'initialized','active','purchase','2024-09-02'),(39,81,'initialized','active','purchase','2024-03-13'),(40,3,'active','paused','renew_failed','2024-11-12'),(41,84,'active','paused','renew','2024-06-18'),(42,70,'active','active','renew','2024-04-30'),(43,38,'active','paused','purchase','2024-07-03'),(44,9,'active','paused','renew_failed','2024-06-22'),(45,22,'active','active','billing_success','2023-12-08'),(46,94,'initialized','paused','purchase','2024-06-01'),(47,64,'active','paused','purchase','2024-02-26'),(48,64,'initialized','paused','purchase','2024-10-09'),(49,26,'active','active','renew_failed','2023-12-10'),(50,62,'initialized','paused','renew','2024-04-07'),(51,42,'active','paused','renew','2024-09-26'),(52,44,'initialized','paused','billing_success','2024-04-21'),(53,13,'active','active','billing_success','2024-01-12'),(54,4,'active','paused','renew_failed','2024-06-28'),(55,17,'active','paused','renew','2024-04-10'),(56,19,'initialized','active','billing_success','2024-02-27'),(57,22,'active','paused','billing_success','2024-11-22'),(58,20,'active','active','purchase','2024-03-23'),(59,41,'initialized','active','renew_failed','2024-05-17'),(60,82,'active','active','billing_success','2024-10-19'),(61,62,'active','active','billing_success','2024-04-10'),(62,15,'active','active','billing_success','2024-10-18'),(63,9,'initialized','active','purchase','2024-01-01'),(64,8,'initialized','paused','renew','2024-07-10'),(65,6,'active','active','renew_failed','2023-11-30'),(66,85,'active','active','renew_failed','2024-05-04'),(67,26,'active','active','renew','2024-01-28'),(68,18,'initialized','paused','renew','2023-12-18'),(69,69,'initialized','active','renew_failed','2024-07-15'),(70,93,'active','active','purchase','2024-11-08'),(71,34,'active','active','purchase','2024-01-06'),(72,64,'initialized','paused','billing_success','2024-06-21'),(73,1,'initialized','paused','billing_success','2024-03-19'),(74,2,'active','active','renew_failed','2023-12-23'),(75,10,'initialized','active','renew','2024-01-12'),(76,75,'initialized','paused','renew','2024-08-28'),(77,91,'initialized','paused','renew','2024-07-05'),(78,78,'initialized','paused','renew_failed','2024-03-24'),(79,87,'initialized','active','renew_failed','2024-07-04'),(80,92,'initialized','active','billing_success','2024-05-18'),(81,41,'initialized','active','billing_success','2023-12-18'),(82,81,'active','paused','renew','2024-05-22'),(83,19,'active','active','billing_success','2024-11-20'),(84,79,'initialized','paused','purchase','2024-10-08'),(85,10,'active','active','billing_success','2024-10-24'),(86,43,'initialized','active','renew_failed','2024-10-30'),(87,1,'initialized','active','renew','2024-02-21'),(88,60,'active','active','purchase','2024-10-28'),(89,78,'initialized','paused','renew','2024-10-23'),(90,88,'initialized','paused','renew','2024-02-05'),(91,52,'active','paused','renew_failed','2023-12-01'),(92,26,'active','active','purchase','2024-05-20'),(93,50,'active','paused','renew','2024-05-22'),(94,34,'initialized','active','renew','2024-11-01'),(95,45,'active','paused','renew_failed','2024-06-07'),(96,74,'active','paused','purchase','2024-03-15'),(97,98,'active','paused','renew','2024-10-10'),(98,87,'active','paused','purchase','2024-07-19'),(99,1,'active','paused','purchase','2024-04-04'),(100,25,'initialized','active','purchase','2024-11-22');
/*!40000 ALTER TABLE `subscription_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscription_plans`
--

DROP TABLE IF EXISTS `subscription_plans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscription_plans` (
  `product_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `auto_renewal_allowed` tinyint(1) NOT NULL,
  `status` enum('Active','Inactive') NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscription_plans`
--

LOCK TABLES `subscription_plans` WRITE;
/*!40000 ALTER TABLE `subscription_plans` DISABLE KEYS */;
INSERT INTO `subscription_plans` VALUES (1,'Plan1',57.65,0,'Active'),(2,'Plan2',15.30,1,'Active'),(3,'Plan3',73.86,1,'Active'),(4,'Plan4',27.82,1,'Active'),(5,'Plan5',42.58,1,'Active'),(6,'Plan6',95.36,0,'Active'),(7,'Plan7',23.30,1,'Active'),(8,'Plan8',86.42,1,'Active'),(9,'Plan9',96.42,1,'Active'),(10,'Plan10',29.92,0,'Active'),(11,'Plan11',60.47,1,'Active'),(12,'Plan12',73.63,0,'Active'),(13,'Plan13',22.09,1,'Active'),(14,'Plan14',93.24,0,'Active'),(15,'Plan15',59.41,0,'Active'),(16,'Plan16',64.91,1,'Active'),(17,'Plan17',60.80,0,'Active'),(18,'Plan18',95.51,1,'Active'),(19,'Plan19',14.69,0,'Active'),(20,'Plan20',85.62,1,'Active'),(21,'Plan21',58.30,0,'Active'),(22,'Plan22',72.82,1,'Active'),(23,'Plan23',82.02,0,'Active'),(24,'Plan24',30.87,1,'Active'),(25,'Plan25',86.13,1,'Active'),(26,'Plan26',58.89,1,'Active'),(27,'Plan27',88.67,1,'Active'),(28,'Plan28',81.54,0,'Active'),(29,'Plan29',32.18,1,'Active'),(30,'Plan30',37.03,1,'Active'),(31,'Plan31',57.73,1,'Active'),(32,'Plan32',41.16,0,'Active'),(33,'Plan33',72.32,0,'Active'),(34,'Plan34',29.63,1,'Active'),(35,'Plan35',95.92,0,'Active'),(36,'Plan36',55.52,1,'Active'),(37,'Plan37',75.17,0,'Active'),(38,'Plan38',91.24,1,'Active'),(39,'Plan39',73.79,1,'Active'),(40,'Plan40',14.24,1,'Active'),(41,'Plan41',74.20,0,'Active'),(42,'Plan42',56.18,1,'Active'),(43,'Plan43',73.76,1,'Active'),(44,'Plan44',90.04,1,'Active'),(45,'Plan45',75.29,0,'Active'),(46,'Plan46',40.45,1,'Active'),(47,'Plan47',28.49,1,'Active'),(48,'Plan48',77.62,1,'Active'),(49,'Plan49',23.95,1,'Active'),(50,'Plan50',98.71,0,'Active'),(51,'Plan51',96.48,1,'Active'),(52,'Plan52',61.25,1,'Active'),(53,'Plan53',49.65,0,'Active'),(54,'Plan54',98.55,0,'Active'),(55,'Plan55',85.94,0,'Active'),(56,'Plan56',80.67,1,'Active'),(57,'Plan57',84.09,1,'Active'),(58,'Plan58',73.32,0,'Active'),(59,'Plan59',44.15,0,'Active'),(60,'Plan60',35.08,0,'Active'),(61,'Plan61',89.64,1,'Active'),(62,'Plan62',92.80,1,'Active'),(63,'Plan63',74.74,0,'Active'),(64,'Plan64',98.60,1,'Active'),(65,'Plan65',29.87,1,'Active'),(66,'Plan66',32.31,1,'Active'),(67,'Plan67',49.96,1,'Active'),(68,'Plan68',64.74,1,'Active'),(69,'Plan69',21.23,0,'Active'),(70,'Plan70',76.37,1,'Active'),(71,'Plan71',87.83,0,'Active'),(72,'Plan72',84.78,1,'Active'),(73,'Plan73',61.59,0,'Active'),(74,'Plan74',70.47,0,'Active'),(75,'Plan75',69.17,1,'Active'),(76,'Plan76',68.38,0,'Active'),(77,'Plan77',28.30,1,'Active'),(78,'Plan78',57.75,1,'Active'),(79,'Plan79',98.68,1,'Active'),(80,'Plan80',97.08,0,'Active'),(81,'Plan81',22.61,1,'Active'),(82,'Plan82',49.14,0,'Active'),(83,'Plan83',13.99,1,'Active'),(84,'Plan84',27.18,1,'Active'),(85,'Plan85',85.72,1,'Active'),(86,'Plan86',79.84,1,'Active'),(87,'Plan87',31.29,0,'Active'),(88,'Plan88',60.31,0,'Active'),(89,'Plan89',73.32,1,'Active'),(90,'Plan90',84.92,0,'Active'),(91,'Plan91',43.65,0,'Active'),(92,'Plan92',70.16,1,'Active'),(93,'Plan93',43.40,0,'Active'),(94,'Plan94',56.62,0,'Active'),(95,'Plan95',16.35,1,'Active'),(96,'Plan96',23.86,1,'Active'),(97,'Plan97',89.70,1,'Active'),(98,'Plan98',24.65,1,'Active'),(99,'Plan99',45.57,0,'Active'),(100,'Plan100',40.54,1,'Active');
/*!40000 ALTER TABLE `subscription_plans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscriptions`
--

DROP TABLE IF EXISTS `subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscriptions` (
  `subscription_id` int NOT NULL,
  `subscription_type` enum('monthly','yearly') NOT NULL,
  `product_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `status` enum('active','PAUSED') NOT NULL,
  `start_date` date DEFAULT NULL,
  `last_billed_date` date DEFAULT NULL,
  `last_renewed_date` date DEFAULT NULL,
  `terminated_date` date DEFAULT NULL,
  `grace_time_days` int DEFAULT NULL,
  PRIMARY KEY (`subscription_id`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `subscriptions_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `subscription_plans` (`product_id`),
  CONSTRAINT `subscriptions_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscriptions`
--

LOCK TABLES `subscriptions` WRITE;
/*!40000 ALTER TABLE `subscriptions` DISABLE KEYS */;
INSERT INTO `subscriptions` VALUES (1,'monthly',46,61,'PAUSED','2024-04-20','2024-01-20','2024-09-06',NULL,5),(2,'monthly',35,37,'active','2024-08-24','2024-03-19','2024-10-29',NULL,5),(3,'monthly',96,24,'active','2024-01-26','2023-12-10','2024-09-04',NULL,5),(4,'monthly',79,69,'active','2024-07-31','2024-11-21','2024-07-30',NULL,5),(5,'monthly',52,3,'active','2024-07-23','2024-04-05','2024-10-08',NULL,5),(6,'monthly',33,86,'active','2024-05-11','2024-09-08','2024-10-05',NULL,5),(7,'yearly',31,45,'PAUSED','2024-03-25','2024-05-15','2023-12-13',NULL,5),(8,'yearly',17,28,'active','2024-05-07','2024-10-03','2024-09-24',NULL,5),(9,'monthly',14,97,'PAUSED','2024-04-02','2024-10-08','2024-02-23',NULL,5),(10,'monthly',63,26,'PAUSED','2024-04-18','2024-09-28','2024-10-16',NULL,5),(11,'yearly',32,10,'PAUSED','2023-12-16','2024-10-13','2024-03-23',NULL,5),(12,'yearly',49,72,'active','2024-10-04','2024-04-28','2024-10-06',NULL,5),(13,'monthly',74,79,'active','2024-09-16','2024-10-21','2024-05-30',NULL,5),(14,'monthly',58,73,'active','2024-07-12','2024-05-15','2024-11-13',NULL,5),(15,'monthly',78,63,'PAUSED','2024-01-17','2024-02-24','2024-09-29',NULL,5),(16,'monthly',8,57,'active','2024-03-24','2024-09-01','2024-07-27',NULL,5),(17,'yearly',59,30,'PAUSED','2024-10-27','2024-05-20','2023-12-26',NULL,5),(18,'yearly',40,45,'PAUSED','2024-04-17','2024-08-10','2024-06-30',NULL,5),(19,'monthly',69,16,'PAUSED','2023-12-27','2024-10-10','2024-04-25',NULL,5),(20,'monthly',74,64,'PAUSED','2024-03-26','2024-06-07','2024-06-16',NULL,5),(21,'monthly',57,36,'PAUSED','2024-05-07','2024-02-11','2024-05-04',NULL,5),(22,'monthly',35,3,'active','2024-03-14','2024-03-29','2024-06-12',NULL,5),(23,'yearly',14,20,'active','2024-08-11','2024-02-09','2024-09-12',NULL,5),(24,'yearly',41,77,'active','2024-01-04','2024-06-04','2024-03-31',NULL,5),(25,'monthly',34,10,'PAUSED','2024-10-30','2024-05-27','2024-07-03',NULL,5),(26,'yearly',90,80,'active','2024-08-29','2024-06-02','2024-02-11',NULL,5),(27,'yearly',2,83,'PAUSED','2024-11-19','2024-02-22','2024-02-20',NULL,5),(28,'yearly',31,45,'PAUSED','2023-12-27','2024-01-07','2024-01-06',NULL,5),(29,'yearly',10,52,'PAUSED','2024-07-28','2024-08-22','2024-04-01',NULL,5),(30,'monthly',20,90,'active','2024-07-04','2024-01-26','2024-10-09',NULL,5),(31,'yearly',44,57,'PAUSED','2024-01-09','2024-09-28','2024-05-10',NULL,5),(32,'yearly',45,81,'PAUSED','2024-01-23','2024-11-08','2024-07-28',NULL,5),(33,'yearly',64,21,'active','2024-10-11','2024-02-17','2024-11-12',NULL,5),(34,'monthly',94,4,'PAUSED','2024-01-26','2023-12-13','2023-12-03',NULL,5),(35,'monthly',62,19,'PAUSED','2023-12-16','2024-07-23','2024-06-14',NULL,5),(36,'monthly',82,53,'active','2024-11-20','2023-12-07','2024-06-24',NULL,5),(37,'monthly',17,47,'PAUSED','2024-02-05','2024-09-05','2024-07-10',NULL,5),(38,'monthly',4,89,'PAUSED','2024-06-20','2024-05-28','2024-03-02',NULL,5),(39,'monthly',99,51,'active','2024-10-31','2024-11-09','2024-08-15',NULL,5),(40,'monthly',58,13,'PAUSED','2024-01-01','2024-11-25','2024-05-20',NULL,5),(41,'yearly',81,30,'active','2024-11-13','2023-12-23','2024-09-26',NULL,5),(42,'yearly',28,45,'PAUSED','2024-02-25','2024-01-02','2024-11-13',NULL,5),(43,'yearly',91,7,'PAUSED','2024-02-12','2024-02-29','2024-02-26',NULL,5),(44,'monthly',21,53,'PAUSED','2024-06-11','2024-04-07','2024-09-06',NULL,5),(45,'monthly',73,82,'PAUSED','2024-03-23','2024-10-07','2024-05-12',NULL,5),(46,'yearly',59,38,'PAUSED','2024-07-16','2024-10-08','2024-11-05',NULL,5),(47,'yearly',6,8,'PAUSED','2023-12-25','2024-10-01','2024-11-18',NULL,5),(48,'monthly',39,25,'PAUSED','2023-12-26','2024-09-21','2024-03-11',NULL,5),(49,'yearly',88,81,'PAUSED','2024-04-28','2024-03-09','2024-10-28',NULL,5),(50,'monthly',53,39,'active','2024-05-25','2024-10-25','2023-12-24',NULL,5),(51,'monthly',74,18,'active','2024-07-20','2024-10-15','2024-09-23',NULL,5),(52,'yearly',50,15,'active','2024-04-11','2023-12-31','2024-08-02',NULL,5),(53,'yearly',1,16,'active','2024-08-21','2024-02-07','2024-02-28',NULL,5),(54,'monthly',20,11,'PAUSED','2024-02-19','2024-11-10','2024-11-29',NULL,5),(55,'monthly',30,86,'PAUSED','2024-04-29','2023-12-26','2024-01-20',NULL,5),(56,'yearly',11,20,'active','2024-07-13','2024-11-22','2024-07-31',NULL,5),(57,'yearly',26,78,'PAUSED','2024-05-14','2024-08-12','2024-02-23',NULL,5),(58,'monthly',63,79,'PAUSED','2024-06-05','2024-05-23','2024-11-10',NULL,5),(59,'monthly',27,17,'active','2024-08-21','2023-12-12','2024-06-26',NULL,5),(60,'yearly',22,93,'PAUSED','2024-09-24','2024-04-17','2024-07-17',NULL,5),(61,'yearly',92,38,'active','2024-03-16','2024-01-01','2024-05-17',NULL,5),(62,'yearly',30,48,'active','2024-01-21','2024-03-07','2024-08-12',NULL,5),(63,'monthly',79,30,'PAUSED','2024-04-21','2024-08-18','2023-12-24',NULL,5),(64,'yearly',94,49,'active','2024-05-25','2024-09-30','2024-10-12',NULL,5),(65,'yearly',8,18,'active','2024-11-06','2023-12-07','2024-05-30',NULL,5),(66,'monthly',29,64,'active','2024-07-20','2024-01-28','2024-10-05',NULL,5),(67,'yearly',70,28,'active','2024-11-09','2024-11-03','2024-03-15',NULL,5),(68,'monthly',36,44,'PAUSED','2024-10-23','2024-09-25','2024-05-30',NULL,5),(69,'monthly',25,51,'PAUSED','2024-06-26','2024-06-08','2024-09-02',NULL,5),(70,'monthly',92,69,'PAUSED','2024-02-05','2024-03-07','2024-02-19',NULL,5),(71,'monthly',98,90,'active','2024-08-07','2024-04-13','2024-02-15',NULL,5),(72,'monthly',79,67,'PAUSED','2024-04-06','2024-09-24','2024-08-07',NULL,5),(73,'monthly',51,98,'active','2024-06-02','2024-08-15','2024-01-13',NULL,5),(74,'yearly',96,88,'PAUSED','2024-05-16','2024-07-29','2024-07-21',NULL,5),(75,'yearly',22,13,'active','2024-10-01','2024-04-08','2024-04-19',NULL,5),(76,'monthly',93,2,'PAUSED','2024-03-04','2024-07-19','2024-10-03',NULL,5),(77,'monthly',30,48,'active','2024-04-11','2024-05-23','2024-03-18',NULL,5),(78,'yearly',33,87,'PAUSED','2024-05-22','2024-09-21','2024-11-28',NULL,5),(79,'monthly',51,91,'active','2024-07-31','2023-12-05','2024-04-10',NULL,5),(80,'monthly',40,37,'active','2024-02-17','2024-04-04','2023-12-10',NULL,5),(81,'yearly',70,64,'active','2024-10-20','2024-07-09','2024-05-17',NULL,5),(82,'monthly',13,76,'PAUSED','2024-04-28','2024-06-21','2024-02-25',NULL,5),(83,'yearly',76,29,'active','2024-03-02','2024-08-13','2024-10-30',NULL,5),(84,'monthly',50,76,'PAUSED','2024-10-16','2024-07-24','2024-01-24',NULL,5),(85,'monthly',11,45,'active','2024-01-04','2024-04-30','2024-06-04',NULL,5),(86,'monthly',62,10,'PAUSED','2024-04-24','2024-08-04','2024-11-14',NULL,5),(87,'yearly',20,31,'PAUSED','2024-07-30','2024-09-26','2024-09-13',NULL,5),(88,'monthly',70,2,'active','2024-01-17','2024-11-07','2024-05-11',NULL,5),(89,'monthly',75,10,'PAUSED','2023-12-23','2023-12-22','2024-06-12',NULL,5),(90,'yearly',63,97,'active','2024-08-28','2024-11-01','2024-03-19',NULL,5),(91,'yearly',57,97,'active','2024-08-11','2024-07-26','2024-05-21',NULL,5),(92,'monthly',27,42,'PAUSED','2024-04-01','2024-02-16','2024-10-20',NULL,5),(93,'yearly',52,10,'PAUSED','2024-06-20','2024-07-12','2023-12-15',NULL,5),(94,'monthly',65,2,'PAUSED','2024-04-26','2024-01-14','2024-03-21',NULL,5),(95,'monthly',10,52,'PAUSED','2024-05-15','2023-12-30','2024-06-18',NULL,5),(96,'yearly',77,42,'PAUSED','2024-01-31','2024-05-09','2024-01-23',NULL,5),(97,'monthly',71,88,'active','2024-03-11','2024-03-08','2024-11-04',NULL,5),(98,'monthly',73,16,'active','2024-02-07','2024-01-17','2024-02-04',NULL,5),(99,'monthly',24,83,'active','2024-05-07','2024-09-07','2024-09-19',NULL,5),(100,'monthly',69,45,'PAUSED','2024-04-10','2024-05-02','2024-08-03',NULL,5);
/*!40000 ALTER TABLE `subscriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `status` enum('active','inactive') NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'User1','1234567801','user1@example.com','active'),(2,'User2','1234567802','user2@example.com','inactive'),(3,'User3','1234567803','user3@example.com','inactive'),(4,'User4','1234567804','user4@example.com','active'),(5,'User5','1234567805','user5@example.com','inactive'),(6,'User6','1234567806','user6@example.com','active'),(7,'User7','1234567807','user7@example.com','inactive'),(8,'User8','1234567808','user8@example.com','inactive'),(9,'User9','1234567809','user9@example.com','active'),(10,'User10','1234567810','user10@example.com','active'),(11,'User11','1234567811','user11@example.com','active'),(12,'User12','1234567812','user12@example.com','active'),(13,'User13','1234567813','user13@example.com','inactive'),(14,'User14','1234567814','user14@example.com','active'),(15,'User15','1234567815','user15@example.com','active'),(16,'User16','1234567816','user16@example.com','active'),(17,'User17','1234567817','user17@example.com','active'),(18,'User18','1234567818','user18@example.com','inactive'),(19,'User19','1234567819','user19@example.com','inactive'),(20,'User20','1234567820','user20@example.com','active'),(21,'User21','1234567821','user21@example.com','active'),(22,'User22','1234567822','user22@example.com','active'),(23,'User23','1234567823','user23@example.com','active'),(24,'User24','1234567824','user24@example.com','active'),(25,'User25','1234567825','user25@example.com','active'),(26,'User26','1234567826','user26@example.com','active'),(27,'User27','1234567827','user27@example.com','active'),(28,'User28','1234567828','user28@example.com','active'),(29,'User29','1234567829','user29@example.com','inactive'),(30,'User30','1234567830','user30@example.com','inactive'),(31,'User31','1234567831','user31@example.com','active'),(32,'User32','1234567832','user32@example.com','inactive'),(33,'User33','1234567833','user33@example.com','active'),(34,'User34','1234567834','user34@example.com','inactive'),(35,'User35','1234567835','user35@example.com','inactive'),(36,'User36','1234567836','user36@example.com','inactive'),(37,'User37','1234567837','user37@example.com','inactive'),(38,'User38','1234567838','user38@example.com','inactive'),(39,'User39','1234567839','user39@example.com','active'),(40,'User40','1234567840','user40@example.com','inactive'),(41,'User41','1234567841','user41@example.com','active'),(42,'User42','1234567842','user42@example.com','inactive'),(43,'User43','1234567843','user43@example.com','inactive'),(44,'User44','1234567844','user44@example.com','inactive'),(45,'User45','1234567845','user45@example.com','active'),(46,'User46','1234567846','user46@example.com','inactive'),(47,'User47','1234567847','user47@example.com','active'),(48,'User48','1234567848','user48@example.com','active'),(49,'User49','1234567849','user49@example.com','active'),(50,'User50','1234567850','user50@example.com','inactive'),(51,'User51','1234567851','user51@example.com','active'),(52,'User52','1234567852','user52@example.com','active'),(53,'User53','1234567853','user53@example.com','inactive'),(54,'User54','1234567854','user54@example.com','inactive'),(55,'User55','1234567855','user55@example.com','active'),(56,'User56','1234567856','user56@example.com','active'),(57,'User57','1234567857','user57@example.com','inactive'),(58,'User58','1234567858','user58@example.com','inactive'),(59,'User59','1234567859','user59@example.com','inactive'),(60,'User60','1234567860','user60@example.com','active'),(61,'User61','1234567861','user61@example.com','inactive'),(62,'User62','1234567862','user62@example.com','inactive'),(63,'User63','1234567863','user63@example.com','inactive'),(64,'User64','1234567864','user64@example.com','inactive'),(65,'User65','1234567865','user65@example.com','inactive'),(66,'User66','1234567866','user66@example.com','inactive'),(67,'User67','1234567867','user67@example.com','inactive'),(68,'User68','1234567868','user68@example.com','active'),(69,'User69','1234567869','user69@example.com','active'),(70,'User70','1234567870','user70@example.com','inactive'),(71,'User71','1234567871','user71@example.com','inactive'),(72,'User72','1234567872','user72@example.com','active'),(73,'User73','1234567873','user73@example.com','active'),(74,'User74','1234567874','user74@example.com','active'),(75,'User75','1234567875','user75@example.com','active'),(76,'User76','1234567876','user76@example.com','active'),(77,'User77','1234567877','user77@example.com','active'),(78,'User78','1234567878','user78@example.com','active'),(79,'User79','1234567879','user79@example.com','active'),(80,'User80','1234567880','user80@example.com','inactive'),(81,'User81','1234567881','user81@example.com','active'),(82,'User82','1234567882','user82@example.com','inactive'),(83,'User83','1234567883','user83@example.com','inactive'),(84,'User84','1234567884','user84@example.com','active'),(85,'User85','1234567885','user85@example.com','inactive'),(86,'User86','1234567886','user86@example.com','active'),(87,'User87','1234567887','user87@example.com','inactive'),(88,'User88','1234567888','user88@example.com','inactive'),(89,'User89','1234567889','user89@example.com','active'),(90,'User90','1234567890','user90@example.com','active'),(91,'User91','1234567891','user91@example.com','inactive'),(92,'User92','1234567892','user92@example.com','inactive'),(93,'User93','1234567893','user93@example.com','inactive'),(94,'User94','1234567894','user94@example.com','inactive'),(95,'User95','1234567895','user95@example.com','inactive'),(96,'User96','1234567896','user96@example.com','inactive'),(97,'User97','1234567897','user97@example.com','inactive'),(98,'User98','1234567898','user98@example.com','active'),(99,'User99','1234567899','user99@example.com','inactive'),(100,'User100','12345678100','user100@example.com','inactive');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-13 10:35:00
