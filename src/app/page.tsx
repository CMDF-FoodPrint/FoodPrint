"use client";

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Leaf, UtensilsCrossed, Clock, BarChart3 } from "lucide-react"
import IngredientsPage from "../../components/IngredientsPage";

export default function LandingPage() {
  const router = useRouter()
  return (
    <div className="flex flex-col min-h-screen bg-[#a7c4a0]">

      <header className="w-full py-4 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-green-800" />
          <span className="font-bold text-xl text-green-800">FoodPrint</span>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="#" className="text-green-800 hover:text-green-900 font-medium">
            About
          </Link>
          <Link href="#" className="text-green-800 hover:text-green-900 font-medium">
            Recipes
          </Link>
          <Link href="#" className="text-green-800 hover:text-green-900 font-medium">
            Blog
          </Link>
          <Link href="#" className="text-green-800 hover:text-green-900 font-medium">
            Contact
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-green-900">FoodPrint</h1>

          <p className="text-xl text-green-800 mb-6 max-w-2xl mx-auto">
            Discover delicious recipes that are good for you and the planet.
          </p>

          <h2 className="text-3xl md:text-5xl font-medium mb-12 text-green-900">
            Do you want to get low carbon recipes?
          </h2>

          <Button className="bg-black hover:bg-green-900 text-white rounded-md px-10 py-7 text-xl font-medium transition-all duration-300 transform hover:scale-105"
          onClick={() => router.push("/ingredient")}
          >
            Get Started!
          </Button>
        </div>
      </main>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg flex flex-col items-center text-center">
              <div className="bg-green-800 text-white p-3 rounded-full mb-4">
                <UtensilsCrossed className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-green-900">Sustainable Recipes</h3>
              <p className="text-green-800">Delicious meals with low carbon footprint ingredients.</p>
            </div>

            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg flex flex-col items-center text-center">
              <div className="bg-green-800 text-white p-3 rounded-full mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-green-900">Quick & Easy</h3>
              <p className="text-green-800">Most recipes ready in under 30 minutes.</p>
            </div>

            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg flex flex-col items-center text-center">
              <div className="bg-green-800 text-white p-3 rounded-full mb-4">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-green-900">Track Your Impact</h3>
              <p className="text-green-800">See how your food choices help the environment.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="md:w-1/2">
            <Image
              src="/landingpage.avif?height=400&width=500"
              alt="Sustainable food"
              width={500}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-3xl font-bold text-green-900">Eat Well, Live Better</h2>
            <p className="text-green-800 text-lg">
              Our recipes are designed to be nutritious, delicious, and environmentally friendly. By choosing low-carbon
              ingredients, you're making a positive impact on the planet.
            </p>
            <Button className="bg-green-800 hover:bg-green-900 text-white">Browse Recipes</Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-green-800/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-green-900">Join Our Community</h2>
          <p className="text-green-800 mb-6">
            Get weekly recipes and tips on sustainable eating delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Button className="bg-green-800 hover:bg-green-900 text-white whitespace-nowrap">Subscribe</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-green-900/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Leaf className="h-5 w-5 text-green-800" />
            <span className="font-bold text-green-800">FoodPrint</span>
          </div>
          <div className="flex space-x-6">
            <Link href="#" className="text-green-800 hover:text-green-900">
              About
            </Link>
            <Link href="#" className="text-green-800 hover:text-green-900">
              Recipes
            </Link>
            <Link href="#" className="text-green-800 hover:text-green-900">
              Privacy
            </Link>
            <Link href="#" className="text-green-800 hover:text-green-900">
              Terms
            </Link>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-green-800">
            © {new Date().getFullYear()} FoodPrint. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
