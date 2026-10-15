# Roadmap

Legenda: **[você escreve]** planejado para o desenvolvedor escrever; desde 2026-10-13 a IA escreve e o desenvolvedor acompanha · **[critério]** critério de aceite · **[decisão]** escolha pendente

Fase atual: **2**

## Etapa 1: MVP no ar (cerca de 5 semanas)

### Fase 0: Preparação (semana 1)
- [x] Criar o repositório no GitHub e clonar na máquina
- [x] Adicionar CLAUDE.md e a pasta docs
- [x] Estudo guiado: App Router, rotas e layouts
- [x] Estudo guiado: Server Components e Client Components
- [x] Estudo guiado: busca de dados e geração estática

### Fase 1: Fundação (semana 2)
- [x] Criar o projeto Next.js com TypeScript strict e App Router
- [x] Configurar o Tailwind com os tokens de cor e tipografia do design
- [x] Carregar as fontes com `next/font`
- [x] [decisão] next-themes ou implementação própria do tema
- [x] [você escreve] Alternância de tema claro e escuro sem piscar no carregamento
- [x] Cabeçalho e rodapé
- [x] ESLint e Prettier configurados
- [ ] ~~GitHub Actions rodando typecheck, lint e build a cada push~~ (pulado em 2026-10-14, ver DECISIONS)
- [x] [critério] Layout base visível no HTML sem JavaScript

### Fase 2: Home (semanas 3 e 4)
- [x] [você escreve] Tipos Project, Experience e Profile
- [x] Dados mockados em arquivos TypeScript
- [x] Hero
- [ ] Cards de projeto
- [x] [você escreve] PerformanceBadge com a nota do PageSpeed
- [ ] [você escreve] Filtro de categorias
- [ ] Seções de stacks, experiência, sobre e contato
- [ ] Configurar Vitest e Testing Library
- [ ] Testes do filtro e do PerformanceBadge
- [ ] [critério] Textos e links no HTML sem JavaScript
- [ ] [critério] Menu mobile sempre no DOM, oculto só via CSS

### Fase 3: Página de case (semana 5)
- [ ] [você escreve] Rota `/projetos/[slug]` com generateStaticParams
- [ ] Painel de PageSpeed e Core Web Vitals
- [ ] [você escreve] INP e demais campos opcionais tratados sem quebrar o layout
- [ ] Função que classifica as métricas em bom, precisa melhorar e ruim, com testes
- [ ] Navegação entre projetos anterior e próximo
- [ ] [critério] Conteúdo do case no HTML sem JavaScript

### Fase 4: Lançamento (fim da semana 5)
- [ ] Confirmar com a Gear SEO o que pode ser divulgado sobre os clientes
- [ ] Conteúdo real de dois ou três projetos com métricas medidas
- [ ] Trocar placeholders: cargo e contatos reais
- [ ] Metadata por página com a Metadata API
- [ ] `sitemap.ts` e `robots.ts`
- [ ] Dados estruturados Person em JSON-LD
- [ ] Revisão de acessibilidade e responsividade
- [ ] Deploy na Vercel, domínio no Registro.br e DNS na Cloudflare
- [ ] Medir e publicar a nota do PageSpeed do próprio portfólio
- [ ] [critério] Crawl no Screaming Frog sem renderização de JavaScript

**Marco: portfólio pronto para a candidatura.**

## Etapa 2: WordPress headless (cerca de 4 semanas)

### Fase 5: CMS local com Docker
- [ ] Estudo guiado: imagens, containers, volumes e redes no Docker
- [ ] `docker-compose.yml` com WordPress e MariaDB, versionado no repositório
- [ ] Plugin `portfolio-core` montado como volume no container
- [ ] Post types Projetos e Experiências registrados em código
- [ ] Taxonomias de categoria e tecnologia
- [ ] Campos ACF com exibição na REST API ativada
- [ ] Página Perfil com os campos do hero, sobre e contatos
- [ ] WordPress fora do índice: front desativado e noindex
- [ ] Cadastrar no painel os projetos que estão nos mocks

### Fase 6: Integração
- [ ] Variável `WORDPRESS_API_URL` no `.env.local`
- [ ] [você escreve] Camada `lib/wordpress` com funções tipadas
- [ ] Validação das respostas da API com Zod
- [ ] Substituir os mocks pelas funções da API
- [ ] Campos vazios ou ausentes tratados em todas as páginas
- [ ] [critério] Conteúdo vindo do WordPress presente no HTML sem JavaScript

### Fase 7: Hospedagem e revalidação
- [ ] [decisão] Oracle Cloud Always Free ou hospedagem barata
- [ ] Publicar o WordPress, com Docker se for na Oracle
- [ ] [você escreve] Rota `/api/revalidate` protegida por token
- [ ] Hook no save_post do plugin chamando a revalidação
- [ ] Testar de ponta a ponta: salvar no painel e ver no site

## Etapa 3: Qualidade contínua

### Fase 8: Evolução
- [ ] Lighthouse CI no pipeline barrando quedas de performance
- [ ] Testes E2E das páginas com Playwright
- [ ] Revisão geral do código em uma sessão separada
- [ ] Atualizar LinkedIn e currículo com o que foi aprendido
