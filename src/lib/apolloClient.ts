import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

const cache = new InMemoryCache()
const options: ApolloClient.Options = {
  cache,
  link: new HttpLink({ uri: "http://localhost:3000/api/graphql" }),
}
const client = new ApolloClient(options)
export default client
