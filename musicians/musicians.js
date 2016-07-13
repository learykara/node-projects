class Musician {
  constructor (sounds) {
    this.sounds = sounds;
  }

  solo(length) {
    const soundArr = Array(length).fill('').map(
      (item, idx) => this.sounds[idx % this.sounds.length]);
    console.log(soundArr.join(' '));
  }
}

class Guitarist extends Musician {
  constructor() {
    super(['Twang', 'Thrumb', 'Bling']);
    this.strings = 6;
  }

  tune() {
    console.log('Be with you in a moment');
    console.log('Twoning sproing splang');
  }
}

class Bassist extends Musician {
  constructor() {
    super(['Boink', 'Bow', 'Boom']);
    this.strings = 4;
  }
}


module.exports = { Bassist, Guitarist, Musician }
