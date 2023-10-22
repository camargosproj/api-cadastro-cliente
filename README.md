# Api Cadastro de Cliente

Este é um projeto para gerenciar registros de clientes. Ele fornece uma API RESTful para criar, recuperar, atualizar e excluir informações de clientes.

### Pré-requisitos

Antes de começar, certifique-se de atender aos seguintes requisitos:

- Docker instalado (para executar Node, Nginx, MongoDB e Redis).
- Um arquivo `.env` para armazenar as variáveis de ambiente. Você pode usar o modelo `.env` fornecido.

### Instalando

Para iniciar todos os serviços, execute o seguinte comando:
`     docker-compose up -d`

## Acesso à Documentação da API

Você pode acessar a documentação da API em [http://localhost:3000/docs](http://localhost:3000/docs) ou via nginx [http://localhost:8080/docs](http://localhost:8080/docs).

## Uso

- **Criar um novo cliente:** Para criar um novo cliente, use o endpoint POST `/clients`.

- **Listar todos os clientes:** Para listar todos os clientes, use o endpoint GET `/clients`.

- **Encontrar um cliente por ID:** Para encontrar um cliente pelo ID, use o endpoint GET `/clients/{id}`.

- **Excluir um cliente por ID:** Para excluir um cliente pelo ID, use o endpoint DELETE `/clients/{id}`.
