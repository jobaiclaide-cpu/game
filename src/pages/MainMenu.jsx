import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { InfoBar } from "../components/InfoBar";
import { GameMenuButton } from "../navbutton/GameMenuButton";
import { RightMenuButton } from "../navbutton/RightMenuButton";
import { LeftMenuButton } from "../navbutton/LeftMenuButton";
import { SaleButton } from "../navbutton/SaleButton";
import { chatStorage } from "../utils/localStorage";

export function MainMenu(){
    const navigate = useNavigate();
    const [showChat, setShowChat] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    // Load chat messages from localStorage on mount
    useEffect(() => {
        const loadedMessages = chatStorage.get();
        setMessages(loadedMessages);
    }, []);

    // Save chat messages to localStorage whenever they change
    useEffect(() => {
        if (messages.length > 0) {
            chatStorage.set(messages);
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (newMessage.trim() !== "") {
            const message = {
                id: messages.length + 1,
                sender: "Вы",
                text: newMessage,
                time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
                isSystem: false,
                avatar: "🎯"
            };
            setMessages([...messages, message]);
            setNewMessage("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="relative min-h-screen">
            <InfoBar />
            <GameMenuButton />
            <RightMenuButton />
            <LeftMenuButton />
            <SaleButton />

            {/* Кнопка чата - responsive positioning */}
            <div className="absolute sm:bottom-5 md:bottom-8 lg:bottom-10 sm:left-20 md:left-32 lg:left-40 z-10">
                <div
                    className="relative flex flex-col items-center cursor-pointer"
                    onClick={() => setShowChat(!showChat)}
                >
                    <img className="object-cover sm:w-16 md:w-20 lg:w-[90px]" src="background/boll.png" width={90} height={80} alt="chat" />
                    <div className="absolute sm:top-2 md:top-3 text-xl sm:text-2xl">💬</div>
                    <p className="absolute bottom-[30%] text-white text-[10px] sm:text-[12px] font-bold text-center">Чат</p>
                    {/* Индикатор новых сообщений */}
                    {messages.length > 4 && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-[10px] sm:text-xs font-bold">{Math.min(messages.length - 4, 9)}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Окно чата - fully responsive */}
            {showChat && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-2 sm:p-4">
                    <div className="relative w-full max-w-2xl mx-auto">
                        {/* Chat window background */}
                        <div className="relative bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('43.png')" }}>

                            <div className="p-4 sm:p-6 md:p-8 lg:p-12">
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                                    {/* Заголовок чата */}
                                    <div className="flex justify-between items-center mb-4 pb-3 border-b-2 border-blue-200">
                                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                                            💬 Общий чат
                                        </h2>
                                        <button
                                            onClick={() => setShowChat(false)}
                                            className="text-gray-500 hover:text-gray-700 text-2xl sm:text-3xl font-bold"
                                        >
                                            ×
                                        </button>
                                    </div>

                                    {/* Список сообщений */}
                                    <div className="overflow-y-auto pr-2 mb-4 max-h-[40vh] sm:max-h-[350px]">
                                        <div className="space-y-3">
                                            {messages.map((message) => (
                                                <div
                                                    key={message.id}
                                                    className={`rounded-lg p-2 sm:p-3 shadow border ${
                                                        message.isSystem
                                                            ? 'bg-blue-100/60 border-blue-300'
                                                            : message.sender === "Вы"
                                                                ? 'bg-green-100/60 border-green-300 ml-4 sm:ml-8'
                                                                : 'bg-white/60 border-gray-300'
                                                    }`}
                                                >
                                                    <div className="flex items-start gap-2 sm:gap-3">
                                                        <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 rounded-full flex items-center justify-center flex-shrink-0 bg-white text-sm sm:text-lg">
                                                            {message.avatar}
                                                        </div>

                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center justify-between mb-1">
                                                                <h4 className="font-bold text-gray-800 text-xs sm:text-sm truncate">
                                                                    {message.sender}
                                                                </h4>
                                                                <span className="text-[10px] sm:text-xs text-gray-500 ml-2 flex-shrink-0">
                                                                    {message.time}
                                                                </span>
                                                            </div>

                                                            <p className="text-xs sm:text-sm text-gray-700 break-words">
                                                                {message.text}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Поле ввода сообщения */}
                                    <div className="border-t-2 border-blue-200 pt-3">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={newMessage}
                                                onChange={(e) => setNewMessage(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                                placeholder="Введите сообщение..."
                                                className="flex-1 px-2 sm:px-3 py-2 border-2 border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-blue-500 bg-white/80"
                                            />
                                            <button
                                                onClick={handleSendMessage}
                                                disabled={newMessage.trim() === ""}
                                                className={`px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
                                                    newMessage.trim() !== ""
                                                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                }`}
                                            >
                                                <span className="hidden sm:inline">📤 Отправить</span>
                                                <span className="sm:hidden">📤</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
