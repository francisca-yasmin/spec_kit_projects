# Feature Specification: Photo Albums (Organizar Fotos em Álbuns)

**Feature Branch**: `1-photo-albums`  
**Created**: 2025-11-07  
**Status**: Draft  
**Input**: Crie uma aplicação que me ajude a organizar minhas fotos em albuns separados, que eu consiga organizar por data, e assim que eu clico no album as fotos são visualizadas semelhantes a mosaicos. o album nunca fica dentro de outros albuns. os albuns podem ser reorganizados clicando e arrastando para a pagina principal

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create & Browse Albums (Priority: P1)

Como usuário quero criar álbuns e ver suas fotos organizadas por data para que eu consiga navegar minhas fotos de forma rápida e lógica.

**Why this priority**: Remover fricção na organização de fotos é o valor central deste recurso.

**Independent Test**: Criar um álbum, adicionar fotos, ordenar por data e abrir o álbum para ver as fotos em mosaico.

**Acceptance Scenarios**:

1. **Given** o usuário está na página principal, **When** cria um novo álbum com nome "Férias", **Then** o álbum aparece na lista principal.
2. **Given** um álbum contém fotos com metadados de data, **When** o usuário ordena por data, **Then** as fotos aparecem ordenadas (mais recentes primeiro por padrão).
3. **Given** o usuário clica num álbum, **When** a visualização do álbum abrir, **Then** as fotos são exibidas em um layout tipo mosaico responsivo e acionável.

---

### User Story 2 - Reorder Albums (Priority: P2)

Como usuário quero reorganizar a ordem dos álbuns na página principal arrastando e soltando para priorizar os mais relevantes.

**Why this priority**: Organização visual dos álbuns melhora descoberta e uso diário.

**Independent Test**: Mudar a ordem de dois álbuns e verificar que a nova ordem persiste na sessão/conta.

**Acceptance Scenarios**:

1. **Given** dois álbuns A e B, **When** o usuário arrasta A para a posição de B, **Then** A ocupa a posição de B e B desloca-se.
2. **Given** o usuário recarrega a página, **When** visualiza a lista de álbuns, **Then** a ordem persistida reflete a alteração anterior.

---

### User Story 3 - Non-nested Albums & Quick Preview (Priority: P3)

Como usuário quero que álbuns não sejam aninhados (um álbum nunca fica dentro de outro) e consiga pré-visualizar rapidamente o conteúdo ao passar o mouse ou clicar.

**Why this priority**: Mantém uma navegação simples e previsível; evita complexidade de hierarquias.

**Independent Test**: Tentar mover um álbum para outro e verificar que a operação é proibida/ignorada.

**Acceptance Scenarios**:

1. **Given** a UI de arrastar, **When** o usuário tentar soltar um álbum dentro de outro, **Then** a ação não cria hierarquia e o sistema indica que a operação não é permitida.
2. **Given** a listagem de álbuns, **When** o usuário passa o mouse sobre um álbum, **Then** uma prévia em miniatura (ou contagem mínima) aparece.

---

### Edge Cases

- Fotos sem metadado de data devem suportar ordenação por data de arquivo ou permitir que o usuário defina a data manualmente.
- Muitos arquivos (ex.: >2000 fotos num álbum) devem exibir paginação/virtualização para evitar travamentos no cliente.
- Arquivos corrompidos ou formatos não suportados devem ser ignorados com mensagem de erro clara ao usuário.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST permitir criar, renomear e deletar álbuns na página principal.
- **FR-002**: O sistema MUST permitir adicionar/remover fotos de um álbum e extrair data das fotos por metadado EXIF; quando ausente usar data do arquivo.
- **FR-003**: A visualização do álbum MUST apresentar fotos em layout mosaic responsivo; cada foto é clicável para abrir em visualização ampliada.
- **FR-004**: Álbuns NÃO PODEM ser aninhados; operação de arrastar-para-dentro deve ser prevenida ou revertida com feedback ao usuário.
- **FR-005**: O usuário MUST poder reorganizar a ordem dos álbuns por drag-and-drop na página principal; a ordem deve persistir.
- **FR-006**: O sistema MUST permitir filtrar/ordenar as fotos do álbum por data (asc/desc) e por outras facetas simples (ex.: tag, localização) quando disponível.
- **FR-007**: A UI MUST ser responsiva e acessível (teclado e leitores de tela básicos) para as operações principais.

*Observação*: Requisitos são redigidos como regras testáveis. Implementação (web/native) não está especificada aqui.

### Key Entities *(include if data involved)*

- **Album**: id, title, description (opcional), coverPhotoId (opcional), orderIndex, createdAt, updatedAt
- **Photo**: id, albumId, filename, filepath (or cloud reference), capturedAt (EXIF), uploadedAt, metadata (EXIF/geo), thumbnailPath
- **User**: id, preferences (ordenacao default), (somente se multi-usuário)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Usuário consegue criar e abrir um álbum com até 200 fotos em menos de 2 ações (criar → abrir) sem erros.
- **SC-002**: 95% das aberturas de álbum com conjuntos típicos de fotos exibem o mosaico inicial em menos de 1s em conexões usuais de internet móvel.
- **SC-003**: Reordenar álbuns por drag-and-drop persiste e reflete corretamente na 99% das tentativas (tolerância para falhas de rede tratadas por retry e feedback).
- **SC-004**: A taxa de sucesso em completar a tarefa primária (abrir e navegar um álbum) deve ser >= 95% em testes de usabilidade com 10 usuários.

## Assumptions

- Plataforma alvo: web responsiva (desktop + mobile web).  
- Persistência por padrão: local SQLite embarcado no cliente (ou pacote local) para armazenamento de metadados e paths; arquivos de mídia podem residir no filesystem local ou em armazenamento vinculado.  
- Autenticação/Usuários: single-user local por padrão (SQLite local não provê sincronização multi-device por si só); suporte a multi-user e sincronização ficará para roadmap.

## Constraints

- Álbuns não devem suportar hierarquias (restrição de UX).  
- Uploads massivos devem ser processados de forma assíncrona com feedback ao usuário.

## Test Plan

- Unit tests: criação/edição/exclusão de álbum, adição/remoção de fotos, ordenação por data.
- Integration tests: persistência da ordem dos álbuns, visualização do mosaico, comportamento de arrastar-e-soltar.
- Performance tests: abrir álbum com 200 fotos carregando miniaturas (benchmark de render/latência).
- Accessibility tests: navegação por teclado e leitura de labels por leitor de tela.

## Constitution Compliance (MANDATORY)

Conforme a Galeria Constitution:

- Clean Code: Requisitos e aceitação claros; o projeto deverá incluir linting/formatting (ex.: regras do time) e revisão de código focada em simplicidade e clareza.
- Performance Goals: meta de exibição do mosaico (SC-002) e limitador de escala (virtualização/pagination) para álbuns grandes.
- UX Acceptance: personas principais (usuário pessoal), fluxo happy-path (criar → abrir → navegar), pré-visualização e mensagens de erro claras.
- Test Plan: lista de testes unit/integration/perf e critérios de aceitação descritos neste documento; estratégia test-first recomendada.
- Observability Plan: medir tempo de abertura de álbum e erros de carregamento; logs de falha de upload; métricas agregadas para taxa de sucesso de reordenação.

## Open Questions / Clarifications

Nenhuma — todas as questões abertas foram respondidas: TARGET_PLATFORM = web responsiva; STORAGE_LOCATION = backend em nuvem; MULTI_USER_AUTH = planejar suporte multi-usuário no roadmap (inicialmente single-user).

## Notes

- O design deve priorizar uma experiência rápida de descoberta e edição leve.  
- Se integração com serviços de fotos existentes (Google Photos, iCloud) for desejada, isso será uma extensão futura e requererá especificações adicionais.

---

**Return**: SUCCESS (spec draft written to `specs/1-photo-albums/spec.md`)
