// Want to customize things ?
// http://www.airtightinteractive.com/demos/js/uberviz/audioanalysis/
import Emitter from './Emitter';
class Sound extends Emitter {

  constructor() {
    super()

    this._context = new AudioContext()
    this.player = document.createElement('audio');
    this.player.id = "audioSource";


    this._bufferSize = 512 // change this value for more or less data

    this._analyser = this._context.createAnalyser()
    this._analyser.fftSize = this._bufferSize
    this._binCount = this._analyser.frequencyBinCount // this._bufferSize / 2

    this._dataFreqArray = new Uint8Array( this._binCount )
    this._dataTimeArray = new Uint8Array( this._binCount )

    this._binds = {}
    this._binds.onLoad = this._onLoad.bind( this )
  }

  load( url ) {
    this.url =url;
    this._request = new XMLHttpRequest()
    this._request.open( "GET", url, true )
    this._request.responseType = "arraybuffer"

    this._request.onload = this._binds.onLoad
    this._request.send()
  }

  _onLoad() {
    this._context.decodeAudioData( this._request.response, ( buffer ) => {
      // this._source = this._context.createBufferSource()
      this._source = this._context.createMediaElementSource(this.player)
      this._source.connect( this._analyser )
      this._source.buffer = buffer
      this._source.connect( this._context.destination )

      // this._source.start( 0 )

      console.log(this._source );
      this.player.setAttribute('src', this.url);
      this.player.play();
      // this.player.currentTime = 116;
      this.player.currentTime = 0;

      window.source = this._source;

      var gainNode = this._context.createGain();

      this._source.connect(gainNode);
      gainNode.connect(this._context.destination);
      // gainNode.gain.value = -1;


      this.emit( "start" )
    }, () => {
      console.log( "error" )
    } )
  }

  getData() {
    this._analyser.getByteFrequencyData( this._dataFreqArray )
    this._analyser.getByteTimeDomainData( this._dataTimeArray )

    let _fregAverage = 0;
    let _bassAverage = 0;
    let _acuteAverage = 0;

    // 174 because other values are always at 0
    for (var i = 0; i < 174; i++) {
      _fregAverage +=this._dataFreqArray[i];
      if(i<5 && i>0) {
        _bassAverage += this._dataFreqArray[i];
      }

      if(i> 174 - 5) {
        _acuteAverage += this._dataFreqArray[i];
      }

    }
    _fregAverage = _fregAverage/this._dataFreqArray.length;
    _bassAverage = _bassAverage/(255*4);
    _acuteAverage = _acuteAverage/(255*4);
    // console.log(_acuteAverage);



      // this._context.currentTime = 50;

    return {
      fregAverage:_fregAverage,
      bassAverage:_bassAverage,
      acuteAverage:_acuteAverage,
      freq: this._dataFreqArray, // from 0 - 256, no sound = 0
      time: this._dataTimeArray // from 0 -256, no sound = 128
    }
  }

}

module.exports = new Sound()
