SELECT * 
FROM post
WHERE iduser=:u;

SELECT score
FROM post
WHERE iduser=$u;

