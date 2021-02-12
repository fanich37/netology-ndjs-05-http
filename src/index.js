#!/usr/bin/env node

try {
  require('dotenv').config();
} catch (error) { }

const http = require('http');
const { URL } = require('url');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const API = require('./api');
const { processApiData } = require('./utils');
const { API_ENDPOINT, DEFAULT_ERROR_MESSAGE } = require('./constants');
const { API_KEY } = process.env;

const argv = yargs(hideBin(process.argv))
  .option('city', {
    alias: ['c'],
    type: 'string',
    description: 'City name you want to find out the temperature of',
    demandOption: true,
  })
  .help('h')
  .alias('h', 'help')
  .strict(true)
  .argv;

const { city } = argv;
const url = new URL(API_ENDPOINT);
url.searchParams.append('access_key', API_KEY);
url.searchParams.append('query', city);

const api = new API(http.get);

api.fetchData(url)
  .then(processApiData)
  .catch((error) => {
    console.error(error.message || DEFAULT_ERROR_MESSAGE);
    process.exit(1);
  });
