--task 9
SELECT
    COUNT(id) AS "count",
    role
FROM "users"
GROUP BY role;

--task 10
UPDATE "users"
SET balance = balance + sm
FROM 
    (SELECT SUM(prize) * 0.1 AS sm,
            "userid"
     FROM "contests"
     WHERE status = 'finished' 
       AND "createdat"::date BETWEEN '2024-08-25' AND '2024-08-26'
     GROUP BY "userid") cs
WHERE "users".id = cs."userid";

--task 11
UPDATE "users"
SET balance = balance + 10
FROM 
    (SELECT id
     FROM "users"
     WHERE role = 'creator'
     ORDER BY rating DESC
     LIMIT 3) t
WHERE "users".id = t.id;