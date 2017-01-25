const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const child_process = require('child_process')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/event_handler', function(req, res) {
  var payload = JSON.parse(req.body.payload)

  switch( req.headers['x-github-event'] ){
    case "pull_request":
    if ( payload.action == "closed" && payload.pull_request.merged ){
      child_process.exec('./git_pull.sh', function(error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) { console.log('exec error: ' + error) }
      })
      res.send("A pull request was merged! A deployment should start now...")
    }
  }
})

app.listen(4567, function () {
  console.log('Example app listening on port 4567!')
})
