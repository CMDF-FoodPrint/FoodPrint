'use client';


import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Leaf, UtensilsCrossed, Clock, BarChart3 } from "lucide-react"
import '../../../styles/About.css'

export default function About() {
    return (
        <div>
                  <header className="w-full py-4 px-6 flex items-center justify-between">
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
            <div className="about-container">
                <h1>About Us</h1>
                <p>
                    We are a group of students from the University of British Columbia, passionate about sustainability and the environment. We created this website to help you make more sustainable choices in your everyday life.
                </p>
                <p>
                    Our goal is to provide you with information on the carbon footprint of the food you eat, so you can make more informed decisions about what you consume. We hope that by using our website, you can reduce your carbon footprint and help protect the environment.
                </p>
                <p>
                    Thank you for using our website and for caring about the planet!
                </p>
            </div>
            <div className="image-container">
                <img src="/health.png" alt="About Us" />
            </div>
        </div>
    );
}