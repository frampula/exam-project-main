# Інструкції для роботи з проектом

## Робота з контейнеризованою версією додатка при встановленому Docker

1. У корні проекту запустити файл `start-dev.sh`. Якщо у вас немає прав на запуск файлу то додати їх командою `chmod a+x start-dev.sh`

2. У терміналі після побудови всіх образів та підняття всіх контейнерів у консолі будуть одночасно виводитися дані з усіх 4 контейнерів, з яких складається проект.

3. Щоб зупинити всі контейнери одночасно у терміналі, у якому відбувався запуск `start-dev.sh` прервати його роботу через комбінацію клавіш `Ctrl + C`.

---

## Робота з додатком без застосування Docker

1. Змінити на сервері у папці `config` адреси хостів у кофігураційних файлах для БД MongoDB та Postgres з `db-dev` на `localhost`.

2. За необхідності в терміналах у папках `/client` та `/server` виконати команду `npm install` для встановлення залежностей для клієтської та серверної частини додатку.

3. Зайти у папку сервера через термінал та виконати команди, необхідні для створення БД PostgreSQL:

- `npx sequelize db:create`
- `npx sequelize db:migrate`
- `npx sequelize db:seed:all`

4. Запустити у окремих терміналах клієнстську та серверну частни, виконуючи команду `npm start` в терміналах у папках `/client` та `/server`

# Додаткові дані по проекту

Під час роботи з додатком буде необхідно використовувати наступні дані:

1. Дані про банківські картки для оплати контестів / виводу винагороди за контести:

- **Номер картки:** 4111 1111 1111 1111
- **Дата кінця дії картки:** 09/26
- **CVC код:** 505

2. Дані юзерів:

- **Логіни:** customer@gmail.com, creator@gmail.com, moderator@gmail.com
- **Паролі:** один для всіх: 123123