import React from 'react'
import { Link } from 'react-router-dom'

export function ResetPassword() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="login-bg min-h-screen flex items-center justify-center p-4">
      <div className="bg-surface w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-text">Reset Password</h1>
          <p className="text-textSecondary mt-2">
            Enter your email to receive reset instructions
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
              name="email"
              required
              className="input-responsive"
              placeholder="you@company.com"
            />
          </div>

          <button
            type="submit"
            className="button-responsive w-full bg-primary text-white hover:bg-primary/90"
          >
            Send Reset Link
          </button>

          <div className="text-center">
            <Link to="/login" className="text-sm text-primary hover:text-primary/90">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}