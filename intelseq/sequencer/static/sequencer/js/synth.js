/**
 * 
 */
//new context
var audio_context = window.AudioContext || window.webkitAudioContext;
var con = new audio_context(); //audio context = an empty max patch 
	
function SynthVoice() {
	this.osc = con.createOscillator(); //does it already start? nope, it just exists. like placing a max object
	this.osc.type = "sawtooth";
	
	this.gainNode = con.createGain();
	this.gainNode.gain.value = 0;

	this.filter = con.createBiquadFilter();
	this.filter.type = "lowpass";

	this.osc.frequency.value = noteFreqs["A4"];
	
	this.osc.connect(this.filter);
	this.filter.connect(this.gainNode); //con.destination = audio output //connect osc straight to output
	this.gainNode.connect(con.destination);
	
	this.osc.start();
}

SynthVoice.prototype.setNote = function(note){
	this.osc.frequency.setValueAtTime(noteFreqs[note], 0);
}

SynthVoice.prototype.trigger = function(vel) {
	//right now it's hard-coded. mod-matrix gives possibility to customise. 
	
	var velInt = parseInt(vel);	

	console.log("trigger with velocity " + velInt);
	console.log("and amplitude " + ((velInt/127) / 6));

	this.attackDecay(0.001, 0.1 + (velInt/127) / 6, 0.05 + (velInt/127) / 3, this.gainNode.gain);
	this.attackDecay(0.001, 0.1 + (velInt/127) / 6, 100+(Math.pow(velInt, 1.8)), this.filter.frequency);
}

SynthVoice.prototype.attackDecay = function(atk, dcy, value, dest){
	dest.setValueAtTime(0,con.currentTime);
	dest.linearRampToValueAtTime(value, con.currentTime+atk);
	dest.linearRampToValueAtTime(0, con.currentTime + atk+dcy);
}

SynthVoice.prototype.setFilterFreq = function(newFreq){
	this.filter.frequency = newFreq;
	//
}