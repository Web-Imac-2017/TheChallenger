/*pour ajouter un fichier dans le git:
- git add -A pour tout mettre ou git add nomfichier pour un fichier spécifique 
- git commit -m "message"
- git push*/

/* requetes post */

SELECT * 
FROM post
WHERE iduser=:u;


SELECT score 
FROM post
WHERE iduser=:u;

		/* le challenge correspondant, l'image, le nom du user, les tags du post en fonction de l'id du post */

		/*SELECT * 
		FROM thechallenger.post
		WHERE iduser=:u;

		 Nombre de like 

		SELECT score
		FROM thechallenger.post
		WHERE iduser=:u;*/

		/* requetes challenge 

		/* Compte les followed */

		/*SELECT count (*)
		FROM thechallenger.follow
		WHERE idfollowed=:u;*/

		/* Compte les follower */

		/*SELECT count (*)
		FROM thechallenger.follow
		WHERE idfollower=:u;*/

		/* Compte les post */

		/*SELECT count (*)
		FROM thechallenger.post
		WHERE iduser=:u;*/


/* requetes challenge */


/* requetes user */
