import Typesense from 'typesense'

let client = new Typesense.Client({
    'nodes': [{
        'host': 'ipozelsk5jw4082up-1.a1.typesense.net', // where xxx is the ClusterID of your Typesense Cloud cluster
        'port': '443',
        'protocol': 'https'
    }],
    'apiKey': 'g6wqCxD2c06EfYB3N5EwFGHQnQXm6Mg2',
    'connectionTimeoutSeconds': 2
})
export { client as Typesense };