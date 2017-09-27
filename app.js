var express = require('express');
var expressApp = express();

var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
    type Query {
        hello: String
    }
`);

// The root provides a resolver function for each API endpoint
var root = {
    hello: () => {
        return 'Hello world!';
    },
};

module.exports = {
    expressApp: expressApp,
    schema: schema,
    root: root
}