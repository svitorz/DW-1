// vite.config.mjs
// Serve uma página inicial gerada na hora, listando cada subpasta do diretório
// onde o Vite foi iniciado e todos os .html dentro delas.
// Sem dependências: só módulos nativos do Node (por isso não importa nada de 'vite',
// o que permite rodar com `npx vite` sem instalar nada localmente).

import { readdirSync, existsSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const IGNORAR = new Set(['node_modules', 'dist', 'build', 'coverage'])

// Ordem "natural": aula2 vem antes de aula10 (o ls puro coloca aula10 antes de aula2)
const ordem = (a, b) => a.localeCompare(b, 'pt-BR', { numeric: true })

const ignorada = (nome) => nome.startsWith('.') || IGNORAR.has(nome)

// Escapa texto/atributos, já que nomes de arquivo viram HTML
const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// 'aula01/pages/sobre mim.html' -> '/aula01/pages/sobre%20mim.html'
const href = (caminho) => '/' + caminho.split('/').map(encodeURIComponent).join('/')

// Procura .html recursivamente; devolve caminhos relativos à raiz, com '/'
function listarHtmls(dir, raiz) {
  const achados = []
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (ignorada(e.name)) continue
    const caminho = join(dir, e.name)
    if (e.isDirectory()) {
      achados.push(...listarHtmls(caminho, raiz))
    } else if (e.isFile() && e.name.toLowerCase().endsWith('.html')) {
      achados.push(relative(raiz, caminho).split(sep).join('/'))
    }
  }
  return achados.sort(ordem)
}

// Uma seção por pasta de primeiro nível; pastas sem nenhum .html ficam de fora
function montarSecoes(raiz) {
  return readdirSync(raiz, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !ignorada(e.name))
    .map((e) => e.name)
    .sort(ordem)
    .map((nome) => ({ nome, paginas: listarHtmls(join(raiz, nome), raiz) }))
    .filter((s) => s.paginas.length > 0)
}

function paginaIndice(secoes) {
  const blocos = secoes
    .map(
      ({ nome, paginas }) => `
    <section>
      <h2>${esc(nome)}</h2>
      <ul>
        ${paginas
          .map((p) => `<li><a href="${esc(href(p))}">${esc(p.slice(nome.length + 1))}</a></li>`)
          .join('\n        ')}
      </ul>
    </section>`
    )
    .join('\n')

  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Índice das pastas</title>
  <style>
    :root { color-scheme: light dark; font-family: system-ui, sans-serif; }
    body { max-width: 48rem; margin: 2rem auto; padding: 0 1rem; }
    section { margin-bottom: 1.5rem; }
    h2 { margin: 0 0 .25rem; font-size: 1.1rem; }
    ul { margin: 0; padding-left: 1.25rem; }
  </style>
</head>
<body>
  <h1>Índice</h1>
  ${blocos || '<p>Nenhum arquivo .html encontrado nas subpastas.</p>'}
</body>
</html>`
}

function indiceDasPastas() {
  return {
    name: 'indice-das-pastas',
    configureServer(server) {
      const raiz = server.config.root
      // Registrado direto (sem retornar função), roda antes dos middlewares internos do Vite
      server.middlewares.use((req, res, next) => {
        const url = (req.url || '').split('?')[0]
        if (url !== '/' && url !== '/index.html') return next()
        if (existsSync(join(raiz, 'index.html'))) return next() // se você criar um, ele ganha
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(paginaIndice(montarSecoes(raiz))) // varre a cada requisição: basta dar F5
      })
    },
  }
}

export default {
  // 'mpa' = vários .html independentes: sem o fallback de SPA que devolveria
  // /index.html para qualquer URL desconhecida
  appType: 'mpa',
  plugins: [indiceDasPastas()],
}
