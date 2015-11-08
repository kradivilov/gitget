var express = require('express'),
    app = express();

app.use(express.static('client'));
app.set('port', 8888);

var server = app.listen(app.get('port'), function () {
    var host = server.address().address,
        port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
