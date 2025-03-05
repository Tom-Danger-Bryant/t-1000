
import { Button, TextInput } from "@tremor/react";
import { TrashIcon } from "@heroicons/react/outline";
import { Message, useChat } from 'ai/react';
import { useQuery,useMutation } from "@apollo/client";
import CREATE_THREAD from  '../../lib/graphql/mutations/createThread';
import ADD_MESSAGE from '../../lib/graphql/mutations/addMessage'
import  GET_THREAD from '../../lib/graphql/queries/getLatestThread';
import ChatBoxLoading from './chatBoxLoading';
import { useState } from 'react';

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

export default function ChatBox() {
    const [thread,setThread] = useState<string>('');

    const [createThread] = useMutation(CREATE_THREAD);
    const [addMessage] = useMutation(ADD_MESSAGE);

    
    const { messages : messages, input, handleSubmit, handleInputChange, isLoading, setMessages } = useChat({
        api : '/api/integrations/openai',
        initialMessages : DEFAULT_MESSAGES as Message[],
        onFinish : (message) => { 
            addMessage({
            variables : {
                threadSlug : thread,
                messages : [{
                    content : message.content,
                    role : 'assistant'
                }]
            }
        })} 
      })

    const resetPrompt = () => {
        //ToDo use a better UUID Method
        const generateSlug = Date.now().toString();
        createThread({
            variables : {
                threadSlug :  generateSlug,
                messages : DEFAULT_MESSAGES.map(({id,...rest}) =>rest)
            },
            onCompleted : () => {
                setMessages(DEFAULT_MESSAGES as Message[]);
                setThread(generateSlug);
            }
        })
        
    }

    const { loading } = useQuery(GET_THREAD, {
        onCompleted : (resp) => {
            if(!resp.getLatestThread){
              const generateSlug = Date.now().toString();
              createThread({
                  variables : {
                      threadSlug :  generateSlug,
                      messages : DEFAULT_MESSAGES.map(({id,...rest}) =>rest)
                  }
              });
              setThread(generateSlug);
            }
            else {
              setThread(resp.getLatestThread.slug);
            }
            if(resp.getLatestThread.messages && resp.getLatestThread.messages.length) {
                setMessages(resp.getLatestThread.messages)
            }
        }
    });

    if ( loading ) {
        return <ChatBoxLoading/>
    } 

    
      return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-end mt-2 mb-2 pr-2"><Button onClick={()=>resetPrompt()}>New Thread</Button></div>
          {messages.map((message: any, idx) => (
            <div
              key={idx}
              className={`p-4 ${
                message.role == "user"
                  ? ""
                  : "bg-gray-50 border-t-2 border-b-2 border-gray-100"
              }`}
            >
              <>
                <div className="relative">
                  <div className="absolute right-0">
                    <Button
                      variant="light"
                      color="gray"
                      tooltip="Delete"
                      icon={TrashIcon}
                      // onClick={() => {
                      //   updateMessages(messages.filter((m) => m.id != message.id));
                      // }}
                    />
                  </div>
                </div>
                {message.role == "system" && (
                  <p className="text-xs font-bold">system</p>
                )}
                <div>
                  <p className="text-sm text-gray-600">{message.content || " "}</p>
                </div>
              </>
            </div>
          ))}
          {messages.slice(-1).map((message: any, idx) => (
            <div key={`message-display-${idx}`} className="flex pt-2 space-x-2">
              <TextInput
                className="border-0 shadow-none"
                value={input}
                placeholder="Type something here..."
                onChange={handleInputChange}
              />
              <Button
                disabled={isLoading}
                onClick={({...args}) => {
                    addMessage({
                        variables : {
                            threadSlug : thread,
                            messages : [{
                                role : 'user',
                                content : input
                            }]
                        }
                    })
                    handleSubmit(args)
                }}>
                Submit
              </Button>
            </div>
    
            
          ))}
        </div>
      );
}