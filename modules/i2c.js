class I2C {
	
	static Input = 0x00;
	static Output = 0x01;

  constructor(opts) {
    this.address = opts.address;
		this.onReadable = opts.onReadable;
	}
  
  read() {
		return this.value;
	}
  
  write(value) {
		if (value != this.value) {
			this.value = value;
			if (this.mode === this.Input) {
				this.onReadable();
			}
		}
	}
	
}

export default I2C;