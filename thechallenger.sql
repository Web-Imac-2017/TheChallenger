-- phpMyAdmin SQL Dump
-- version 4.2.5
-- http://www.phpmyadmin.net
--
-- Client :  localhost:8889
-- Généré le :  Mer 08 Mars 2017 à 09:26
-- Version du serveur :  5.5.38
-- Version de PHP :  5.5.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `follow`
--

CREATE TABLE `follow` (
`id` int(11) NOT NULL,
  `idfollower` int(11) NOT NULL,
  `idfollowed` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `score`
--

CREATE TABLE `score` (
`id` int(11) NOT NULL,
  `iduser` int(11) NOT NULL,
  `idpost` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

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
  `photo` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `keyactive` varchar(255) NOT NULL,
  `registerdate` varchar(200) NOT NULL,
  `birthdate` date NOT NULL,
  `cptwarnings` int(3) DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id`, `rank`, `name`, `pwd`, `email`, `photo`, `description`, `keyactive`, `registerdate`, `birthdate`, `cptwarnings`) VALUES
(3, 2, 'test', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', 'quentin54.louis@laposte.net', '', '', 'f0dd85e6e386ef55a82cf4ef62254ff3396d35cd', '06 03 2017', '0000-00-00', 0),
(4, 1, 'yorka', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', 'test@test.com', '', '', 'e0c70ab1fa346e1a16493915ede279e7748bce27', '06 03 2017', '0000-00-00', 0),
(5, 1, 'fdslfksld', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', 'dlkfsdlk@flkdflkdf.com', '', '', '794fb554c126c74b005460ba27597946272db172', '06 03 2017', '0000-00-00', 0),
(6, 1, 'dsflsm', '752c14ea195c460bac3c3b7896975ee9fd15eeb7', 'psododslq@ldfljkdhfsh.com', '', '', '8dbcefe7635c8600fecefc49ff83ede1d45292cf', '06 03 2017', '0000-00-00', 0);

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
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `follow`
--
ALTER TABLE `follow`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `post`
--
ALTER TABLE `post`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `score`
--
ALTER TABLE `score`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
