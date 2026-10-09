# Decisões

Registro das escolhas do projeto e seus motivos. Antes de propor mudar alguma delas, discuta o motivo registrado aqui. Novas decisões entram no final, com data.

## 2026-10-04 · Next.js em vez de React puro (SPA)
Uma SPA entrega um HTML quase vazio e depende do JavaScript para montar o conteúdo. Isso prejudica a indexação, quebra o preview de links no LinkedIn e no WhatsApp (que não executam JavaScript) e piora o LCP. O Next.js entrega o HTML pronto e já traz rotas, metadata, sitemap, otimização de imagens e rotas de API para o webhook. Também é o framework React mais pedido no mercado. O Astro foi considerado, mas tem menos presença em vagas.

## 2026-10-04 · TypeScript em modo strict
Os tipos funcionam como contrato entre o WordPress e o front, e o modo strict evita erros com campos opcionais, como o INP.

## 2026-10-04 · MVP estático antes do WordPress
O portfólio precisa ficar pronto rápido para uma candidatura freelancer, e a hospedagem do WordPress ainda não foi definida. O site vai ao ar com dados em arquivos TypeScript, e os mesmos tipos guiam a integração com o WordPress depois.

## 2026-10-04 · WordPress headless com REST API
A REST API é nativa e já conhecida. Não há necessidade de GraphQL para o volume de conteúdo do portfólio.

## 2026-10-04 · ACF gratuito, sem recursos do PRO
Repeater, options page e galeria são do ACF PRO. O modelo usa post types, taxonomias e uma página Perfil com campos no lugar desses recursos.

## 2026-10-04 · SEO no Next.js, sem Rank Math
Em headless, o Rank Math entrega o head como um bloco de HTML pelo endpoint getHead, com URLs do domínio do WordPress, exigindo interpretação do HTML e reescrita de canonicals. Para poucas páginas com campos controlados, a Metadata API, `sitemap.ts` e o JSON-LD em código são mais simples e corretos. A integração com o Rank Math pode ser estudada à parte no futuro.

## 2026-10-04 · Tailwind CSS
Transforma os tokens do design em classes reutilizáveis, facilita os temas claro e escuro e é comum em vagas React.

## 2026-10-04 · Vitest e Testing Library em vez de Jest
O Vitest lida nativamente com TypeScript, ESM e importações de CSS, exige menos configuração e é mais rápido no modo watch. A API é praticamente igual à do Jest, então o conhecimento é transferível. Limitação: não suporta Server Components assíncronos, que serão cobertos com Playwright.

## 2026-10-04 · Docker em vez de LocalWP
O ambiente fica descrito no `docker-compose.yml` versionado no repositório, é reproduzível em qualquer máquina, pode ser igual ao de produção se o WordPress for para a Oracle e serve de aprendizado de Docker.

## 2026-10-04 · Zod para validar a API
O TypeScript não verifica dados em tempo de execução. O Zod garante que a resposta do WordPress bate com os tipos antes de chegar aos componentes.

## 2026-10-04 · Hospedagem do front na Vercel
Deploy automático a cada push e integração nativa com o Next.js. A hospedagem do WordPress fica pendente para a fase 7.

## 2026-10-04 · Site apenas em português
O público principal é brasileiro: recrutadores e clientes freelancer.

## Pendentes
- next-themes ou implementação própria do tema (fase 1)
- Hospedagem do WordPress: Oracle Cloud Always Free ou opção barata (fase 7)
