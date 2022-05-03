import { fireEvent, render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { SubscribeButton } from '.'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router';


jest.mock('next-auth/react')

jest.mock('next/router')

describe('SubscribeButton component', () => {
    it('renders correctly', () => {

        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce({ data: null, status: "loading" })

        render(<SubscribeButton priceId={''} />
        )

        expect(screen.getByText('Subscribe now')).toBeInTheDocument()
    })
    it('redirects user to sign in when not authenticated', () => {
        const signInMocked = mocked(signIn)
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce({ data: null, status: "loading" })

        render(<SubscribeButton priceId={''} />)

        const subscribeButton = screen.getByText('Subscribe now');

        fireEvent.click(subscribeButton)

        expect(signInMocked).toHaveBeenCalled()
    });

    it('redirect to posts when user already has a subscription', () => {
        const useRouterMocked = mocked(useRouter)
        const useSessionMocked = mocked(useSession)
        const pushMock = jest.fn()



        useRouterMocked.mockReturnValueOnce({
            push: jest.fn(),
        } as any)

        render(<SubscribeButton priceId={''} />)

        const subscribeButton = screen.getByText('Subscribe now')

        fireEvent.click(subscribeButton)

        expect(pushMock).toHaveBeenCalled()
    });
})


