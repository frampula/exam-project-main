--task 9
select
count(id) as "Count"
,role
from "Users"
group by role
