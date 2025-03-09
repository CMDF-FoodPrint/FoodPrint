"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col gap-6 py-6">
          <Link href="#features" className="text-lg font-medium" onClick={() => setOpen(false)}>
            Features
          </Link>
          <Link href="#testimonials" className="text-lg font-medium" onClick={() => setOpen(false)}>
            Testimonials
          </Link>
          <Link href="#pricing" className="text-lg font-medium" onClick={() => setOpen(false)}>
            Pricing
          </Link>
          <Link href="#contact" className="text-lg font-medium" onClick={() => setOpen(false)}>
            Contact
          </Link>
          <div className="flex flex-col gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Log in
            </Button>
            <Button onClick={() => setOpen(false)}>Sign up</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

