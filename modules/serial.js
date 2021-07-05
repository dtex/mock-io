class Serial {
	
	constructor(opts) {
    this.transmit = opts.transmit;
		this.receive = opts.receive;
		this.onReadable = opts.onReadable;
		this.baud = opts.baud;
		this.format = opts.format || "buffer";
		this.RXqueue = [];
		this.TXqueue = [];
	}
  
  read(bufferOrNumber) {
		let result;
		
		// If we have no data in the queue, return undefined
		if (this.RXqueue.length === 0) {
			return result;
		}
		
		if (this.format === "buffer") {
			
			let length, result;
		
			// Determine how long this read should be
			if (typeof bufferOrNumber === "number") {
				length = bufferOrNumber;
			} else {
				length = bufferOrNumber.byteLength;
			}
		
			if (length > this.RXqueue.length) {
				length = this.RXqueue.length;
			}
		
			// Read <length> bytes from the RXqueue
			result = this.RXqueue.slice(0, length);
			this.RXqueue = this.RXqueue.slice(length);

			// Convert to an arrayBuffer and return
			return new Uint8Array(result).buffer;

		} else {
			return this.RXqueue.shift();
		}
	}
  
  write(message) {
		let bufView = new Uint8Array(message);
		this.TXqueue = this.TXqueue.concat(bufView);
	}

	testReceive(message) {
		let messageArray = new Uint8Array(str2ab(message));
		this.RXqueue = this.RXqueue.concat(...messageArray);
		this.onReadable(message.length);
	}
	
}

function str2ab(str) {
  let buf = new ArrayBuffer(str.length);
  let bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}


export default Serial;