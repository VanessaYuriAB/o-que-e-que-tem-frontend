# 🔧 Backlog Técnico

Este documento reúne oportunidades de melhoria, refatorações e evoluções arquiteturais identificadas
durante o desenvolvimento do projeto.

Os itens listados não representam necessariamente problemas ou bugs, mas possíveis iniciativas para
melhorar arquitetura, manutenibilidade, acessibilidade, consistência e escalabilidade da aplicação.

## Arquitetura

- Revisar organização de features que possuem componentes, substituindo por seções ou subpáginas.
- Avaliar a migração de componentes genéricos para camadas compartilhadas quando não representarem
  um domínio específico da aplicação.
- Revisar padronização de nomenclatura de blocos e elementos CSS.

## Acessibilidade

- Aplicar aria-labelledby em seções principais da aplicação. Exemplo:

```jsx
<section className="not-found__container" aria-labelledby="not-found-title">
  <h1 id="not-found-title">404</h1>
  <p>Página não encontrada</p>
</section>
```

- Identificar oportunidades adicionais de acessibilidade.
- Avaliar oportunidades de melhoria semântica em formulários através do uso de `fieldset` e
  `legend`, substituindo atributos `title` utilizados como identificação de agrupamentos. Exemplo:
  campos de status (on/off) em `.profile-subscription`.
- Avaliar o uso do número do pedido como `legend` para cada agrupamento de informações na área de
  histórico de pedidos.

## Componentização

- Avaliar a criação de componentes compartilhados para campos de formulário. Exemplos:
  - `FormField`
  - `InputField`
  - `CheckboxField`
- Avaliar extração de componentes reutilizáveis no projeto, por exemplo:
  - Dados cadastrais (também utilizado em `user-profile`);
  - Endereço (também utilizado em `cart`);
  - Configurações (também utilizado em `subscription-profile`).

## UX

- Centralizar sistema de Toast através de hook customizado e/ou store global. Possível arquitetura:

```
Component
↓
useToast()
↓
Toast Store
↓
ToastContainer
```

- Implementar limite máximo de caracteres para mensagens enviadas pelo formulário "Fale Conosco".

Exemplo:

```js
{
  scope: 'local',
  message: 'O texto da mensagem deve ter no máximo 500 caracteres'
}
```

## CSS

- Enriquecer `utilities.css` para estilos utilitários compartilhados. Exemplos:
  - .link-reset
  - .visually-hidden
  - .flex-center
  - .container

- Revisar reutilização de classes entre componentes.
- Reduzir acoplamento de nomes de classes extremamente específicos, extraindo o elemento para um
  componente próprio, com seu próprio bloco BEM. Exemplo:

```
cart__pack-card-link-box
```

Possível evolução:

```
pack__card-link
card__link
```

## Formulários

- Avaliar a criação de um hook compartilhado (`useForm`) para centralizar comportamentos
  recorrentes:
  - Validação de campos;
  - Tratamento e exibição de erros;
  - Controle de submissão (loading);
  - Reset de formulário;
  - Integração com sistema de Toast;
  - Padronização da experiência entre formulários.
- Revisar quais validações podem permanecer nativamente via HTML (`required`, `pattern`,
  `minLength`, `maxLength`) e quais devem ser tratadas por regras de negócio em `JavaScript`.
