/*
    SEQUENCER
        bpm:float
        seqLength:int
        velSeq:array

    Let it more be a 'trigger riot' than a 'metropolis'

*/
function Sequencer(synthVoice, seqLength, trigSeq, velSeq, bpm, containerID) {
    //constructur variables
    this.synthVoice = synthVoice;
    this.seqLength = seqLength;
    this.trigSeq = trigSeq;
    this.velSeq = velSeq;
    this.bpm = bpm;
    this.timer;
    this.event = new CustomEvent('stepChange', {detail: this.containerID });

    //internal operation data
    this.currentStep = 0;
    this.stepsElapsed = 0;
    this.paused = true;
    /*  60000/bpm = 1/4 note in milliseconds
        60000/bpm/2 = 1/8 note in milliseconds
        60000/bpm/4 = 1/16 note in milliseconds  */
    this.stepLength = 60000/bpm/4;



}

Sequencer.prototype.play = function(){
    if (this.paused) {
        this.paused = false;
        //play next step instantly
        this.triggerStep(this.currentStep);
        this.advanceStep();

        var currentSequencer = this;
        //console.log(this);
        //start an interval
        this.timer = setInterval(function () {
            currentSequencer.triggerStep(currentSequencer.currentStep);

            currentSequencer.advanceStep();
        }, this.stepLength);
    } else {
     //already playing   
    }
}

Sequencer.prototype.stop = function(){
    this.paused = true;
    this.currentStep = 0;
    this.stepsElapsed = 0;
    clearInterval(this.timer);
}

Sequencer.prototype.pause = function(){
    this.paused = true;
    clearInterval(this.timer);
}

Sequencer.prototype.adjustStep = function(step, note, vel) {
    this.noteSeq[step] = note;
    this.velSeq[step] = vel;
}

Sequencer.prototype.triggerStep = function(step){
    document.getElementById("music-app-sequencer").dispatchEvent(this.event);
    if(this.trigSeq[step] == 1) {
        this.synthVoice.trigger(this.velSeq[step]);
    }
}

Sequencer.prototype.advanceStep = function(){
    if(!this.paused){
        this.stepsElapsed++;
        this.currentStep = this.stepsElapsed % this.seqLength;
        console.log("currentStep:" + this.currentStep)
    }
}

Sequencer.prototype.updateTriggers = function(newTriggerSeq){
    this.trigSeq = newTriggerSeq;
    console.log("updating triggers");
}
Sequencer.prototype.updateVelocities = function(newVelSeq){
    this.velSeq = newVelSeq;
}

Sequencer.prototype.getCurrentStep = function(){
    return this.currentStep;
}
