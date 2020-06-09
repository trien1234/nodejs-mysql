-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 02, 2019 at 03:06 PM
-- Server version: 5.7.28-0ubuntu0.16.04.2
-- PHP Version: 7.3.8-1+ubuntu16.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `app_ql_chungcu`
--

-- --------------------------------------------------------

--
-- Table structure for table `ApartmentStatus`
--

CREATE TABLE `ApartmentStatus` (
  `Id` int(11) NOT NULL,
  `Code` int(11) DEFAULT NULL,
  `Description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedDate` datetime DEFAULT NULL,
  `IsDeleted` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ApartmentStatus`
--

INSERT INTO `ApartmentStatus` (`Id`, `Code`, `Description`, `CreatedBy`, `CreatedDate`, `UpdatedBy`, `UpdatedDate`, `IsDeleted`) VALUES
(7, 1, 'Trống/chưa ss', NULL, NULL, NULL, NULL, 0),
(8, 2, 'Trống', NULL, NULL, NULL, NULL, 0),
(9, 3, 'Cọc', NULL, NULL, NULL, NULL, 0),
(10, 4, 'Đang ở', NULL, NULL, NULL, NULL, 0),
(11, 5, 'Sắp hết hạn', NULL, NULL, NULL, NULL, 0),
(12, 6, 'Gia hạn', NULL, NULL, NULL, NULL, 0),
(13, 7, 'Thanh lý', NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `ApartmentStatusHistory`
--

CREATE TABLE `ApartmentStatusHistory` (
  `Id` int(11) NOT NULL,
  `HouseId` int(11) NOT NULL,
  `StatusId` int(11) NOT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedDate` datetime DEFAULT NULL,
  `IsDeleted` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ApartmentStatusHistory`
--

INSERT INTO `ApartmentStatusHistory` (`Id`, `HouseId`, `StatusId`, `CreatedBy`, `CreatedDate`, `UpdatedBy`, `UpdatedDate`, `IsDeleted`) VALUES
(4, 8, 7, NULL, '2019-11-23 17:30:46', NULL, NULL, 0),
(7, 9, 7, NULL, '2019-11-23 18:03:19', NULL, NULL, 0),
(8, 9, 9, NULL, '2019-11-23 18:03:23', NULL, NULL, 0),
(9, 9, 13, NULL, '2019-11-23 18:03:27', NULL, NULL, 0),
(10, 10, 7, NULL, '2019-11-23 18:03:42', NULL, NULL, 0),
(11, 10, 11, NULL, '2019-11-23 18:03:49', NULL, NULL, 0),
(12, 8, 10, NULL, '2019-11-23 18:13:50', NULL, NULL, 0),
(13, 8, 11, NULL, '2019-11-23 18:13:58', NULL, NULL, 0),
(14, 8, 7, NULL, '2019-11-23 18:14:00', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `AppRating`
--

CREATE TABLE `AppRating` (
  `Id` int(11) NOT NULL,
  `Point` int(11) DEFAULT NULL,
  `LikeFunction` int(11) DEFAULT NULL,
  `Feedback` varchar(255) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  `CreatedDate` datetime NOT NULL,
  `UpdatedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `AppRating`
--

INSERT INTO `AppRating` (`Id`, `Point`, `LikeFunction`, `Feedback`, `UserId`, `CreatedDate`, `UpdatedDate`) VALUES
(1, 8, 1, 'App kha tot, toi hai long', 30, '2019-11-30 11:14:46', '2019-11-30 11:14:46');

-- --------------------------------------------------------

--
-- Table structure for table `Building`
--

CREATE TABLE `Building` (
  `Id` int(11) NOT NULL,
  `Name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Note` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `BillDateRange` int(11) DEFAULT NULL,
  `ElectricBill` float DEFAULT NULL,
  `WaterType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `WaterPrice` float DEFAULT NULL,
  `CarParkPrice` float DEFAULT NULL,
  `MotobikeParkPrice` float DEFAULT NULL,
  `BikeParkPrice` float DEFAULT NULL,
  `ServicePrice` float DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedDate` datetime DEFAULT NULL,
  `IsDeleted` tinyint(1) DEFAULT '0',
  `ManagerId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Building`
--

INSERT INTO `Building` (`Id`, `Name`, `Code`, `Address`, `Status`, `Note`, `BillDateRange`, `ElectricBill`, `WaterType`, `WaterPrice`, `CarParkPrice`, `MotobikeParkPrice`, `BikeParkPrice`, `ServicePrice`, `CreatedBy`, `CreatedDate`, `UpdatedBy`, `UpdatedDate`, `IsDeleted`, `ManagerId`) VALUES
(1, 'Building 1', 'B1', 'Thanh Xuân, Hà Nội', 'AC', 'No comment', 4, 1666, 'AC', 30000, 19999, 21212, 212129, 545454, NULL, '2019-11-01 16:20:30', NULL, NULL, 0, 33),
(2, 'Ecohome1', '3535', 'Hà Nội', NULL, NULL, NULL, NULL, NULL, 545465000, 3454450, 46456, 45656, 4565650, NULL, '2019-11-07 23:34:49', NULL, NULL, 0, 33),
(3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2019-11-09 12:53:02', NULL, NULL, 0, NULL),
(4, 'TB01', 'TB01', '1 Nguyễn Trãi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2019-11-18 09:10:42', NULL, NULL, 0, 33),
(5, 'First building', 'FB-01', 'Cau Giay, Ha Noi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2019-11-18 11:04:50', NULL, NULL, 0, NULL),
(6, 'Landmark 72', 'LRK-72', 'Cau Giay, Ha Noi', NULL, NULL, 15, 1900, NULL, 30000, 150000, 80000, 20000, 20000, NULL, '2019-11-21 09:36:11', NULL, NULL, 0, 32),
(7, 'Nhà TB01', 'TB01', 'Cau Giay, Ha Noi', NULL, NULL, 15, 1900, NULL, 30000, 150000, 80000, 20000, 20000, NULL, '2019-11-23 17:24:20', NULL, NULL, 0, 32);

-- --------------------------------------------------------

--
-- Table structure for table `Contract`
--

CREATE TABLE `Contract` (
  `id` int(11) NOT NULL,
  `CheckinDate` date DEFAULT NULL,
  `CheckoutDate` date DEFAULT NULL,
  `Tenants` json DEFAULT NULL,
  `RentalFee` float DEFAULT NULL,
  `ElectricBill` float DEFAULT NULL,
  `WaterPrice` float DEFAULT NULL,
  `CarParkPrice` float DEFAULT NULL,
  `MotobikeParkPrice` float DEFAULT NULL,
  `BikeParkPrice` float DEFAULT NULL,
  `ServicePrice` float DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedDate` datetime DEFAULT NULL,
  `IsDeleted` tinyint(1) DEFAULT '0',
  `BillDateRange` int(11) DEFAULT NULL,
  `HouseId` int(11) NOT NULL,
  `RepresentativeName` varchar(255) DEFAULT NULL,
  `RepresentativeTel` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Contract`
--

INSERT INTO `Contract` (`id`, `CheckinDate`, `CheckoutDate`, `Tenants`, `RentalFee`, `ElectricBill`, `WaterPrice`, `CarParkPrice`, `MotobikeParkPrice`, `BikeParkPrice`, `ServicePrice`, `CreatedBy`, `CreatedDate`, `UpdatedBy`, `UpdatedDate`, `IsDeleted`, `BillDateRange`, `HouseId`, `RepresentativeName`, `RepresentativeTel`) VALUES
(10, '2019-11-01', '2019-12-12', NULL, 2900000, 1900, 30000, 150000, 80000, 20000, 20000, NULL, '2019-11-26 10:42:59', NULL, NULL, 0, 15, 8, 'Nguyen Van a', '0987654321'),
(11, '2019-12-02', '2019-12-30', NULL, 2900000, 1900, 30000, 150000, 80000, 20000, 20000, NULL, '2019-11-26 10:43:15', NULL, NULL, 0, 15, 8, 'Nguyen Van A', '0123456789');

-- --------------------------------------------------------

--
-- Table structure for table `Evaluate`
--

CREATE TABLE `Evaluate` (
  `Id` int(11) NOT NULL,
  `Type` int(11) DEFAULT NULL,
  `Question1` int(11) DEFAULT NULL,
  `Question2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Question3` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedDate` datetime DEFAULT NULL,
  `IsDeleted` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Evaluate`
--

INSERT INTO `Evaluate` (`Id`, `Type`, `Question1`, `Question2`, `Question3`, `CreatedBy`, `CreatedDate`, `UpdatedBy`, `UpdatedDate`, `IsDeleted`) VALUES
(1, 1, NULL, NULL, NULL, 1, '2019-11-01 16:19:00', NULL, NULL, 0),
(2, 1, NULL, NULL, NULL, 2, '2019-11-01 17:21:58', NULL, NULL, 0),
(3, 1, 5, '5', 'yes', 3, '2019-11-01 17:23:10', NULL, NULL, 0),
(4, 1, NULL, NULL, NULL, 13, '2019-11-05 15:15:43', NULL, NULL, 0),
(5, 1, NULL, NULL, NULL, 15, '2019-11-09 00:14:16', NULL, NULL, 0),
(6, 1, NULL, NULL, NULL, 16, '2019-11-09 07:51:58', NULL, NULL, 0),
(7, 1, NULL, NULL, NULL, 17, '2019-11-09 09:35:06', NULL, NULL, 0),
(8, 1, NULL, NULL, NULL, 18, '2019-11-09 13:19:20', NULL, NULL, 0),
(9, 1, NULL, NULL, NULL, 20, '2019-11-11 03:10:10', NULL, NULL, 0),
(10, 1, NULL, NULL, NULL, 21, '2019-11-11 03:10:35', NULL, NULL, 0),
(11, 1, NULL, NULL, NULL, 22, '2019-11-11 03:11:00', NULL, NULL, 0),
(12, 1, NULL, NULL, NULL, 24, '2019-11-12 12:20:09', NULL, NULL, 0),
(13, 1, NULL, NULL, NULL, 27, '2019-11-14 15:28:51', NULL, NULL, 0),
(14, 1, NULL, NULL, NULL, 25, '2019-11-17 09:16:13', NULL, NULL, 0),
(15, 1, 3, '4', 'Yes', 33, '2019-11-21 09:33:54', NULL, NULL, 0),
(16, 1, 5, '5', 'No', 34, '2019-11-21 09:41:40', NULL, NULL, 0),
(17, 1, 5, '5', 'yes', 32, '2019-11-21 13:26:37', NULL, NULL, 0),
(18, 1, NULL, NULL, NULL, 31, '2019-11-23 07:17:45', NULL, NULL, 0),
(19, 1, NULL, NULL, NULL, 37, '2019-11-26 02:30:23', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `FixerGroup`
--

CREATE TABLE `FixerGroup` (
  `Id` int(11) NOT NULL,
  `Name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedDate` datetime DEFAULT NULL,
  `IsDeleted` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `FixerGroup`
--

INSERT INTO `FixerGroup` (`Id`, `Name`, `Description`, `CreatedBy`, `CreatedDate`, `UpdatedBy`, `UpdatedDate`, `IsDeleted`) VALUES
(1, 'Thợ điện', 'Chuyên sửa điện', NULL, '2019-11-18 03:58:52', NULL, NULL, 0),
(2, 'Thợ sửa ống nước', 'Chuyên sửa ống nước', NULL, '2019-11-18 03:58:52', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `Fixer_Price`
--

CREATE TABLE `Fixer_Price` (
  `Id` int(11) NOT NULL,
  `IncidentId` int(11) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  `Price` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FixDate` datetime DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `UpdatedDate` datetime DEFAULT NULL,
  `AcceptedBy` int(11) DEFAULT NULL,
  `AcceptedDate` datetime DEFAULT NULL,
  `Status` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Fixer_Price`
--

INSERT INTO `Fixer_Price` (`Id`, `IncidentId`, `UserId`, `Price`, `FixDate`, `CreatedDate`, `UpdatedDate`, `AcceptedBy`, `AcceptedDate`, `Status`) VALUES
(1, 1, 1, '700000', '2019-11-20 13:55:13', '2019-11-19 10:15:38', NULL, NULL, NULL, 1),
(2, 1, 1, '700000', '2019-11-20 13:55:13', '2019-11-22 14:18:57', NULL, NULL, NULL, 1),
(4, 5, 32, '200500', '2019-11-29 01:40:00', '2019-11-29 01:40:49', NULL, NULL, NULL, 0),
(5, 23, 32, '680000', '2019-11-29 01:45:00', '2019-11-29 01:45:56', NULL, NULL, NULL, 0),
(6, 46, 32, '50000000', '2019-11-30 07:18:00', '2019-11-29 07:18:22', NULL, NULL, NULL, 0),
(7, 61, 32, '250000', '2019-11-30 18:49:00', '2019-11-30 18:49:12', NULL, NULL, NULL, 0),
(8, 63, 32, '350000', '2019-12-01 01:40:00', '2019-12-01 01:40:59', NULL, NULL, NULL, 0),
(9, 65, 32, '250000', '2019-12-01 11:30:00', '2019-12-01 13:08:10', NULL, NULL, NULL, 0),
(10, 63, 37, '120000', '2019-12-03 11:30:00', '2019-12-01 13:08:10', NULL, NULL, NULL, 0),
(11, 63, 57, '130000', '2019-12-03 11:30:00', '2019-12-01 13:08:10', NULL, NULL, NULL, 0),
(12, 63, 58, '140000', '2019-12-03 11:30:00', '2019-12-01 13:08:10', NULL, NULL, NULL, 0),
(13, 63, 59, '150000', '2019-12-03 11:30:00', '2019-12-01 13:08:10', NULL, NULL, NULL, 0),
(14, 63, 60, '160000', '2019-12-03 11:30:00', '2019-12-01 13:08:10', NULL, NULL, NULL, 0),
(16, 4, 37, '320000', '2019-12-02 23:30:00', '2019-12-01 23:04:57', NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `Groupfixer`
--

CREATE TABLE `Groupfixer` (
  `Id` int(11) NOT NULL,
  `Name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedDate` datetime DEFAULT NULL,
  `IsDeleted` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `House`
--

CREATE TABLE `House` (
  `Id` int(11) NOT NULL,
  `BuildingId` int(11) NOT NULL,
  `ManagerId` int(11) NOT NULL,
  `Name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Note` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Block` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Floor` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedDate` datetime DEFAULT NULL,
  `IsDeleted` tinyint(1) DEFAULT '0',
  `Furniture` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CheckinDate` date DEFAULT NULL,
  `CheckoutDate` date DEFAULT NULL,
  `RentalFee` float DEFAULT NULL,
  `ReadyDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `House`
--

INSERT INTO `House` (`Id`, `BuildingId`, `ManagerId`, `Name`, `Note`, `Code`, `Block`, `Floor`, `Status`, `CreatedBy`, `CreatedDate`, `UpdatedBy`, `UpdatedDate`, `IsDeleted`, `Furniture`, `CheckinDate`, `CheckoutDate`, `RentalFee`, `ReadyDate`) VALUES
(1, 1, 33, 'Nhà số 1', 'anc', 'H1', 'A', '1', 'AC', NULL, '2019-11-01 16:21:04', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(2, 1, 31, 'tes1234', '123', '123', '123', '123123', '23123', NULL, '2019-11-01 16:24:23', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(3, 5, 33, 'First house', NULL, 'FB-01-01', NULL, NULL, NULL, NULL, '2019-11-18 11:06:04', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(4, 5, 33, 'First house', NULL, 'FB-01-01', NULL, NULL, NULL, NULL, '2019-11-18 11:07:03', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(5, 5, 25, 'Second house', NULL, 'FB-02-01', NULL, NULL, NULL, NULL, '2019-11-20 11:17:59', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(6, 6, 33, 'CT2B', NULL, 'CT3B', NULL, NULL, NULL, NULL, '2019-11-21 09:37:11', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(7, 6, 33, 'CT3B-714', NULL, 'A-101', '14', '7', '1', NULL, '2019-11-21 09:39:18', NULL, NULL, 0, NULL, '2020-01-01', '2020-02-28', 2800000, NULL),
(8, 7, 32, 'A-101', NULL, 'A-103', '14', '7', '1', NULL, '2019-11-23 17:29:29', NULL, NULL, 0, NULL, '2019-12-02', '2019-12-02', NULL, '2019-12-02'),
(9, 7, 32, 'A-102', NULL, 'A-102', '15', '7', '1', NULL, '2019-11-23 17:38:32', NULL, NULL, 0, NULL, '2020-01-01', '2020-02-28', NULL, '2019-12-02'),
(10, 7, 32, 'A-102', NULL, 'A-103', '15', '7', '2', NULL, '2019-11-23 17:38:44', NULL, NULL, 0, NULL, '2020-01-01', '2020-02-28', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `HouseNote`
--

CREATE TABLE `HouseNote` (
  `Id` int(11) NOT NULL,
  `HouseId` int(11) NOT NULL,
  `Content` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedDate` datetime DEFAULT NULL,
  `IsDeleted` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `HouseNote`
--

INSERT INTO `HouseNote` (`Id`, `HouseId`, `Content`, `CreatedBy`, `CreatedDate`, `UpdatedBy`, `UpdatedDate`, `IsDeleted`) VALUES
(1, 8, 'Đã dọn phòng lần 3', 32, '2019-11-27 11:15:05', NULL, NULL, 0),
(2, 8, '', 32, '2019-12-01 19:37:48', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `Incident`
--

CREATE TABLE `Incident` (
  `Id` int(11) NOT NULL,
  `Code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `IncidentTypeId` int(11) DEFAULT NULL,
  `HouseId` int(11) DEFAULT NULL,
  `BuildingId` int(11) DEFAULT NULL,
  `Status` int(11) DEFAULT NULL,
  `IncidentArea` int(11) DEFAULT NULL,
  `NeedFixerPrice` float DEFAULT NULL,
  `FixerPriceId` int(11) DEFAULT NULL,
  `Description` text COLLATE utf8mb4_unicode_ci,
  `ContactName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `ContactNumber` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `FixDate` datetime DEFAULT NULL,
  `Images` text COLLATE utf8mb4_unicode_ci,
  `CreatedBy` int(11) DEFAULT NULL,
  `UpdatedBy` int(11) DEFAULT NULL,
  `IsDeleted` tinyint(1) DEFAULT NULL,
  `CreatedDate` datetime NOT NULL,
  `FixedBy` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Incident`
--

INSERT INTO `Incident` (`Id`, `Code`, `IncidentTypeId`, `HouseId`, `BuildingId`, `Status`, `IncidentArea`, `NeedFixerPrice`, `FixerPriceId`, `Description`, `ContactName`, `ContactNumber`, `FixDate`, `Images`, `CreatedBy`, `UpdatedBy`, `IsDeleted`, `CreatedDate`, `FixedBy`) VALUES
(1, 'ADBS-1', 1, 1, 1, 1, 1, 1, 1, 'Điều hòa chảy nước', '', '', '2019-11-20 13:55:13', '/incidents/13255f71-ec2f-4427-b80f-541df3e3d0ae.jpg,/incidents/2f3802ce-6658-47c9-8042-9bb378e8e4fa.jpg', 1, NULL, 0, '2019-11-19 10:14:46', 37),
(2, 'DH0-2', 2, 4, 2, 2, 1, 1, NULL, 'Chập điện cầu thang 2', '', '', NULL, '/incidents/a9381538-6f17-4caf-8735-2d2509fdb5a6.jpg,/incidents/67d436d0-8a58-40b0-96d0-35d1d433164c.jpg', 1, NULL, 0, '2019-11-22 14:19:49', 37),
(3, 'ET-3', 2, 2, 1, 1, 1, 1, NULL, 'Máy Điều Hoà bị hỏng, chập chờn.', '', '', NULL, '', 34, NULL, 1, '2019-11-23 09:09:21', 37),
(4, 'AC-4', 1, 1, 1, 3, 2, 1, NULL, 'Máy Điều Hoà bị hỏng, chập chờn. 2', '', '', NULL, '', 34, NULL, 0, '2019-11-23 09:11:52', 37),
(5, 'AC-5', 2, 1, 1, 3, 1, 1, NULL, 'Máy Điều Hoà bị hỏng, chập chờn.', '', '', NULL, '/incidents/8acddfa6-35cb-44f9-b7d0-ad6b3f8e2d12.png,/incidents/e8ec7ed0-df3c-4e50-91e8-d0198ba54845.png,/incidents/e39d8cda-0318-4a6f-9f2d-ed88b6dc5d2c.png,/incidents/dc2e4b31-4d5b-48f4-893e-c80eab094b04.png,/incidents/f6ab3cb0-5210-442f-905c-743952d3b3fd.png', 34, NULL, 0, '2019-11-23 09:12:58', 37),
(6, 'AC-6', 1, 1, 1, 6, 2, 1, NULL, 'Máy Điều Hoà bị hỏng, chập chờn.', '', '', NULL, '/incidents/8acddfa6-35cb-44f9-b7d0-ad6b3f8e2d12.png,/incidents/e8ec7ed0-df3c-4e50-91e8-d0198ba54845.png,/incidents/e39d8cda-0318-4a6f-9f2d-ed88b6dc5d2c.png,/incidents/dc2e4b31-4d5b-48f4-893e-c80eab094b04.png,/incidents/f6ab3cb0-5210-442f-905c-743952d3b3fd.png', 34, NULL, 0, '2019-11-23 09:12:58', 37),
(7, 'AC-7', 2, 1, 1, 5, 1, 1, NULL, 'Máy Điều Hoà bị hỏng, chập chờn.', '', '', NULL, '/incidents/8acddfa6-35cb-44f9-b7d0-ad6b3f8e2d12.png,/incidents/e8ec7ed0-df3c-4e50-91e8-d0198ba54845.png,/incidents/e39d8cda-0318-4a6f-9f2d-ed88b6dc5d2c.png,/incidents/dc2e4b31-4d5b-48f4-893e-c80eab094b04.png,/incidents/f6ab3cb0-5210-442f-905c-743952d3b3fd.png', 34, NULL, 0, '2019-11-23 09:12:58', 0),
(8, NULL, 1, 1, 1, 1, 2, 1, NULL, 'Máy Điều Hoà bị hỏng, chập chờn.', '', '', NULL, '/incidents/8acddfa6-35cb-44f9-b7d0-ad6b3f8e2d12.png,/incidents/e8ec7ed0-df3c-4e50-91e8-d0198ba54845.png,/incidents/e39d8cda-0318-4a6f-9f2d-ed88b6dc5d2c.png,/incidents/dc2e4b31-4d5b-48f4-893e-c80eab094b04.png,/incidents/f6ab3cb0-5210-442f-905c-743952d3b3fd.png', 34, NULL, 0, '2019-11-23 09:12:58', 0),
(9, 'AC-9', 2, 1, 1, 1, 2, 1, NULL, 'zhbzhzhzjzjzjzj', '', '', NULL, '', 34, NULL, 1, '2019-11-23 11:45:21', 0),
(10, NULL, 1, 1, 1, 1, 1, 0, NULL, 'test su co trong phong', '', '', NULL, '', 34, NULL, 0, '2019-11-23 16:39:24', 0),
(11, NULL, 1, 1, 1, 1, 1, 0, NULL, 'jxjxjxjx', '', '', NULL, '', 34, NULL, 0, '2019-11-23 16:56:33', 0),
(12, NULL, 1, 1, 1, 1, 1, 0, NULL, 'test upload anh', '', '', NULL, '', 34, NULL, 0, '2019-11-23 17:00:59', 0),
(13, NULL, 1, 1, 1, 1, 1, 0, NULL, 'anh anh', '', '', NULL, '', 34, NULL, 0, '2019-11-23 17:06:00', 0),
(14, NULL, 1, 1, 1, 1, 1, 0, NULL, 'test tao su co', '', '', NULL, '', 34, NULL, 0, '2019-11-23 17:38:59', 0),
(15, NULL, 1, 1, 1, 1, 1, 0, NULL, 'bbbbbb', '', '', NULL, '', 34, NULL, 0, '2019-11-23 17:42:17', 0),
(16, 'AC-16', 2, 1, 1, 1, 1, 1, NULL, 'Máy Điều Hoà bị hỏng, chập chờn.', '', '', NULL, '/incidents/911be926-a336-4785-969f-9baa45bb5fe7.jpg', 34, NULL, 0, '2019-11-23 17:44:18', 0),
(17, 'AC-17', 2, 1, 1, 1, 1, 1, NULL, 'Máy Điều Hoà bị hỏng, chập chờn.', '', '', NULL, '/incidents/1d68a0e6-67e7-44c7-8f06-03d0db9b638d.jpg', 34, NULL, 0, '2019-11-23 17:50:06', 0),
(18, 'AC-18', 2, 1, 1, 1, 1, 1, NULL, 'Máy Điều Hoà bị hỏng, chập chờn.', '', '', NULL, '/incidents/2cf591c3-0504-4d24-bde7-d972e59465de.jpg', 34, NULL, 0, '2019-11-23 17:51:32', 0),
(19, NULL, 1, 1, 1, 1, 1, 0, NULL, 'vvvvv', '', '', NULL, '', 34, NULL, 0, '2019-11-23 18:08:46', 0),
(20, NULL, 1, 1, 1, 1, 1, 0, NULL, 'bbbnnn', '', '', NULL, '', 34, NULL, 0, '2019-11-23 18:53:54', 0),
(21, NULL, 1, 1, 1, 1, 1, 0, NULL, 'mmmmmm', '', '', NULL, '/incidents/7cb9c54d-d928-44b6-9aef-978a2a4f56b6.jpg,/incidents/c11e11d7-bdaa-4633-a3e1-d918fcf8da68.jpg', 34, NULL, 0, '2019-11-23 19:05:20', 0),
(22, NULL, 2, 1, 1, 1, 1, 0, NULL, 'tạo sự cố điện', '', '', NULL, '/incidents/bfb1d68e-644d-4b4a-8bb5-c6917a305620.jpg,/incidents/f998ed8b-ddfb-46bc-ac1a-fafd3f149845.jpg', 34, NULL, 0, '2019-11-24 03:44:37', 0),
(23, NULL, 1, 1, 1, 3, 1, 0, NULL, 'test line 1\ntest line 2\ntest line 4', '', '', NULL, '/incidents/ca0198a4-0cd2-4ed9-bb74-c5bf1f2191b4.jpg,/incidents/fe212da7-9832-4cf1-b983-5c37c2cd276a.jpg', 34, NULL, 0, '2019-11-24 04:29:39', 0),
(24, NULL, 2, 1, 1, 1, 1, 1, NULL, 'Máy Điều Hoà bị hỏng, chập chờn.', '', '', NULL, '', 34, NULL, 0, '2019-11-24 07:41:12', 0),
(25, NULL, 1, 1, 1, 1, 1, 0, NULL, 'idhdixbxjxnxxixjxnxj', '', '', NULL, '', 34, NULL, 0, '2019-11-24 07:44:33', 0),
(26, NULL, 1, 1, 6, 1, 1, 0, NULL, 'mmmnnnmnm', '', '', NULL, '', 34, NULL, 0, '2019-11-24 07:47:35', 0),
(27, NULL, 1, 1, 6, 1, 2, 0, NULL, 'hxhxhxhxhxxh', '', '', NULL, '', 34, NULL, 0, '2019-11-24 07:50:23', 0),
(28, NULL, 1, 1, 1, 1, 1, 0, NULL, 'nmnkkjhninnubjj', '', '', NULL, '', 34, NULL, 0, '2019-11-24 07:52:10', 0),
(29, NULL, 1, 1, 1, 1, 1, 0, NULL, 'uvuvuvuvu', '', '', NULL, '', 34, NULL, 0, '2019-11-24 07:57:14', 0),
(30, NULL, 1, 1, 1, 1, 1, 0, NULL, 'test dialog', '', '', NULL, '', 34, NULL, 0, '2019-11-24 08:01:14', 0),
(31, NULL, 1, 1, 1, 1, 1, 0, NULL, 'Chúc mừng sinh nhật Chúc mừng sinh nhật', '', '', NULL, '', 34, NULL, 0, '2019-11-24 08:02:39', 0),
(32, NULL, 2, 1, 1, 1, 1, 0, NULL, 'Chức năng tạo một sự cố của cư dân.', '', '', NULL, '/incidents/8ffbe54d-1bf1-4249-92e7-206a72b78c8b.jpg,/incidents/b2885750-106e-4e01-a4dc-0b54f3a2387e.jpg', 34, NULL, 0, '2019-11-24 09:36:39', 0),
(33, NULL, 2, 1, 1, 1, 2, 0, NULL, 'test tao su co', '', '', NULL, '/incidents/451251d7-18e4-436f-a9e4-64de35231356.jpg,/incidents/d409f1b6-a929-4752-828d-26584592e851.jpg', 34, NULL, 0, '2019-11-24 10:20:33', 0),
(34, NULL, 2, 1, 1, 1, 2, 0, NULL, 'sự cố test', '', '', NULL, '/incidents/3576029c-6dea-418b-bc38-b44136247549.jpg,/incidents/c55b0d5e-837a-4bdf-b535-2c24540d0abc.png,/incidents/e534b199-1721-4b21-a42e-a2c9b59b64d8.png', 34, NULL, 0, '2019-11-24 10:24:02', 0),
(35, NULL, 1, 1, 7, 1, 2, 0, NULL, 'điều hoà hỏng\n', '', '', NULL, '/incidents/b0bbb914-cb03-42c8-ae92-d5b9b5b6be68.jpg,/incidents/938209d5-9393-4a08-80b3-62e14135b110.jpg', 34, NULL, 0, '2019-11-24 14:42:19', 0),
(36, NULL, 1, 8, 7, 1, 1, 1, NULL, 'hahahah', '', '', NULL, '', 32, NULL, 1, '2019-11-25 08:13:22', 0),
(37, NULL, 2, 9, 7, 1, 1, 0, NULL, 'test voi anh', '', '', NULL, '/incidents/80a4dd69-8b56-4068-aa10-48d86b0464aa.jpg', 32, NULL, 0, '2019-11-25 08:14:35', 0),
(38, NULL, 1, 1, 1, 2, 1, 1, NULL, 'sự cố điều hoà', 'Nguyen Trong Viet', '0939884686', NULL, '/incidents/c8612a42-544f-4746-971e-7b06261f1b62.jpg', 34, NULL, 0, '2019-11-25 09:01:22', 0),
(39, NULL, 1, 3, 5, 1, 2, 0, NULL, 'hỏng điều hoà', '', '', NULL, '/incidents/92051da4-208f-4ea8-9d24-01198761cb5a.jpg', 32, NULL, 0, '2019-11-25 09:09:23', 0),
(40, NULL, 2, 1, 1, 1, 2, 1, NULL, 'test sự cố ', '', '', NULL, '/incidents/500bf1a0-42fb-4f6e-8528-fbed34b7170a.jpg,/incidents/5cfa8889-cf77-4811-90a3-64c57079cdc0.jpg,/incidents/e0f2d23c-664d-4b9b-8c29-4b5dc29ec7b0.jpg,/incidents/a4fee6af-b4c6-4f37-b3a4-75ec82b9e577.jpg', 34, NULL, 0, '2019-11-25 10:01:57', 0),
(41, NULL, 2, 1, 1, 1, 1, 1, NULL, 'test sự cố 2', '', '', NULL, '/incidents/c0b23b6d-78ad-40a0-9c86-13d662ef24f6.png', 34, NULL, 0, '2019-11-25 10:03:50', 0),
(42, NULL, 1, 1, 1, 1, 1, 1, NULL, 'ggy', '', '', NULL, '/incidents/d90d777a-3cf1-4ca6-a944-d1939f949a3b.jpg', 32, NULL, 0, '2019-11-25 10:09:03', 0),
(43, NULL, 2, 1, 1, 1, 1, 1, NULL, 'bóng đá Việt Nam', '', '', NULL, '/incidents/b8ab369f-3985-4188-be5d-bc745dbae0b5.jpg', 34, NULL, 0, '2019-11-25 10:39:58', 0),
(44, NULL, 2, 1, 1, 1, 1, 1, NULL, 'test thử', '', '', NULL, '/incidents/d814fa63-af0d-416e-9944-5da13eb99e8b.jpg,/incidents/502b97bd-28c9-4723-9334-6c1c0d89d51e.jpg', 34, NULL, 0, '2019-11-25 10:52:05', 0),
(45, NULL, 1, 1, 1, 1, 1, 1, NULL, 'dgjkk gg', '', '', NULL, '/incidents/d23e3221-5632-44d6-95c1-068766ea83e2.jpg,/incidents/9201357e-de6e-4398-91a8-b505405f7faa.jpg', 32, NULL, 0, '2019-11-25 10:59:44', 0),
(46, NULL, 2, 1, 1, 3, 2, 1, NULL, 'Điện lực khu vực sẽ tiến hành sửa chữa sự cố trong vòng 02 giờ. Tuy nhiên do yêu cầu đặc biệt về đảm bảo an toàn điện, quá trình sửa chữa phải tiến hành theo đúng quy trình thao tác kỹ thuật. Tình hình sự cố cũng như các nguyên nhân gây nên sự cố đường dây điện, thiết bị điện phức tạp và muôn hình vạn trạng. Sau khi nhân viên sửa chữa đến hiện trường căn cứ tình hình cụ thể tìm nguyên nhân mới tiến hành công tác sửa chữa. Có trường hợp phải thay thế thiết bị và huy động nhiều nhân lực để sửa chữa, đảm bảo cấp điện nhanh nhất. Cho nên thời gian sửa chữa có thể kéo dài hơn.', '', '', NULL, '/incidents/363fdb49-6c24-41c2-991e-0947ceef5d3a.jpg,/incidents/b06aed5a-3f88-4ba4-ba2c-09c0e6e6e487.jpg', 34, NULL, 0, '2019-11-26 05:04:51', 0),
(47, 'DD-1000', 2, 8, 7, 1, 2, 0, NULL, 'Điện lực khu vực sẽ tiến hành sửa chữa sự cố trong vòng 02 giờ. Tuy nhiên do yêu cầu đặc biệt về đảm bảo an toàn điện, quá trình sửa chữa phải tiến hành theo đúng quy trình thao tác kỹ thuật. Tình hình sự cố cũng như các nguyên nhân gây nên sự cố đường dây điện, thiết bị điện phức tạp và muôn hình vạn trạng. Sau khi nhân viên sửa chữa đến hiện trường căn cứ tình hình cụ thể tìm nguyên nhân mới tiến hành công tác sửa chữa. Có trường hợp phải thay thế thiết bị và huy động nhiều nhân lực để sửa chữa, đảm bảo cấp điện nhanh nhất. Cho nên thời gian sửa chữa có thể kéo dài hơn.', 'Cư Dân Văn Hóa', '0881122334', NULL, '/incidents/3ccc89be-de85-4240-a95b-fb940fa6bc65.jpg,/incidents/efe4c8c9-ce99-4ed3-84c2-743dc4e3fe0e.jpg', 34, NULL, 1, '2019-11-27 12:27:26', 0),
(48, 'DH-10002', 1, 8, 7, 1, 1, NULL, NULL, 'test tạo sự cố', 'Cư Dân Văn Hóa', '0881122334', NULL, '/incidents/b5529877-644a-45a1-a610-af5fec8d62df.jpg,/incidents/bdae7dcb-1acb-48b0-a0d1-0fd28e33d0ef.jpg', 34, NULL, 0, '2019-11-28 02:53:04', 0),
(49, 'DD-1001', 2, 8, 7, 1, 2, NULL, NULL, 'test tạo sự cố điện', 'Cư Dân Văn Hóa', '0881122334', NULL, '/incidents/554a1f1a-6085-4f97-bb8e-fa7f5adf66ae.jpg', 34, NULL, 0, '2019-11-28 08:09:10', 0),
(50, 'DD-10004', 2, 8, 7, 2, 1, NULL, NULL, 'Điện hành lang bị hỏng, đèn không sáng.', 'Cư Dân Văn Hóa', '0881122334', NULL, '/incidents/502a5ae9-106e-4683-ac4b-d7c7b7bc4d7a.jpg', 34, NULL, 0, '2019-11-28 08:10:41', 0),
(51, 'DH-100056', 1, 8, 7, 1, 1, NULL, NULL, 'tạo sự cố trong phòng của điều hòa', 'Cư Dân Văn Hóa', '0881122334', NULL, '/incidents/1bd61515-5d7f-483b-b242-9f5735772672.jpg', 34, NULL, 0, '2019-11-28 08:13:53', 0),
(52, 'DH-1001', 1, 8, 7, 1, 1, 1, NULL, 'Test tạo sự cố cư dân', 'Cư Dân Văn Hóa', '0881122334', NULL, '/incidents/52ede29a-6264-4a5c-ba13-4aa371203165.jpg', 34, NULL, 0, '2019-11-28 14:31:54', 0),
(53, 'DH-1001', 1, 8, 7, 1, 1, 0, NULL, 'Nhờ quản lý đến kiểm tra', 'Cư Dân Văn Hóa', '0881122334', NULL, '/incidents/65945f4c-8352-475c-a086-8b38e603acc7.jpg,/incidents/56579e93-2b25-4fd4-9c18-3d52a5bebd04.jpg,/incidents/0b4c54e9-ea9e-46c4-a06a-8a41807b28c3.jpg,/incidents/7220c174-71dd-4702-a0eb-efd57de82454.jpg,/incidents/39118f5e-b067-4b42-9517-d48a14476407.jpg', 34, NULL, 0, '2019-11-28 15:24:30', 0),
(54, 'DH-1001', 1, 8, 7, 1, 1, 0, NULL, 'Tạo sự cố 03:57 am', 'Cư Dân Văn Hóa', '0881122334', NULL, '/incidents/2ff5dc87-5de3-4a00-9f4d-47cd31117721.jpg,/incidents/2fc7f7b7-eecc-4c32-b495-d72f02aa2620.jpg,/incidents/38421fd6-5b43-42f9-87a8-d18f3dc0f125.jpg', 34, NULL, 0, '2019-11-28 21:00:32', 0),
(55, 'DH-1001', 1, 8, 7, 1, 1, 0, NULL, 'Sự cố điều hòa nhỏ nước và kêu to', 'Cư Dân Văn Hóa', '0881122334', NULL, '/incidents/2dc77b43-0545-4058-9ad8-9b84745476a9.jpg', 34, NULL, 1, '2019-11-28 21:17:17', 0),
(56, 'DH-1001', 1, 8, 7, 1, 1, 1, NULL, 'Tạo sự cố mẫu', 'Cư Dân Văn Hóa', '0881122334', NULL, '/incidents/6e4b9b24-2950-4c41-ac4a-04a675065943.jpg', 34, NULL, 0, '2019-11-28 22:23:39', 0),
(57, 'DD-1001', 2, 8, 7, 1, 1, 1, NULL, 'Hỏng ổ cắm điện', 'Cư Dân Văn Hóa', '0881122334', NULL, '/incidents/ed67142f-a56e-41a8-963c-9c779c3fd4c9.jpeg', 34, NULL, 0, '2019-11-28 22:25:15', 0),
(58, 'DH-1001', 1, 8, 7, 1, 1, 1, NULL, 'Hỏng nóng điều hòa', 'Cư Dân Văn Hóa', '0881122334', NULL, '/incidents/3618b4fe-6cf7-4019-91da-a1e27babbc7a.png,/incidents/78a62ea7-3645-45e4-9e22-092732118229.jpg', 34, NULL, 0, '2019-11-28 22:26:58', 0),
(59, 'DH-1000', 1, 8, 7, 1, 1, 1, NULL, 'Nóng lạnh lắp sai', 'Cư Dân Văn Hóa', '0881122334', NULL, '/incidents/f27a5dad-0d2f-4b33-9e06-f8da394037da.jpg', 34, NULL, 0, '2019-11-28 22:27:41', 0),
(60, 'DH-10000', 1, 8, 7, 3, 1, 1, NULL, 'Tạo sự cố type mới của quản lý', 'Nguyễn Trọng Việt', '0939884686', NULL, '/incidents/0e6455bb-5f98-48b0-87a1-6376d462d644.jpg', 32, NULL, 1, '2019-11-28 23:13:57', 0),
(61, 'DD-1000', 2, 8, 7, 3, 2, 1, NULL, 'Cần báo giá', 'Cư Dân Văn Hóa', '0881122334', NULL, '/incidents/366dc650-baf4-46bb-bb24-e8f317db0859.jpg', 34, NULL, 0, '2019-11-29 07:10:59', 0),
(62, 'DD-1000', 2, 8, 7, 1, 1, 0, NULL, 'Hỏng điện phòng khách', 'Cư Dân Văn Hóa', '0881122334', NULL, '/incidents/903e9b38-d375-4c27-9ff8-ef440d7c7a31.jpg', 34, NULL, 1, '2019-11-29 07:14:16', 0),
(63, 'DH-10000', 1, 8, 7, 6, 2, 1, 10, 'Sự cố A101 TB01', 'Nguyễn Du ', '0939884686', NULL, '/incidents/bdcb58dd-1f22-4ec3-88df-2e4dd4e86c00.jpeg', 32, NULL, 0, '2019-11-30 13:03:20', 37),
(64, 'DH-10001', 1, 8, 7, 2, 1, 1, NULL, 'Test tao su co', 'Nguyen trong viet', '0939884686', NULL, '/incidents/929e053e-8479-434a-a406-f57dd6365e09.jpeg', 32, NULL, 0, '2019-12-01 09:35:22', NULL),
(65, 'DH-10000', 1, 9, 7, 3, 1, 0, NULL, 'Tao su co khong can bao gia', 'Nguyễn Du', '0939884686', NULL, '/incidents/ba44fdb2-8344-4795-b74e-759a45fad1f7.jpeg', 32, NULL, 0, '2019-12-01 11:38:14', NULL),
(66, 'DH-10001', 1, 10, 7, 2, 1, 0, NULL, 'May dieu hoa khong hoat dong', 'Nguyen Du', '0939884686', NULL, '/incidents/f3f16dd9-e13a-4c3c-8540-0385b65f9ad7.jpg,/incidents/95404224-c580-452f-8599-2b603a7cbdeb.jpg,/incidents/e96fe341-f424-4873-9ea2-0fcfe242b702.jpg', 32, NULL, 0, '2019-12-01 15:28:57', NULL),
(67, 'DD-10000', 2, 8, 7, 2, 1, 0, NULL, 'Test tso su co', 'Nguyen Guide ', '0939884686', NULL, '/incidents/8a9bb0f2-878a-400b-bf32-b586805af846.png,/incidents/2d5f5c06-c13a-40be-af21-4e9bb4c985b0.jpeg', 32, NULL, 0, '2019-12-01 22:08:58', NULL),
(68, 'DD-1000', 2, 8, 7, 1, 2, 0, NULL, 'Hỏng điện', 'Cư Dân1', '0881122334', NULL, '/incidents/1db5e312-2ca1-4f2e-897d-681a718d779f.jpg,/incidents/bae80c0c-dad6-4899-9605-e385577887de.jpg', 34, NULL, 0, '2019-12-02 06:51:15', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Incident_Note`
--

CREATE TABLE `Incident_Note` (
  `id` int(11) NOT NULL,
  `Content` text COLLATE utf8mb4_unicode_ci,
  `IncidentId` int(11) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  `Images` text COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Incident_Note`
--

INSERT INTO `Incident_Note` (`id`, `Content`, `IncidentId`, `UserId`, `Images`, `createdAt`, `updatedAt`) VALUES
(1, 'Chập ổ điện do quá tải, đã kiểm tra, cần thợ sửa chữa', 2, 32, NULL, '2019-11-27 10:00:00', '2019-11-27 00:00:00'),
(2, 'Tôi là thợ và tôi đã kiểm tra', 2, 37, NULL, '2019-11-27 12:00:00', '2019-11-27 00:00:00'),
(3, 'Điều hòa chập chờn, chạy nước mặt lạnh', 1, 32, NULL, '2019-11-25 00:00:00', '2019-11-25 00:00:00'),
(4, 'Đã đến xem và khắc phục', 1, 37, NULL, '2019-11-26 00:00:00', '2019-11-26 00:00:00'),
(5, 'Ghi chú không ảnh', 61, 32, '', '2019-11-30 20:46:03', NULL),
(6, 'Ổ điện đấu nối không an toàn!', 61, 32, '/incidents/notes/9d491015-f288-49d4-8b1f-6c4b08877ab2.jpeg', '2019-11-30 20:47:14', '2019-12-01 03:48:03'),
(7, 'Test thử tạo ghi chú sự kiện 62', 63, 32, '/incidents/notes/32380530-2de7-41b5-8591-c0702b8eb3b4.jpeg', '2019-11-30 21:06:19', NULL),
(8, 'Ghi chú thứ 2', 63, 32, '', '2019-12-01 09:58:58', NULL),
(9, 'Ghi chú có hình ảnh.', 63, 32, '/incidents/notes/58aad90c-959c-4200-af43-ae36917ce8be.jpeg', '2019-12-01 09:59:54', NULL),
(10, 'Ghi chú có nhiều hình ảnh!', 63, 32, '/incidents/notes/0f6419a6-cc7c-40dd-be55-2afbd1be6fea.jpg,/incidents/notes/90e4d38b-a05e-45a5-96f8-b2d94f73d3b5.jpeg,/incidents/notes/a7899f21-97bb-4b1a-8228-6bf117c156e4.png,/incidents/notes/870c8463-67dc-41f1-a210-08fcadd1c3c2.jpg,/incidents/notes/f47625df-a956-466d-b6b5-2b1ea93258ae.jpg', '2019-12-01 10:31:23', NULL),
(11, 'Test tao su co', 63, 32, '', '2019-12-01 11:03:19', NULL),
(12, 'Test tao su co 2', 63, 32, '', '2019-12-01 11:05:23', NULL),
(13, 'Test tao su co 3', 63, 32, '/incidents/notes/7d908649-12e9-4592-9326-6d7f196e921f.jpeg', '2019-12-01 11:06:13', NULL),
(14, 'Test tao su co 4', 63, 32, '/incidents/notes/785623a2-9c09-42be-8a65-3628362313f4.png,/incidents/notes/fae4ee12-8dd5-4795-841d-5c7546b066fc.jpeg', '2019-12-01 11:09:42', NULL),
(15, 'Test tao su co 5', 63, 32, '/incidents/notes/06ce53fa-f5cb-45f9-a8e9-419bf44a0baa.jpg,/incidents/notes/22d1c7f4-c8b8-437b-9c9d-a6619a28efe3.png,/incidents/notes/2bfbd73c-4b73-44b3-bc51-3f2e1fd48904.jpeg', '2019-12-01 11:13:56', NULL),
(16, 'Chú ý kiểm tra lại tất cả các phòng', 65, 32, '/incidents/notes/c7d18f45-5eca-4115-9ddd-a5ca1653402b.jpg,/incidents/notes/bc5fb229-8b4c-4490-8002-38557648d37f.jpg', '2019-12-01 15:16:44', NULL),
(17, 'Test loading cho ghi chu moi', 66, 32, '', '2019-12-01 15:44:04', NULL),
(18, 'Tạo ghi chú mới có hình ảnh!', 66, 32, '/incidents/notes/32fee8dd-6eef-4ef0-8057-fadd6a5b9ed2.jpg,/incidents/notes/ce694610-ab64-4d49-85f1-dfea9c0139cc.png,/incidents/notes/961a19cc-1344-4aa9-bcdf-daf946b0c901.jpg,/incidents/notes/163179fa-3229-4a1c-90ba-c99822083e9c.jpeg,/incidents/notes/42b7ebef-ad09-444e-99ce-8122f3a6bdb1.jpg,/incidents/notes/4dc5d305-6b44-4500-b85b-6aa44f69f74c.jpg,/incidents/notes/469c86b1-e1f5-466a-9cc1-9be84cd01815.jpg,/incidents/notes/aad45c73-3a21-4443-aa64-454b61428a4d.jpg', '2019-12-01 15:45:29', NULL),
(19, 'Nội dung note fixer', 63, 37, '/incidents/notes/396f8ba8-55c9-4433-95e0-bcd029467e5a.jpeg,/incidents/notes/e5c3cfc4-29b9-4c75-9848-3b7363b08300.jpg,/incidents/notes/ae710dff-37e5-45a4-a054-54f2f3cc64bd.jpg', '2019-12-01 23:18:02', NULL),
(20, '', 63, 37, '', '2019-12-01 23:33:50', NULL),
(21, 'Test tạo ghi chú lúc đang sửa', 63, 37, '', '2019-12-01 23:34:46', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Incident_Status`
--

CREATE TABLE `Incident_Status` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `IncidentId` int(11) DEFAULT NULL,
  `CreatedDate` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Incident_Status`
--

INSERT INTO `Incident_Status` (`id`, `Name`, `IncidentId`, `CreatedDate`, `UserId`) VALUES
(1, '1', 1, '2019-11-19 10:14:46', NULL),
(4, '1', 2, '2019-11-22 14:19:49', 1),
(5, '2', 2, '2019-11-23 09:09:21', 34),
(6, '3', 2, '2019-11-23 09:11:52', 34),
(7, '1', 5, '2019-11-23 09:12:58', 34),
(9, '1', 10, '2019-11-23 16:39:24', 34),
(10, '1', 11, '2019-11-23 16:56:33', 34),
(11, '1', 12, '2019-11-23 17:00:59', 34),
(12, '1', 13, '2019-11-23 17:06:00', 34),
(13, '1', 14, '2019-11-23 17:38:59', 34),
(14, '1', 15, '2019-11-23 17:42:17', 34),
(15, '1', 16, '2019-11-23 17:44:18', 34),
(16, '1', 17, '2019-11-23 17:50:06', 34),
(17, '1', 18, '2019-11-23 17:51:32', 34),
(18, '1', 19, '2019-11-23 18:08:46', 34),
(19, '1', 20, '2019-11-23 18:53:54', 34),
(20, '1', 21, '2019-11-23 19:05:20', 34),
(21, '1', 22, '2019-11-24 03:44:37', 34),
(22, '1', 23, '2019-11-24 04:29:39', 34),
(23, '1', 24, '2019-11-24 07:41:12', 34),
(24, '1', 25, '2019-11-24 07:44:33', 34),
(25, '1', 26, '2019-11-24 07:47:35', 34),
(26, '1', 27, '2019-11-24 07:50:23', 34),
(27, '1', 28, '2019-11-24 07:52:10', 34),
(28, '1', 29, '2019-11-24 07:57:14', 34),
(29, '1', 30, '2019-11-24 08:01:14', 34),
(30, '1', 31, '2019-11-24 08:02:39', 34),
(31, '1', 32, '2019-11-24 09:36:39', 34),
(32, '1', 33, '2019-11-24 10:20:33', 34),
(33, '1', 34, '2019-11-24 10:24:02', 34),
(34, '1', 35, '2019-11-24 14:42:19', 34),
(36, '1', 37, '2019-11-25 08:14:35', 32),
(37, '1', 38, '2019-11-25 09:01:22', 34),
(38, '1', 39, '2019-11-25 09:09:23', 32),
(39, '1', 40, '2019-11-25 10:01:57', 34),
(40, '1', 41, '2019-11-25 10:03:50', 34),
(41, '1', 42, '2019-11-25 10:09:03', 32),
(42, '1', 43, '2019-11-25 10:39:58', 34),
(43, '1', 44, '2019-11-25 10:52:05', 34),
(44, '1', 45, '2019-11-25 10:59:44', 32),
(45, '1', 46, '2019-11-26 05:04:51', 34),
(47, '1', 48, '2019-11-28 02:53:04', 34),
(48, '1', 49, '2019-11-28 08:09:10', 34),
(49, '1', 50, '2019-11-28 08:10:41', 34),
(50, '1', 51, '2019-11-28 08:13:53', 34),
(51, '2', 50, '2019-11-28 10:10:10', 34),
(52, '1', 52, '2019-11-28 14:31:54', 34),
(53, '1', 53, '2019-11-28 15:24:30', 34),
(54, '1', 54, '2019-11-28 21:00:32', 34),
(56, '1', 56, '2019-11-28 22:23:39', 34),
(57, '1', 57, '2019-11-28 22:25:15', 34),
(58, '1', 58, '2019-11-28 22:26:58', 34),
(59, '1', 59, '2019-11-28 22:27:41', 34),
(62, '3', 5, '2019-11-29 01:40:49', 32),
(63, '3', 23, '2019-11-29 01:45:56', 32),
(64, '1', 61, '2019-11-29 07:10:59', 34),
(66, '3', 46, '2019-11-29 07:18:22', 32),
(67, '6', 6, '2019-11-30 06:13:05', 37),
(68, '2', 63, '2019-11-30 13:03:20', 32),
(69, '3', 61, '2019-11-30 18:49:12', 32),
(70, '3', 63, '2019-12-01 01:40:59', 32),
(71, '2', 64, '2019-12-01 09:35:22', 32),
(72, '2', 65, '2019-12-01 11:38:14', 32),
(73, '3', 65, '2019-12-01 13:08:11', 32),
(74, '2', 66, '2019-12-01 15:28:57', 32),
(75, '2', 67, '2019-12-01 22:23:50', 32),
(76, '4', 63, '2019-12-01 01:40:59', 32),
(77, '3', 4, '2019-12-01 23:04:57', 37),
(78, '5', 63, '2019-12-01 23:30:26', 37),
(79, '6', 63, '2019-12-01 23:42:18', 37),
(80, '1', 68, '2019-12-02 06:51:16', 34);

-- --------------------------------------------------------

--
-- Table structure for table `Incident_Type`
--

CREATE TABLE `Incident_Type` (
  `Id` int(11) NOT NULL,
  `Code` varchar(191) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedDate` datetime DEFAULT NULL,
  `IsDeleted` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Incident_Type`
--

INSERT INTO `Incident_Type` (`Id`, `Code`, `Name`, `CreatedBy`, `CreatedDate`, `UpdatedBy`, `UpdatedDate`, `IsDeleted`) VALUES
(1, 'DH', 'Sự cố điều hòa', 3, '2019-11-19 08:22:11', 2, '2019-11-17 20:55:13', 0),
(2, 'DD', 'Sự cố điện', 3, '2019-11-22 04:25:17', NULL, '2019-11-22 04:25:17', 0);

-- --------------------------------------------------------

--
-- Table structure for table `News`
--

CREATE TABLE `News` (
  `id` int(11) NOT NULL,
  `Title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Content` text COLLATE utf8_unicode_ci,
  `Image` text COLLATE utf8_unicode_ci,
  `IsDeleted` tinyint(1) DEFAULT '0',
  `CreatedDate` datetime DEFAULT NULL,
  `UpdatedDate` datetime DEFAULT NULL,
  `IsFeatured` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `News`
--

INSERT INTO `News` (`id`, `Title`, `Content`, `Image`, `IsDeleted`, `CreatedDate`, `UpdatedDate`, `IsFeatured`) VALUES
(1, 'Quy trình đăng ký thủ tục làm thẻ thang máy chung cư Charmingtion Lapointe', 'Để đảm bảo anh ninh, kiểm soát được số người ra vào, BQL tòa nhà xin thông báo .......', '/news-img/59341b1b-b197-4d76-bb67-26c169cf027f.png', 0, '2019-11-22 01:59:28', NULL, 0),
(2, 'Thu đậm từ nhà… người khác cho thuê', 'Nhà đầu tư chỉ cần bỏ ra số vốn ban đầu không nhiều, khoảng 100 triệu đồng là có thể bắt đầu việc kinh doanh cho thuê nhà từ nhà thuê của người khác. Nếu khéo léo, người trung gian có thể thu nhập từ vài chục triệu đến cả trăm triệu đồng mỗi tháng. Nhiều năm lăn lộn với việc tìm thuê nhà nguyên căn rồi cho thuê lại, anh Trần Đức Hiếu (ngụ quận Bình Thạnh, TP.HCM) cho biết hình thức đầu tư này đang rất phát triển vì nhu cầu thuê nhà ngày càng tăng.\n\nAnh Hiếu cùng nhóm bạn chuyên đi thuê nhà nguyên căn với giá mềm, sau đó tân trang, tách phòng ra rồi cho thuê lại. “Thuê cả căn với giá 10-15 triệu đồng/tháng, bỏ thêm khoảng 40 triệu đồng sửa sang, chia phòng. Nếu chia được 6-7 phòng, mỗi phòng cho thuê giá 3 triệu đồng thì một tháng tôi thu được 18-21 triệu đồng. Trừ tiền trả cho chủ nhà mỗi tháng tôi kiếm được 8-10 triệu đồng. Chỉ cần 3-4 tháng là lấy lại vốn sửa nhà” - anh Hiếu nói.\n\nTheo tiết lộ của anh Hiếu, anh có vài căn nhà cho thuê lại như vậy, mỗi tháng thu hàng chục triệu đồng. Kinh nghiệm của anh là chọn những căn nhà trong hẻm, nhiều tầng, nhiều phòng và ở gần khu vực có các trường đại học, văn phòng để có lượng khách dồi dào.\n\nChơi lớn hơn, ông Đức Trí đầu tư thuê hẳn những khu nhà lớn với số lượng phòng lên đến 50-60 ở gần trung tâm TP. Giá cho thuê một phòng trung bình 5-6 triệu đồng/tháng/phòng nhỏ và 8-10 triệu đồng/tháng/phòng lớn. Trừ các chi phí và tiền trả chủ nhà, mỗi tháng ông Trí bỏ túi khoảng 300 triệu đồng.\n\nTheo ông, số tiền đầu tư sửa sang, thiết kế lại, trang trí nội thất phải bỏ ra khá lớn nên ông yêu cầu chủ nhà phải ký hợp đồng cho thuê dài hạn, ít nhất trong 10 năm. “Chỉ cần khoảng 2-3 năm là lấy lại vốn, sau đó là thu lời ổn định, thậm chí còn gia tăng vì giá phòng lên từng năm” - ông Trí hồ hởi nói.\n\nÔng Nguyễn Văn Thành, giám đốc một công ty chuyên kinh doanh nhà cho thuê tại TP.HCM, phân tích nếu sở hữu rồi cho thuê thì lợi nhuận chỉ 5%-10% mỗi năm. Thế nhưng thuê nhà rồi cho thuê lại thì lợi nhuận có thể lên đến 50%-100% mỗi năm.\n\nCạnh đó, thị trường cho thuê lại căn hộ cũng khá màu mỡ. Ông Thành bật mí có những căn hộ trung cấp ở quận Tân Bình giá gốc chỉ 15 triệu đồng/tháng, sửa sang một chút đã có thể cho thuê lại 20-25 triệu đồng/tháng. Chỉ cần 10 căn như vậy, mỗi tháng đã lãi được 50 triệu đồng.', '/news-img/2881ea0c-08a4-4f8a-8818-edaabd09e644.jpg', 0, '2019-11-23 02:10:08', NULL, 0),
(3, 'Phát triển nhà cho thuê: Loay hoay vì thiếu vốn, chính sách', 'Nhu cầu rất lớn\n\nMột vòng qua các dự án nhà xã hội có nhà cho thuê tại Hà Nội, PV Tiền Phong được tiếp xúc với khá nhiều người dân đang thuê tại đây. Đơn cử như dự án D15, D16 khu đô thị Đặng Xá (Gia Lâm, Hà Nội) gồm hai tòa nhà 6 tầng với khoảng gần 300 căn hộ. Hay như dự án CT21 Khu đô thị Việt Hưng (Long Biên, Hà Nội) với khoảng hơn 300 căn hộ. Theo khảo sát của phóng viên Tiền Phong, tới đầu tháng 8/2019, các căn hộ này cơ bản được lấp đầy. Thời gian cho thuê của các căn hộ này cũng dao động từ 5 - 7 năm.\n\nChia sẻ với phóng viên Tiền Phong, một người dân đang thuê nhà tại tòa D15, Khu đô thị Đặng Xá (Gia Lâm) cho biết, tính đến tháng 7/2020, thời gian thuê nhà của gia đình bà được 5 năm, đủ điều kiện để mua lại căn hộ. “Ngày trước, tôi ở quận Đống Đa. Nhà tôi thuộc diện di dời để giải phóng mặt bằng, diện tích đất còn lại quá nhỏ nên phải nộp hồ sơ thuê nhà bên này”, bà này nói, đồng thời cho biết, phải hội đủ nhiều điều kiện, chạy đi chạy lại hàng chục lần mới thuê được nhà.\n\n“Ở đây, điều kiện cơ sở vật chất tương đối tốt. Điện nước đầy đủ, hạ tầng ổn định”, Một gia đình người dân khác thuê nhà nói. Nhiều hộ dân cho biết, ban đầu, khi thuê nhà, phải nộp khoảng 15 triệu đồng để “làm tin” với đơn vị cho thuê, tránh trường hợp sửa chữa, gây hư hỏng căn hộ. Sau đó, mỗi tháng, phải nộp tiền thuê trung bình khoảng 30.000 đồng/mét vuông/tháng. Sau thời hạn 5 năm, các hộ dân thuê được ưu tiên nộp tiền mua lại căn hộ đang thuê. “Chúng tôi cũng đang hỏi bên cho thuê nhà về mức giá mua lại căn nhà nhưng chưa có thông tin cụ thể”, một phụ nữ thuê nhà D15 nói.\n\nTheo khảo sát của Tiền Phong, tại tòa CT21 Khu đô thị Việt Hưng (Long Biên), một vài hộ dân đã bắt đầu làm sổ đỏ sở hữu căn hộ sau thời gian hơn 7 năm về sống ở đây. Được biết, Cty TNHH một thành viên Quản lý và Phát triển nhà Hà Nội làm chủ đầu tư dự án. Đây là dự án đầu tiên Hà Nội áp dụng hình thức thuê- mua, phù hợp hoàn cảnh, điều kiện kinh tế của những người có thu nhập thấp. Theo đó, ngoài việc mua với giá rẻ, người mua nhà còn được lựa chọn mua trả dần trong một thời gian theo quy định của thành phố (tối thiểu 5 năm) với lần đầu chỉ phải trả 20% tổng giá trị căn hộ. Khu nhà ở này chính thức được đưa vào hoạt động từ tháng 4/2011 với tổng số 300 căn hộ. Đại diện Ban quản trị tòa nhà cho biết, nhiều hộ đã rục rịch làm sổ đỏ sau khi đã trả hết tiền căn nhà.\n', '/news-img/2d426699-9f6d-45cc-b827-46682e461c26.png', 0, '2019-11-23 02:11:42', NULL, 0),
(4, '"Săn" nhà trong trung tâm cho thuê lại, cách đầu tư "hái ra tiền" của nhà đầu tư nhỏ lẻ tại TP.HCM', 'Thuê rồi cho thuê lại giá cao\n\nKhảo sát nhà cho thuê tại khu vực Q.3, Q.5, Q.10, Q.11 cho thấy hoạt động thuê nhà ở khu vực này rất cao. Hầu hết các căn nhà riêng cho thuê đều nhanh chóng lấp đầy. Thậm chí, có thời điểm giá thuê khá đắt đỏ, tăng giá theo đợt nhưng khách có nhu cầu vẫn khó tìm được chỗ thuê.\n\nNhiều NĐT đã tận dụng thị trường tốtvà lượng khách tiểu thương luôn gia tăng để bỏ vốn vào loại hình này. Hình thức thuê rồi cho thuê lại có xu hướng nở rộ những năm gần đây. Khá nhiều NĐT tìm kiếm các căn nhà riêng trong hẻm, ở những tuyến đường buôn bán sầm uất thuê lại rồi cho tiểu thương thuê với giá cao hơn.\n\nĐa số các căn nhà được giới đầu tư tìm kiếm đã cũ hoặc thuê nguyên căn rồi tận dụng cho tiểu thương thuê lại tầng trệt.\n\nAnh Vũ Văn Hoàng, NĐT sống tại Q.Tân Bình sở hữu căn nhà thuê tại đường Lê Văn Sĩ (Q.3) cách đây 1 năm. Theo anh Sĩ, căn nhà 2 tầng có mặt tiền 4m được anh cho 3 tiểu thương thuê lại để kinh doanh quần áo và bán hàng online. Mỗi tháng anh thu về 55 triệu đồng/tháng.Trong khi căn nhà 2 tầng này anh thuê lại của một chủ nhà đã sang nước ngoài sinh sống với giá 20 triệu đồng/tháng.\n\nTương tự, chị Vũ Thị Hồng Nga, một NĐT cá nhân sống tại Q.Bình Thạnh đang cho thuê căn nhà riêng (đã khá cũ kỹ) tại Q.10 mà chị thuê lại của một người quen cách đây 6 tháng. Do thuê được giá mềm, chỉ 15 triệu đồng/tháng ngay tuyến đường Tô Hiến Thành nên ngay lập tức chị sửa sang lại và cho tiểu thương thuê.', '/news-img/bd4b1cb0-0c5c-4689-97e2-6783a87c5278.jpg', 0, '2019-11-23 02:13:06', NULL, 0),
(5, 'Thay vì bán đất nền chốt lời, nhà đầu tư vùng ven Tp.HCM đang hái ra tiền bằng mánh kinh doanh này', 'Trong đó, hiện đang nổi lên một xu thế phổ biến đó là xây dựng các dãy nhà cho thuê, quy mô từ 10-20 phòng đang nở rộ ở khu vực vùng ven Tp.HCM. \n\nTại khu vực Q.9, Q.2, huyện Bình Chánh, Nhà Bè… đầu tư dãy nhà trọ cho thuê đang được nhiều NĐT ưa chuộng. Với quỹ đất sẵn có, thay vì bán chốt lời, nhiều NĐT chọn cách đầu tư xây nhà trọ khai thác cho thuê lâu dài. Một số NĐT khác thì thuê đất rồi xây dãy nhà trọ nhiều phòng cho thuê lại.\n\nSở hữu 2 dãy nhà trọ từ đầu năm 2016 với tổng số 20 phòng trọ tại P.Trường Thạnh, Q.9, hàng tháng trừ các khoản điện, nước, anh Nguyễn Văn Sang thu về ổn định 35 triệu đồng. Được biết, 2 nền đất này được anh Sang mua từ thời điểm cuối 2014 (chưa sốt đất khu vực Q.9) với giá 900 triệu đồng/150m2 mỗi nền.\n\nThay vì bán lại chốt lời, anh Sang quyết định xây dãy nhà trọ khai thác cho thuê hơn 2 năm nay. Hiện tại, ngoài việc thu về ổn định số tiền cho thuê hàng tháng, 2 nền đất anh Sang sở hữu  hiện đã lên giá ngót ngét gần 5 tỉ đồng/nền. Anh Sang cho hay, với tình hình thuê ổn định như hiện nay khoảng 4 năm nữa anh sẽ lấy lại vốn ban đầu bỏ ra cho 2 nền và tiền xây nhà trọ.\n\nCũng là NĐT lâu năm với phân khúc nhà trọ, chị Nguyễn Thị Hồng Hạnh (ngụ Q.7) hiện đang sở hữu 3 dãy nhà trọ cho thuê cùng khu vực đường Phạm Hùng (huyện Bình Chánh). Hàng tháng chị thu về khoảng 30 triệu đồng (18 phòng/3 dãy).\n\nChị Hạnh cho biết, chi phí vận hành dãy nhà trọ khá đơn giản, không quá cao so với đầu tư các loại hình khác. Đầu năm 2015, chị bỏ ra 1 tỉ đồng mua 2 nền đất tại Bình Chánh với giá mỗi nền 500 triệu đồng/nền/100m2. Sau đó chị tiến hành xây 2 dãy nhà trọ với chi phí là 550 triệu đồng. Tổng chi phí chị đầu tư cho loại hình này khoảng 1.5 tỉ đồng. Hiện tại, hàng tháng chị thu về 30 triệu đồng, nghĩa là khoảng hơn 4 năm chị Hạnh có thể hoàn vốn ban đầu bỏ ra, trong khi 2 nền đất chị sở hữu vẫn tăng giá theo thời gian.', '/news-img/db6769e7-b1ed-4f0e-b780-c935233204d1.jpg', 0, '2019-11-23 02:14:38', NULL, 0),
(6, 'Lãi đậm từ thuê nhà để cho thuê lại', 'Vợ chồng anh Thuận (ngụ quận Bình Thạnh, TP HCM) đầu tư gần 300 triệu đồng sửa chữa nâng cấp 2 căn nhà và 1 chung cư rồi cho thuê lại, mỗi tháng thu về ít nhất 50-55 triệu đồng tiền lãi.\n\nAnh Nguyên, người khá thành công trong việc thuê nhà và cho thuê lại ở TP HCM đầu tư hơn 3 tỉ đồng vào 2 khu nhà cho thuê gồm 60 phòng (diện tích 4 x 20 m2 và 8 x 20 m2) trên đường Nguyễn Thái Bình, quận 1. Với giá thuê trung bình 7-8 triệu đồng/phòng/tháng cho khu bình dân, 14-16 triệu đồng/phòng/tháng cho khu cao cấp, mỗi tháng anh bỏ túi khoảng 500 triệu đồng tiền lãi. Đối tượng khách hàng thuê nhà của anh Nguyên chủ yếu là khách đi công tác, khách du lịch nước ngoài hoặc thuê theo tháng, ngày. Nhà cho thuê thiết kế sang trọng, đầy đủ tiện nghi như khách sạn và có khu vực nấu ăn riêng. "Các khu nhà này phải đầu tư cao nên tôi phải ký hợp đồng 10 năm với chủ nhà. Chỉ cần 3 năm đầu tôi đã lấy lại vốn, 7 năm còn lại thu lợi nhuận ổn định. Nếu tỉ lệ lấp đầy phòng thuê đạt 80%-90% thì tỉ suất sinh lời khoảng 20%/tháng, tỉ lệ này thấp hơn thì sinh lời ít hơn" - anh Nguyên chia sẻ.', '/news-img/7ed6d195-c5f8-4b1e-bd65-2e55db092bd0.jpg', 0, '2019-11-23 02:16:24', NULL, 0),
(7, 'Ngôi nhà ống 7 tầng sâu hun hút ở TP. HCM đẹp ấn tượng trên tạp chí kiến trúc của Mỹ', 'Trên mảnh đất 111,8m2 (4,3m x 26m), ngôi nhà được thiết kế 7 tầng với 3 tầng bên dưới chủ nhà cho thuê và 4 tầng bên trên dùng để ở và sinh hoạt cho gia đình 4 người. Công trình độc đáo này đã được tờ Tạp chính kiến trúc Archdaily giới thiệu đến đông đảo độc giả trên thế giới.\n\nNgôi nhà được thiết kế đơn giản nhưng đầy cảm hứng, cởi mở nhưng riêng tư và đặc biệt là có thể tận dụng được tối đa nguồn ánh sáng tự nhiên chiếu sáng khắp ngôi nhà.\n\nĐiểm ấn tượng đặc biệt của ngôi nhà này là sở hữu mặt tiền vô cùng khác lạ và độc đáo. Những khoảng trống được thiết kế đan xen nhau luôn bảo đảm độ thông gió và ánh sáng cho không gian. Bên cạnh đó những bức tường gạch thông gió như những chiếc chong chóng đang quay còn mang lại giá trị thẩm mỹ cũng như tạo bức tường cách nhiệt cho ngôi nhà.', '/news-img/dac811b3-df94-44d8-a234-ef7be257a1d5.jpg', 0, '2019-11-23 02:18:07', NULL, 0),
(8, 'Chọn nhà thuê cho nữ độc thân: Phần 1 - Chị em có thu nhập cao, không muốn kết hôn', 'Theo kiến trúc sư Phan Công Hậu, giám đốc một công ty thiết kế kiến trúc và nội thất tại Hà Nội, dựa trên thực tế nhu cầu thuê nhà của đối tượng nữ độc thân, có thể chia khách hàng nữ thành 3 kiểu:\n\n- Thứ nhất, nữ độc thân đã có công việc ổn định, thu nhập cao, không có ý định kết hôn\n\n- Thứ hai, các nàng độc thân chưa kết hôn, thu nhập trung bình khá\n\n- Thứ ba, các bà mẹ đơn thân nuôi con nhỏ.\n\nNhà đẹp xin được chia sẻ những thông tin hữu ích về nhu cầu thuê nhà, thiết kế căn hộ phù hợp với người độc thân để chị em cùng tham khảo và đưa ra lựa chọn hợp lý nhất khi quyết định thuê một căn nhà gắn bó dài lâu.\n\nTrong phần đầu tiên, chúng ta sẽ cùng "mổ xẻ" nhu cầu thuê nhà của chị em độc thân đã có công việc ổn định, thu nhập cao, vì nhiều lý do mà họ lựa chọn không kết hôn.', '/news-img/6d383006-5416-49b3-a16d-c9d8347dcbef.jpg', 0, '2019-11-23 02:19:55', NULL, 0),
(9, 'Chủ nhà trọ trên Airbnb vừa bị phạt 5.000 USD vì từ chối một vị khách chỉ vì cô ấy là người châu Á', 'Vào tháng 2/2017, Tami Barker - một chủ nhà trọ cho thuê trên Airbnb đã đột ngột hủy phòng của Dyne Suh – người đã phải lái xe qua một cơn bão tuyết để tới căn nhà mang tên Big Bear tại California của Barker để ở cùng bạn và 2 chú chó của mình.\n\nTheo Trung tâm Nhà ở và việc làm công bằng Mỹ (DFEH), Barker đã gửi tới Suh một tin nhắn với nội dung: “Tôi sẽ không cho chị thuê nhà kể cả chị là người cuối cùng trên Trái Đất đi chăng nữa. Đơn giản thôi vì chị là người châu Á”.\n\nBarker nói rằng “không cho phép bất kỳ người ngoại quốc nào nói tôi phải làm gì” và phủ nhận việc đồng ý cho Suh tới thuê phòng cùng bạn bè và cún cưng mặc dù phía Suh thậm chí còn đưa ra được bằng chứng là ảnh chụp màn hình điện thoại tin nhắn đồng ý cho thuê phòng ngay từ đầu của Barker. Tami Barker hiện tạm thời bị cấm hoạt động trên Airbnb.\n\nTheo công bố của DFEH, ngoài khoản tiền phạt 5.000 USD, Barker còn phải đồng ý tham gia vào một khóa nghiên cứu về người Mỹ và người châu Á; Gửi lời xin lỗi cá nhân tới Sub; Tuân thủ tuyệt đối luật chống phân biệt chủng tộc; Làm tình nguyện tại một tổ chức bảo vệ quyền công dân và báo cáo dữ liệu cho thuê phòng trong 4 năm.\n\nTại California, tội phạm phân biệt chủng tộc thường bị phạt tối thiểu 4.000 USD.', '/news-img/4ff25448-71a7-41db-a86e-b1ace4da3cf5.jpg', 0, '2019-11-23 02:21:50', NULL, 0),
(10, 'Dễ dàng được tặng nhà miễn phí hoặc mua với giá siêu rẻ tại Nhật Bản do dân số già hoá quá nhanh', 'Trong khi hầu hết các thị trưởng bất động sản trên thế giới đều sôi động thì tại Nhật Bản, ngày càng nhiều ngôi nhà cho thuê hoặc rao bán giá rẻ. Nguyên nhân là dân số lão hóa nhanh khiến ngày càng nhiều ngôi làng cũng như ngôi nhà tại Nhật còn trống.\n\n"Nhật Bản sẽ phải đối mặt với những ảnh hưởng trái chiều về kinh tế lẫn xã hội từ xu thế lão hóa dân số trong vòng 30 năm tới", chuyên gia kinh tế trưởng Rajiv Biswas của HIS Markit nói.\n\nNhững ngôi nhà bỏ hoang của nền kinh tế lớn thứ 3 thế giới là một trong những ảnh hưởng của sự già hóa dân số tại Nhật. Trong khi đó, tình trạng ngày càng nhiều căn hộ được rao bán giá rẻ, thậm chí miễn phí được đăng lên những trang trực tuyến như Akiya Banks.\n\nRất nhiều website tương tự đã được chính quyền địa phương xây dựng nhằm quản lý tốt hơn nguồn cung cầu của những căn nhà bỏ trống trong khu vực của họ.\n\nMột số trường hợp, người mua nhà chỉ phải trả tiền thuế và phí môi giới để được nhận nhà hoàn toàn miễn phí.\n\n"Đây là điều khá bình thường khi chủ căn hộ không thể chăm sóc ngôi nhà nữa cũng như không muốn phải trả tiền thuế cho tài sản mà họ không còn sử dụng", báo cáo của hãng bất động sản Rethink Tokyo viết.', '/news-img/236eac20-b7c2-4089-b6d7-a9951920fd3e.jpg', 0, '2019-11-23 04:44:30', NULL, 0),
(11, 'Nên xây nhà trên đất có sẵn hay đi mua nhà?', 'Vợ chồng tôi hiện có mảnh đất 200m2 hơi xa trung tâm thành phố và số tiền mặt khoảng 1,2 tỷ.\n\nTôi bảo chồng nên mua một căn nhà ở xa nhưng vừa tiền để ở trước. Chúng tôi có thể vay thêm vài trăm triệu để mua nhà. Như vậy, sau này chúng tôi vừa có nhà để ở, vừa có đất để dành.\n\nTuy nhiên, chồng tôi lại muốn bán hết đất đi, được khoảng 5 tỷ, cộng thêm 1,2 tỷ tiền tiết kiệm để mua nhà mặt tiền cho thuê (nhà mặt tiền đường nhỏ tầm 7 tỷ). Hoặc anh sẽ dùng hết số tiền đang có để xây nhà trên mảnh đất 200m2. \n\nTôi nghĩ nếu xây nhà thì chúng tôi sẽ không có thu nhập và tài sản để dành. Theo anh chị, chúng tôi nên chọn phương án nào ạ? Xin chân thành cảm ơn.', '/news-img/219e3412-0286-4a84-a553-95bf6ce73f23.png', 0, '2019-11-23 05:01:36', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Permission`
--

CREATE TABLE `Permission` (
  `Id` int(11) NOT NULL,
  `Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Type` int(11) NOT NULL,
  `Method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Resource` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedDate` datetime DEFAULT NULL,
  `IsDeleted` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Permission`
--

INSERT INTO `Permission` (`Id`, `Name`, `Type`, `Method`, `Resource`, `CreatedBy`, `CreatedDate`, `UpdatedBy`, `UpdatedDate`, `IsDeleted`) VALUES
(1, 'Thêm tài khoản', 1, 'add_user', 'add_user', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(2, 'Sửa tài khoản', 1, 'update_user', 'update_user', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(3, 'Xem tài khoản', 1, 'view_user', 'view_user', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(4, 'Xóa tài khoản', 1, 'delete_user', 'delete_user', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(5, 'Thêm quyền', 1, 'add_role', 'add_role', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(6, 'Sửa quyền', 1, 'update_role', 'update_role', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(7, 'Xem quyền', 1, 'view_role', 'view_role', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(8, 'Xóa quyền', 1, 'delete_role', 'delete_role', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(9, 'Thêm nhà', 1, 'add_house', 'add_house', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(10, 'Sửa nhà', 1, 'update_house', 'update_house', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(11, 'Xem nhà', 1, 'view_house', 'view_house', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(12, 'Xóa nhà', 1, 'delete_house', 'delete_house', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(13, 'Thêm chung cư', 1, 'add_building', 'add_building', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(14, 'Sửa chung cư', 1, 'update_building', 'update_building', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(15, 'Xem chung cư', 1, 'view_building', 'view_building', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(16, 'Xóa chung cư', 1, 'delete_building', 'delete_building', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(17, 'Thêm sự cố', 1, 'add_incident', 'add_incident', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(18, 'Sửa sự cố', 1, 'update_incident', 'update_incident', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(19, 'Xem sự cố', 1, 'view_incident', 'view_incident', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(20, 'Xóa sự cố', 1, 'delete_incident', 'delete_incident', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(21, 'Thêm tài khoản', 2, 'add_user', 'add_user', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(22, 'Sửa tài khoản', 2, 'update_user', 'update_user', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(23, 'Xem tài khoản', 2, 'view_user', 'view_user', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(24, 'Xóa tài khoản', 2, 'delete_user', 'delete_user', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(25, 'Thêm quyền', 2, 'add_role', 'add_role', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(26, 'Sửa quyền', 2, 'update_role', 'update_role', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(27, 'Xem quyền', 2, 'view_role', 'view_role', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(28, 'Xóa quyền', 2, 'delete_role', 'delete_role', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(29, 'Thêm nhà', 2, 'add_house', 'add_house', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(30, 'Sửa nhà', 2, 'update_house', 'update_house', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(31, 'Xem nhà', 2, 'view_house', 'view_house', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(32, 'Xóa nhà', 2, 'delete_house', 'delete_house', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(33, 'Thêm chung cư', 2, 'add_building', 'add_building', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(34, 'Sửa chung cư', 2, 'update_building', 'update_building', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(35, 'Xem chung cư', 2, 'view_building', 'view_building', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(36, 'Xóa chung cư', 2, 'delete_building', 'delete_building', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(37, 'Thêm sự cố', 2, 'add_incident', 'add_incident', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(38, 'Sửa sự cố', 2, 'update_incident', 'update_incident', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(39, 'Xem sự cố', 2, 'view_incident', 'view_incident', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(40, 'Xóa sự cố', 2, 'delete_incident', 'delete_incident', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(41, 'Thêm tài khoản', 3, 'add_user', 'add_user', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(42, 'Sửa tài khoản', 3, 'update_user', 'update_user', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(43, 'Xem tài khoản', 3, 'view_user', 'view_user', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(44, 'Xóa tài khoản', 3, 'delete_user', 'delete_user', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(45, 'Thêm quyền', 3, 'add_role', 'add_role', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(46, 'Sửa quyền', 3, 'update_role', 'update_role', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(47, 'Xem quyền', 3, 'view_role', 'view_role', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(48, 'Xóa quyền', 3, 'delete_role', 'delete_role', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(49, 'Thêm nhà', 3, 'add_house', 'add_house', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(50, 'Sửa nhà', 3, 'update_house', 'update_house', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(51, 'Xem nhà', 3, 'view_house', 'view_house', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(52, 'Xóa nhà', 3, 'delete_house', 'delete_house', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(53, 'Thêm chung cư', 3, 'add_building', 'add_building', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(54, 'Sửa chung cư', 3, 'update_building', 'update_building', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(55, 'Xem chung cư', 3, 'view_building', 'view_building', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(56, 'Xóa chung cư', 3, 'delete_building', 'delete_building', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(57, 'Thêm sự cố', 3, 'add_incident', 'add_incident', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(58, 'Sửa sự cố', 3, 'update_incident', 'update_incident', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(59, 'Xem sự cố', 3, 'view_incident', 'view_incident', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(60, 'Xóa sự cố', 3, 'delete_incident', 'delete_incident', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(61, 'Thêm tài khoản', 4, 'add_user', 'add_user', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(62, 'Sửa tài khoản', 4, 'update_user', 'update_user', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(63, 'Xem tài khoản', 4, 'view_user', 'view_user', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(64, 'Xóa tài khoản', 4, 'delete_user', 'delete_user', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(65, 'Thêm quyền', 4, 'add_role', 'add_role', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(66, 'Sửa quyền', 4, 'update_role', 'update_role', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(67, 'Xem quyền', 4, 'view_role', 'view_role', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(68, 'Xóa quyền', 4, 'delete_role', 'delete_role', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(69, 'Thêm nhà', 4, 'add_house', 'add_house', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(70, 'Sửa nhà', 4, 'update_house', 'update_house', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(71, 'Xem nhà', 4, 'view_house', 'view_house', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(72, 'Xóa nhà', 4, 'delete_house', 'delete_house', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(73, 'Thêm chung cư', 4, 'add_building', 'add_building', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(74, 'Sửa chung cư', 4, 'update_building', 'update_building', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(75, 'Xem chung cư', 4, 'view_building', 'view_building', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(76, 'Xóa chung cư', 4, 'delete_building', 'delete_building', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(77, 'Thêm sự cố', 4, 'add_incident', 'add_incident', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(78, 'Sửa sự cố', 4, 'update_incident', 'update_incident', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(79, 'Xem sự cố', 4, 'view_incident', 'view_incident', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(80, 'Xóa sự cố', 4, 'delete_incident', 'delete_incident', NULL, '2019-11-01 16:18:55', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `Role`
--

CREATE TABLE `Role` (
  `Id` int(11) NOT NULL,
  `Name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedDate` datetime DEFAULT NULL,
  `IsDeleted` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Role`
--

INSERT INTO `Role` (`Id`, `Name`, `Type`, `Description`, `CreatedBy`, `CreatedDate`, `UpdatedBy`, `UpdatedDate`, `IsDeleted`) VALUES
(1, 'Admin', '1', '', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(2, 'Admin phó ', '2', '', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(3, 'Owner', '1', '', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(4, 'Resident ', '4', '', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(5, 'Manager', '2', '', NULL, '2019-11-01 16:18:55', NULL, NULL, 0),
(6, 'day la test', '1', 'day la tét', NULL, '2019-11-01 16:35:56', NULL, NULL, 1),
(7, 'Thợ sữa chữa', '3', '', NULL, '2019-11-09 07:50:26', NULL, NULL, 0),
(8, 'Quản Lý', '1', '', NULL, '2019-11-11 06:25:11', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `Role_Permission`
--

CREATE TABLE `Role_Permission` (
  `Id` int(11) NOT NULL,
  `RoleId` int(11) NOT NULL,
  `PermissionId` int(11) NOT NULL,
  `IsActive` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Role_Permission`
--

INSERT INTO `Role_Permission` (`Id`, `RoleId`, `PermissionId`, `IsActive`) VALUES
(1, 1, 1, 1),
(2, 1, 2, 1),
(3, 1, 3, 1),
(4, 1, 4, 1),
(5, 1, 5, 1),
(6, 1, 6, 1),
(7, 1, 7, 1),
(8, 1, 8, 1),
(9, 1, 9, 1),
(10, 1, 10, 1),
(11, 1, 11, 1),
(12, 1, 12, 1),
(13, 1, 13, 1),
(14, 1, 14, 1),
(15, 1, 15, 1),
(16, 1, 16, 1),
(17, 1, 17, 1),
(18, 1, 18, 1),
(19, 1, 19, 1),
(20, 1, 20, 1),
(21, 6, 1, 1),
(22, 6, 2, 1),
(23, 6, 3, 1),
(24, 6, 4, 1),
(25, 6, 5, 0),
(26, 6, 6, 0),
(27, 6, 7, 0),
(28, 6, 8, 0),
(29, 6, 9, 0),
(30, 6, 10, 0),
(31, 6, 11, 0),
(32, 6, 12, 0),
(33, 6, 13, 0),
(34, 6, 14, 0),
(35, 6, 15, 0),
(36, 6, 16, 0),
(37, 6, 17, 0),
(38, 6, 18, 0),
(39, 6, 19, 0),
(40, 6, 20, 0),
(41, 7, 41, 1),
(42, 7, 42, 1),
(43, 7, 43, 1),
(44, 7, 44, 1),
(45, 7, 45, 1),
(46, 7, 46, 1),
(47, 7, 47, 1),
(48, 7, 48, 0),
(49, 7, 49, 0),
(50, 7, 50, 1),
(51, 7, 51, 1),
(52, 7, 52, 0),
(53, 7, 53, 0),
(54, 7, 54, 1),
(55, 7, 55, 1),
(56, 7, 56, 0),
(57, 7, 57, 1),
(58, 7, 58, 1),
(59, 7, 59, 1),
(60, 7, 60, 0),
(61, 8, 1, 0),
(62, 8, 2, 0),
(63, 8, 3, 0),
(64, 8, 4, 1),
(65, 8, 5, 1),
(66, 8, 6, 0),
(67, 8, 7, 0),
(68, 8, 8, 1),
(69, 8, 9, 0),
(70, 8, 10, 0),
(71, 8, 11, 0),
(72, 8, 12, 0),
(73, 8, 13, 0),
(74, 8, 14, 0),
(75, 8, 15, 0),
(76, 8, 16, 0),
(77, 8, 17, 0),
(78, 8, 18, 0),
(79, 8, 19, 0),
(80, 8, 20, 0);

-- --------------------------------------------------------

--
-- Table structure for table `Room`
--

CREATE TABLE `Room` (
  `Id` int(11) NOT NULL,
  `HouseId` int(11) NOT NULL,
  `Name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PeopleNumber` int(11) DEFAULT NULL,
  `Status` float DEFAULT NULL,
  `Funiture` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ReadyDate` date DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedDate` datetime DEFAULT NULL,
  `IsDeleted` tinyint(1) DEFAULT '0',
  `CheckinDate` date DEFAULT NULL,
  `CheckoutDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Room`
--

INSERT INTO `Room` (`Id`, `HouseId`, `Name`, `Code`, `PeopleNumber`, `Status`, `Funiture`, `ReadyDate`, `CreatedBy`, `CreatedDate`, `UpdatedBy`, `UpdatedDate`, `IsDeleted`, `CheckinDate`, `CheckoutDate`) VALUES
(1, 5, 'First room', 'FR-01', 2, NULL, NULL, NULL, NULL, '2019-11-20 11:18:29', NULL, NULL, 0, NULL, NULL),
(2, 7, 'Room 1', 'R1', NULL, NULL, NULL, NULL, NULL, '2019-11-21 09:39:35', NULL, NULL, 0, NULL, NULL),
(3, 7, 'Room 2', 'R2', NULL, NULL, NULL, NULL, NULL, '2019-11-21 09:39:42', NULL, NULL, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('00000-fix-db-charset.js'),
('20191027104032-create-user.js'),
('20191027104414-create-token.js'),
('20191027104650-create-room.js'),
('20191027105104-create-role.js'),
('20191027105301-create-permission.js'),
('20191027105417-create-house.js'),
('20191027105556-create-evaluate.js'),
('20191027105708-create-building.js'),
('20191027111049-create-role-permission.js'),
('20191115040144-fixer-group.js'),
('20191115040144-group-fixer.js'),
('20191115042245-alter-users.js'),
('20191115042255-alter-incident.js'),
('20191115042277-alter-fixer-price.js'),
('20191115042278-alter-news.js'),
('20191115042345-alter-building.js'),
('20191115042745-alter-users-2.js'),
('20191115044562-alter-incident-status.js'),
('20191118070113-create-incident-type.js'),
('20191118071340-create-incident.js'),
('20191118071342-alter-incident.js'),
('20191118071343-alter-incident.js'),
('20191118075324-add-constraints-for-house-and-room.js'),
('20191118094451-create-incident-status.js'),
('20191118095451-alter-incident-status.js'),
('20191119022807-create-fixer-price.js'),
('20191119022817-alter-fixer-price.js'),
('20191119082743-create-contract.js'),
('20191120065912-create-news.js'),
('20191120066912-alter-news.js'),
('20191120082421-create-add-constrant-for-resident.js'),
('20191121070540-add-bank-account-for-user.js'),
('20191121092229-add-billdaterange-in-contract.js'),
('20191121100929-modify-datatype-of-tenants.js'),
('20191122034047-add-apartmentId-to-contract.js'),
('20191122041547-create-apartment-status.js'),
('20191122041952-create-apartment-status-history.js'),
('20191122084800-create-incident-note.js'),
('20191122105238-add-checkin-and-checkout-date-in-house.js'),
('20191122125928-add-rental-fee-to-house.js'),
('20191122163056-add-readydate-in-house.js'),
('20191122194800-create-stay-record.js'),
('20191123074038-create-user-house.js'),
('20191123142342-alter-tenant-info.js'),
('20191123144951-create-vehicles.js'),
('20191123164557-alter-apartment-status.js'),
('20191123302957-alter-apartment-status-type.js'),
('20191126063027-change-furniture-to-string.js'),
('20191126091406-alter-contract.js'),
('20191126111806-create-user-feed-back.js'),
('20191127043455-create-house-note.js'),
('20191127052237-create-vehicle-note.js'),
('20191127060402-create-user-note.js'),
('20191128075324-add-constraints-for-house-and-room.js'),
('20191128075335-alter-table-feedback.js'),
('20191130091159-create-service-rating.js'),
('20191130091510-create-staff-rating.js'),
('20191130091730-create-app-rating.js'),
('20191130234333-remove-owner-id-foreign-key.js'),
('20191130235556-alter-vehicle-owner.js');

-- --------------------------------------------------------

--
-- Table structure for table `ServiceRating`
--

CREATE TABLE `ServiceRating` (
  `Id` int(11) NOT NULL,
  `LifeTimeRating` int(11) DEFAULT NULL,
  `Fortune` int(11) DEFAULT NULL,
  `Parking` int(11) DEFAULT NULL,
  `Invironment` int(11) DEFAULT NULL,
  `Feedback` varchar(255) DEFAULT NULL,
  `GoodPoint` varchar(255) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  `CreatedDate` datetime NOT NULL,
  `UpdatedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ServiceRating`
--

INSERT INTO `ServiceRating` (`Id`, `LifeTimeRating`, `Fortune`, `Parking`, `Invironment`, `Feedback`, `GoodPoint`, `UserId`, `CreatedDate`, `UpdatedDate`) VALUES
(1, 4, 5, 5, 4, 'Hành lang cần được vệ sinh thường xuyên hơn', 'Thoáng mát, an ninh khá tốt', 31, '2019-11-30 11:17:11', '2019-11-30 11:17:11');

-- --------------------------------------------------------

--
-- Table structure for table `StaffRating`
--

CREATE TABLE `StaffRating` (
  `Id` int(11) NOT NULL,
  `LifeSkill` int(11) DEFAULT NULL,
  `WorkingSkill` int(11) DEFAULT NULL,
  `Feedback` varchar(255) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  `CreatedDate` datetime NOT NULL,
  `UpdatedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `StaffRating`
--

INSERT INTO `StaffRating` (`Id`, `LifeSkill`, `WorkingSkill`, `Feedback`, `UserId`, `CreatedDate`, `UpdatedDate`) VALUES
(1, 4, 5, 'Cần tuyển thêm nhân viên nữ xinh hơn', 32, '2019-11-30 11:18:21', '2019-11-30 11:18:21');

-- --------------------------------------------------------

--
-- Table structure for table `StayRecord`
--

CREATE TABLE `StayRecord` (
  `Id` int(11) NOT NULL,
  `TenantId` int(11) NOT NULL,
  `HouseId` int(11) NOT NULL,
  `ActualCheckinDate` date DEFAULT NULL,
  `ActualCheckoutDate` date DEFAULT NULL,
  `StayRegistration` tinyint(1) DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedDate` datetime DEFAULT NULL,
  `IsDeleted` tinyint(1) DEFAULT '0',
  `Active` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `StayRecord`
--

INSERT INTO `StayRecord` (`Id`, `TenantId`, `HouseId`, `ActualCheckinDate`, `ActualCheckoutDate`, `StayRegistration`, `CreatedBy`, `CreatedDate`, `UpdatedBy`, `UpdatedDate`, `IsDeleted`, `Active`) VALUES
(1, 2, 2, '2019-01-10', NULL, 1, NULL, '2019-11-23 18:10:45', NULL, NULL, 0, 1),
(2, 34, 8, '2019-01-10', '2019-12-10', 1, NULL, '2019-11-23 18:11:04', NULL, NULL, 1, 1),
(3, 33, 8, '2019-01-10', '2019-12-02', 1, NULL, '2019-11-23 18:11:11', NULL, NULL, 1, 1),
(4, 1, 8, '2019-11-24', '2019-11-24', NULL, NULL, '2019-11-24 13:22:52', NULL, NULL, 0, 0),
(5, 36, 8, '2019-11-01', '2020-11-01', 0, NULL, '2019-11-24 16:58:04', NULL, NULL, 0, 0),
(6, 53, 2, '2019-11-01', '2019-12-01', 1, NULL, '2019-12-01 04:12:40', NULL, NULL, 0, 1),
(7, 54, 2, '2019-11-01', '2019-12-30', 1, NULL, '2019-12-01 04:14:08', NULL, NULL, 0, 1),
(8, 55, 8, '2019-11-01', '2019-12-02', 1, NULL, '2019-12-01 04:15:24', NULL, NULL, 1, 1),
(9, 4, 2, '2019-12-01', NULL, NULL, NULL, '2019-12-01 09:16:00', NULL, NULL, 0, 1),
(10, 56, 8, '2019-12-03', '2019-12-21', 1, NULL, '2019-12-01 17:42:10', NULL, NULL, 0, 1),
(11, 34, 8, '2019-12-02', NULL, NULL, NULL, '2019-12-02 03:43:04', NULL, NULL, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Token`
--

CREATE TABLE `Token` (
  `Id` int(11) NOT NULL,
  `Token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedDate` datetime DEFAULT NULL,
  `IsDeleted` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Token`
--

INSERT INTO `Token` (`Id`, `Token`, `CreatedBy`, `CreatedDate`, `UpdatedBy`, `UpdatedDate`, `IsDeleted`) VALUES
(2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IklkIjoyfSwiaWF0IjoxNTcyNjI4OTE4LCJleHAiOjE2MDQxNjQ5MTh9.1syr1tdg5E_3bEKSt6sBAYgJSnRsoVu05hAGx83987w', 2, '2019-11-01 17:21:58', NULL, NULL, 0),
(3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IklkIjozfSwiaWF0IjoxNTczNDQ0Nzg1LCJleHAiOjE2MDQ5ODA3ODV9.lSkhgqEBp-Cg22ngART4kmNzE3yM5CoufWbJhkLXmWU', 3, '2019-11-01 17:23:09', NULL, NULL, 0),
(4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IklkIjo4fSwiaWF0IjoxNTcyOTY0ODMwLCJleHAiOjE2MDQ1MDA4MzB9.ll6sIuOYIYdhf7zwvOzO0P12e02WEW5SSlKIGRYiHQM', 8, '2019-11-05 14:40:30', NULL, NULL, 0),
(5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IklkIjoxM30sImlhdCI6MTU3Mjk2Njc3NywiZXhwIjoxNjA0NTAyNzc3fQ.KZ1iNKAvxTw7GQmFgGPzt2Gk7-ULQqmmf8dnWQOZRjE', 13, '2019-11-05 15:12:57', NULL, NULL, 0),
(6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IklkIjoxNX0sImlhdCI6MTU3NDU5MDY0OCwiZXhwIjoxNjA2MTI2NjQ4fQ.KTdJPzp4QlSFpdTBU4NUiUUodfHXjsNumBD882I49UA', 15, '2019-11-09 00:14:15', NULL, NULL, 0),
(7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IklkIjoxNn0sImlhdCI6MTU3NDE2NDMxMSwiZXhwIjoxNjA1NzAwMzExfQ.6gQMe-BYbpwvckFTNITm5JQzFxDrfMFiEb0QJP4PS_4', 16, '2019-11-09 07:51:58', NULL, NULL, 0),
(8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IklkIjoxN30sImlhdCI6MTU3MzQ0NjQ1MCwiZXhwIjoxNjA0OTgyNDUwfQ.CdjOWM7PB_qMJ9NO5xTY1JJZ4uUKJS6mJZVT6BL3hNg', 17, '2019-11-09 09:35:06', NULL, NULL, 0),
(13, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IklkIjoxfSwiaWF0IjoxNTc0Njc3NTYzLCJleHAiOjE2MDYyMTM1NjN9.tpNDhhPp0Ti8vcpz0lwTxYPSxjyOky8OWjfGf4ctkWM', 1, '2019-11-09 23:17:17', NULL, NULL, 0),
(14, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IklkIjoyMH0sImlhdCI6MTU3MzQ0ODAyNCwiZXhwIjoxNjA0OTg0MDI0fQ.gUyCToaLMC6ZBXqZhq2WLy04RGU4UJBR2_M2gEftwWs', 20, '2019-11-11 03:10:10', NULL, NULL, 0),
(15, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IklkIjoyMX0sImlhdCI6MTU3NDU4OTczNSwiZXhwIjoxNjA2MTI1NzM1fQ.qVFobBXMGVTaK73IbLQAxK8AVsgoUJFaalKFd8eoW2k', 21, '2019-11-11 03:10:35', NULL, NULL, 0),
(16, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IklkIjoyMn0sImlhdCI6MTU3MzQ0MTg2MCwiZXhwIjoxNjA0OTc3ODYwfQ.xeS08RJG5xPSpAqIzZSgj27pSHrdN2CMr5WhGfdqYU8', 22, '2019-11-11 03:11:00', NULL, NULL, 0),
(17, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IklkIjoyNH0sImlhdCI6MTU3NDM4MTE5MiwiZXhwIjoxNjA1OTE3MTkyfQ.70cU67jSfFNBCjVXrMlXV9ZgDpSdeJSH099S93ZR6kg', 24, '2019-11-12 12:20:08', NULL, NULL, 0),
(18, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IklkIjoyNX0sImlhdCI6MTU3NDQyNDUyMCwiZXhwIjoxNjA1OTYwNTIwfQ.YyllE0AZv_baoQAMpiA1ixQ7tKhACIhPjbkrCliJFgE', 25, '2019-11-14 02:56:47', NULL, NULL, 0),
(19, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IklkIjoyN30sImlhdCI6MTU3Mzg0MjI4NiwiZXhwIjoxNjA1Mzc4Mjg2fQ.6QfNx5IEvD3DCOZNlvQtdgSgplYxIibUvnexrzSc3xE', 27, '2019-11-14 15:28:50', NULL, NULL, 0),
(20, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IklkIjozMX0sImlhdCI6MTU3NDk5MzYzMiwiZXhwIjoxNjA2NTI5NjMyfQ.Kz29ERQjTiIF6CXbYAvahVCOHBvD6mN9mFYIkfnD83I', 31, '2019-11-19 08:01:22', NULL, NULL, 0),
(21, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IklkIjozM30sImlhdCI6MTU3NDUyOTczMSwiZXhwIjoxNjA2MDY1NzMxfQ.1WOLQL6l92SoxrZ2OwcX0IClsZeDn7a8hjq4ojHniY8', 33, '2019-11-21 09:32:50', NULL, NULL, 0),
(22, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IklkIjozNH0sImlhdCI6MTU3NTI3MzI0NiwiZXhwIjoxNjA2ODA5MjQ2fQ.ktjoJK3RgS4acCUXtg1n6q7vhSpWGwHNtknfyB5mW_s', 34, '2019-11-21 09:41:05', NULL, NULL, 0),
(23, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IklkIjozMn0sImlhdCI6MTU3NTI2MDY0NywiZXhwIjoxNjA2Nzk2NjQ3fQ.W3nH5bn6f3V5-YvctQBf0-kK45ed6mS-BgcPDBn7JIs', 32, '2019-11-21 13:26:37', NULL, NULL, 0),
(24, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IklkIjozN30sImlhdCI6MTU3NTIzOTEyNSwiZXhwIjoxNjA2Nzc1MTI1fQ.-0P5I1bp94QaQvzu0gRYRMFGaqzE7Nl8Wj3ZjEUf6EU', 37, '2019-11-26 02:30:22', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `Id` int(11) NOT NULL,
  `FullName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `Tel` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `RoleId` int(11) NOT NULL,
  `Stars` int(11) NOT NULL,
  `RatedTime` int(11) NOT NULL,
  `Password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Active` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedDate` datetime DEFAULT NULL,
  `IsDeleted` tinyint(1) DEFAULT '0',
  `FixerGroupId` int(11) DEFAULT NULL,
  `Address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `BankAccount` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `HouseId` int(11) DEFAULT NULL,
  `IdCard` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`Id`, `FullName`, `Email`, `Avatar`, `DOB`, `Tel`, `RoleId`, `Stars`, `RatedTime`, `Password`, `Active`, `CreatedBy`, `CreatedDate`, `UpdatedBy`, `UpdatedDate`, `IsDeleted`, `FixerGroupId`, `Address`, `BankAccount`, `HouseId`, `IdCard`) VALUES
(1, 'Admin', 'smarthomes.group.new@gmail.com', '', NULL, '0123456789', 1, 0, 0, '$2a$10$W8AbNSRANa3i0xppy3MyPOQFXIHh6BjUo.PtrVhdXRV2n0nN6alLe', 'AC', NULL, '2019-11-01 16:18:55', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(2, 'Nguyen Trong Viet', 'vietnt.uet+2@gmail.com', '', NULL, '0886884686', 6, 0, 0, '$2a$10$NMJzrk0F7tjxEeoZfoYnuOAvP13L5gPM1DBxd6hqfRM22hSTaTHoW', 'AC', NULL, '2019-11-01 17:21:50', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(3, 'Viet Nguyen Trong nguyen', 'vietnt.uet@gmail.com', '', NULL, '0123456789', 4, 0, 0, '$2a$10$jh.eghH7HI3iDg9mMcdHe.aMoE8PNH79k42MFPCouIyY5Pgbe6ENy', 'AC', NULL, '2019-11-01 17:22:33', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(4, NULL, 'admin', NULL, NULL, '0123456789', 4, 0, 0, '$2a$10$cdBkB8yXsdadOQKHxYKvFenAQeMtlMWgVB3gQEfF/4W/AkAYqZcsW', 'AC', NULL, '2019-11-02 09:29:13', NULL, NULL, 0, NULL, NULL, NULL, 2, NULL),
(5, NULL, 'qabc@gmail.com', NULL, NULL, '0123456789', 4, 0, 0, '$2a$10$aD2Z7rqmmj9BLDFNuDAzVeldZ6e0c89OEXjtXQ.hg9pbwNQnLX0bu', 'AC', NULL, '2019-11-02 11:58:07', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(6, NULL, 'abc@gmail.com', NULL, NULL, '0123456789', 4, 0, 0, '$2a$10$92QW6Oe0zMjKYFP1Vhrr0e2ecVEpYhi749GhpV6XzJTT.bR2Tj4VK', 'AC', NULL, '2019-11-02 12:00:02', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(7, 'Admin', 'admin@gmail.com', '', NULL, '0378033707', 2, 0, 0, '$2a$10$2XgzlxkjtdTxJyrSKwKmLee32Wi2gTgIVED4PE2ZWiC6yRpLFmvDq', 'AC', NULL, '2019-11-02 16:13:22', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(8, 'Test', 'test@gmail.com', '', NULL, '0123456789', 2, 0, 0, '$2a$10$6u.mE1r91F.DNf71L2lkWunXkagNTauHwp84sCSg0.WsrLazoBn3.', 'AC', NULL, '2019-11-05 14:38:16', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(9, NULL, 'abcaff@gmail.com', NULL, NULL, '0123456789', 4, 0, 0, '$2a$10$IQgDIVwhalxIT2WNChyEQ.mm3T7SLN2Z.VtJ8BLzWykj.KRwjm766', 'AC', NULL, '2019-11-05 14:59:22', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(10, 'Test', 'test123@gmail.com', '', NULL, '0123456789', 2, 0, 0, '$2a$10$fMS85j9l002WY0T2vJJH9u150GAjCl4vvdLgJx7k299KHfEHLyusG', 'AC', NULL, '2019-11-05 15:02:08', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(11, 'Test', 'test478@gmail.com', '', NULL, '0123456789', 2, 0, 0, '$2a$10$kgNpjx08LyxZLumUDhkN3O./jkdvjtejHS7WMceLEAnSdYpROwZne', 'AC', NULL, '2019-11-05 15:05:29', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(12, '123', 'af@gmail.com', NULL, NULL, '0123456789', 4, 0, 0, '$2a$10$WxK9Uu3qORN427puJVkwDOuxgmt7C67rhooTrOiRBKwT8kTkKh8C.', 'AC', NULL, '2019-11-05 15:06:33', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(13, 'Test', 'test989@gmail.com', '', NULL, '0123456789', 2, 0, 0, '$2a$10$1kWtlVWLO.R14D.K9/YyK.JeLRat4DIfAuK06aRbjdehc/s2kHD2e', 'AC', NULL, '2019-11-05 15:09:02', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(14, 'rewrew', 'hhh@gmail.com', NULL, NULL, '0123456789', 4, 0, 0, '$2a$10$f4dVZbyWiS1R2YkLfywi/.Crj8cckxtq0SQkh.B.0HcEdbYa/6ghy', 'AC', NULL, '2019-11-05 15:27:04', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL),
(15, 'Tien Minh 10', 'tienbkit@gmail.com', '', NULL, '0974458402', 4, 0, 0, '$2a$10$1zyhDV1eERMXy7JDb4H.QOgs8i0CHIqplMzd53V9Ox8hCz5kFu17W', 'AC', NULL, '2019-11-08 15:39:17', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(16, 'Viet Nguyen 2', 'vietnt.uet+fixer@gmail.com', '/avatar/c8bb319b-a39d-467a-ab7c-b33f1a5edceb.JPEG', '2004-11-18', '0123456789', 7, 0, 0, '$2a$10$OUHMyQCrwgYBpY1hY0znSuqeaQUBqZCocSwSGVMJT6kfafcrD0Ieq', 'AC', NULL, '2019-11-09 07:51:29', NULL, NULL, 0, NULL, '199 Hồ Tùng Mậu', NULL, NULL, NULL),
(17, 'Nha Quan Lyau Nguyen', 'vietnt.uet+manager@gmail.com', '', NULL, '0988888888', 5, 0, 0, '$2a$10$zaTqii3QqVk.tDBnyqxZnOmR1BWvhlPnwgfudiPEqzlqAf6D97V/6', 'AC', NULL, '2019-11-09 09:26:45', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(18, 'Admin', 'admin2@gmail.com', NULL, NULL, '0123456789', 1, 0, 0, '$2a$10$sLUScaI7xH4zjMZ0Uvi.q.Q1mAY5It8xLxU5CeKieuxtMCogoqyim', 'AC', NULL, '2019-11-09 11:05:08', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(19, '123123', '123@gmail.com', NULL, NULL, '0123456789', 4, 0, 0, '$2a$10$L7bvUmTaTQsBY3XPPuzVDeeKZt8UD2Q.uZDb1CAoPucGDbzkli2Ni', 'AC', NULL, '2019-11-09 13:11:15', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(20, 'Nguyen Thi Cam Tu nguyen nguyen', 'vietnt.uet+resident2@gmail.com', '', NULL, '0939999999', 4, 0, 0, '$2a$10$fTzOk.2vzUm82RcrTbEQpuUE3293RTW82Rnb8YZPzaPIxYUJFVMLC', 'AC', NULL, '2019-11-11 02:31:43', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(21, 'Cam Tu', 'vietnt.uet+manager2@gmail.com', '/avatar/392e1878-4d17-49ab-8850-fe0625708f82.JPEG', '2019-11-20', '0939111111', 5, 0, 0, '$2a$10$.gHrUtZP2I.dgxw.ItmY1ucE0HOGDxBMV2zLn49dJZRuFTID9itDm', 'AC', NULL, '2019-11-11 02:32:41', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(22, 'Tho Sua Chua', 'vietnt.uet+fixer2@gmail.com', '', NULL, '0939222222', 7, 0, 0, '$2a$10$k.IBVXX1QoP9.CbA98nqR.m21xlO7LaKg/FD2Q5WF62fEZ9fPEVm.', 'AC', NULL, '2019-11-11 02:33:34', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(23, 'TienVu', 'tienbkit2@gmail.com', NULL, NULL, '0974458403', 4, 0, 0, '$2a$10$stbd2/X6IwMcU9nPF15DcOd5Fg2jEL4yE6KldrG9IJ9UYiMgxB2gO', 'AC', NULL, '2019-11-11 08:00:21', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(24, 'Viet Nguyen', 'vietnt.uet+resident3@gmail.com', '/avatar/525f1f11-cb03-4b92-9387-9a8e754909de.png', '1991-04-17', '0939884686', 4, 0, 0, '$2a$10$0hxETD35Pp7.CP/wrG1Ciu07BLqpjCWaheE65gBKNNFenpEDmO6ni', 'AC', NULL, '2019-11-11 09:19:20', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(25, 'Jane2', 'sondn@vinsofts.net', '/avatar/3e70e3b5-89a5-4a39-ac58-7a3f1975c568.png', '1990-12-20', '0123456789', 2, 0, 0, '$2a$10$Z7tOamZpT0oL80x8QjczW..96U1dW5hmeOotvbawxtYs6OUK06352', 'AC', NULL, '2019-11-14 02:56:26', NULL, NULL, 0, NULL, 'Cau Giay, Ha Noi', NULL, NULL, NULL),
(26, 'TestApp', 'testapp@gmail.com', NULL, NULL, '0123456789', 2, 0, 0, '$2a$10$turlVT4nXtfLdyGbisBgCuxjtMiCOKwZyd/wEDFIy7ktEZ7XdlNAK', 'AC', NULL, '2019-11-14 15:24:18', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(27, 'abcdef', 'testapp2@gmail.com', NULL, NULL, '0123456789', 2, 0, 0, '$2a$10$r.oul/aCQJXpt.NGi1.y2.ggHrnptYFlOq.cZpq3u3ad0RqnCD5G.', 'AC', NULL, '2019-11-14 15:26:43', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(28, 'TienBkit', 'tienbkit4@gmail.com', NULL, NULL, '0011223344', 4, 0, 0, '$2a$10$X0Q6hn1d3ckAN5AdKqKK8uBcLa93N5S27pZDx6TpfmUXMUlj4MmM6', 'AC', NULL, '2019-11-15 04:25:44', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(29, 'Admin', 'sondn1@vinsofts.net', '', NULL, '0123456789', 1, 0, 0, '$2a$10$BWHw8DYFJF6ZnWOHqJddw.tSPAzfEKZU09iPhNuMzZsv3nGodinT.', 'AC', NULL, '2019-11-18 04:21:08', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(30, 'HUONGNG', '010101@gmail.com', NULL, NULL, '0123456789', 8, 0, 0, '$2a$10$sz9VzUN6KKJeSZLx9h6IfuXR0RoJzsO8Bizs24NPYpICJdyW3oiae', 'AC', NULL, '2019-11-18 09:07:45', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(31, NULL, 'huutx@vinsofts.net', NULL, NULL, '1234567892', 2, 0, 0, '$2a$10$m1wN11bh9SnWI5Bx9vqoiOy92srAlT5HQH1i78r7Ci/0M6VsClv7i', NULL, NULL, '2019-11-19 08:01:02', NULL, NULL, 0, 1, NULL, NULL, 2, NULL),
(32, 'Quản Lý Giỏi', 'qly1@gmail.com', '/avatar/bb00e842-74bc-4314-b761-4c390541b34a.jpeg', '2019-12-05', '0991122334', 5, 0, 0, '$2a$10$m1wN11bh9SnWI5Bx9vqoiOy92srAlT5HQH1i78r7Ci/0M6VsClv7i', 'AC', NULL, '2019-11-20 00:00:00', NULL, NULL, 0, NULL, 'Cầu Giấy', 'ACB - 18234827934', NULL, NULL),
(33, 'Dương Hồng Sơn', 'sondn2@vinsofts.net', '', '1995-12-01', '0138196650', 4, 0, 0, '$2a$10$vGrSRMvzaoB4MwA5GqkhieZRht3.3Rk1x5IXPCz5UJpL1eCmwxm1S', 'AC', NULL, '2019-11-21 09:32:23', NULL, NULL, 0, NULL, NULL, '00123456789', NULL, NULL),
(34, 'Cư Dân1', 'sondn32@vinsofts.net', '/avatar/9b6c5ecc-37fe-4539-9608-c5939dba864c.JPEG', '1992-01-26', '0881122334', 4, 0, 0, '$2a$10$m1wN11bh9SnWI5Bx9vqoiOy92srAlT5HQH1i78r7Ci/0M6VsClv7i', 'AC', NULL, '2019-11-21 09:40:50', NULL, NULL, 0, NULL, NULL, 'ACB - 18234827934', 8, NULL),
(35, 'Nguyen Trong Viet', 'vietnt.uet+1@gmail.com', NULL, NULL, '0939884685', 4, 0, 0, '$2a$10$bLmYVUPGEP9Cnt8FnJFpFeFXM9VfWzyb53Jpn0dwUrpsIq6faRal6', 'AC', NULL, '2019-11-22 10:26:39', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(36, 'Son', 'bd4cdcdd-a82d-4b59-9318-a61d83b06497', '/avatar/b131be92-fbf1-4ea5-9303-9ccc2a074922.jpg', '1990-01-01', '0123456780', 4, 0, 0, '$2a$10$eVrWOkbjYlWvqrKpbAeRKuQ2mIEfbFHPIVj0MY/JwFl9fSdzS2uBq', NULL, NULL, '2019-11-24 16:58:04', NULL, NULL, 0, NULL, '87/3 Nguyen Sy Sach, HCM', NULL, NULL, '123456789'),
(37, 'Thợ Hà Nội', 'ongtho@gmail.com', '/avatar/6c61355b-a6a0-4b3a-b971-a2002d461270.JPEG', '1989-11-11', '0445566778', 7, 4, 1, '$2a$10$m1wN11bh9SnWI5Bx9vqoiOy92srAlT5HQH1i78r7Ci/0M6VsClv7i', 'AC', NULL, '2019-11-26 00:00:00', NULL, NULL, 0, 1, 'Hà Nội', NULL, 2, NULL),
(38, 'Hahh', 'b24d660d-f083-4ff6-b1bb-b8c3362e3ee2', '/avatar/130a3b1d-638f-4361-b8ad-5ca3461359d9.JPEG', '2019-12-01', '0988774485', 4, 0, 0, '$2a$10$TQZXCosg1qfPcDArOPdzquz9DrPx69L3wz4SjJqpx7tvF8.rJ0JgS', NULL, NULL, '2019-11-30 17:26:17', NULL, NULL, 0, NULL, 'Cgghhgggg', NULL, NULL, '88889'),
(39, 'Phab huy sy', 'b0d5f430-eca8-49d0-baab-adcb4702cf3e', '/avatar/f48ce8d4-3b68-4410-a16f-2544788b1f46.JPEG', '2019-12-01', '0856464979', 4, 0, 0, '$2a$10$ErSN9svh2uxbyDL8gDLz9upmfunnrwALBIiAwK34Jkk/7UkmwOKgm', NULL, NULL, '2019-11-30 17:28:22', NULL, NULL, 0, NULL, '', NULL, NULL, '949499494'),
(40, 'Phan huy hoang', 'cfab08ce-7a60-43a5-83df-feeffe8c401d', '/avatar/25bf441f-4ae9-40c7-bb4f-685b1830f5d0.JPEG', '2019-12-12', '0869907806', 4, 0, 0, '$2a$10$XMXQlATEEuM.ZbgGT/xOlexQji3peaud.kDpS6h10q7qdcxUy9CN6', NULL, NULL, '2019-11-30 18:16:40', NULL, NULL, 0, NULL, 'Ha tinh', NULL, NULL, '183800164'),
(41, 'Lont', '361e21e2-6f57-4911-8cf6-35329d5f1770', NULL, '2019-12-12', '0988774486', 4, 0, 0, '$2a$10$7xdWPrp4sV8fEEh.j4x1VujKWTL4W6m/umwPOMckMDFyidRab1iPy', NULL, NULL, '2019-11-30 18:18:36', NULL, NULL, 0, NULL, 'Gâggaga', NULL, NULL, '183800756'),
(42, 'Lont', '309d4d58-324f-4760-9780-3efe3d392fb3', NULL, '2019-12-12', '0988774488', 4, 0, 0, '$2a$10$PClYbf0xOlhuzwoYq5ULO.T75HUD9.Y0C3yBzP5wUFWpBtmbg6c7G', NULL, NULL, '2019-11-30 18:19:48', NULL, NULL, 0, NULL, 'Gâggaga', NULL, NULL, '183800756'),
(43, 'Lont', '2f4e4bbb-7b6e-4457-aa8a-cc7b9b20d633', NULL, '2019-12-12', '0988774484', 4, 0, 0, '$2a$10$XwwIWVDAzzFHQABroejGxuoCWEQLcYi8zGbowLytG/8dDa1Ci7t7a', NULL, NULL, '2019-11-30 18:21:16', NULL, NULL, 0, NULL, 'Gâggaga', NULL, NULL, '183800756'),
(44, 'Hshshss', 'c3fbc193-5f32-461a-9b19-7983ac95cee4', '/avatar/9c82b133-6a9e-4a0b-a377-a6d0ac64323e.JPEG', '2019-12-01', '0988775541', 4, 0, 0, '$2a$10$kkh2s8MvlZZca0Z0LMuW6OylbOMNI2xshCA2zSksSovwTec7Aotgi', NULL, NULL, '2019-11-30 18:22:47', NULL, NULL, 0, NULL, '', NULL, NULL, '5848484844'),
(45, 'Hvsvsvsvs', 'b7daaf25-75c9-492b-859c-9f3a429641b3', '/avatar/a5e33813-aa4b-4e5b-8232-5b1ac4c0ee48.JPEG', '2019-12-04', '0988774465', 4, 0, 0, '$2a$10$KRwVUQ1JLHlvX83oDNBi.utWdzQyGEpkB/KDXycG3Hk7s8Bg1YC3q', NULL, NULL, '2019-11-30 18:24:11', NULL, NULL, 0, NULL, 'VVagag', NULL, NULL, '88484849494'),
(46, 'Gfccg', '06add677-3b07-41a1-90c7-957de70574cc', '/avatar/a1ca7756-db2b-439d-a4a7-6d47edb1595a.JPEG', '2019-12-01', '0988774483', 4, 0, 0, '$2a$10$SiIAyqDMZkxJ5N3J8MiqkOjN2.kwXRAep4jTwBG5FNCOncPjO22sq', NULL, NULL, '2019-11-30 18:26:10', NULL, NULL, 0, NULL, 'Fccgbbbb', NULL, NULL, '8888899'),
(47, 'Ggggh', '4dd15d63-5062-45b5-a5e5-e36da10d2749', '/avatar/a7b49960-8b3f-4b63-b558-fd34250b101e.JPEG', '2019-12-01', '0988775546', 4, 0, 0, '$2a$10$icpf9ls8dB/Z8Jy0z8Q1ne.G5jsjYeU6FGxRlTrl5KMVYeEq6/SCq', NULL, NULL, '2019-11-30 18:34:46', NULL, NULL, 0, NULL, '', NULL, NULL, '855666555'),
(48, 'Ggggh', '548149fc-f056-44a6-bb8b-9a812b255dc0', '/avatar/052b5bef-e558-47f3-bcd7-1b9b8281a22d.JPEG', '2019-12-01', '0988775556', 4, 0, 0, '$2a$10$0MzNSwgW9bhQr3gyRHzM2eBs153Dj.5flk3Bp9uolAwW8sh2YEkZi', NULL, NULL, '2019-11-30 18:35:28', NULL, NULL, 0, NULL, '', NULL, NULL, '855666555'),
(49, 'Viet', '3f136f49-b594-46d9-9149-2b9d44e30f83', '/avatar/cdd00d62-1e63-4db4-b333-f962196a8bb2.JPEG', '2019-12-12', '0988774463', 4, 0, 0, '$2a$10$kIloPh/0yxmi8aQUIwKpcevMELdNwMjZGUnmlvE8S1pYYABN2tdqy', NULL, NULL, '2019-11-30 18:44:09', NULL, NULL, 0, NULL, 'Hvssvbbshs', NULL, NULL, '183645889'),
(50, 'Hahwhw', '5efd4f42-4fa5-4e14-b8f2-7784b0b61dde', '/avatar/ff6c3694-24c3-4196-844e-f7400c5cb566.JPEG', '2019-12-01', '0899774482', 4, 0, 0, '$2a$10$YvTahFedQBiJmYT601iKceKefnsYt5YFk5b9UF0sTbWjVcZ6mjgs2', NULL, NULL, '2019-11-30 18:49:08', NULL, NULL, 0, NULL, '', NULL, NULL, '94949494949'),
(51, 'Bsbsbs', 'c2bc9810-509a-471a-beed-f74df50645a6', '/avatar/d38f8dee-b9bf-4dc6-9815-2ac07ce87a65.JPEG', '2019-12-01', '0988774453', 4, 0, 0, '$2a$10$AB7aEcbfyTeJAhTS2KV7Wu8br7rzNqNRlM8N2bDPpQWai4Ar8p1om', NULL, NULL, '2019-11-30 18:54:15', NULL, NULL, 0, NULL, '', NULL, NULL, '6584848484'),
(52, 'Ssssssss', 'a1db1e5b-971e-4633-a45d-28518dca28b1', '/avatar/4c711bcf-b8e6-46a5-a483-8e3e1351ae36.JPEG', '2019-12-01', '0988778563', 4, 0, 0, '$2a$10$5RZc3NqJ6yrda9o13H042eADkreaULrSOExwSAMYi1th4NSkFg87W', NULL, NULL, '2019-11-30 18:59:58', NULL, NULL, 0, NULL, '', NULL, NULL, '7774444'),
(53, 'Son', '3b90cea5-eccd-45bd-994c-bc462183dcfc', '/avatar/dc90d3b3-3114-4cdb-b41f-48b4e726557e.jpg', '1990-01-01', '0988664486', 4, 0, 0, '$2a$10$VKrL9tVhE967TKPzZF8z7ufUC9ShNsYT5v/YdkTtgLhk5SpSvFL3S', NULL, NULL, '2019-12-01 04:12:40', NULL, NULL, 0, NULL, '87/3 Nguyen Sy Sach, HCM', NULL, NULL, '05125882'),
(54, 'Son', '63f5aa74-6834-40a6-a911-5bd00a98335a', '/avatar/595cfc3b-3aa0-44f5-9318-40aeb763c25c.jpg', '1990-01-01', '0988554486', 4, 0, 0, '$2a$10$3IYbbJn2.agC07oP7D/xuO0Er72cX/i0hiDzgea4ojOpJulrV/482', NULL, NULL, '2019-12-01 04:14:07', NULL, NULL, 0, NULL, '87/3 Nguyen Sy Sach, HCM', NULL, 2, '05125882'),
(55, 'Son', 'd0ffe708-c71d-473d-a1f2-8d902e48d6a8', '/avatar/ceb02143-8e15-469d-b5e3-dd96d682e597.jpg', '1990-01-01', '0988444486', 4, 0, 0, '$2a$10$LNlF//2CgQ642DKOzPUhueOHIrFr3Lzl9itBZvfmiGk.c6B2h.p.m', NULL, NULL, '2019-12-01 04:15:24', NULL, NULL, 0, NULL, '87/3 Nguyen Sy Sach, HCM', NULL, NULL, '05125882'),
(56, 'Phan huy hoang', '67ab779c-dcbb-48b5-84ba-ba14270129c5', '/avatar/783fc950-bd6c-41a7-90a1-2323862aeb21.JPEG', '2019-12-04', '0988774423', 4, 0, 0, '$2a$10$WIQKzs4pDbC6qg15Omdbcuh0404ppk2KV.bF5CbECW8EBVaMvdt.u', NULL, NULL, '2019-12-01 17:42:10', NULL, NULL, 0, NULL, 'Ha tinh', NULL, NULL, '12345687'),
(57, 'Thợ Hà Nội 2', 'ongtho1@gmail.com', '/avatar/6c61355b-a6a0-4b3a-b971-a2002d461270.JPEG', '1989-11-11', '0445566779', 7, 4, 1, '$2a$10$m1wN11bh9SnWI5Bx9vqoiOy92srAlT5HQH1i78r7Ci/0M6VsClv7i', 'AC', NULL, '2019-11-26 00:00:00', NULL, NULL, 0, 1, 'Hà Nội', NULL, 2, NULL),
(58, 'Thợ Hà Nội 3', 'ongtho2@gmail.com', '/avatar/6c61355b-a6a0-4b3a-b971-a2002d461270.JPEG', '1989-11-11', '0445566770', 7, 4, 1, '$2a$10$m1wN11bh9SnWI5Bx9vqoiOy92srAlT5HQH1i78r7Ci/0M6VsClv7i', 'AC', NULL, '2019-11-26 00:00:00', NULL, NULL, 0, 1, 'Hà Nội', NULL, 2, NULL),
(59, 'Thợ Hà Nội 4', 'ongtho3@gmail.com', '/avatar/6c61355b-a6a0-4b3a-b971-a2002d461270.JPEG', '1989-11-11', '0445566771', 7, 4, 1, '$2a$10$m1wN11bh9SnWI5Bx9vqoiOy92srAlT5HQH1i78r7Ci/0M6VsClv7i', 'AC', NULL, '2019-11-26 00:00:00', NULL, NULL, 0, 1, 'Hà Nội', NULL, 2, NULL),
(60, 'Thợ Hà Nội 5', 'ongtho4@gmail.com', '/avatar/6c61355b-a6a0-4b3a-b971-a2002d461270.JPEG', '1989-11-11', '0445566772', 7, 4, 1, '$2a$10$m1wN11bh9SnWI5Bx9vqoiOy92srAlT5HQH1i78r7Ci/0M6VsClv7i', 'AC', NULL, '2019-11-26 00:00:00', NULL, NULL, 0, 1, 'Hà Nội', NULL, 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `UserNote`
--

CREATE TABLE `UserNote` (
  `Id` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `Content` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedDate` datetime DEFAULT NULL,
  `IsDeleted` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `UserNote`
--

INSERT INTO `UserNote` (`Id`, `UserId`, `Content`, `CreatedBy`, `CreatedDate`, `UpdatedBy`, `UpdatedDate`, `IsDeleted`) VALUES
(1, 34, 'Đã thu tiền phòng tháng 11', 32, '2019-11-27 11:17:02', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `User_FeedBacks`
--

CREATE TABLE `User_FeedBacks` (
  `Id` int(11) NOT NULL,
  `Content` text COLLATE utf8mb4_unicode_ci,
  `SendFrom` int(11) DEFAULT NULL,
  `SendTo` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Star` int(11) DEFAULT NULL,
  `IncidentId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `User_FeedBacks`
--

INSERT INTO `User_FeedBacks` (`Id`, `Content`, `SendFrom`, `SendTo`, `createdAt`, `updatedAt`, `Star`, `IncidentId`) VALUES
(1, 'Tho sua tot, co tam', 34, 37, '2019-11-30 06:16:00', '2019-11-30 06:16:00', 4, 6);

-- --------------------------------------------------------

--
-- Table structure for table `User_House`
--

CREATE TABLE `User_House` (
  `id` int(11) NOT NULL,
  `User` int(11) DEFAULT NULL,
  `House` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `User_House`
--

INSERT INTO `User_House` (`id`, `User`, `House`, `createdAt`, `updatedAt`) VALUES
(1, 34, 8, '2019-11-02 11:58:07', '2019-11-02 11:58:07');

-- --------------------------------------------------------

--
-- Table structure for table `Vehicle`
--

CREATE TABLE `Vehicle` (
  `Id` int(11) NOT NULL,
  `HouseId` int(11) NOT NULL,
  `CheckinDate` date DEFAULT NULL,
  `CheckoutDate` date DEFAULT NULL,
  `Plate` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Type` int(11) DEFAULT NULL,
  `Basement` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Card` tinyint(1) DEFAULT NULL,
  `Active` tinyint(1) DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedDate` datetime DEFAULT NULL,
  `IsDeleted` tinyint(1) DEFAULT '0',
  `OwnerName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Vehicle`
--

INSERT INTO `Vehicle` (`Id`, `HouseId`, `CheckinDate`, `CheckoutDate`, `Plate`, `Type`, `Basement`, `Card`, `Active`, `CreatedBy`, `CreatedDate`, `UpdatedBy`, `UpdatedDate`, `IsDeleted`, `OwnerName`) VALUES
(1, 8, '2018-10-01', NULL, '20-G3 284.13', 1, 'CT1', 1, 0, NULL, '2019-11-23 18:12:52', NULL, NULL, 1, 'Nguyễn Văn An'),
(2, 8, '2019-12-02', '2019-12-02', '16-P1 1119', 3, 'CT2', 0, 1, NULL, '2019-11-24 16:58:24', NULL, NULL, 0, 'Dương Hồng Sơn');

-- --------------------------------------------------------

--
-- Table structure for table `VehicleNote`
--

CREATE TABLE `VehicleNote` (
  `Id` int(11) NOT NULL,
  `VehicleId` int(11) NOT NULL,
  `Content` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedDate` datetime DEFAULT NULL,
  `IsDeleted` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `VehicleNote`
--

INSERT INTO `VehicleNote` (`Id`, `VehicleId`, `Content`, `CreatedBy`, `CreatedDate`, `UpdatedBy`, `UpdatedDate`, `IsDeleted`) VALUES
(1, 1, 'Đã khóa xe', 32, '2019-11-27 11:15:39', NULL, NULL, 0),
(2, 2, 'gffhj', 32, '2019-12-01 21:26:45', NULL, NULL, 0),
(3, 2, '', 32, '2019-12-01 21:28:39', NULL, NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ApartmentStatus`
--
ALTER TABLE `ApartmentStatus`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `ApartmentStatusHistory`
--
ALTER TABLE `ApartmentStatusHistory`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `HouseId` (`HouseId`),
  ADD KEY `StatusId` (`StatusId`);

--
-- Indexes for table `AppRating`
--
ALTER TABLE `AppRating`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `Building`
--
ALTER TABLE `Building`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Building_ManagerId_foreign_idx` (`ManagerId`);

--
-- Indexes for table `Contract`
--
ALTER TABLE `Contract`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Contract_HouseId_foreign_idx` (`HouseId`);

--
-- Indexes for table `Evaluate`
--
ALTER TABLE `Evaluate`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `FixerGroup`
--
ALTER TABLE `FixerGroup`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `Fixer_Price`
--
ALTER TABLE `Fixer_Price`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Fixer_Price_AcceptedBy_foreign_idx` (`AcceptedBy`);

--
-- Indexes for table `Groupfixer`
--
ALTER TABLE `Groupfixer`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `House`
--
ALTER TABLE `House`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `House_BuildingId_Building_fk` (`BuildingId`),
  ADD KEY `House_ManagerId_User_fk` (`ManagerId`);

--
-- Indexes for table `HouseNote`
--
ALTER TABLE `HouseNote`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `HouseId` (`HouseId`),
  ADD KEY `CreatedBy` (`CreatedBy`);

--
-- Indexes for table `Incident`
--
ALTER TABLE `Incident`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Incident_BuildingId_Building_fk` (`BuildingId`),
  ADD KEY `Incident_HouseId_House_fk` (`HouseId`),
  ADD KEY `Incident_IncidentTypeId_Incident_Type_fk` (`IncidentTypeId`);

--
-- Indexes for table `Incident_Note`
--
ALTER TABLE `Incident_Note`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IncidentId` (`IncidentId`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `Incident_Status`
--
ALTER TABLE `Incident_Status`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Incident_Status_IncidentId_Incident_fk` (`IncidentId`);

--
-- Indexes for table `Incident_Type`
--
ALTER TABLE `Incident_Type`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `News`
--
ALTER TABLE `News`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Permission`
--
ALTER TABLE `Permission`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `Role`
--
ALTER TABLE `Role`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `Role_Permission`
--
ALTER TABLE `Role_Permission`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `RoleId` (`RoleId`),
  ADD KEY `PermissionId` (`PermissionId`);

--
-- Indexes for table `Room`
--
ALTER TABLE `Room`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Room_HouseId_House_fk` (`HouseId`);

--
-- Indexes for table `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `ServiceRating`
--
ALTER TABLE `ServiceRating`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `StaffRating`
--
ALTER TABLE `StaffRating`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `StayRecord`
--
ALTER TABLE `StayRecord`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `TenantId` (`TenantId`),
  ADD KEY `HouseId` (`HouseId`);

--
-- Indexes for table `Token`
--
ALTER TABLE `Token`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `User_FixerGroupId_foreign_idx` (`FixerGroupId`);

--
-- Indexes for table `UserNote`
--
ALTER TABLE `UserNote`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `UserId` (`UserId`),
  ADD KEY `CreatedBy` (`CreatedBy`);

--
-- Indexes for table `User_FeedBacks`
--
ALTER TABLE `User_FeedBacks`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `SendFrom` (`SendFrom`),
  ADD KEY `SendTo` (`SendTo`),
  ADD KEY `User_FeedBacks_IncidentId_foreign_idx` (`IncidentId`);

--
-- Indexes for table `User_House`
--
ALTER TABLE `User_House`
  ADD PRIMARY KEY (`id`),
  ADD KEY `User` (`User`),
  ADD KEY `House` (`House`);

--
-- Indexes for table `Vehicle`
--
ALTER TABLE `Vehicle`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Plate` (`Plate`),
  ADD KEY `HouseId` (`HouseId`);

--
-- Indexes for table `VehicleNote`
--
ALTER TABLE `VehicleNote`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `VehicleId` (`VehicleId`),
  ADD KEY `CreatedBy` (`CreatedBy`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ApartmentStatus`
--
ALTER TABLE `ApartmentStatus`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `ApartmentStatusHistory`
--
ALTER TABLE `ApartmentStatusHistory`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `AppRating`
--
ALTER TABLE `AppRating`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `Building`
--
ALTER TABLE `Building`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `Contract`
--
ALTER TABLE `Contract`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `Evaluate`
--
ALTER TABLE `Evaluate`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `FixerGroup`
--
ALTER TABLE `FixerGroup`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `Fixer_Price`
--
ALTER TABLE `Fixer_Price`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `Groupfixer`
--
ALTER TABLE `Groupfixer`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `House`
--
ALTER TABLE `House`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `HouseNote`
--
ALTER TABLE `HouseNote`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `Incident`
--
ALTER TABLE `Incident`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;
--
-- AUTO_INCREMENT for table `Incident_Note`
--
ALTER TABLE `Incident_Note`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT for table `Incident_Status`
--
ALTER TABLE `Incident_Status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;
--
-- AUTO_INCREMENT for table `Incident_Type`
--
ALTER TABLE `Incident_Type`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `News`
--
ALTER TABLE `News`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `Permission`
--
ALTER TABLE `Permission`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;
--
-- AUTO_INCREMENT for table `Role`
--
ALTER TABLE `Role`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `Role_Permission`
--
ALTER TABLE `Role_Permission`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;
--
-- AUTO_INCREMENT for table `Room`
--
ALTER TABLE `Room`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `ServiceRating`
--
ALTER TABLE `ServiceRating`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `StaffRating`
--
ALTER TABLE `StaffRating`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `StayRecord`
--
ALTER TABLE `StayRecord`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `Token`
--
ALTER TABLE `Token`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;
--
-- AUTO_INCREMENT for table `UserNote`
--
ALTER TABLE `UserNote`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `User_FeedBacks`
--
ALTER TABLE `User_FeedBacks`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `User_House`
--
ALTER TABLE `User_House`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `Vehicle`
--
ALTER TABLE `Vehicle`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `VehicleNote`
--
ALTER TABLE `VehicleNote`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `ApartmentStatusHistory`
--
ALTER TABLE `ApartmentStatusHistory`
  ADD CONSTRAINT `ApartmentStatusHistory_ibfk_1` FOREIGN KEY (`HouseId`) REFERENCES `House` (`Id`),
  ADD CONSTRAINT `ApartmentStatusHistory_ibfk_2` FOREIGN KEY (`StatusId`) REFERENCES `ApartmentStatus` (`Id`);

--
-- Constraints for table `AppRating`
--
ALTER TABLE `AppRating`
  ADD CONSTRAINT `AppRating_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `User` (`Id`);

--
-- Constraints for table `Building`
--
ALTER TABLE `Building`
  ADD CONSTRAINT `Building_ManagerId_foreign_idx` FOREIGN KEY (`ManagerId`) REFERENCES `User` (`Id`);

--
-- Constraints for table `Contract`
--
ALTER TABLE `Contract`
  ADD CONSTRAINT `Contract_HouseId_foreign_idx` FOREIGN KEY (`HouseId`) REFERENCES `House` (`Id`);

--
-- Constraints for table `Fixer_Price`
--
ALTER TABLE `Fixer_Price`
  ADD CONSTRAINT `Fixer_Price_AcceptedBy_foreign_idx` FOREIGN KEY (`AcceptedBy`) REFERENCES `User` (`Id`);

--
-- Constraints for table `House`
--
ALTER TABLE `House`
  ADD CONSTRAINT `House_BuildingId_Building_fk` FOREIGN KEY (`BuildingId`) REFERENCES `Building` (`Id`),
  ADD CONSTRAINT `House_ManagerId_User_fk` FOREIGN KEY (`ManagerId`) REFERENCES `User` (`Id`);

--
-- Constraints for table `HouseNote`
--
ALTER TABLE `HouseNote`
  ADD CONSTRAINT `HouseNote_ibfk_1` FOREIGN KEY (`HouseId`) REFERENCES `House` (`Id`),
  ADD CONSTRAINT `HouseNote_ibfk_2` FOREIGN KEY (`CreatedBy`) REFERENCES `User` (`Id`);

--
-- Constraints for table `Incident`
--
ALTER TABLE `Incident`
  ADD CONSTRAINT `Incident_BuildingId_Building_fk` FOREIGN KEY (`BuildingId`) REFERENCES `Building` (`Id`),
  ADD CONSTRAINT `Incident_HouseId_House_fk` FOREIGN KEY (`HouseId`) REFERENCES `House` (`Id`),
  ADD CONSTRAINT `Incident_IncidentTypeId_Incident_Type_fk` FOREIGN KEY (`IncidentTypeId`) REFERENCES `Incident_Type` (`Id`);

--
-- Constraints for table `Incident_Note`
--
ALTER TABLE `Incident_Note`
  ADD CONSTRAINT `Incident_Note_ibfk_1` FOREIGN KEY (`IncidentId`) REFERENCES `Incident` (`Id`),
  ADD CONSTRAINT `Incident_Note_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `User` (`Id`);

--
-- Constraints for table `Incident_Status`
--
ALTER TABLE `Incident_Status`
  ADD CONSTRAINT `Incident_Status_IncidentId_Incident_fk` FOREIGN KEY (`IncidentId`) REFERENCES `Incident` (`Id`);

--
-- Constraints for table `Role_Permission`
--
ALTER TABLE `Role_Permission`
  ADD CONSTRAINT `Role_Permission_ibfk_1` FOREIGN KEY (`RoleId`) REFERENCES `Role` (`Id`),
  ADD CONSTRAINT `Role_Permission_ibfk_2` FOREIGN KEY (`PermissionId`) REFERENCES `Permission` (`Id`);

--
-- Constraints for table `Room`
--
ALTER TABLE `Room`
  ADD CONSTRAINT `Room_HouseId_House_fk` FOREIGN KEY (`HouseId`) REFERENCES `House` (`Id`);

--
-- Constraints for table `ServiceRating`
--
ALTER TABLE `ServiceRating`
  ADD CONSTRAINT `ServiceRating_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `User` (`Id`);

--
-- Constraints for table `StaffRating`
--
ALTER TABLE `StaffRating`
  ADD CONSTRAINT `StaffRating_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `User` (`Id`);

--
-- Constraints for table `StayRecord`
--
ALTER TABLE `StayRecord`
  ADD CONSTRAINT `StayRecord_ibfk_1` FOREIGN KEY (`TenantId`) REFERENCES `User` (`Id`),
  ADD CONSTRAINT `StayRecord_ibfk_2` FOREIGN KEY (`HouseId`) REFERENCES `House` (`Id`);

--
-- Constraints for table `User`
--
ALTER TABLE `User`
  ADD CONSTRAINT `User_FixerGroupId_foreign_idx` FOREIGN KEY (`FixerGroupId`) REFERENCES `FixerGroup` (`Id`);

--
-- Constraints for table `UserNote`
--
ALTER TABLE `UserNote`
  ADD CONSTRAINT `UserNote_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `User` (`Id`),
  ADD CONSTRAINT `UserNote_ibfk_2` FOREIGN KEY (`CreatedBy`) REFERENCES `User` (`Id`);

--
-- Constraints for table `User_FeedBacks`
--
ALTER TABLE `User_FeedBacks`
  ADD CONSTRAINT `User_FeedBacks_IncidentId_foreign_idx` FOREIGN KEY (`IncidentId`) REFERENCES `Incident` (`Id`),
  ADD CONSTRAINT `User_FeedBacks_ibfk_1` FOREIGN KEY (`SendFrom`) REFERENCES `User` (`Id`),
  ADD CONSTRAINT `User_FeedBacks_ibfk_2` FOREIGN KEY (`SendTo`) REFERENCES `User` (`Id`);

--
-- Constraints for table `User_House`
--
ALTER TABLE `User_House`
  ADD CONSTRAINT `User_House_ibfk_1` FOREIGN KEY (`User`) REFERENCES `User` (`Id`),
  ADD CONSTRAINT `User_House_ibfk_2` FOREIGN KEY (`House`) REFERENCES `House` (`Id`);

--
-- Constraints for table `Vehicle`
--
ALTER TABLE `Vehicle`
  ADD CONSTRAINT `Vehicle_ibfk_2` FOREIGN KEY (`HouseId`) REFERENCES `House` (`Id`);

--
-- Constraints for table `VehicleNote`
--
ALTER TABLE `VehicleNote`
  ADD CONSTRAINT `VehicleNote_ibfk_1` FOREIGN KEY (`VehicleId`) REFERENCES `Vehicle` (`Id`),
  ADD CONSTRAINT `VehicleNote_ibfk_2` FOREIGN KEY (`CreatedBy`) REFERENCES `User` (`Id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
