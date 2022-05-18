# Autosuggest

This repo shows an improved version of solution for a test task. Not sure I managed to recall everything what was requested though.

Main improvement is a fix for debounced promise.
Also I had to implement some backend to make it work.

## Client

Simple React + Typescript frontend. Builds with Webpack, via `yarn build`.
Contains a single `index.tsx` file.

## Server

Python Aiohttp server, which serves static `index.min.js`, which is built from client folder.
This is borrowed from my previous project, so some unnecessary complications are present, like logging and templates folder.

The server exposes an `api/items` endpoint, which actually filters a list of cities by substring, passed over in a `q` parameter. No error handling and no edge case checks is present.

## Video

[Video can be found here](recording.mov)
