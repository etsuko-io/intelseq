/**
 * Angular app containing the sequence data:
 * - note per row
 * - accents per column
 * - velocity range per sequence
 * - matrix data
 */
(function(){
	var noteValues = [48,60,63,67];
	var accents = [1,0,0,1,0,0,1,0];
	var veloLo = 40;
	var veloHi = 80;
	
	var seqMatrix = [[0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,]];
	
	var app = angular.module("seqData", []);
	app.controller('SeqDataController', function(){
		this.noteValues = noteValues;
		this.accents = accents;
		this.veloLo = veloLo;
		this.veloHi = veloHi;
		this.seqMatrix = seqMatrix;
	});
})();