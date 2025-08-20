### Для запуска проекта необходимо выполнить следующие действия:
**Установить зависимости**  
`npm install`;  
**Запустить postgres контейнер**  
```bash
  docker run --name IPR-pg -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres
```  
**Запустить mongo контейнер**  
```bash
  docker compose up -d
```  
**Собрать проект**
```bash
  tsc
```
**Запустить файл app.js**  
`node out/app.js`;
