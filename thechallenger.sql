-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Client :  127.0.0.1
-- Généré le :  Mar 14 Mars 2017 à 22:51
-- Version du serveur :  5.7.14
-- Version de PHP :  5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `thechallenger`
--

-- --------------------------------------------------------

--
-- Structure de la table `challenge`
--

CREATE TABLE `challenge` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `photo` text,
  `datestart` date NOT NULL,
  `datestop` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `challenge`
--

INSERT INTO `challenge` (`id`, `title`, `description`, `photo`, `datestart`, `datestop`) VALUES
(11, 'Light', 'Find a dark place and light it up.', 'light.jpg', '2017-03-11', '2017-03-12'),
(12, 'Little life', 'Show us the unseen.', 'little-life.jpg', '2017-03-11', '2017-03-19'),
(13, 'Future', 'How do you imagine it ?', 'future.jpg', '2017-03-11', '2017-03-19'),
(14, 'Pink', 'Please don\'t post something feminin', 'pink.jpg', '2017-03-14', '2017-03-21'),
(15, 'Monkey', 'Because we are all monkeys', 'monkey.jpg', '2017-01-24', '2017-02-08'),
(16, 'Dream is my reality', 'The only kind of real fantasy', 'dream.jpg', '2017-03-01', '2017-03-07'),
(17, 'We are stardust', 'Let\'s travel in time', 'stradust.jpg', '2016-11-16', '2016-12-22');

-- --------------------------------------------------------

--
-- Structure de la table `follow`
--

CREATE TABLE `follow` (
  `id` int(11) NOT NULL,
  `idfollower` int(11) NOT NULL,
  `idfollowed` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `follow`
--

INSERT INTO `follow` (`id`, `idfollower`, `idfollowed`) VALUES
(1, 10, 12),
(2, 10, 11),
(3, 11, 12),
(4, 9, 12),
(5, 7, 12),
(6, 8, 9),
(7, 8, 10),
(8, 8, 11),
(9, 8, 12),
(10, 8, 13),
(11, 8, 14),
(12, 9, 10),
(13, 10, 8),
(14, 10, 9),
(15, 11, 13),
(16, 12, 11),
(17, 12, 1),
(18, 12, 13),
(19, 14, 12),
(25, 12, 14);

-- --------------------------------------------------------

--
-- Structure de la table `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `state` int(2) NOT NULL,
  `type` int(3) NOT NULL,
  `hd` int(11) NOT NULL,
  `linkcontent` text NOT NULL,
  `description` varchar(250) NOT NULL,
  `tag` text,
  `winner` int(3) NOT NULL,
  `score` int(20) NOT NULL,
  `datepost` date NOT NULL,
  `iduser` int(11) NOT NULL,
  `idchallenge` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `post`
--

INSERT INTO `post` (`id`, `title`, `state`, `type`, `hd`, `linkcontent`, `description`, `tag`, `winner`, `score`, `datepost`, `iduser`, `idchallenge`) VALUES
(4, 'City ', 0, 1, 0, '1489231644.jpg', 'taken with my iphone :$\r\n', 'photograph', 1, 4, '2017-03-11', 14, 11),
(5, 'p i z z a * * ', 0, 1, 1, '1489231788.jpg', 'omg i did it myself', 'photograph', 0, 3, '2017-03-11', 14, 12),
(6, 'SKY', 0, 1, 1, '1489232276.jpg', 'WE ARE THE LITTLE ONES', 'photograph', 0, 3, '2017-03-11', 11, 11),
(8, 'Copernic', 0, 1, 0, '1489256559.png', 'But it\'s not for today', 'photograph', 0, 1, '2017-03-11', 8, 13),
(9, 'Future', 0, 1, 1, '1489259397.jpg', 'Nayvadius DeMun ', 'photograph', 0, 2, '2017-03-11', 9, 13),
(10, 'Hand', 0, 1, 0, '1489259487.jpg', 'Human and Technology', NULL, 0, 1, '2017-03-11', 10, 13),
(11, 'Futureman', 0, 1, 0, '1489259728.jpg', 'What will look like Man in 1000 years ?', NULL, 0, 3, '2017-03-11', 11, 13),
(12, 'Evolution', 0, 1, 0, '1489259785.jpg', 'Like a robot', NULL, 0, 2, '2017-03-11', 12, 13),
(13, 'Mars', 0, 1, 0, '1489259928.png', 'The conquest of Mars', NULL, 0, 3, '2017-03-11', 13, 13),
(14, 'Ikea\'s table', 0, 1, 1, '1489260060.jpg', '"Give me the salt please"', NULL, 0, 3, '2017-03-11', 14, 13),
(15, 'Technology', 0, 1, 0, '1489260102.jpg', 'All is about technolgy', NULL, 0, 1, '2017-03-11', 4, 13),
(16, 'Eiffel Tower', 0, 1, 1, '1489260184.jpg', 'Let\'s be pessimistic', NULL, 0, 2, '2017-03-11', 5, 13),
(17, 'Green city', 0, 1, 1, '1489260389.jpg', '"Paris est magique"', NULL, 0, 2, '2017-03-11', 9, 13),
(18, 'Acarien', 0, 1, 0, '1489260704.jpg', 'It itches', NULL, 0, 2, '2017-03-11', 8, 12),
(19, 'Atomes', 0, 1, 0, '1489260858.png', 'Atom looks like candy', NULL, 0, 3, '2017-03-11', 9, 12),
(20, 'Criquet', 0, 1, 0, '1489261051.jpg', 'Hello world', NULL, 0, 2, '2017-03-11', 10, 12),
(21, 'A drop', 0, 1, 0, '1489261125.jpg', '"Drop it like it\'s hot"', NULL, 1, 4, '2017-03-11', 11, 12),
(22, 'What is that ?', 0, 1, 0, '1489261257.jpg', 'The carapace of the Cetonia aurata', NULL, 1, 4, '2017-03-11', 12, 12),
(23, 'Beautiful fish', 0, 1, 0, '1489261387.jpg', '"Fukushima my love"', NULL, 1, 4, '2017-03-11', 13, 12),
(24, 'City Dove', 0, 1, 0, '1489435516.jpg', 'I\'m like so proud of myself I can\'t even', 'image', 0, 0, '2017-03-13', 12, 11),
(25, 'Little Life', 0, 1, 0, '1489261603.jpg', '', NULL, 0, 4, '2017-03-11', 14, 12),
(26, 'Inside plastic', 0, 1, 0, '1489261652.jpg', '', NULL, 0, 2, '2017-03-11', 4, 12),
(27, ' ', 0, 1, 1, '1489261698.jpg', '', NULL, 0, 2, '2017-03-11', 5, 12),
(28, ' Vinyl', 0, 1, 0, '1489261754.jpg', 'Microscopic', NULL, 0, 2, '2017-03-11', 9, 11),
(29, 'Amsterdam', 0, 1, 1, '1489261803.jpeg', '', NULL, 0, 2, '2017-03-11', 9, 11),
(30, 'Amsterdam', 0, 1, 1, '1489261833.jpeg', '', NULL, 0, 1, '2017-03-11', 9, 11),
(31, 'Jellyfish', 0, 1, 0, '1489261926.jpg', '', NULL, 0, 0, '2017-03-11', 9, 11),
(32, 'Candles', 0, 1, 1, '1489261994.jpg', '', NULL, 0, 0, '2017-03-11', 9, 11),
(33, ' ', 0, 1, 0, '1489262017.jpg', '', NULL, 0, 0, '2017-03-11', 9, 11),
(34, ' ', 0, 1, 0, '1489262029.jpeg', '', NULL, 0, 0, '2017-03-11', 9, 11),
(35, 'Spotlight', 0, 1, 0, '1489262103.jpg', '', NULL, 0, 0, '2017-03-11', 9, 11),
(36, 'Timelapse', 0, 1, 1, '1489262463.jpg', '', NULL, 0, 0, '2017-03-11', 9, 11),
(37, 'Bike', 0, 1, 1, '1489262568.jpeg', '', NULL, 0, 0, '2017-03-11', 9, 11),
(41, 'UNTITLED', 0, 1, 0, '1489529854.jpg', 'i just wanna burn in hell...', 'image', 0, 0, '2017-03-14', 14, 11);

-- --------------------------------------------------------

--
-- Structure de la table `score`
--

CREATE TABLE `score` (
  `id` int(11) NOT NULL,
  `iduser` int(11) NOT NULL,
  `idpost` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `score`
--

INSERT INTO `score` (`id`, `iduser`, `idpost`) VALUES
(1, 11, 6),
(3, 8, 4),
(4, 8, 5),
(5, 8, 6),
(6, 8, 7),
(7, 8, 8),
(8, 8, 9),
(9, 8, 10),
(10, 8, 11),
(11, 8, 1),
(12, 8, 12),
(13, 8, 13),
(14, 8, 14),
(15, 8, 15),
(16, 8, 16),
(17, 8, 17),
(18, 8, 18),
(19, 8, 19),
(20, 8, 20),
(21, 8, 21),
(22, 8, 22),
(23, 8, 23),
(24, 8, 24),
(25, 8, 25),
(26, 8, 26),
(27, 8, 27),
(28, 8, 28),
(29, 8, 29),
(30, 8, 30),
(31, 9, 18),
(32, 9, 19),
(33, 9, 20),
(34, 9, 21),
(35, 9, 22),
(36, 9, 23),
(37, 9, 24),
(38, 9, 25),
(39, 9, 26),
(40, 9, 27),
(41, 10, 29),
(42, 10, 28),
(43, 10, 19),
(44, 10, 9),
(45, 11, 22),
(46, 11, 23),
(47, 11, 12),
(48, 11, 13),
(49, 11, 11),
(50, 11, 4),
(51, 12, 23),
(52, 12, 25),
(53, 12, 21),
(54, 12, 14),
(55, 12, 13),
(56, 12, 11),
(57, 12, 6),
(58, 12, 5),
(59, 12, 4),
(60, 13, 21),
(61, 13, 22),
(62, 13, 16),
(63, 13, 17),
(64, 14, 4),
(65, 14, 5),
(66, 14, 14),
(67, 14, 25);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `rank` int(10) NOT NULL,
  `name` varchar(40) NOT NULL,
  `pwd` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `keyactive` varchar(255) NOT NULL,
  `isActive` int(2) DEFAULT NULL,
  `registerdate` varchar(200) NOT NULL,
  `birthdate` date DEFAULT NULL,
  `cptwarnings` int(3) DEFAULT NULL,
  `photo` text,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id`, `rank`, `name`, `pwd`, `email`, `keyactive`, `isActive`, `registerdate`, `birthdate`, `cptwarnings`, `photo`, `description`) VALUES
(4, 1, 'yorka', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', 'test@test.com', 'e0c70ab1fa346e1a16493915ede279e7748bce27', 0, '06 03 2017', '0000-00-00', 0, 'pp.jpg', 'trop high'),
(5, 2, 'laure', '530226d0f0a4ce262450ab17e0ed44a90a529e6d', 'laureisssa@gmail.com', 'c4ebba6a50d3a6ab020b700e18e407772e1500bb', 0, '08 03 2017', NULL, 0, 'pp.jpg', ''),
(8, 2, 'Michel', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', 'user1@test.com', 'd6acb1367a5b2266aecf7675439f9f21e9e75061', NULL, '10 03 2017', NULL, 0, 'michou.jpg', 'photographe professionnel'),
(9, 2, 'Mickey', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', 'user2@test.com', '9f3c81854848cf3b39664a7dfa56b76fe707f2ba', NULL, '10 03 2017', NULL, 0, 'mickey.jpg', 'already taken sorry'),
(10, 2, 'Lorie', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', 'user3@test.com', '707e24e7e1d87705735ecde61e1c39748aa7e525', NULL, '10 03 2017', NULL, 0, 'lolo.jpg', 'ARTIST'),
(11, 2, 'Flavie', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', 'user4@test.com', 'f39bc6b61b1a16f5fcefa67e5fd4a5168726bbcf', NULL, '10 03 2017', NULL, 0, 'flavie.jpg', 'I\'m judging you'),
(12, 2, 'Marie-Lou', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', 'user5@test.com', 'e62462149e6939900c9ddeb101aeedce4f14cb14', NULL, '10 03 2017', NULL, 0, 'ml.jpg', 's p a c e * '),
(13, 2, 'Matthieu', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', 'user6@test.com', '5fe84fc5740e748c9199d58fa191201ecb4c2ea9', NULL, '10 03 2017', NULL, 0, 'matthieu.jpg', 'Frontend developper'),
(14, 2, 'd4rk girl', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', 'dark@test.com', 'a5c407278ab0fd2740741899799fbf3ab4b6f283', NULL, '11 03 2017', NULL, 0, 'pullthetrigger.jpg', 'Too dark for you'),
(18, 3, 'admin', 'd033e22ae348aeb5660fc2140aec35850c4da997', 'admin@admin.com', 'd85b51717d5c746dd3a7dfe76d5c87a531e49991', NULL, '13 03 2017', NULL, 0, 'pp.jpg', 'Watch out');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `challenge`
--
ALTER TABLE `challenge`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `follow`
--
ALTER TABLE `follow`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `score`
--
ALTER TABLE `score`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `challenge`
--
ALTER TABLE `challenge`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT pour la table `follow`
--
ALTER TABLE `follow`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT pour la table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
--
-- AUTO_INCREMENT pour la table `score`
--
ALTER TABLE `score`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
