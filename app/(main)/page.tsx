"use client"

import { useEffect, useState } from "react"
import { Github } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      type: "examples",
      items: [
        {
          category: "Security issues",
          timeAgo: "1m ago",
          content:
            "Porem ipsum dolor sit amet, consectetur adipiscing elit.Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
        },
        {
          category: "Performance issues",
          timeAgo: "5m ago",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, nec aliquam nisl nisl eget nisl."
        },
        {
          category: "Code quality issues",
          timeAgo: "10m ago",
          content:
            "Nulla porttitor accumsan tincidunt. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui."
        }
      ]
    },
    {
      type: "features",
      items: [
        { text: "Faster Reviews", style: "bg-white text-black translate-x-0" },
        {
          text: "Higher Code Quality",
          style: "bg-pink-400 text-black translate-x-2"
        },
        {
          text: "Better Collaboration",
          style: "bg-zinc-800 text-white -translate-x-4"
        },
        {
          text: "Enhanced Security",
          style: "bg-white text-black translate-x-6"
        },
        {
          text: "Seamless Integration",
          style: "bg-pink-400 text-black -translate-x-8"
        }
      ]
    },
    {
      type: "promotion",
      title: "FYI this was built with Crosshatch",
      description:
        "Crosshatch gives developers access to useful model mixes, including a new coding mix that outperforms GPT-4 by 20% on challenging benchmarks.",
      cta: "Try Crosshatch ↗"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="relative flex w-1/2 flex-col justify-between bg-[#FFFCF9] p-12 text-black">
        <div className="relative">
          {/* Star badges */}
          <div className="absolute -left-4 -top-4">
            <div className="relative h-32 w-32">
              <div className="absolute animate-spin-slow">
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-pink-400 p-4 text-center font-mono text-lg font-bold leading-tight">
                  Faster Reviews
                </div>
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-20">
            <div className="relative h-32 w-32">
              <div className="absolute animate-spin-slow">
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-pink-400 p-4 text-center font-mono text-lg font-bold leading-tight">
                  Fewer Bugs
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="mt-40 space-y-8">
            <h1 className="font-mono text-6xl font-black">
              Pull
              <br />
              Request
              <br />
              <span className="relative">
                <span className="absolute inset-0 -bottom-1 bg-pink-200 translate-y-4" />
                <span className="relative px-2">Reviewer</span>
              </span>
            </h1>

            <ol className="list-decimal space-y-2 pl-5">
              <li className="text-xl">Install the app on your repository</li>
              <li className="text-xl">Open up a Pull Request.</li>
              <li className="text-xl">That&apos;s it</li>
            </ol>

            <button className="flex items-center gap-2 rounded-md bg-black px-6 py-3 font-medium text-white transition-colors hover:bg-black/80">
              <Github className="h-5 w-5" />
              <Link
                href={`https://github.com/apps/${process.env.GITHUB_APP_SLUG}/installations/new`}
                rel="noopener noreferrer"
                target="_blank"
              >
                Install on Github
              </Link>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span>© Catena Labs 2023</span>
            <Link href="#" className="hover:underline">
              Terms
            </Link>
            <Link href="#" className="hover:underline">
              Privacy
            </Link>
          </div>
          <Link href="#" aria-label="GitHub">
            <Github className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="relative flex w-1/2 flex-col bg-black p-12">
        {/* Carousel */}
        <div className="mt-20 flex-1">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-x-12 transform transition-all duration-500 ${
                index === currentSlide
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              {slide.type === "examples" ? (
                <div className="space-y-4">
                  {slide.items.map((item, i) => (
                    <div key={i}>
                      <div className="text-sm text-gray-400">
                        {item.category}
                      </div>
                      <div className="mt-2 rounded-lg bg-zinc-900 p-4">
                        <div className="mb-2 flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-zinc-800" />
                          <span className="font-medium text-white">
                            Crosshatch Reviewer
                          </span>
                          <span className="text-sm text-gray-400">
                            {item.timeAgo}
                          </span>
                        </div>
                        <p className="font-mono text-sm text-gray-300">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : slide.type === "features" ? (
                <div className="flex flex-wrap justify-center gap-4">
                  {slide.items.map((item, i) => (
                    <div
                      key={i}
                      className={`rounded-full ${item.style} px-8 py-6 font-mono text-3xl font-bold transform`}
                    >
                      {item.text}
                    </div>
                  ))}
                </div>
              ) : slide.type === "promotion" ? (
                <div className="space-y-6">
                  <h2 className="font-mono text-5xl font-bold text-white">
                    {slide.title}
                  </h2>
                  <p className="text-xl text-gray-300">{slide.description}</p>
                  <button className="rounded-full bg-white px-8 py-4 font-mono text-xl font-bold text-black transition-colors hover:bg-gray-100">
                    {slide.cta}
                  </button>
                </div>
              ) : (
                <div>
                  <div className="text-sm text-gray-400">{slide.category}</div>
                  <div className="mt-2 rounded-lg bg-zinc-900 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-zinc-800" />
                      <span className="font-medium text-white">
                        Crosshatch Reviewer
                      </span>
                      <span className="text-sm text-gray-400">
                        {slide.timeAgo}
                      </span>
                    </div>
                    <p className="font-mono text-sm text-gray-300">
                      {slide.content}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Carousel Navigation */}
        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentSlide ? "bg-white" : "bg-zinc-800"
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
