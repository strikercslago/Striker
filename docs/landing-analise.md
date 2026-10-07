# /analise — estratégia e entrega

## Conceito central

“Sua empresa entrega valor. Quem encontra você percebe isso?”

O anúncio chega antes de existir intenção de comprar um site. A página precisa converter curiosidade em interesse por um diagnóstico. Por isso, parte do valor que o negócio já entrega e torna concreta a análise: descoberta, clareza e facilidade de contato. A principal objeção é não entender o que será analisado ou imaginar que a conversa já obriga a comprar um site.

WhatsApp direto, sem formulário intermediário. Nome do negócio e links são solicitados na conversa. Essa é uma hipótese de menor atrito, a validar com os anúncios e a qualidade dos contatos. Nenhuma taxa de conversão é presumida.

## Estrutura

1. **Proposta e ação:** headline, explicação curta, CTA e um único diagrama editorial da jornada. O visitante entende o objetivo antes de rolar.
2. **Escopo:** três perguntas concretas explicam o que será observado. Substituem listas técnicas extensas.
3. **Processo e resultado esperado:** enviar os canais, avaliar o caminho e discutir prioridades. A solução depende do contexto.
4. **Convite e objeções:** CTA repetido e três perguntas frequentes. O rodapé identifica a marca e o contato.

Não há números sem comprovação, avaliações fictícias, urgência, promessa de aumento de vendas, gratuidade ou prazo não confirmados. A análise não é apresentada como automática.

## Direção visual

- Fundos navy #03111C e off-white #F7F8FA. Cyan #26D7FF nos CTAs e pequenos marcadores.
- Arial/Helvetica, reutilizando a família já utilizada pelo projeto, sem download de fontes.
- Headline de 38–64 px no celular/tablet e 58–70 px no desktop. H2 de 32–48 px. Corpo de 15–18 px. Textos auxiliares menores não carregam a proposta comercial.
- Conteúdo com máximo de 1.200 px, margens mobile de 20 px, espaçamento vertical de 60 px no celular e 90 px no desktop.
- Um painel da jornada; demais conteúdos usam linhas, tipografia e espaço negativo. Sem fotos genéricas, mockups pesados, neon, 3D ou carrosséis.
- Assinatura tipográfica Striker e símbolo SVG existente. Setas simples como indicação de direção.
- CTAs de pelo menos 60 px de altura. Apenas transição discreta de cor, desativada com preferência por movimento reduzido.

## Mobile

Uma coluna, CTA antes do diagrama e visível na primeira tela nas alturas verificadas de 844 px. O diagrama vira uma sequência vertical. Escopo e processo mantêm ordem de leitura natural. FAQ nativo com área de toque generosa. Sem menu ou botão fixo cobrindo conteúdo. Nenhuma interação depende de hover ou JavaScript.

## Desktop

Hero em duas colunas com a jornada ao lado. Escopo dividido entre argumento e perguntas. Processo em três colunas. Convite final e FAQ lado a lado. O conteúdo e a ordem semântica são os mesmos do mobile.

## Implementação e isolamento

- `analise/index.html`: página completa, metadados, canonical e links de WhatsApp prontos no HTML.
- `analise/analise.css`: folha exclusiva, nunca carregada pela homepage.
- `analise/analise.js`: evento opcional `striker:analise-whatsapp` com posição do CTA; não transmite dados, não usa cookies e não depende de SDK.
- `server.cjs`: apenas inclui explicitamente a rota e os dois assets locais na lista de caminhos permitidos. `/analise`, `/analise/` e `/analise/index.html` são aceitos.
- Homepage, CSS global, JavaScript global e assets existentes não são alterados por esta entrega. Alterações locais anteriores ficaram fora dos commits da landing.
- HTML, CSS e JS sem framework, dependências de produção ou build. O conteúdo permanece utilizável sem JS.

## Validação

Chrome headless em 320, 360, 390, 768, 1024, 1440 e 1920 px. Sem overflow horizontal, CTA inicial na primeira tela nas alturas testadas, H1 único, FAQ operacional, foco por teclado e WhatsApp com número e mensagem corretos. Verificação com JS desativado. Rotas retornam os códigos esperados. Respostas dos arquivos da homepage iguais aos arquivos locais. Inspeção visual das capturas mobile e desktop.

Para executar localmente: `node server.cjs`, depois abrir http://127.0.0.1:4173/analise.

## Publicação e mensuração

A entrega fica na branch `landing-analise`, sem merge ou publicação no domínio. Em hospedagem estática com índices de diretório, a pasta `analise/` entrega a página, podendo redirecionar `/analise` para `/analise/`. Se a hospedagem utilizar fallback para a homepage, configure uma regra específica de `/analise` para `/analise/index.html` antes desse fallback. A configuração de hospedagem não está no repositório e a rota no domínio precisa ser validada após o deploy.

O servidor existente é de desenvolvimento, escuta em loopback e mantém `X-Robots-Tag: noindex, nofollow`. Ele não deve ser tomado como configuração de hospedagem de produção.

Não foi encontrada integração Meta Pixel/GA4 no código inspecionado. O evento local é apenas um ponto de integração, sem envio para plataformas. Antes de escalar tráfego, conectar a mensuração aprovada e distinguir clique no WhatsApp de conversa recebida e lead qualificado. Parâmetros da campanha permanecem na URL da landing; não são enviados automaticamente na conversa. Confirmar operacionalmente preço, prazo e formato de entrega da análise antes de anunciá-los.

## Referências consultadas em 07/10/2026

- [Conversion Sciences — CRO audit](https://conversionsciences.com/services/conversion-rate-optimization/cro-audit/): escopo, jornada e prioridades tornam a oferta compreensível. A Striker usa esses princípios sem reproduzir promessas, números, layout ou textos.
- [BLKDG — conversion audit](https://www.blkdg.com/conversion-rate-optimization-audit/): resultado de busca consultado sobre barreiras e clareza; acesso à página completa indisponível. Referência secundária, sem dependência para decisões de implementação.

A copy final integral acompanha esta entrega em `docs/landing-analise-copy.md`, extraída do conteúdo da página.
