# prospelling

Howard and Yvette are an awesome team!

Make sure that elastic beastalk has this environment setting

`NODE_ENV = production`

To deploy run this:

`export PATH=~/Library/Python/2.7/bin/:$PATH`

Then eb deploy

Test Prod locally like this...

`cd frontend && npm run build && cd .. && NODE_ENV=production node server`

To deploy on AWS

`export PATH=~/Library/Python/2.7/bin/:$PATH`
`eb deploy`

To run dev: 

`npm start`
