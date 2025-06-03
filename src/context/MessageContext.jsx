import { createContext, useContext, useState } from "react";

const MessageContext = createContext();
export const useMessage = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const showMessage = (text, type = "success") => {
    const id = Date.now();
    setMessages((prev) => [...prev, { id, text, type }]);

    setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    }, 3000);
  };

  

  const getStyle = (type) => {
    return type === "error"
      ? "bg-red-100 border border-red-400 text-red-700"
      : "bg-green-100 border border-green-400 text-green-700";
  };

  return (
    <MessageContext.Provider value={{ showMessage }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-3 max-w-sm w-full">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-center m-2 justify-between p-4 rounded-md shadow ${getStyle(
              msg.type
            )}`}
          >
            <span className="font-bold mr-2 capitalize">
              {msg.type === "error" ? "Error" : "Success"}
            </span>
            <span className="flex-1">{msg.text}</span>
            x
          </div>
        ))}
      </div>
    </MessageContext.Provider>
  );
};
