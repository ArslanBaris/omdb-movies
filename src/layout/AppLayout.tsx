import React from 'react'
import Navbar from '../containers/Navbar'

export type AppLayoutProps = {
    children: React.ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
        <>
            <div>
                <Navbar />
                <main className="flex-grow px-3 md:px-10">
                    {children}
                </main>
            </div>
        </>
    )
}

export default AppLayout