-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mag 19, 2020 alle 21:03
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
  `data` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `chiusura`
--

INSERT INTO `chiusura` (`id_palestra`, `data`) VALUES
(8, '2020-05-19'),
(8, '2020-05-20');

-- --------------------------------------------------------

--
-- Struttura della tabella `palestra`
--

CREATE TABLE `palestra` (
  `id_palestra` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `indirizzo` varchar(100) NOT NULL,
  `immagine` blob DEFAULT NULL,
  `capacità` int(11) NOT NULL,
  `orario_apertura` time NOT NULL,
  `orario_chiusura` time NOT NULL,
  `giorni_off` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `palestra`
--

INSERT INTO `palestra` (`id_palestra`, `nome`, `indirizzo`, `immagine`, `capacità`, `orario_apertura`, `orario_chiusura`, `giorni_off`) VALUES
(1, 'eraldo@gmail.com', 'aldo', '', 20, '12:00:00', '00:00:00', 2),
(2, 'eralddo@gmail.com', 'alddddo', '', 20, '12:00:00', '00:00:00', 2),
(3, 'eralssddo@gmail.com', 'alddaaddo', '', 20, '12:00:00', '00:00:00', 2),
(4, 'eralssddo@gmail.com', 'aldaadaaddo', '', 20, '12:00:00', '00:00:00', 2),
(5, 'eralssddo@gmail.com', 'aldaadssaaddo', '', 20, '12:00:00', '00:00:00', 2),
(6, 'eralssddo@gmail.com', 'aldaadssaaddo', '', 20, '12:00:00', '00:00:00', 2),
(7, 'eralssddo@gmail.com', 'aldaadssaaddo', '', 20, '12:00:00', '00:00:00', 2),
(8, 'spoleto fitness palestra', 'via tito sinibaldi 18', NULL, 30, '24:00:37', '30:00:37', 2);

-- --------------------------------------------------------

--
-- Struttura della tabella `prenotazione`
--

CREATE TABLE `prenotazione` (
  `id_palestra` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `data` date NOT NULL,
  `orario_inizio` time NOT NULL,
  `orario_fine` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `prenotazione`
--

INSERT INTO `prenotazione` (`id_palestra`, `email`, `data`, `orario_inizio`, `orario_fine`) VALUES
(8, 'eraldo@gmail.com', '2020-05-19', '09:59:51', '20:59:51'),
(8, 'michele@gmail.com', '2020-05-19', '12:00:38', '24:00:38'),
(8, 'michele@gmail.com', '2020-05-20', '09:01:16', '16:01:16');

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
('aldo22@nonso.com', 'aldo', 'rossi', 'eeweq'),
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
  ADD PRIMARY KEY (`id_palestra`,`data`),
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
  MODIFY `id_palestra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
