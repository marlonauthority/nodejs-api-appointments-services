API em Node Js para agendamento de serviços

<img src=".github/example.gif">

# Instalação

- Rode **yarn** ou **npm install** para dependencias.
- Suba as databases
- Preencha o **.env**
- Start a aplicação e a fila dos emails

```
yarn dev
```

```
yarn queue
```

- Migre as tabelas

```
yarn sequelize db:migrate
```

- Migre o seed

```
yarn sequelize db:seed:all
```

## Database no Docker

- docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

- docker run --name redisbarber -p 6379:6379 -d -t redis:alpine

- docker run --name mongobarber -p 27017:27017 -d -t mongo

---

### Frontend

- <a href="https://github.com/marlonauthority/reactjs-appointments-services">React Js Agendamento de Serviços</a>

### Mobile

- <a href="https://github.com/marlonauthority/react-native-appointments-services">React Native Agendamento de Serviços</a>
