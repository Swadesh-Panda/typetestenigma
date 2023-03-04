import React, { useState, createContext } from 'react'

export type playerType = {
    number: number,
    score: number
}

type PlayerContextType = {
    player: playerType,
    setPlayer: React.Dispatch<React.SetStateAction<playerType>>
}

const PlayerContextState = {
    player: {
        number: 1,
        score: 0
    },
    setPlayer: () => { }
}

type PlayerContextProviderProps = {
    children: React.ReactNode
}

const PlayerContext = createContext<PlayerContextType>(PlayerContextState)

const PlayerContextProvider = ({ children }: PlayerContextProviderProps) => {
    const [player, setPlayer] = useState<playerType>({
        number: 1,
        score: 0
    })

    return <PlayerContext.Provider value={{ player, setPlayer }}>{children}</PlayerContext.Provider>
}

export { PlayerContext, PlayerContextProvider }
