class Analog {
	
	constructor(opts) {
    this.pin = opts.pin;
		this.target = opts.target;
		this.resolution = 10;
		this.value = 0x00;
	}
  
  read() {
		return this.value;
	}
  
}

export default Analog;