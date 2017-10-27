# prospelling

Howard and Yvette are an awesome team!

## To run this on your laptop

1. First start MongoDB

`mongod`

2. Then start the server in dev mode

`npm run dev`

## To deploy: 

1. Get the code ready for Prod like this...

`cd frontend && npm run build && cd .. && node server`

2. Change the NODE_ENV setting in process.env to development

2. Then check it like this

`http://localhost:8080`

2. Git commit

3. To deploy run this:

`export PATH=~/Library/Python/2.7/bin/:$PATH`

4. Then 

`eb deploy`

***

Make sure that elastic beastalk has this environment setting

`NODE_ENV = production`
