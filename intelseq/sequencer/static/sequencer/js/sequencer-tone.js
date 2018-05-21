function Sequencer(sequencerLength = 16, numberOfVoices = 4, MIDIChannels, notes, velocitySequence, bpm, midiOutPort) {
    //constructor variables

    //numberOfVoices = polyphony = grid rows
    this.numberOfVoices = numberOfVoices;
    this.MIDIChannels = MIDIChannels;

    this.bpm;
    this.timer;
    this.stepLength;
    this.setBPM(bpm);
    //using WebMidi.js 2.0.0
    console.log("selected out: " + midiOutPort);
    if(midiOutPort != undefined && midiOutPort != null){
        this.midiOutPort = output;
    }

    this.feedbackDelay = new Tone.PingPongDelay({
        "delayTime": "8n",
        "feedback": 0.3,
        "wet": 0.0
    }).toMaster();

    this.voiceTemplate = new Tone.MembraneSynth();

    this.polySynth = new Tone.PolySynth(this.numberOfVoices, Tone.MembraneSynth, {
        "pitchDecay" : 0.002,
        "octaves" : 8,
        "envelope" : {
            "attack" : 0.0006,
            "decay" : 0.5,
            "sustain" : 0
        }
    }).connect(this.feedbackDelay);

    this.sequencerLength = sequencerLength;

    this.sequenceMatrix = [];

    for (var i = 0; i < this.numberOfVoices; i++) {
        this.sequenceMatrix[i] = [];
        for (var j = 0; j < this.sequencerLength; j++) {
            this.sequenceMatrix[i][j] = 0;
        }
    }

    this.velocitySequence = velocitySequence;

    this.notes = notes;

    this.event;

    //internal operation data
    this.currentStep = 0;
    this.stepsElapsed = 0;
    this.paused = true;
}

Sequencer.prototype.setMIDIOutput = function(output){
    try {
        this.midiOutPort = output;
        
    } catch(err) {
        console.log("setting midi output failed");
        return;
    }
    console.log("The MIDI output of a sequencer instance has succesfully been changed into: " + output.name);
}
Sequencer.prototype.getMIDIOutput = function(){
    return this.midiOutPort;
}

Sequencer.prototype.play = function () {
    if (this.paused) {

        this.paused = false;
        //play next step instantly
        this.triggerStep(this.currentStep);
        this.advanceStep();
        console.log("starting to play");

        var currentSequencer = this;

        //console.log(this);
        //start an interval
        this.timer = setTimeout(function(){
            currentSequencer.callBack(currentSequencer);
        }, this.stepLength);
    } else {
        //already playing
    }
}

Sequencer.prototype.callBack = function(currentSequencer) {
    currentSequencer.triggerStep(currentSequencer.currentStep);
    console.log("callback calls event");
    currentSequencer.advanceStep();
    currentSequencer.timer = setTimeout(function(){
        currentSequencer.callBack(currentSequencer);
    }, currentSequencer.stepLength);
}


Sequencer.prototype.resume = function() {
    this.paused = false;
}

Sequencer.prototype.stop = function () {
    this.paused = true;
    this.currentStep = 0;
    this.stepsElapsed = 0;
    clearTimeout(this.timer);
    console.log("interval stopped");
}

Sequencer.prototype.pause = function () {
    this.paused = true;
    clearTimeout(this.timer);
}

Sequencer.prototype.adjustStep = function (step, note, vel) {
    this.noteSeq[step] = note;
    this.velocitySequence[step] = vel;
}

Sequencer.prototype.triggerStep = function (step) {
    //console.log('triggering step ' + step + ". voices: "+this.numberOfVoices);

    var notesToTrigger = [];

    for (var i = 0; i < this.numberOfVoices; i++) {
        //  console.log("checking for voice " + i +"; result is " + this.sequenceMatrix[i][step] == 1);
        if (this.sequenceMatrix[i][step] == "1" || this.sequenceMatrix[i][step] == 1) {
            //notesToTrigger.push(notes[i]);
            this.midiOutPort.playNote(this.notes[i], this.MIDIChannels[i], {duration:250, velocity:this.velocitySequence[step]});
            console.log("playing note " + this.notes[i]);
        }
    }

    this.event = new CustomEvent('stepChange', { detail: step});
    document.getElementById("music-app-sequencer").dispatchEvent(this.event);

    this.polySynth.triggerAttackRelease(notesToTrigger, "16n", undefined, 0.1 + Number(this.velocitySequence[step])/127);

    //https://www.npmjs.com/package/webmidi
    //this.midiOutPort.playNote(notesToTrigger, this.channel, {duration:250, velocity:this.velocitySequence[step]});

}

Sequencer.prototype.advanceStep = function () {
    if (!this.paused) {
        this.stepsElapsed++;
        this.currentStep = this.stepsElapsed % this.sequencerLength;
    }
}

Sequencer.prototype.updateMatrixCell = function (newCellValue, rowID, columnID) {
    this.sequenceMatrix[rowID][columnID] = newCellValue;
}

Sequencer.prototype.updateMatrixRow = function (newMatrixRow, rowID) {
    this.sequenceMatrix[rowID] = newMatrixRow;
}

Sequencer.prototype.updateMatrix = function (newMatrix) {
    //expects multidimensional array

    for (var i = 0; i < this.numberOfVoices; i++) {
        this.sequenceMatrix[i] = [];
        for (var j = 0; j < this.sequencerLength; j++) {
            this.sequenceMatrix[i][j] = newMatrix[i][j];
        }
    }
}
Sequencer.prototype.updateVelocities = function (newVelSeq) {
    this.velocitySequence = newVelSeq;
}

Sequencer.prototype.getCurrentStep = function () {
    return this.currentStep;
}

Sequencer.prototype.setBPM = function (newBPM) {
    this.bpm = newBPM;
    this.stepLength = 60000 / this.bpm / 4;
    Tone.Transport.bpm.value = newBPM;
    console.log("setting bpm to " + newBPM);
}

Sequencer.prototype.setNote = function (note, rowID) {
    //expects string or int?
    this.notes[rowID] = note;
}
