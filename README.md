# Movies API Server

Simple API Server with transactions

Find more info in `swagger.yaml`

## Get started

### Install all dependencies

```bash
npm install
```

### Run unit tests

```bash
npm run test
```

### Lint your code

```bash
npm run lint
```

### Transactions

After restart all modifications - edits and deletes - on original movie db are skipped,
after restart you will work with original movie db

There are two exclusions of this:

1. New movies that you add to the movie db and operations over them
2. Updated posters

These operations are saved as transactions (src/data/movies.log), after each restart
transaction data is applied to the movie db as monkey patch (original data file is not touched)
