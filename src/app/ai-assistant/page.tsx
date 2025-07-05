// src/app/ai-assistant/page.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, MessageSquare, History, Bookmark, Lightbulb, Loader2, Bot, User } from "lucide-react";
import { answerDataQuestions, AnswerDataQuestionsInput, AnswerDataQuestionsOutput } from '@/ai/flows/answer-data-questions';
import { getSmartSuggestions, SmartSuggestionsInput, SmartSuggestionsOutput } from '@/ai/flows/smart-suggestions';
import { bookmarkInsight, BookmarkInsightInput, BookmarkInsightOutput } from '@/ai/flows/bookmark-insights';
import { useToast } from "@/hooks/use-toast";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
  insightId?: string; // For AI messages that can be bookmarked
  chart?: { type: string; data: any[]; config: ChartConfig };
  table?: { headers: string[]; rows: (string | number)[][] };
}

interface ChatSession {
  id: string;
  title: string;
  timestamp: Date;
  messages: Message[];
}

const renderChart = (
    chartType: string,
    chartData: any[],
    chartConfig: ChartConfig
  ) => {
    if (!chartData || !chartConfig) return null;

    const dataKey = Object.keys(chartConfig)[0];
    if (!dataKey) return null; // Ensure there's a key to use

    switch (chartType) {
      case "bar":
        return (
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} fontSize={10} />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={10}/>
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
              <Bar dataKey={dataKey} fill={`var(--color-${dataKey})`} radius={4} />
            </BarChart>
          </ChartContainer>
        );
      case "line":
        return (
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <LineChart accessibilityLayer data={chartData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} fontSize={10} />
               <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={10}/>
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
              <Line dataKey={dataKey} type="monotone" stroke={`var(--color-${dataKey})`} strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        );
      case "pie":
        return (
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
             <PieChart accessibilityLayer>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={60} strokeWidth={2}>
                {(chartData as any[]).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        );
      default:
        return null;
    }
  };


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
    // On initial load, if there's no chat history, start a new chat.
    // In a real app, you might load saved chats for a returning user here.
    if (chatHistory.length === 0) {
      startNewChat();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on component mount.


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
    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setCurrentMessage("");
    setSuggestions([]);

    try {
      const aiInput: AnswerDataQuestionsInput = {
        question: userMessage.text,
        dataSourceDescription: "User has two data sources connected. The first is a 'Sales Data' CSV file containing transaction records with columns: 'OrderID', 'Product', 'Category', 'Amount', 'Date', and 'Region'. The second is a 'Customer Data' SQL database with a 'users' table containing customer information: 'UserID', 'Name', 'SignupDate', 'LastPurchaseDate', and 'TotalSpent'.", // Example description
      };
      const aiResponse: AnswerDataQuestionsOutput = await answerDataQuestions(aiInput);
      
      const insightId = `insight-${Date.now()}`;
      const aiMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: "ai",
        text: aiResponse.answer,
        timestamp: new Date(),
        insightId: insightId, // Assign an ID for bookmarking
      };
      
      if (aiResponse.chart) {
        aiMessage.chart = {
            type: aiResponse.chart.type,
            data: aiResponse.chart.data,
            config: aiResponse.chart.config,
        };
      }
      if (aiResponse.table) {
        aiMessage.table = {
            headers: aiResponse.table.headers,
            rows: aiResponse.table.rows,
        };
      }
      
      const finalMessages = [...updatedMessages, aiMessage];
      setMessages(finalMessages);

      // Update chat history with the complete conversation
      setChatHistory(prev => prev.map(chat => {
        if (chat.id === activeChatId) {
           const isNewChat = chat.messages.length === 0;
           const newTitle = isNewChat 
              ? userMessage.text.substring(0, 30) + (userMessage.text.length > 30 ? "..." : "")
              : chat.title;
          return { ...chat, title: newTitle, messages: finalMessages };
        }
        return chat;
      }));


    } catch (error) {
      console.error("Error calling AI flow:", error);
      const errorMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: "ai",
        text: "Sorry, I encountered an error while processing your request. The AI may not have returned the data in the expected format. Please try rephrasing your question.",
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
      <div className="flex h-full">
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
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mb-4"/>
                  <h3 className="text-lg font-semibold">Start a conversation</h3>
                  <p className="text-sm">Ask a question about your data to begin.</p>
                </div>
              )}
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'items-start'}`}>
                    <Avatar className="h-8 w-8 border">
                       {msg.sender === 'user' ? <User className="h-5 w-5 m-auto text-muted-foreground"/> : <Bot className="h-5 w-5 m-auto text-primary"/>}
                    </Avatar>
                    <div className={`p-3 rounded-lg shadow-sm ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card border'}`}>
                      <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                      {msg.chart && msg.chart.data && (
                        <div className="mt-3 p-2 bg-background/50 rounded-md border">
                          {renderChart(msg.chart.type, msg.chart.data, msg.chart.config)}
                        </div>
                      )}
                      {msg.table && (
                         <div className="mt-3 overflow-x-auto bg-background/50 p-2 rounded-md border">
                            <table className="min-w-full text-xs bg-transparent">
                                <thead className="border-b">
                                    <tr className="text-left">
                                    {msg.table.headers.map(header => <th key={header} className="p-2 font-medium">{header}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {msg.table.rows.map((row, rowIndex) => (
                                        <tr key={rowIndex} className="border-b last:border-none">
                                        {row.map((cell, cellIndex) => <td key={cellIndex} className="p-2">{cell}</td>)}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                         </div>
                      )}
                      <div className="text-xs mt-2 opacity-70">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                       {msg.sender === 'ai' && (
                        <div className="mt-2 -ml-1 flex items-center gap-1">
                          {msg.insightId && (
                            <Button variant="ghost" size="xs" onClick={() => handleBookmark(msg)} className="p-1 h-auto text-xs">
                              <Bookmark className="h-3 w-3 mr-1" /> Bookmark
                            </Button>
                          )}
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
                <span className="text-sm text-muted-foreground flex items-center gap-1"><Lightbulb className="h-4 w-4 text-yellow-500"/> Suggestions:</span>
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
