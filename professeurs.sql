-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 26, 2025 at 04:43 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `polytechdle`
--

-- --------------------------------------------------------

--
-- Table structure for table `professeurs`
--

CREATE TABLE `professeurs` (
  `nom` varchar(128) NOT NULL,
  `prenom` varchar(128) NOT NULL,
  `laris` tinyint(1) NOT NULL,
  `age` int(11) NOT NULL,
  `specialite` varchar(128) NOT NULL,
  `univ_etudes` varchar(128) NOT NULL,
  `annee_phd` int(11) NOT NULL,
  `statut` varchar(256) NOT NULL,
  `sujet_these` varchar(1024) NOT NULL,
  `photo` varchar(2048) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Infos sur les profs';

--
-- Dumping data for table `professeurs`
--

INSERT INTO `professeurs` (`nom`, `prenom`, `laris`, `age`, `specialite`, `univ_etudes`, `annee_phd`, `statut`, `sujet_these`, `photo`) VALUES
('Lhommeau', 'Mehdi', 1, 49, 'SAGI', 'Angers', 2003, 'Professeur / HDR', '', 'https://perso-laris.univ-angers.fr/~lhommeau/photo2.jpg'),
('Hardouin', 'Laurent', 1, 57, 'SAGI', 'Poitiers', 1993, 'HDR', 'Une méthode originale de contrôle actif des bruits d’écoulements pulsés : Étude d’un actionneur modélisation et commande adaptative du système', 'blob:https://www.ecosia.org/f1e1fb77-5f54-4ef0-be96-c488b72da956'),
('Cottenceau', 'Bertrand', 1, 0, 'SAGI', 'Angers', 1999, 'Habilitation à Diriger des Recherches', 'Contribution à la commande des systèmes à événements discrets : synthèse de correcteurs pour les graphes d’événements temporisés dans les diodes.', 'http://perso-laris.univ-angers.fr/~cottenceau/bcottenceau.png'),
('Autrique', 'Laurent', 1, 0, 'SAGI', 'Nantes', 1993, 'Professeur', 'Optimisation de systèmes à paramètres répartis : une approche stochastique pour l’automatique', 'http://perso-laris.univ-angers.fr/~autrique/images/PhotoLA.png'),
('Perez', 'Laetitia', 1, 0, 'SAGI', '', 0, 'Maître de Conférences / HDR', '', 'https://tse2.mm.bing.net/th?id=OIP.0sF-fFXTbAkGzG8LC0Z18QHaHa&pid=Api'),
('Al Hasan', 'Hasan', 1, 0, 'QIF', 'Angers', 2019, 'Maître de Conférence', 'Ordonnancement de blocs opératoires avec prise en compte des contraintes de stérilisation des instruments chirurgicaux', 'https://laris.univ-angers.fr/_resource/hasan_rond.gif'),
('Boimond', 'Jean-Louis', 0, 0, 'SAGI', 'Lyon', 1990, 'Professeur', 'Commande à modèle interne en représentation d’état. : Problèmes de synthèse d’algorithme de commande', 'http://perso-laris.univ-angers.fr/~boimond/index_fichiers/image001.gif'),
('Chatti', 'Nizar', 1, 40, 'QIF/SAGI', 'Lille', 2013, 'Maître de Conférences', 'Contribution à la supervision des systèmes dynamiques à base des bond graph signés', 'http://perso-laris.univ-angers.fr/~nizar.chatti/res/images/nizar.png'),
('Declerck', 'Philippe', 1, 0, 'SAGI', '', 1991, 'Maître de Conférences / HDR', 'Analyse structurale et fonctionnelle des grands systèmes : applications à une centrale PWR 900 MW', 'http://perso-laris.univ-angers.fr/~declerck/Philippe%2005-01-07\'.jpg'),
('Grimault', 'Axel', 1, 0, 'IUT', 'Nantes', 2016, 'Maître de Conférences', 'Optimisation de tournées de camions complets dans le secteur des travaux publics', 'https://biblik.github.io/images/me.jpg'),
('Gueret', 'Christelle', 1, 0, 'IUT', 'Compiègne', 1997, 'Professeur / HDR', 'Problèmes d’ordonnancement sans contraintes de précédence', 'http://perso-laris.univ-angers.fr/~gueret/images/christelle.png'),
('Guyonneau', 'Remy', 1, 0, 'SAGI', 'Angers', 2013, 'Maître de Conférences', 'Méthodes ensemblistes pour la localisation en robotique mobile', 'http://perso-laris.univ-angers.fr/~r.guyonneau/images/RemyGuyonneau.png'),
('Jolly', 'Jean-Claude', 1, 0, 'PEIP', 'Angers', 2001, 'Maître de Conférences', 'Solutions mémorphes sur C des systèmes d’au moins deux équations aux différences à coefficients constants et à deux pas récurrents (première partie)Solutions à [epsilon] près de systèmes d’équations aux dérivées partielles non linéaires de type mixte posés sur des ouverts non bornés (deuxième partie)', 'https://laris.univ-angers.fr/_resource/jolly_rond.jpg'),
('Lahaye', 'Sébastien', 1, 51, 'SAGI', 'Angers', 2018, 'Professeur', 'Comprendre les grands feux de forêt pour lutter en sécurité', 'blob:https://www.ecosia.org/aa2615c1-960c-4592-8e1f-acadd5243c20'),
('Daviaud', 'Bérangère', 1, 0, 'SAGI', 'Angers', 2024, 'Attaché Temporaire à l’Enseignement et à la Recherche', 'Méthodes formelles pour les systèmes réactifs, applications au live coding', ''),
('Guegnard', 'Frédéric', 1, 0, 'SAGI', '', 2000, 'Maître de Conférences', 'Caractérisation polynomiale des processus séquentiels', ''),
('Lagrange', 'Sébastien', 1, 0, 'PEIP/SAGI', 'Nantes', 2005, 'Maître de Conférences', 'Contributions aux méthodes d’estimation en aveugle.', 'http://perso-laris.univ-angers.fr/~lagrange/index.php');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
