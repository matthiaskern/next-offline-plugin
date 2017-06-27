# Offline Plugin example

This is based on the work of [ssured](https://github.com/ssured) with https://github.com/ssured/nownextmicro

## How to use

Install it and run:

```bash
npm install
npm run build
npm start
```

Deploy it to the cloud with [now](https://zeit.co/now) ([download](https://zeit.co/download))

```bash
now
```

## The idea behind the example

This example uses offline-plugin to generate a service worker. The worker gets registered on the
client-side with the help of react-no-ssr. A custom server is needed to deal with the hashing
implemented in next.js
