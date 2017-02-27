/*pour ajouter un fichier dans le git:
- git add -A pour tout mettre ou git add nomfichier pour un fichier spécifique 
- git commit -m "message"
- git push*/

SELECT * 
FROM post
WHERE iduser=:u;

SELECT score
FROM post
WHERE iduser=:u;




