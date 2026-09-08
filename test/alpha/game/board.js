// Leaderboard: Supabase REST (public anon key) with a local fallback when offline / not deployed.
const BOARD={
url:'https://rdzpmomnzacmfortgqad.supabase.co/rest/v1/apple_scores',
key:'sb_publishable_szeZ5EuwQUZQPV-Xjzyp7Q_uXnL_OQe',
h(){return{apikey:this.key,Authorization:'Bearer '+this.key,'Content-Type':'application/json'}},
local(){try{return JSON.parse(localStorage.getItem('smf_apple_board')||'[]')}catch(e){return[]}},
async list(){
try{const r=await fetch(this.url+'?select=name,score,hero,created_at&order=score.desc&limit=500',{headers:this.h()});if(!r.ok)throw 0;const d=await r.json();return{rows:d,remote:true}}
catch(e){return{rows:this.local().sort((a,b)=>b.score-a.score),remote:false}}},
async save(name,score,hero){
const row={name:name.slice(0,24),score:Math.round(score),hero};
try{const r=await fetch(this.url,{method:'POST',headers:{...this.h(),Prefer:'return=minimal'},body:JSON.stringify(row)});if(!r.ok)throw 0;return true}
catch(e){const l=this.local();l.push({...row,created_at:new Date().toISOString()});try{localStorage.setItem('smf_apple_board',JSON.stringify(l.slice(-500)))}catch(_){}return false}},
rank(rows,score){let n=0;for(const r of rows)if(r.score>score)n++;return n+1}
};
window.BOARD=BOARD;
