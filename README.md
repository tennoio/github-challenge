#Overview
A simple, single page app in React.js and Redux that demonstrates searching GitHub repos by topic.

This project was bootstrapped from react-create-app then ejected so that configuration could be changed. The original readme, including the instructions for development and building, can be found in README.orig.md .

## Notes

* The structure used in this app roughly follows https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1 .

* While the airbnb eslint is used, some rules have been adjusted or adjusted (see package.json):
 * react/jsx-filename-extension
 * no-console
 * arrow-body-style
 * space-before-function-paren
 * prefer-template
 * env.browser set to true
 * eslint-disable has been applied to registerServiceWorker (see notes at the top of the file)

## TLDR to get started

To start a dev server:
    > yarn
    > yarn run start

To build the production React app into the /build folder:
	> yarn run build

Node v8.9 was used during development but v7 should work just fine.
