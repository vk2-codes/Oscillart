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

//creat Oscillator node