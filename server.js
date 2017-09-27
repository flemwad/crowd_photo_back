
var graphqlHTTP = require('express-graphql');
var app = require('./app');

app.expressApp.use('/graphql', graphqlHTTP({
    schema: app.schema,
    rootValue: app.root,
    graphiql: true,
}));

app.expressApp.listen(4000);

console.log('Running a GraphQL API server at localhost:4000/graphql');