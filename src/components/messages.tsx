"use client"
import { useVoice } from "@humeai/voice-react"
export default function Message () {
    const {messages} = useVoice();
    return(
        <div>
            {messages.map((message)=>{
                if(message.type==="user_message"||message.type==="assistant_message"){

                }
                return null;
            })}
        </div>
    )
}