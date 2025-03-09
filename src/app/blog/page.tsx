"use client";

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Leaf, UtensilsCrossed, Clock, BarChart3 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function BlogPage() {
  const router = useRouter()
  return (
    <div className="flex flex-col min-h-screen bg-[#a7c4a0]">

      <header className="w-full py-4 px-6 flex items-center justify-between bg-white">
        <div className="flex items-center space-x-2">
          <Link href="/">
          <Leaf className="h-6 w-6 text-green-800" />
          </Link>
          <Link href="/">
          <span className="font-bold text-xl text-green-800">FoodPrint</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/About" className="text-green-800 hover:text-green-900 font-medium">
            About
          </Link>
          <Link href="/ingredient" className="text-green-800 hover:text-green-900 font-medium">
            Recipes
          </Link>
          <Link href="/blog" className="text-green-800 hover:text-green-900 font-medium">
            Blog
          </Link>
          <Link href="#" className="text-green-800 hover:text-green-900 font-medium">
            Contact
          </Link>
        </nav>
      </header>


      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-[#2d5234] text-4xl font-bold mb-8 text-center">Our Blog</h1>
          <p className="text-[#2d5234] text-xl mb-12 text-center">
            Insights, tips, and stories about sustainable eating and low-carbon recipes.
          </p>

          {/* Featured Post */}
          <div className="bg-[#d8e2cc] rounded-lg p-6 mb-12">
            <div className="relative h-[400px] w-full mb-6 rounded-lg overflow-hidden">
              <Image
                src="/vegetables.png"
                alt="Featured blog post"
                fill
                className="object-cover"
              />
            </div>
            <h2 className="text-3xl font-bold text-[#2d5234] mb-4">Seasonal Eating: Why It Matters for the Planet</h2>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm text-[#2d5234]">By Emma Green</span>
              <span className="text-sm text-[#2d5234]">June 12, 2023</span>
              <span className="text-sm text-[#2d5234]">8 min read</span>
            </div>
            <p className="text-[#2d5234] mb-6">
              Eating seasonally isn't just about enjoying foods at their peak flavor—it's also one of the most effective
              ways to reduce your carbon footprint. In this article, we explore how seasonal eating patterns can
              dramatically lower the environmental impact of your diet.
            </p>
            <Button className="bg-black hover:bg-gray-800 text-white rounded-md px-6 py-2">Read More</Button>
          </div>

          {/* Recent Posts */}
          <h3 className="text-2xl font-bold text-[#2d5234] mb-6">Recent Posts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              {
                title: "How to Reduce Food Waste at Home",
                excerpt: "Simple strategies to minimize waste and maximize your grocery budget.",
                date: "May 28, 2023",
                
              },
              {
                title: "Plant-Based Protein Sources",
                excerpt: "Complete guide to getting enough protein while reducing meat consumption.",
                date: "May 15, 2023",
              },
              {
                title: "Understanding Food Carbon Labels",
                excerpt: "What those numbers mean and how to use them for better choices.",
                date: "April 30, 2023",
              },
              {
                title: "Sustainable Kitchen Tools",
                excerpt: "Eco-friendly alternatives to common kitchen equipment.",
                date: "April 22, 2023",
              },
            ].map((post, index) => (
              <Card key={index} className="bg-[#d8e2cc] border-none shadow-sm overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={`/vegetables.png`}
                    alt={`Blog post ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h4 className="text-xl font-semibold mb-2 text-[#2d5234]">{post.title}</h4>
                  <p className="text-[#2d5234] text-sm mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#2d5234]">{post.date}</span>
                    <Button variant="ghost" size="sm" className="text-[#2d5234] hover:text-[#1e3823]">
                      Read
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

