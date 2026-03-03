import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router'
import App from './App'

describe('App', () => {
  it('renders Tamado heading', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    expect(screen.getByRole('heading', { name: /tamado/i })).toBeInTheDocument()
  })
})
