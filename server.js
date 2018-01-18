import chokidar from 'chokidar';
import express from 'express';
import graphQLHttp from 'express-graphql';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config';
import { clean } from 'require-clean';
import { exec } from 'child_process';

import bluebird from 'bluebird';
import mongoose from 'mongoose';

//TODO: Bring in configs for environments and databases to hit for mongoose.database and such
// const config = require('./config')[env];

let graphQLServer;
const GRAPHQL_PORT = 8080;
let appServer;
const APP_PORT = 3000;

const APP_CONTEXT = path.join(__dirname, 'src');

function startServers(callback) {

    // Shut down the servers if it's already started
    if (appServer) appServer.listeningApp.close();
    if (graphQLServer) graphQLServer.close();

    // Compile the schema
    exec('npm run update- schema', (error, stdout) => {
        console.log(stdout);
        let doneTasks = 0;
        function handleTaskDone() {
            doneTasks++;
            if (doneTasks === 2 && callback) callback();
        }

        startGraphQLServer(handleTaskDone);
        startAppServer(handleTaskDone);
        openDatabaseConnection();
    });
}

//TODO: Definitely break this out
function openDatabaseConnection() {
    mongoose.connect(
        'mongodb://localhost/crowd_photo_dev',
        { promiseLibrary: bluebird }, 
        (err) => {
            if (err) console.log('Error when connecting:', err);
            else console.log('Server connected to the database.');
        }
    );

    // TODO: Add if dev check...
    mongoose.set('debug', true);
}

//TODO: Break this out, roll everything up with webpack apollo loader
function startGraphQLServer(callback) {
    // Expose a GraphQL endpoint
    clean('./schema');

    const { schema } = require('./schema');
    const graphQLApp = express();

    graphQLApp.use('/', graphQLHttp({
        graphiql: true,
        pretty: true,
        schema: schema
    }));

    graphQLServer = graphQLApp.listen(GRAPHQL_PORT, () => {
        console.log(`GraphQL server is now running on http://localhost:${GRAPHQL_PORT}`);
        if (callback) callback();
    });
}

//TODO: break this out into webpack.config file
function startAppServer(callback) {
    const compiler = webpack(webpackConfig);

    appServer = new WebpackDevServer(compiler, {
        //TODO: currently not working
        hot: true,
        //Where index and public files will be served from, publicPath takes precedence
        contentBase: path.join(__dirname, 'public'),
        //Spin up a graphQL server on GRAPHQL_PORT, it can't be 3000, that's the app port
        proxy: { './graphql': `http://localhost:${GRAPHQL_PORT}` },
        //Where bundle.js will be served from
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true
        }
    });

    // Serve static resources
    appServer.use('/', express.static(webpackConfig.output.publicPath));

    //Start the dev server on localhost:APP_PORT
    appServer.listen(APP_PORT, '127.0.0.1', () => {
        console.log(`App is now running on http://localhost:${APP_PORT}`);
        if (callback) callback();
    });
}

chokidar.watch('./{schema}.js').on('change', path => {
    console.log(`\`${path}\` changed. Restarting.`);
    startServers(() => console.log('Restart your browser to use the updated schema.'));
});

startServers();