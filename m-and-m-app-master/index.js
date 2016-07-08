'use strict';

var servers = require('./servers');

servers.http.listen(3000, () => {
    console.log('API server started...');
});
