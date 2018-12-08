INSERT INTO `allsponsored`.`sponsor` (`id`, `name`) VALUES ('1', 'Credit Agricole');
INSERT INTO `allsponsored`.`sponsor` (`id`, `name`) VALUES ('2', 'Societe General');
INSERT INTO `allsponsored`.`sponsor` (`id`, `name`) VALUES ('3', 'Banque Populaire');

INSERT INTO `allsponsored`.`user` (`id`, `last_name`, `first_name`, `email`, `status`, `role`, `password`) VALUES ('1', 'Lucereau', 'Steven', 'stevens.lucereau@allsponsored.com ', 'active', 'admin', '12345');

INSERT INTO `allsponsored`.`project` (`id`, `user_id`, `name`, `status`, `visual_shirt`) VALUES ('2', '1', 'CA 10 Parkas', 'active', 'https://www.google.fr/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjgkMfjk47fAhVOzRoKHXB3Bw8QjRx6BAgBEAU&url=https%3A%2F%2Fwww.footkorner.com%2Fveste-nike-windrunner-enfant-equipe-de-france-bleu-cdm18&psig=AOvVaw0-Jeif3aOu0ytn2QqigQsA&ust=1544287059500349');
INSERT INTO `allsponsored`.`project` (`id`, `user_id`, `name`, `status`, `visual_shirt`) VALUES ('1', '1', 'CA 50 Maillots', 'active', 'https://www.google.fr/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjS3O34kY7fAhULtRoKHTdODr0QjRx6BAgBEAU&url=https%3A%2F%2Fmaillotequipedefrance2018.com%2Fensemble-equipe-de-france-enfant-exterieur-2015.html&psig=AOvVaw1Hz1EY9KZFrVKxChluF1WO&ust=1544286560060573');
