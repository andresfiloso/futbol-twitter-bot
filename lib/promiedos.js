export const promiedosApiClient = (baseUrl) => {
    return {
        getTodayGames: async () => {
            const response = await fetch(`${baseUrl}/games/today`)
            const data = await response.json()
            return data
        },
        getGameCenter: async (gameId) => {
            const response = await fetch(`${baseUrl}/gamecenter/${gameId}`)
            const data = await response.json()
            return data
        }
    }
}