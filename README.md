# 🥣 O que é que tem? Na sopa, creme ou patê

> MVP de uma plataforma digital sustentável para redução do desperdício alimentar através da
> transformação de produtos próximos ao vencimento em sopas, cremes e patês personalizados.

## 📖 Sobre o projeto

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

## 🎯 Problema

O desperdício de alimentos gera impactos ambientais, sociais e econômicos significativos.

Mesmo existindo gôndolas de desconto e processos de gestão de estoque, uma grande quantidade de
produtos continua sendo descartada antes do consumo final.

Os principais desafios identificados foram:

- produtos próximos ao vencimento;
- perdas operacionais;
- baixo aproveitamento de estoque;
- dificuldade de conectar oferta e demanda em tempo hábil;
- descarte de recursos como água, energia e logística incorporados aos alimentos.

## 💡 Solução

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

## ✨ Principais funcionalidades

### Atualmente implementadas

- Cardápio dinâmico baseado na disponibilidade de ingredientes
- Filtragem de ingredientes por categoria alimentar
- Cadastro e autenticação de usuários
- Rotas públicas e protegidas
- Perfil de usuário editável
- Configuração de assinatura flexível
- Persistência simulada através de Mock API
- Gerenciamento de estado com Zustand
- Tratamento padronizado de erros
- Layout responsivo mobile-first

## ✅ Boas práticas adotadas

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

## 🧰 Setup profissional

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

## 🏗️ Arquitetura do projeto

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
Component
↓
useMenu()
↓
menuService.js
↓
api.js
↓
fakeApi() / Backend real
```

Essa separação facilita:

- manutenção;
- escalabilidade;
- testes;
- substituição de mocks por APIs reais.

## 📂 Estrutura de diretórios

```
src
│
├── app
│ └── routes
│
├── pages
│
├── features
│ ├── auth
│ ├── menu
│ ├── profile
│ ├── subscription
│ ├── checkout
│ ├── orders
│ ├── recipes
│ └── admin
│
├── shared
│ ├── components
│ ├── constants
│ └── utils
│
├── services
│
├── store
│
├── mocks
│
├── config
│
├── styles
│
└── assets
```

### 🏛️ Organização da arquitetura

app/ → composição da aplicação e configuração de rotas

pages/ → páginas institucionais e públicas

features/ → módulos organizados por domínio de negócio, contendo regras, hooks, serviços e fluxos
específicos

shared/ → recursos reutilizáveis por toda a aplicação

services/ → camada de infraestrutura responsável pela comunicação com APIs e serviços externos de
acesso a dados

store → gerenciamento de estado global da aplicação utilizando Zustand; responsável pela
autenticação, controle de loading, erros globais, atualização de perfil, sincronização de sessão

mocks/ → backend fake com dados simulados, persistência durante o desenvolvimento do frontend

config/ → centralização das configurações globais da aplicação e variáveis de ambiente

styles/ → estilos globais da aplicação

assets/ → fonts, imagens, ícones e demais recursos estáticos

## 🧠 Decisões de arquitetura

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

## ⚡ Gerenciamento de estado global

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

## 🔒 Autenticação

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
```

## 🚀 Performance

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

## ♿ Acessibilidade

Práticas implementadas:

- aria-label;
- role="status";
- aria-live="polite";
- menu colapsável utilizando `<details>` e `<summary>`;
- conteúdo visualmente oculto para leitores de tela;
- semântica HTML;
- navegação por teclado;
- texto alternativo para imagens.

## 📱 Responsividade

Estratégia adotada:

```
Mobile First
```

Utilizando:

- Flexbox;
- CSS Grid;
- Media Queries;
- CSS moderno (`margin-inline`, `dvh`, etc.).

## 🛠️ Stack atual

### Frontend

- Vite
- React 19
- React Router
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

## ▶️ Como executar

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

## 🔄 Status atual

### Implementado

- Layout base
- Navegação
- Autenticação mockada
- Perfil
- Cardápio dinâmico
- Mock API
- Zustand
- Proteção de rotas
- Estrutura escalável
- Tratamento de erros
- Responsividade
- Acessibilidade

### Em desenvolvimento

- Assinatura
- Checkout
- Pedidos
- Histórico de entregas
- Receitas
- Painel administrativo
- Página de impacto socioambiental
- Integração com APIs externas

## 🗺️ Roadmap

### Frontend

- Loader avançado
- OAuth
- Receitas salvas
- Compartilhamento de receitas
- Página de impacto
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
- KPI de impacto
- Algoritmo de recomendação
- Gestão de estoque
- Delivery com agendamento

## 🎓 Principais aprendizados

Este projeto foi o primeiro projeto autoral desenvolvido após a conclusão do Bootcamp de
Desenvolvimento Web da TripleTen Brasil.

Durante o desenvolvimento foram explorados pela primeira vez conceitos como:

- arquitetura escalável;
- `feature-based architecture`;
- `component-driven design`;
- gerenciamento de estado com Zustand;
- separação clara de responsabilidades;
- contratos de API;
- mock backend;
- autenticação baseada em JWT `httpOnly`;
- tooling profissional;
- organização de projetos para crescimento futuro.

Mais do que desenvolver uma interface React, o objetivo deste projeto é a construção de uma base
sólida para um produto digital, combinando sustentabilidade, experiência do usuário e boas práticas
de engenharia de software.

Este projeto também marcou minha transição de uma abordagem focada apenas em componentes e
interfaces para uma visão mais ampla de arquitetura, organização de código, escalabilidade e
modelagem de produto.

## 🚀 Próximos passos

  A versão atual representa a construção da base arquitetural do frontend e da experiência do
usuário, preparada para futuras integrações com APIs RESTful, autenticação via JWT com cookies
HttpOnly e persistência em MongoDB.

---

##### Desenvolvido por Vanessa Yuri A. Brito

Projeto autoral desenvolvido para portfólio e evolução para uma solução Full Stack MERN com foco em
sustentabilidade, economia circular e redução do desperdício alimentar. 🌱
