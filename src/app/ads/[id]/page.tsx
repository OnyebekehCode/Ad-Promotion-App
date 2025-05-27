'use client'

import {
  Box,
  Container,
  Text,
  Button,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  IconButton,
  useToast,
} from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
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

export default function AdDetails({ params }: { params: { id: string } }) {
  const router = useRouter()
  const toast = useToast()
  
  const ad = ads.find(a => a.id === parseInt(params.id))

  if (!ad) {
    return (
      <Container maxW="container.xl" py={8}>
        <Flex align="center" mb={8}>
          <IconButton
            aria-label="Back"
            icon={<ChevronLeftIcon w={6} h={6} />}
            variant="ghost"
            onClick={() => router.back()}
            mr={4}
          />
          <Heading size="lg">Ad Not Found</Heading>
        </Flex>
        <Text>The requested ad could not be found.</Text>
      </Container>
    )
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Flex align="center" mb={8}>
        <IconButton
          aria-label="Back"
          icon={<ChevronLeftIcon w={6} h={6} />}
          variant="ghost"
          onClick={() => router.back()}
          mr={4}
        />
        <Heading size="lg">{ad.title}</Heading>
      </Flex>

      <Box bg="white" p={6} borderRadius="lg" shadow="sm">
        <Flex direction="column" gap={6}>
          <Box>
            <Heading size="md" mb={2}>Description</Heading>
            <Text>Get people to visit our blog and earn up to $100 by sharing.</Text>
          </Box>

          <Box>
            <Heading size="md" mb={4}>Ad Assets</Heading>
            <SimpleGrid columns={[1, 2]} gap={4}>
              <Image
                src="https://via.placeholder.com/300x200"
                alt="Ad asset"
                borderRadius="md"
              />
              <Box bg="blue.100" p={4} borderRadius="md">
                <Text>Additional content</Text>
              </Box>
            </SimpleGrid>
          </Box>

          <Box>
            <Heading size="md" mb={2}>Your Unique Link</Heading>
            <Box bg="gray.50" p={3} borderRadius="md">
              <Text>https://our.site/ads/{ad.id}/promo</Text>
            </Box>
          </Box>

          <Box>
            <Heading size="md" mb={2}>Prize Breakdown</Heading>
            <SimpleGrid columns={[2, 3]} gap={4} mb={2}>
              <Box p={3} bg="blue.50" borderRadius="md">
                <Text fontWeight="bold">1st Place</Text>
                <Text>$50</Text>
              </Box>
              <Box p={3} bg="blue.50" borderRadius="md">
                <Text fontWeight="bold">2nd Place</Text>
                <Text>$30</Text>
              </Box>
              <Box p={3} bg="blue.50" borderRadius="md">
                <Text fontWeight="bold">3rd Place</Text>
                <Text>$20</Text>
              </Box>
            </SimpleGrid>
            <Text>Others: Share $100 proportionally</Text>
          </Box>

          <Button
            colorScheme="blue"
            size="lg"
            onClick={() => {
              toast({
                title: 'Promotion Started',
                description: 'You can now start sharing your unique link!',
                status: 'success',
                duration: 3000,
                isClosable: true,
              })
            }}
          >
            Start Promoting Now
          </Button>
        </Flex>
      </Box>
    </Container>
  )
} 