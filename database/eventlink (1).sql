-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 17, 2025 at 07:43 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eventlink`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `event_title` varchar(70) NOT NULL,
  `venue` varchar(50) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `resources` varchar(70) NOT NULL,
  `remarks` text NOT NULL,
  `status` enum('pending','accepted','declined') NOT NULL DEFAULT 'pending',
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `event_title`, `venue`, `start_time`, `end_time`, `resources`, `remarks`, `status`, `date_created`) VALUES
(1, 'noli', 'Chapel', '2025-01-09 19:46:00', '2025-01-24 07:46:00', 'Chairs', 'asdasd', 'accepted', '2025-01-10 17:14:35'),
(2, 'asdasd', 'AVR Room', '2025-01-23 01:05:00', '2025-01-01 01:04:00', 'Table', 'asdasdasdasd', 'declined', '2025-01-10 17:14:39'),
(3, 'asd', 'Gymnasium', '2025-01-14 17:18:00', '2025-01-16 13:21:00', 'Microphone', 'asdasd', 'accepted', '2025-01-10 18:21:09'),
(4, 'asdasd', 'function hall', '2025-01-18 14:15:00', '2025-01-10 02:19:00', 'chicken ', 'asdasd', 'declined', '2025-01-10 18:21:36'),
(5, 'asd', 'function hall', '2025-01-16 14:19:00', '2025-01-30 02:19:00', 'chicken ', 'asdasda', 'accepted', '2025-01-10 18:21:38'),
(6, 'asd', 'chapel', '2025-01-14 21:46:00', '2025-01-15 21:46:00', 'chicken ', 'asdasd', 'declined', '2025-01-12 02:06:07'),
(7, 'noli', 'function hall', '2025-01-13 00:03:00', '2025-01-13 02:03:00', 'chicken ', '123213', 'accepted', '2025-02-16 10:05:34'),
(8, 'asd', 'chapel', '2025-02-14 16:59:00', '2025-02-09 15:59:00', 'chicken', 'asd', 'accepted', '2025-02-16 10:05:36'),
(9, 'noli', 'avr', '2025-02-16 02:13:00', '2025-02-22 10:17:00', 'chicken', 'asdasd', 'accepted', '2025-02-16 14:13:50'),
(10, 'sad', 'chapel', '2025-02-15 22:15:00', '2025-02-20 10:15:00', 'chicken', '123', 'declined', '2025-02-16 15:04:37');

-- --------------------------------------------------------

--
-- Table structure for table `incident_reports`
--

CREATE TABLE `incident_reports` (
  `id` int(11) NOT NULL,
  `student_name` varchar(70) NOT NULL,
  `contact_number` varchar(20) NOT NULL,
  `incident_type` varchar(100) NOT NULL,
  `other_incident` varchar(100) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `incident_reports`
--

INSERT INTO `incident_reports` (`id`, `student_name`, `contact_number`, `incident_type`, `other_incident`, `description`) VALUES
(1, 'asd', '123213', 'Injury', '', 'asd');

-- --------------------------------------------------------

--
-- Table structure for table `resources`
--

CREATE TABLE `resources` (
  `id` int(11) NOT NULL,
  `bundle_name` varchar(50) NOT NULL,
  `chairs` int(11) NOT NULL,
  `tables` int(11) NOT NULL,
  `microphones` int(11) NOT NULL,
  `sound_systems` int(11) NOT NULL,
  `projectors` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `resources`
--

INSERT INTO `resources` (`id`, `bundle_name`, `chairs`, `tables`, `microphones`, `sound_systems`, `projectors`) VALUES
(6, 'chicken', 3, 2, 2, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `access` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `access`) VALUES
(10, 'noli2@gmail.com', 'nolime', '$2y$10$hsFbKzhVN00O7S2ld8WReOWUuepKuIyVIF1.uwNodLSZ3FjiU7DGq', 2),
(11, 'sad@gmail.com', 'sadnu', '$2y$10$6C2/PE5bu6bESH1PRFid9OjdXhDTiD6y/EOJ0SgpqlrRk9/qs8qmK', 1),
(12, 'noli@gmail.com', 'lolo', '$2y$10$f85hijUF9jsiPUkuOR.DT.Xw4InrYEukHO4ixYCgqwC2vsydj6BVi', 1),
(13, 'noli2@gmail.com', 'd33', '$2y$10$6VBoJoNoSoa3CJKovchkJuH08gcTSgVFJgtrelSJ1xBLC3YppCIRe', 1),
(14, 'sad@gmail.com', 'ee', '$2y$10$DuJb4t3gvdSLOcJGuQsVKufyQGLtYKgD61x.f7yvrwMKuelfEHhci', 1),
(15, 'sad@gmail.com', 'nolime', '$2y$10$Lk3BDqB1P9jYWH51Q22jF..cb7BFH1VnffvrzyyeYRGkSv.EZ57XW', 1);

-- --------------------------------------------------------

--
-- Table structure for table `venues`
--

CREATE TABLE `venues` (
  `id` int(11) NOT NULL,
  `venue_name` varchar(55) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `venues`
--

INSERT INTO `venues` (`id`, `venue_name`, `description`) VALUES
(3, 'gym', 'kahit ano '),
(4, 'chapel', 'kahit ano '),
(5, 'avr', 'asd'),
(6, 'function hall', 'asda');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `incident_reports`
--
ALTER TABLE `incident_reports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `resources`
--
ALTER TABLE `resources`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `venues`
--
ALTER TABLE `venues`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `incident_reports`
--
ALTER TABLE `incident_reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `resources`
--
ALTER TABLE `resources`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `venues`
--
ALTER TABLE `venues`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
