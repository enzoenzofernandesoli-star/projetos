# Vitrine de projetos — VVC Digital Studio

Portfólio para mandar a cliente. Cada projeto aparece como uma janela de
navegador; ao clicar, o site real abre navegável dentro da própria página.

Publicado em: https://projetos-pink-five.vercel.app

## Manter atualizado

Todo projeto novo que for para a Vercel entra por aqui:

```bash
npm run sincronizar            # mostra o que falta, sem escrever nada
npm run sincronizar -- --aplicar   # insere no catálogo e captura as capas
```

O script usa a CLI da Vercel já autenticada nesta máquina — nenhum token fica
guardado no repositório. Ele lista todos os projetos da conta, ignora os que
já estão na vitrine, e submete cada candidato a três checagens antes de
deixar entrar:

- responde 200
- não bloqueia a janela com `X-Frame-Options` ou `frame-ancestors`
- tem título próprio, para descartar projeto vazio

Também descarta implantações repetidas do mesmo site — a conta costuma ter
três ou quatro do mesmo projeto — ficando com a mais recente de cada título.

O que entra vem marcado com `revisar: true`, porque o nome sai do slug da
Vercel: `maria-flor-moda-festa-jwbd` vira "Maria Flor Moda Festa Jwbd". Abra
`src/projetos.ts`, arrume nome, tipo, descrição e serviço, tire a marca, e
publique.

Para nunca mostrar um projeto na vitrine, acrescente o nome dele em `IGNORAR`,
no topo de `scripts/sincronizar-vercel.mjs`.

## Rodar

```bash
npm install
npm run dev
```

## Como o catálogo é organizado

`src/projetos.ts` é a única fonte. Cada item tem um `servico`, que define a
aba onde aparece: sites, aplicativos, sistemas, visibilidade ou suporte.

- **com `url`** — abre ao vivo dentro da página
- **com `dominio` e `restricao`** — sistema com login; mostra a captura e o
  endereço com o selo "restrito"
- **com `exclusivo`** — projeto conceitual; a página é montada em `CapaConceito`
  e o clique avisa que o site é exclusivo do cliente

Os conceituais também carregam `ilustrativo: true`, invisível para quem visita.
Para separá-los do trabalho entregue: `projetos.filter((p) => !p.ilustrativo)`.
