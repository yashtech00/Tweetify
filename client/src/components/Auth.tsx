"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Mail, Lock, User, ImageIcon } from "lucide-react"
import axios, { isAxiosError } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Toaster, toast } from "react-hot-toast"
import { Link } from "react-router-dom"

interface AuthProp {
  username: string
  fullname: string
  password: string
  email: string
  Cover_Image: string
}

export const Auth = ({ type }: { type: "login" | "signup" }) => {
  const [isLoading, setIsLoading] = useState(false)

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  const [formsData, setFormsData] = useState<AuthProp>({
    username: "",
    fullname: "",
    password: "",
    email: "",
    Cover_Image: "",
  })

  const queryClient = useQueryClient()

  const { mutate: AuthMutation } = useMutation({
    mutationKey: ["login"],
    mutationFn: async ({ username, email, password, fullname, Cover_Image }: AuthProp) => {
      try {
        const res = await axios.post(
          `${BACKEND_URL}/auth/${type}`,
          {
            username,
            email,
            password,
            fullname,
            Cover_Image,
          },
          { withCredentials: true },
        )

        console.log(res)
       
        return res.data.user
      } catch (e) {
        console.error(e)
        if (axios.isAxiosError(e)) {
          const errmsg = isAxiosError(e) ? e.response?.data?.message : "Server is not responding"
          toast.error(errmsg)
        } else {
          toast.error("Server is not responding")
        }
        return
      }
    },
    onSuccess: () => {
      toast.success(`${type === "signup" ? "Account created" : "Logged in"} successfully!`)
      queryClient.invalidateQueries({ queryKey: ["authUser"] })
    },
    onError: () => {
      toast.error("Error while login/signup")
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await AuthMutation(formsData)
    setIsLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormsData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300 } },
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 sm:p-6 md:p-8">
      {/* <Toaster position="top-center" /> */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Welcome to Tweetify</h1>
          <p className="mt-3 text-gray-400">{type === "signup" ? "Create your account" : "Sign in to your account"}</p>
        </motion.div>

        {type === "login" ? (
          <motion.form
            variants={container}
            initial="hidden"
            animate="show"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <motion.div variants={item}>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formsData.email}
                  onChange={handleInputChange}
                  placeholder="Email address"
                  className="w-full pl-10 py-2 px-4 bg-gray-900/50 border border-gray-800 rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-600"
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={item}>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formsData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full pl-10 py-2 px-4 bg-gray-900/50 border border-gray-800 rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-600"
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={item} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-gray-700 bg-gray-900 text-violet-600 focus:ring-violet-600"
                />
                <label htmlFor="remember" className="text-sm text-gray-400">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-violet-400 hover:text-violet-300">
                Forgot password?
              </a>
            </motion.div>

            <motion.div variants={item}>
              <button
                type="submit"
                className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                    className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    Log in
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, repeatType: "reverse" }}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </>
                )}
              </button>
            </motion.div>
          </motion.form>
        ) : (
          <motion.form
            variants={container}
            initial="hidden"
            animate="show"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <motion.div variants={item} className="grid grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  value={formsData.username}
                  onChange={handleInputChange}
                  placeholder="Username"
                  className="w-full pl-10 py-2 px-4 bg-gray-900/50 border border-gray-800 rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-600"
                  required
                />
              </div>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="fullname"
                  value={formsData.fullname}
                  onChange={handleInputChange}
                  placeholder="Full name"
                  className="w-full pl-10 py-2 px-4 bg-gray-900/50 border border-gray-800 rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-600"
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={item}>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formsData.email}
                  onChange={handleInputChange}
                  placeholder="Email address"
                  className="w-full pl-10 py-2 px-4 bg-gray-900/50 border border-gray-800 rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-600"
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={item}>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formsData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full pl-10 py-2 px-4 bg-gray-900/50 border border-gray-800 rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-600"
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={item}>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="Cover_Image"
                  value={formsData.Cover_Image}
                  onChange={handleInputChange}
                  placeholder="Cover Image URL (https://...)"
                  className="w-full pl-10 py-2 px-4 bg-gray-900/50 border border-gray-800 rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-600"
                />
              </div>
            </motion.div>

            <motion.div variants={item}>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 rounded border-gray-700 bg-gray-900 text-violet-600 focus:ring-violet-600"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-400">
                  I agree to the{" "}
                  <a href="#" className="text-violet-400 hover:text-violet-300">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-violet-400 hover:text-violet-300">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </motion.div>

            <motion.div variants={item}>
              <button
                type="submit"
                className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                    className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    Create account
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, repeatType: "reverse" }}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </>
                )}
              </button>
            </motion.div>
          </motion.form>
        )}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-black px-2 text-gray-400">
                {type === "signup" ? "Already have an account?" : "Don't have an account?"}
              </span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              to={`/${type === "signup" ? "login" : "signup"}`}
              className="text-violet-400 hover:text-violet-300 text-sm"
            >
              {type === "signup" ? "Log in" : "Sign up"}
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center text-sm text-gray-400"
        >
          <motion.div
            className="absolute inset-0 -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-600 rounded-full filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-violet-600 rounded-full filter blur-3xl opacity-20"></div>
          </motion.div>

          <p>
            By signing in, you agree to our{" "}
            <a href="#" className="text-violet-400 hover:text-violet-300">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-violet-400 hover:text-violet-300">
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
