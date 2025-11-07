<!--
Sync Impact Report

Version change: TEMPLATE -> 1.0.0
Modified principles:
- [PRINCIPLE_1_NAME] (placeholder) -> I. Clean Code (Código Limpo)
- [PRINCIPLE_2_NAME] (placeholder) -> II. Performance Requirements (Desempenho)
- [PRINCIPLE_3_NAME] (placeholder) -> III. User Experience (Experiência do Usuário)
- [PRINCIPLE_4_NAME] (placeholder) -> IV. Test-First & Contracts
- [PRINCIPLE_5_NAME] (placeholder) -> V. Observability, Versioning & Simplicity
Added sections: Non-Functional Requirements, Development Workflow (content populated)
Removed sections: none
Templates requiring updates:
- .specify/templates/plan-template.md ✅ updated
- .specify/templates/spec-template.md ✅ updated
- .specify/templates/tasks-template.md ✅ updated
- .specify/templates/agent-file-template.md ✅ updated
- .specify/templates/checklist-template.md ⚠ pending (no structural changes applied)
Follow-up TODOs:
- RATIFICATION_DATE: TODO(RATIFICATION_DATE) — original adoption date not available; please confirm and replace.
-->

# Galeria Constitution

## Core Principles

### I. Clean Code (Código Limpo)
O código deve ser legível, previsível e fácil de manter. Isso inclui: nomes claros e consistentes,
funções pequenas e com única responsabilidade, documentação mínima explicativa onde necessário,
comentários apenas para justificativas (não para explicar código óbvio). Refatoração contínua é
exigida. Ferramentas de qualidade (linters, formatação automática, análise estática) devem estar
ativadas no CI e passarem como pré-requisito para merge. Revisões de código obrigatórias focam em
clareza, simplicidade e aderência aos padrões de projeto adotados.

Rationale: Investir em qualidade de código reduz custo de manutenção, acelera on-boarding e
melhora a segurança do produto.

### II. Performance Requirements (Desempenho)
Todo trabalho com impacto em caminho crítico de execução deve ter metas de desempenho mensuráveis
e verificáveis. Exemplos de metas: latência p95 < 200ms, uso de memória < 150MB por processo, ou
capacidade de X req/s para cargas esperadas. Essas metas devem constar na spec da feature (campo
"Performance Goals") e exportadas para benchmarks e testes de carga automatizados. Mudanças que
afetem performance devem incluir: benchmark antes/depois, análise de regressão e plano de mitigação.

Rationale: Requisitos de desempenho previsíveis preservam a experiência do usuário e evitam
surpresas em produção.

### III. User Experience (Experiência do Usuário)
As decisões de produto e engenharia priorizam jornadas de usuário de maior valor. Cada feature
deve explicar as personas afetadas, o fluxo principal (happy path) e critérios de aceitação UX
(tempo, clareza de feedback, acessibilidade mínima). Experimentos e métricas (tempo até tarefa,
taxa de sucesso, satisfação) orientam escolhas. Erros no cliente devem ser tratados com mensagens
úteis; degradar graciosamente é obrigatório quando aplicável.

Rationale: Boa UX reduz churn, diminui suporte e maximiza o valor entregue por iteração.

### IV. Test-First & Contracts
Testes são mandatórios para todas as mudanças de comportamento: testes unitários, testes de
integração/contrato e, quando aplicável, testes end-to-end. Para APIs públicas e integrações,
contratos (ou pact tests) devem existir e ser verificados em CI. Testes de performance são parte
do contrato sempre que a feature define metas de desempenho.

Rationale: Garantir regressões mínimas e permitir refatorações seguras.

### V. Observability, Versioning & Simplicity
Sistemas precisam ser observáveis: logs estruturados, tracing mínimamente instrumentado e métrica
de saúde. A versão semântica (semver) é requerida para APIs públicas; políticas de deprecação e
comunicação devem acompanhar breaking changes. Preferir soluções simples antes de otimizações
prematuras (YAGNI). Quando complexidade adicional for necessária, documentar o custo-benefício.

Rationale: Observabilidade reduz tempo médio de detecção/resolução; versionamento claro reduz
impacto em consumidores.

## Non-Functional Requirements
Requisitos não-funcionais devem ser explicitados nas specs: objetivos de performance (latência,
throughput), limites de recursos (memória/disk), requisitos de segurança mínimos, objetivos de
disponibilidade e requisitos de compatibilidade. Cada requisito deve ter um critério de teste
associado (ex.: benchmark, teste de carga, auditoria de segurança).

## Development Workflow
Fluxo mínimo esperado:

- Criar spec com: objetivo, público, critérios de aceite (funcionais e não-funcionais), e testes
	obrigatórios (unit/integration/perf/ux).
- Implementar testes que representem critérios de aceite; garantir que falhem antes da implementação
- Implementar funcionalidade respeitando os princípios (Clean Code, Performance, UX)
- Submeter PR com descrição clara, checklist de compliance com a Constituição e evidências de testes
- 2 revisores aprovando (pelo menos 1 técnico), aprovação de produto/UX quando a mudança afetar
	jornadas de usuário críticas
- Merge e monitoramento em staging; executar benchmarks e smoke tests

## Governance
A Constituição prevalece sobre orientações locais divergentes. Alterações à Constituição exigem:

1. Proposta em PR descrevendo a mudança e seu impacto (incluindo tickets de migração se necessário)
2. Revisão pública do time (mínimo 2 aprovações), ao menos 1 membro responsável por arquitetura
3. Plano de migração ou mitigação para breaking changes
4. Versão da constituição atualizada seguindo semver e data de emenda atualizada

Conformidade: PRs que tocam áreas críticas (performance, segurança, API pública) devem incluir
uma seção "Constitution Compliance" com checklist preenchido e evidências (logs de benchmark,
prints de testes, gravações de UX quando aplicável). Revisores confirmam o checklist antes de
aprovar.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE) | **Last Amended**: 2025-11-07
