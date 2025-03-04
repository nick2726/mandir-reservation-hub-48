
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const mockResponses: Record<string, string> = {
  'default': "I can help you with information about Babadham temple, its history, and pass booking details. What would you like to know?",
  'hello': "Namaste! How can I assist you with your Babadham visit today?",
  'pass': "Temple passes are available in Standard and Premium categories. You can book them through our Passes page. Standard passes start at ₹100 and Premium passes at ₹500. Would you like me to help you navigate to the booking page?",
  'history': "Baba Baidyanath Dham is one of the 12 Jyotirlingas, located in Deoghar, Jharkhand. The temple is dedicated to Lord Shiva and has great historical and spiritual significance. According to legends, Ravana performed penance and was blessed with the sacred Shivalinga here.",
  'timing': "The temple is open for darshan from 4:00 AM to 11:00 PM. The main aarti times are 4:00 AM (Mangal Aarti), 12:00 PM (Bhog Aarti), and 7:00 PM (Sandhya Aarti).",
  'booking': "To book a pass, go to the Passes section, select your preferred date and pass type, then follow the checkout process. You'll need to provide visitor details and make the payment. Your pass will be available for download instantly after successful payment."
};

const AIChatbox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Namaste! I'm your Babadham guide. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate AI response
  const respondToMessage = (userMessage: string) => {
    setIsTyping(true);
    
    // Simulate processing delay
    setTimeout(() => {
      let responseText = mockResponses.default;
      
      // Simple keyword matching for demo purposes
      const lowerCaseMessage = userMessage.toLowerCase();
      if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('namaste')) {
        responseText = mockResponses.hello;
      } else if (lowerCaseMessage.includes('pass') || lowerCaseMessage.includes('ticket') || lowerCaseMessage.includes('book')) {
        responseText = mockResponses.pass;
      } else if (lowerCaseMessage.includes('history') || lowerCaseMessage.includes('about') || lowerCaseMessage.includes('temple')) {
        responseText = mockResponses.history;
      } else if (lowerCaseMessage.includes('time') || lowerCaseMessage.includes('hour') || lowerCaseMessage.includes('open')) {
        responseText = mockResponses.timing;
      } else if (lowerCaseMessage.includes('how') || lowerCaseMessage.includes('book') || lowerCaseMessage.includes('procedure')) {
        responseText = mockResponses.booking;
      }
      
      const newMessage: Message = {
        text: responseText,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage: Message = {
      text: input,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    respondToMessage(input);
  };

  const toggleChat = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
      toast({
        title: "Babadham Assistant",
        description: "Ask me anything about the temple or pass bookings!",
      });
    } else {
      setIsOpen(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Chat button */}
      <Button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 rounded-full p-4 h-14 w-14 shadow-lg bg-primary hover:bg-primary/90 transition-all hover:scale-105"
        aria-label="Chat with Babadham Assistant"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 bg-background rounded-xl shadow-xl overflow-hidden border border-border z-40"
          >
            {/* Chat header */}
            <div className="flex items-center justify-between bg-primary/10 p-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Bot className="text-primary" size={18} />
                <h3 className="font-medium text-sm">Babadham Assistant</h3>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleMinimize}>
                  {isMinimized ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsOpen(false)}>
                  <X size={16} />
                </Button>
              </div>
            </div>
            
            {/* Chat body */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="h-80 overflow-y-auto p-3 flex flex-col gap-3">
                    {messages.map((message, index) => (
                      <div 
                        key={index} 
                        className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.isUser 
                              ? 'bg-primary text-primary-foreground rounded-br-none' 
                              : 'bg-secondary text-secondary-foreground rounded-bl-none'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </p>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-secondary text-secondary-foreground p-3 rounded-lg rounded-bl-none max-w-[80%]">
                          <div className="flex gap-1">
                            <span className="animate-bounce">●</span>
                            <span className="animate-bounce" style={{animationDelay: '0.2s'}}>●</span>
                            <span className="animate-bounce" style={{animationDelay: '0.4s'}}>●</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  
                  {/* Chat input */}
                  <form onSubmit={handleSubmit} className="p-3 border-t border-border flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-grow"
                    />
                    <Button type="submit" size="icon">
                      <Send size={16} />
                    </Button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbox;
