"use client"

import { useState } from "react"
import { SearchIcon, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Search() {
  const [query, setQuery] = useState("")

  return (
    <div className="relative w-full max-w-md">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search documentation..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 pr-10"
      />
      {query && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
          onClick={() => setQuery("")}
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  )
}
