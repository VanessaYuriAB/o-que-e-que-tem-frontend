<a id="top"></a>

# 🥣 O que é que tem? Na sopa, creme ou patê

> MVP de uma plataforma digital sustentável para redução do desperdício alimentar através da
> transformação de produtos próximos ao vencimento em sopas, cremes e patês personalizados.

🌐 **Aplicação:** https://o-que-e-que-tem-frontend.vercel.app

## Índice

1. [Sobre o projeto 📖](#-1-sobre-o-projeto)
2. [Problema 🎯](#-2-problema)
3. [Solução 💡](#-3-solução)
4. [Principais funcionalidades ✨](#-4-principais-funcionalidades)
5. [Boas práticas adotadas ✅](#-5-boas-práticas-adotadas)
6. [Setup profissional 🧰](#-6-setup-profissional)
7. [Arquitetura do projeto 🏗️](#-7-arquitetura-do-projeto)
8. [Estrutura de diretórios 📂](#-8-estrutura-de-diretórios)
9. [Decisões de arquitetura 🧠](#-9-decisões-de-arquitetura)
10. [Gerenciamento de estado global 🗃️](#-10-gerenciamento-de-estado-global)
11. [Autenticação 🔒](#-11-autenticação)
12. [Performance ⚡](#-12-performance)
13. [Acessibilidade ♿](#-13-acessibilidade)
14. [Responsividade 📱](#-14-responsividade)
15. [Stack atual 🛠️](#-15-stack-atual)
16. [Como executar ▶️](#-16-como-executar)
17. [Status atual 🔄](#-17-status-atual)
18. [Pagamentos 💳](#-18-pagamentos)
19. [Principais desafios 🏔️](#-19-principais-desafios-técnicos)
20. [Principais aprendizados 🎓](#-20-principais-aprendizados)
21. [Melhorias 🔧](#-21-melhorias)
22. [Roadmap 🗺️](#-22-roadmap)
23. [Próximos passos 🚀](#-23-próximos-passos)
24. [Autora 🌱](#-24-autora)

<a id="-1-sobre-o-projeto"></a>

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

[Voltar ao topo 🔝](#top)

---

<a id="-2-problema"></a>

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

[Voltar ao topo 🔝](#top)

---

<a id="-3-solução"></a>

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

[Voltar ao topo 🔝](#top)

---

<a id="-4-principais-funcionalidades"></a>

## ✨ 4. Principais funcionalidades

### Atualmente implementadas

- Cardápio dinâmico baseado na disponibilidade de ingredientes
- Atualização periódica da disponibilidade através de `polling`
- Filtragem de ingredientes por categoria alimentar
- Cadastro, login e autenticação de usuários
- Persistência de sessão (`refresh mock`)
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
- Persistência simulada através de `Mock API`
- Gerenciamento de estado com `Zustand`
- Tratamento padronizado de erros
- Layout responsivo `mobile-first`

[Voltar ao topo 🔝](#top)

---

<a id="-5-boas-práticas-adotadas"></a>

## ✅ 5. Boas práticas adotadas

- Feature-Based Architecture (abordagem leve / adaptada)
- Component-Based Design
- Mobile First
- Colocation de estilos (os estilos permanecem próximos aos componentes aos quais pertencem,
  facilitando manutenção, navegação e evolução da interface)
- Convenção BEM (utilização da metodologia BEM para promover previsibilidade, escalabilidade e
  reutilização dos estilos)
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

[Voltar ao topo 🔝](#top)

---

<a id="-6-setup-profissional"></a>

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

[Voltar ao topo 🔝](#top)

---

<a id="-7-arquitetura-do-projeto"></a>

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

[Voltar ao topo 🔝](#top)

---

<a id="-8-estrutura-do-projeto"></a>

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
autenticação, controle de loading, erros globais, atualização de perfil, sincronização de sessão,
persistência local para carrinho

styles/ → estilos globais da aplicação

[Voltar ao topo 🔝](#top)

---

<a id="-9-decisões-de-arquitetura"></a>

## 🧠 9. Decisões de arquitetura

### Feature-Based Architecture (leve)

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

Os componentes reutilizáveis são desenvolvidos com foco em composição, reutilização e validação de
propriedades através de `PropTypes`.

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
Store
↓
errorHandler
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

#### Store

Gerencia estado global.

#### errorHandler

Traduz erros técnicos para mensagens amigáveis.

#### UI

Decide como apresentar o erro ao usuário.

[Voltar ao topo 🔝](#top)

---

<a id="-10-gerenciamento-de-estado-global"></a>

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
- controle de autenticação via `authChecked`;
- uso de `persist`, `setOptions`, `rehydrate` e `partialize`.

[Voltar ao topo 🔝](#top)

---

<a id="-11-autenticação"></a>

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

Após login, o usuário é redirecionado para a rota originalmente solicitada, com `useLocation`,
preservando `pathname`, `query parameters` e `hash` da navegação anterior.

[Voltar ao topo 🔝](#top)

---

<a id="-12-performance"></a>

## 🚀 12. Performance

Implementações adotadas:

### Carregamento da aplicação

#### Lazy Loading

```js
lazy();
```

#### Suspense

```js
<Suspense />
```

Benefícios:

- Code Splitting;
- menor bundle inicial;
- carregamento sob demanda.

### Otimização de renderização

#### Zustand

O gerenciamento de estado utiliza seletores e `useShallow` para minimizar renderizações
desnecessárias dos componentes que consomem dados globais.

Benefícios:

- menos re-renderizações;
- atualização mais eficiente da interface;
- menor custo de atualização do estado;
- maior escalabilidade da aplicação.

### Otimização de requisições e sincronização de dados

#### Compartilhamento de estado entre rotas via `Outlet Context`

O módulo de cardápio utiliza rotas aninhadas do React Router.

Para evitar múltiplas requisições ao alternar entre categorias, os dados são carregados uma única
vez no componente pai e compartilhados com as rotas filhas através do `Outlet Context`.

Fluxo:

```
Menu
↓
useMenu()
↓
Outlet Context
↓
Categorias do Cardápio
```

Benefícios:

- evita requisições redundantes;
- reduz consumo de recursos;
- melhora a experiência de navegação;
- mantém os dados sincronizados entre as categorias;
- elimina refetches ao trocar de categoria.

#### Atualização periódica de disponibilidade (Polling)

A disponibilidade dos ingredientes pode sofrer alterações durante a navegação do usuário.

Para manter o cardápio atualizado, a aplicação realiza consultas periódicas utilizando
`setInterval`, permitindo sincronizar a interface com a fonte de dados sem a necessidade de
recarregar a página.

Fluxo:

```
fetch inicial
↓
setInterval()
↓
consulta periódica
↓
atualização da interface
```

Benefícios:

- atualização automática do cardápio;
- redução da divergência entre estoque e interface;
- preparação para integração com APIs reais;
- melhor experiência para o usuário;
- menor necessidade de atualização manual da página.

[Voltar ao topo 🔝](#top)

---

<a id="-13-acessibilidade"></a>

## ♿ 13. Acessibilidade

Práticas implementadas:

- aria-label;
- role="status";
- role="alert";
- aria-live="polite";
- aria-live="assertive";
- menu colapsável utilizando `<details>` e `<summary>`;
- conteúdo visualmente oculto para leitores de tela;
- semântica HTML, com uso de elementos como `<section>`, `<fieldset>`, `<legend>`, `<dl>`, `<dt>`,
  `<dd>`, `<address>` e `<strong>`;
- navegação por teclado;
- texto alternativo para imagens.

[Voltar ao topo 🔝](#top)

---

<a id="-14-responsividade"></a>

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

[Voltar ao topo 🔝](#top)

---

<a id="-15-stack-atual"></a>

## 🛠️ 15. Stack atual

### Frontend

- Vite
- React 19
- React Router DOM
- Zustand
- PropTypes

`PropTypes` é utilizado para validação de propriedades em runtime, contribuindo para a
previsibilidade e manutenção dos componentes.

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

[Voltar ao topo 🔝](#top)

---

<a id="-16-como-executar"></a>

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

[Voltar ao topo 🔝](#top)

---

<a id="-17-status-atual"></a>

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

[Voltar ao topo 🔝](#top)

---

<a id="-18-pagamentos"></a>

## 💳 18. Pagamentos

O checkout presente na aplicação representa apenas uma simulação da experiência de compra.

Por se tratar de um MVP desenvolvido para fins educacionais e de portfólio, nenhum gateway de
pagamento real foi integrado e nenhuma transação financeira é processada pela aplicação.

Os campos de pagamento possuem finalidade exclusivamente demonstrativa, servindo apenas para validar
e apresentar o fluxo de compra da plataforma.

[Voltar ao topo 🔝](#top)

---

<a id="-19-principais-desafios-técnicos"></a>

## 🧠 19. Principais desafios técnicos

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

[Voltar ao topo 🔝](#top)

---

<a id="-20-principais-aprendizados"></a>

## 🎓 20. Principais aprendizados

Este projeto foi o primeiro projeto autoral desenvolvido após a conclusão do Bootcamp de
Desenvolvimento Web da TripleTen Brasil.

Durante o desenvolvimento foram estudados e aplicados conceitos como:

- arquitetura escalável;
- `feature-based architecture`;
- `component-driven design`;
- `Lazy Loading` e `<Suspense />`;
- semântica HTML avançada (`<fieldset>`, `<legend>`, `<dl>`, `<dt>`, `<dd>`, `<address>`);
- acessibilidade desde a modelagem dos componentes;
- recursos modernos de CSS, como: `margin-inline`, `dvh`, `decimal-leading-zero` e
  `flex-wrap: balance`;
- persistência de sessão e refresh de autenticação;
- migração de estado entre usuários anônimos e autenticados;
- gerenciamento de carrinhos independentes por usuário;
- rastreamento e histórico de pedidos;
- modelagem de fluxos de assinatura;
- fluxo completo de checkout;
- padronização de datas utilizando `ISO 8601`;
- tratamento de `timezone` e formatação localizada;
- gerenciamento de estado com Zustand;
- persistência avançada com Zustand;
- reidratação de estado após autenticação;
- separação clara de responsabilidades (camada de serviço e camada de apresentação);
- arquitetura baseada em hooks, services e stores;
- contratos de API;
- `mock backend`;
- `Outlet Context` do React Router;
- `polling` com `setInterval`;
- tooling profissional;
- organização de projetos para crescimento futuro.

Mais do que desenvolver uma interface React, o objetivo deste projeto é a construção de uma base
sólida para um produto digital, combinando sustentabilidade, experiência do usuário e boas práticas
de engenharia de software.

Este projeto também marcou minha transição de uma abordagem focada apenas em componentes e
interfaces para uma visão mais ampla de arquitetura, organização de código, escalabilidade e
modelagem de produto.

[Voltar ao topo 🔝](#top)

---

<a id="-21-melhorias"></a>

## 🔧 21. Melhorias

Durante a evolução do MVP foram identificadas oportunidades de melhoria relacionadas à experiência
do usuário, modelagem de negócio e flexibilidade dos fluxos da aplicação.

### Autenticação e experiência do usuário

- Inclusão de um fluxo direto de cadastro a partir do carrinho para usuários não autenticados que
  desejam finalizar uma compra.
- Exibição do formulário de autenticação em modal sobre a página atual, reduzindo interrupções na
  navegação e proporcionando uma experiência mais moderna.
- Possibilidade de autenticação utilizando e-mail ou telefone, sem obrigatoriedade do preenchimento
  de ambos.
- Implementação da funcionalidade "Esqueceu sua senha?" para recuperação de acesso.
- Inclusão da opção "Lembrar-me" para persistência de sessão de forma opcional.

### Checkout e modelagem de pedidos

- Refatoração da estrutura de carrinho e checkout para permitir múltiplos pedidos dentro de uma
  mesma ordem de compra.
- Suporte a múltiplos destinatários, responsáveis e endereços de entrega em uma única compra,
  ampliando cenários de uso para presentes, compras corporativas e pedidos compartilhados.

### Navegação e localização

- Integração do endereço exibido no rodapé com serviços de mapas, permitindo acesso direto à
  localização da operação por meio de clique.

[Voltar ao topo 🔝](#top)

---

<a id="-22-roadmap"></a>

## 🗺️ 22. Roadmap

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
- APIs externas

### Evolução do Produto

- Painel do lojista
- Algoritmo de recomendação
- Gestão de estoque
- Delivery com agendamento

[Voltar ao topo 🔝](#top)

---

<a id="-23-próximos-passos"></a>

## 🚀 23. Próximos passos

A versão atual representa a construção da base arquitetural do frontend e da experiência do usuário,
preparada para futuras integrações com APIs RESTful, autenticação via JWT com cookies HttpOnly e
persistência em MongoDB.

[Voltar ao topo 🔝](#top)

---

<a id="-24-autora"></a>

## 🌱 24. Autora

##### Desenvolvido por Vanessa Yuri A. Brito

Projeto autoral desenvolvido para portfólio, experimentação arquitetural e evolução para uma solução
Full Stack baseada no ecossistema MERN.

O objetivo foi transformar uma ideia de impacto socioambiental em um produto digital escalável,
conectando tecnologia, sustentabilidade, redução de desperdício alimentar e economia circular.

[Voltar ao topo 🔝](#top)
