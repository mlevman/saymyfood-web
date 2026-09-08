// Line-art renderer v2. Logical 960x540; y is the feet line.
const ART={
mint:'#8FDCC0',warm:'#F0913E',hot:'#F2717A',bone:'#E3EAE6',dim:'rgba(227,234,230,.35)',red:'#E23E24',yellow:'#E0C93B',green:'#2FB56A',ink:'#0E1210',
stroke(x,c,w){x.strokeStyle=c;x.lineWidth=w||2.6;x.lineCap='round';x.lineJoin='round'},
sky(x,W,H,gy){const g=x.createLinearGradient(0,0,0,gy);g.addColorStop(0,'rgba(143,220,192,.05)');g.addColorStop(1,'rgba(143,220,192,0)');x.fillStyle=g;x.fillRect(0,0,W,gy);
x.fillStyle='rgba(227,234,230,.5)';const st=[[80,60],[210,120],[330,40],[420,150],[560,70],[690,130],[780,50],[900,110],[150,200],[840,190]];for(const [sx,sy] of st){x.beginPath();x.arc(sx,sy,1,0,7);x.fill()}
// distant hills
this.stroke(x,'rgba(227,234,230,.16)',1.6);x.beginPath();x.moveTo(0,gy-40);x.bezierCurveTo(120,gy-90,260,gy-70,380,gy-52);x.bezierCurveTo(520,gy-30,620,gy-110,760,gy-66);x.bezierCurveTo(850,gy-40,910,gy-60,W,gy-48);x.stroke()},
ground(x,W,gy){this.stroke(x,this.bone,2);x.beginPath();x.moveTo(0,gy);x.lineTo(W,gy);x.stroke();
this.stroke(x,'rgba(227,234,230,.22)',1.4);for(let i=0;i<W;i+=29){const h=4+(i*7%9);x.beginPath();x.moveTo(i+6,gy);x.lineTo(i+9,gy-h);x.moveTo(i+13,gy);x.lineTo(i+14,gy-h*.7);x.stroke()}
x.fillStyle='rgba(227,234,230,.06)';x.fillRect(0,gy,W,70)},
fence(x,cx,gy,h){this.stroke(x,this.bone,2.8);const top=gy-h;
for(let i=-2;i<=2;i++){const px=cx+i*14,tp=top+(Math.abs(i)===2?10:Math.abs(i)===1?4:0);x.beginPath();x.moveTo(px,gy);x.lineTo(px,tp+3);x.stroke();x.beginPath();x.moveTo(px-5,tp+8);x.lineTo(px,tp-2);x.lineTo(px+5,tp+8);x.stroke()}
x.beginPath();x.moveTo(cx-36,top+30);x.lineTo(cx+36,top+30);x.moveTo(cx-36,gy-26);x.lineTo(cx+36,gy-26);x.stroke();
x.fillStyle='rgba(227,234,230,.06)';x.beginPath();x.moveTo(cx-36,top+30);x.lineTo(cx+36,top+30);x.lineTo(cx+36,gy);x.lineTo(cx-36,gy);x.fill()},
tree(x,tx,gy,apples,glow){x.save();
// trunk with a little taper
this.stroke(x,this.bone,3);x.beginPath();x.moveTo(tx-9,gy);x.bezierCurveTo(tx-6,gy-50,tx-4,gy-90,tx-1,gy-120);x.moveTo(tx+9,gy);x.bezierCurveTo(tx+7,gy-50,tx+4,gy-90,tx+1,gy-120);x.stroke();
x.beginPath();x.moveTo(tx-1,gy-84);x.bezierCurveTo(tx-14,gy-100,tx-24,gy-108,tx-34,gy-124);x.moveTo(tx+1,gy-96);x.bezierCurveTo(tx+14,gy-110,tx+24,gy-118,tx+36,gy-134);x.stroke();
// canopy: three overlapping lobes, soft fill
const c=glow?this.mint:'rgba(227,234,230,.6)';x.fillStyle=glow?'rgba(143,220,192,.12)':'rgba(143,220,192,.055)';
// one cloud-like outline made of arcs
const cy=gy-150,pts=[[-78,8],[-64,-30],[-30,-52],[6,-58],[42,-48],[70,-24],[78,10],[54,32],[14,40],[-30,36],[-64,28]];
x.beginPath();for(let i=0;i<pts.length;i++){const p=pts[i],q=pts[(i+1)%pts.length],mx=tx+(p[0]+q[0])/2,my=cy+(p[1]+q[1])/2,nx=-(q[1]-p[1]),ny=(q[0]-p[0]),L=Math.hypot(nx,ny)||1;const bx=mx-nx/L*14,by=my-ny/L*14;if(i===0)x.moveTo(tx+p[0],cy+p[1]);x.quadraticCurveTo(bx,by,tx+q[0],cy+q[1])}x.closePath();x.fill();this.stroke(x,c,2.4);x.stroke();
// leaves hint
this.stroke(x,c,1.5);for(const [lx,ly] of [[-40,-176],[20,-190],[52,-160],[-14,-160],[-56,-140],[30,-134]]){x.beginPath();x.moveTo(tx+lx,gy+ly);x.quadraticCurveTo(tx+lx+7,gy+ly-9,tx+lx+14,gy+ly-1);x.stroke()}
const spots=[[-44,-166],[-8,-184],[30,-168],[52,-142],[-34,-136],[12,-150],[-60,-146],[40,-186]];
for(let i=0;i<8;i++){if(i<apples)this.apple(x,tx+spots[i][0],gy+spots[i][1],7,0)}
x.restore()},
apple(x,ax,ay,r,rot){x.save();x.translate(ax,ay);x.rotate(rot||0);
// apple: green-yellow shoulder blushing to red — wide top, dimple, two-lobed bottom
const g=x.createRadialGradient(-r*.45,-r*.4,r*.05,r*.15,r*.15,r*1.3);g.addColorStop(0,'#C9DC72');g.addColorStop(.22,'#E0C93B');g.addColorStop(.48,this.warm);g.addColorStop(.78,this.red);g.addColorStop(1,'#A32A18');
x.fillStyle=g;x.beginPath();
x.moveTo(0,-r*.62);x.bezierCurveTo(-r*.35,-r*1.05,-r*1.2,-r*.85,-r*1.08,-r*.05);x.bezierCurveTo(-r*1.0,r*.6,-r*.5,r*1.02,-r*.12,r*.86);x.quadraticCurveTo(0,r*.76,r*.12,r*.86);x.bezierCurveTo(r*.5,r*1.02,r*1.0,r*.6,r*1.08,-r*.05);x.bezierCurveTo(r*1.2,-r*.85,r*.35,-r*1.05,0,-r*.62);x.closePath();x.fill();
if(r>6){x.fillStyle='rgba(255,255,255,.26)';x.beginPath();x.ellipse(-r*.5,-r*.38,r*.18,r*.4,-.35,0,7);x.fill();x.fillStyle='rgba(47,181,106,.22)';x.beginPath();x.ellipse(-r*.25,-r*.55,r*.5,r*.3,-.2,0,7);x.fill();x.fillStyle='rgba(158,36,19,.35)';x.beginPath();x.ellipse(r*.45,r*.35,r*.5,r*.45,.4,0,7);x.fill()}
this.stroke(x,'#4A2E1C',Math.max(1.4,r*.2));x.beginPath();x.moveTo(0,-r*.62);x.quadraticCurveTo(r*.02,-r*1.0,r*.14,-r*1.28);x.stroke();
x.fillStyle=this.green;x.beginPath();x.ellipse(r*.48,-r*1.05,r*.5,r*.2,-.6,0,7);x.fill();this.stroke(x,'rgba(14,18,16,.35)',1);x.beginPath();x.moveTo(r*.14,-r*1.1);x.lineTo(r*.82,-r*1.42);x.stroke();
x.restore()},
_legs(x,px,gy,s,col,pants){const sw=Math.sin(s.walk)*10*(s.moving?1:0);
if(pants){x.beginPath();x.moveTo(px-9,gy-40);x.lineTo(px-9+sw*.6,gy-4);x.lineTo(px-1+sw*.6,gy-4);x.lineTo(px-2,gy-40);x.moveTo(px+2,gy-40);x.lineTo(px+1-sw*.6,gy-4);x.lineTo(px+9-sw*.6,gy-4);x.lineTo(px+9,gy-40);x.stroke()}
else{x.beginPath();x.moveTo(px-5,gy-30);x.lineTo(px-5+sw,gy-4);x.moveTo(px+5,gy-30);x.lineTo(px+5-sw,gy-4);x.stroke()}
// shoes
x.fillStyle=col;x.beginPath();x.ellipse(px-5+sw*.6,gy-2,8,3,0,0,7);x.ellipse(px+5-sw*.6,gy-2,8,3,0,0,7);x.fill()},
_arms(x,px,gy,s){const f=s.face;
if(s.gather){x.beginPath();x.moveTo(px,gy-66);x.lineTo(px+f*16,gy-86);x.lineTo(px+f*26,gy-106+Math.sin(s.walk*3)*5);x.stroke();x.beginPath();x.moveTo(px,gy-66);x.lineTo(px-f*10,gy-50);x.stroke();return}
if(s.charge>=0){const a=-1.9+s.charge*1.5;x.beginPath();x.moveTo(px,gy-66);x.lineTo(px-f*10,gy-78);x.lineTo(px-f*10+Math.cos(a)*f*18,gy-78+Math.sin(a)*18);x.stroke();
this.apple(x,px-f*10+Math.cos(a)*f*19,gy-80+Math.sin(a)*19,6.5,0);
x.beginPath();x.moveTo(px,gy-66);x.lineTo(px+f*16,gy-60);x.stroke();return}
const sw=Math.sin(s.walk)*8*(s.moving?1:0);x.beginPath();x.moveTo(px,gy-66);x.lineTo(px-f*(8+sw),gy-44);x.moveTo(px,gy-66);x.lineTo(px+f*(8-sw),gy-46);x.stroke()},
_head(x,px,gy,s,skin,ac){x.fillStyle=skin;x.beginPath();x.arc(px,gy-84,11,0,7);x.fill();x.stroke();const f=s.face;const eye=ac||x.strokeStyle;
if(s.hurt>0){x.beginPath();x.moveTo(px+f*2,gy-88);x.lineTo(px+f*7,gy-83);x.moveTo(px+f*7,gy-88);x.lineTo(px+f*2,gy-83);x.stroke()}
else{x.fillStyle=eye;x.beginPath();x.arc(px+f*5,gy-85,s.hard?2.2:1.6,0,7);x.fill();if(s.hard){x.globalAlpha=.35;x.beginPath();x.arc(px+f*5,gy-85,4.6,0,7);x.fill();x.globalAlpha=1}x.beginPath();x.moveTo(px+f*3,gy-79);x.quadraticCurveTo(px+f*6,gy-77,px+f*8,gy-80);x.stroke()}},
_pre(x,s){x.save();if(s.hurt>0&&Math.floor(s.hurt*20)%2)x.globalAlpha=.45;if(s.moving&&!s.gathering)x.translate(0,Math.abs(Math.sin(s.walk))*-2)},
boy(x,px,gy,s){const col=this.mint;this._pre(x,s);this.stroke(x,col,2.6);
this._legs(x,px,gy,s,col,true);
x.fillStyle='rgba(143,220,192,.10)';x.beginPath();x.moveTo(px-11,gy-40);x.lineTo(px-9,gy-72);x.lineTo(px+9,gy-72);x.lineTo(px+11,gy-40);x.closePath();x.fill();x.stroke();
x.beginPath();x.moveTo(px-5,gy-72);x.lineTo(px-5,gy-42);x.moveTo(px+5,gy-72);x.lineTo(px+5,gy-42);x.stroke();
x.beginPath();x.moveTo(px-3,gy-72);x.lineTo(px,gy-64);x.lineTo(px+3,gy-72);x.stroke(); // collar
const ac=s.hard?this.hot:col;this._arms(x,px,gy,s);this._head(x,px,gy,s,'rgba(143,220,192,.10)',ac);
this.stroke(x,ac,2.6);x.beginPath();x.ellipse(px,gy-94,19,3.5,0,0,7);x.stroke();x.fillStyle=s.hard?'rgba(242,113,122,.20)':'rgba(143,220,192,.14)';x.beginPath();x.moveTo(px-10,gy-94);x.lineTo(px-8,gy-104);x.lineTo(px+8,gy-104);x.lineTo(px+10,gy-94);x.closePath();x.fill();x.stroke();
x.restore()},
girl(x,px,gy,s){const col=this.mint;this._pre(x,s);this.stroke(x,col,2.6);
this._legs(x,px,gy,s,col,false);
x.fillStyle='rgba(143,220,192,.10)';x.beginPath();x.moveTo(px-8,gy-72);x.lineTo(px+8,gy-72);x.lineTo(px+11,gy-52);x.lineTo(px+19,gy-28);x.lineTo(px-19,gy-28);x.lineTo(px-11,gy-52);x.closePath();x.fill();x.stroke();
x.beginPath();x.moveTo(px-11,gy-52);x.lineTo(px+11,gy-52);x.stroke(); // waist
x.fillStyle=col;for(const [dx,dy] of [[-8,-42],[0,-36],[8,-42],[-4,-32],[4,-46]]){x.beginPath();x.arc(px+dx,gy+dy,1.5,0,7);x.fill()} // polka dots
x.beginPath();x.moveTo(px-4,gy-72);x.lineTo(px,gy-66);x.lineTo(px+4,gy-72);x.stroke();
const ac=s.hard?this.hot:col;this._arms(x,px,gy,s);this._head(x,px,gy,s,'rgba(143,220,192,.10)',ac);
const f=s.face;x.beginPath();x.moveTo(px-f*10,gy-90);x.quadraticCurveTo(px-f*18,gy-76,px-f*12,gy-60);x.moveTo(px-f*4,gy-95);x.quadraticCurveTo(px-f*14,gy-92,px-f*11,gy-84);x.stroke();
this.stroke(x,ac,2.6);x.fillStyle=s.hard?'rgba(242,113,122,.26)':'rgba(143,220,192,.18)';x.beginPath();x.moveTo(px-f*8,gy-96);x.lineTo(px-f*16,gy-102);x.lineTo(px-f*13,gy-93);x.lineTo(px-f*18,gy-90);x.closePath();x.fill();x.stroke();
x.beginPath();x.moveTo(px-f*11,gy-97);x.lineTo(px-f*14,gy-104);x.moveTo(px-f*11,gy-95);x.lineTo(px-f*15,gy-88);x.stroke();
x.restore()},
redneck(x,px,gy,s){const col=this.warm;this._pre(x,s);this.stroke(x,col,2.6);
this._legs(x,px,gy,s,col,true);
x.fillStyle='rgba(240,145,62,.10)';x.beginPath();x.moveTo(px-12,gy-40);x.quadraticCurveTo(px-22,gy-56,px-10,gy-72);x.lineTo(px+10,gy-72);x.quadraticCurveTo(px+22,gy-56,px+12,gy-40);x.closePath();x.fill();x.stroke();
x.beginPath();x.moveTo(px-5,gy-72);x.quadraticCurveTo(px-11,gy-56,px-7,gy-42);x.moveTo(px+5,gy-72);x.quadraticCurveTo(px+11,gy-56,px+7,gy-42);x.stroke();
x.beginPath();x.moveTo(px-9,gy-56);x.lineTo(px+9,gy-56);x.stroke(); // belt
this._arms(x,px,gy,s);this._head(x,px,gy,s,'rgba(240,145,62,.10)');
const f=s.face;this.stroke(x,col,3);x.beginPath();x.moveTo(px+f*1,gy-80);x.quadraticCurveTo(px+f*8,gy-85,px+f*12,gy-78);x.moveTo(px+f*1,gy-80);x.quadraticCurveTo(px-f*5,gy-85,px-f*8,gy-79);x.stroke();this.stroke(x,col,2.6);
x.fillStyle='rgba(240,145,62,.16)';x.beginPath();x.moveTo(px-14,gy-92);x.lineTo(px+15+f*6,gy-92);x.moveTo(px-9,gy-92);x.lineTo(px-8,gy-102);x.lineTo(px+8,gy-102);x.lineTo(px+9,gy-92);x.closePath();x.fill();x.stroke();
x.beginPath();x.moveTo(px+f*9,gy-92);x.lineTo(px+f*20,gy-91);x.stroke(); // visor
x.restore()},
chunk(x,cx,cy,r,rot){x.save();x.translate(cx,cy);x.rotate(rot);x.fillStyle='#F3E6A8';x.beginPath();x.moveTo(-r,-r*.6);x.lineTo(r*.8,-r*.9);x.lineTo(r,r*.7);x.lineTo(-r*.6,r);x.closePath();x.fill();this.stroke(x,this.red,Math.max(1.2,r*.45));x.beginPath();x.moveTo(-r,-r*.6);x.lineTo(r*.8,-r*.9);x.stroke();x.restore()},
hearts(x,px,py,hp,max,col,k){k=k||1;this.stroke(x,col,1.6);for(let i=0;i<max;i++){const hx=px+i*16*k;x.beginPath();x.moveTo(hx,py+5*k);x.bezierCurveTo(hx-8*k,py-2*k,hx-4*k,py-8*k,hx,py-3*k);x.bezierCurveTo(hx+4*k,py-8*k,hx+8*k,py-2*k,hx,py+5*k);x.closePath();if(i<hp){x.fillStyle=col;x.fill()}x.stroke()}},
};
window.ART=ART;
