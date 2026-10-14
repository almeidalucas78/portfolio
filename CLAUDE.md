# Portfólio Lucas Almeida

Portfólio pessoal de um desenvolvedor web especializado em WordPress, SEO técnico e performance. O front é feito em Next.js com TypeScript e, na etapa 2, passa a consumir um WordPress headless pela REST API.

A prioridade é colocar o portfólio no ar rápido. A IA escreve o código em passos pequenos e o desenvolvedor acompanha; explique de forma breve as decisões não óbvias. O estudo aprofundado de Next.js fica para outro projeto.

## Stack

- Next.js (App Router), React e TypeScript em modo strict
- Tailwind CSS com os tokens do design
- Vitest e Testing Library para testes unitários e de componentes
- ESLint, Prettier e GitHub Actions
- Etapa 2: WordPress com ACF gratuito, MariaDB e Docker Compose; Zod para validar as respostas da API

## Estrutura de pastas

```
src/
  app/             rotas do App Router
  components/      componentes React, um por arquivo
  lib/             funções utilitárias e, na etapa 2, lib/wordpress
  types/           tipos dos modelos (Project, Experience, Profile)
  data/            dados mockados da etapa 1
wordpress/
  plugins/portfolio-core/   plugin próprio (post types, taxonomias, hook de revalidação)
docker-compose.yml          WordPress e MariaDB locais (etapa 2)
docs/                       documentação do projeto
```

## Convenções

- Nomes de código em inglês (variáveis, funções, tipos, componentes). Textos da interface em português.
- Proibido usar `any`. Tipos dos modelos ficam em `src/types`.
- Server Components por padrão. Use `"use client"` só quando houver interatividade (estado, eventos, APIs do navegador), e mantenha esses componentes pequenos.
- Conteúdo sempre buscado no servidor. Nunca busque conteúdo da página com `useEffect`.
- Navegação sempre com o componente `Link` do Next, nunca com `onClick` em elementos que não são links.
- O menu mobile existe sempre no DOM e fica oculto apenas via CSS.
- Cores, fontes e espaçamentos vêm dos tokens do Tailwind. Nada de cores fixas no código.
- Imagens com `next/image` e fontes com `next/font`.
- Lógica fica em funções puras e testáveis; páginas que buscam dados ficam finas.

## Critério de aceite permanente

Em toda tarefa que envolve páginas: o conteúdo e os links precisam estar no HTML entregue pelo servidor, verificável com Ctrl+U ou um crawl sem renderização de JavaScript.

## Modo de trabalho

1. Antes de escrever código, apresente um plano curto e espere aprovação.
2. Uma tarefa por vez, com mudanças pequenas e fáceis de revisar.
3. Explique decisões não óbvias, principalmente sobre Server e Client Components, renderização e cache do Next.js.
4. Tarefas marcadas como **[você escreve]** no ROADMAP também são escritas pela IA (mudança de 2026-10-13, ver `docs/DECISIONS.md`). O desenvolvedor acompanha e revisa.
5. Não adicione dependências sem perguntar.
6. Não altere arquivos fora do escopo da tarefa.
7. Não desfaça decisões registradas em `docs/DECISIONS.md` sem discutir antes.
8. Antes de dar uma tarefa como concluída, rode typecheck, lint e testes.
9. Ao final da sessão, marque o progresso em `docs/ROADMAP.md` e registre decisões novas em `docs/DECISIONS.md`.

## Comandos

```
npm run dev        servidor de desenvolvimento
npm run build      build de produção
npm run lint       ESLint
npm run typecheck  tsc --noEmit
npm run test       Vitest
```

## Documentação

- Progresso atual: @docs/ROADMAP.md
- Arquitetura, modelo de conteúdo e fluxo de dados: `docs/ARCHITECTURE.md` (leia quando a tarefa envolver estrutura, dados ou rotas)
- Decisões e seus motivos: `docs/DECISIONS.md` (leia antes de propor mudanças de stack ou de abordagem)
- Referência visual: `docs/design/` (HTML exportado do Claude Design)

## Referência de design

A pasta `docs/design` contém o protótipo exportado do Claude Design. Ela é apenas referência visual e de comportamento, nunca código do projeto.

- Use os arquivos para entender layout, cores, tipografia, espaçamentos, estados (hover, foco, tema claro e escuro) e responsividade.
- Reimplemente tudo como componentes React em `src/components`, seguindo as convenções deste arquivo. Não copie blocos de HTML, CSS ou JavaScript do protótipo para o projeto.
- Cores, fontes e espaçamentos do protótipo viram tokens do Tailwind. Nunca use os valores soltos direto nos componentes.
- Os textos e projetos do protótipo são fictícios. O conteúdo real vem de `src/data` (etapa 1) e do WordPress (etapa 2).
- Se o protótipo e as regras deste arquivo entrarem em conflito (por exemplo, conteúdo carregado só via JavaScript ou links feitos com onClick), as regras deste arquivo vencem. Avise sobre o conflito e proponha a solução.
- Nunca edite arquivos em `docs/design`.