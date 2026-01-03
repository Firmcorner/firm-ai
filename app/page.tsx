"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  Loader2,
  Moon,
  Sun,
  Share2,
  Download,
  Bot,
} from "lucide-react";

type Step = "welcome" | "company-name" | "business-type" | "query" | "response";

const querySuggestions = [
  "How do I grow my network?",
  "How do I create a marketplace for my business?",
  "What should be my target to earn every month in this business?",
  "What marketing strategies should I use?",
  "How can I improve my business operations?",
  "What are the key metrics I should track?",
];

export default function FirmAIPage() {
  const [step, setStep] = useState<Step>("welcome");
  const [companyName, setCompanyName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (step === "welcome") {
      const text = "Welcome to Firm AI";
      let currentIndex = 0;
      setIsTyping(true);

      const typingInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          setTimeout(() => {
            setStep("company-name");
          }, 1000);
        }
      }, 80);

      return () => clearInterval(typingInterval);
    }
  }, [step]);

  useEffect(() => {
    if (step === "response" && response) {
      let currentIndex = 0;
      setDisplayedText("");
      setIsTyping(true);

      const typingInterval = setInterval(() => {
        if (currentIndex <= response.length) {
          setDisplayedText(response.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 20);

      return () => clearInterval(typingInterval);
    }
  }, [step, response]);

  const handleCompanyNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (companyName.trim()) {
      setStep("business-type");
    }
  };

  const handleBusinessTypeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (businessType.trim()) {
      setStep("query");
    }
  };

  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsLoading(true);

      try {
        const res = await fetch("/api/consult", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            companyName,
            businessType,
            query,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to get response");
        }

        const data = await res.json();
        setResponse(data.response);
        setStep("response");
      } catch (error) {
        console.error("Error:", error);
        setResponse(
          "I apologize, but I encountered an error processing your request. Please make sure your OpenAI API key is configured correctly in your environment variables."
        );
        setStep("response");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
  };

  const handleReset = () => {
    setCompanyName("");
    setBusinessType("");
    setQuery("");
    setResponse("");
    setDisplayedText("");
    setStep("company-name");
  };

  const handleShare = () => {
    const shareText = `${companyName} - Business Consultation\n\nQuery: ${query}\n\nResponse: ${response}`;
    const encodedText = encodeURIComponent(shareText);
    window.open(`https://wa.me/?text=${encodedText}`, "_blank");
  };

  const handleDownloadPDF = () => {
    const content = `${companyName} - Business Consultation\n\nBusiness Type: ${businessType}\n\nQuery: ${query}\n\nResponse:\n${response}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${companyName}-consultation.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-white to-purple-50">
        <div className="absolute inset-0 ai-gradient-waves" />
      </div>

      <div className="w-full max-w-3xl relative z-10">
        {step === "welcome" && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in duration-500">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                <Bot className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 text-center">
              {displayedText}
              <span className="inline-block w-1 h-12 bg-purple-600 ml-1 animate-pulse" />
            </h1>
          </div>
        )}

        {step === "company-name" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-3xl shadow-xl border border-purple-100 p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Firm AI</h2>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">
                {"What's your company name?"}
              </h3>
              <p className="text-gray-600 mb-8 text-lg">
                {"Let's start by getting to know your business."}
              </p>

              <form onSubmit={handleCompanyNameSubmit} className="space-y-6">
                <Input
                  type="text"
                  placeholder="Enter your company name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="h-16 text-xl px-6 border-2 border-purple-200 focus:border-purple-600 rounded-2xl"
                  autoFocus
                />
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 text-lg rounded-xl bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
                  disabled={!companyName.trim()}
                >
                  Continue
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </div>
          </div>
        )}

        {step === "business-type" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-3xl shadow-xl border border-purple-100 p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Firm AI</h2>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">
                What type of business is {companyName}?
              </h3>
              <p className="text-gray-600 mb-8 text-lg">
                Tell us about your industry and what you do.
              </p>

              <form onSubmit={handleBusinessTypeSubmit} className="space-y-6">
                <Textarea
                  placeholder="e.g., E-commerce fashion retail, SaaS productivity tools, Local restaurant chain..."
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="min-h-32 text-lg px-6 py-4 border-2 border-purple-200 focus:border-purple-600 rounded-2xl resize-none"
                  autoFocus
                />
                <div className="flex gap-3">
                  <Button
                    type="button"
                    size="lg"
                    variant="outline"
                    className="h-14 text-lg rounded-xl border-2 border-purple-200 hover:bg-purple-50 bg-transparent"
                    onClick={() => setStep("company-name")}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    className="flex-1 h-14 text-lg rounded-xl bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
                    disabled={!businessType.trim()}
                  >
                    Continue
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {step === "query" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-3xl shadow-xl border border-purple-100 p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Firm AI</h2>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">
                How can I help you today?
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                Ask me anything about growing and managing your business.
              </p>

              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Popular questions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {querySuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl text-sm font-medium transition-colors border border-purple-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleQuerySubmit} className="space-y-6">
                <Textarea
                  placeholder="Type your question here..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="min-h-32 text-lg px-6 py-4 border-2 border-purple-200 focus:border-purple-600 rounded-2xl resize-none"
                  autoFocus
                />
                <div className="flex gap-3">
                  <Button
                    type="button"
                    size="lg"
                    variant="outline"
                    className="h-14 text-lg rounded-xl border-2 border-purple-200 hover:bg-purple-50 bg-transparent"
                    onClick={() => setStep("business-type")}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    className="flex-1 h-14 text-lg rounded-xl bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
                    disabled={!query.trim() || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                        Consulting...
                      </>
                    ) : (
                      <>
                        Get Advice
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {step === "response" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div
              className={`rounded-3xl shadow-2xl border transition-colors duration-300 p-8 md:p-12 ${
                isDarkMode
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-purple-100"
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <h2
                    className={`text-2xl font-bold ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Firm AI
                  </h2>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`rounded-xl transition-all ${
                    isDarkMode
                      ? "border-gray-600 bg-gray-800 hover:bg-gray-700 text-yellow-400"
                      : "border-purple-300 bg-white hover:bg-purple-50 text-purple-700"
                  }`}
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </Button>
              </div>

              <div
                className={`mb-6 p-4 rounded-xl border transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-purple-50 border-purple-200"
                }`}
              >
                <p
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-purple-400" : "text-purple-700"
                  }`}
                >
                  <span className="font-bold">{companyName}</span> ·{" "}
                  {businessType}
                </p>
                <p
                  className={`text-sm mt-1 ${
                    isDarkMode ? "text-purple-300" : "text-purple-600"
                  }`}
                >
                  "{query}"
                </p>
              </div>

              <div className="mb-8">
                <div
                  className={`text-base leading-relaxed whitespace-pre-wrap ${
                    isDarkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  {displayedText}
                  {isTyping && (
                    <span className="inline-block w-2 h-4 bg-purple-600 ml-1 animate-pulse" />
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  variant="outline"
                  className={`flex-1 h-12 text-base rounded-xl transition-all ${
                    isDarkMode
                      ? "border-gray-600 bg-gray-800 hover:bg-gray-700 text-gray-100"
                      : "border-purple-200 bg-white hover:bg-purple-50 text-gray-900"
                  }`}
                  onClick={handleShare}
                >
                  <Share2 className="mr-2 w-4 h-4" />
                  Share
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className={`flex-1 h-12 text-base rounded-xl transition-all ${
                    isDarkMode
                      ? "border-gray-600 bg-gray-800 hover:bg-gray-700 text-gray-100"
                      : "border-purple-200 bg-white hover:bg-purple-50 text-gray-900"
                  }`}
                  onClick={handleDownloadPDF}
                >
                  <Download className="mr-2 w-4 h-4" />
                  Download
                </Button>
                <Button
                  size="lg"
                  className="flex-1 h-12 text-base rounded-xl bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white"
                  onClick={handleReset}
                >
                  New Question
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
