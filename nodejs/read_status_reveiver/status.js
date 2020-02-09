// status.js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Telnet = require('telnet-client')
var connection = new Telnet()

var params = {
  host: 'home.complement-terre.fr',
  //host: '000.000.000.000',
  port: 5000,
  //shellPrompt: '/ # ',
  shellPrompt: 'rtkrcv> ',
  shellPrompt: '',
  timeout: 1500,
  // removeEcho: 4
  negotiationMandatory: false,
  ors: '\r\n', // mandatory for your 'send' to work
  waitfor: '\n' // mandatory for your 'send' to work (set those either here or in your exec_params!)
}

app.use(express.static(__dirname + '/node_modules'))
.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
})
// REMOTE CONTROL FONCTION
//************************
.get('/remoteOrder', function(req, res, next) {
    console.log('command order received = ' + req.query.command);

    if ( req.query.command == '1') {
      console.log('executing the scp_backend/test.sh command...');
      const exec = require('child_process').exec;
      var command1 = exec('sh scp_backend/test.sh',
        (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });
      
    }
    
    res.redirect('/');
});

var dict = {};

connection.on('data', function(response){
  response = response.toString();  
  var lines = response.split('\n');
  //console.log('lines:'+lines.length);
  for (var i=0; i< lines.length; i++){
    line = lines[i];
    var cols = line.split(':');
    if (cols.length >= 2){
      dict[cols[0].trim()] = cols[1].trim();        
    }      
  }   
  key = 'rtklib version';
  key = 'rtk server thread';
  key = 'rtk server state';
  key = 'processing cycle (ms)';
  key = 'positioning mode';
  key = 'frequencies';
  key = 'accumulated time to run';
  key = 'cpu time for a cycle (ms)';
  key = 'missing obs data count';
  key = 'bytes in input buffer';
  key = '# of input data rover';
  key = '# of input data base';
  key = '# of input data corr';
  key = '# of rtcm messages rover';
  key = '# of rtcm messages base';
  key = '# of rtcm messages corr';
  key = 'solution status';
  key = 'time of receiver clock rover';
  key = 'time sys offset (ns)';
  key = 'solution interval (s)';
  key = 'age of differential (s)';
  key = 'ratio for ar validation';
  key = '# of satellites rover';
  key = '# of satellites base';
  key = '# of valid satellites';
  key = 'GDOP/PDOP/HDOP/VDOP';
  key = '# of real estimated states';
  key = '# of all estimated states';
  key = 'pos xyz single (m) rover';
  key = 'pos llh single (deg,m) rover'
  key = 'vel enu (m/s) rover';
  key = 'pos xyz float (m) rover';
  key = 'pos xyz float std (m) rover';
  key = 'pos xyz fixed (m) rover';
  key = 'pos xyz fixed std (m) rover';
  key = 'pos xyz (m) base';
  key = 'pos llh (deg,m) base';
  key = '# of average single pos base';
  key = 'ant type rover';
  key = 'ant delta rover';
  key = 'ant delta base';
  key = 'vel enu (m/s) base';
  key = 'baseline length float (m)';
  key = 'baseline length fixed (m)';
  key = 'last time mark';
  key = 'receiver time mark count';
  key = 'rtklib time mark count';
  key = 'monitor port' //necessaire pour basertk pas pour roverdroid

  if (key in dict){
    //console.log('baseline:'+dict['baseline length float (m)']);
    
    function timerSolution() {
  //console.log('TimerFunc');
  Solution = dict['solution status'];
  dict['Solution'] = Solution;
  io.emit('solution', dict);  
  setTimeout(timerSolution, 2000);
	}
setTimeout(timerSolution, 2000);

    function timerRatio() {
   Ratio = dict['ratio for ar validation'];
   dict['Ratio'] = Ratio;
   io.emit('ratio', dict);
   setTimeout(timerRatio, 2000);
     }
setTimeout(timerRatio, 2000);

    function timerAge() {
   Age = dict['age of differential (s)'];
   dict['Age'] = Age;
   io.emit('age', dict);
   setTimeout(timerAge, 2000);
     }
setTimeout(timerAge, 2000);

    function timerSat() {
  //console.log('TimerFunc');
  dict['SATELLITES_BASE'] = SATELLITES_BASE;
  dict['SATELLITES_ROVER'] = SATELLITES_ROVER;
  dict['SATELLITES_VALID'] = SATELLITES_VALID;
  io.emit('SAT', dict);  
  setTimeout(timerSat, 1000);
    }
setTimeout(timerSat, 1000);

    function timerSd() {
  //console.log('TimerFunc');
  dict['SDE'] = SDE;
  dict['SDN'] = SDN;
  dict['SDU'] = SDU;
  io.emit('precision', dict);  
  setTimeout(timerSd, 1000);
    }
setTimeout(timerSd, 1000);

    function timerBaseLine() {
   //console.log('timerBaseLine');
   dict['BASELINE'] = BASELINE;
   io.emit('BASELINE', dict);
  setTimeout(timerBaseLine, 1000);
    }
setTimeout(timerBaseLine, 1000);

    //pos xyz single (m) rover in to diffrent parameters#
    POS_Single = dict['pos xyz single (m) rover'];
    POS_Single_Split = POS_Single.split(",");
    POS_Single_X = POS_Single_Split[0];
    POS_Single_Y = POS_Single_Split[1];
    POS_Single_Z = POS_Single_Split[2];
    //console.log(POS_Single_Z);

        //pos llh single (deg,m) rover in to diffrent parameters#
    POS_Single_LLH = dict['pos llh single (deg,m) rover'];
    //console.log(POS_Single_LLH);
    POS_Single_LLH_Split = POS_Single_LLH.split(",");
    console.log(POS_Single_LLH_Split);
    POS_Single_LAT = POS_Single_LLH_Split[0];
    POS_Single_LONG = POS_Single_LLH_Split[1];
    POS_Single_H = POS_Single_LLH_Split[2];
    //console.log(POS_Single_LAT);
    //console.log(POS_Single_LONG);
    //console.log(POS_Single_H);

    function timerFunc2() {
  //console.log('TimerFunc');
  dict['POS_Single_LAT'] = POS_Single_LAT;
  dict['POS_Single_LONG'] = POS_Single_LONG;
  dict['POS_Single_H'] = POS_Single_H;
  io.emit('POS_Single_LLH', dict);  
  setTimeout(timerFunc2, 200);
}
setTimeout(timerFunc2, 200);

    //pos xyz float in to diffrent parameters#
    POS_XYZ_Float = dict['pos xyz float (m) rover'];
    POS_XYZ_Float_Split = POS_XYZ_Float.split(",");
    POS_XYZ_Float_X = POS_XYZ_Float_Split[0];
    POS_XYZ_Float_Y = POS_XYZ_Float_Split[1];
    POS_XYZ_Float_Z = POS_XYZ_Float_Split[2];
    //console.log(POS_XYZ_Float_Z);

     //pos xyz float std (m) rover in to diffrent parameters#
     POS_XYZ_Float_Std = dict['pos xyz float std (m) rover'];
     POS_XYZ_Float_Std_Split = POS_XYZ_Float_Std.split(",");
     POS_XYZ_Float_Std_X = POS_XYZ_Float_Std_Split[0];
     POS_XYZ_Float_Std_Y = POS_XYZ_Float_Std_Split[1];
     POS_XYZ_Float_Std_Z = POS_XYZ_Float_Std_Split[2];
     //console.log(POS_XYZ_Float_Std_Z);

    //pos xyz fixed (m) rover in to diffrent parameters#
    POS_XYZ_Fixed = dict['pos xyz fixed (m) rover'];
    POS_XYZ_Fixed_Split = POS_XYZ_Fixed.split(",");
    POS_XYZ_Fixed_X = POS_XYZ_Fixed_Split[0];
    POS_XYZ_Fixed_Y = POS_XYZ_Fixed_Split[1];
    POS_XYZ_Fixed_Z = POS_XYZ_Fixed_Split[2];
    //console.log(POS_XYZ_Fixed_X);

    //pos xyz fixed std (m) rover in to diffrent parameters#
    POS_XYZ_Fixed_Std = dict['pos xyz fixed std (m) rover'];
    POS_XYZ_Fixed_Std_Split = POS_XYZ_Fixed_Std.split(",");
    POS_XYZ_Fixed_Std_X = POS_XYZ_Fixed_Std_Split[0];
    POS_XYZ_Fixed_Std_Y = POS_XYZ_Fixed_Std_Split[1];
    POS_XYZ_Fixed_Std_Z = POS_XYZ_Fixed_Std_Split[2];
    //console.log(POS_XYZ_Fixed_Std_X);

    //sdu sdn sde
    Solution = dict['solution status'];
    if (Solution == '-') {
	SDN = "undefined"
	SDE = "undefined"
        SDU = "undefined"
       } else if (Solution == 'float') {
	SDN = POS_XYZ_Float_Std_Y
	SDE = POS_XYZ_Float_Std_X
        SDU = POS_XYZ_Float_Std_Z
       } else if (Solution == 'fix') {
	SDN = POS_XYZ_Fixed_Std_Y
	SDE = POS_XYZ_Fixed_Std_X
        SDU = POS_XYZ_Fixed_Std_Z
       } else {
	SDN = "no signal"
	SDE = "no signal"
        SDU = "no signal"
       };

    //pos xyz (m) base in to diffrent parameters#
    POS_XYZ_Base = dict['pos xyz (m) base'];
    POS_XYZ_Base_Split = POS_XYZ_Base.split(",");
    POS_XYZ_Base_X = POS_XYZ_Base_Split[0];
    POS_XYZ_Base_Y = POS_XYZ_Base_Split[1];
    POS_XYZ_Base_Z = POS_XYZ_Base_Split[2];
    //console.log(POS_XYZ_Base_X);

    //pos llh (deg,m) base in to diffrent parameters#
    POS_LLH_Base = dict['pos llh (deg,m) base'];
    POS_LLH_Base_Split = POS_LLH_Base.split(",");
    POS_LLH_Base_Latitude = POS_LLH_Base_Split[0];
    POS_LLH_Base_Longitude = POS_LLH_Base_Split[1];
    POS_LLH_Base_Height = POS_LLH_Base_Split[2];
    //console.log(POS_LLH_Base_Latitude);

    //ant delta rover e/n/u#
    ANT_Delta_Rover = dict['ant delta rover'];
    ANT_Delta_Rover_Split = ANT_Delta_Rover.split(" ");
    ANT_Delta_Rover_E = ANT_Delta_Rover_Split[0];
    ANT_Delta_Rover_N = ANT_Delta_Rover_Split[1];
    ANT_Delta_Rover_U = ANT_Delta_Rover_Split[2];
    //console.log(ANT_Delta_Rover_E);

    //ant delta base e/n/u#f
    ANT_Delta_Base = dict['ant delta base'];
    ANT_Delta_Base_Split = ANT_Delta_Base.split(" ");
    ANT_Delta_Base_E = ANT_Delta_Base_Split[0];
    ANT_Delta_Base_N = ANT_Delta_Base_Split[1];
    ANT_Delta_Base_U = ANT_Delta_Base_Split[2];
    //console.log(ANT_Delta_Base_E);

    //vel enu (m/s) base #
    VEL_Enu_Base = dict['vel enu (m/s) base'];
    VEL_Enu_Base_Split = VEL_Enu_Base.split(",");
    VEL_Enu_Base_E = VEL_Enu_Base_Split[0];
    VEL_Enu_Base_N = VEL_Enu_Base_Split[1];
    VEL_Enu_Base_U = VEL_Enu_Base_Split[2];
    //console.log(VEL_Enu_Base_E);

    //time of receiver clock rover ####TO FIX####
    time_clock_rover = Date(dict['time of receiver clock rover']);
    //console.log(time_clock_rover);
    //var year = Date(getFullyear(time_clock_rover));
    //console.log(year);

    //satellites
    SATELLITES_BASE = dict['# of satellites base'];
    SATELLITES_ROVER = dict['# of satellites rover'];
    SATELLITES_VALID = dict['# of valid satellites'];

    //Baseline lenght
    BASELINE_FLOAT = dict['baseline length float (m)'];
    BASELINE_FIX =  dict['baseline length fixed (m)'];

    if (Solution == '-') {
	BASELINE = "undefined"
       } else if (Solution == 'float') {
	BASELINE = BASELINE_FLOAT
       } else if (Solution == 'fix') {
	BASELINE = BASELINE_FIX
       } else {
	BASELINE = "no signal"
       };

  } 
});

connection.on('connect', function() {
  connection.send('status 1',  {
    ors: '\r\n',
    waitfor: '\n'
  }, function(err, response) {
    if (err) return err;
  })
});
 
connection.on('timeout', function() {
  console.log('socket timeout!')
  connection.end()
  connection.connect(params);
  console.log('connection ON')
});
 
connection.on('close', function() {
  console.log('connection closed')
  connection.connect(params);
  console.log('connection ON')
});
 
connection.connect(params);

server.listen(4600);

