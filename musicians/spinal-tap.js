const { Bassist, Guitarist } = require('./musicians');

const nigel = new Guitarist();
nigel.tune();
nigel.solo(8);

const derek = new Bassist();
derek.solo(4);
