import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	uri: "http://localhost:8080/graphql",
	cache: new InMemoryCache(),
});

export default client;

//https://test-test.adaptable.app/graphql