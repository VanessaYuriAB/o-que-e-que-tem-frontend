# 🥣 O que é que tem? Na sopa, creme ou patê

> MVP de uma plataforma digital sustentável para redução do desperdício alimentar através da
> transformação de produtos próximos ao vencimento em sopas, cremes e patês personalizados.

## Índice

1. Sobre o projeto
2. Problema
3. Solução
4. Principais funcionalidades
5. Boas práticas adotadas
6. Setup profissional
7. Arquitetura do projeto
8. Estrutura de diretórios
9. Decisões de arquitetura
10. Gerenciamento de estado global
11. Autenticação
12. Performance
13. Acessibilidade
14. Responsividade
15. Stack atual
16. Como executar
17. Status atual
18. Principais desafios
19. Principais aprendizados
20. Roadmap
21. Próximos passos
22. Autora

## 📖 1. Sobre o projeto

**O que é que tem? Na sopa, creme ou patê** é um projeto autoral desenvolvido após a conclusão do
Bootcamp de Desenvolvimento Web da TripleTen Brasil.

A proposta surgiu da observação de um problema real: toneladas de alimentos ainda próprios para
consumo são descartadas diariamente por mercados, supermercados e outros estabelecimentos do setor
alimentício devido à proximidade do vencimento, critérios estéticos ou falhas operacionais na gestão
de estoque.

O projeto propõe uma solução baseada em tecnologia, sustentabilidade e economia circular:

- aquisição de produtos próximos ao vencimento provenientes de parceiros;
- transformação desses insumos em refeições prontas;
- comercialização por compra unitária ou assinatura flexível;
- aproveitamento inteligente da disponibilidade real de estoque;
- redução do desperdício alimentar.

## 🎯 2. Problema

O desperdício de alimentos gera impactos ambientais, sociais e econômicos significativos.

Mesmo existindo gôndolas de desconto e processos de gestão de estoque, uma grande quantidade de
produtos continua sendo descartada antes do consumo final.

Os principais desafios identificados foram:

- produtos próximos ao vencimento;
- perdas operacionais;
- baixo aproveitamento de estoque;
- dificuldade de conectar oferta e demanda em tempo hábil;
- descarte de recursos como água, energia e logística incorporados aos alimentos.

## 💡 3. Solução

A plataforma funciona como uma cozinha sustentável de operação digital.

O modelo MVP prevê:

#### Compra unitária

Fluxo tradicional de:

```
Cardápio
↓
Seleção
↓
Carrinho
↓
Checkout
↓
Pedido
```

#### Assinatura flexível

Ao invés de fixar produtos previamente, a assinatura funciona como um contrato de consumo.

O usuário define:

- frequência (dias) e
- forma de entrega.

A cada entrega, escolhe os itens disponíveis naquele momento.

Isso permite adaptar o consumo à disponibilidade real dos insumos e reduz o desperdício.

### 🌱 Diferencial do negócio

O projeto prevê uma etapa de triagem especializada.

A equipe de triagem atua em duas frentes:

#### Segurança alimentar

- avaliação da integridade dos alimentos;
- verificação de validade;
- controle de qualidade.

#### Gestão de estoque dos parceiros

- identificação antecipada de itens aproveitáveis;
- redução de perdas;
- melhoria da organização do estoque;
- retirada mais eficiente dos produtos.

> “A triagem deixa de ser apenas um processo interno e passa a atuar diretamente na gestão de
> estoque dos parceiros, atacando a raiz do desperdício.”

## ✨ 4. Principais funcionalidades

### Atualmente implementadas

- Cardápio dinâmico baseado na disponibilidade de ingredientes
- Atualização periódica da disponibilidade através de polling
- Filtragem de ingredientes por categoria alimentar
- Cadastro, login e autenticação de usuários
- Persistência de sessão (refresh mock)
- Rotas públicas, protegidas e condicionais
- Perfil de usuário editável
- Gerenciamento de assinatura flexível
- Carrinho de compras persistente
- Migração automática de carrinho anônimo para usuário autenticado
- Checkout completo para pedidos avulsos e assinaturas
- Geração automática de número de pedido
- Página de confirmação de pedidos
- Rastreamento de pedidos por número
- Histórico de pedidos do usuário
- Formulário de contato (envio de mensagens)
- Histórico de mensagens no perfil
- Página de receitas com campo para busca
- Página institucional Sobre Nós
- Página institucional Nosso Impacto
- Formulário de solicitação de parceria
- Persistência simulada através de Mock API
- Gerenciamento de estado com Zustand
- Tratamento padronizado de erros
- Layout responsivo mobile-first

## ✅ 5. Boas práticas adotadas

- Feature-Based Architecture
- Component-Based Design
- Mobile First
- Colocation de estilos
- Convenção BEM
- Lazy Loading
- Code Splitting
- Variáveis de ambiente centralizadas
- Mock API compatível com backend real
- Tratamento de erros padronizado
- ESLint + Prettier + Husky + lint-staged
- Node 20 LTS via NVM
- Componentes reutilizáveis
- Separação de responsabilidades
- Acessibilidade desde o início do desenvolvimento

## 🧰 6. Setup profissional

O projeto foi configurado com um pipeline completo de qualidade de código:

- Node.js 20 LTS
- NVM
- ESLint
- Prettier
- EditorConfig
- Husky
- lint-staged
- VS Code Workspace Settings

Garantindo consistência, padronização e qualidade desde o início do desenvolvimento.

## 🏗️ 7. Arquitetura do projeto

O frontend foi estruturado utilizando uma combinação entre:

- Feature-Based Architecture;
- Component-Based Design;
- Separação de responsabilidades;
- Arquitetura orientada a evolução Full Stack.

### Estrutura conceitual

```
UI
↓
Hooks
↓
Services
↓
API
↓
Mock API / Backend
```

**Exemplo:**

```
Componente (Menu)
├─ useMenu()
│  ↓
│  menuService.js
│  ↓
│  fakeApi() / Backend real
│
└─ Outlet Context
    ↓
    MenuType
```

Essa separação facilita:

- manutenção;
- escalabilidade;
- testes;
- substituição de mocks por APIs reais.

## 📂 8. Estrutura de diretórios

```
src
│
├── app
│ └── routes
│
├── assets
│
├── config
│
├── features
│ ├── admin
│ ├── auth
│ ├── cart
│ ├── checkout
│ ├── contact
│ ├── menu
│ ├── orders
│ ├── partner
│ ├── profile
│ ├── recipe-widget
│ ├── recipes
│ ├── subscription
│ └── weather-widget
│
├── mocks
│
├── pages
│
├── services
│
├── shared
│ ├── components
│ ├── constants
│ └── utils
│
├── store
│
└── styles
```

### 🏛️ Organização da arquitetura

app/ → composição da aplicação e configuração de rotas

assets/ → fonts, imagens, ícones e demais recursos estáticos

config/ → centralização das configurações globais da aplicação e variáveis de ambiente

features/ → módulos organizados por domínio de negócio, contendo regras, hooks, serviços e fluxos
específicos

mocks/ → backend fake com dados simulados, persistência durante o desenvolvimento do frontend

pages/ → páginas institucionais e públicas

services/ → camada de infraestrutura responsável pela comunicação com APIs e serviços externos de
acesso a dados

shared/ → recursos reutilizáveis por toda a aplicação

store/ → gerenciamento de estado global da aplicação utilizando Zustand; responsável pela
autenticação, controle de loading, erros globais, atualização de perfil, sincronização de sessão

styles/ → estilos globais da aplicação

## 🧠 9. Decisões de arquitetura

### Feature-Based Architecture

A aplicação é organizada por domínio de negócio.

```
features/
```

Concentra:

- regra de negócio;
- serviços;
- páginas;
- hooks.

**Exemplo:**

```
features/menu
features/auth
features/profile
```

### Component-Based Design

Componentes reutilizáveis ficam centralizados em:

```
shared/components
```

**Exemplos:**

```
Button
Input
Loader
Toast
Logo
Layout
```

### Configuração por ambiente

O projeto evita espalhar `import.meta.env` pela aplicação.

Fluxo:

```
.env
↓
config/env.js
↓
services
↓
aplicação
```

Benefícios:

- centralização;
- desacoplamento;
- melhor manutenção;
- facilidade para transformação de valores.

### Contrato de API definido antes do backend

Mesmo utilizando mocks, foi definido um padrão de resposta compatível com a futura API:

```
{
  data,
  status
}
```

Erros:

```
{
  type,
  status,
  message,
  data
}
```

Esse contrato é compartilhado entre:

```
fakeApi
↔
apiFetch
```

permitindo substituir o backend fake pelo backend real com mínimo impacto.

### Compartilhamento de estado entre rotas aninhadas

O módulo de cardápio utiliza rotas aninhadas do React Router.

Para evitar requisições duplicadas ao trocar de categoria, o estado do cardápio é obtido no
componente pai (`Menu`) e compartilhado com as rotas filhas através do `Outlet Context`.

Fluxo:

```
Menu
↓
useMenu()
↓
Outlet Context
↓
MenuType
```

Benefícios:

- único fetch para todas as categorias;
- estado compartilhado entre rotas filhas;
- menor quantidade de requisições;
- atualização consistente dos dados exibidos.

### Atualização periódica de disponibilidade (Polling)

A disponibilidade dos ingredientes pode mudar ao longo da navegação do usuário.

Para reduzir a divergência entre o estoque disponível e o cardápio exibido, o módulo de cardápio
realiza atualizações periódicas através de polling com `setInterval`.

**Exemplo conceitual:**

```
useEffect()
↓
fetch inicial
↓
setInterval()
↓
novo fetch periódico
```

Benefícios:

- atualização automática do cardápio;
- sincronização frequente com a fonte de dados;
- preparação para integração com backend real.

### Simulação de alterações de estoque no ambiente de desenvolvimento

Durante o desenvolvimento foi utilizada uma simulação de atualização de estoque através de
`setTimeout`.

O objetivo é reproduzir mudanças de disponibilidade sem depender de um backend real.

Fluxo:

```
Mock inicial
↓
setTimeout()
↓
alteração da quantidade disponível
↓
polling identifica a mudança
↓
interface atualizada
```

Essa abordagem permite validar a lógica de atualização automática antes da integração com a API
definitiva. Em ambiente de desenvolvimento, a alteração é simulada em memória. Em produção, as
atualizações serão provenientes da API e refletidas pelo mecanismo de polling.

### Tratamento de erros em múltiplas camadas

```
apiFetch
↓
Service
↓
errorHandler
↓
Store
↓
UI
```

Responsabilidades:

#### apiFetch

Classifica erros:

```
api
network
```

#### Service

Adiciona contexto.

#### errorHandler

Traduz erros técnicos para mensagens amigáveis.

#### Store

Gerencia estado global.

#### UI

Decide como apresentar o erro ao usuário.

## ⚡ 10. Gerenciamento de estado global

O projeto utiliza:

```
Zustand
```

Principais características:

- store global simples;
- estados separados de ações (ações nomeadas com sufixo `Action`);
- uso de `selectors`;
- uso de `useShallow`;
- controle de loading;
- tratamento de erros globais;
- controle de autenticação via `authChecked`.

## 🔒 11. Autenticação

Arquitetura preparada para:

```
JWT
+
Cookies HttpOnly
```

Fluxo planejado:

```
Login
↓
Backend gera JWT
↓
Cookie HttpOnly
↓
Refresh de sessão
↓
Protected Routes
```

Rotas implementadas:

```
ProtectedRoute
PublicRoute
SubscriptionRoute
```

## 🚀 12. Performance

Implementações adotadas:

### Lazy Loading

```js
lazy();
```

### Suspense

```js
<Suspense />
```

Benefícios:

- Code Splitting;
- menor bundle inicial;
- carregamento sob demanda.

## ♿ 13. Acessibilidade

Práticas implementadas:

- aria-label;
- role="status";
- aria-live="polite";
- menu colapsável utilizando `<details>` e `<summary>`;
- conteúdo visualmente oculto para leitores de tela;
- semântica HTML, com uso de elementos como `<section>`, `<fieldset>`, `<legend>`, `<dl>`, `<dt>`,
  `<dd>`, `<address>` e `<strong>`;
- navegação por teclado;
- texto alternativo para imagens.

## 📱 14. Responsividade

Estratégia adotada:

```
Mobile First
```

Utilizando:

- Flexbox;
- CSS Grid;
- Media Queries;
- CSS moderno (`margin-inline`, `dvh`, `flex-wrap: balance` etc.).

## 🛠️ 15. Stack atual

### Frontend

- Vite
- React 19
- React Router DOM
- Zustand
- PropTypes

### Qualidade de código

- ESLint
- Prettier
- EditorConfig
- Husky
- lint-staged

### Build & Tooling

- Node.js 20 LTS
- NVM
- PostCSS
- Autoprefixer

## ▶️ 16. Como executar

### Pré-requisitos

```bash
Node.js 20
```

ou

```bash
nvm use
```

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Formatação

```
npm run format
```

## 🔄 17. Status atual

### Implementado

- Autenticação mockada com persistência de sessão
- Cardápio dinâmico
- Carrinho de compras
- Checkout
- Sistema de pedidos
- Rastreamento de pedidos
- Histórico de pedidos
- Perfil de usuário
- Sistema de assinatura
- Formulário de contato
- Histórico de mensagens
- Página de receitas
- Página Sobre Nós
- Página Nosso Impacto
- Cadastro de parceiros
- Mock API
- Zustand
- Proteção de rotas
- Estrutura escalável
- Tratamento de erros
- Responsividade
- Acessibilidade

### Em desenvolvimento

- Integração com APIs externas reais (Widgets de clima e receitas)
- Painel administrativo
- Backend Node.js + Express
- MongoDB Atlas
- JWT com Cookies HttpOnly

## 🧠 18. Principais desafios técnicos

Durante o desenvolvimento do projeto alguns desafios exigiram modelagem, refatorações e ajustes
arquiteturais relevantes.

### Persistência e migração de carrinho

Foi implementado um mecanismo que permite:

- utilização do carrinho por visitantes não autenticados;
- migração automática dos itens após login;
- prevenção de duplicidade de produtos;
- carrinhos independentes por usuário;
- restauração correta dos dados após login, logout e atualização da página.

Esse fluxo exigiu cuidados especiais com persistência local, sincronização de estado e reidratação
do Zustand.

### Datas e fusos horários

Outro desafio importante foi a padronização das datas da aplicação.

Durante o desenvolvimento foram exploradas diferentes estratégias envolvendo:

- `toISOString()`;
- `toLocaleString('pt-BR')`;
- renderização de datas em inputs;
- renderização de datas em componentes visuais;
- compatibilidade entre serviços, mocks e interface.

A solução adotada passou a utilizar datas padronizadas na camada de serviços, delegando à interface
a responsabilidade pela formatação exibida ao usuário.

Essa separação aproximou o frontend de uma integração real com APIs REST e reduziu inconsistências
relacionadas a timezone.

### Separação de responsabilidades

A evolução do projeto também exigiu sucessivas refatorações para:

- retirar regras de negócio dos componentes;
- mover responsabilidades para hooks e services;
- centralizar tratamento de erros;
- desacoplar atualizações de perfil, pedidos, assinatura e autenticação.

Esse processo resultou em uma arquitetura mais próxima de aplicações Full Stack reais.

### Modelagem do domínio de negócio

Antes mesmo da implementação técnica, foi necessário transformar uma ideia de economia circular em
fluxos digitais consistentes.

Algumas decisões exigiram validação conceitual:

- diferenciação entre compra avulsa e assinatura;
- definição do fluxo de checkout para ambos os modelos;
- modelagem do ciclo de vida dos pedidos;
- disponibilidade dinâmica de produtos baseada em estoque variável;
- representação da relação entre parceiros, ingredientes e cardápio.

Esse processo exigiu a tradução de regras de negócio para entidades, estados e fluxos de navegação
da aplicação.

## 🎓 19. Principais aprendizados

Este projeto foi o primeiro projeto autoral desenvolvido após a conclusão do Bootcamp de
Desenvolvimento Web da TripleTen Brasil.

Durante o desenvolvimento foram estudados e aplicados conceitos como:

- arquitetura escalável;
- `feature-based architecture`;
- `component-driven design`;
- semântica HTML avançada (fieldset, legend, dl, dt, dd, address);
- acessibilidade desde a modelagem dos componentes;
- recursos modernos de CSS, como: `margin-inline`, `dvh`, `decimal-leading-zero` e
  `flex-wrap: balance`;
- persistência de sessão e refresh de autenticação;
- migração de estado entre usuários anônimos e autenticados;
- gerenciamento de carrinhos independentes por usuário;
- rastreamento e histórico de pedidos;
- modelagem de fluxos de assinatura;
- fluxo completo de checkout;
- padronização de datas utilizando ISO 8601;
- tratamento de timezone e formatação localizada;
- gerenciamento de estado com Zustand;
- persistência avançada com Zustand;
- reidratação de estado após autenticação;
- separação clara de responsabilidades (camada de serviço e camada de apresentação);
- arquitetura baseada em hooks, services e stores;
- contratos de API;
- mock backend;
- Outlet Context do React Router;
- polling com setInterval;
- tooling profissional;
- organização de projetos para crescimento futuro.

Mais do que desenvolver uma interface React, o objetivo deste projeto é a construção de uma base
sólida para um produto digital, combinando sustentabilidade, experiência do usuário e boas práticas
de engenharia de software.

Este projeto também marcou minha transição de uma abordagem focada apenas em componentes e
interfaces para uma visão mais ampla de arquitetura, organização de código, escalabilidade e
modelagem de produto.

## 🗺️ 20. Roadmap

### Frontend

- Loader avançado
- OAuth
- Receitas salvas
- Compartilhamento de receitas
- Melhorias de acessibilidade
- TypeScript
- Preferências alimentares avançadas

### Backend (planejado)

- Node.js
- Express
- MongoDB Atlas
- JWT HttpOnly
- APIs RESTful
- Sistema de pedidos
- Sistema de assinatura

### Evolução do Produto

- Painel do lojista
- Algoritmo de recomendação
- Gestão de estoque
- Delivery com agendamento

## 🚀 21. Próximos passos

  A versão atual representa a construção da base arquitetural do frontend e da experiência do
usuário, preparada para futuras integrações com APIs RESTful, autenticação via JWT com cookies
HttpOnly e persistência em MongoDB.

## 🌱 22. Autora

##### Desenvolvido por Vanessa Yuri A. Brito

Projeto autoral desenvolvido para portfólio, experimentação arquitetural e evolução para uma solução
Full Stack baseada no ecossistema MERN.

O objetivo foi transformar uma ideia de impacto socioambiental em um produto digital escalável,
conectando sustentabilidade, tecnologia, economia circular e redução de desperdício alimentar.
