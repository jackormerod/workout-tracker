import {readForm,verifyBackup,connectVerified} from './form-sync.js';
const status=(state,message='')=>document.querySelector('#sync-state').textContent=state+(message?' · '+message:'');let cloud=null;
async function connect(){try{cloud=await connectVerified(status)}catch(error){status('Local','Firebase configuration missing or unavailable. '+error.message)}}
document.querySelector('#sync-export').onclick=()=>{try{const {raw}=readForm(),url=URL.createObjectURL(new Blob([raw],{type:'application/json'})),link=document.createElement('a');link.href=url;link.download='form-backup-'+new Date().toISOString().slice(0,10)+'.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}catch(error){status('Error',error.message)}};
document.querySelector('#verify-backup').onchange=async e=>{try{const count=await verifyBackup(await e.target.files[0].text());status('Local',`${count} workout records verified. Original history unchanged.`);await connect()}catch(error){status('Error',error.message)}};
document.querySelector('#sync-login').onsubmit=async e=>{e.preventDefault();if(!cloud)return status('Local','Verify a backup and install Firebase configuration first.');const f=new FormData(e.target);try{await cloud.signIn(f.get('email'),f.get('password'));e.target.reset()}catch(error){status('Error',error.code||error.message)}};
document.querySelector('#sync-signout').onclick=async()=>{if(cloud)await cloud.signOut();status('Local','Signed out. Local history retained.')};
connect();
