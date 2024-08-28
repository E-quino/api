### Repositorios do Projeto

- Frontend: 
- API: https://github.com/E-quino/api
- Banco de Dados: https://github.com/E-quino/database

# Documentação da API
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FE-quino%2Fapi.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FE-quino%2Fapi?ref=badge_shield)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=E-quino_api&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=E-quino_api)


## Endpoints

### Teste de Conexão
#### `GET /ping`
Retorna uma resposta de teste para verificar se a API está ativa.

**Resposta de Sucesso:**
```
200 OK
pong
```

---

### Endpoints de Usuário (Login)
#### `POST /`
Endpoint para login de usuário (a ser implementado).

---

### Endpoints de Atleta
#### `POST /atleta`
Cria um novo atleta.

**Corpo da Requisição:**
```json
{
    "id": 1,
    "userID": 1,
    "nome": "Nome do Atleta",
    "nascimento": "2000-01-01",
    "documento": "123456789"
}
```

**Resposta de Sucesso:**
```
201 Created
{
    "message": "Atleta created successfully",
    "id": 1
}
```

#### `GET /atletas/:userID`
Obtém todos os atletas de um usuário com base no ID do usuário.

**Parâmetros da URL:**
- `userID`: ID do usuário.

**Resposta de Sucesso:**
```
200 OK
[
    {
        "id": 1,
        "usuario": 1,
        "nome": "Nome do Atleta",
        "nascimento": "2000-01-01",
        "documento": "123456789"
    }
]
```

#### `GET /atleta`
Obtém informações sobre um atleta específico com base no nome e no proprietário.

**Parâmetros da Query:**
- `nome`: Nome do atleta.
- `userID`: ID do usuário proprietário.

**Resposta de Sucesso:**
```
200 OK
{
    "id": 1,
    "usuario": 1,
    "nome": "Nome do Atleta",
    "nascimento": "2000-01-01",
    "documento": "123456789"
}
```

---

### Endpoints de Cavalo
#### `POST /cavalo`
Cria um novo cavalo.

**Corpo da Requisição:**
```json
{
    "id": 1,
    "userID": 1,
    "nome": "Nome do Cavalo"
}
```

**Resposta de Sucesso:**
```
201 Created
{
    "message": "Cavalo created successfully",
    "id": 1
}
```

#### `GET /cavalos/:userID`
Obtém todos os cavalos de um usuário com base no ID do usuário.

**Parâmetros da URL:**
- `userID`: ID do usuário.

**Resposta de Sucesso:**
```
200 OK
[
    {
        "id": 1,
        "usuario": 1,
        "nome": "Nome do Cavalo"
    }
]
```

#### `GET /cavalo`
Obtém informações sobre um cavalo específico com base no nome e no proprietário.

**Parâmetros da Query:**
- `nome`: Nome do cavalo.
- `userID`: ID do usuário proprietário.

**Resposta de Sucesso:**
```
200 OK
{
    "id": 1,
    "usuario": 1,
    "nome": "Nome do Cavalo"
}
```

---

### Endpoints de Entidade
#### `POST /entidade`
Cria uma nova entidade.

**Corpo da Requisição:**
```json
{
    "id": 1,
    "userID": 1,
    "nome": "Nome da Entidade",
    "endereco": "Endereço da Entidade"
}
```

**Resposta de Sucesso:**
```
201 Created
{
    "message": "Entidade created successfully",
    "id": 1
}
```

#### `GET /entidades/:userID`
Obtém todas as entidades de um usuário com base no ID do usuário.

**Parâmetros da URL:**
- `userID`: ID do usuário.

**Resposta de Sucesso:**
```
200 OK
[
    {
        "id": 1,
        "usuario": 1,
        "nome": "Nome da Entidade",
        "endereco": "Endereço da Entidade"
    }
]
```

#### `GET /entidade`
Obtém informações sobre uma entidade específica com base no nome e no proprietário.

**Parâmetros da Query:**
- `nome`: Nome da entidade.
- `userID`: ID do usuário proprietário.

**Resposta de Sucesso:**
```
200 OK
{
    "id": 1,
    "usuario": 1,
    "nome": "Nome da Entidade",
    "endereco": "Endereço da Entidade"
}
```

---

### Endpoints de Inscrição
#### `POST /inscricao`
Cria uma nova inscrição.

**Corpo da Requisição:**
```json
{
    "id": 1,
    "atleta": 1,
    "cavalo": 1,
    "dia": 1,
    "evento": 1,
    "altura": 1,
    "categoria": 1
}
```

**Resposta de Sucesso:**
```
201 Created
{
    "message": "Inscricao created successfully",
    "id": 1
}
```

---

### Endpoints de Evento
#### `POST /evento`
Cria um novo evento.

**Corpo da Requisição:**
```json
{
    "id": 1,
    "entidade": 1,
    "nome": "Nome do Evento",
    "descricao": "Descrição do Evento",
    "inicio": "2023-01-01",
    "fim": "2023-01-02"
}
```

**Resposta de Sucesso:**
```
201 Created
{
    "message": "Evento created successfully",
    "id": 1
}
```

#### `GET /evento/closest`
Obtém o evento com a data mais próxima da data atual.

**Resposta de Sucesso:**
```
200 OK
{
    "id": 1,
    "entidade": 1,
    "nome": "Nome do Evento",
    "descricao": "Descrição do Evento",
    "inicio": "2023-01-01",
    "fim": "2023-01-02"
}
```

#### `GET /eventos`
Obtém todos os eventos, ordenados pela data mais próxima primeiro.

**Resposta de Sucesso:**
```
200 OK
[
    {
        "id": 1,
        "entidade": 1,
        "nome": "Nome do Evento",
        "descricao": "Descrição do Evento",
        "inicio": "2023-01-01",
        "fim": "2023-01-02"
    }
]
```

---

### Endpoints de Dia
#### `POST /dia`
Cria um novo dia.

**Corpo da Requisição:**
```json
{
    "id": 1,
    "evento": 1,
    "data": "2023-01-01"
}
```

**Resposta de Sucesso:**
```
201 Created
{
    "message": "Dia created successfully",
    "id": 1
}
```

---

### Endpoints de Altura
#### `POST /altura`
Cria uma nova altura.

**Corpo da Requisição:**
```json
{
    "id": 1,
    "dia": 1,
    "altura": "1.20m"
}
```

**Resposta de Sucesso:**
```
201 Created
{
    "message": "Altura created successfully",
    "id": 1
}
```

---

### Endpoints de Categoria
#### `POST /categoria`
Cria uma nova categoria.

**Corpo da Requisição:**
```json
{
    "id": 1,
    "nome": "Nome da Categoria"
}
```

**Resposta de Sucesso:**
```
201 Created
{
    "message": "Categoria created successfully",
    "id": 1
}
```

---

### Estrutura de Dados

#### `Atleta`
```json
{
    "id": 1,
    "usuario": 1,
    "nome": "Nome do Atleta",
    "nascimento": "2000-01-01",
    "documento": "123456789"
}
```

#### `Cavalo`
```json
{
    "id": 1,
    "usuario": 1,
    "nome": "Nome do Cavalo"
}
```

#### `Entidade`
```json
{
    "id": 1,
    "usuario": 1,
    "nome": "Nome da Entidade",
    "endereco": "Endereço da Entidade"
}
```

#### `Evento`
```json
{
    "id": 1,
    "entidade": 1,
    "nome": "Nome do Evento",
    "descricao": "Descrição do Evento",
    "inicio": "2023-01-01",
    "fim": "2023-01-02"
}
```

#### `Dia`
```json
{
    "id": 1,
    "evento": 1,
    "data": "2023-01-01"
}
```

#### `Altura`
```json
{
    "id": 1,
    "dia": 1,
    "altura": "1.20m"
}
```

#### `Categoria`
```json
{
    "id": 1,
    "nome": "Nome da Categoria"
}
```

---

### Exemplo de Uso

#### Testar Conexão:
```bash
curl -X GET http://localhost:8080/ping
```

#### Criar Atleta:
```bash
curl -X POST http://localhost:8080/atleta -H "Content-Type: application/json" -d '{
    "id": 1,
    "userID": 1,
    "nome": "Nome do Atleta",
    "nascimento": "2000-01-01",
    "documento": "123456789"
}'
```

#### Obter Atletas de um Usuário:
```bash
curl -X GET http://localhost:8080/atletas/1
```

#### Obter Atleta Específico:
```bash
curl -X GET 'http://localhost:8080/atleta?nome=John&userID=1'
```

#### Criar Cavalo:
```bash
curl -X POST http://localhost:8080/cavalo -H "Content-Type: application/json" -d '{
    "id": 1,
    "userID": 1,
    "nome": "Nome do Cavalo"
}'
```

#### Obter Cavalos de um Usuário:
```bash
curl -X GET http://localhost:8080/cavalos/1
```

#### Obter Cavalo Específico:
```bash
curl -X GET 'http://localhost:8080/cavalo?nome=Thunder&userID=1'
```

#### Criar Entidade:
```bash
curl -X POST http://localhost:8080/entidade -H "Content-Type: application/json" -d '{
    "id": 1,
    "userID": 1,
    "nome": "Nome da Entidade",
    "endereco": "Endereço da Entidade"
}'
```

#### Obter Entidades de um Usuário:
```bash
curl -X GET http://localhost:8080/entidades/1
```

#### Obter Entidade Específica:
```bash
curl -X GET 'http://localhost:8080/entidade?nome=Riding Club&userID=1'
```

#### Criar Evento:
```bash
curl -X POST http://localhost:8080/evento -H "Content-Type: application/json" -d '{
    "id": 1,
    "entidade": 1,
    "nome": "Nome do Evento",
    "descricao": "Descrição do Evento",
    "inicio": "2023-01-01",
    "fim": "2023-01-02"
}'
```

#### Obter Evento Mais Próximo:
```bash
curl -X GET http://localhost:8080/evento/closest
```

#### Obter Todos os Eventos:
```bash
curl -X GET http://localhost:8080/eventos
```

#### Criar Dia:
```bash
curl -X POST http://localhost:8080/dia -H "Content-Type: application/json" -d '{
    "id": 1,
    "evento": 1,
    "data": "2023-01-01"
}'
```

#### Criar Altura:
```bash
curl -X POST http://localhost:8080/altura -H "Content-Type: application/json" -d '{
    "id": 1,
    "dia": 1,
    "altura": "1.20m"
}'
```

#### Criar Categoria:
```bash
curl -X POST http://localhost:8080/categoria -H "Content-Type: application/json" -d '{
    "id": 1,
    "nome": "Nome da Categoria"
}'
```


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FE-quino%2Fapi.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FE-quino%2Fapi?ref=badge_large)
