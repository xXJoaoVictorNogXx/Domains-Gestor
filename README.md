# 🚀 Domains Gestor

Um painel web desenvolvido para gestão de domínios e controlo de acessos, focado numa interface limpa, escalabilidade e numa arquitetura de front-end robusta.

## 📖 Sobre o Projeto

Este projeto foi construído para proporcionar uma experiência fluida ao utilizador, separando claramente a camada de apresentação da camada de dados. 

**Destaque Técnico:** Durante a fase inicial de desenvolvimento, foi utilizado o `json-server` para simular uma API (mock) e testar o fluxo de autenticação. No entanto, para o deploy em produção na Vercel (que utiliza uma arquitetura *serverless* de apenas leitura para ficheiros estáticos), a aplicação foi migrada para o **Supabase**. Esta transição garantiu um sistema de autenticação real, com geração de tokens JWT seguros e gestão nativa de sessões.

## 🛠️ Tecnologias Utilizadas

* **Front-end:** Next.js, React
* **Estilização:** Tailwind CSS e componentes [shadcn/ui](https://ui.shadcn.com/)
* **Comunicação de Dados:** Axios + React Query (@tanstack/react-query)
* **Backend as a Service & Autenticação:** Supabase
* **Notificações (Toasts):** Sonner
* **Deploy:** Vercel

## ✨ Funcionalidades

* 🔐 **Autenticação Segura:** Login de utilizadores gerido pelo Supabase Auth.
* 🛡️ **Rotas Protegidas:** Redirecionamento automático e proteção de rotas (ex: `/domains`) para utilizadores não autenticados.
* ⚡ **Gestão de Estado Assíncrono:** Utilização do React Query para otimizar as requisições, gerir o estado de *loading* e tratar erros de forma eficiente.
* 🎨 **Interface Responsiva:** Design adaptável a diferentes ecrãs, utilizando Tailwind CSS.

## 🚀 Como correr o projeto localmente

### Pré-requisitos
* Node.js instalado na sua máquina (versão 18+ recomendada)
* Uma conta no [Supabase](https://supabase.com/) com um projeto criado.

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/SEU-USUARIO/nome-do-repositorio.git](https://github.com/SEU-USUARIO/nome-do-repositorio.git)
   cd nome-do-repositorio

```

2. **Instale as dependências:**
```bash
npm install
# ou yarn install / pnpm install

```


3. **Configure as Variáveis de Ambiente:**
Crie um ficheiro chamado `.env.local` na raiz do projeto e adicione as suas chaves do Supabase (encontradas no painel do projeto em *Project Settings > API*):
```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_do_supabase

```


4. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev

```


5. **Aceda à aplicação:**
Abra [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) no seu navegador.

## 📦 Deploy

Este projeto está configurado para ser facilmente publicado na Vercel(https://domains-gestor.vercel.app). Lembre-se de adicionar as variáveis de ambiente (`NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`) no painel de configurações (Settings > Environment Variables) da Vercel antes de realizar o deploy.

---

Desenvolvido por João Victor Nogueira/www.linkedin.com/in/joão-victor-nogueira-519359261



```

**O que precisa de alterar antes de guardar:**
1. O título principal `[Nome do Seu Projeto]`.
2. A descrição breve sobre o que o sistema realmente faz.
3. O link do `git clone` no passo a passo.
4. O seu nome e o link do seu LinkedIn no final do documento.

Se precisar de acrescentar mais alguma página ou funcionalidade a este README, é só avisar!

```
