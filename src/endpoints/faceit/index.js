const axios = require('axios');
const apiKey = 'c18e7ea5-fe80-4c5a-84e8-8dfc087f7478';
const client = axios.create({
  baseURL: 'https://open.faceit.com/data/v4',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Accept': 'application/json'
  }
})

const getPlayerElo = async (player) => {
  let output;

  try {
    const { data } = await client.get(`/players?nickname=${player}`);
    output = `${player} has ${data.games.csgo.faceit_elo} Elo.`;
  } catch (err) {
    output = `Couldn't find player. (Username must be properly capitalized.)`;
  }

  return output;
}

const handlePlayerEloRoute = async (request, reply) => {
  const player = request.params.player || request.query.defaultPlayer;
  return player ? await getPlayerElo(player) : 'No player specified.';
}

module.exports = {
  '/faceit/elo/:player': handlePlayerEloRoute 
}