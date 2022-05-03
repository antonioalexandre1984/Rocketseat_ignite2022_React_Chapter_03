import { render, screen } from '@testing-library/react'
import Home from '../../pages';
import { stripe } from '../../services/stripe'

jest.mock('next/router')
jest.mock('next-auth/react', () => {
    return {
        useSession: () => ({ data: null, status: "loading" })
    }
}),
    jest.mock('../../services / stripe')

describe('Home page', () => {
    it('renders correctly', () => {
        render(<Home product={{ priceId: 'fake-price-id', amount: 'R$10,00' }} />)
        expect(screen.getByText("for R$10,00 month")).toBeInTheDocument()
    });

    it('loads initial data', () => {

    })
})