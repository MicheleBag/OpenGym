-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mag 23, 2020 alle 21:10
-- Versione del server: 10.4.11-MariaDB
-- Versione PHP: 7.2.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `opengym`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `chiusura`
--

CREATE TABLE `chiusura` (
  `id_palestra` int(11) NOT NULL,
  `days_off` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `chiusura`
--

INSERT INTO `chiusura` (`id_palestra`, `days_off`) VALUES
(9, 0),
(9, 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `palestra`
--

CREATE TABLE `palestra` (
  `id_palestra` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `indirizzo` varchar(100) NOT NULL,
  `città` varchar(100) NOT NULL,
  `immagine` blob DEFAULT NULL,
  `capacità` int(11) NOT NULL,
  `orario_apertura` time NOT NULL,
  `orario_chiusura` time NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `palestra`
--

INSERT INTO `palestra` (`id_palestra`, `nome`, `indirizzo`, `città`, `immagine`, `capacità`, `orario_apertura`, `orario_chiusura`, `email`, `password`, `active`) VALUES
(1, 'eraldo@gmail.com', 'aldo', '', '', 20, '12:00:00', '00:00:00', '', '', 0),
(2, 'eralddo@gmail.com', 'alddddo', '', '', 20, '12:00:00', '00:00:00', '', '', 1),
(3, 'eralssddo@gmail.com', 'alddaaddo', '', '', 20, '12:00:00', '00:00:00', '', '', 1),
(4, 'eralssddo@gmail.com', 'aldaadaaddo', '', '', 20, '12:00:00', '00:00:00', '', '', 1),
(5, 'eralssddo@gmail.com', 'aldaadssaaddo', '', '', 20, '12:00:00', '00:00:00', '', '', 1),
(6, 'eralssddo@gmail.com', 'aldaadssaaddo', '', '', 20, '12:00:00', '00:00:00', '', '', 1),
(7, 'eralssddo@gmail.com', 'aldaadssaaddo', '', '', 20, '12:00:00', '00:00:00', '', '', 1),
(8, 'spoleto fitness palestra', 'via tito sinibaldi 18', '', NULL, 30, '24:00:37', '30:00:37', '', '', 1),
(9, 'terni fit', 'via giacomo reggiani', '', NULL, 1, '09:25:00', '20:10:00', '', '', 1),
(10, 'palest', 'spoleto', '', NULL, 34, '09:59:00', '20:10:00', '', '', 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `prenotazione`
--

CREATE TABLE `prenotazione` (
  `id_palestra` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `data` datetime NOT NULL,
  `orario_inizio` time NOT NULL,
  `orario_fine` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `prenotazione`
--

INSERT INTO `prenotazione` (`id_palestra`, `email`, `data`, `orario_inizio`, `orario_fine`) VALUES
(9, 'aldo@nonso.com', '2020-05-23 00:00:00', '09:25:00', '10:25:00'),
(9, 'aldtre3o22@nrerronso.com', '2020-05-23 00:00:00', '13:07:59', '18:09:34'),
(9, 'eraldo', '0000-00-00 00:00:00', '09:00:00', '21:00:00'),
(9, 'eraldo', '2001-05-02 00:00:00', '09:25:00', '10:25:00'),
(9, 'eraldo', '2020-02-06 00:00:00', '09:00:00', '21:00:00'),
(9, 'eraldo', '2020-06-25 00:00:00', '09:25:00', '10:25:00'),
(9, 'eraldo', '2020-06-29 00:00:00', '09:25:00', '10:25:00'),
(9, 'eraldo', '2020-07-06 00:00:00', '09:00:00', '21:00:00'),
(9, 'michele@gmail.com', '2020-05-23 00:00:00', '09:25:00', '10:25:00');

-- --------------------------------------------------------

--
-- Struttura della tabella `utente`
--

CREATE TABLE `utente` (
  `email` varchar(100) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `cognome` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `utente`
--

INSERT INTO `utente` (`email`, `nome`, `cognome`, `password`) VALUES
('aldo22@nonso.com', 'giovanni', 'troisi', '44'),
('aldo@nonso.com', 'edsad', 'kfdsfa', 'sdasfas'),
('aldtre3o22@nrerronso.com', 'aldo', 'rossi', 'eeweq'),
('eraldo', 'edsad', 'kfdsfa', 'sdasfas'),
('eraldo@gmail.com', 'eraldo', 'marku', 'aldo'),
('michele@gmail.com', 'michele', 'baglioni', 'bho');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `chiusura`
--
ALTER TABLE `chiusura`
  ADD PRIMARY KEY (`id_palestra`,`days_off`),
  ADD KEY `id_palestra` (`id_palestra`);

--
-- Indici per le tabelle `palestra`
--
ALTER TABLE `palestra`
  ADD PRIMARY KEY (`id_palestra`);

--
-- Indici per le tabelle `prenotazione`
--
ALTER TABLE `prenotazione`
  ADD PRIMARY KEY (`id_palestra`,`email`,`data`),
  ADD KEY `id_palestra` (`id_palestra`),
  ADD KEY `email` (`email`);

--
-- Indici per le tabelle `utente`
--
ALTER TABLE `utente`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `palestra`
--
ALTER TABLE `palestra`
  MODIFY `id_palestra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `chiusura`
--
ALTER TABLE `chiusura`
  ADD CONSTRAINT `chiusura_ibfk_1` FOREIGN KEY (`id_palestra`) REFERENCES `palestra` (`id_palestra`) ON DELETE CASCADE;

--
-- Limiti per la tabella `prenotazione`
--
ALTER TABLE `prenotazione`
  ADD CONSTRAINT `prenotazione_ibfk_1` FOREIGN KEY (`id_palestra`) REFERENCES `palestra` (`id_palestra`) ON DELETE CASCADE,
  ADD CONSTRAINT `prenotazione_ibfk_2` FOREIGN KEY (`email`) REFERENCES `utente` (`email`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
