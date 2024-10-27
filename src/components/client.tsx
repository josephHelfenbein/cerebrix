"use client"
import { VoiceProvider } from "@humeai/voice-react"
import Message from "./messages"
import Hume from "./hume"

export default function Client({accessToken,}:{accessToken:string;}){
    return(
        <VoiceProvider configId={"af473db9-599b-49b3-9c40-72b5750da6ff"} auth={{type:"accessToken", value:accessToken}}>
            <Message />
            <Hume />
        </VoiceProvider>
    )
}