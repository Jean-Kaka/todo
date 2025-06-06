// src/app/ai-assistant/page.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, MessageSquare, History, Bookmark, ThumbsUp, ThumbsDown, Lightbulb, Loader2 } from "lucide-react";
import Image from "next/image";
import { answerDataQuestions, AnswerDataQuestionsInput, AnswerDataQuestionsOutput } from '@/ai/flows/answer-data-questions';
import { getSmartSuggestions, SmartSuggestionsInput, SmartSuggestionsOutput } from '@/ai/flows/smart-suggestions';
import { bookmarkInsight, BookmarkInsightInput, BookmarkInsightOutput } from '@/ai/flows/bookmark-insights';
import { useToast } from "@/hooks/use-toast";


interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
  insightId?: string; // For AI messages that can be bookmarked
  chart?: { type: string; data: any; image?: string; dataAiHint?: string }; // Placeholder for chart data or image
  table?: { headers: string[]; rows: (string | number)[][]; dataAiHint?: string }; // Placeholder for table data
}

interface ChatSession {
  id: string;
  title: string;
  timestamp: Date;
  messages: Message[];
}

export default function AIAssistantPage() {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  
  useEffect(() => {
    // Load initial chat history (mock)
    const mockHistory: ChatSession[] = [
      { id: "chat1", title: "Sales trends Q1", timestamp: new Date(Date.now() - 86400000), messages: [
        { id: "m1", sender: "user", text: "Show me sales trends for Q1.", timestamp: new Date(Date.now() - 86400000) },
        { id: "m2", sender: "ai", text: "Sales increased by 15% in Q1. Here's a breakdown:", chart: { type: 'bar', data: {}, image: 'https://placehold.co/300x150.png', dataAiHint: 'sales trend chart' }, timestamp: new Date(Date.now() - 86400000) }
      ]},
      { id: "chat2", title: "Top products by region", timestamp: new Date(Date.now() - 172800000), messages: [] },
    ];
    setChatHistory(mockHistory);
    if (mockHistory.length > 0) {
      // setActiveChatId(mockHistory[0].id);
      // setMessages(mockHistory[0].messages);
    } else {
      startNewChat();
    }
  }, []);

  const startNewChat = () => {
    const newChatId = `chat-${Date.now()}`;
    const newChatSession: ChatSession = {
      id: newChatId,
      title: "New Chat",
      timestamp: new Date(),
      messages: [],
    };
    setChatHistory(prev => [newChatSession, ...prev]);
    setActiveChatId(newChatId);
    setMessages([]);
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;
    setIsLoading(true);

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: currentMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setCurrentMessage("");
    setSuggestions([]);

    try {
      const aiInput: AnswerDataQuestionsInput = {
        question: userMessage.text,
        dataSourceDescription: "User has uploaded sales data (CSV) with columns: OrderID, Product, Category, Amount, Date, Region and customer data (SQL) with columns: UserID, Name, SignupDate, LastPurchaseDate, TotalSpent.", // Example description
      };
      const aiResponse: AnswerDataQuestionsOutput = await answerDataQuestions(aiInput);
      
      // Simulate parsing AI response for charts/tables
      const insightId = `insight-${Date.now()}`;
      const aiMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: "ai",
        text: aiResponse.answer,
        timestamp: new Date(),
        insightId: insightId, // Assign an ID for bookmarking
      };
      // This is a mock: in a real app, the AI would return structured data for charts/tables
      if (aiResponse.answer.toLowerCase().includes("sales trend")) {
        aiMessage.chart = { type: 'bar', data: {}, image: 'https://placehold.co/300x150.png', dataAiHint: 'sales trend chart' };
      } else if (aiResponse.answer.toLowerCase().includes("top products")) {
         aiMessage.table = { headers: ["Product", "Sales"], rows: [["Product A", 1500], ["Product B", 1200]], dataAiHint: 'product sales table'};
      }

      setMessages((prev) => [...prev, aiMessage]);

      // Update chat history title if it's the first user message
      if (activeChatId && messages.filter(m => m.sender === 'user').length === 0) {
         const newTitle = userMessage.text.substring(0, 30) + (userMessage.text.length > 30 ? "..." : "");
         setChatHistory(prev => prev.map(chat => chat.id === activeChatId ? {...chat, title: newTitle, messages: [...messages, userMessage, aiMessage]} : chat));
      } else if (activeChatId) {
         setChatHistory(prev => prev.map(chat => chat.id === activeChatId ? {...chat, messages: [...messages, userMessage, aiMessage]} : chat));
      }


    } catch (error) {
      console.error("Error calling AI flow:", error);
      const errorMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: "ai",
        text: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      toast({
        title: "AI Error",
        description: "Could not get response from AI assistant.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const query = e.target.value;
    setCurrentMessage(query);
    if (query.length > 2 && !isLoading) { // Fetch suggestions if query is long enough
      try {
        const suggestionInput: SmartSuggestionsInput = { query, dataSources: ["Sales Data", "Customer Data"] };
        const suggestionResponse: SmartSuggestionsOutput = await getSmartSuggestions(suggestionInput);
        setSuggestions(suggestionResponse.suggestions.slice(0,3)); // Limit suggestions
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCurrentMessage(suggestion);
    setSuggestions([]);
    // Optionally, auto-send message on suggestion click
    // handleSendMessage(); // but need to set currentMessage first and then call it.
  };

  const handleBookmark = async (message: Message) => {
    if (!message.insightId) return;
    try {
      const bookmarkInput: BookmarkInsightInput = {
        insightId: message.insightId,
        userId: "currentUser123", // Replace with actual user ID
        insightHubId: "defaultHub", // Replace with actual hub ID
        insightTitle: message.text.substring(0,50) + "...", // Or a more sophisticated title
        insightContent: message.text, // Full content
      };
      const result: BookmarkInsightOutput = await bookmarkInsight(bookmarkInput);
      toast({
        title: result.success ? "Insight Bookmarked" : "Bookmark Failed",
        description: result.message,
        variant: result.success ? "default" : "destructive",
      });
    } catch (error) {
      console.error("Error bookmarking insight:", error);
       toast({
        title: "Bookmark Error",
        description: "Could not save insight.",
        variant: "destructive",
      });
    }
  };
  
  const selectChat = (chatId: string) => {
    const chat = chatHistory.find(c => c.id === chatId);
    if (chat) {
      setActiveChatId(chat.id);
      setMessages(chat.messages);
    }
  };

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)]"> {/* Adjust height based on AppHeader */}
        {/* Chat History Sidebar */}
        <Card className="w-1/4 min-w-[250px] hidden md:flex flex-col mr-4">
          <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
            <CardTitle className="text-lg font-headline flex items-center gap-2"><History className="h-5 w-5"/> Chat History</CardTitle>
            <Button variant="outline" size="sm" onClick={startNewChat}>New Chat</Button>
          </CardHeader>
          <CardContent className="p-0 flex-grow">
            <ScrollArea className="h-full p-2">
              {chatHistory.length === 0 && <p className="p-4 text-sm text-muted-foreground">No chat history yet.</p>}
              {chatHistory.map((chat) => (
                <Button
                  key={chat.id}
                  variant={activeChatId === chat.id ? "secondary" : "ghost"}
                  className="w-full justify-start mb-1 text-left h-auto py-2"
                  onClick={() => selectChat(chat.id)}
                >
                  <div className="truncate">
                    <p className="font-medium text-sm">{chat.title}</p>
                    <p className="text-xs text-muted-foreground">{chat.timestamp.toLocaleDateString()}</p>
                  </div>
                </Button>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Main Chat Area */}
        <Card className="flex-1 flex flex-col shadow-lg">
          <CardHeader className="p-4 border-b">
            <CardTitle className="text-lg font-headline flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              AI Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0">
            <ScrollArea className="h-full p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-2 max-w-[75%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={msg.sender === 'user' ? "https://placehold.co/40x40.png" : "https://placehold.co/40x40.png?bg=3498db&text=AI"} data-ai-hint={msg.sender === 'user' ? 'profile avatar' : 'AI avatar'}/>
                      <AvatarFallback>{msg.sender === 'user' ? 'U' : 'AI'}</AvatarFallback>
                    </Avatar>
                    <div className={`p-3 rounded-lg shadow ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card border'}`}>
                      <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                      {msg.chart?.image && (
                        <div className="mt-2 rounded-md overflow-hidden border">
                          <Image src={msg.chart.image} alt="Chart" width={300} height={150} data-ai-hint={msg.chart.dataAiHint || "data chart"} />
                        </div>
                      )}
                      {msg.table && (
                         <div className="mt-2 overflow-x-auto">
                            <table className="min-w-full text-xs border bg-background">
                                <thead>
                                    <tr className="bg-muted">
                                    {msg.table.headers.map(header => <th key={header} className="p-2 border text-left font-medium">{header}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {msg.table.rows.map((row, rowIndex) => (
                                        <tr key={rowIndex} className="border-b">
                                        {row.map((cell, cellIndex) => <td key={cellIndex} className="p-2 border">{cell}</td>)}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                         </div>
                      )}
                      <div className="text-xs mt-2 opacity-70">
                        {msg.timestamp.toLocaleTimeString()}
                      </div>
                       {msg.sender === 'ai' && (
                        <div className="mt-2 flex items-center gap-2">
                          {msg.insightId && (
                            <Button variant="ghost" size="xs" onClick={() => handleBookmark(msg)} className="p-1 h-auto text-xs">
                              <Bookmark className="h-3 w-3 mr-1" /> Bookmark
                            </Button>
                          )}
                          {/* Feedback buttons could be added here */}
                          {/* <Button variant="ghost" size="xs" className="p-1 h-auto"><ThumbsUp className="h-3 w-3" /></Button>
                          <Button variant="ghost" size="xs" className="p-1 h-auto"><ThumbsDown className="h-3 w-3" /></Button> */}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </ScrollArea>
          </CardContent>
          <div className="p-4 border-t bg-background">
             {suggestions.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground flex items-center gap-1"><Lightbulb className="h-4 w-4 text-accent"/> Suggestions:</span>
                {suggestions.map((s, i) => (
                  <Button key={i} variant="outline" size="sm" onClick={() => handleSuggestionClick(s)} className="text-xs">
                    {s}
                  </Button>
                ))}
              </div>
            )}
            <div className="flex items-center gap-2">
              <Textarea
                value={currentMessage}
                onChange={handleInputChange}
                placeholder="Ask something about your data... (e.g., 'Show me top 5 products by sales')"
                className="min-h-[60px] resize-none"
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); }}}
                disabled={isLoading}
              />
              <Button onClick={handleSendMessage} disabled={isLoading || !currentMessage.trim()} className="h-[60px]">
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
