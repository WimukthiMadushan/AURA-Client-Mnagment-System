import { Box, Card, Skeleton } from '@radix-ui/themes'
import React from 'react'

const LoadingSkelton = () => {
    return (
        <>
            <Card>
                <Skeleton>
                    <Box width='40rem' height='5rem' />
                </Skeleton>
            </Card>
            <Card>
                <Skeleton>
                    <Box width='40rem' height='5rem' />
                </Skeleton>
            </Card><Card>
                <Skeleton>
                    <Box width='40rem' height='5rem' />
                </Skeleton>
            </Card><Card>
                <Skeleton>
                    <Box width='40rem' height='5rem' />
                </Skeleton>
            </Card><Card>
                <Skeleton>
                    <Box width='40rem' height='5rem' />
                </Skeleton>
            </Card>
        </>

  )
}

export default LoadingSkelton