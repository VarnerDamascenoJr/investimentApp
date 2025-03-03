# 📌 Invest Manager

## 🚀 Sobre o Projeto

O **Invest Manager** é uma aplicação fullstack para gerenciamento de investimentos, onde o usuário pode criar carteiras de investimento e adicionar ativos a elas. Desenvolvido com **NestJS** no backend e **ReactJS com Material UI** no frontend, utilizando **Redux** para gerenciamento de estado e **Prisma** para manipulação do banco de dados SQLite.

---

## 🛠 Tecnologias Utilizadas

### **Backend:**

- **NestJS** (Framework backend)
- **Prisma** (ORM para banco de dados)
- **SQLite** (Banco de dados relacional)
- **JWT (JSON Web Token)** (Autenticação e autorização)
- **Bcrypt** (Hash de senhas)

### **Frontend:**

- **ReactJS** (Biblioteca frontend)
- **Material UI** (Componentes visuais)
- **Redux Toolkit** (Gerenciamento de estado)
- **React Hook Form** + **Zod** (Validação de formulários)

---

## 📂 Estrutura do Projeto

```
├── backend
│   ├── prisma/           # Configuração do banco de dados
│   ├── src/
│   │   ├── auth/         # Módulo de autenticação (login, registro, JWT)
│   │   ├── wallets/      # Módulo de carteiras
│   │   ├── investments/  # Módulo de investimentos
│   │   ├── prisma/       # Serviço Prisma
│   │   ├── main.ts       # Ponto de entrada do NestJS
│   │   ├── app.module.ts # Módulo principal
│   ├── package.json      # Dependências backend
│
├── frontend
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── pages/         # Páginas principais (Login, Wallets, Investments)
│   │   ├── store/        # Redux Toolkit (auth, wallets, investments)
│   │   ├── services/     # Configuração da API
│   │   ├── App.jsx       # Componente raiz do React
│   ├── package.json      # Dependências frontend
│
├── README.md
```

---

## 🚀 Como Configurar o Projeto

### **1️⃣ Clonar o repositório**

```sh
$ git clone https://github.com/seuusuario/invest-manager.git
$ cd invest-manager
```

### **2️⃣ Configurar o Backend**

```sh
$ cd backend
$ npm install  # Instalar dependências
```

### **3️⃣ Criar e rodar o Banco de Dados**

```sh
$ npx prisma migrate dev --name init
$ npx prisma generate
```

> Isso criará um banco SQLite local e aplicará a estrutura necessária.

### **4️⃣ Rodar o Servidor Backend**

```sh
$ npm run start
```

> O backend rodará em [**http://localhost:3000**](http://localhost:3000).

### **5️⃣ Configurar o Frontend**

```sh
$ cd ../frontend
$ npm install  # Instalar dependências
```

### **6️⃣ Rodar o Frontend**

```sh
$ npm run dev
```

> O frontend rodará em [**http://localhost:5173**](http://localhost:5173).

---

## 🔑 **Autenticação (JWT)**

Todas as requisições protegidas exigem um **token JWT**. O usuário precisa fazer login para obter o token e enviá-lo no cabeçalho das requisições:

```json
Authorization: Bearer SEU_TOKEN_AQUI
```

---

## 📌 **Endpoints da API**

### **1️⃣ Autenticação**

#### **Registro**

```http
POST /auth/register
```

📌 **Body:**

```json
{
  "name": "Usuário Teste",
  "email": "user@example.com",
  "password": "senha123"
}
```

📌 **Resposta:**

```json
{
  "id": "uuid",
  "name": "Usuário Teste",
  "email": "user@example.com",
  "createdAt": "2025-03-02T13:53:07.500Z"
}
```

#### **Login**

```http
POST /auth/login
```

📌 **Body:**

```json
{
  "email": "user@example.com",
  "password": "senha123"
}
```

📌 **Resposta:**

```json
{
  "accessToken": "SEU_TOKEN_AQUI"
}
```

---

### **2️⃣ Carteiras**

#### **Criar Carteira**

```http
POST /wallets
```

📌 **Body:**

```json
{
  "name": "Minha Carteira"
}
```

📌 **Resposta:**

```json
{
  "id": "uuid",
  "name": "Minha Carteira",
  "createdAt": "2025-03-02T14:00:00.000Z"
}
```

#### **Obter todas as Carteiras**

```http
GET /wallets
```

📌 **Resposta:**

```json
[
  {
    "id": "uuid",
    "name": "Minha Carteira",
    "createdAt": "2025-03-02T14:00:00.000Z"
  }
]
```

---

### **3️⃣ Investimentos**

#### **Criar Investimento**

```http
POST /investments
```

📌 **Body:**

```json
{
  "walletId": "uuid-da-carteira",
  "name": "Ações da Tesla",
  "amount": 5000
}
```

📌 **Resposta:**

```json
{
  "id": "uuid",
  "name": "Ações da Tesla",
  "amount": 5000,
  "walletId": "uuid-da-carteira"
}
```

#### **Obter Investimentos por Carteira**

```http
GET /investments/:walletId
```

📌 **Resposta:**

```json
[
  {
    "id": "uuid",
    "name": "Ações da Tesla",
    "amount": 5000,
    "walletId": "uuid-da-carteira"
  }
]
```

---

## 📜 **Licença**

Este projeto é open-source e pode ser utilizado livremente.

---

