(function() {
  'use strict';

  console.log('App is running');

  let midiAccess = null;
  window.navigator.requestMIDIAccess().then(onMidiAccessSuccess, onMidiAccessFailure);

  // hack for heroku deploy!
  const socketUrl = location.origin.replace('http', 'ws').replace('https', 'ws') + '/socket';

  const client = new BinaryClient(location.origin.replace('http', 'ws').replace('https', 'ws') + '/socket');
  let MIDIStream = null;

  function onMidiAccessSuccess(access) {
    midiAccess = access;

    var inputs = midiAccess.inputs.values();

    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
       // each time there is a midi message call the onMIDIMessage function
       input.value.onmidimessage = handleMidiMessage;
   }
  }

  function onMidiAccessFailure(error) {
    console.log('Oops. Something were wrong with requestMIDIAccess', error.code);
  }

  function handleMidiMessage(e) {
    // debugger;
    // 3 bytes: status, data1, data2
    if (!MIDIStream || e.data[0] !== 0x90) return;

    const midiMessage = {
      status: e.data[0],
      data1: e.data[1],
      data2: e.data[2]
    };

    // console.log(e);
    console.time('send');
    console.log(midiMessage);
    MIDIStream.write(e.data);
  }

  client.on('open', () => {
    MIDIStream = client.createStream();
    MIDIStream.on('data', (data) => {
      console.log(`receive audio data ${data}`);
    });

    MIDIStream.on('end', (data) => {
      console.log(`end ${data}`);
    });
  })
 })();
