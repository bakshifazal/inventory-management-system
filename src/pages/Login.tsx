import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'

export function Login() {
  const navigate = useNavigate()
  const login = useStore((state) => state.login)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login(email, password)
    navigate('/')
  }

  return (
    <div className="login-bg min-h-screen flex items-center justify-center p-4">
      <div className="bg-surface w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-text">Welcome Back</h1>
          <p className="text-textSecondary mt-2">
            Sign in to manage your inventory
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-textSecondary mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-responsive"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-textSecondary mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-responsive"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="h-4 w-4 rounded border-border bg-surface text-primary focus:ring-primary/20" />
              <span className="ml-2 text-sm text-textSecondary">Remember me</span>
            </label>
            <Link to="/reset-password" className="text-sm text-primary hover:text-primary/90">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="button-responsive w-full bg-primary text-white hover:bg-primary/90"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}