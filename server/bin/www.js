/* jslint node: true, devel:true */
/** TODO: Test with static-analyzer */

var app = require('../server.js'); //require the app

var server = app.listen(app.get('port'), function () {
    "use strict";
    console.log('Server started on port ' + server.address().port);
});