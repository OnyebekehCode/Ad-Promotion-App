'use client'

import {
  Box,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Button,
  Flex,
  Heading,
  useToast,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Ad {
  id: number
  title: string
  description: string
  price: number
  icon: string
}

const ads: Ad[] = [
  {
    id: 1,
    title: 'Ad Title 1',
    description: 'Get traffic now!',
    price: 2.50,
    icon: '🏢'
  },
  {
    id: 2,
    title: 'Ad Title 2',
    description: 'Boost your site traffic!',
    price: 1.75,
    icon: '👤'
  },
  {
    id: 3,
    title: 'Ad Title 3',
    description: 'Earn by sharing!',
    price: 4.00,
    icon: '🌐'
  },
]

export default function AdsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const toast = useToast()

  const filteredAds = ads.filter(ad =>
    ad.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAdClick = (ad: Ad) => {
    router.push(`/ads/${ad.id}`)
  }

  const handleLogout = () => {
    router.push('/login')
    toast({
      title: 'Logged out successfully',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Flex justify="space-between" align="center" mb={8}>
        <Heading size="lg">Ad Promotions</Heading>
        <Button onClick={handleLogout} variant="ghost">
          Logout
        </Button>
      </Flex>

      <InputGroup mb={8}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.500" />
        </InputLeftElement>
        <Input
          placeholder="Search ads"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          bg="white"
          borderRadius="lg"
        />
      </InputGroup>

      <Flex direction="column" gap={4}>
        {filteredAds.map((ad) => (
          <Box
            key={ad.id}
            p={4}
            bg="white"
            borderRadius="lg"
            shadow="sm"
            onClick={() => handleAdClick(ad)}
            cursor="pointer"
            transition="all 0.2s"
            _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
          >
            <Flex gap={4}>
              <Box fontSize="3xl">{ad.icon}</Box>
              <Flex direction="column" flex={1}>
                <Text fontWeight="bold">{ad.title}</Text>
                <Text color="gray.600">{ad.description}</Text>
              </Flex>
              <Box>
                <Text color="green.500" fontWeight="bold">${ad.price.toFixed(2)}</Text>
                <Button colorScheme="green" mt={2} onClick={(e) => {
                  e.stopPropagation()
                  toast({
                    title: 'Money Claimed',
                    description: 'Your earnings have been processed.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  })
                }}>
                  Claim Money
                </Button>
              </Box>
            </Flex>
          </Box>
        ))}
      </Flex>
    </Container>
  )
} 