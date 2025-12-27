import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

const cache = new InMemoryCache()
const options: ApolloClient.Options = {
  cache,
  link: new HttpLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_URL }),
}
const client = new ApolloClient(options)
export default client
