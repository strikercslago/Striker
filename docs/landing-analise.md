# /analise — landing oficial da Striker

## Fonte e direção

Copy principal: `Copy_Landing_Page_Striker (1).pdf`, fornecida pelo usuário em 07/10/2026. A composição usa o preview aprovado e os dez assets entregues, substituindo a direção anterior baseada na V4. Oferta confirmada: análise gratuita e sem compromisso da presença digital, com conversão pelo WhatsApp.

## Seções

Hero com smartphone e cards; faixa de canais; percepção antes da conversa com personagem; jornada com cinco ícones; checklist do que é analisado; diagnóstico antes da solução; três respostas; identificação do público; processo; objeção sobre contratação; justificativa da gratuidade; CTA final e FAQ. A narrativa principal do PDF foi preservada, com agrupamento de frases curtas em parágrafos para leitura responsiva.

## Arquivos e isolamento

- `analise/index.html`: conteúdo oficial, semântica, SEO, imagens e destino único do WhatsApp.
- `analise/analise.css`: estilo exclusivo da landing; não carregado pela homepage.
- `analise/analise.js`: distribuição do link do WhatsApp e evento de intenção de contato.
- `assets/striker/analise/`: dez imagens WebP com transparência.
- `docs/landing-analise-copy.md`: transcrição do conteúdo final para revisão.

Nesta revisão não foram alterados `index.html`, `styles.css`, `script.js` nem `server.cjs` globais. Hashes conferidos antes/depois. A rota local já existente aceita `/analise` e `/analise/`.

## Assets

Os arquivos originais não foram modificados. Conversão para WebP preservou o canal alpha. Total dos dez assets otimizados: 641.774 bytes (cerca de 642 KB). Dimensões declaradas no HTML, prioridade para composição do Hero e lazy loading abaixo da dobra.

| Arquivo | Asset original (sufixo) | Uso |
|---|---|---|
| logo.webp | 15_36_01-1.png | Header e rodapé |
| dashboard.webp | 15_36_04-2.png | Hero e fechamento |
| analysis-cards.webp | 15_36_07-3.png | Composição do Hero |
| client-research.webp | 15_36_10-4.png | Percepção antes da conversa |
| google-phone.webp | 15_36_13-5.png | O que a Striker analisa |
| discover.webp | 15_36_16-6.png | Descobre |
| research.webp | 15_36_19-7.png | Pesquisa |
| understand.webp | 15_36_21-8.png | Entende |
| trust.webp | 15_36_24-9.png | Confia |
| contact.webp | 15_36_28-10.png | Entra em contato |

Os smartphones e cards contêm dados e estados fictícios incorporados às imagens. Legendas próximas explicam que são simulações; não foram apresentados como resultados, seguidores, clientes ou diagnósticos reais. Os endereços dentro do mockup de busca também são ilustrativos, não links da página. Não há depoimentos ou provas sociais inventadas.

## WhatsApp e mensuração

O número existente foi reutilizado: +55 54 99910-2656. Número e mensagem estão definidos uma única vez no link `#whatsapp-destination` no HTML. O JavaScript lê esse destino e o aplica a todos os CTAs, evitando constantes divergentes e alterações no script global.

Mensagem: “Olá, vim pela análise da Striker e gostaria de entender o que posso melhorar na presença digital da minha empresa.”

Todo CTA tem `data-event="analise_whatsapp_click"` e `data-placement`. Um `CustomEvent` com esse nome é disparado uma vez por clique, com `placement` e `page`, sem dados pessoais. Não há analytics/Meta Pixel detectado na implementação existente; nenhuma ferramenta foi adicionada. O evento não chega a uma plataforma até que uma integração seja configurada. Clique não equivale a lead ou conversa recebida.

Sem JavaScript, os CTAs intermediários levam à seção final e o botão final abre diretamente o WhatsApp; o FAQ continua nativo. Nenhum formulário armazena ou envia dados.

## Visual e comportamento

Navy #03111C/#071423, cyan #26D7FF, off-white #F4FAFD. Arial/Helvetica do projeto, peso 700 nas headlines, max-width 1.240 px. Grid de aproximadamente 45/55 no Hero, imagens fornecidas em composição sobreposta, seções claras e escuras, respiro de 72 px no mobile e 105 px no desktop. Jornada horizontal no desktop e vertical no celular. Sem biblioteca adicional, animação contínua, vídeo ou scroll-jacking. Movimento reduzido remove transições.

## Validação

Verificadas no navegador: 360×800, 375×812, 390×844, 412×915, 430×932, 1366×768, 1440×900, 1536×864 e 1920×1080. Em todas, ausência de overflow horizontal, CTA do Hero na primeira tela e alvos CTA de pelo menos 44 px.

FAQ abre por clique e fecha pelo teclado. Imagens carregadas; âncoras resolvidas; console sem erros/avisos durante a inspeção. Todos os links de WhatsApp têm número e mensagem exatos. Teste isolado do script confirmou configuração única e um evento por clique. Recursos locais e rota retornam HTTP 200. Pares principais de texto/fundo tiveram contraste medido entre 5,48:1 e 10,87:1. Isso não substitui auditoria formal de acessibilidade.

## Entrega

Branch `landing-analise`, PR https://github.com/strikercslago/Striker/pull/1. Sem merge ou deploy. Abrir localmente com `node server.cjs` e acessar http://127.0.0.1:4173/analise. A hospedagem e a integração de métricas devem ser validadas para ativar campanhas; o servidor de desenvolvimento mantém noindex e loopback conforme a configuração já existente.
