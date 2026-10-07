# Landing /analise — direção baseada na referência V4

## Decisão estratégica

Referência analisada em 07/10/2026: https://lps.v4company.com/assessoria/go-modular-b

A página foi inspecionada no navegador em desktop e mobile. Sua sequência observável é: navegação curta; abertura com promessa, benefícios e formulário; endosso com retrato; depoimentos; indicadores de escala; serviços em abas; tecnologia; FAQ. Predominam fundo de marca, painel de captação branco, transições claras arredondadas, títulos com destaques de cor e CTAs frequentes. Não tivemos acesso às métricas da V4, portanto não atribuímos resultados ao layout.

A Striker adota essa gramática visual e narrativa com identidade navy/cyan e texto próprio. A oferta continua sendo uma análise da presença digital, não assessoria de marketing completa. A captação usa um painel de conversa com WhatsApp direto: não solicita faturamento, telefone ou e-mail antes do contato. Isso preserva a baixa fricção para o público do Instagram.

## Estrutura final

1. **Abertura:** qualificação do público, headline orientada a valor, três benefícios e painel branco de solicitação. No celular há um CTA antecipado antes dos benefícios.
2. **Posicionamento e confiança:** argumento da marca ao lado de uma área de retrato/projeto. Sem endosso fictício.
3. **Provas sociais:** dois espaços para relatos e quatro para logos na prévia. Os dados reais podem ser preenchidos no início do JavaScript. Sem material, o bloco fica oculto na versão normal.
4. **Para quem é:** quatro situações concretas substituem números de escala que não existem documentados para a Striker.
5. **Escopo modular:** Google, Instagram, site/página e WhatsApp em abas acessíveis. Cada aba combina arte, pergunta central e pontos observados.
6. **Processo:** apresentação do negócio, leitura da jornada e conversa sobre prioridades.
7. **FAQ:** cinco objeções, incluindo ausência de site, adequação e limites de resultado.
8. **Convite final e rodapé:** mesma ação de WhatsApp, sem caminhos comerciais concorrentes.

## Visual e responsividade

- Navy #03111C, cyan #26D7FF, branco e off-white #F6F8FA.
- Header branco; hero com curvas de marca em CSS; painel de conversão branco; bloco claro arredondado de confiança e provas; restante escuro com faixa clara de FAQ.
- Arial/Helvetica já utilizadas no projeto; sem nova fonte remota.
- Conteúdo até 1.120 px; margens de 20 px no celular; seções com 60 px de respiro mobile e 85 px desktop.
- H1 38–62 px, H2 30–50 px e corpo 14–17 px. Cyan pontual e títulos com trechos destacados.
- CTAs arredondados de no mínimo 58 px; o CTA do painel tem cantos discretos.
- Mobile em uma coluna, abas quebram em linhas, áreas de arte se reorganizam. Desktop em duas colunas no hero/posicionamento/processo, quatro cartões de público e duas avaliações por linha.
- Sem carrossel automático, animação contínua ou dependência de hover. Transições respeitam movimento reduzido.

## Preencher imagens e provas reais

Prévia com áreas reservadas: http://127.0.0.1:4173/analise?preview=assets

Versão sem marcadores: http://127.0.0.1:4173/analise

O parâmetro de prévia é apenas um recurso de revisão visual; não é autenticação. Não há dados privados nesses espaços.

### Foto principal

No início de `analise/analise.js`, preencher `ANALISE_CONTENT.teamImage` com o caminho da imagem e `teamImageAlt` com uma descrição verdadeira. Sugestão: WebP/AVIF convertido para WebP se necessário pela hospedagem atual, proporção aproximada de 4:5, 900 × 1.100 px. O servidor atual reconhece WebP. Enquadrar o assunto no centro, evitando texto na imagem; o rodapé visual já identifica a Striker. A arte tipográfica continua como fallback caso a imagem não seja carregada.

### Avaliações

Preencher o array `ANALISE_CONTENT.reviews` com objetos contendo:

- `quote`: texto literal do relato aprovado;
- `name`: nome autorizado do cliente;
- `company`: empresa/cargo;
- `sourceUrl`: link opcional do relato original;
- `photo`: caminho opcional da foto autorizada (quadrada, cerca de 160 × 160 px).

Não existem notas, estrelas, porcentagens ou nomes fictícios. Ao inserir os relatos completos, os cartões reais substituem automaticamente os espaços reservados. O conteúdo é inserido como texto, não HTML.

### Logos

Preencher `ANALISE_CONTENT.logos` com `{ src, name }` de empresas realmente atendidas, com autorização de uso. Preferir SVG ou PNG/WebP transparente, legível sobre fundo claro. Os arquivos devem ficar em `/assets/striker/analise/` (criar a pasta ao adicionar os materiais).

### Artes das abas e fundo

O HTML contém pontos identificados por `data-asset-slot="google"`, `instagram`, `site` e `whatsapp`. Substituir a região `.channel-visual` por uma imagem com dimensões explícitas e texto alternativo adequado; manter heading e texto em HTML. Recomenda-se arte sem textos essenciais, aproximadamente 1.200 × 600 px, com conteúdo principal centralizado para mobile. As figuras atuais são ilustrações tipográficas, não certificações ou vínculos com plataformas.

A `.hero-art` pode receber uma imagem de fundo futura em CSS. A versão atual usa apenas gradientes e curvas, sem downloads ou imagens quebradas. Não remover o contraste necessário para ler a copy.

## Implementação

Somente `analise/index.html`, `analise/analise.css`, `analise/analise.js` e esta documentação foram reconstruídos nesta revisão. Os arquivos da homepage foram conferidos por hash antes/depois e permanecem iguais. A rota adicionada anteriormente no servidor foi mantida.

Abas: clique, setas esquerda/direita, Home/End e foco gerenciado; sem JS, todos os canais permanecem no HTML. FAQ com `details`/`summary`. Todos os CTAs contêm link e mensagem do WhatsApp no próprio HTML. Provas e imagens configuráveis têm validação básica de URL e conteúdo textual; não há envio de dados ou cookies.

Evento existente `striker:analise-whatsapp` preservado com `placement` e `page`. Ele sinaliza intenção de saída, não lead confirmado. Não há Pixel/GA4 integrado nesta entrega.

## Validação desta revisão

Navegador em 320, 360, 390, 768, 1024 e 1440 px: sem overflow horizontal; CTAs iniciais visíveis nas alturas verificadas; sem imagens quebradas. Abas verificadas por clique e teclado (Home/End); FAQ abre por interação; todos os CTAs apontam ao número já utilizado no site. Modo normal oculta placeholders e provas vazias; modo de prévia mostra os espaços reservados. Capturas de desktop, mobile e provas sociais revisadas. JS passou na checagem de sintaxe. Ausência de JS foi revisada pela estrutura estática, sem repetir o teste de navegador com JS desativado nesta revisão.

## Publicação

Branch `landing-analise`, PR de revisão: https://github.com/strikercslago/Striker/pull/1

Não houve merge nem publicação no domínio. A configuração da hospedagem continua fora do repositório; validar `/analise` após deploy, além da mensuração dos anúncios. Não usar `?preview=assets` nos anúncios. Preço, prazo e formato da análise não são anunciados porque não foram confirmados.
