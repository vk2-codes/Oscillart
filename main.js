const input = document.getElementById('input');
// create web audio api elements
const audioCtx = new AudioContext();
const gainNode = audioCtx.createGain();

// create oscillator node
const oscillator = audioCtx.createOscillator();
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);
oscillator.type = "sine"; 
oscillator.start();
gainNode.gain.value = 0;
function frequency(pitch) {
    gainNode.gain.setValueAtTime(100, audioCtx.currentTime);
oscillator.frequency.setValueAtTime(pitch, audioCtx.currentTime);
gainNode.gain.setValueAtTime(0, audioCtx.currentTime + 1);
  
}

function handle() {
    frequency (input.value);

}