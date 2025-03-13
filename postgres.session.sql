--task 9
SELECT
    COUNT(id) AS "count",
    role
FROM "Users"
GROUP BY role;

--task 10
UPDATE "Users"
SET balance = balance + sm
FROM 
    (SELECT SUM(prize) * 0.1 AS sm,
            "userId"
     FROM "Contests"
     WHERE status = 'finished' 
       AND "createdAt"::date BETWEEN '2024-12-25' AND '2025-01-14'
     GROUP BY "userId") cs
WHERE "Users".id = cs."userId";

--task 11
UPDATE "Users"
SET balance = balance + 10
FROM 
    (SELECT id
     FROM "Users"
     WHERE role = 'creator'
     ORDER BY rating DESC
     LIMIT 3) t
WHERE "Users".id = t.id;