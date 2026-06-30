// Configurações centrais da aplicação.
//
// API_URL aponta para o banco (json-server) publicado no Render.
// Para rodar localmente com o banco na sua máquina, crie um arquivo
// ".env.local" na raiz do projeto com a linha:
//   VUE_APP_API_URL=http://localhost:3000
// e rode o banco com:  npm run bancojson
export const API_URL =
  process.env.VUE_APP_API_URL || "https://api-tburguer-5wrq.onrender.com";

// Nome da marca, usado na navbar, no banner e no título da página.
export const APP_NAME = "Bella Pizza";
