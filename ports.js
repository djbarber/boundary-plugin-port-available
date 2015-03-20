var _param = require('./param.json');

var sys = require('sys')
var net = require('net');

var pollInterval = _param.pollInterval || 1000;
var ports = _param.ports;
var ip = _param.ip || "localhost";

var _os = require('os');
var _source = _os.hostname();
var timeout = 500;


function checkPort(port){
	var sock = new net.Socket();
	var isOpen = false;
	sock.setTimeout(timeout, function() { s.destroy(); });
        sock.connect(port, ip, function() {
		isOpen = true;
        });
        sock.on('error', function(e) {
            	isOpen = false;
		sock.destroy();
        });
	var host = "port-" + port + "-" + _source;
	if (isOpen) {
        	console.log('BOUNDARY_PORT_OPEN %d %s', 1, host);
		}
	else {
		console.log('BOUNDARY_PORT_OPEN %d %s', 0, host);
	}
}


function poll()
{
	for(var i = 0; i < ports.length; i++)
	{
		checkPort(ports[i]);
	}
}

setInterval(poll, pollInterval);
