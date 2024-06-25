# Gerenciador de Tarefas - Frontend

Este é o frontend em Next.js para o Gerenciador de Projetos e Tarefas, consumindo o [backend desenvolvido em Node.js com Express, MongoDB e Mongoose](https://github.com/thisd92/taskManagerBackend).

## Funcionalidades

O frontend oferece uma interface para interagir com as seguintes funcionalidades:

- **Dashboard**: Exibe gráficos e resumos de quantidade de projetos e tarefas, além de apresentar uma visualização do quadro Kanban de tarefas.
- **Esqueci Minha Senha**: Página para recuperação de senha (ainda não implementada).
- **Login**: Página para autenticação de usuários.
- **Perfil**: Página para visualização do perfil do usuário (`profile/[id]`).
- **Projetos**: Página para visualização, cadastro, atualização e remoção de projetos (`project` e `project/[id]`).
- **Registro**: Página para registro de novos usuários.

### Quadro Kanban

O quadro Kanban permite aos usuários arrastar e soltar tarefas entre as colunas "To Do", "In Progress" e "Finished" para atualizar o status das tarefas de forma intuitiva.

### Gráficos

Os gráficos são gerados utilizando a biblioteca Chart.js, proporcionando uma visualização clara e informativa do progresso dos projetos e distribuição das tarefas.

## Tecnologias Utilizadas

- Next.js 13.4.4
- React 18.2.0
- Context API (para gerenciamento do estado de autenticação e lista de tarefas)
- React DnD (para implementação do quadro Kanban)
- Cookies (para armazenamento seguro do token de autenticação)

### Principais Dependências

- **axios**: Para fazer requisições HTTP para o backend.
- **react-beautiful-dnd**: Para implementação do drag and drop no quadro Kanban.
- **react-chartjs-2**: Wrapper React para integrar com a biblioteca Chart.js e renderizar gráficos.
- **react-input-mask**: Utilizado para aplicar máscara no número de telefone durante o registro ou edição do perfil.

## Configuração do Ambiente

Para configurar o ambiente de desenvolvimento:

1. Clone o repositório e instale as dependências:
   ```bash
   npm install
   ```
2. Em `utils/request.ts` defina o `BASE_URL` para as chamadas da API.
3. Execute o servidor de desenvolvimento:
   ```
   npm run dev
   ```
   O servidor será executado por padrão em http://localhost:3000.

## Contexto de Autenticação

Após o login bem-sucedido, o token de autenticação é armazenado nos cookies do navegador. Este token é enviado automaticamente nas requisições para o backend, garantindo que o usuário tenha acesso apenas às informações da sua empresa conforme as validações do backend.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests para melhorias, correções de bugs ou novas funcionalidades.

## Licença

Licença MIT.
