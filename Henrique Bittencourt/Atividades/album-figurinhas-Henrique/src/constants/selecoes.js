// 48 seleções da Copa do Mundo 2026 — grupos oficiais (fonte: CNN Brasil / FIFA)
// Cada entrada: name (chave API), nomePtBr, id (API-Football), grupo
export const SELECOES_COPA_2026 = [
  // GRUPO A — confirmados: Mexico(16✅), South-Africa(1531✅), South Korea(17✅), Czech-Republic(1113→verificar)
  { name: 'Mexico',         nomePtBr: 'México',               id: 16,   grupo: 'A' },
  { name: 'South-Africa',   nomePtBr: 'África do Sul',         id: 1531, grupo: 'A' },
  { name: 'South Korea',    nomePtBr: 'Coreia do Sul',         id: 17,   grupo: 'A' },
  { name: 'Czech-Republic', nomePtBr: 'República Tcheca',      id: 1113, grupo: 'A' },

  // GRUPO B — confirmados: Canada(101✅), Bosnia(1113→1113✅), Switzerland(15✅)
  { name: 'Canada',         nomePtBr: 'Canadá',                id: 101,  grupo: 'B' },
  { name: 'Bosnia',         nomePtBr: 'Bósnia e Herzegovina',  id: 1113, grupo: 'B' },
  { name: 'Qatar',          nomePtBr: 'Catar',                 id: 23,   grupo: 'B' },
  { name: 'Switzerland',    nomePtBr: 'Suíça',                 id: 15,   grupo: 'B' },

  // GRUPO C — confirmados: Brazil(6✅), Scotland(1108✅)
  { name: 'Brazil',         nomePtBr: 'Brasil',                id: 6,    grupo: 'C' },
  { name: 'Morocco',        nomePtBr: 'Marrocos',              id: 1504, grupo: 'C' },
  { name: 'Haiti',          nomePtBr: 'Haiti',                 id: 1525, grupo: 'C' },
  { name: 'Scotland',       nomePtBr: 'Escócia',               id: 1108, grupo: 'C' },

  // GRUPO D — confirmados: Australia(20✅), Turkey(777✅)
  { name: 'USA',            nomePtBr: 'Estados Unidos',        id: 1566, grupo: 'D' },
  { name: 'Paraguay',       nomePtBr: 'Paraguai',              id: 11,   grupo: 'D' },
  { name: 'Australia',      nomePtBr: 'Austrália',             id: 20,   grupo: 'D' },
  { name: 'Turkey',         nomePtBr: 'Turquia',               id: 777,  grupo: 'D' },

  // GRUPO E — confirmados: Tunisia(28✅), Iran(22✅)
  { name: 'Germany',        nomePtBr: 'Alemanha',              id: 25,   grupo: 'E' },
  { name: 'Curacao',        nomePtBr: 'Curaçao',               id: 5530, grupo: 'E' },
  { name: 'Ivory-Coast',    nomePtBr: 'Costa do Marfim',       id: 1501, grupo: 'E' },
  { name: 'Ecuador',        nomePtBr: 'Equador',               id: 13,   grupo: 'E' },

  // GRUPO F — confirmados: Sweden(5✅), Tunisia(28✅)
  { name: 'Netherlands',    nomePtBr: 'Holanda',               id: 1596, grupo: 'F' },
  { name: 'Japan',          nomePtBr: 'Japão',                 id: 1527, grupo: 'F' },
  { name: 'Sweden',         nomePtBr: 'Suécia',                id: 5,    grupo: 'F' },
  { name: 'Tunisia',        nomePtBr: 'Tunísia',               id: 28,   grupo: 'F' },

  // GRUPO G — confirmados: Belgium(1✅), Iran(22✅)
  { name: 'Belgium',        nomePtBr: 'Bélgica',               id: 1,    grupo: 'G' },
  { name: 'Egypt',          nomePtBr: 'Egito',                 id: 1499, grupo: 'G' },
  { name: 'Iran',           nomePtBr: 'Irã',                   id: 22,   grupo: 'G' },
  { name: 'New-Zealand',    nomePtBr: 'Nova Zelândia',         id: 1578, grupo: 'G' },

  // GRUPO H — confirmados: Spain(9✅), Uruguay(7✅), Saudi Arabia(23✅)
  { name: 'Spain',          nomePtBr: 'Espanha',               id: 9,    grupo: 'H' },
  { name: 'Cape-Verde',     nomePtBr: 'Cabo Verde',            id: 1533, grupo: 'H' },
  { name: 'Saudi-Arabia',   nomePtBr: 'Arábia Saudita',        id: 23,   grupo: 'H' },
  { name: 'Uruguay',        nomePtBr: 'Uruguai',               id: 7,    grupo: 'H' },

  // GRUPO I — confirmados: France(2✅)
  { name: 'France',         nomePtBr: 'França',                id: 2,    grupo: 'I' },
  { name: 'Senegal',        nomePtBr: 'Senegal',               id: 1500, grupo: 'I' },
  { name: 'Iraq',           nomePtBr: 'Iraque',                id: 1497, grupo: 'I' },
  { name: 'Norway',         nomePtBr: 'Noruega',               id: 778,  grupo: 'I' },

  // GRUPO J — confirmados: Colombia(8✅), Austria(775✅)
  { name: 'Argentina',      nomePtBr: 'Argentina',             id: 26,   grupo: 'J' },
  { name: 'Algeria',        nomePtBr: 'Argélia',               id: 1502, grupo: 'J' },
  { name: 'Austria',        nomePtBr: 'Áustria',               id: 775,  grupo: 'J' },
  { name: 'Jordan',         nomePtBr: 'Jordânia',              id: 1496, grupo: 'J' },

  // GRUPO K — confirmados: Colombia(8✅)
  { name: 'Portugal',       nomePtBr: 'Portugal',              id: 27,   grupo: 'K' },
  { name: 'DR-Congo',       nomePtBr: 'RD Congo',              id: 1517, grupo: 'K' },
  { name: 'Uzbekistan',     nomePtBr: 'Uzbequistão',           id: 1489, grupo: 'K' },
  { name: 'Colombia',       nomePtBr: 'Colômbia',              id: 8,    grupo: 'K' },

  // GRUPO L — confirmados: Croatia(3✅)
  { name: 'England',        nomePtBr: 'Inglaterra',            id: 10,   grupo: 'L' },
  { name: 'Croatia',        nomePtBr: 'Croácia',               id: 3,    grupo: 'L' },
  { name: 'Panama',         nomePtBr: 'Panamá',                id: 1524, grupo: 'L' },
  { name: 'Ghana',          nomePtBr: 'Gana',                  id: 1507, grupo: 'L' },
];

// Ordem de exibição das posições (padrão álbum Panini)
export const ORDEM_POSICOES = ['Goalkeeper', 'Defender', 'Midfielder', 'Attacker'];

// Labels e emojis por posição
export const LABELS_POSICAO = {
  Goalkeeper: { label: '🧤 Goleiros',       pt: 'Goleiro' },
  Defender:   { label: '🛡️ Defensores',     pt: 'Defensor' },
  Midfielder: { label: '⚙️ Meio-campistas', pt: 'Meio-campista' },
  Attacker:   { label: '⚡ Atacantes',       pt: 'Atacante' },
};

// Classes CSS por posição
export const CLASSES_POSICAO = {
  Goalkeeper: 'pos-goleiro',
  Defender:   'pos-defensor',
  Midfielder: 'pos-meio',
  Attacker:   'pos-atacante',
};

// Agrupa as seleções por letra do grupo
export function selecosPorGrupo() {
  return SELECOES_COPA_2026.reduce((acc, s) => {
    if (!acc[s.grupo]) acc[s.grupo] = [];
    acc[s.grupo].push(s);
    return acc;
  }, {});
}
