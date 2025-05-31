-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 31, 2025 at 10:20 PM
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
-- Database: `drocsid`
--

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` char(36) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `userid` char(36) NOT NULL,
  `textchatid` char(36) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `content`, `userid`, `textchatid`, `time`) VALUES
('0261f1f0-93ba-4362-993d-ffbbcaef0181', '1', '649d781a-1b0c-44e3-b902-02a6261f050a', 'e6813b10-edee-4bd8-b5ba-a764cfa1f7ca', '2025-05-28 19:22:19'),
('02a211ce-ecbb-4c1f-b95e-8ee6039b7cd8', '1', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:41:12'),
('03f7efe2-b6d2-42ea-b73a-05bdab74f5a2', 'yes', '649d781a-1b0c-44e3-b902-02a6261f050a', 'chat-0011-0000-aaaa-000000000002', '2025-05-28 18:37:27'),
('05412fb2-2e1f-4f71-8f44-396a782ff5ca', 'd', '649d781a-1b0c-44e3-b902-02a6261f050a', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:52:46'),
('062ca4de-c4e2-449d-8f2d-f6eafc776404', '2', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:57:17'),
('084fbf5c-e5a4-477d-9290-687257c00670', '1', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:59:04'),
('0a09f22e-e354-4e09-bf4d-bc0f50fd5d9b', '1', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'e6813b10-edee-4bd8-b5ba-a764cfa1f7ca', '2025-05-28 20:08:00'),
('0a7d6f4a-ffa0-4786-aaf9-9e395e000495', 'ddddd', '649d781a-1b0c-44e3-b902-02a6261f050a', 'e6813b10-edee-4bd8-b5ba-a764cfa1f7ca', '2025-05-28 20:32:09'),
('0bea7544-d159-444d-afae-ddd5510b4ac1', '1', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:36:41'),
('0c25c269-197b-4d65-8a37-f75240d0a486', 'asdsad', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'chat-0050-0000-aaaa-000000000050', '2025-05-27 20:36:32'),
('0c8cc87d-c401-47a4-a214-bd4e6dd795ee', 'sadsdsaddsa', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'e6813b10-edee-4bd8-b5ba-a764cfa1f7ca', '2025-05-27 20:36:30'),
('0cad3d49-98bf-43b4-a03b-30752e00b187', 'asdasddsa', '649d781a-1b0c-44e3-b902-02a6261f050a', 'chat-0011-0000-aaaa-000000000002', '2025-05-28 18:55:31'),
('0f5f0925-45e4-418b-813b-f967366481ba', 'asdsad', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-27 20:36:48'),
('11435d7a-6dec-4e12-a74d-7eb368981ad7', 'as', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-27 20:59:23'),
('13094fd1-d751-4f6d-81c6-98cbf78ff2af', 'cos1', '649d781a-1b0c-44e3-b902-02a6261f050a', '11111111-1111-1111-1111-111111111111', '2025-05-28 21:14:28'),
('158db4e3-3038-4481-86b1-3f35b27b1132', 'dsa', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:02:01'),
('17f07377-3995-11f0-9659-025032b44694', 'Hi everyone! Welcome to the General Chat', '550e8400-e29b-41d4-a716-446655440000', 'aaae8400-e29b-41d4-a716-446655440000', '2023-10-01 07:00:00'),
('17f07ec6-3995-11f0-9659-025032b44694', 'Thanks Alice! Glad to be here', '550e8400-e29b-41d4-a716-446655440001', 'aaae8400-e29b-41d4-a716-446655440000', '2023-10-01 07:05:00'),
('17f07f74-3995-11f0-9659-025032b44694', 'Let\'s review the project timeline', '550e8400-e29b-41d4-a716-446655440001', 'aaae8400-e29b-41d4-a716-446655440001', '2023-10-02 12:30:00'),
('17f07fbb-3995-11f0-9659-025032b44694', 'I\'ve updated the Gantt chart. Please check the shared drive', '550e8400-e29b-41d4-a716-446655440000', 'aaae8400-e29b-41d4-a716-446655440001', '2023-10-02 12:45:00'),
('17f07ff8-3995-11f0-9659-025032b44694', 'Anyone up for lunch at 12:30?', '550e8400-e29b-41d4-a716-446655440002', 'aaae8400-e29b-41d4-a716-446655440002', '2023-10-03 09:00:00'),
('17f08033-3995-11f0-9659-025032b44694', 'Count me in!', '550e8400-e29b-41d4-a716-446655440000', 'aaae8400-e29b-41d4-a716-446655440002', '2023-10-03 09:05:00'),
('1a32a0a9-ef22-498f-b27b-20a96e59d61c', '1', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:41:30'),
('1aa32ae8-b2be-4b13-8c4b-b53ca45988da', '1', '649d781a-1b0c-44e3-b902-02a6261f050a', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:35:30'),
('1ceca331-2ade-45af-a52f-e19991337795', 'd', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'chat-0011-0000-aaaa-000000000002', '2025-05-28 18:23:40'),
('1e1ca957-6d58-42c1-b970-332f56fbbb88', '1', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:35:38'),
('2046cdae-b6dc-448b-8a1a-e93b089bfb3e', 'dsa', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'chat-0011-0000-aaaa-000000000002', '2025-05-28 18:15:21'),
('20be5e27-3863-4c43-8a8f-a7e3c5f7d431', '1', '649d781a-1b0c-44e3-b902-02a6261f050a', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:58:14'),
('21f53fff-035e-49b4-9398-f35e1ca0ed26', 'asd', '649d781a-1b0c-44e3-b902-02a6261f050a', 'chat-0011-0000-aaaa-000000000002', '2025-05-28 18:55:39'),
('23eeff46-34f7-4dca-aecb-21b2f556415b', 'd', '649d781a-1b0c-44e3-b902-02a6261f050a', 'chat-0011-0000-aaaa-000000000002', '2025-05-28 18:24:08'),
('26150f29-2b8b-408d-aa1d-62886efd183f', 'yes', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'chat-0011-0000-aaaa-000000000002', '2025-05-28 18:37:32'),
('2686c111-415b-464d-8115-3d6065038534', 'dddd', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'e6813b10-edee-4bd8-b5ba-a764cfa1f7ca', '2025-05-28 20:32:00'),
('2732ce50-7e90-4d7a-ad65-fd6c5cf109e2', 'd', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:39:05'),
('29485c71-92cc-44a4-8f3d-67147ab5a4b0', '1', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'e6813b10-edee-4bd8-b5ba-a764cfa1f7ca', '2025-05-28 19:22:14'),
('2a6896cf-b4f8-4f1e-8cea-4e45ebb1d7b5', 'd', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'e6813b10-edee-4bd8-b5ba-a764cfa1f7ca', '2025-05-28 18:52:47'),
('2b4515a7-e471-4e16-a3b3-fbf65b637483', 'd', '649d781a-1b0c-44e3-b902-02a6261f050a', 'chat-0011-0000-aaaa-000000000002', '2025-05-28 19:28:36'),
('2b758006-56d5-4d17-811c-de5cb4704304', 'cos', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-27 20:16:39'),
('2bc9851a-1388-417c-8478-f52d498d33e8', 'ad', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-28 17:59:11'),
('2ff7ac00-f039-4ddf-a8ca-dbfa2dbfb6be', 'cos3', '649d781a-1b0c-44e3-b902-02a6261f050a', '11111111-1111-1111-1111-111111111111', '2025-05-28 21:14:42'),
('30ffd992-b5b2-44b1-abf7-35b37e370355', '1', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:59:25'),
('31181d62-30b7-4b75-adf7-dbc00429decd', 'd', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-27 19:17:00'),
('321f7157-4f3f-413b-a241-0cf90a7e4ac3', 'test', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'e6813b10-edee-4bd8-b5ba-a764cfa1f7ca', '2025-05-28 20:12:22'),
('33a2f26e-404a-4e89-bdb8-660d82887972', 'as', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-27 20:59:23'),
('33c5a7e0-93b0-4c75-a8a8-95a9d5ad2b9a', 'yes', '649d781a-1b0c-44e3-b902-02a6261f050a', 'chat-0011-0000-aaaa-000000000002', '2025-05-28 18:15:15'),
('34b081c3-9bc8-414f-8a53-dcc4ad0af8db', '1', '649d781a-1b0c-44e3-b902-02a6261f050a', 'e6813b10-edee-4bd8-b5ba-a764cfa1f7ca', '2025-05-28 18:38:46'),
('37f487cc-e6ef-479d-ad59-6fba9d1b87d9', 'das', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-27 20:58:56'),
('3b44a3ec-620e-4640-8098-549c933f6266', 'yes', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'e6813b10-edee-4bd8-b5ba-a764cfa1f7ca', '2025-05-28 19:22:09'),
('3cb8d96c-e961-4715-a93f-18298e59c251', '1', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'e6813b10-edee-4bd8-b5ba-a764cfa1f7ca', '2025-05-28 20:34:09'),
('3fc382fd-09ad-499e-883d-3c2533d5f91a', 'cos', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-27 20:15:16'),
('413fa6ac-2b8a-4eaf-9acd-bc4682eb1b95', 'kajmaks', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-27 19:13:19'),
('43dfb327-5775-4efa-b250-ca6c5288115d', 'd', '649d781a-1b0c-44e3-b902-02a6261f050a', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:13:22'),
('46eda0c5-076a-4756-8cc9-8621f116aeb8', 'tesa', '649d781a-1b0c-44e3-b902-02a6261f050a', 'chat-0011-0000-aaaa-000000000002', '2025-05-28 18:23:36'),
('47072aa9-8d5e-4d1e-ac93-55c7f676adb7', 'd', '649d781a-1b0c-44e3-b902-02a6261f050a', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:37:46'),
('48a78f0e-9406-4e15-a9f8-dd2fce4a4aac', 'asdsaddsadas', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'dd0f87f7-895a-4d13-a55a-1f9949be59ec', '2025-05-27 20:36:43'),
('496bcf28-5036-4474-836a-5c04c75819b7', 'asd', '649d781a-1b0c-44e3-b902-02a6261f050a', 'chat-0011-0000-aaaa-000000000002', '2025-05-28 18:56:39'),
('4bf04604-f5d6-400c-bd72-76311caf4fc8', 'cos', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-28 22:32:00'),
('4d71d1fe-6831-46c6-bb33-9f1f015d078f', 'witam', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-27 20:03:57'),
('4fb2b523-30cb-42c5-9217-8a3243e0d70f', 'd', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:52:22'),
('508c93be-ca7b-4aa9-b2e6-e1ed438b5dfa', 'd', '649d781a-1b0c-44e3-b902-02a6261f050a', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:38:26'),
('5398f525-5653-4eaa-b1cf-60ec43dbe103', 'asd', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-27 20:43:50'),
('54318cb8-8d18-491d-a3e8-b06fb4ed5d0b', 'cos', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-27 20:15:55'),
('56b3ee77-551d-4ff9-8045-511fff649827', 'who can it be now ?', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'd4c88393-e71d-472a-b56b-6a222a47749d', '2025-05-28 20:50:53'),
('58a64f7a-2ede-4c55-9e03-391af12c05af', '3', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:41:33'),
('5a9dfdac-d2ab-42e1-8843-0ad890a0341e', '22', '649d781a-1b0c-44e3-b902-02a6261f050a', 'e6813b10-edee-4bd8-b5ba-a764cfa1f7ca', '2025-05-28 20:34:27'),
('5d58ad3b-3cdb-4e18-a624-6bf50ebd51aa', 'as', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-27 20:59:23'),
('5dd350f2-2104-4155-b9ca-f6ba8897c96f', 'cos', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-27 20:16:15'),
('617668af-8305-45eb-8fc7-1581741617c0', 'dsads', '649d781a-1b0c-44e3-b902-02a6261f050a', 'chat-0011-0000-aaaa-000000000002', '2025-05-28 18:37:50'),
('621b330e-0a2b-4922-8ea4-fac8ea3aa540', 'sadsdasad', '649d781a-1b0c-44e3-b902-02a6261f050a', 'chat-0011-0000-aaaa-000000000002', '2025-05-28 18:56:10'),
('62d4d484-a939-4d9e-a641-a9c3cecf14bf', 'yes', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'chat-0011-0000-aaaa-000000000002', '2025-05-28 19:21:23'),
('63189da9-dc92-4339-91b2-e55d4b05be78', 'yes', '649d781a-1b0c-44e3-b902-02a6261f050a', 'chat-0011-0000-aaaa-000000000002', '2025-05-28 19:21:10'),
('6537e511-1870-4d7e-886e-d8494d21c467', 'dddddd', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'e6813b10-edee-4bd8-b5ba-a764cfa1f7ca', '2025-05-28 20:32:19'),
('65fc413f-5cbd-4a5b-8aee-071d107d7f6b', 'd', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:38:49'),
('66c5da01-96fe-4522-b045-3c9c22478b7c', 'ddd', '649d781a-1b0c-44e3-b902-02a6261f050a', 'e6813b10-edee-4bd8-b5ba-a764cfa1f7ca', '2025-05-28 18:24:55'),
('67141f70-c5fa-431a-a008-4a635dfb498d', 'https://secondstore.pl/wp-content/uploads/2023/03/pobrane.png', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-27 20:44:30'),
('67ab6e8d-bcb2-4507-935f-2c9381725543', 'kajmaks', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-27 19:10:30'),
('7758659a-7c3e-4cab-afcb-88caf7e9f5c5', '3', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:41:18'),
('7823c58b-17e2-44e3-8b9b-d1b54afc6098', '1', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'chat-0011-0000-aaaa-000000000002', '2025-05-28 19:28:32'),
('798135b4-4ccd-4a81-bf2b-fa7776dcd8cd', 'd', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-27 20:44:03'),
('79b43cae-a4fd-48b3-8655-c31660c5fb62', 'teraz', '649d781a-1b0c-44e3-b902-02a6261f050a', 'chat-0011-0000-aaaa-000000000002', '2025-05-28 19:28:25'),
('7cbf8938-488e-41ed-9cb8-f39275d17f46', 'cos', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-27 20:16:48'),
('7ef8be76-76dd-4e0b-98a9-b1f05fe743ba', 'hello', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-27 19:15:37'),
('804a29cb-6f1e-4658-ab9e-925175ef05bf', 'd', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:37:57'),
('824a645f-100e-4517-bfc7-19a74834a68a', '1', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:57:47'),
('82f8fa02-7c2a-42b7-b289-5a8d815e3d88', 'yes', '649d781a-1b0c-44e3-b902-02a6261f050a', 'chat-0011-0000-aaaa-000000000002', '2025-05-28 19:28:18'),
('83e93386-ea94-4682-90ce-6127d4482103', 'https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-28 19:54:01'),
('84ddf02f-4870-48be-a5da-6386921bc539', 'a', '649d781a-1b0c-44e3-b902-02a6261f050a', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:39:12'),
('8896fac0-ef46-46db-a8f7-3bb0251fe69d', 'd', '649d781a-1b0c-44e3-b902-02a6261f050a', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:13:55'),
('88b3417c-e2de-46d0-987a-6991c45a3369', 'da', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-27 20:10:01'),
('8b12e6df-f759-411f-a523-21acf5705814', 'ads', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-27 20:52:30'),
('8b2ad1ba-369b-422d-95da-e396d20b7763', '1', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-28 21:06:00'),
('8f5cbedb-f2dc-45dc-bf6d-c5c1d6b27a57', 'a', '649d781a-1b0c-44e3-b902-02a6261f050a', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:14:01'),
('901266d8-5da4-4a05-8894-b127276cd4c7', '1', '649d781a-1b0c-44e3-b902-02a6261f050a', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:57:13'),
('90fa2be0-b470-40e7-80fd-5b1603ad25dd', 'sad', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-27 20:59:20'),
('922af70e-2407-407f-ba54-090485d86c35', '1', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'e6813b10-edee-4bd8-b5ba-a764cfa1f7ca', '2025-05-28 20:33:16'),
('93cfd836-e7f4-491c-9524-4eac806ad775', 'ddd', '649d781a-1b0c-44e3-b902-02a6261f050a', 'e6813b10-edee-4bd8-b5ba-a764cfa1f7ca', '2025-05-28 20:31:55'),
('9574fd99-722e-4050-ac57-44d5628d0a31', '2', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:41:15'),
('9d94e352-70be-4808-aa1c-b68f3004cfdd', 'cos2', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-28 21:14:38'),
('9ef6231f-05e9-45e1-bbb5-d17de9b267d5', '1', '649d781a-1b0c-44e3-b902-02a6261f050a', 'e6813b10-edee-4bd8-b5ba-a764cfa1f7ca', '2025-05-28 20:35:04'),
('a35e6ddb-3394-48da-b9d6-e6faddc5d347', 'd', '649d781a-1b0c-44e3-b902-02a6261f050a', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:37:54'),
('a3cf9c83-45d8-4fcf-b247-fa3c77448eaa', 'asddsadsadsa', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'chat-0011-0000-aaaa-000000000002', '2025-05-27 20:36:39'),
('a9e3309f-867b-473a-bbe0-82998c55f5cd', '1', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:40:55'),
('ab35fede-150b-4d85-a240-5d92dfc36ff2', 'kajm', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-27 21:03:53'),
('acb629f4-04c7-456d-8665-1e22990f006e', '123', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'e6813b10-edee-4bd8-b5ba-a764cfa1f7ca', '2025-05-28 20:30:57'),
('adf51ff3-8f93-47e9-8d42-72140277453a', 'sad\'', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-28 18:11:55'),
('af65c007-949b-4826-9d13-3a16f1723c2d', '1', '649d781a-1b0c-44e3-b902-02a6261f050a', 'e6813b10-edee-4bd8-b5ba-a764cfa1f7ca', '2025-05-28 20:30:49'),
('b25219e3-f25a-4110-ae4c-8e7becee4664', 'kajmaks', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-27 19:48:22'),
('b35999cb-1d13-464b-afd7-2add547a4b02', '1', '649d781a-1b0c-44e3-b902-02a6261f050a', 'e6813b10-edee-4bd8-b5ba-a764cfa1f7ca', '2025-05-28 20:34:47'),
('b3d72306-7acb-4524-ab83-70d2ae9f7ff6', 'dddd', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'chat-0011-0000-aaaa-000000000002', '2025-05-28 18:55:53'),
('b5128cdc-3775-48ef-b1f0-b218414ca266', '123', '649d781a-1b0c-44e3-b902-02a6261f050a', 'e6813b10-edee-4bd8-b5ba-a764cfa1f7ca', '2025-05-28 20:30:05'),
('b540f6dd-8fd6-47aa-9835-f18fa0f8b09c', '1', '649d781a-1b0c-44e3-b902-02a6261f050a', 'e6813b10-edee-4bd8-b5ba-a764cfa1f7ca', '2025-05-28 20:07:53'),
('b5fcdbdb-9ab3-40a4-8aa7-63cbdcd8f659', 'd', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:57:08'),
('b63f4422-4234-4316-9e09-2c59b2a23d83', '123123213123321', '649d781a-1b0c-44e3-b902-02a6261f050a', 'chat-0011-0000-aaaa-000000000002', '2025-05-28 18:14:29'),
('b8547b4d-3996-11f0-9659-025032b44694', 'Hey everyone! Ready to play?', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'chat-0011-0000-aaaa-000000000001', '2025-05-25 18:33:14'),
('b8547daf-3996-11f0-9659-025032b44694', 'Let’s start in 10 minutes.', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'chat-0011-0000-aaaa-000000000001', '2025-05-25 18:33:14'),
('b8560351-3996-11f0-9659-025032b44694', 'Has anyone done the homework?', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'chat-0011-0000-aaaa-000000000002', '2025-05-25 18:33:14'),
('b8560562-3996-11f0-9659-025032b44694', 'I can help if anyone needs it.', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'chat-0011-0000-aaaa-000000000002', '2025-05-25 18:33:14'),
('b9e7926c-a3e5-4d1e-b330-e6f937489458', 'sa', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-27 20:59:25'),
('bbbc6c62-665e-40c3-800a-a02a8f331015', 'cos', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-28 21:08:04'),
('bc6e59ef-d5b8-4c25-824e-85285f044020', 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSExAVFRUVFhUVFRUVFRUVFRUVFRUWFhUVFRYYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQGi0lHyUtLS0tKy0tLS0tLS0rLS0tLS0tLS0tLS0tKy0tLS0uLS4tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAADAAECBAUGBwj/xAA9EAABAwIDBQUGBQIGAwEAAAABAAIRAyEEEjEFQVFhcQaBkaHwEyIyQrHBFFJi0eFy8QcVI4KSwjNDsiT/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAArEQACAgEEAgEDAgcAAAAAAAAAAQIRAxIhMUEEE1EiYXEy8AUjM0KRwfH/2gAMAwEAAhEDEQA/APSmFGaUNjUVrVIiQKmEzQiAIAYJ06dADJ4SVTaW0qWHZnrVGsbMS46ngBvKALaeFxD/APEzB5iA2qQPmDWwY3i6uYX/ABBwLzl9q5p/UwgeUophaOtATwsE9rcFMfiG9QHEeIELUweNp1W5qdRrxxaQUAFqkBYG18aG71obRqkArkNpUy+ZKhyNIxMba2LzFYuW62DgSTChUwMblNmtFBvVAxVYgcVPGHK0odN2doTsVFLA1HvqLuNn0nAarlsDTyVOq6vCVCQlYUauGPOVpNqgBZ9CnZXqGEJQmS0U8Q4u0V/ZlCFYZs1XcPh4VIhlqkLKRCkxqlCskAWpFiNlShFioCGJ8qLCUIsAWVBr0zCtFDqPRYUc9jmu0XP7Q2QX3XW4yCsytiWt1UtlJHDu2U4GISXS1MWyTdJLUVpOxaFNcG7trT/OPFM3tow/MnYaTv2kKQI4rz53bVg+ZCHbynPxIthpR6QE8Lh8P2zpn5x4q/S7V0z8wS1BoOnqv', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-28 19:53:32'),
('bd5a55e4-da32-47fc-8ec1-900c6ab3201f', 'sadsdasad', '649d781a-1b0c-44e3-b902-02a6261f050a', 'chat-0011-0000-aaaa-000000000002', '2025-05-28 18:55:38'),
('bdf6ddc9-a17d-48c0-8c39-3b6883d08e8a', 'dd', '649d781a-1b0c-44e3-b902-02a6261f050a', 'e6813b10-edee-4bd8-b5ba-a764cfa1f7ca', '2025-05-28 20:31:09'),
('be228e47-22bf-4165-afa1-894f13f502ec', 'asd', '649d781a-1b0c-44e3-b902-02a6261f050a', 'chat-0011-0000-aaaa-000000000002', '2025-05-28 18:56:40'),
('bee2755b-d4be-4a2d-8850-3ca69d77c6f8', '2', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:40:59'),
('bf58c32d-7270-4ae4-aa74-4bc777d65780', 'witam', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-27 20:04:16'),
('bf6d113c-61e0-4e56-92d4-3a59f15f7a78', 'd', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'e6813b10-edee-4bd8-b5ba-a764cfa1f7ca', '2025-05-28 18:45:06'),
('c1ef85b0-ff11-48c0-b346-e65fa3e77910', '3', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'e6813b10-edee-4bd8-b5ba-a764cfa1f7ca', '2025-05-28 18:38:40'),
('c34063db-7b73-4dcb-a7d0-247fbf2e15ed', 'dadwa ', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-27 19:47:49'),
('c64527e7-83ef-4597-aec1-8977baae1a86', '1', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-28 21:11:54'),
('c7006cb4-1ccc-4738-bde0-1f9deac142c8', '1', '649d781a-1b0c-44e3-b902-02a6261f050a', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:35:59'),
('c8215d9b-a550-4d4a-b82f-57a85091d6cc', 'asd', '649d781a-1b0c-44e3-b902-02a6261f050a', 'chat-0011-0000-aaaa-000000000002', '2025-05-28 18:56:41'),
('cc32ecf9-9649-4682-a060-0029b16b40e0', '❤️❤️❤️❤️', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:01:34'),
('ccb4da5a-2b73-4702-b437-550c07b25e95', '321', '649d781a-1b0c-44e3-b902-02a6261f050a', 'e6813b10-edee-4bd8-b5ba-a764cfa1f7ca', '2025-05-28 20:28:52'),
('cdb5da54-cdd0-41e2-bd10-611a694eab30', 'kajmaks', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'chat-0011-0000-aaaa-000000000002', '2025-05-28 19:24:02'),
('cfedac29-061f-4df1-99b6-eabf44207664', 'yes', '649d781a-1b0c-44e3-b902-02a6261f050a', 'e6813b10-edee-4bd8-b5ba-a764cfa1f7ca', '2025-05-28 19:26:49'),
('d5f158ef-6abe-415d-bd30-0bc3b3eb9068', '🚹', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:09:44'),
('d6e634f6-ba0b-4351-9973-591433f24333', 'd', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-28 17:45:57'),
('d7d148dc-af2c-4c9c-94f8-79d65181f5de', 'asd', '649d781a-1b0c-44e3-b902-02a6261f050a', 'chat-0011-0000-aaaa-000000000002', '2025-05-28 18:55:38'),
('d8f6a5be-da82-4efb-97c4-56642fdc8b87', 's', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-27 20:59:23'),
('de9f0de7-e6fd-410b-8747-d2941e876197', 'no', '649d781a-1b0c-44e3-b902-02a6261f050a', 'chat-0011-0000-aaaa-000000000002', '2025-05-28 19:24:26'),
('e4d04fd3-316a-4bdb-ba04-a4a14cba335a', 'd', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:13:12'),
('e997b817-85fd-45c8-9bc5-05644d9ea547', 'd', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:07:17'),
('ea7daac8-5625-4ace-b36b-7a91eec45ef8', 'd', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-28 20:02:25'),
('eb5dc94f-49ec-45b6-b8e1-bc8bc3d17257', 'd', '649d781a-1b0c-44e3-b902-02a6261f050a', 'e6813b10-edee-4bd8-b5ba-a764cfa1f7ca', '2025-05-28 18:52:52'),
('edfb9114-b707-4fa6-b7bb-32a8d24adf52', 'das', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'e6813b10-edee-4bd8-b5ba-a764cfa1f7ca', '2025-05-27 20:36:27'),
('efa0e482-fd6c-4b29-a993-6f047f525123', 'no', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'chat-0011-0000-aaaa-000000000002', '2025-05-28 19:21:06'),
('f7b74a47-240d-4ba3-8d95-9917c16bc3cc', 'kajmaks', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-27 19:10:35'),
('f87fb4d1-4576-44f2-b3bc-048ce26589ef', '2', '649d781a-1b0c-44e3-b902-02a6261f050a', 'e6813b10-edee-4bd8-b5ba-a764cfa1f7ca', '2025-05-28 20:34:14'),
('fa878b10-20c5-4b0b-9abc-be515ff64ce3', '2', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'e6813b10-edee-4bd8-b5ba-a764cfa1f7ca', '2025-05-28 20:34:20'),
('fafa3bc7-6987-4557-bba7-cee1290678d7', 'kajsmk', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-27 20:27:58'),
('fb56a8ef-0bd5-4ec5-ab3a-f2a8530d805d', '1', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'e6813b10-edee-4bd8-b5ba-a764cfa1f7ca', '2025-05-28 20:34:55'),
('fb8db7e4-3e7c-490a-9e52-ca0547b10fea', 'asdsadsad', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'chat-0011-0000-aaaa-000000000001', '2025-05-27 20:36:36'),
('ff71f02c-ce4d-4dcc-8856-ca29d450e404', 'das', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-27 20:49:02'),
('ffad077b-c2af-4eeb-b70f-013a69e7d480', 'kajmaks', '7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111', '2025-05-27 20:07:58');

-- --------------------------------------------------------

--
-- Table structure for table `textchats`
--

CREATE TABLE `textchats` (
  `id` char(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `textchats`
--

INSERT INTO `textchats` (`id`, `name`) VALUES
('11111111-1111-1111-1111-111111111111', 'Cos'),
('22222222-2222-2222-2222-222222222222', 'Spicy Chicken Enthusiasts'),
('29e0ceba-6e86-456f-a82a-c4e015cb2206', 'Alice Smith - kajmaks'),
('3361f88f-60f2-49d6-9e6d-33beea48ce71', 'Bob Johnson - kajmaks'),
('733b0293-819c-421b-afc7-3a243b40e1de', 'kajmaks - no'),
('75509b7a-5920-48a9-ab20-7a7f9eaf8862', 'kajmaks - no'),
('9d751058-ea60-484d-a7e2-677d93a45899', 'Alice Smith - kajmaks'),
('aaae8400-e29b-41d4-a716-446655440000', 'General Chat'),
('aaae8400-e29b-41d4-a716-446655440001', 'Project Team'),
('aaae8400-e29b-41d4-a716-446655440002', 'Social Group'),
('chat-0011-0000-aaaa-000000000001', 'Gaming Room'),
('chat-0011-0000-aaaa-000000000002', 'Study Group'),
('chat-0050-0000-aaaa-000000000050', 'Project Collaboration'),
('chat-0050-0000-aaaa-002000000050', 'Project Collaboration'),
('d4c88393-e71d-472a-b56b-6a222a47749d', 'cos1'),
('d5ae645f-4efa-4da8-8901-8a506c98a2dd', 'kajmaks - no'),
('dd0f87f7-895a-4d13-a55a-1f9949be59ec', 'Random bullshit go'),
('e496c670-3d36-48b1-a51e-c80cfbaf3ac7', 'name1'),
('e6813b10-edee-4bd8-b5ba-a764cfa1f7ca', 'kajmaks - no'),
('e83696aa-c82c-4485-9485-42102e2f0363', 'kajmaks - no');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
('0a9fae9f-cce0-4480-aca3-0426a2a4baae', 'yes', 'yes@yes.yes', 'b7abfb5071a947d404f0dc550e40f544678c1ed83eaacfa26a79d3f5b4853f26a4741bb9455bbcc498d21ea2bb384212867c4616b2e5e7809d21b979b0509eab'),
('2faa6801-9ed1-45dd-b58f-eecea47f2305', 'bejham', 'bejham@gmail.com', '13fde5527313d07c81afe9ec78bdd0afb740597659a12309f63e0de76eb4d689ad4136945f0725b0c9ea0d9a8595d10c058eafab49b8e1eb6451580af1cb0860'),
('550e8400-e29b-41d4-a716-446655440000', 'Alice Smith', 'alice@example.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f'),
('550e8400-e29b-41d4-a716-446655440001', 'Bob Johnson', 'bob@example.com', 'fbb4a8a163ffa958b4f02bf9cabb30cfefb40de803f2c4c346a9d39b3be1b544'),
('550e8400-e29b-41d4-a716-446655440002', 'Charlie Brown', 'charlie@example.com', '937e8d5fbb48bd4949536cd65b8d35c426b80d2f830c5c308e2cdec422ae2244'),
('649d781a-1b0c-44e3-b902-02a6261f050a', 'no', 'no@no.no', '5c9186a1af97a54967600e6bfbf43426aa37985846391f9d43cad66773c447aecb245d20612f94d9392c2ae3edf4498b9306b4269dedcb9c4dbb57792294eef1'),
('7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'kajmaks', 'kajmaks@gmail.com', '3d6c7539bee2c9fd76494035a782c394c4f0d97a5610d8537f660fd839ac8243517072e58509d87ffa4926bc17ad163698317d063722fd7f30b16b2c806903c4'),
('bc5f073c-f294-4024-a4e1-675c6d3d04e7', 'cos', 'cos@cos.cos', 'e10a14f5da8cabb3ba88d96e0370b2334746f3f8e97f2901a9c41d6f8e81191a58fd205e96bc299245dcb7844d094abd1d11a936b62b60866ca559bd507ce751');

-- --------------------------------------------------------

--
-- Table structure for table `usertextchat`
--

CREATE TABLE `usertextchat` (
  `userid` char(36) NOT NULL,
  `textchatid` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usertextchat`
--

INSERT INTO `usertextchat` (`userid`, `textchatid`) VALUES
('0a9fae9f-cce0-4480-aca3-0426a2a4baae', '11111111-1111-1111-1111-111111111111'),
('2faa6801-9ed1-45dd-b58f-eecea47f2305', '11111111-1111-1111-1111-111111111111'),
('2faa6801-9ed1-45dd-b58f-eecea47f2305', '22222222-2222-2222-2222-222222222222'),
('2faa6801-9ed1-45dd-b58f-eecea47f2305', 'chat-0011-0000-aaaa-000000000001'),
('2faa6801-9ed1-45dd-b58f-eecea47f2305', 'chat-0050-0000-aaaa-000000000050'),
('550e8400-e29b-41d4-a716-446655440000', 'aaae8400-e29b-41d4-a716-446655440000'),
('550e8400-e29b-41d4-a716-446655440000', 'aaae8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440000', 'dd0f87f7-895a-4d13-a55a-1f9949be59ec'),
('550e8400-e29b-41d4-a716-446655440001', '11111111-1111-1111-1111-111111111111'),
('550e8400-e29b-41d4-a716-446655440001', '22222222-2222-2222-2222-222222222222'),
('550e8400-e29b-41d4-a716-446655440001', 'aaae8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440001', 'chat-0011-0000-aaaa-000000000001'),
('550e8400-e29b-41d4-a716-446655440001', 'chat-0011-0000-aaaa-000000000002'),
('550e8400-e29b-41d4-a716-446655440001', 'd4c88393-e71d-472a-b56b-6a222a47749d'),
('550e8400-e29b-41d4-a716-446655440001', 'dd0f87f7-895a-4d13-a55a-1f9949be59ec'),
('550e8400-e29b-41d4-a716-446655440002', '11111111-1111-1111-1111-111111111111'),
('550e8400-e29b-41d4-a716-446655440002', 'aaae8400-e29b-41d4-a716-446655440002'),
('550e8400-e29b-41d4-a716-446655440002', 'd4c88393-e71d-472a-b56b-6a222a47749d'),
('550e8400-e29b-41d4-a716-446655440002', 'dd0f87f7-895a-4d13-a55a-1f9949be59ec'),
('649d781a-1b0c-44e3-b902-02a6261f050a', '11111111-1111-1111-1111-111111111111'),
('649d781a-1b0c-44e3-b902-02a6261f050a', 'chat-0011-0000-aaaa-000000000002'),
('649d781a-1b0c-44e3-b902-02a6261f050a', 'd4c88393-e71d-472a-b56b-6a222a47749d'),
('649d781a-1b0c-44e3-b902-02a6261f050a', 'e6813b10-edee-4bd8-b5ba-a764cfa1f7ca'),
('7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '11111111-1111-1111-1111-111111111111'),
('7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', '22222222-2222-2222-2222-222222222222'),
('7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'chat-0011-0000-aaaa-000000000001'),
('7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'chat-0011-0000-aaaa-000000000002'),
('7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'chat-0050-0000-aaaa-000000000050'),
('7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'd4c88393-e71d-472a-b56b-6a222a47749d'),
('7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'dd0f87f7-895a-4d13-a55a-1f9949be59ec'),
('7ada4943-8b3d-4fb1-aa3c-9f6a7c9dfd24', 'e6813b10-edee-4bd8-b5ba-a764cfa1f7ca'),
('bc5f073c-f294-4024-a4e1-675c6d3d04e7', 'aaae8400-e29b-41d4-a716-446655440000'),
('bc5f073c-f294-4024-a4e1-675c6d3d04e7', 'aaae8400-e29b-41d4-a716-446655440001');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userid` (`userid`),
  ADD KEY `textchatid` (`textchatid`);

--
-- Indexes for table `textchats`
--
ALTER TABLE `textchats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `usertextchat`
--
ALTER TABLE `usertextchat`
  ADD PRIMARY KEY (`userid`,`textchatid`),
  ADD KEY `textchatid` (`textchatid`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`textchatid`) REFERENCES `textchats` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `usertextchat`
--
ALTER TABLE `usertextchat`
  ADD CONSTRAINT `usertextchat_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `usertextchat_ibfk_2` FOREIGN KEY (`textchatid`) REFERENCES `textchats` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
