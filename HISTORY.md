# Movie Search App

## Escolhas Tecnológicas

1. **React + TypeScript**: Escolhido por:
   - Segurança de tipos e melhor experiência de desenvolvimento
   - Componentização e reusabilidade
   - Grande ecossistema e suporte da comunidade
   - Otimizações de performance nativas

2. **Tailwind CSS**: Selecionado por:
   - Desenvolvimento rápido de UI
   - Utilitários responsivos integrados
   - Bundle size reduzido com PurgeCSS
   - Sistema de design consistente

3. **Vite**: Escolhido como ferramenta de build por:
   - Servidor de desenvolvimento extremamente rápido
   - Tempos de build otimizados
   - Arquitetura moderna
   - Excelente suporte a TypeScript

## Arquitetura e Padrões

1. **Clean Architecture**:
   - Separação clara entre domínio, aplicação e infraestrutura
   - Inversão de dependências com interfaces
   - Entidades e casos de uso bem definidos
   - Facilita testes e manutenção

2. **Context API**:
   - Gerenciamento de estado global para favoritos
   - Configurações da API TMDB centralizadas
   - Reduz prop drilling

3. **Repository Pattern**:
   - Abstração do acesso a dados
   - Facilita troca de implementações (localStorage, API)
   - Melhor testabilidade

## Funcionalidades Implementadas

1. **Busca em Tempo Real**:
   - Debounce para chamadas API
   - Autocompletar com sugestões
   - Feedback visual durante carregamento
   - Tratamento de erros

2. **Navegação por Teclado**:
   - Setas para navegar resultados
   - Atalhos para favoritar (espaço)
   - Autocompletar com setas laterais
   - Scroll automático ao navegar

3. **Scroll Infinito**:
   - Intersection Observer para detecção
   - Carregamento sob demanda
   - Indicador de carregamento
   - Cache de resultados

4. **Favoritos**:
   - Persistência em localStorage
   - Toggle com animação
   - Lista separada de favoritos
   - Sincronização entre componentes

## Próximos Passos

1. Implementar testes unitários e de integração
2. Melhorar acessibilidade (ARIA labels, roles)
3. Adicionar animações de transição
4. Adicionar documentação com Storybook
5. Melhorar UX mobile
6. Usar Zustand para gerenciar o estado global permitindo

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

