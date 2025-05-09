import React from 'react'
import './App.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import DefaultLayout from './components/layouts/Default'
import theme from './theme'
import InterestData from './pages/InterestData'

const defaultTheme = extendTheme(theme)

function App() {
    return (
        <ChakraProvider theme={defaultTheme}>
            <DefaultLayout>
                <Container maxW="container.xl" pt={6} pb={12}>
                    <InterestData/>
                </Container>
            </DefaultLayout>
        </ChakraProvider>
    )
}

export default App
