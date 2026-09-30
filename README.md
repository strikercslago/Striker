# Striker

Site institucional da Striker em HTML, CSS e JavaScript, sem dependências ou etapa de build.

## Continuar em outro computador

Instale o Git e o Node.js LTS e execute:

```sh
git clone https://github.com/strikercslago/Striker.git
cd Striker
node server.cjs
```

Abra http://127.0.0.1:4173 no navegador. Para encerrar o servidor, pressione Ctrl+C.

## Arquivos principais

- `index.html`: conteúdo e estrutura das seções.
- `styles.css`: identidade visual e responsividade.
- `script.js`: interações e animações.
- `assets/`: imagens e recursos do site.
- `public/assets/striker/`: assets das seções de processo, antes/depois e avaliações.
- `server.cjs`: servidor local de desenvolvimento.

## Estado atual — 29/09/2026

- Processo redesenhado com quatro etapas alternadas e painel de diferencial.
- Comparação antes/depois com cards claros e estados de problema/solução.
- Avaliações com carrossel responsivo, autoplay de 2 segundos, loop, swipe, teclado e controles de pausa.
- Os depoimentos são fictícios e estão identificados na página. Para substituir pelos clientes reais, edite o array `testimonials` em `script.js` e os assets em `public/assets/striker/testimonials/`.
- O projeto não exige `npm install` nem build. Basta executar `node server.cjs`.

As novas seções foram verificadas em nove resoluções, de 360 a 1920 pixels. O carrossel respeita movimento reduzido e pausa durante interação.

O repositório inclui o código e os assets utilizados pelo site. Referências locais, versões antigas de imagens, a pasta `.preview/`, logs e arquivos de ambiente não são versionados.

## Salvar novas alterações

```sh
git add .
git commit -m "Atualiza o site"
git push
```

Antes de continuar em um computador com uma cópia existente, execute `git pull`.
