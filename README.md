# 🛍️ Wishlist App

Uma simples aplicação Full Stack para gerenciar sua lista de desejos pessoais, construída com React no frontend e Node.js/Express no backend.

---

## 🚀 Sobre o Projeto

Este projeto foi criado para praticar conceitos de desenvolvimento web full-stack. Ele consiste em uma interface de usuário (frontend) que consome uma API REST (backend) para realizar operações de CRUD (Criar, Ler, Atualizar, Deletar) em uma lista de itens de desejo.

### ✨ Tecnologias Utilizadas

*   **Frontend:**
    *   [React.js](https://reactjs.org/)
    *   [Material-UI](https://mui.com/) para componentes de UI
    *   [Axios](https://axios-http.com/) para requisições HTTP
*   **Backend:**
    *   [Node.js](https://nodejs.org/)
    *   [Express.js](https://expressjs.com/) para o servidor e rotas da API
*   **Linguagem:** JavaScript

---

## ✅ Funcionalidades

- [x] **Adicionar Itens:** Inclua novos produtos na sua lista com nome e link.
- [x] **Marcar como Comprado:** Alterne o status de um item entre "A Comprar" e "Comprado".
- [x] **Editar Itens:** Modifique o nome e o link de um item existente.
- [x] **Excluir Itens:** Remova itens da sua lista.
- [x] **Filtrar Visualização:** Filtre a lista para ver todos os itens, apenas os comprados ou apenas os que faltam comprar.
- [x] **Design Responsivo:** A interface se adapta a diferentes tamanhos de tela.
- [x] **Atualizações Otimistas:** A interface é atualizada instantaneamente para uma melhor experiência do usuário, enquanto a sincronização com o backend acontece em segundo plano.

---

## ⚙️ Como Executar o Projeto

Siga os passos abaixo para configurar e rodar a aplicação em seu ambiente local.

### Pré-requisitos

Você vai precisar ter o [Node.js](https://nodejs.org/en/) (que inclui o npm) instalado em sua máquina.

### Instalação e Execução

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/ThiagoH00/wishlist-app.git
    cd wishlist-app
    ```

2.  **Instale as dependências do Backend:**
    ```bash
    cd backend
    npm install
    ```

3.  **Instale as dependências do Frontend:**
    ```bash
    cd ../frontend
    npm install
    ```

4.  **Inicie os servidores:**
    *   Abra um terminal, navegue até a pasta `backend` e inicie o servidor da API:
        ```bash
        # Dentro da pasta /backend
        npm start
        ```
        *O backend estará rodando em `http://localhost:3002`.*

    *   Abra **outro terminal**, navegue até a pasta `frontend` e inicie a aplicação React:
        ```bash
        # Dentro da pasta /frontend
        npm start
        ```
        *O frontend estará acessível em `http://localhost:3000`.*

5.  Abra seu navegador e acesse `http://localhost:3000`.

---

## ↔️ Endpoints da API

A API do backend expõe os seguintes endpoints:

| Método HTTP | Rota           | Descrição                               |
| :---------- | :------------- | :---------------------------------------- |
| `GET`       | `/items`       | Retorna todos os itens da lista.          |
| `POST`      | `/items`       | Cria um novo item.                        |
| `PATCH`     | `/items/:id`   | Atualiza um item (nome, link ou status).  |
| `DELETE`    | `/items/:id`   | Deleta um item específico.                |

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
