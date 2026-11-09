// @ts-check

class connection {
    
    /**
    * @param   {signal} signal
    * @param   {function(...any): any} func
    */
    constructor(signal, func) {
        
        this._signal = signal;
        this._func = func;
		this._next = null;

        this.Connected = true;
    }


    // Disconnect the connection
    Disonnect = () => {
        
        if (!this.Connected) { return }
        
        this.Connected = false
        
        if (this._signal._Head === this){
            
            this._signal._Head = this._next
            
        } else {
             
            let prev = this._signal._Head
        
            while (prev && prev._next != this){
            
                prev = prev._next
            }
        
            if (prev){ prev._next = this._next }  
            
        }
    }
}

class signal {

    constructor() {
        
        this._Head = null;
    }


    get _Connections() {
        
        let conches = []
        
        let conch = this._Head
        
        while (conch){
            
            conches.push(conch)
            conch = conch._next
        }
        
        return conches
    }

    
    // Trigger all listeners        || Spam it
    Fire = (...data) => {
        
       let conch = this._Head // nasueous, my conch is 
       
       while (conch) {
           
           if (conch.Connected){
               
                conch._func(...data)  
            }
           conch = conch._next
        }
    }


    /** One time event
    *   @param {function(...any): any} func
    */ 
    Once = (func) => {
        
        /**
         * @type {connection}
         */
        let connection
        let complete = false


        // @ts-ignore
        connection = this.Connect((...data) => {
            
            if (complete){ return }

            complete = true
            connection.Disonnect()
            func(...data)
            
        })
    }


    /** Listen until disconnected    || The root of everything
    *   @param {function(...any): any} func
    */ 
    Connect = (func) => {
        
        /**
        * @type {connection}
        */
        let conch = new connection(this, func) // this, func
        
        if (this._Head) { conch._next = this._Head } 
        
        this._Head = conch
        
        return conch
    }

    // Remove all listeners         || maybe useful, most of the time just a neat bonus
    DisconnectAll = () => {

        let conch = this._Head
        
        while (conch){
            
            conch.Connected = false
            conch = conch._next
        }
        
        this._Head = null
    }
}


export { signal }


