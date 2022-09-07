# solid-spork

Although I tried to complete the challenge, I was unclear what I should do about the `confidence threshold`, so I decided not to.

Maybe the bot only needs to send a reply if the confidence is higher than `confidence threshold`. But I was not sure so it is not implemented.

I would greatly appreciate any feedback you may have.

## Technical Details

-   MongoDB is used to store replies
-   Testing is done using Jest
-   A few unit-tests and end-to-end tests are developed
-   Makefile is used to make life easier for -developments
-   Docker and Docker-compose are used to keep development and production environments in close proximity
-   Formatting is done with Prettier
-   Dependency injection is used everywhere to facilitate developing tests

## Things to do

-   Examine whether redis can be used as a cache. It's not clear if it makes sense
-   Investigate if APIs need rate limitations

## Cammands

To install dependencies run:

```sh
make setup
```

To execute tests run:

```sh
make tests
```

To start the service run:

```sh
make up
```

To stop the service run:

```sh
make stop
```

To stop the service and remove dockers run:

```sh
make down
```

## API Docs

The Postman collection with examples is available in the root directory of the project
