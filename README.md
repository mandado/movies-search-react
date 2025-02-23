# Movie Search App

## Funcionalidades Principais
- 🔍 Busca em tempo real com autocompletar
- ⭐ Sistema de favoritos com persistência local
- ⌨️ Navegação completa por teclado
- 📱 Interface responsiva
- 🔄 Scroll infinito para resultados
- 🎨 Design moderno e intuitivo

## Tecnologias Utilizadas
- React 18
- TypeScript
- Tailwind CSS
- Vite
- Docker

## Arquitetura
- 📦 Domain: Entidades e regras de negócio
- 🛠️ Application: Casos de uso e interfaces
- 🔌 Infrastructure: Implementações das camadas externas para esse caso de uso
- 🎨 Presentation: Componentes React e UI

## Pré-requisitos   
- Node.js 18+
- Docker (opcional)
- Token de acesso da API TMDB


## Instalação e Execução

### Desenvolvimento

```bash
docker build --target development -t movie-search:dev .

# Executar o container de desenvolvimento
docker run -it \
  -p 5173:5173 \
  -v $(pwd):/app \
  -v /app/node_modules \
  -e VITE_TMDB_ACCESS_TOKEN=seu_token_aqui \
  movie-search:dev
```

### Produção

```bash
# Construir a imagem de produção
docker build --target production -t movie-search:prod .

# Executar o container de produção
docker run -p 80:80 \
  -e VITE_TMDB_ACCESS_TOKEN=seu_token_aqui \
  movie-search:prod

```

### Desenvolvimento Local

1. Clone o repositório
2. Instale as dependências

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
VITE_TMDB_ACCESS_TOKEN=seu_token_aqui
```

4. Inicie o projeto:
```bash
npm run dev
```

