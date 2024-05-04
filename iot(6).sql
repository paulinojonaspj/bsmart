-- phpMyAdmin SQL Dump
-- version 5.2.1deb1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Tempo de geração: 04-Maio-2024 às 23:27
-- Versão do servidor: 10.11.6-MariaDB-0+deb12u1
-- versão do PHP: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `iot`
--

DELIMITER $$
--
-- Procedimentos
--
CREATE DEFINER=`paulinojonaspj`@`%` PROCEDURE `ConsultaConsumo` (IN `data_param` VARCHAR(10))   BEGIN
    SELECT SUM(Quantidade) AS Quantidade, Localizacao, Tipo
    FROM consumo
    WHERE Data LIKE CONCAT('%', data_param, '%')
    GROUP BY Localizacao, Tipo;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `ambiente`
--

CREATE TABLE `ambiente` (
  `id` int(11) NOT NULL,
  `humidade` float DEFAULT NULL,
  `temperatura` float DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `ambiente`
--

INSERT INTO `ambiente` (`id`, `humidade`, `temperatura`, `created_at`) VALUES
(1, 0, 0, '2024-03-31 22:49:47');

-- --------------------------------------------------------

--
-- Estrutura da tabela `consumo`
--

CREATE TABLE `consumo` (
  `Id` int(11) NOT NULL,
  `Unidade` varchar(50) DEFAULT NULL,
  `Quantidade` float DEFAULT NULL,
  `Localizacao` varchar(100) DEFAULT NULL,
  `Tipo` enum('AGUA','ENERGIA') DEFAULT NULL,
  `Data` date DEFAULT NULL,
  `Hora` int(11) DEFAULT NULL,
  `Escala` varchar(50) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `consumo`
--

INSERT INTO `consumo` (`Id`, `Unidade`, `Quantidade`, `Localizacao`, `Tipo`, `Data`, `Hora`, `Escala`) VALUES
(3320, 'm3', 1018500, 'COZINHA', 'AGUA', '2024-03-30', 18, ''),
(3321, 'kWh', 12170.6, 'COZINHA', 'ENERGIA', '2024-03-30', 18, ''),
(3322, 'm3', 1929, 'WC', 'AGUA', '2024-03-30', 18, ''),
(3323, 'm3', 985, 'CENTRAL', 'AGUA', '2024-03-30', 18, ''),
(3324, 'kWh', 6631.51, 'CENTRAL', 'ENERGIA', '2024-03-30', 18, ''),
(3325, 'kWh', 831.06, 'COZINHA', 'ENERGIA', '2024-03-30', 19, ''),
(3326, 'kWh', 2309.37, 'COZINHA', 'ENERGIA', '2024-03-30', 20, ''),
(3327, 'kWh', 110.77, 'COZINHA', 'ENERGIA', '2024-03-30', 21, ''),
(3328, 'kWh', 114.34, 'CENTRAL', 'ENERGIA', '2024-03-30', 21, ''),
(3329, 'kWh', 714.41, 'SALA', 'ENERGIA', '2024-04-07', 16, ''),
(3330, 'kWh', 495.35, 'WC', 'ENERGIA', '2024-04-07', 16, ''),
(3331, 'kWh', 843.47, 'WC', 'ENERGIA', '2024-04-10', 21, ''),
(3332, 'kWh', 122.33, 'SALA', 'ENERGIA', '2024-04-10', 21, ''),
(3333, 'm3', 1334, 'CENTRAL', 'AGUA', '2024-04-10', 21, ''),
(3334, 'kWh', 907.6, 'WC', 'ENERGIA', '2024-04-10', 22, ''),
(3335, 'kWh', 88.14, 'SALA', 'ENERGIA', '2024-04-10', 22, ''),
(3336, 'kWh', 510.16, 'WC', 'ENERGIA', '2024-04-10', 23, ''),
(3337, 'kWh', 301.37, 'SALA', 'ENERGIA', '2024-04-10', 23, ''),
(3338, 'kWh', 20.33, 'SALA', 'ENERGIA', '2024-04-11', 17, ''),
(3339, 'kWh', 4.96, 'WC', 'ENERGIA', '2024-04-11', 17, ''),
(3340, 'kWh', 21.06, 'SALA', 'ENERGIA', '2024-04-11', 18, ''),
(3341, 'kWh', 4.91, 'WC', 'ENERGIA', '2024-04-11', 18, ''),
(3342, 'm3', 538, 'CENTRAL', 'AGUA', '2024-04-11', 19, ''),
(3343, 'kWh', 19.59, 'WC', 'ENERGIA', '2024-04-11', 19, ''),
(3344, 'kWh', 21.11, 'SALA', 'ENERGIA', '2024-04-11', 19, ''),
(3345, 'kWh', 15205.8, 'SALA', 'ENERGIA', '2024-04-13', 22, ''),
(3346, 'kWh', 106.26, 'WC', 'ENERGIA', '2024-04-13', 22, ''),
(3347, 'm3', 1339, 'CENTRAL', 'AGUA', '2024-04-13', 22, ''),
(3348, 'm3', 1417, 'WC', 'AGUA', '2024-04-13', 22, ''),
(3349, 'm3', 1120, 'COZINHA', 'AGUA', '2024-04-13', 22, ''),
(3350, 'kWh', 17633.2, 'SALA', 'ENERGIA', '2024-04-13', 23, ''),
(3351, 'kWh', 222.74, 'WC', 'ENERGIA', '2024-04-13', 23, ''),
(3352, 'kWh', 343.11, 'SALA', 'ENERGIA', '2024-04-14', 0, ''),
(3353, 'kWh', 7375.53, 'SALA', 'ENERGIA', '2024-04-14', 12, ''),
(3354, 'kWh', 187.17, 'WC', 'ENERGIA', '2024-04-14', 12, ''),
(3355, 'kWh', 11251.6, 'SALA', 'ENERGIA', '2024-04-14', 13, ''),
(3356, 'kWh', 215.2, 'WC', 'ENERGIA', '2024-04-14', 13, ''),
(3357, 'kWh', 7578.84, 'SALA', 'ENERGIA', '2024-04-14', 14, ''),
(3358, 'kWh', 4.88, 'WC', 'ENERGIA', '2024-04-14', 14, ''),
(3359, 'kWh', 7064.7, 'SALA', 'ENERGIA', '2024-04-14', 15, ''),
(3360, 'kWh', 14018, 'SALA', 'ENERGIA', '2024-04-14', 16, ''),
(3361, 'kWh', 5223.48, 'SALA', 'ENERGIA', '2024-04-14', 18, ''),
(3362, 'kWh', 2979.29, 'SALA', 'ENERGIA', '2024-04-14', 19, ''),
(3363, 'kWh', 54.3, 'WC', 'ENERGIA', '2024-04-14', 19, ''),
(3364, 'kWh', 132.56, 'SALA', 'ENERGIA', '2024-04-14', 20, ''),
(3365, 'kWh', 29.57, 'WC', 'ENERGIA', '2024-04-14', 20, ''),
(3366, 'kWh', 9.37, 'SALA', 'ENERGIA', '2024-04-15', 23, ''),
(3367, 'kWh', 31.76, 'SALA', 'ENERGIA', '2024-04-16', 0, ''),
(3368, 'kWh', 3436.25, 'SALA', 'ENERGIA', '2024-04-16', 19, ''),
(3369, 'kWh', 9.35, 'SALA', 'ENERGIA', '2024-04-16', 19, ''),
(3370, 'kWh', 41.86, 'SALA', 'ENERGIA', '2024-04-16', 20, ''),
(3371, 'kWh', 21.09, 'SALA', 'ENERGIA', '2024-04-16', 21, ''),
(3372, 'kWh', 14.54, 'SALA', 'ENERGIA', '2024-04-16', 22, ''),
(3373, 'kWh', 31.98, 'SALA', 'ENERGIA', '2024-04-16', 23, ''),
(3374, 'kWh', 10.61, 'SALA', 'ENERGIA', '2024-04-17', 0, ''),
(3375, 'kWh', 2079.93, 'SALA', 'ENERGIA', '2024-04-18', 21, ''),
(3376, 'kWh', 9.44, 'SALA', 'ENERGIA', '2024-04-18', 21, ''),
(3377, 'kWh', 176.78, 'WC', 'ENERGIA', '2024-04-18', 21, ''),
(3378, 'kWh', 199.47, 'SALA', 'ENERGIA', '2024-04-18', 22, ''),
(3379, 'kWh', 87.2, 'WC', 'ENERGIA', '2024-04-18', 22, ''),
(3380, 'kWh', 381.64, 'SALA', 'ENERGIA', '2024-04-18', 23, ''),
(3381, 'kWh', 210.18, 'WC', 'ENERGIA', '2024-04-18', 23, ''),
(3382, 'kWh', 13416.1, 'SALA', 'ENERGIA', '2024-04-19', 0, ''),
(3383, 'kWh', 19.4, 'WC', 'ENERGIA', '2024-04-19', 0, ''),
(3384, 'kWh', 1628.45, 'SALA', 'ENERGIA', '2024-04-19', 2, ''),
(3385, 'kWh', 4.82, 'WC', 'ENERGIA', '2024-04-19', 2, ''),
(3386, 'kWh', 47.76, 'SALA', 'ENERGIA', '2024-04-19', 3, ''),
(3387, 'kWh', 14.62, 'WC', 'ENERGIA', '2024-04-19', 3, ''),
(3388, 'kWh', 110.7, 'SALA', 'ENERGIA', '2024-04-19', 4, ''),
(3389, 'kWh', 9.79, 'SALA', 'ENERGIA', '2024-04-19', 4, ''),
(3390, 'kWh', 8.76, 'WC', 'ENERGIA', '2024-04-19', 4, ''),
(3391, 'kWh', 4531.08, 'SALA', 'ENERGIA', '2024-04-19', 5, ''),
(3392, 'kWh', 38.78, 'WC', 'ENERGIA', '2024-04-19', 5, ''),
(3393, 'kWh', 19.72, 'WC', 'ENERGIA', '2024-04-20', 14, ''),
(3394, 'kWh', 24.92, 'SALA', 'ENERGIA', '2024-04-20', 14, ''),
(3398, 'kWh', 95.5, 'SALA', 'ENERGIA', '2024-04-20', 15, ''),
(3401, 'm3', 4, 'COZINHA', 'AGUA', '2024-04-20', 15, 'Muito quente'),
(3402, 'm3', 4, 'COZINHA', 'AGUA', '2024-04-20', 15, 'Quente'),
(3403, 'm3', 4, 'COZINHA', 'AGUA', '2024-04-20', 15, 'Fria'),
(3404, 'm3', 4, 'COZINHA', 'AGUA', '2024-04-20', 15, 'Muito Fria'),
(3405, 'kWh', 14.65, 'WC', 'ENERGIA', '2024-04-20', 15, ''),
(3406, 'kWh', 9841.81, 'SALA', 'ENERGIA', '2024-04-20', 20, ''),
(3407, 'kWh', 168.6, 'WC', 'ENERGIA', '2024-04-20', 20, ''),
(3408, 'kWh', 1747.52, 'SALA', 'ENERGIA', '2024-04-20', 22, ''),
(3409, 'kWh', 4.91, 'WC', 'ENERGIA', '2024-04-20', 22, ''),
(3410, 'kWh', 63.08, 'WC', 'ENERGIA', '2024-04-20', 23, ''),
(3411, 'kWh', 193.13, 'SALA', 'ENERGIA', '2024-04-20', 23, ''),
(3412, 'kWh', 63.29, 'SALA', 'ENERGIA', '2024-04-21', 0, ''),
(3413, 'kWh', 274.4, 'SALA', 'ENERGIA', '2024-04-21', 1, ''),
(3414, 'kWh', 9.44, 'SALA', 'ENERGIA', '2024-04-21', 1, ''),
(3415, 'kWh', 91.62, 'WC', 'ENERGIA', '2024-04-21', 1, ''),
(3416, 'kWh', 409.59, 'SALA', 'ENERGIA', '2024-04-21', 12, ''),
(3417, 'kWh', 134.65, 'WC', 'ENERGIA', '2024-04-21', 12, ''),
(3418, 'm3', 2718, 'CENTRAL', 'AGUA', '2024-04-21', 12, 'Muito quente'),
(3419, 'm3', 707, 'COZINHA', 'AGUA', '2024-04-21', 12, ''),
(3420, 'kWh', 493.15, 'SALA', 'ENERGIA', '2024-04-21', 13, ''),
(3421, 'kWh', 314.75, 'WC', 'ENERGIA', '2024-04-21', 13, ''),
(3422, 'm3', 1768, 'WC', 'AGUA', '2024-04-21', 13, ''),
(3423, 'm3', 4703, 'CENTRAL', 'AGUA', '2024-04-21', 13, ''),
(3424, 'kWh', 360.73, 'SALA', 'ENERGIA', '2024-04-21', 14, ''),
(3425, 'kWh', 290.78, 'WC', 'ENERGIA', '2024-04-21', 14, ''),
(3426, 'kWh', 39.81, 'SALA', 'ENERGIA', '2024-04-22', 0, ''),
(3427, 'kWh', 9.54, 'SALA', 'ENERGIA', '2024-04-22', 0, ''),
(3428, 'kWh', 37.29, 'SALA', 'ENERGIA', '2024-04-22', 1, ''),
(3429, 'kWh', 26.47, 'SALA', 'ENERGIA', '2024-04-22', 22, ''),
(3430, 'kWh', 19.66, 'WC', 'ENERGIA', '2024-04-22', 22, ''),
(3431, 'kWh', 102.84, 'SALA', 'ENERGIA', '2024-04-22', 23, ''),
(3432, 'kWh', 9.64, 'SALA', 'ENERGIA', '2024-04-22', 23, ''),
(3433, 'kWh', 281.25, 'WC', 'ENERGIA', '2024-04-22', 23, ''),
(3434, 'kWh', 9.8, 'SALA', 'ENERGIA', '2024-04-22', 23, ''),
(3435, 'kWh', 38.38, 'WC', 'ENERGIA', '2024-04-23', 0, ''),
(3436, 'kWh', 68.79, 'SALA', 'ENERGIA', '2024-04-23', 0, ''),
(3437, 'kWh', 196.84, 'WC', 'ENERGIA', '2024-04-25', 1, ''),
(3438, 'kWh', 80.99, 'SALA', 'ENERGIA', '2024-04-25', 1, ''),
(3439, 'kWh', 9.51, 'SALA', 'ENERGIA', '2024-04-25', 1, ''),
(3440, 'kWh', 9.66, 'SALA', 'ENERGIA', '2024-04-25', 1, ''),
(3441, 'kWh', 5.3, 'SALA', 'ENERGIA', '2024-04-25', 10, ''),
(3442, 'kWh', 3593.5, 'WC', 'ENERGIA', '2024-04-25', 11, ''),
(3443, 'kWh', 512.64, 'SALA', 'ENERGIA', '2024-04-25', 11, ''),
(3444, 'kWh', 73.11, 'WC', 'ENERGIA', '2024-04-25', 12, ''),
(3445, 'kWh', 164.38, 'SALA', 'ENERGIA', '2024-04-25', 12, ''),
(3446, 'kWh', 359.14, 'SALA', 'ENERGIA', '2024-04-26', 0, ''),
(3447, 'kWh', 18.99, 'SALA', 'ENERGIA', '2024-04-26', 0, ''),
(3448, 'kWh', 56.24, 'WC', 'ENERGIA', '2024-04-26', 0, ''),
(3449, 'kWh', 169.44, 'SALA', 'ENERGIA', '2024-04-27', 12, ''),
(3450, 'kWh', 51.65, 'WC', 'ENERGIA', '2024-04-27', 12, ''),
(3451, 'kWh', 175.3, 'SALA', 'ENERGIA', '2024-04-27', 13, ''),
(3452, 'kWh', 75.58, 'WC', 'ENERGIA', '2024-04-27', 13, ''),
(3453, 'kWh', 51.92, 'SALA', 'ENERGIA', '2024-04-27', 23, ''),
(3454, 'kWh', 19.48, 'SALA', 'ENERGIA', '2024-04-27', 23, ''),
(3455, 'kWh', 19.14, 'SALA', 'ENERGIA', '2024-04-27', 23, ''),
(3456, 'kWh', 1210.29, 'SALA', 'ENERGIA', '2024-04-29', 17, ''),
(3457, 'kWh', 14021.6, 'SALA', 'ENERGIA', '2024-04-29', 18, ''),
(3458, 'kWh', 14.35, 'WC', 'ENERGIA', '2024-04-29', 18, ''),
(3459, 'kWh', 18.51, 'SALA', 'ENERGIA', '2024-04-29', 19, ''),
(3460, 'kWh', 14.54, 'WC', 'ENERGIA', '2024-04-29', 21, ''),
(3461, 'kWh', 25, 'SALA', 'ENERGIA', '2024-04-29', 21, ''),
(3462, 'kWh', 202.37, 'WC', 'ENERGIA', '2024-04-29', 23, ''),
(3463, 'kWh', 119.7, 'SALA', 'ENERGIA', '2024-04-29', 23, ''),
(3464, 'kWh', 127.31, 'WC', 'ENERGIA', '2024-04-30', 0, ''),
(3465, 'kWh', 358.93, 'SALA', 'ENERGIA', '2024-04-30', 0, ''),
(3466, 'kWh', 10.51, 'SALA', 'ENERGIA', '2024-04-30', 1, ''),
(3467, 'kWh', 26.28, 'SALA', 'ENERGIA', '2024-05-03', 1, ''),
(3468, 'kWh', 9.88, 'WC', 'ENERGIA', '2024-05-03', 1, ''),
(3469, 'kWh', 10.58, 'SALA', 'ENERGIA', '2024-05-03', 2, ''),
(3470, 'kWh', 4.91, 'WC', 'ENERGIA', '2024-05-03', 2, ''),
(3471, 'kWh', 79.04, 'SALA', 'ENERGIA', '2024-05-03', 6, ''),
(3472, 'kWh', 48.49, 'WC', 'ENERGIA', '2024-05-03', 6, ''),
(3473, 'm3', 463, 'CENTRAL', 'AGUA', '2024-05-03', 6, 'Normal'),
(3474, 'kWh', 10.57, 'SALA', 'ENERGIA', '2024-05-03', 7, ''),
(3475, 'kWh', 202.3, 'SALA', 'ENERGIA', '2024-05-03', 8, ''),
(3476, 'kWh', 9.21, 'SALA', 'ENERGIA', '2024-05-03', 8, ''),
(3477, 'kWh', 67.15, 'WC', 'ENERGIA', '2024-05-03', 8, ''),
(3478, 'kWh', 105.99, 'SALA', 'ENERGIA', '2024-05-03', 9, ''),
(3479, 'kWh', 34.05, 'WC', 'ENERGIA', '2024-05-03', 9, ''),
(3480, 'kWh', 121.68, 'SALA', 'ENERGIA', '2024-05-04', 22, ''),
(3481, 'kWh', 14.59, 'WC', 'ENERGIA', '2024-05-04', 22, ''),
(3482, 'kWh', 134.1, 'SALA', 'ENERGIA', '2024-05-04', 23, ''),
(3483, 'kWh', 33.8, 'WC', 'ENERGIA', '2024-05-04', 23, ''),
(3484, 'm3', 1738, 'CENTRAL', 'AGUA', '2024-05-04', 23, 'Normal'),
(3485, 'm3', 288, 'CENTRAL', 'AGUA', '2024-05-04', 23, ''),
(3486, 'kWh', 52.98, 'SALA', 'ENERGIA', '2024-05-05', 0, ''),
(3487, 'kWh', 14.29, 'WC', 'ENERGIA', '2024-05-05', 0, ''),
(3489, 'm3', 3621, 'CENTRAL', 'AGUA', '2024-05-05', 0, 'Normal'),
(3490, 'm3', 269, 'CENTRAL', 'AGUA', '2024-05-05', 0, '');

-- --------------------------------------------------------

--
-- Estrutura stand-in para vista `consumo_pagamento`
-- (Veja abaixo para a view atual)
--
CREATE TABLE `consumo_pagamento` (
`consumo_kwh` double
,`pagamento_previsto` double
);

-- --------------------------------------------------------

--
-- Estrutura da tabela `empregado`
--

CREATE TABLE `empregado` (
  `Id` int(11) NOT NULL,
  `Nome` varchar(255) DEFAULT NULL,
  `Idade` int(11) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Foto` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `interruptor`
--

CREATE TABLE `interruptor` (
  `id` int(11) NOT NULL,
  `localizacao` varchar(50) DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `ligado` int(11) DEFAULT 0,
  `ligado_manual` int(11) DEFAULT 0,
  `ligado_apoximidade` int(11) DEFAULT 0,
  `ligado_presenca` int(11) DEFAULT 0,
  `ligado_temperatura_maior` int(11) DEFAULT 1000,
  `ligado_temperatura_menor` int(11) DEFAULT 1000,
  `ligado_temperatura_igual` int(11) DEFAULT 1000,
  `ligado_humidade_maior` int(11) DEFAULT 1000,
  `ligado_humidade_menor` int(11) DEFAULT 1000,
  `ligado_humidade_igual` int(11) DEFAULT 1000,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `interruptor`
--

INSERT INTO `interruptor` (`id`, `localizacao`, `tipo`, `ligado`, `ligado_manual`, `ligado_apoximidade`, `ligado_presenca`, `ligado_temperatura_maior`, `ligado_temperatura_menor`, `ligado_temperatura_igual`, `ligado_humidade_maior`, `ligado_humidade_menor`, `ligado_humidade_igual`, `created_at`) VALUES
(2, 'LAVATÓRIO DO WC', 'ENERGIA', 1, 1, 0, 0, 1000, 1000, 1000, 1000, 1000, 1000, '2024-03-31 22:50:34'),
(3, 'LÂMPADA DO WC', 'ENERGIA', 0, 1, 0, 0, 1000, 1000, 1000, 1000, 1000, 1000, '2024-03-31 22:50:34'),
(4, 'LÂMPADA DA SALA', 'ENERGIA', 0, 0, 0, 0, 1000, 1000, 1000, 1000, 1000, 1000, '2024-03-31 22:50:34'),
(5, 'AR COND. DA SALA', 'AGUA', 0, 0, 0, 0, 1000, 1000, 1000, 1000, 1000, 1000, '2024-03-31 22:50:34');

-- --------------------------------------------------------

--
-- Estrutura da tabela `objetivo`
--

CREATE TABLE `objetivo` (
  `id` int(11) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `ano` int(11) NOT NULL,
  `janeiro` float NOT NULL DEFAULT 0,
  `fevereiro` float NOT NULL DEFAULT 0,
  `marco` float NOT NULL DEFAULT 0,
  `abril` float NOT NULL DEFAULT 0,
  `maio` float NOT NULL DEFAULT 0,
  `junho` float NOT NULL DEFAULT 0,
  `julho` float NOT NULL DEFAULT 0,
  `agosto` float NOT NULL DEFAULT 0,
  `setembro` float NOT NULL DEFAULT 0,
  `outubro` float NOT NULL DEFAULT 0,
  `novembro` float NOT NULL DEFAULT 0,
  `dezembro` float NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `objetivo`
--

INSERT INTO `objetivo` (`id`, `tipo`, `ano`, `janeiro`, `fevereiro`, `marco`, `abril`, `maio`, `junho`, `julho`, `agosto`, `setembro`, `outubro`, `novembro`, `dezembro`) VALUES
(1, 'AGUA', 2024, 25, 40, 40, 40, 40, 35, 20, 20, 20, 20, 20, 30),
(2, 'ENERGIA', 2024, 35, 20, 30, 30, 40, 30, 20, 30, 33, 25, 30, 20),
(3, 'AGUA', 2025, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(4, 'ENERGIA', 2025, 23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `utilizador`
--

CREATE TABLE `utilizador` (
  `Id` int(11) NOT NULL,
  `Nome` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Telemovel` varchar(20) DEFAULT NULL,
  `CodigoPostal` varchar(10) DEFAULT NULL,
  `Morada` varchar(255) DEFAULT NULL,
  `CasaNumero` varchar(10) DEFAULT NULL,
  `OperadoraAgua` varchar(255) DEFAULT NULL,
  `PrecoFixoAgua` float DEFAULT NULL,
  `PrecoAgua` float DEFAULT NULL,
  `OperadoraEnergia` varchar(255) DEFAULT NULL,
  `TarifaEnergia` varchar(50) DEFAULT NULL,
  `PotenciaEnergia` float DEFAULT NULL,
  `PrecoFixoEnergia` float DEFAULT NULL,
  `PrecoP1Energia` float DEFAULT NULL,
  `PrecoP2Energia` float DEFAULT NULL,
  `PrecoP3Energia` float DEFAULT NULL,
  `HorarioDeP1Energia` time DEFAULT NULL,
  `HorarioAteP1Energia` time DEFAULT NULL,
  `HorarioDeP2Energia` time DEFAULT NULL,
  `HorarioAteP2Energia` time DEFAULT NULL,
  `HorarioDeP3Energia` time DEFAULT NULL,
  `HorarioAteP3Energia` time DEFAULT NULL,
  `PalavraPasse` text DEFAULT NULL,
  `Foto` text DEFAULT NULL,
  `CreatedAt` timestamp NULL DEFAULT current_timestamp(),
  `UpdatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `utilizador`
--

INSERT INTO `utilizador` (`Id`, `Nome`, `Email`, `Telemovel`, `CodigoPostal`, `Morada`, `CasaNumero`, `OperadoraAgua`, `PrecoFixoAgua`, `PrecoAgua`, `OperadoraEnergia`, `TarifaEnergia`, `PotenciaEnergia`, `PrecoFixoEnergia`, `PrecoP1Energia`, `PrecoP2Energia`, `PrecoP3Energia`, `HorarioDeP1Energia`, `HorarioAteP1Energia`, `HorarioDeP2Energia`, `HorarioAteP2Energia`, `HorarioDeP3Energia`, `HorarioAteP3Energia`, `PalavraPasse`, `Foto`, `CreatedAt`, `UpdatedAt`) VALUES
(1, 'Paulino Jonas', 'admin', '934968956', '4810-422', 'Braga, Guimarães, Rua Dom João I', '143', 'EPAL - Empresa Portuguesa das Águas Livres', 3.4684, 0.9856, 'EDP - Energias de Portugal', 'Bi-Horária', 4.6, 4.434, 0.2208, 0.1443, 0.1314, '18:00:00', '22:00:00', '08:00:01', '18:00:00', '22:00:01', '08:00:00', '$2a$11$Ru4uQOTPYcrF42iARLVwKuEuSRP30FG1aYjIvz7FufGmTAkxNQ2Cq', '', '2024-03-25 01:24:13', '2024-04-06 13:25:20');

-- --------------------------------------------------------

--
-- Estrutura para vista `consumo_pagamento`
--
DROP TABLE IF EXISTS `consumo_pagamento`;

CREATE ALGORITHM=UNDEFINED DEFINER=`paulinojonaspj`@`%` SQL SECURITY DEFINER VIEW `consumo_pagamento`  AS SELECT sum(`consumo`.`Quantidade`) / 3600 AS `consumo_kwh`, sum(`consumo`.`Quantidade`) / 3600 * 30 AS `pagamento_previsto` FROM `consumo` WHERE `consumo`.`Tipo` = 'ENERGIA' ;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `ambiente`
--
ALTER TABLE `ambiente`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `consumo`
--
ALTER TABLE `consumo`
  ADD PRIMARY KEY (`Id`);

--
-- Índices para tabela `empregado`
--
ALTER TABLE `empregado`
  ADD PRIMARY KEY (`Id`);

--
-- Índices para tabela `interruptor`
--
ALTER TABLE `interruptor`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `objetivo`
--
ALTER TABLE `objetivo`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `utilizador`
--
ALTER TABLE `utilizador`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `ambiente`
--
ALTER TABLE `ambiente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `consumo`
--
ALTER TABLE `consumo`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3491;

--
-- AUTO_INCREMENT de tabela `empregado`
--
ALTER TABLE `empregado`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `interruptor`
--
ALTER TABLE `interruptor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `objetivo`
--
ALTER TABLE `objetivo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `utilizador`
--
ALTER TABLE `utilizador`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
