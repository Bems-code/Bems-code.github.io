// @ts-check
import { signal } from "./Signal.js";

export const Network = {

    //------- DATA EVENTS --------\\
    'collisionEvent'    : new signal,
    'purchaseRequest'   : new signal,
    'dataRequest'       : new signal,

    //------- UI EVENTS --------\\
    'updateDisplay'     : new signal
    
}