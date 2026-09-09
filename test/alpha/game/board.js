// Leaderboard: Supabase REST (public anon key) with a local fallback when offline / not deployed.
// Reading is a plain select. Writing goes through submit_score, which recomputes the
// score from the per-round breakdown - the client's own total is never trusted.
const BOARD={
url:'https://rdzpmomnzacmfortgqad.supabase.co/rest/v1/apple_scores',
rpc:'https://rdzpmomnzacmfortgqad.supabase.co/rest/v1/rpc/submit_score',
key:'sb_publishable_szeZ5EuwQUZQPV-Xjzyp7Q_uXnL_OQe',
h(){return{apikey:this.key,Authorization:'Bearer '+this.key,'Content-Type':'application/json'}},
local(){try{return JSON.parse(localStorage.getItem('smf_apple_board')||'[]')}catch(e){return[]}},
async list(){
try{const r=await fetch(this.url+'?select=name,score,hero,platform,created_at&order=score.desc&limit=500',{headers:this.h()});if(!r.ok)throw 0;const d=await r.json();return{rows:d,remote:true}}
catch(e){return{rows:this.local().sort((a,b)=>b.score-a.score),remote:false}}},
// Three outcomes, and the caller must be able to tell them apart:
//   {ok:true, remote:true,  score}          the server accepted and this is ITS total
//   {ok:false,remote:true,  reason}         the server refused - nothing was written anywhere
//   {ok:true, remote:false, score}          no server; kept in this browser only
// `fallback` is the engine's own total, used only when there is no server to ask.
async save(name,hero,hard,platform,rounds,fallback){
const body={p_name:String(name).slice(0,24),p_hero:hero,p_hard:!!hard,p_platform:platform,p_rounds:rounds||[]};
let r;
try{r=await fetch(this.rpc,{method:'POST',headers:this.h(),body:JSON.stringify(body)})}
catch(e){return this.keepLocal(body,fallback)}
if(!r.ok)return this.keepLocal(body,fallback);
let d=null;try{d=await r.json()}catch(e){}
// A reachable server that says no is a refusal, not an outage: do not fall back to
// localStorage and do not tell the player it was saved.
if(!d||d.ok!==true)return{ok:false,remote:true,reason:(d&&d.reason)||'unknown'};
return{ok:true,remote:true,score:d.score,id:d.id};},
// The server could not be reached at all. Keep the row here so the screen still works,
// scored by the engine because there is nobody else to score it.
keepLocal(body,score){const row={name:body.p_name,score:Math.round(score||0),hero:body.p_hero+(body.p_hard?'-hard':''),platform:body.p_platform,created_at:new Date().toISOString()};
const l=this.local();l.push(row);try{localStorage.setItem('smf_apple_board',JSON.stringify(l.slice(-500)))}catch(_){}
return{ok:true,remote:false,score:row.score}},
rank(rows,score){let n=0;for(const r of rows)if(r.score>score)n++;return n+1}
};
window.BOARD=BOARD;
