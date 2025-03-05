/** 
 * This is the deprecated version of streaming
 * This was implemented before discovering the `ai` library by vercel 
*/
//@ts-nocheck - v1 

"use client"
import { useState} from 'react';

const DEFAULT_MESSAGES = [
    {
    id: "1",
    role: "system",
    content: "You are a T-1000 and must find Sarah Connor",
    },
    {
    id: "2",
    role: "user",
    content: "Can I help you?",
    },
    {
    id: "3",
    role: "assistant",
    content: "Where is Sarah Connor?",
    }
]

export default function Page() {

    const [sentence,setSentence] = useState('');
    
    return (
        <div>
            <button onClick={async () => {
                const response = await fetch('/api/integrations/deprecated', {
                    method : 'POST',
                    body : JSON.stringify({messages : DEFAULT_MESSAGES})
                })
        if(response.body) {
        const reader = response.body.getReader();
        const chunks = [];
        
        let done, value;
        while (!done) {
          ({ value, done } = await reader.read());
          if (done) {
            return chunks;
          }

          const decoded = new TextDecoder().decode(value);
          const json = decoded.split('0:') 
          let word = [];
          json.map((val) => {
            let result = val.trim();
            if(!result.length) return;
            else {
                result = result.replace(/["]/g, "");
                setSentence(`${sentence}${result}`);
                word.push(result)
            }
          })
          
          chunks.push(word.join(''));
          setSentence(chunks.join(''))
        }
        }
            }}>
                Start
            </button>
            {sentence}
        </div>
    )
}
