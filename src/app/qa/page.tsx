"use client";

import { useState, useEffect } from "react";

interface Citation {
  document_name: string;
  page_number: number;
  text: string;
}

interface HistoryItem {
  question: string;
  answer: string;
}

export default function QAPage() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<{ answer: string; citations: Citation[] } | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const askQuestion = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setResponse(data);
      setQuestion("");
      getHistory();
    } catch (error) {
      alert(`Error asking question: ${error}`);
    }
    setIsLoading(false);
  };

  const getHistory = async () => {
    try {
      const res = await fetch("/api/conversation_history");
      const data = await res.json();
      setHistory(data.history);
    } catch (error) {
      alert(`Error fetching conversation history: ${error}`);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Ask a Question</h2>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter your question"
        className="w-full p-2 border rounded mb-4 bg-slate-600"
        rows={3}
      />
      <button
        onClick={askQuestion}
        disabled={isLoading}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:bg-green-300 mb-8"
      >
        {isLoading ? "Asking..." : "Ask"}
      </button>

      {response && (
        <div className="bg-gray-100 p-4 rounded mb-8">
          <h3 className="text-xl font-semibold mb-2">Response:</h3>
          <p className="mb-4">{response.answer}</p>
          <h4 className="text-lg font-semibold mb-2">Citations:</h4>
          <ul className="list-disc pl-5">
            {response.citations.map((citation, index) => (
              <li key={index} className="mb-2">
                Document: {citation.document_name}, Page: {citation.page_number}
                <br />
                Text: {citation.text.substring(0, 100)}...
              </li>
            ))}
          </ul>
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-4">Conversation History</h2>
      <button onClick={getHistory} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4">
        Refresh History
      </button>
      {history ? (
        history.map((item, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded mb-4">
            <p className="font-semibold">Question: {item.question}</p>
            <p>Answer: {item.answer}</p>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
