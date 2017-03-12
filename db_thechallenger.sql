-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Client :  127.0.0.1
-- Généré le :  Sam 11 Mars 2017 à 11:42
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
  `datestart` date NOT NULL,
  `datestop` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `challenge`
--

INSERT INTO `challenge` (`id`, `title`, `description`, `datestart`, `datestop`) VALUES
(11, 'Light', 'Find a dark place and light it up.', '2017-03-11', '2017-03-19'),
(12, 'Little life', 'Show us the unseen.', '2017-03-11', '2017-03-19'),
(13, 'Future', 'How do you imagine it ?', '2017-03-11', '2017-03-19');

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
(5, 7, 12);

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
  `winner` int(3) NOT NULL,
  `score` int(20) NOT NULL,
  `datepost` date NOT NULL,
  `iduser` int(11) NOT NULL,
  `idchallenge` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `post`
--

INSERT INTO `post` (`id`, `title`, `state`, `type`, `hd`, `linkcontent`, `description`, `winner`, `score`, `datepost`, `iduser`, `idchallenge`) VALUES
(1, 'image1', 0, 0, 1, 'background.jpg', '0', 1, 0, '2011-01-01', 12, 4),
(3, 'balec', 0, 0, 1, 'background.jpg', 'ah', 1, 3, '2016-01-01', 12, 4),
(4, 'City ', 0, 1, 0, '1489231644.jpg', 'taken with my iphone :$\r\n', 0, 0, '2017-03-11', 14, 11),
(5, 'p i z z a * * ', 0, 1, 1, '1489231788.jpg', 'omg i did it myself', 0, 0, '2017-03-11', 14, 12),
(6, 'SKY', 0, 1, 1, '1489232276.jpg', 'WE ARE THE LITTLE ONES', 0, 1, '2017-03-11', 11, 11);

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
(1, 11, 6);

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
  `cptwarnings` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id`, `rank`, `name`, `pwd`, `email`, `keyactive`, `isActive`, `registerdate`, `birthdate`, `cptwarnings`) VALUES
(4, 1, 'yorka', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', 'test@test.com', 'e0c70ab1fa346e1a16493915ede279e7748bce27', 0, '06 03 2017', '0000-00-00', 0),
(5, 2, 'laure', '530226d0f0a4ce262450ab17e0ed44a90a529e6d', 'laureisssa@gmail.com', 'c4ebba6a50d3a6ab020b700e18e407772e1500bb', 0, '08 03 2017', NULL, 0),
(8, 2, 'Michel', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', 'user1@test.com', 'd6acb1367a5b2266aecf7675439f9f21e9e75061', NULL, '10 03 2017', NULL, 0),
(9, 2, 'Mickey', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', 'user2@test.com', '9f3c81854848cf3b39664a7dfa56b76fe707f2ba', NULL, '10 03 2017', NULL, 0),
(10, 2, 'Lorie', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', 'user3@test.com', '707e24e7e1d87705735ecde61e1c39748aa7e525', NULL, '10 03 2017', NULL, 0),
(11, 2, 'Flavie', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', 'user4@test.com', 'f39bc6b61b1a16f5fcefa67e5fd4a5168726bbcf', NULL, '10 03 2017', NULL, 0),
(12, 2, 'Marie-Lou', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', 'user5@test.com', 'e62462149e6939900c9ddeb101aeedce4f14cb14', NULL, '10 03 2017', NULL, 0),
(13, 2, 'Matthieu', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', 'user6@test.com', '5fe84fc5740e748c9199d58fa191201ecb4c2ea9', NULL, '10 03 2017', NULL, 0),
(14, 2, 'd4rk girl', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', 'dark@test.com', 'a5c407278ab0fd2740741899799fbf3ab4b6f283', NULL, '11 03 2017', NULL, 0);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT pour la table `follow`
--
ALTER TABLE `follow`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT pour la table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT pour la table `score`
--
ALTER TABLE `score`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
