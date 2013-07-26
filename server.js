/**
* Pluto - Websocket Remote for Node.js
* Eugen Pirogoff
* web: http://www.eugenpirogoff.de
* mail: eugenpirogoff@me.com
**/

var http = require('http'), /* HTTP Server */
    express = require('express'), /* Express Framework */
    routes = require('./routes'); /* routes folder on filesystem, to know what to do with routing */

var Pluto = function(){

    var self = this; /* setting the scope */

     /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
        //  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_INTERNAL_IP;
        self.port      = process.env.OPENSHIFT_INTERNAL_PORT || 3000;

        if (typeof self.ipaddress === "undefined") {
            self.ipaddress = "127.0.0.1";
            console.warn('No OPENSHIFT_INTERNAL_IP var, using 127.0.0.1');
        };
    };


        /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating Pluto ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };


    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {
        self.app = express();

        self.app.configure(function() {
            self.app.set('views', __dirname + '/views');
            self.app.set('view engine', 'jade');
            self.app.use(express.logger('dev'));
            self.app.use(express.bodyParser());
            self.app.use(express.methodOverride());
            self.app.use(self.app.router);
            self.app.use(express.static( __dirname + '/public'));
        });

        //  Add handlers for the app (from the routes).
        self.app.get('/', routes.index);

    }


    /**
     *  Initializes the sample application.
     */
    self.initialize = function() {
        self.setupVariables();
        self.setupTerminationHandlers();

        // Create the express server and routes.
        self.initializeServer();
    };


    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
        });
    };
};


var wowwow = new Pluto();
wowwow.initialize();
wowwow.start();


