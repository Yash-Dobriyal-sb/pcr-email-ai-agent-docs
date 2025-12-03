"use client"

import { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
}

export function CodeBlock({ code, language = "typescript", title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group my-6 rounded-xl overflow-hidden border border-border/60 bg-card shadow-sm hover:shadow-md transition-all duration-300">
      {/* Add a header bar to the code block for a "terminal" look */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border/50">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {title || language}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/20"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/20"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/20"></div>
        </div>
      </div>

      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-background/50 backdrop-blur-sm hover:bg-background text-muted-foreground hover:text-foreground"
          onClick={copyToClipboard}
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          <span className="sr-only">Copy code</span>
        </Button>
        <pre className="p-5 overflow-x-auto text-sm leading-relaxed font-mono custom-scrollbar bg-card/50">
          <code className="block min-w-full">{code}</code>
        </pre>
      </div>
    </div>
  )
}
