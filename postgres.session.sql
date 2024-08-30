--task 9
select
count(id) as "Count"
,role
from "Users"
group by role

--task 10
update "Users"
set balance = balance+sm
from 

(select sum(prize)*0.1 sm
,"userId"
from "Contests"
where status = 'finished' 
and "createdAt"::date between '2024-08-25' and '2024-08-26'
group by "userId") cs

where "Users".id = cs."userId"