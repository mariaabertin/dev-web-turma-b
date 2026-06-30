const BASE_URL = 'https://v3.football.api-sports.io';   
// const BASE_URL = 'http://localhost:3000';
const API_KEY = import.meta.env.VITE_API_TOKEN;

export async function getPaises() {
    const response = await fetch(`${BASE_URL}/teams/countries`, {
        method: 'GET',
        headers: {
            'x-apisports-key': API_KEY,
            'x-rapidapi-host': 'v3.football.api-sports.io'
        }
    });

    const dados = await response.json();
    return dados.response;
}

export async function getSelecao(nomePais) {

    const responseTime = await fetch(`${BASE_URL}/teams?name=${nomePais}`, {
        method: 'GET',
        headers: {
            'x-apisports-key': API_KEY,
            'x-rapidapi-host': 'v3.football.api-sports.io'
        }
    });

    const dadosSelecao = await responseTime.json();

    if (dadosSelecao.response && dadosSelecao.response.length > 0) {
        const idSelecao = dadosSelecao.response[0].team.id;

        const responseJogadores = await fetch(`${BASE_URL}/players/squads?team=${idSelecao}`, {
            method: 'GET',
            headers: {
                'x-apisports-key': API_KEY,
                'x-rapidapi-host': 'v3.football.api-sports.io'
            }
        });

        const dadosJogadores = await responseJogadores.json();

        if (dadosJogadores.response && dadosJogadores.response.length > 0) {
            return dadosJogadores.response[0].players;
        }
        return [];
    }


}