"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { Mail } from "lucide-react"

export default function ContactPage() {
  // Sample contact data - replace with your actual contacts
  const router =  useRouter()

  const contacts = [
    { name: "Customer Suppor", email: "support@foodprint.example.com" },
    { name: "Sarah Johnson", email: "sarah@foodprint.example.com" },
    { name: "Michael Chen", email: "michael@foodprint.example.com" },
    { name: "Priya Patel", email: "priya@foodprint.example.com" },
  ]
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would handle form submission here
    setSubmitted(true)

    // Reset form after 3 seconds for demo purposes
    setTimeout(() => {
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-[#c9d6ba]">
      {/* Header/Navigation */}
      <header className="py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center text-[#2d5234] text-xl font-medium">
              <span className="mr-2">🌱</span>
              FoodPrint
            </Link>
            <nav className="flex space-x-8">
              <Link href="/about" className="text-[#2d5234] hover:text-[#1e3823]">
                About
              </Link>
              <Link href="/recipes" className="text-[#2d5234] hover:text-[#1e3823]">
                Recipes
              </Link>
              <Link href="/blog" className="text-[#2d5234] hover:text-[#1e3823]">
                Blog
              </Link>
              <Link href="/contact" className="text-[#2d5234] hover:text-[#1e3823] font-medium">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-[#2d5234] text-4xl font-bold mb-4 text-center">Contact Us</h1>
        <p className="text-[#2d5234] text-xl mb-12 text-center max-w-2xl mx-auto">
          Have questions about sustainable eating or feedback about our recipes? Reach out to our team members directly.
        </p>

        <div className="max-w-3xl mx-auto bg-[#d8e2cc] rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#2d5234]/10">
            <h2 className="text-2xl font-bold text-[#2d5234]">Our Team</h2>
          </div>

          <div className="divide-y divide-[#2d5234]/10">
            {contacts.map((contact, index) => (
              <div key={index} className="p-6 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-medium text-[#2d5234] text-lg">{contact.name}</h3>
                </div>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center text-[#2d5234] hover:text-[#1e3823] mt-2 md:mt-0"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  {contact.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}