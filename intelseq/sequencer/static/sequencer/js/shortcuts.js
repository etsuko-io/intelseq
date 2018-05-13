document.addEventListener('keydown', function (event) {
    if (!event.metaKey && !event.ctrlKey) {
        if (event.code == 'KeyP') {
            debugLive('play');
            sequencer.play();
        }
        else if (event.code == 'KeyR') {
            debugLive('randomize');
			moveToNewSequence();
        }
        else if (event.code == 'KeyS') {
            debugLive('stop');
            sequencer.stop();
            updateActiveStepView(-1);
            updateActiveAccentView(-1);

        }
        else if (event.code == 'KeyC') {
            debugLive('clear');
            sequencer.stop();
            clearGrid();
            clearAccents();
        }
    }
});