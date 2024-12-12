import React, { useRef, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
} from 'firebase/firestore'
import { database } from '../../../services/firebase'
import Title from '../../common/Title'

const ChatRoom = ({ username }) => {
    const messagesRef = useRef([])
    const [, setRender] = useState(0) // State to trigger re-renders
    const { register, handleSubmit, reset } = useForm()
    const lastMessageRef = useRef(null)

    useEffect(() => {
        const q = query(
            collection(database, 'messages'),
            orderBy('timestamp', 'asc')
        )
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messages = []
            querySnapshot.forEach((doc) => {
                messages.push(doc.data())
            })
            messagesRef.current = messages
            setRender((prev) => prev + 1) // Trigger re-render
        })

        return () => unsubscribe()
    }, [])

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messagesRef.current])

    const onSubmit = async (data) => {
        await addDoc(collection(database, 'messages'), {
            text: data.message.trim(),
            username: username,
            timestamp: new Date(),
        })
        reset()
    }

    return (
        <div className="flex flex-col w-[90%] h-full ">
            <div className="flex-1 overflow-y-auto p-4">
                <h1 className="text-2xl capitalize font-bold impressive-title text-blue-500">
                    General Company Chat Room
                </h1>
                {messagesRef.current.map((message, index) => (
                    <div
                        key={index}
                        ref={
                            index === messagesRef.current.length - 1 ? lastMessageRef : null
                        }
                        className="flex items-center space-x-4 p-4 transition-transform transform"
                    >
                        <div className="flex-shrink-0 ">
                            <span className="inline-block h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center transition-transform transform">
                                {message.username.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="flex-1 bg-white p-4 rounded-xl shadow-xl transition-transform transform">
                            <div className="font-semibold text-blue-500">
                                {message.username}
                            </div>
                            <div className="text-gray-700">{message.text}</div>
                        </div>
                    </div>
                ))}
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center space-x-4 p-4"
            >
                <input
                    type="text"
                    {...register('message', {
                        validate: (value) => value.trim() !== '',
                    })}
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 rounded-lg p-2"
                />
                <button type="submit" className="bg-blue-500 text-white rounded-lg p-2">
                    Send
                </button>
            </form>
        </div>
    )
}

export default ChatRoom
