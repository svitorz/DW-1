# Uso de IA neste trabalho (T2 - Ajax com JSON)

> **Aviso:** este texto foi escrito por uma IA (Claude, da Anthropic), a pedido do Vitor. Ele se baseia
> na conversa em que o trabalho foi feito e no histórico de commits. O Vitor leu e aprovou o texto.

## Resumo franco

- **A base funcional foi escrita pelo Vitor antes de usar a IA:** o formulário, a tabela e as três
  requisições Ajax com JSON (listagem, inserção e exclusão).
- **Parte das linhas do código final foi escrita pela IA:** interface, validações, mensagens,
  correções e ajustes para cumprir o enunciado.
- **O Vitor dirigiu o trabalho:** definiu o que seria feito e em que ordem, dividiu tudo em passos
  pequenos, revisou e commitou cada passo separadamente. Também pediu que a IA conferisse o trabalho
  contra o enunciado do professor.
- **Ponto honesto:** nos primeiros passos, o Vitor aprovou as alterações.
  Na Parte 3 ele pediu uma correção no layout do celular. A supervisão foi por revisão e teste do
  resultado.

## O que o Vitor fez

**Código (antes de usar a IA):**
- Página HTML com formulário de nome e e-mail, botões Gravar e Limpar, e a tabela de contatos com o
  botão de atualizar.
- As funções `fetchData`, `sendData` e `deleteData` usando `$.ajax` do jQuery, com `JSON.stringify`
  e `contentType: "application/json"`, apontando para as URLs do professor.
- Renderização das linhas da tabela com `<template>` e `textContent`.
- Primeira versão do aviso (toast) para mostrar mensagens na página.
- Bootstrap e jQuery instalados localmente (sem CDN) e a fonte JetBrains Mono.

**Decisões e direção:**
- Pediu os três primeiros ajustes: modal de confirmação de exclusão, avisos com validação dos campos,
  e limpar o formulário e atualizar a tabela após cada envio.
- Pediu um plano de melhorias escrito em passos e escolheu que ele fosse executado um passo por vez,
  com parada para revisão a cada passo.
- Pediu a verificação do trabalho contra o PDF do enunciado e escolheu quais correções entrariam.
- Propôs o limite de cliques no botão "Atualizar dados da tabela", para não sobrecarregar a API.
- Definiu que a remoção dos arquivos não usados das bibliotecas fosse o último passo.
- Pediu que os dados pessoais (`LEIAME.txt`) ficassem fora do git.
- Pediu a troca de tema claro e escuro com `localStorage`.
- Fez uma edição manual no plano de melhorias.

**Revisão e testes:**
- Revisou e commitou cada passo, com um commit separado para cada etapa.
- Ficou responsável pelos testes com dados reais: cadastrar e excluir contatos na API compartilhada,
  e abrir a página com duplo clique, sem servidor. A IA não fez esses testes para não gravar dados no
  banco da turma.

## O que a IA fez

Foram usados dois modelos: o **Claude Haiku** escreveu parte do código, e o **Claude Opus**
escreveu os planos e fez a revisão contra o enunciado.

**Primeiros ajustes (Haiku):**
- Janela de confirmação antes de excluir (`<dialog>` nativo) e lixeira em vermelho.
- Avisos (toasts) com título e mensagem, em verde para sucesso e vermelho para erro.
- Validação antes de enviar: campos vazios, tamanho do nome e formato do e-mail.
- Limpeza dos campos e atualização da tabela após cada envio e exclusão.

**Plano de melhorias (Opus):**
- Escreveu o `PLANO_MELHORIAS.md` em passos, com critérios de aceite para cada um.
- Descobriu que o Bootstrap instalado é a versão 6.0 alpha, e que várias classes usadas antes
  (inclusive pela própria IA) não existiam nessa versão.

**Revisão contra o enunciado (Opus):**
- Encontrou que a API devolve o campo `mensagem`, mas o código lia `message`. Esse erro já estava
  no código original e fazia a mensagem da API não aparecer.
- Apontou o resto do que faltava: limpar o formulário só em caso de sucesso, limite de 100 caracteres,
  `id` enviado como número, texto do botão "Atualizar dados da tabela", a falta do `LEIAME.txt` e o
  risco de a página não funcionar ao ser aberta direto do disco.

**Correções finais (Haiku):**
- Aplicou as correções acima.
- Implementou o limite de cliques: espera de 5 segundos e cancelamento de uma listagem em andamento.
- Removeu a dependência do JavaScript do Bootstrap, para a página funcionar ao ser aberta direto do disco.
- Criou o `LEIAME.txt`, removeu os arquivos não usados das bibliotecas e montou o `.zip`.
- Fez a troca de tema claro e escuro com `localStorage`.

**Este arquivo:** também foi escrito pela IA (Opus).

## Parte 3: nova identidade visual

- **Direção (Vitor):** escolheu a caderneta de endereços com índice A–Z, a JetBrains Mono só nos e-mails
  e a execução em passos pequenos. Também aceitou funções novas na interface, desde que a API não mudasse.
- **Plano de design (Opus):** escreveu a Parte 3 do `PLANO_MELHORIAS.md`, com cores, escala tipográfica,
  layout e vocabulário dos textos.
- **Implementação (Haiku):** executou os Passos 15 a 18: paleta, fontes, cabeçalho, lista agrupada por
  letra, índice A–Z, textos dos avisos e do diálogo, e o novo favicon.
- **Correção pedida pelo Vitor:** no Passo 16, o botão Excluir saiu do cartão no celular e as letras dos
  grupos ficaram grandes demais. A IA corrigiu os dois.
- **Revisão da IA (Passo 19):** ao testar a navegação por Tab, viu que o índice ficava depois da lista no
  HTML. Moveu o índice para antes da tabela, e no desktop ele continua à direita.
- **Testes:** feitos só no navegador, em 1280px e 375px, nos dois temas. Nenhum cadastro ou exclusão real
  foi feito. As chamadas à API foram só de leitura.

## Erros cometidos pela IA

- **Classes inexistentes:** nos primeiros ajustes, usou classes do Bootstrap 5 que não existem no
  Bootstrap 6. Por isso a lixeira e os avisos ficaram sem cor. O erro só foi percebido depois, no
  planejamento, e foi corrigido no Passo 1 do plano.
- **Botão no celular:** o texto novo do botão "Atualizar dados da tabela" passou da borda do cartão
  no celular. Isso foi corrigido no mesmo passo.
- **Testes da IA:** foram só no navegador e sem gravar dados. Cadastro e exclusão reais não foram
  testados pela IA.
- **Layout no celular (Passo 16):** a linha da tabela em grade deixou o botão Excluir fora do cartão em
  375px. O Vitor percebeu no teste, e a IA trocou para flexbox.
- **Ordem do Tab (Parte 3):** o índice A–Z estava depois da tabela no HTML, então quem usava o teclado
  precisava passar por todos os contatos antes de chegar a ele. Foi corrigido no Passo 19.

## Avaliação do uso da IA

A IA não recebeu o trabalho inteiro para fazer sozinha. A parte central do enunciado, as requisições
Ajax enviando e recebendo JSON, foi escrita pelo Vitor. A IA foi usada para melhorar a interface,
corrigir erros e conferir o trabalho contra o enunciado.

O trabalho foi dividido em passos pequenos, cada um revisado e commitado antes do próximo. O Vitor
também definiu limites, como não gravar dados reais durante os testes da IA e deixar a remoção de
arquivos por último.

A autoria do código é compartilhada: a lógica principal é do Vitor, e a maior parte
da interface e das correções é da IA, aprovada por ele.
