/**
 * 
 */
	
function SynthVoice() {
    //create oscillator, gain and filter
    //set oscillator to A4
    //start but don't play
    this.voice = new Tone.Synth();
    this.note = "A4";
    this.filter = new Tone.Filter(300, "lowpass").toMaster();

    this.bpm = 

    this.voice.connect(this.filter);
}

SynthVoice.prototype.setNote = function(note){
    this.note = note;
}

SynthVoice.prototype.trigger = function(vel) {
    synth.triggerAttackRelease(this.note, '16n');
}

SynthVoice.prototype.setFilterFreq = function(newFreq){
    this.filter.frequency = newFreq;
}   