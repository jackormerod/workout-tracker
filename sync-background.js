import {connectVerified} from './form-sync.js';
connectVerified((state,message)=>{const el=document.querySelector('#form-sync-state');if(el)el.textContent=state+(message?' · '+message:'')}).catch(()=>{/* Local workouts continue unchanged when configuration is absent. */});
