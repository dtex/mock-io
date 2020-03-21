class Digital {
	
	static Input = 0x00;
	static Output = 0x01;

  constructor(opts) {
    this.pin = opts.pin;
		this.edge = (undefined === opts.edge) ? 0 : opts.edge;
		this.mode = opts.mode || 0x00;
		this.onReadable = opts.onReadable;
		this.target = opts.target;
		this.value = 0x00;
		this.Input = 0x00;
		this.Output = 0x01;
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
	
	exTrigger(event) {
		this.emit(event);
	}
  
}

export default Digital;