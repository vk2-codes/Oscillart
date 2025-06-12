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
}

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
    }

    let j = 0;
    repeat = setInterval(() => {
        if(j < noteslist.length) {
            frequency(parseInt(noteslist[j]));
            drawWave();
            j++
        } else {
            clearInterval(repeat)
        }
        
        



