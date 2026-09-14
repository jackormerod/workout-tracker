export const programme = [
 [['Barbell Back Squat',4,6,180],['Flat Barbell Bench Press',3,6,180],['EZ-Bar Curl',3,8,75],['Dumbbell Lateral Raise',3,10,60],['Cable Triceps Kickback',4,12,60,true],['45-Degree Leg-Press Calf Press',3,15,60]],
 [['Romanian Deadlift',3,8,180],['Incline Machine Chest Press',3,10,90],['Narrow-Grip Lat Pulldown',4,10,90],['Standing Barbell Overhead Press',3,6,120],['Preacher Curl',3,10,75],['Dumbbell Shrug',3,8,75]],
 [['Leg Press',4,10,120],['Decline Barbell Bench Press',3,8,120],['Dumbbell Overhead Triceps Extension',4,10,75],['Concentration Curl',3,10,60,true],['Rear-Delt Dumbbell Fly',3,10,60],['Standing Calf Raise',3,15,60]],
 [['Lying Leg Curl',3,12,75],['Wide-Grip Lat Pulldown',4,10,90],['Plate-Loaded Shoulder Press',3,10,90],['Pec Deck',3,12,75],['Incline Dumbbell Curl',3,10,75],['EZ-Bar Upright Row',3,8,75]]
].map((day,d)=>day.map(([name,sets,reps,rest,unilateral=false],e)=>({id:`${d}-${e}`,name,sets,reps,rest,unilateral})));
export const fresh=()=>({version:1,nextDay:0,activeDay:null,drafts:{},history:[],settings:{rest:{}},timer:null});
const displayNames={'0-5':'45* Calf Press','1-0':'Romanian Barbell Deadlift','1-1':'Incline Plate Loaded Chest Press','1-4':'Preacher Machine Curl'};
// Presentation only: stored names, stable IDs and old backup validation stay intact.
export const exerciseName=exercise=>displayNames[exercise.id]??exercise.name;
export const complete=set=>set.sides.every(s=>s.done);
export const count=session=>session.exercises.reduce((n,e)=>n+e.sets.filter(s=>!s.warmup&&complete(s)).length,0);
export const total=session=>session.exercises.reduce((n,e)=>n+e.sets.filter(s=>!s.warmup).length,0);
// Old backups did not track edits. Compare their uncompleted weights with the
// older session they were prefilled from, so untouched early finishes are skipped.
export function lastPerformance(state,id){
 const sessions=state.history.filter(s=>s.endedAt).slice().sort((a,b)=>Date.parse(b.endedAt)-Date.parse(a.endedAt));
 for(let i=0;i<sessions.length;i++){
  const workout=sessions[i],exercise=workout.exercises.find(e=>e.id===id);if(!exercise)continue;
  const older=sessions.slice(i+1).find(s=>s.exercises.some(e=>e.id===id))?.exercises.find(e=>e.id===id);
  const recorded=exercise.sets.some((set,si)=>set.sides.some((arm,ai)=>arm.done||arm.recorded===true||(arm.recorded===undefined&&(arm.reps!==exercise.reps||(arm.weight!==''&&(set.warmup||arm.weight!==(older?.sets[si]?.sides[ai]?.weight??'')))))));
  if(recorded)return {workout,exercise};
 }
 return null;
}
export const previous=(state,id)=>lastPerformance(state,id)?.exercise;
export function recommendation(ex){
 if(!ex)return 'retain';
 const sets=ex.sets.filter(s=>!s.warmup),prescribed=programme.flat().find(e=>e.id===ex.id)?.sets??sets.length;
 return sets.length===prescribed&&prescribed>0&&sets.every(s=>s.sides.length===(ex.unilateral?2:1)&&complete(s)&&s.sides.every(a=>a.weight!==''&&Number.isFinite(a.weight)&&a.reps>=ex.reps))?'increase':'retain';
}
export function recommendationText(ex){
 const sets=ex.sets.filter(s=>!s.warmup),n=programme.flat().find(e=>e.id===ex.id)?.sets??sets.length;
 const weights=sets.flatMap(s=>s.sides.map(a=>a.weight)).filter(w=>w!=='');
 let load='your previous set weights';
 if(weights.length&&weights.every(w=>w===weights[0]))load=`${weights[0]} kg`;
 else if(ex.unilateral){const sides=['Left','Right'].map((side,i)=>{const ws=sets.map(s=>s.sides[i]?.weight).filter(w=>w!==''&&w!==undefined);return ws.length&&ws.every(w=>w===ws[0])?`${side} ${ws[0]} kg`:null;});if(sides.every(Boolean))load=sides.join(' / ');}
 if(recommendation(ex)==='increase')return `Increase from ${load} by your smallest available increment — ${ex.unilateral?'both arms completed':'you completed'} all ${n} sets of ${ex.reps}.`;
 return `Keep ${load} — ${ex.unilateral?'both arms must complete':'complete'} all ${n} sets of ${ex.reps} before increasing.`;
}
export function makeSession(state,day){return {id:globalThis.crypto.randomUUID(),day,startedAt:new Date().toISOString(),exercises:programme[day].map(ex=>{const prev=previous(state,ex.id);return {...ex,sets:Array.from({length:ex.sets},(_,i)=>({warmup:false,sides:(ex.unilateral?['Left','Right']:['Both']).map((side,j)=>({side,weight:prev?.sets.filter(s=>!s.warmup)[i]?.sides[j]?.weight??'',reps:ex.reps,done:false,recorded:false}))}))};})};}
export function finish(state,day){const session=state.drafts[day];if(!session)throw Error('No workout started');const endedEarly=count(session)!==total(session);state.history.unshift({...session,endedAt:new Date().toISOString(),endedEarly});delete state.drafts[day];state.nextDay=(day+1)%4;state.activeDay=state.drafts[state.nextDay]?state.nextDay:Object.keys(state.drafts).map(Number)[0]??null;state.timer=null;return state.nextDay;}
export function remaining(timer,now=Date.now()){return !timer?0:timer.paused?timer.remaining:Math.max(0,Math.ceil((timer.endsAt-now)/1000));}
export function validate(data){
 const num=(v,min,max)=>typeof v==='number'&&Number.isFinite(v)&&v>=min&&v<=max;
 const date=v=>typeof v==='string'&&Number.isFinite(Date.parse(v));
 if(!data||data.version!==1||!num(data.nextDay,0,3)||!Number.isInteger(data.nextDay)||!Array.isArray(data.history)||!data.drafts||!data.settings?.rest)throw Error('This is not a valid Form backup.');
 const sessions=[...data.history,...Object.values(data.drafts)];
 for(const s of sessions){if(!Number.isInteger(s.day)||!programme[s.day]||!date(s.startedAt)||typeof s.id!=='string'||!Array.isArray(s.exercises)||s.exercises.length!==6)throw Error('Invalid workout in backup.');if(s.endedAt!==undefined&&(!date(s.endedAt)||typeof s.endedEarly!=='boolean'))throw Error('Invalid workout date.');
 s.exercises.forEach((e,i)=>{const spec=programme[s.day][i];if(e.id!==spec.id||e.name!==spec.name||e.reps!==spec.reps||!num(e.rest,15,900)||!Number.isInteger(e.rest)||e.unilateral!==spec.unilateral||!Array.isArray(e.sets)||e.sets.length>100||e.sets.filter(x=>!x.warmup).length!==spec.sets)throw Error('Invalid exercise in backup.');for(const set of e.sets){if(typeof set.warmup!=='boolean'||!Array.isArray(set.sides)||set.sides.length!==(spec.unilateral?2:1))throw Error('Invalid set.');set.sides.forEach((a,j)=>{if(a.side!==(spec.unilateral?['Left','Right'][j]:'Both')||!(a.weight===''||num(a.weight,0,2000))||!num(a.reps,0,1000)||!Number.isInteger(a.reps)||typeof a.done!=='boolean'||(a.recorded!==undefined&&typeof a.recorded!=='boolean')||(a.done&&a.weight===''))throw Error('Invalid weight or reps.');});}});}
 for(const [key,s] of Object.entries(data.drafts))if(String(s.day)!==key||s.endedAt)throw Error('Invalid saved session.');
 if(data.history.some(s=>!s.endedAt))throw Error('Missing finish date.');
 if(data.activeDay!==null&&(!Number.isInteger(data.activeDay)||!data.drafts[data.activeDay]))throw Error('Invalid active day.');
 for(const [id,v]of Object.entries(data.settings.rest))if(!programme.flat().some(e=>e.id===id)||!num(v,15,900)||!Number.isInteger(v))throw Error('Invalid rest duration.');
 if(data.timer!==null){const t=data.timer;if(!t||!num(t.duration,15,900)||!num(t.endsAt,0,1e15)||!num(t.remaining,0,86400)||typeof t.paused!=='boolean'||typeof t.label!=='string')throw Error('Invalid timer.');}
 return data;
}
