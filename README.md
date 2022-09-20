# meta-scaffold
Scaffolding for a dapp build focused on fast product iterations

**Prerequisites**
In order to interact with the smart contract, we need it deployed. Once you have it, copy the smart contract account Id that we are going to use on the Dapp.

## Environment Setup

### Local Environment Setup
1. clone this repo locally
```bash
git clone ...

```
2. install dependencies
```bash
yarn
```
1. copy .env.example, rename to .env.local. Set env variable with the contract id.
```json
NEXT_PUBLIC_CONTRACT_ID=="dev-1663183679409-46712385981221"
NEXT_PUBLIC_METAPOOL_CONTRACT_ID="meta-v2.pool.testnet"
NEXT_PUBLIC_GA_TRACKING_ID="IGNORE IT"
NEXT_PUBLIC_VERCEL_ENV=preview
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=
````
1. run the development server
```bash
npm run dev
# or
yarn dev
```

### DEV Environment Setup
1. clone this repo locally (skip if already done on local env setup)
```bash
git clone ...
```
2. install dependencies (skip if already done on local env setup)
```bash
yarn
```
3. deploy
```bash
vercel
```
4. add env variables
```bash
vercel env add NEXT_PUBLIC_CONTRACT_ID 
vercel env add NEXT_PUBLIC_METAPOOL_CONTRACT_ID
...

```

### DEV Production Setup
1. clone this repo locally (skip if already done on local/dev env setup)
```bash
git clone ... 
```
2. install dependencies (skip if already done on local/dev env setup)
```bash
yarn 
```
3. deploy
```bash
vercel --prod
```
4. add env variables (skip if already done on dev env setup)
```bash
vercel env add NEXT_PUBLIC_CONTRACT_ID
vercel env add NEXT_PUBLIC_METAPOOL_CONTRACT_ID
..
```
