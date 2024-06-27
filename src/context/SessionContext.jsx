import { createContext, useState } from "react";

export const SessionContext = createContext()

export const SessionProvider = ({children}) => {
    const [session, setSession] = useState(JSON.parse(localStorage.getItem("session")) || [])
    const [cacheNotes, setCacheNotes] = useState()
    const [onStage, setOnStage] = useState(0)

    const addToSession = (props) => {
        setOnStage(0);
        setSession(prev => [...prev, props])
        localStorage.setItem("session", JSON.stringify([...session, props]))
    }

    const removeFromSession = (link) => {
        setSession(prev => prev.filter(note => note.link !== link))
        localStorage.setItem("session", JSON.stringify(session.filter(note => note.link !== link)))

    }
    return(
        <SessionContext.Provider value={{session, addToSession, removeFromSession, onStage, setOnStage, cacheNotes, setCacheNotes}}>
            {children}
        </SessionContext.Provider>
    )
}