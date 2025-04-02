-- task 9
SELECT
    COUNT(id) AS "count",
    role
FROM "Users"
GROUP BY role;

-- task 10
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

-- task 11
UPDATE "Users"
SET balance = balance + 10
FROM 
    (SELECT id
     FROM "Users"
     WHERE role = 'creator'
     ORDER BY rating DESC
     LIMIT 3) t
WHERE "Users".id = t.id;

----------------------------------------------------------------------

-- Migration from MongoDB to PostgreSQL

-- Таблица Conversations
CREATE TABLE "Conversations" (
    "id" SERIAL PRIMARY KEY,
    "participants" INTEGER[] NOT NULL,
    "blackList" BOOLEAN[] NOT NULL,
    "favoriteList" BOOLEAN[] NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Таблица Messages
CREATE TABLE "Messages" (
    "id" SERIAL PRIMARY KEY,
    "sender" INTEGER NOT NULL,
    "body" VARCHAR(255) NOT NULL,
    "conversationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    FOREIGN KEY ("conversationId") REFERENCES "Conversations"("id")
);

-- Создание нового чата
INSERT INTO "Conversations" ("participants", "blackList", "favoriteList", "createdAt", "updatedAt")
VALUES (ARRAY[1, 2], ARRAY[false, false], ARRAY[false, false], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
RETURNING *;

-- Получение чата по ID
SELECT * FROM "Conversations" WHERE id = 1;

-- Получение всех чатов пользователя
SELECT * FROM "Conversations" 
WHERE 1 = ANY(participants);

-- Обновление статуса в черном списке
UPDATE "Conversations"
SET "blackList" = ARRAY[true, false]
WHERE id = 1;

-- Обновление статуса в избранном
UPDATE "Conversations"
SET "favoriteList" = ARRAY[true, false]
WHERE id = 1;

-- Создание нового сообщения
INSERT INTO "Messages" ("sender", "body", "conversationId", "createdAt", "updatedAt")
VALUES (1, 'Привет!', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
RETURNING *;

-- Получение всех сообщений чата
SELECT * FROM "Messages" 
WHERE "conversationId" = 1 
ORDER BY "createdAt" ASC;

-- Получение последнего сообщения в чате
SELECT * FROM "Messages"
WHERE "conversationId" = 1
ORDER BY "createdAt" DESC
LIMIT 1;

-- Получение всех чатов с последними сообщениями
SELECT c.*, m.*
FROM "Conversations" c
LEFT JOIN LATERAL (
    SELECT *
    FROM "Messages"
    WHERE "conversationId" = c.id
    ORDER BY "createdAt" DESC
    LIMIT 1
) m ON true
WHERE 1 = ANY(c.participants);

-- Удаление сообщения
DELETE FROM "Messages" WHERE id = 1;

-- Удаление чата (сначала нужно удалить все сообщения)
DELETE FROM "Messages" WHERE "conversationId" = 1;
DELETE FROM "Conversations" WHERE id = 1;

-- Поиск чатов по участникам
SELECT * FROM "Conversations"
WHERE 1 = ANY(participants) AND 2 = ANY(participants);

-- Поиск сообщений по тексту
SELECT * FROM "Messages"
WHERE "body" ILIKE '%привет%';

-- Получение чатов, где пользователь не в черном списке
SELECT * FROM "Conversations"
WHERE NOT "blackList"[array_position(participants, 1)] = true;


