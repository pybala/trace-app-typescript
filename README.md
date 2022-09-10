# How To 
Run exe file 
Input trace logs

### Ex: input logs
2016-10-20T12:43:33.000Z 2016-10-20T12:43:36.000Z trace3 back-end-tr3-1 xz->yz
2016-10-20T12:43:33.000Z 2016-10-20T12:43:36.000Z trace2 back-end-1 aa->ac
2016-10-20T12:43:38.000Z 2016-10-20T12:43:40.000Z trace2 back-end-2 aa->ab
2016-10-20T12:43:32.000Z 2016-10-20T12:43:42.000Z trace2 front-end null->aa
2016-10-20T12:43:34.000Z 2016-10-20T12:43:35.000Z trace1 back-end-test ad->ae
2016-10-20T12:43:34.000Z 2016-10-20T12:43:35.000Z trace1 back-end-3 ac->ad
2016-10-20T12:43:33.000Z 2016-10-20T12:43:36.000Z trace1 back-end-1 aa->ac
2016-10-20T12:43:38.000Z 2016-10-20T12:43:40.000Z trace1 back-end-2 aa->ab
2016-10-20T12:43:32.000Z 2016-10-20T12:43:42.000Z trace1 front-end null->aa

### Exit/Cancel to process the logs
Ctrl + c OR Ctrl + z

# How To: Dev

## Run without build
> cd trace-app
* npm install
* npm run start-dev

## Run with build
* npm run build
* node build/index.js
