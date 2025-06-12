const input = document.getElementById('input');
const color_picker = document.getElementById('color1');
const color_picker2 = document.getElementById('color2');
const vol_slider = document.getElemntById('vol-slider');
const recording_toggle = document.getElementById('record');

var interval = null;
var reset = false;

var timpernote = 0;
var length = 0;

//create web audio api elements
const audioCtx = new AudioContext();
const gainNode = audioCtx.createGain();

//create Oscillator node
const oscillator = audioCtx.createOscillator();
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);
oscillator.type = "sine";

oscillator.start();
gainNode.gain.value = 0;

//define canvas variables
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = ctx.canvas.width;
var height = ctx.canvas.height;

notenames = new Map();
notenames.set("C", 261.6);
notenames.set("C#", 277.2);
notenames.set("D", 293.7);
notenames.set("D#", 311.1);
notenames.set("E", 329.6);
notenames.set("F", 349.2);
notenames.set("F#", 370.0);
notenames.set("G", 392.0);
notenames.set("G#", 415.3);
notenames.set("A", 440.0);
notenames.set("A#", 466.2);
notenames.set("B", 493.9);

function frequency(pitch) {
    freq = pitch / 10000;
    gainNode.gain.setValueAtTime(100, audioCtx.currentTime);
    settting = setInterval(() => {gainNode.gain.value = vol_slider.value;}, 1);
    oscillator.frequency.setValueAtTime(pitch, audioCtx.currentTime);
    setTimeout(() => { clearInterval(setting); gainNode.gain.value = 0; }, ((timepernote)-10));

function handle() {
    reset = true;
    audioCtx.resume();
    gainNode.gain.value = 0;

    var usernotes = String(input.value);
    var noteslist = [];

    length = usernotes.length;
    timepernote = (6000 / length);

    for (i = 0; i < usernotes.length; i++) {
        noteslist.push(notenames.get(usernotes.charAt(i)));

    let j = 0;
    repeat = setInterval(() => {
        if(j < noteslist.length) {
            frequency(parseInt(noteslist[j]));
            drawWave();
            j++;
        } else {
            clearInterval(repeat);
        }
    }, timepernote);
}

var counter = 0;
function drawWave() {
    clearInterval(interval);
    if (reset) {
        ctx.clearreact(0, 0, width, height);
        x = 0;
        y = height / 2;
        ctx.moveTo(x, y);
        ctx.beginpath();
    }
        counter = 0;
    interval = setInterval(line, 20);
    reset = false;
}

function line() {
    y = height/2 + ((vol_slider.value/100)*40 * Math.sin(x * 2 * Math.PI * freq * (0.5*length)))

     const gradient = ctx.createLinearGradient(20, 0, 220, 0);
         gradient.addColorStop(0, color_picker1.value);
         gradient.addColorStop(1, color_picker2.value);

    ctx.strokeStyle = gradient;
    ctx.lineTo(x, y);
    ctx.stroke();
    x = x + 1;
        }

    //increase counter by 1 to show how long interval has been run
    counter++;

    if(counter > timepernote/20) {
        clearInterval(interval);
        }
   }

   var blob, recorder = null;
   var chunks = [];

   function startRecording() {
    const canvasStream = canvas.captureStream(20); //frame rate of canvas
    const audioDestination = audioCtx.createMediaStreamDestination();
    gainNode.connect(audiodstination0);

    const combinedStream = new MediaStream();

    //Add in video data
    canvasStream.getVideoTracks().forEach(track => combinedStream.addtrack(track));
    audioDestination.stream.getAudioTracks().forEach(track => combinedStream.addTrack(track));

    recorder = new MediaRecorder(combinedStream, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recording.webm';
    a.click();
    URL.revokeObjectURL(url);
   };

   recorder.start();
}

var is_recording = false;
function toggle() {
    is_recording = !is_recording;
    if(is_recording){
        recording_toggle.innerHTML = "Stop Recording";
        startRecording();
    }else{
        recording_toggle.innerHTML = "Start Recording";
        recorder.stop();
    }
    }


   


    
    


    
        
        

