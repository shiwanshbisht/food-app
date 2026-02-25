import buffer from 'buffer';

if (typeof buffer.SlowBuffer === 'undefined') {
  buffer.SlowBuffer = buffer.Buffer;
}

if (typeof global.SlowBuffer === 'undefined') {
  global.SlowBuffer = buffer.Buffer;
}
