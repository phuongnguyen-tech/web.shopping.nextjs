// app/provider.tsx
'use client'

import { Provider } from 'react-redux'
import { ReactNode } from 'react'
import store from '@/redux/store'

interface Props {
    children: ReactNode
}

const Providers: React.FC<Props> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>
}

export default Providers
