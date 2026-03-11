import { Header } from "@/components/layout/Header";
import { useState } from 'react'
import { Sidebar } from "@/components/layout/Sidebar";

export function MainPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-apple-bg dark:bg-apple-dark-bg">
      <Header onOpenSidebar={() => setIsSidebarOpen(true)}/>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </div>
  )
}