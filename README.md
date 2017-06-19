# voyager-server

API for running core features of [voyager](https://github.com/vega/voyager/) on a backend server.

This is an express app that can be used to offload Voyager's process-heavy tasks to a backend service.

**NOTE:** This repo provides only a server-side API for a small set of features from voyager. For the main client-side application, please see the [voyager](https://github.com/vega/voyager/) repo.

## Features

voyager-server currently provides two endpoints:

**/recommend** : POST request. Executes `fetchCompassQLRecommend` from voyager and returns results in serialized JSON.

**/build** : POST request. Executes `fetchCompassQLBuildSchema` from voyager and returns results in serialized JSON.

## Development

We are using yarn for dependency management.

```
yarn
```

Should pull down the needed npm packages

```
yarn start
```

Will start the server in dev mode.

## Build

```
yarn build
```

Will create a compiled version of the code at:

```
build/server
```

This compiled code can then be run normally with `node`:

```
node build/server
```
