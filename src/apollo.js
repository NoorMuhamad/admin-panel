import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	uri: "https://test-test.adaptable.app/graphql",
	cache: new InMemoryCache(),
});

export default client;

//http://localhost:8080/graphql