document.addEventListener('keydown', function (event) {
    if (!event.metaKey && !event.ctrlKey) {
        if (event.code == 'KeyP') {
            debugLive('play');
            sequencer.play();
            drumSequencer.play();
            bassSequencer.play();
        }
        else if (event.code == 'KeyR') {
            debugLive('randomize');
			moveToNewSequence();
        }
        else if (event.code == 'KeyS') {
            debugLive('stop');
            sequencer.stop();
            drumSequencer.stop();
            bassSequencer.stop();
            updateActiveStepView(-1);
            updateActiveAccentView(-1);

        }
        else if (event.code == 'KeyC') {
            debugLive('clear');
            sequencer.stop();
            drumSequencer.stop();
            clearGrid();
            clearAccents();
        }
    }
});