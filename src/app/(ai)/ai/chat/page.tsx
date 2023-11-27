"use client";

import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="relative mx-auto w-full min-h-screen max-w-md lg:max-w-xl px-5 pt-5 pb-10 flex flex-col justify-end stretch border bg-white border-gray-200">
      {messages.map((m) => (
        <div key={m.id}>
          {m.role === "user" ? (
            <div className="font-bold marker:my-5">User:</div>
          ) : (
            <div className="font-bold marker:my-5">AI:</div>
          )}
          <div className="my-2">{m.content}</div>
        </div>
      ))}

      <div className="w-full">
        <form onSubmit={handleSubmit} className="">
          <div className="flex justify-between items-center w-full gap-x-4">
            <div className="flex-grow">
              <label>
                <input
                  title="input"
                  className="border w-full border-gray-300 rounded shadow-xl p-2"
                  value={input}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <button
              className="bg-red-500 text-white px-6 py-2 rounded-md"
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
