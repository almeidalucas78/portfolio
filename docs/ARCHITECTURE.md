# Arquitetura

## Visão geral

```
[WordPress headless]  --REST API-->  [Next.js no servidor]  --HTML pronto-->  [Navegador e robôs]
 painel de conteúdo                   gera as páginas                          hidratação do React
 (etapa 2)                            estáticas                                para a interatividade
        |                                    ^
        +---- hook save_post --> /api/revalidate (com token)
```

- **Etapa 1:** os dados vêm de arquivos TypeScript em `src/data`. O site vai ao ar sem depender do WordPress.
- **Etapa 2:** os mesmos dados passam a vir da WP REST API. Os componentes não mudam, porque os tipos em `src/types` são o contrato que a API precisa cumprir.

## Renderização

- Todas as páginas são geradas estaticamente.
- Na etapa 2, a atualização acontece por revalidação sob demanda: ao salvar um conteúdo no WordPress, o hook `save_post` chama a rota `/api/revalidate` do Next.js, que revalida só as páginas afetadas.
- Os dados são buscados no servidor. Isso garante o conteúdo no HTML, evita problemas de CORS e não expõe o endereço do WordPress no navegador.
- Componentes de cliente apenas onde há interatividade: troca de tema, filtro de categorias e menu mobile.

## Rotas

| Rota | Conteúdo |
|---|---|
| `/` | Home: hero, projetos com filtro, stacks, experiência, sobre e contato |
| `/projetos/[slug]` | Página de case, gerada com `generateStaticParams` |
| `/api/revalidate` | Webhook de revalidação, protegido por token (etapa 2) |
| `/sitemap.xml` e `/robots.txt` | Gerados por `sitemap.ts` e `robots.ts` |

## Modelo de conteúdo

Na etapa 1 estes modelos existem como tipos e mocks. Na etapa 2 viram estruturas do WordPress.

### Projeto (post type `projeto`)

- Título, slug, resumo de uma linha, ano, tipo de projeto, papel, URL do site no ar, screenshot
- Desafio, solução e resultado
- PageSpeed mobile: performance, acessibilidade, boas práticas e SEO
- Nota de performance antes da otimização (opcional)
- Core Web Vitals: LCP, CLS e INP
- Destaque no hero (sim ou não) e ordem de exibição
- Taxonomia **categoria**: institucional, e-commerce, conteúdo, headless (alimenta o filtro)
- Taxonomia **tecnologia**: etiquetas dos cards

**Sobre o INP:** o Lighthouse não mede INP, porque é uma métrica de interação real. Ele só existe nos dados de campo do PageSpeed Insights (CrUX), e sites com pouco tráfego não têm esse dado. Por isso o campo é opcional e some da interface quando estiver vazio.

### Experiência (post type `experiencia`)

Cargo, empresa, início, fim (vazio significa emprego atual) e descrição curta.

### Stack

Cada tecnologia vinculada a um grupo: Desenvolvimento, Infraestrutura, SEO e Performance, Conhecimentos adicionais.

### Perfil (página comum com campos ACF)

Nome, título, frase do hero, status de disponibilidade, texto do sobre, foto, formação e links de contato. Substitui a options page do ACF PRO.

### Observações do WordPress

- Repeater, options page e galeria são recursos do ACF PRO. O modelo acima evita os três de propósito.
- Cada grupo de campos ACF precisa estar com a exibição na REST API ativada.
- Post types e taxonomias são registrados em código no plugin `portfolio-core`, versionado no repositório.
- O WordPress fica fora do índice: front desativado ou redirecionado e noindex em todo o site.

## Camada de dados (etapa 2)

`src/lib/wordpress` concentra todo o acesso à API, com funções tipadas como `getProjects`, `getProject`, `getProfile` e `getExperiences`. Cada resposta é validada com Zod antes de ser usada, porque o TypeScript não verifica dados em tempo de execução. Os componentes nunca chamam a API diretamente.

## SEO

- Metadata por página com a Metadata API do Next.js, a partir dos campos do conteúdo.
- `sitemap.ts` e `robots.ts` nativos.
- JSON-LD do tipo Person na home.
- Canonicals sempre no domínio do portfólio.

## Testes

- **Vitest e Testing Library:** funções puras (classificação das Core Web Vitals, formatação de métricas) e componentes síncronos (filtro, PerformanceBadge).
- O Vitest não suporta Server Components assíncronos. Páginas que buscam dados ficam finas e serão cobertas por testes E2E com Playwright na etapa 3.
- **Lighthouse CI** na etapa 3, barrando quedas de performance.

## Ambiente e variáveis

- Front: Node.js com `npm run dev`.
- WordPress local (etapa 2): `docker compose up` sobe WordPress e MariaDB. O plugin `wordpress/plugins/portfolio-core` é montado como volume no container.
- `WORDPRESS_API_URL`: endereço da API do WordPress (`.env.local` no desenvolvimento).
- `REVALIDATE_TOKEN`: segredo compartilhado entre o hook do WordPress e a rota de revalidação.

## Hospedagem

- Front: Vercel, com deploy a cada push.
- WordPress: a definir (Oracle Cloud Always Free ou hospedagem barata).
- Domínio no Registro.br e DNS na Cloudflare.
