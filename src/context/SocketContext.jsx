import React, { useEffect } from 'react'
import { createContext } from 'react'
import { io } from 'socket.io-client'

export const SocketContext = createContext()
const socket = io(`${import.meta.env.VITE_BASE_URL}`)


const SocketContextProvider = ({ children }) => {

    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected to socket server")
        })
        socket.on("disconnect", () => {
            console.log("disconnected from socket server")
        })

    }, [])

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContextProvider