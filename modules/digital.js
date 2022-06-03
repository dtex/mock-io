class Digital {

  constructor(opts) {
    this.pin = opts.pin;
		this.edge = (undefined === opts.edge) ? 0 : opts.edge;
		this.mode = opts.mode || 0x00;
		if (this.mode === Digital.Input || this.mode === Digital.InputPullUp) {
			this.onReadable = opts.onReadable;
		}
		this.target = opts.target;
		this.value = 0x00;
	}
  
  read() {
		return this.value;
	}
  
  write(value) {
		if (value != this.value) {
			this.value = value;
			if ((this.mode === Digital.Input || this.mode === Digital.InputPullUp) && this.onReadable) {
				this.onReadable();
			}
		}
	}
	
	exTrigger(event) {
		this.emit(event);
	}
  
}

Digital.Input = 0x00;
Digital.InputPullUp = 0x01;
Digital.InputPullDown = 0x02;
Digital.InputPullUpDown = 0x03;

Digital.Output = 0x08;
Digital.OutputOpenDrain = 0x09;

export default Digital;