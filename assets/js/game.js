'use strict';
// ══════════════════════════════════════════════════════
// CONFIGURATION – Phase 3
// ══════════════════════════════════════════════════════
const C = {
  budget: 3000,

  venues: {
    v1:{id:'v1',name:"Stadion Bumi Pertiwi",sub:"Outdoor",cost:650,kW:1200,toilets:80,bc:false,maxOff:30000,
        r:{cabor:0.88,off:1.20,rev:0.95},
        compat:['sepakBola','atletik','tenisDan','panahan','panjatTebing','maraton'],
        fasilitas:"Lapangan rumput, lintasan atletik, court tenis outdoor, area panahan, dinding panjat tebing",
        desc:"Outdoor stadium. Cap 30.000 pax.",
        warn:"",
        trade:"✅ Offline ratio 1.20× | ✅ 6 cabor outdoor | ❌ Tidak ada BC | ❌ Listrik 1.200 kW"},
    v2:{id:'v2',name:"GOR Metropolitan",sub:"Indoor",cost:420,kW:3200,toilets:55,bc:true,maxOff:8000,
        r:{cabor:0.95,off:0.90,rev:1.10},
        compat:['buluTangkis','bolaVoli','basket','futsal','tenisMeja','pencakSilat','tinju','taekwondo','eSport'],
        fasilitas:"Lapangan parket indoor, matras beladiri, ring tinju, meja tenis, area gaming digital",
        desc:"Indoor GOR. Cap 8.000 pax.",
        warn:"",
        trade:"✅ Broadcasting built-in | ✅ Rev/pax 1.10× | ✅ 9 cabor indoor | ❌ Cap 8.000 pax"},
    v3:{id:'v3',name:"Lapangan Terbuka",sub:"Outdoor",cost:150,kW:1000,toilets:10,bc:false,maxOff:30000,
        r:{cabor:1.20,off:1.60,rev:0.70},
        compat:['sepakBola','tenisDan','panahan','maraton','futsal'],
        fasilitas:"Lapangan outdoor terbuka, court tenis, area panahan, rute maraton",
        desc:"Outdoor termurah. Cap 30.000 pax.",
        warn:"",
        trade:"✅ Sewa termurah Rp 150jt | ✅ Rasio offline 1.60× | ❌ Hanya 5 cabor | ❌ Listrik & toilet minim"},
    v4:{id:'v4',name:"Sport Hall Elite",sub:"Indoor Premium",cost:880,kW:3800,toilets:40,bc:true,maxOff:15000,
        r:{cabor:0.82,off:0.70,rev:1.45},
        compat:['buluTangkis','bolaVoli','basket','futsal','tenisMeja','pencakSilat','tinju','taekwondo','eSport'],
        fasilitas:"Lapangan parket indoor premium, matras beladiri, ring tinju, meja tenis, area gaming digital",
        desc:"Indoor premium. Cap 15.000 pax.",
        warn:"",
        trade:"✅ Rev/pax tertinggi 1.45× | ✅ Biaya cabor 0.82× | ❌ Sewa tertinggi | ❌ Offline 0.70×"},
    v5:{id:'v5',name:"Kompleks Olahraga Nusantara",sub:"Mixed",cost:560,kW:4200,toilets:70,bc:true,maxOff:45000,
        r:{cabor:1.05,off:1.05,rev:1.00},
        compat:['sepakBola','renang','tenisDan','panahan','panjatTebing','maraton','buluTangkis','bolaVoli','basket','futsal','tenisMeja','pencakSilat','tinju','taekwondo','eSport'],
        fasilitas:"Lapangan rumput, kolam renang, lintasan atletik, court tenis, area panahan, dinding panjat, lapangan parket indoor, matras beladiri, ring tinju, meja tenis, area gaming digital",
        desc:"Mixed paling fleksibel. Cap 45.000 pax.",
        warn:"",
        trade:"✅ 15 cabor | ✅ Broadcasting + kolam renang | ❌ Biaya cabor 1.05× | ❌ Atletik tidak bisa"},
  },

  cabor:[
    {id:'sepakBola',   e:'⚽',name:"Sepak Bola",       g:"Outdoor Lapangan", req:"Lapangan rumput",            biaya:180,kW:250, pBase:6000,tiket:75, oBase:40000, compat:['v1','v3','v5'],es:false},
    {id:'atletik',     e:'🏃',name:"Atletik",           g:"Outdoor Lintasan", req:"Lintasan atletik",           biaya:120,kW:200, pBase:4000,tiket:50, oBase:30000, compat:['v1'],          es:false},
    {id:'renang',      e:'🏊',name:"Renang",             g:"Akuatik",          req:"Kolam renang",               biaya:150,kW:450, pBase:2000,tiket:60, oBase:20000, compat:['v5'],          es:false},
    {id:'tenisDan',    e:'🎾',name:"Tenis Lapangan",    g:"Outdoor Court",    req:"Court tenis outdoor",        biaya:70, kW:230, pBase:1200,tiket:65, oBase:10000, compat:['v1','v3','v5'],es:false},
    {id:'panahan',     e:'🏹',name:"Panahan",            g:"Outdoor Target",   req:"Area panahan",               biaya:45, kW:150, pBase:700, tiket:40, oBase:8000,  compat:['v1','v3','v5'],es:false},
    {id:'panjatTebing',e:'🧗',name:"Panjat Tebing",     g:"Outdoor Wall",     req:"Dinding panjat tebing",      biaya:65, kW:180, pBase:1200,tiket:55, oBase:14000, compat:['v1','v5'],     es:false},
    {id:'maraton',     e:'🏃',name:"Maraton",            g:"Outdoor Rute",     req:"Rute outdoor",               biaya:90, kW:0,   pBase:8000,tiket:30, oBase:35000, compat:['v1','v3','v5'],es:false},
    {id:'buluTangkis', e:'🏸',name:"Bulu Tangkis",      g:"Indoor Court",     req:"Lapangan parket indoor",     biaya:85, kW:360, pBase:2000,tiket:55, oBase:28000, compat:['v2','v4','v5'],es:false},
    {id:'bolaVoli',    e:'🏐',name:"Bola Voli",          g:"Indoor Court",     req:"Lapangan parket indoor",     biaya:80, kW:380, pBase:2500,tiket:50, oBase:18000, compat:['v2','v4','v5'],es:false},
    {id:'basket',      e:'🏀',name:"Basket",             g:"Indoor Court",     req:"Lapangan parket indoor",     biaya:100,kW:420, pBase:3000,tiket:55, oBase:22000, compat:['v2','v4','v5'],es:false},
    {id:'futsal',      e:'⚽',name:"Futsal",             g:"Indoor/Outdoor",   req:"Lapangan indoor atau outdoor",biaya:75, kW:330, pBase:1800,tiket:45, oBase:15000, compat:['v2','v3','v4','v5'],es:false},
    {id:'tenisMeja',   e:'🏓',name:"Tenis Meja",         g:"Indoor Table",     req:"Meja tenis",                 biaya:50, kW:800, pBase:2400,tiket:0,  oBase:12000, compat:['v2','v4','v5'],es:false},
    {id:'pencakSilat', e:'🥋',name:"Pencak Silat",       g:"Beladiri Matras",  req:"Matras beladiri",            biaya:55, kW:210, pBase:1000,tiket:0,  oBase:12000, compat:['v2','v4','v5'],es:false},
    {id:'tinju',       e:'🥊',name:"Tinju",              g:"Ring Tinju",       req:"Ring tinju",                 biaya:70, kW:240, pBase:2400,tiket:0,  oBase:0,     compat:['v2','v4','v5'],es:false},
    {id:'taekwondo',   e:'🥋',name:"Taekwondo",          g:"Beladiri Matras",  req:"Matras beladiri",            biaya:60, kW:220, pBase:1200,tiket:45, oBase:0,     compat:['v2','v4','v5'],es:false},
    {id:'eSport',      e:'🎮',name:"E-Sport Demo",       g:"Digital Gaming",   req:"Area gaming digital",        biaya:100,kW:800, pBase:500, tiket:0,  oBase:80000, compat:['v2','v4','v5'],es:true},
  ],

  sponsorTiers:[
    {max:30000,    rev:0,    label:"< 30K viewers",   tier:"—"},
    {max:80000,    rev:150,  label:"30K – 80K",       tier:"Tier 1"},
    {max:200000,   rev:300,  label:"80K – 200K",      tier:"Tier 2"},
    {max:500000,   rev:600,  label:"200K – 500K",     tier:"Tier 3"},
    {max:Infinity, rev:1000, label:"> 500K",          tier:"Tier 4"},
  ],

  eventCards:[
    {id:'C01',e:'🌧️',color:'#1e3a8a',name:"Hujan Lebat",
     desc:"Penonton OUTDOOR turun 40% — venue V1 dan V3 terkena dampak (poff ×0.60).",
     hint:"Revenue tiket turun signifikan. Apakah toilet & security masih over-allocated?",
     adapt:"Jangan panik menambah toilet/security. Penonton justru berkurang.",
     targets:["Tidak menambah toilet (penonton turun, bukan naik)","Tidak menambah security (penonton turun)"]},
    {id:'S01',e:'💸',color:'#5b21b6',name:"Sponsor Mundur",
     desc:"Tier sponsorship turun 1 level. Revenue sponsor berkurang otomatis.",
     hint:"Kompensasi dengan naikkan viewers (MSA/Streaming) ATAU kurangi total biaya.",
     adapt:"Tingkatkan penonton online ATAU potong cost untuk adaptasi.",
     targets:["Naikkan viewers (tambah MSA / Streaming Upgrade)","ATAU kurangi total biaya"]},
    {id:'L01',e:'⚡',color:'#991b1b',name:"Krisis Generator",
     desc:"Harga generator ×1.60 (Kecil: Rp 32jt, Besar: Rp 56jt). Maks 2 unit total.",
     hint:"JANGAN panik beli genset tanpa cek deficit kW! Verifikasi dulu apakah perlu.",
     adapt:"Cek: apakah kW digunakan masih di bawah kapasitas venue? Jika tidak defisit — jangan beli!",
     targets:["Verifikasi deficit kW sebelum membeli genset","Tidak beli genset jika tidak ada deficit (tidak over-react)"]},
    {id:'A01',e:'🎤',color:'#92400e',name:"Artis Viral",
     desc:"Modifier Opening berubah: ×1.10 → ×1.30. Penonton offline naik signifikan (jika Opening dibeli).",
     hint:"Jika Opening aktif, penonton naik 30% bukan 10% — toilet dan security harus diupdate!",
     adapt:"Hitung ulang kebutuhan toilet & security berdasarkan poff yang lebih tinggi.",
     targets:["Tambah toilet sesuai poff baru (lebih tinggi)","Tambah security sesuai poff baru"]},
    {id:'K01',e:'📈',color:'#064e3b',name:"Kuota Bertambah",
     desc:"poff +10%, penonton online +20%, biaya cabor +5% (otomatis).",
     hint:"Lebih banyak penonton → cek toilet & security. Listrik tidak berubah (aman).",
     adapt:"Hitung ulang toilet & security. Listrik tidak perlu diubah.",
     targets:["Tambah toilet sesuai poff baru","Tambah security sesuai poff baru"]},
  ],
};

// ══════════════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════════════
const makeDecisions = () => ({
  venue:null, cabor:[],
  bc:false, streaming:false, opening:false, closing:false,
  gensetKecil:0, gensetBesar:0,
  toilet5:0, toilet10:0,
  security:0, medis:false,
  foodStall:0, boothSponsor:0, msa:false, ambulans:false, shuttleBus:0, securityVip:0,
});

let G = {
  phase:1, eventCard:null,
  startTime:null, p1time:0, p2time:0,
  p1d:makeDecisions(), p2d:makeDecisions(),
  p1r:null, p2r:null,
  p1s:null, p2s:null,
};

let currentTab = 'venue';

// ══════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════
const fmt  = (n,d=0) => Number(n).toLocaleString('id-ID',{minimumFractionDigits:d,maximumFractionDigits:d});
const fmtM = n => (n>=0?'+':'')+fmt(Math.round(n))+' jt';
const D    = () => G.phase===1 ? G.p1d : G.p2d;
const V    = () => D().venue ? C.venues[D().venue] : null;
const clamp= (v,a,b) => Math.min(b,Math.max(a,v));

function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  updateSteps(id);
  showFloatTools(id==='planning');
}

function updateSteps(screenId){
  const map={briefing:0,planning:1,simulation:1,results:2,final:3};
  const idx = map[screenId]??0;
  document.querySelectorAll('.step').forEach((s,i)=>{
    s.classList.toggle('active',i===idx);
    s.classList.toggle('done',i<idx);
  });
}

function showToast(msg,dur=2800){
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),dur);
}

function elapsedMin(){
  if(!G.startTime) return 0;
  return (Date.now()-G.startTime)/60000;
}

// ══════════════════════════════════════════════════════
// SCORING HELPERS
// ══════════════════════════════════════════════════════
function rsRatio(ratio){
  if(ratio<1.0) return 0;
  if(ratio<=1.15) return 5;
  if(ratio<=1.50) return 4;
  return 2;
}
function rsListrik(deficit,genKW){
  if(deficit===0){
    if(genKW===0) return 5;
    if(genKW<=300) return 3;
    return 1;
  }
  if(genKW<deficit) return 0;
  const surplus=genKW-deficit;
  if(surplus<=200) return 5;
  if(surplus<=500) return 3;
  return 1;
}
function rsBudget(cost){
  const sisa=(3000-cost)/3000;
  if(sisa<=0.40) return 5;
  if(sisa<=0.60) return 4;
  return 2;
}
function rsFB(ratio,poff){
  if(poff===0) return 0;
  if(ratio>=0.85&&ratio<=1.20) return 5;
  if((ratio>=0.70&&ratio<0.85)||(ratio>1.20&&ratio<=1.60)) return 4;
  if((ratio>=0.50&&ratio<0.70)||(ratio>1.60&&ratio<=2.50)) return 2;
  return 0;
}

// ══════════════════════════════════════════════════════
// MAIN CALCULATION ENGINE
// ══════════════════════════════════════════════════════
function calc(d, ec){
  if(!d.venue) return null;
  const v = C.venues[d.venue];

  // Broadcasting active?
  const bcActive = v.bc || d.bc;

  // Genset costs (L01 effect)
  const gKCost = ec?.id==='L01' ? 32 : 20;
  const gBCost = ec?.id==='L01' ? 56 : 35;

  // kW from extras
  let kWExtras = 0;
  if(d.bc)       kWExtras += 200;
  if(d.streaming) kWExtras += 80;
  if(d.opening)  kWExtras += 150;
  if(d.closing)  kWExtras += 100;

  // kW from genset
  const kWGenset = d.gensetKecil*300 + d.gensetBesar*700;

  // Opening multiplier (A01 changes 1.10→1.30)
  const openMult = d.opening ? (ec?.id==='A01' ? 1.30 : 1.10) : 1;
  const closeMult = d.closing ? 1.08 : 1;

  // C01 outdoor rain factor
  const rainFactor = (ec?.id==='C01' && (d.venue==='v1'||d.venue==='v3')) ? 0.60 : 1;

  // K01 factors
  const k01poff = ec?.id==='K01' ? 1.10 : 1;
  const k01pon  = ec?.id==='K01' ? 1.20 : 1;
  const k01cost = ec?.id==='K01' ? 1.05 : 1;

  // Per-cabor calculations
  let kWCabor=0, costCabor=0;
  let revTiketSum=0;  // poff × tiket sum (before cap / revPerPax)
  let poffSum=0, ponSum=0;
  const caborDetails=[];

  for(const cId of d.cabor){
    const c = C.cabor.find(x=>x.id===cId);
    kWCabor += c.kW;
    const biaya = c.biaya * v.r.cabor * k01cost;
    costCabor += biaya;

    const compat = c.compat.includes(d.venue) && !(c.es && !bcActive);
    if(!compat){ caborDetails.push({id:cId,name:c.name,compat:false,poff:0,pon:0,rev:0}); continue; }

    const shuttleMult = Math.pow(1.05, d.shuttleBus);
    let poff = c.pBase * v.r.off * openMult * closeMult * shuttleMult * rainFactor * k01poff;
    let pon  = c.oBase * (d.streaming?1.2:1) * (d.msa?1.15:1) * k01pon;

    revTiketSum += poff * c.tiket; // tiket in Rp ribu
    poffSum += poff;
    ponSum  += pon;
    caborDetails.push({id:cId,name:c.name,e:c.e,compat:true,poff,pon,rev:poff*c.tiket});
  }

  const kWTotal = kWCabor + kWExtras;
  const kWVenue = v.kW;
  const kWAvail = kWVenue + kWGenset;
  const kWDeficit = Math.max(0, kWTotal - kWVenue);
  const blackout  = kWTotal > kWAvail;

  // Blackout → no revenue
  if(blackout){ poffSum=0; ponSum=0; revTiketSum=0; }

  // Venue cap (all venues have maxOff)
  let capRatio = 1;
  if(v.maxOff && poffSum > v.maxOff){
    capRatio = v.maxOff / poffSum;
    poffSum = v.maxOff;
  }

  // Online only if broadcasting active
  if(!bcActive) ponSum=0;

  // Ticket revenue (Rp jt) — apply capRatio
  const revTiket = revTiketSum / 1000 * v.r.rev * capRatio;

  // Sponsor tier
  const totalViewers = poffSum + ponSum;
  let sponsorIdx=0;
  for(let i=0;i<C.sponsorTiers.length;i++){
    if(totalViewers<=C.sponsorTiers[i].max){ sponsorIdx=i; break; }
    sponsorIdx=i;
  }
  // S01: tier down 1
  if(ec?.id==='S01') sponsorIdx=Math.max(0,sponsorIdx-1);
  const revSponsor = C.sponsorTiers[sponsorIdx].rev;

  // F&B revenue (catchment system)
  const revFoodStall = Math.min(d.foodStall, poffSum/800) * 15;

  // Booth sponsor (saturation)
  const sat = (d.boothSponsor>0&&totalViewers>0)
    ? Math.min(1, totalViewers/(d.boothSponsor*5000)) : 0;
  const revBooth = d.boothSponsor*30*sat;

  const totalRev = revTiket + revSponsor + revFoodStall + revBooth;

  // Costs
  const costVenue = v.cost;
  let costExtras=0;
  if(d.bc)        costExtras+=80;
  if(d.streaming) costExtras+=45;
  if(d.opening)   costExtras+=60;
  if(d.closing)   costExtras+=50;
  costExtras += d.gensetKecil*gKCost + d.gensetBesar*gBCost;
  costExtras += d.toilet10*22 + d.toilet5*12;
  costExtras += d.security*15 + d.securityVip*12;
  if(d.medis) costExtras+=25;
  if(d.ambulans) costExtras+=20;
  costExtras += d.foodStall*8 + d.boothSponsor*10;
  costExtras += d.shuttleBus*18;
  if(d.msa) costExtras+=35;

  const totalCost = costVenue + costCabor + costExtras;
  const profit = totalRev - totalCost;
  const margin = totalRev>0 ? profit/totalRev*100 : (profit>=0?0:-100);

  // Constraints
  const toiletsTotal   = v.toilets + d.toilet10*10 + d.toilet5*5;
  const toiletsReq     = poffSum>0 ? Math.ceil(poffSum/100) : 0;
  const securityTotal  = d.security*10 + d.securityVip*5;
  const securityReq    = poffSum>0 ? Math.max(10,Math.ceil(poffSum/200)) : 10;
  const nIncompat      = d.cabor.filter(id=>{
    const c=C.cabor.find(x=>x.id===id);
    return !c.compat.includes(d.venue)||(c.es&&!bcActive);
  }).length;
  const nCompat = d.cabor.length - nIncompat;
  const constraints = {
    listrik:  !blackout,
    toilet:   toiletsReq>0 ? toiletsTotal>=toiletsReq : true,
    security: securityTotal>=securityReq,
    cabor:    nCompat>=5,
    medis:    d.medis,
    budget:   totalCost<=3000,
  };
  const nPass = Object.values(constraints).filter(Boolean).length;

  // Resource Stewardship
  const rs_toilet   = toiletsReq>0  ? rsRatio(toiletsTotal/toiletsReq)   : 5;
  const rs_security = securityReq>0 ? rsRatio(securityTotal/securityReq) : 5;
  const rs_listrik  = rsListrik(kWDeficit, kWGenset);
  const rs_budget   = rsBudget(totalCost);
  const catchRatio  = poffSum>0 ? (d.foodStall*800)/poffSum : 0;
  const rs_fb       = rsFB(catchRatio, poffSum);
  const totalRS     = rs_toilet+rs_security+rs_listrik+rs_budget+rs_fb;

  return {
    kWCabor,kWExtras,kWTotal,kWVenue,kWAvail,kWGenset,kWDeficit,blackout,
    poffSum,ponSum,totalViewers,sponsorIdx,capRatio,
    revTiket,revSponsor,revFoodStall,revBooth,totalRev,
    costVenue,costCabor,costExtras,totalCost,
    profit,margin,nPass,nIncompat,nCompat,
    toiletsTotal,toiletsReq,securityTotal,securityReq,
    bcActive,constraints,caborDetails,
    rs_toilet,rs_security,rs_listrik,rs_budget,rs_fb,totalRS,
    catchRatio,sat,
    gKCost,gBCost,
  };
}

// ══════════════════════════════════════════════════════
// SCORING
// ══════════════════════════════════════════════════════
function scorePhase(res, timeMin){
  if(!res) return null;
  const stLookup=[0,4,8,12,17,21,25];
  const st = stLookup[clamp(res.nPass,0,6)];

  const m=res.margin;
  let sp=0;
  if(m>=20)sp=25; else if(m>=10)sp=20; else if(m>=1)sp=15;
  else if(m>=0)sp=10; else if(m>=-10)sp=5; else sp=0;

  const rs = res.totalRS;

  let ts=5;
  if(timeMin<=15)ts=25; else if(timeMin<=20)ts=20;
  else if(timeMin<=25)ts=15; else if(timeMin<=30)ts=10;
  const dec = Math.round(ts*(res.nPass/6));

  return {st,sp,rs,dec,total:st+sp+rs+dec,ts};
}

function calcLA(ec, p1d, p2d, p1r, p2r){
  if(!ec||!p1r||!p2r) return {diag:0,eff:0,integ:0,total:0};
  let diag=0;

  const p1tlt = p1d.toilet5+p1d.toilet10;
  const p2tlt = p2d.toilet5+p2d.toilet10;

  switch(ec.id){
    case 'C01':
      if(p2tlt<=p1tlt) diag+=4;
      if(p2d.security<=p1d.security) diag+=4;
      break;
    case 'S01':{
      const viewUp = p2r.totalViewers>p1r.totalViewers;
      const costDn = p2r.totalCost<p1r.totalCost;
      if(viewUp) diag+=4;
      if(costDn) diag+=4;
      break;}
    case 'L01':{
      const def1=p1r.kWDeficit>0;
      const buyG2=p2d.gensetKecil+p2d.gensetBesar>0;
      if(!def1&&!buyG2) diag=8;
      else if(!def1&&buyG2) diag=0;
      else if(def1&&!p2r.blackout) diag=8;
      else diag=0;
      break;}
    case 'A01':
      if(p2r.toiletsTotal>=p2r.toiletsReq) diag+=4;
      if(p2r.securityTotal>=p2r.securityReq) diag+=4;
      break;
    case 'K01':
      if(p2r.toiletsTotal>=p2r.toiletsReq) diag+=4;
      if(p2r.securityTotal>=p2r.securityReq) diag+=4;
      break;
  }
  diag=Math.min(8,diag);

  // Efficiency
  const dRev=p2r.totalRev-p1r.totalRev;
  const dCost=Math.max(0,p2r.totalCost-p1r.totalCost);
  const net=dRev-dCost;
  const pct=p1r.totalRev>0?net/p1r.totalRev*100:0;
  let eff=0;
  if(pct>8)eff=12; else if(pct>4)eff=10; else if(pct>0)eff=8;
  else if(pct>-5)eff=5; else if(pct>-15)eff=2;

  // Integrity
  const dPass=p2r.nPass-p1r.nPass;
  let integ=0;
  if(dPass>=1)integ=5; else if(dPass===0)integ=3; else if(dPass===-1)integ=1;

  return {diag,eff,integ,total:diag+eff+integ};
}

function scoreWithEC(p2res, timeMin, la){
  if(!p2res) return null;
  const raw=scorePhase(p2res,timeMin);
  const sc80=v=>Math.round(v*0.8);
  const laScaled=Math.round(la.total*0.8);
  return {
    st:sc80(raw.st), sp:sc80(raw.sp), rs:sc80(raw.rs), dec:sc80(raw.dec),
    la:laScaled, total:sc80(raw.st)+sc80(raw.sp)+sc80(raw.rs)+sc80(raw.dec)+laScaled,
    raw, la_detail:la,
  };
}

// ══════════════════════════════════════════════════════
// UI – BRIEFING
// ══════════════════════════════════════════════════════
function buildBriefing(){
  document.getElementById('briefing-info').innerHTML=`
    <div class="info-card"><div class="label">Budget Awal</div><div class="value">3.000</div><div class="unit">Rp Juta</div></div>
    <div class="info-card"><div class="label">Durasi Sesi</div><div class="value">30</div><div class="unit">Menit</div></div>
    <div class="info-card"><div class="label">Venue Pilihan</div><div class="value">5</div><div class="unit">V1 – V5</div></div>
    <div class="info-card"><div class="label">Cabor Tersedia</div><div class="value">16</div><div class="unit">Min 5 pilih</div></div>
  `;
  document.getElementById('briefing-objectives').innerHTML=`
    <h3>Langkah Kerja</h3>
    <div class="obj-item"><div class="obj-icon">1️⃣</div>Pilih 1 VENUE dari 5 opsi. Perhatikan biaya sewa, kapasitas listrik, fasilitas, dan tipe venue — venue menentukan cabor mana yang bisa digunakan.</div>
    <div class="obj-item"><div class="obj-icon">2️⃣</div>Pilih minimal 5 CABANG OLAHRAGA. Pastikan cabor yang dipilih sesuai dengan fasilitas venue. Cabor yang tidak sesuai tetap dikenakan biaya tanpa menghasilkan penonton.</div>
    <div class="obj-item"><div class="obj-icon">3️⃣</div>Beli EXTRAS & ADD-ONS sesuai kebutuhan: generator listrik, toilet portable, petugas keamanan, F&B, broadcasting, panggung hiburan, booth sponsor, tim medis, dll.</div>
    <div class="obj-item"><div class="obj-icon">4️⃣</div>VERIFIKASI semua constraint wajib terpenuhi. Satu saja yang gagal bisa membatalkan sebagian atau seluruh event Anda.</div>
    <div class="obj-item"><div class="obj-icon">5️⃣</div>SUBMIT rencana final sebelum waktu habis (30 menit).</div>

    <h3 style="margin-top:20px">Sumber Pendapatan</h3>
    <div class="obj-item"><div class="obj-icon">🎫</div><strong>Tiket:</strong> Setiap cabor menghasilkan penonton offline yang membeli tiket. Jumlah dan harga bervariasi per cabor, dikalikan rasio venue.</div>
    <div class="obj-item"><div class="obj-icon">🤝</div><strong>Sponsor:</strong> Pendapatan berdasarkan total viewers (offline + online). Semakin banyak viewers, semakin tinggi tier sponsor.</div>
    <div class="obj-item"><div class="obj-icon">🍔</div><strong>F&B:</strong> Food Stall menghasilkan revenue, tapi dibatasi jumlah penonton yang bisa dilayani (1 stall maks 800 pax).</div>
    <div class="obj-item"><div class="obj-icon">🏢</div><strong>Booth:</strong> Booth sponsor menghasilkan revenue berdasarkan total viewers. Terlalu banyak booth vs viewers menurunkan efektivitas.</div>

    <h3 style="margin-top:20px">6 Constraint Wajib</h3>
    <div class="obj-item"><div class="obj-icon">⚡</div><strong>Listrik</strong> — Kebutuhan listrik tidak boleh melebihi kapasitas.</div>
    <div class="obj-item"><div class="obj-icon">🚽</div><strong>Toilet</strong> — Toilet harus mencukupi untuk penonton.</div>
    <div class="obj-item"><div class="obj-icon">🛡️</div><strong>Keamanan</strong> — Petugas keamanan harus mencukupi.</div>
    <div class="obj-item"><div class="obj-icon">⚽</div><strong>Cabor</strong> — Minimal 5 cabor yang kompatibel dengan venue.</div>
    <div class="obj-item"><div class="obj-icon">🏥</div><strong>Medis</strong> — Tim Medis & P3K wajib dibeli.</div>
    <div class="obj-item"><div class="obj-icon">💰</div><strong>Budget</strong> — Total pengeluaran tidak boleh melebihi Rp 3 miliar.</div>

    <h3 style="margin-top:20px">Tips & Peringatan</h3>
    <div class="obj-item"><div class="obj-icon">📖</div>Baca SEMUA data yang tersedia sebelum membuat keputusan. Informasi tersebar di beberapa tab.</div>
    <div class="obj-item"><div class="obj-icon">🔗</div>Perhatikan INTERDEPENDENSI. Contoh: panggung hiburan menaikkan penonton → toilet & keamanan harus diupdate.</div>
    <div class="obj-item"><div class="obj-icon">📊</div>Efisiensi lebih penting daripada kuantitas. Membeli terlalu banyak sama buruknya dengan terlalu sedikit.</div>
    <div class="obj-item"><div class="obj-icon">⏱️</div>Waktu juga dinilai. Rencana yang tidak di-submit tepat waktu tetap dinilai berdasarkan waktu aktual.</div>
  `;
}

function toggleLangkahKerja(){
  const panel=document.getElementById('langkah-kerja-panel');
  if(panel.style.display==='none'){
    document.getElementById('lk-body').innerHTML=document.getElementById('briefing-objectives').innerHTML;
    panel.style.display='block';
  } else {
    panel.style.display='none';
  }
}

let timerInterval=null;
function startPlanning(){
  G.phase=1;
  G.p1d=makeDecisions();
  G.startTime=Date.now();
  currentTab='venue';
  buildPlanning();
  showScreen('planning');
  startTimer();
}

function startTimer(){
  if(timerInterval) clearInterval(timerInterval);
  timerInterval=setInterval(()=>{
    const elapsed=elapsedMin();
    const remaining=Math.max(0,30-elapsed);
    const mm=Math.floor(remaining);
    const ss=Math.floor((remaining-mm)*60);
    const timerEl=document.getElementById('countdown-timer');
    const warnEl=document.getElementById('timer-warning');
    if(timerEl){
      timerEl.textContent=`${String(mm).padStart(2,'0')}:${String(ss).padStart(2,'0')}`;
      if(remaining<=0){
        timerEl.style.color='var(--danger)';
        if(warnEl) warnEl.style.display='block';
      } else if(remaining<=5){
        timerEl.style.color='var(--warn)';
      } else {
        timerEl.style.color='var(--accent)';
      }
    }
  },1000);
}

// ══════════════════════════════════════════════════════
// UI – PLANNING
// ══════════════════════════════════════════════════════
function buildPlanning(){
  const isAdapt = G.phase===2;
  const ec = G.eventCard;

  // Update topbar budget pill
  document.getElementById('hdr-budget').textContent='3.000';

  // Event card banner (Phase 2)
  const banner = document.getElementById('ec-banner');
  if(isAdapt && ec){
    banner.style.display='flex';
    document.getElementById('ec-banner-name').textContent=ec.e+' '+ec.name;
    document.getElementById('ec-banner-desc').textContent=ec.desc;
    document.getElementById('ec-banner-adapt').textContent=ec.adapt;
  } else {
    banner.style.display='none';
  }

  // Venue tab locked in Phase 2
  document.getElementById('tab-btn-venue').disabled=false;
  renderVenueTab();
  switchTab(isAdapt?'cabor':'venue');
  updatePreview();
}

function switchTab(name){
  currentTab=name;
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.toggle('active',b.dataset.tab===name));
  document.querySelectorAll('.tab-pane').forEach(p=>p.classList.toggle('active',p.id==='tab-'+name));
  // Render if needed
  if(name==='cabor')     renderCaborTab();
  if(name==='venue')     renderVenueTab();
  if(name==='listrik')   renderListrikTab();
  if(name==='addons')    renderAddonsTab();
  if(name==='operasional') renderOpTab();
}

function renderVenueTab(){
  const d=D(); const isAdapt=G.phase===2;
  let html='';
  for(const vk of Object.keys(C.venues)){
    const v=C.venues[vk];
    const sel=d.venue===vk;
    const locked=isAdapt;
    html+=`<div class="venue-card${sel?' selected':''}${locked&&!sel?' vc-disabled':''}" onclick="${locked?'':'selectVenue(\''+vk+'\')'}">
      <div class="vc-header">
        <div class="vc-name">${v.name} <span class="tag tag-blue">${v.sub}</span>${locked&&sel?'<span class="tag tag-green" style="margin-left:4px">TERKUNCI</span>':''}</div>
        <div class="vc-badge ${sel?'sel':'unsel'}">${sel?'✓ Dipilih':'Pilih'}</div>
      </div>
      <div class="vc-attrs">
        <div class="vc-row"><span>Sewa</span><span class="vc-val">Rp ${fmt(v.cost)} jt</span></div>
        <div class="vc-row"><span>Listrik</span><span class="vc-val">${fmt(v.kW)} kW</span></div>
        <div class="vc-row"><span>Toilet bawaan</span><span class="vc-val">${v.toilets} unit</span></div>
        <div class="vc-row"><span>Kapasitas penonton offline</span><span class="vc-val">${v.maxOff?fmt(v.maxOff)+' pax':'Tidak ada cap'}</span></div>
        <div class="vc-row"><span>Rasio biaya cabor</span><span class="vc-val">${v.r.cabor}×</span></div>
        <div class="vc-row"><span>Rasio offline</span><span class="vc-val">${v.r.off}×</span></div>
        <div class="vc-row"><span>Rasio rev/pax</span><span class="vc-val">${v.r.rev}×</span></div>
        <div class="vc-row vc-row-full"><span>Fasilitas</span><span class="vc-val" style="font-size:11px;text-align:right">${v.fasilitas}</span></div>
      </div>
    </div>`;
  }
  document.getElementById('venue-cards').innerHTML=html;
}

function selectVenue(id){
  if(G.phase===2) return;
  D().venue=id;
  renderVenueTab();
  renderCaborTab();
  updatePreview();
}

function renderCaborTab(){
  const d=D(); const v=V();
  let html='';
  if(!v){
    document.getElementById('cabor-list').innerHTML='<div style="color:var(--muted);padding:20px;text-align:center">Pilih venue terlebih dahulu.</div>';
    return;
  }
  // Group by indoor/outdoor
  const groups={};
  C.cabor.forEach(c=>{
    if(!groups[c.g]) groups[c.g]=[];
    groups[c.g].push(c);
  });

  let totalKW=0,totalBiaya=0;
  d.cabor.forEach(id=>{
    const c=C.cabor.find(x=>x.id===id);
    if(c){totalKW+=c.kW;totalBiaya+=c.biaya*v.r.cabor;}
  });

  html+=`<div class="cabor-summary">
    <span>Terpilih: <strong class="text-accent">${d.cabor.length}</strong> cabor (min <span class="text-warn">5</span>)</span>
    <span>Total kW: <strong class="text-primary">${fmt(totalKW)} kW</strong></span>
    <span>Est. Biaya Cabor: <strong class="text-warn">Rp ${fmt(Math.round(totalBiaya))} jt</strong></span>
  </div>
  <div style="overflow-x:auto">
  <table class="cabor-table"><thead><tr>
    <th></th><th>Cabang Olahraga</th><th>Butuh Fasilitas</th>
    <th>Biaya Base (jt)</th><th>kW</th><th>P.Off Base</th><th>Tiket (rb)</th><th>Online Base</th>
  </tr></thead><tbody>`;

  C.cabor.forEach(c=>{
    const sel=d.cabor.includes(c.id);
    const compat=c.compat.includes(d.venue);
    const esOK=!c.es||(V()?.bc||d.bc);
    const available=compat&&esOK;
    html+=`<tr class="cabor-row${sel?' selected':''}" onclick="toggleCabor('${c.id}')">
      <td><div class="check-box${sel?' checked':''}"></div></td>
      <td>${c.e} ${c.name}${c.es?'<span class="na-badge">BC req</span>':''}</td>
      <td style="color:var(--muted);font-size:11px">${c.req}</td>
      <td>${fmt(c.biaya)}</td>
      <td>${c.kW===0?'<span class="text-accent">0 ✨</span>':fmt(c.kW)}</td>
      <td>${fmt(c.pBase)}</td>
      <td>${c.tiket}</td>
      <td>${fmt(c.oBase)}</td>
    </tr>`;
  });
  html+='</tbody></table></div>';
  document.getElementById('cabor-list').innerHTML=html;
}

function toggleCabor(id){
  const d=D(); const v=V();
  if(!v){showToast('Pilih venue dulu!');return;}
  const idx=d.cabor.indexOf(id);
  if(idx>=0) d.cabor.splice(idx,1);
  else d.cabor.push(id);
  renderCaborTab();
  updatePreview();
}

function renderListrikTab(){
  const d=D(); const v=V();
  const kWCabor=d.cabor.reduce((s,id)=>{const c=C.cabor.find(x=>x.id===id);return s+(c?c.kW:0);},0);
  const kWExtras=(d.bc?200:0)+(d.streaming?80:0)+(d.opening?150:0)+(d.closing?100:0);
  const kWTotal=kWCabor+kWExtras;
  const kWVenue=v?v.kW:0;
  const kWGenset=d.gensetKecil*300+d.gensetBesar*700;
  const kWAvail=kWVenue+kWGenset;
  const deficit=Math.max(0,kWTotal-kWVenue);
  const gKCost=G.eventCard?.id==='L01'?32:20;
  const gBCost=G.eventCard?.id==='L01'?56:35;

  document.getElementById('tab-listrik-content').innerHTML=`
    <div class="section-card">
      <div class="section-title">⚡ Status Listrik</div>
      <div style="font-size:12px;padding:8px 12px;border-radius:6px;background:${deficit>0?(kWGenset>=deficit?'rgba(0,199,160,.12)':'rgba(255,83,117,.12)'):'rgba(0,199,160,.12)'}">
        ${deficit>0?`Deficit: ${fmt(deficit)} kW — ${kWGenset>=deficit?'✅ ditutup genset':'❌ BLACKOUT — beli genset!'}`:
        `✅ Listrik aman`}
      </div>
    </div>

    <div class="section-card">
      <div class="section-title">📡 Broadcasting & Streaming</div>
      <label class="extra-check-item" style="${v?.bc?'opacity:.6;pointer-events:none':''}">
        <input type="checkbox" ${(v?.bc||d.bc)?'checked':''} onchange="setExtra('bc',this.checked)" ${v?.bc?'disabled':''}>
        <div>
          <div class="extra-name">Paket Broadcasting — Rp 80jt <span style="color:var(--muted)">(+200 kW)</span></div>
          <div class="extra-hint">${v?.bc?'Sudah termasuk di venue ini.':'Aktifkan live streaming online. Wajib untuk viewers online &amp; E-Sport.'}</div>
        </div>
      </label>
      <label class="extra-check-item" style="${!(v?.bc||d.bc)?'opacity:.4;pointer-events:none':''}">
        <input type="checkbox" ${d.streaming?'checked':''} onchange="setExtra('streaming',this.checked)" ${!(v?.bc||d.bc)?'disabled':''}>
        <div>
          <div class="extra-name">Streaming Upgrade — Rp 45jt <span style="color:var(--muted)">(+80 kW)</span></div>
          <div class="extra-hint">Penonton online ×1.2. Syarat: broadcasting aktif.</div>
        </div>
      </label>
    </div>

    <div class="section-card">
      <div class="section-title">🔋 Generator Tambahan
        ${G.eventCard?.id==='L01'?'<span class="tag tag-red" style="margin-left:6px">⚡ HARGA ×1.60!</span>':''}
      </div>
      ${buildSlider('gensetKecil',d.gensetKecil,0,2,`Genset Kecil (300 kW) — Rp ${gKCost}jt/unit`,'unit')}
      ${buildSlider('gensetBesar',d.gensetBesar,0,2,`Genset Besar (700 kW) — Rp ${gBCost}jt/unit`,'unit')}
    </div>
  `;
}

function renderAddonsTab(){
  const d=D();
  document.getElementById('tab-addons-content').innerHTML=`
    <div class="section-card">
      <div class="section-title">🎉 Panggung Hiburan</div>
      <label class="extra-check-item">
        <input type="checkbox" ${d.opening?'checked':''} onchange="setExtra('opening',this.checked)">
        <div>
          <div class="extra-name">Panggung Opening — Rp 60jt <span style="color:var(--muted)">(+150 kW)</span></div>
          <div class="extra-hint">Mendatangkan lebih banyak penonton offline ×${G.eventCard?.id==='A01'?'<span class="text-warn">1.30</span>':'1.10'}.</div>
        </div>
      </label>
      <label class="extra-check-item">
        <input type="checkbox" ${d.closing?'checked':''} onchange="setExtra('closing',this.checked)">
        <div>
          <div class="extra-name">Panggung Closing — Rp 50jt <span style="color:var(--muted)">(+100 kW)</span></div>
          <div class="extra-hint">Mendatangkan lebih banyak penonton offline ×1.08.</div>
        </div>
      </label>
    </div>

    <div class="section-card">
      <div class="section-title">🍔 Food & Beverage</div>
      <div style="font-size:11px;color:var(--muted);margin-bottom:10px">Catchment system: revenue dibatasi oleh jumlah penonton aktual.</div>
      ${buildSlider('foodStall',d.foodStall,0,999,'Food Stall — Rp 8jt/unit, rev maks Rp 15jt/unit (800 pax/unit)','unit')}
      ${''/* Food Truck removed — not in docs */}
    </div>

    <div class="section-card">
      <div class="section-title">🚌 Transportasi</div>
      ${buildSlider('shuttleBus',d.shuttleBus,0,999,'Shuttle Bus — Rp 18jt/rute, P.Off ×1.05 per rute','rute')}
    </div>

    <div class="section-card">
      <div class="section-title">🎪 Booth & Media</div>
      ${buildSlider('boothSponsor',d.boothSponsor,0,999,'Booth Sponsor — Rp 10jt/booth, rev Rp 30jt × saturasi (5.000 viewers/booth)','booth')}
      <label class="extra-check-item" style="margin-top:10px">
        <input type="checkbox" ${d.msa?'checked':''} onchange="setExtra('msa',this.checked)">
        <div>
          <div class="extra-name">Media Sosial Ads (MSA) — Rp 35jt</div>
          <div class="extra-hint">Penonton online ×1.15. Stack dengan Streaming untuk max online viewers.</div>
        </div>
      </label>
    </div>
  `;
}

function renderOpTab(){
  const d=D(); const v=V();
  const r=calc(d,G.phase===2?G.eventCard:null);
  const poff=r?r.poffSum:0;
  const tReq=poff>0?Math.ceil(poff/100):0;
  const sReq=poff>0?Math.max(10,Math.ceil(poff/200)):10;

  document.getElementById('tab-op-content').innerHTML=`
    <div class="section-card">
      <div class="section-title">🚽 Toilet Portable</div>
      <div style="font-size:12px;color:var(--muted);margin-bottom:10px">
        Bawaan venue: <strong class="text-primary">${v?v.toilets:0}</strong> unit
      </div>
      ${buildSlider('toilet10',d.toilet10,0,999,'Pak 10 unit — Rp 22jt/pak','pak')}
      ${buildSlider('toilet5',d.toilet5,0,999,'Pak 5 unit — Rp 12jt/pak','pak')}
    </div>

    <div class="section-card">
      <div class="section-title">🛡️ Petugas Keamanan</div>
      ${buildSlider('security',d.security,0,999,'Security 10-org — Rp 15jt/pak','pak')}
      ${buildSlider('securityVip',d.securityVip,0,999,'Security VIP 5-org — Rp 12jt/pak','pak')}
    </div>

    <div class="section-card">
      <div class="section-title">🏥 Tim Medis</div>
      <label class="extra-check-item">
        <input type="checkbox" ${d.medis?'checked':''} onchange="setExtra('medis',this.checked)">
        <div>
          <div class="extra-name">Tim Medis & P3K — Rp 25jt</div>
          <div class="extra-hint">Penanganan medis pertolongan pertama di lokasi event.</div>
        </div>
      </label>
      <label class="extra-check-item" style="margin-top:10px">
        <input type="checkbox" ${d.ambulans?'checked':''} onchange="setExtra('ambulans',this.checked)">
        <div>
          <div class="extra-name">Ambulans Siaga — Rp 20jt</div>
          <div class="extra-hint">Tambahan ambulans untuk kesiapan darurat.</div>
        </div>
      </label>
    </div>
  `;
}

function buildSlider(key,val,min,max,label,unit){
  return `<div class="form-group num-input-row" style="margin-bottom:14px">
    <label style="font-size:12px;color:var(--muted);font-weight:600">${label}</label>
    <div class="num-wrap">
      <button class="num-btn" onclick="setExtra('${key}',Math.max(${min},+(document.getElementById('ni-${key}').value||0)-1));document.getElementById('ni-${key}').value=D().${key}">−</button>
      <input type="number" id="ni-${key}" min="${min}" max="${max}" value="${val}"
        oninput="setExtra('${key}',+clamp(+this.value,${min},${max}));this.value=D().${key}">
      <button class="num-btn" onclick="setExtra('${key}',Math.min(${max},+(document.getElementById('ni-${key}').value||0)+1));document.getElementById('ni-${key}').value=D().${key}">+</button>
      <span class="num-unit">${unit}${max<100?` <span style="color:var(--muted);font-weight:400">/ maks ${max}</span>`:''}</span>
    </div>
  </div>`;
}

function setExtra(key,val){
  const d=D();
  if(key==='streaming'&&val&&!V()?.bc&&!d.bc){showToast('Aktifkan Broadcasting dulu!');return;}
  d[key]=val;
  // Re-render relevant tabs
  if(key==='bc'||key==='streaming'){renderListrikTab();renderCaborTab();}
  if(key==='opening'||key==='closing') renderAddonsTab();
  updatePreview();
}

function updatePreview(){
  const d=D();
  const v=V();
  // Assessment validity: NO calculated values shown to participant
  // Only show input summary
  setTxt('prev-venue', v ? v.name : '—');
  setTxt('prev-cabor-count', d.cabor.length);
  setTxt('prev-medis', d.medis ? '✅ Dibeli' : 'Belum');
}

function clearPreview(){
  const els=['preview-profit','prev-cost','prev-rev','prev-sisa','prev-poff','prev-pon','prev-viewers','prev-sponsor','prev-kw'];
  els.forEach(id=>{const e=document.getElementById(id);if(e)e.textContent='—';});
}

function setTxt(id,val){const e=document.getElementById(id);if(e)e.textContent=val;}

// ══════════════════════════════════════════════════════
// UI – SIMULATION
// ══════════════════════════════════════════════════════
function runSimulation(){
  const d=D(); const ec=G.phase===2?G.eventCard:null;
  const v=V();

  if(!d.venue){showToast('Pilih venue dulu!');return;}
  if(d.cabor.length<5){showToast(`Min 5 cabor — baru ${d.cabor.length} terpilih!`);return;}

  const r=calc(d,ec);
  const timeMin=elapsedMin();

  if(G.phase===1){
    G.p1r=r; G.p1time=timeMin;
    G.p1s=scorePhase(r,timeMin);
  } else {
    G.p2r=r; G.p2time=timeMin;
    const la=calcLA(ec,G.p1d,d,G.p1r,r);
    G.p2s=scoreWithEC(r,timeMin,la);
  }

  showScreen('simulation');
  document.getElementById('sim-subtitle').textContent=
    G.phase===1?'Menghitung konfigurasi event Anda…':'Menghitung hasil setelah adaptasi Event Card…';
  animateSim(r,v,d,ec);
}

function animateSim(r,v,d,ec){
  const steps=[
    {ico:'🏟',name:'Venue & Kapasitas',
     detail:`${v.name} — Listrik ${fmt(r.kWVenue)} kW | Toilet ${v.toilets} unit | BC: ${r.bcActive?'Aktif':'Tidak'}`,
     val:`Rp ${fmt(r.costVenue)} jt`},
    {ico:'⚽',name:'Cabang Olahraga',
     detail:`${d.cabor.length} cabor (${r.nIncompat} inkompatibel) — kW: ${fmt(r.kWCabor)}`,
     val:`Rp ${fmt(Math.round(r.costCabor))} jt`},
    {ico:'⚡',name:'Verifikasi Listrik',
     detail:`Pakai: ${fmt(r.kWTotal)} kW | Tersedia: ${fmt(r.kWAvail)} kW | Deficit: ${fmt(r.kWDeficit)} kW`,
     val:r.blackout?'❌ BLACKOUT':'✅ Aman'},
    {ico:'🚽',name:'Sanitasi & Keamanan',
     detail:`Toilet: ${r.toiletsTotal}/${r.toiletsReq} unit | Security: ${r.securityTotal}/${r.securityReq} org`,
     val:r.constraints.toilet&&r.constraints.security?'✅ OK':'❌ Kurang'},
    {ico:'💰',name:'Revenue',
     detail:`Tiket: ${fmt(Math.round(r.revTiket))} jt | Sponsor: ${fmt(r.revSponsor)} jt | F&B: ${fmt(Math.round(r.revFoodStall))} jt`,
     val:`Rp ${fmt(Math.round(r.totalRev))} jt`},
    {ico:'📊',name:'Profit Akhir',
     detail:`Revenue ${fmt(Math.round(r.totalRev))} jt − Cost ${fmt(Math.round(r.totalCost))} jt`,
     val:`${r.profit>=0?'+':''}${fmt(Math.round(r.profit))} jt`},
  ];

  const container=document.getElementById('sim-steps');
  container.innerHTML='';
  steps.forEach(s=>{
    container.insertAdjacentHTML('beforeend',`
      <div class="sim-step" id="ss-${s.ico}">
        <div class="ico">${s.ico}</div>
        <div class="info"><div class="name">${s.name}</div><div class="detail">${s.detail}</div></div>
        <div class="amount">${s.val}</div>
      </div>`);
  });

  document.getElementById('sim-totals').classList.remove('visible');
  document.getElementById('sim-next').style.display='none';

  let i=0;
  const tick=()=>{
    if(i<steps.length){
      const el=container.children[i];
      if(el){el.classList.add('running');setTimeout(()=>{el.classList.remove('running');el.classList.add('done');},350);}
      i++; setTimeout(tick,420);
    } else {
      const tot=document.getElementById('sim-totals');
      tot.innerHTML=`
        <div class="total-row"><span>Total Cost</span><span>Rp ${fmt(Math.round(r.totalCost))} jt</span></div>
        <div class="total-row"><span>Total Revenue</span><span>Rp ${fmt(Math.round(r.totalRev))} jt</span></div>
        <div class="total-row${r.profit<0?' neg':''}"><span>PROFIT</span><span>${fmtM(Math.round(r.profit))}</span></div>`;
      tot.classList.add('visible');
      setTimeout(()=>{
        document.getElementById('sim-next').style.display='block';
      },600);
    }
  };
  setTimeout(tick,300);
}

// ══════════════════════════════════════════════════════
// UI – RESULTS
// ══════════════════════════════════════════════════════
function showResults(){
  const r = G.phase===1 ? G.p1r : G.p2r;
  const s = G.phase===1 ? G.p1s : G.p2s;
  const d = G.phase===1 ? G.p1d : G.p2d;
  const ec= G.phase===2 ? G.eventCard : null;
  const isP2 = G.phase===2;

  document.getElementById('results-round-label').textContent=
    isP2?'Fase 2 — Dengan Event Card '+ec.e+' '+ec.name:'Fase 1 — Perencanaan Umum';

  // Score cards
  const cards=[
    {label:'Systems Thinking',val:isP2?s.st:s.st,max:isP2?20:25,cls:s.st>=(isP2?16:20)?'good':s.st<(isP2?8:10)?'bad':'warn',sub:`${Object.values(r.constraints).filter(Boolean).length}/6 constraint lulus`},
    {label:'Strategic Planning',val:isP2?s.sp:s.sp,max:isP2?20:25,cls:s.sp>=(isP2?15:20)?'good':s.sp<(isP2?8:10)?'bad':'warn',sub:`Margin ${r.margin.toFixed(1)}%`},
    {label:'Resource Stewardship',val:isP2?s.rs:s.rs,max:isP2?20:25,cls:s.rs>=(isP2?16:20)?'good':s.rs<(isP2?8:10)?'bad':'warn',sub:`RS Total ${r.totalRS}/25`},
    {label:'Decisiveness',val:s.dec,max:isP2?20:25,cls:s.dec>=(isP2?15:20)?'good':s.dec<(isP2?8:10)?'bad':'warn',sub:`Waktu: ${isP2?G.p2time.toFixed(1):G.p1time.toFixed(1)} mnt`},
  ];
  if(isP2){
    const la=s.la_detail;
    cards.push({label:'Learning Agility',val:s.la,max:20,cls:s.la>=16?'good':s.la<8?'bad':'warn',
      sub:`Diag:${la.diag}/8 Eff:${la.eff}/12 Int:${la.integ}/5`});
  }
  cards.push({label:'TOTAL SKOR',val:s.total,max:100,cls:s.total>=80?'good':s.total>=50?'warn':'bad',sub:gradeLabel(s.total)});

  document.getElementById('score-cards').innerHTML=cards.map(c=>`
    <div class="score-card ${c.cls}">
      <div class="s-label">${c.label}</div>
      <div class="s-value">${c.val}<span style="font-size:18px;font-weight:400;color:var(--muted)">/${c.max}</span></div>
      <div class="s-sub">${c.sub}</div>
    </div>`).join('');

  // Constraints
  const cItems=[
    {k:'listrik', label:'Listrik', detail:`${fmt(r.kWTotal)} kW dipakai / ${fmt(r.kWAvail)} kW tersedia`},
    {k:'toilet',  label:'Toilet',  detail:`${r.toiletsTotal} unit tersedia / ${r.toiletsReq} dibutuhkan`},
    {k:'security',label:'Security',detail:`${r.securityTotal} org / ${r.securityReq} dibutuhkan`},
    {k:'cabor',   label:'Cabor',   detail:`${r.nCompat} kompatibel dari ${d.cabor.length} terpilih`},
    {k:'medis',   label:'Medis',   detail:`Tim Medis: ${d.medis?'Dibeli':'BELUM DIBELI!'}`},
    {k:'budget',  label:'Budget',  detail:`Rp ${fmt(Math.round(r.totalCost))} / 3.000 jt`},
  ];
  document.getElementById('constraint-list').innerHTML=
    `<div class="section-title">Verifikasi 6 Constraint</div>`+
    cItems.map(c=>`<div class="c-item">
      <span>${c.label}: ${c.detail}</span>
      <span class="c-badge ${r.constraints[c.k]?'ok':'fail'}">${r.constraints[c.k]?'✅ LULUS':'❌ GAGAL'}</span>
    </div>`).join('');

  // Cost bars
  buildBars('cost-bars',[
    {label:'Venue',val:r.costVenue},
    {label:'Cabor',val:Math.round(r.costCabor)},
    {label:'Extras',val:Math.round(r.costExtras)},
  ],r.totalCost,'var(--danger)');

  buildBars('rev-bars',[
    {label:'Tiket',val:Math.round(r.revTiket)},
    {label:'Sponsor',val:r.revSponsor},
    {label:'F&B',val:Math.round(r.revFoodStall)},
    {label:'Booth',val:Math.round(r.revBooth)},
  ],r.totalRev,'var(--accent)');

  // RS detail
  buildRSBars('rs-bars',[
    {label:'Toilet',val:r.rs_toilet,hint:`Rasio: ${r.toiletsReq>0?(r.toiletsTotal/r.toiletsReq).toFixed(2)+'×':'N/A'}`},
    {label:'Security',val:r.rs_security,hint:`Rasio: ${(r.securityTotal/Math.max(r.securityReq,1)).toFixed(2)}×`},
    {label:'Listrik',val:r.rs_listrik,hint:`Deficit: ${fmt(r.kWDeficit)} kW, Genset: ${fmt(r.kWGenset)} kW`},
    {label:'Budget',val:r.rs_budget,hint:`Sisa: ${fmt(Math.round(3000-r.totalCost))} jt (${((3000-r.totalCost)/3000*100).toFixed(0)}%)`},
    {label:'F&B',val:r.rs_fb,hint:`Catchment ratio: ${r.catchRatio.toFixed(2)}×`},
  ]);

  // Assessment
  buildAssessment(r,d,ec);

  // Next button — always go to final report (Event Card disabled)
  const btn=document.getElementById('next-round-btn');
  btn.textContent='Lihat Laporan Akhir →';
  btn.onclick=showFinalReport;

  // Radar
  const labels=['ST','SP','RS','Dec'];
  const maxV=isP2?20:25;
  const vals=isP2?[s.st,s.sp,s.rs,s.dec]:[s.st,s.sp,s.rs,s.dec];
  if(isP2){labels.push('LA');vals.push(s.la);}
  drawRadar(document.getElementById('radar-canvas'),vals,labels,maxV);

  showScreen('results');
}

function buildBars(id,items,total,color){
  const el=document.getElementById(id);
  if(!el) return;
  el.innerHTML=items.map(it=>{
    const pct=total>0?Math.min(100,it.val/total*100):0;
    return `<div class="bar-row">
      <div class="bar-label">${it.label}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${pct}%;background:${color}">${fmt(it.val)} jt</div></div>
    </div>`;
  }).join('');
}

function buildRSBars(id,items){
  const el=document.getElementById(id);
  if(!el) return;
  el.innerHTML=items.map(it=>{
    const col=it.val>=5?'var(--accent)':it.val>=3?'var(--warn)':'var(--danger)';
    return `<div class="comp-row">
      <div class="comp-label">${it.label}</div>
      <div class="comp-track"><div class="comp-fill" style="width:${it.val/5*100}%;background:${col}">${it.val}/5</div></div>
      <div style="font-size:11px;color:var(--muted);margin-left:8px">${it.hint}</div>
    </div>`;
  }).join('');
}

function buildAssessment(r,d,ec){
  const strengths=[],weaknesses=[];
  if(r.constraints.listrik) strengths.push('Kapasitas listrik terpenuhi dengan baik.');
  else weaknesses.push('BLACKOUT — kapasitas listrik tidak mencukupi. Revenue hilang!');
  if(r.constraints.toilet) strengths.push(`Toilet cukup (${r.toiletsTotal}/${r.toiletsReq} unit).`);
  else weaknesses.push(`Toilet kurang — hanya ${r.toiletsTotal}, butuh ${r.toiletsReq} unit.`);
  if(r.constraints.security) strengths.push(`Security mencukupi (${r.securityTotal}/${r.securityReq} org).`);
  else weaknesses.push(`Security kurang — hanya ${r.securityTotal}, butuh ${r.securityReq} org.`);
  if(r.constraints.cabor) strengths.push(`${d.cabor.length} cabor kompatibel semua — constraint terpenuhi.`);
  else weaknesses.push(`${r.nIncompat} cabor inkompatibel — biaya dikenakan tanpa revenue!`);
  if(r.constraints.medis) strengths.push('Tim Medis dibeli — constraint wajib terpenuhi.');
  else weaknesses.push('Tim Medis TIDAK dibeli — constraint wajib gagal!');
  if(r.profit>0) strengths.push(`Profit positif: Rp ${fmt(Math.round(r.profit))} jt (margin ${r.margin.toFixed(1)}%).`);
  else weaknesses.push(`Rugi: Rp ${fmt(Math.round(Math.abs(r.profit)))} jt. Revenue tidak menutup biaya.`);
  if(r.rs_listrik===5&&r.kWDeficit===0) strengths.push('Keputusan listrik sempurna — tidak perlu genset, tidak beli.');
  if(r.rs_fb>=4) strengths.push(`F&B efisien — catchment ratio ${r.catchRatio.toFixed(2)}×.`);
  if(r.rs_fb===0) weaknesses.push('F&B tidak efisien sama sekali — alokasi fatal.');
  if(ec?.id==='C01'&&(d.venue==='v1'||d.venue==='v3')) weaknesses.push('Event Card Cuaca aktif — penonton outdoor turun 40%.');
  if(ec?.id==='S01') weaknesses.push('Sponsor Mundur — revenue sponsor turun 1 tier.');

  document.getElementById('strengths-list').innerHTML=strengths.map(s=>`<div class="strength-item">${s}</div>`).join('');
  document.getElementById('weaknesses-list').innerHTML=weaknesses.map(w=>`<div class="weakness-item">${w}</div>`).join('');
}

function gradeLabel(score){
  if(score>=80) return '🏆 Grade A — Sangat Baik';
  if(score>=65) return '🥈 Grade B — Baik';
  if(score>=50) return '🥉 Grade C — Cukup';
  if(score>=35) return '📉 Grade D — Kurang';
  return '❌ Grade E — Perlu Perbaikan';
}

// ══════════════════════════════════════════════════════
// UI – EVENT CARD GACHA
// ══════════════════════════════════════════════════════
function showEventCard(){
  G.phase=2;
  showScreen('event-card');
  document.getElementById('draw-result').style.display='none';
  document.getElementById('draw-btn').style.display='inline-block';
  document.getElementById('adapt-btn').style.display='none';
  // Reset card display
  document.querySelectorAll('.gacha-card').forEach(c=>{c.classList.remove('flipped','selected');});
}

function drawCard(){
  document.getElementById('draw-btn').style.display='none';
  const idx=Math.floor(Math.random()*C.eventCards.length);
  G.eventCard=C.eventCards[idx];

  // Animate cards
  const cards=document.querySelectorAll('.gacha-card');
  let delay=0;
  cards.forEach((c,i)=>{
    setTimeout(()=>c.classList.add('flipped'),delay);
    delay+=120;
  });

  setTimeout(()=>{
    cards[idx].classList.add('selected');
    showDrawResult(G.eventCard);
  },delay+200);
}

function showDrawResult(ec){
  const el=document.getElementById('draw-result');
  el.style.display='block';
  el.innerHTML=`
    <div class="ec-reveal" style="border-color:${ec.color};background:${ec.color}22">
      <div class="ec-reveal-emoji">${ec.e}</div>
      <div class="ec-reveal-name">${ec.name}</div>
      <div class="ec-reveal-desc">${ec.desc}</div>
      <div class="ec-reveal-hint"><strong>Petunjuk Adaptasi:</strong> ${ec.adapt}</div>
      <div class="ec-targets">
        <div style="font-size:12px;font-weight:700;color:var(--warn);margin-bottom:6px">Target LA Diagnosis:</div>
        ${ec.targets.map((t,i)=>`<div class="ec-target-item">① ${t}</div>`).join('')}
      </div>
    </div>`;
  document.getElementById('adapt-btn').style.display='inline-block';
}

function startAdapt(){
  // Copy P1 decisions to P2
  G.p2d=JSON.parse(JSON.stringify(G.p1d));
  G.startTime=Date.now(); // reset timer for P2
  currentTab='venue';
  buildPlanning();
  showScreen('planning');
}

// ══════════════════════════════════════════════════════
// UI – FINAL REPORT
// ══════════════════════════════════════════════════════
function showFinalReport(){
  const s1=G.p1s, s2=G.p2s;
  const ec=G.eventCard;

  document.getElementById('final-score').textContent=s2?s2.total:s1.total;
  document.getElementById('grade-label').textContent=gradeLabel(s2?s2.total:s1.total);

  // Final competency table
  document.getElementById('final-table').innerHTML=`
    <table class="final-comp-table">
      <thead><tr><th>Kompetensi</th><th>Fase 1 (/25)</th>${ec?'<th>Fase 2 (/20)</th>':''}</tr></thead>
      <tbody>
        <tr><td>Systems Thinking</td><td>${s1.st}</td>${ec?`<td>${s2.st}</td>`:''}</tr>
        <tr><td>Strategic Planning</td><td>${s1.sp}</td>${ec?`<td>${s2.sp}</td>`:''}</tr>
        <tr><td>Resource Stewardship</td><td>${s1.rs}</td>${ec?`<td>${s2.rs}</td>`:''}</tr>
        <tr><td>Decisiveness</td><td>${s1.dec}</td>${ec?`<td>${s2.dec}</td>`:''}</tr>
        ${ec?`<tr><td>Learning Agility</td><td>—</td><td>${s2.la}</td></tr>`:''}
        <tr style="font-weight:700;font-size:16px"><td>TOTAL</td><td>${s1.total}/100</td>${ec?`<td>${s2.total}/100</td>`:''}</tr>
      </tbody>
    </table>`;

  if(ec){
    document.getElementById('la-detail-box').style.display='block';
    const la=s2.la_detail;
    document.getElementById('la-detail').innerHTML=`
      <div class="section-title">Learning Agility Detail — ${ec.e} ${ec.name}</div>
      <div class="c-item"><span>① Diagnosis (target variabel tepat)</span><span class="c-badge ${la.diag>=4?'ok':'fail'}">${la.diag}/8</span></div>
      <div class="c-item"><span>② Efisiensi Relatif (net revenue delta)</span><span class="c-badge ${la.eff>=8?'ok':'fail'}">${la.eff}/12</span></div>
      <div class="c-item"><span>③ Constraint Integrity (delta n_pass)</span><span class="c-badge ${la.integ>=3?'ok':'fail'}">${la.integ}/5</span></div>
      <div class="c-item" style="font-weight:700"><span>Total LA (×0.8 = ${Math.round(la.total*0.8)} poin final)</span><span class="c-badge ok">${la.total}/25</span></div>`;
  } else {
    document.getElementById('la-detail-box').style.display='none';
  }

  // Final radar
  const labels=['ST','SP','RS','Dec'];
  const vals=s2?[s2.st,s2.sp,s2.rs,s2.dec]:[s1.st,s1.sp,s1.rs,s1.dec];
  if(s2){labels.push('LA');vals.push(s2.la);}
  const maxV=s2?20:25;
  drawRadar(document.getElementById('final-radar'),vals,labels,maxV);

  document.getElementById('final-p2-heading').style.display=ec?'block':'none';
  document.querySelectorAll('.final-ec-note').forEach(e=>e.style.display=ec?'block':'none');
  document.getElementById('final-phase-label').textContent=
    ec?`Skor Fase 1: ${s1.total}/100  |  Skor Fase 2 (${ec.name}): ${s2?s2.total:'—'}/100`
      :'Skor Fase 1 (tanpa Event Card)';

  renderCalcLog();
  showScreen('final');
}

function restartGame(){
  if(timerInterval) clearInterval(timerInterval);
  G={phase:1,eventCard:null,startTime:null,p1time:0,p2time:0,p1d:makeDecisions(),p2d:makeDecisions(),p1r:null,p2r:null,p1s:null,p2s:null};
  buildBriefing();
  showScreen('briefing');
}

// ══════════════════════════════════════════════════════
// RADAR CHART
// ══════════════════════════════════════════════════════
function drawRadar(canvas,vals,labels,maxVal){
  if(!canvas) return;
  const ctx=canvas.getContext('2d');
  const W=canvas.width,H=canvas.height;
  const cx=W/2,cy=H/2,r=Math.min(cx,cy)-32;
  const n=vals.length;
  ctx.clearRect(0,0,W,H);

  // Grid
  ctx.strokeStyle='rgba(214,204,232,.8)';ctx.lineWidth=1;
  [0.25,0.5,0.75,1].forEach(f=>{
    ctx.beginPath();
    for(let i=0;i<n;i++){
      const a=Math.PI*2*i/n-Math.PI/2;
      const x=cx+r*f*Math.cos(a),y=cy+r*f*Math.sin(a);
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    }
    ctx.closePath();ctx.stroke();
  });

  // Axes
  for(let i=0;i<n;i++){
    const a=Math.PI*2*i/n-Math.PI/2;
    ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a));
    ctx.strokeStyle='rgba(214,204,232,.8)';ctx.stroke();
  }

  // Data
  ctx.beginPath();
  vals.forEach((v,i)=>{
    const a=Math.PI*2*i/n-Math.PI/2,f=v/maxVal;
    const x=cx+r*f*Math.cos(a),y=cy+r*f*Math.sin(a);
    i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
  });
  ctx.closePath();
  ctx.fillStyle='rgba(118,173,254,.22)';ctx.fill();
  ctx.strokeStyle='var(--primary)';ctx.lineWidth=2;ctx.stroke();

  // Labels
  ctx.fillStyle='var(--text)';ctx.font='bold 11px var(--font)';ctx.textAlign='center';ctx.textBaseline='middle';
  labels.forEach((l,i)=>{
    const a=Math.PI*2*i/n-Math.PI/2;
    const d=r+20;
    ctx.fillText(l,cx+d*Math.cos(a),cy+d*Math.sin(a));
  });
}

// ══════════════════════════════════════════════════════
// EXPORT CSV
// ══════════════════════════════════════════════════════
function exportCSV(){
  if(!G.p1r || !G.p1s){ showToast('Jalankan simulasi dulu sebelum export.'); return; }

  const rows=[];
  const row=(...cols)=>rows.push(cols.map(c=>{
    const s=String(c??'');
    return (s.includes(',')||s.includes('"')||s.includes('\n'))
      ?'"'+s.replace(/"/g,'""')+'"':s;
  }).join(','));
  const sep=t=>{rows.push('');row('=== '+t+' ===');};

  const p1d=G.p1d,p1r=G.p1r,p1s=G.p1s;
  const p2d=G.p2d,p2r=G.p2r,p2s=G.p2s;
  const ec=G.eventCard;
  const hasP2=!!(ec&&p2r&&p2s);

  // A. IDENTITAS
  sep('A. IDENTITAS');
  row('Venue',p1d.venue?C.venues[p1d.venue].name:'—');
  row('Sub Venue',p1d.venue?C.venues[p1d.venue].sub:'—');
  row('Fase Dimainkan',hasP2?'Phase 1 + Phase 2 (Event Card)':'Phase 1 Only');
  row('Event Card',ec?ec.e+' '+ec.name:'—');
  row('Waktu Planning P1 (mnt)',G.p1time.toFixed(1));

  // B. CABOR DIPILIH
  sep('B. CABOR DIPILIH');
  row('Cabang Olahraga','kW','Biaya Base (jt)','Tiket (rb)','pBase','oBase','Compat P1',hasP2?'Compat P2':'');
  p1r.caborDetails.forEach(cd=>{
    const c=C.cabor.find(x=>x.id===cd.id);
    const p2cd=hasP2?p2r.caborDetails.find(x=>x.id===cd.id):null;
    row(cd.name,c.kW,c.biaya,c.tiket,c.pBase,c.oBase,
      cd.compat?'Kompatibel':'Inkompatibel',
      p2cd?(p2cd.compat?'Kompatibel':'Inkompatibel'):'');
  });
  row('Total Cabor Dipilih',p1d.cabor.length,hasP2?p2d.cabor.length:'');
  row('Cabor Kompatibel',p1r.nCompat,hasP2?p2r.nCompat:'');
  row('Cabor Inkompatibel',p1r.nIncompat,hasP2?p2r.nIncompat:'');

  // C. LISTRIK
  sep('C. LISTRIK');
  row('','Fase 1',hasP2?'Fase 2':'');
  row('kW Cabor',p1r.kWCabor,hasP2?p2r.kWCabor:'');
  row('kW Extras',p1r.kWExtras,hasP2?p2r.kWExtras:'');
  row('kW Total Digunakan',p1r.kWTotal,hasP2?p2r.kWTotal:'');
  row('kW Venue',p1r.kWVenue,hasP2?p2r.kWVenue:'');
  row('kW Genset',p1r.kWGenset,hasP2?p2r.kWGenset:'');
  row('kW Tersedia (Venue+Genset)',p1r.kWAvail,hasP2?p2r.kWAvail:'');
  row('kW Deficit',p1r.kWDeficit,hasP2?p2r.kWDeficit:'');
  row('Blackout',p1r.blackout?'YA':'Tidak',hasP2?(p2r.blackout?'YA':'Tidak'):'');

  // D. OPERASIONAL
  sep('D. OPERASIONAL');
  row('','Fase 1',hasP2?'Fase 2':'');
  row('Genset Kecil (unit)',p1d.gensetKecil,hasP2?p2d.gensetKecil:'');
  row('Genset Besar (unit)',p1d.gensetBesar,hasP2?p2d.gensetBesar:'');
  row('Toilet 5-unit (set)',p1d.toilet5,hasP2?p2d.toilet5:'');
  row('Toilet 10-unit (set)',p1d.toilet10,hasP2?p2d.toilet10:'');
  row('Toilet Total (unit)',p1r.toiletsTotal,hasP2?p2r.toiletsTotal:'');
  row('Toilet Dibutuhkan',p1r.toiletsReq,hasP2?p2r.toiletsReq:'');
  row('Security 10-org (regu)',p1d.security,hasP2?p2d.security:'');
  row('Security VIP 5-org (regu)',p1d.securityVip,hasP2?p2d.securityVip:'');
  row('Security Total (org)',p1r.securityTotal,hasP2?p2r.securityTotal:'');
  row('Security Dibutuhkan',p1r.securityReq,hasP2?p2r.securityReq:'');
  row('Tim Medis',p1d.medis?'Dibeli':'Tidak',hasP2?(p2d.medis?'Dibeli':'Tidak'):'');
  row('Ambulans Siaga',p1d.ambulans?'Dibeli':'Tidak',hasP2?(p2d.ambulans?'Dibeli':'Tidak'):'');
  row('Shuttle Bus (rute)',p1d.shuttleBus,hasP2?p2d.shuttleBus:'');

  // E. ADD-ONS & EXTRAS
  sep('E. ADD-ONS & EXTRAS');
  row('','Fase 1',hasP2?'Fase 2':'');
  row('Broadcasting Paket',p1d.bc?'Ya':'Tidak',hasP2?(p2d.bc?'Ya':'Tidak'):'');
  row('Broadcasting Built-in Venue',C.venues[p1d.venue]?.bc?'Ya':'Tidak',hasP2?(C.venues[p2d.venue]?.bc?'Ya':'Tidak'):'');
  row('Streaming Upgrade',p1d.streaming?'Ya':'Tidak',hasP2?(p2d.streaming?'Ya':'Tidak'):'');
  row('Opening Ceremony',p1d.opening?'Ya':'Tidak',hasP2?(p2d.opening?'Ya':'Tidak'):'');
  row('Closing Ceremony',p1d.closing?'Ya':'Tidak',hasP2?(p2d.closing?'Ya':'Tidak'):'');
  row('Food Stall (unit)',p1d.foodStall,hasP2?p2d.foodStall:'');
  row('Shuttle Bus (rute)',p1d.shuttleBus,hasP2?p2d.shuttleBus:'');
  row('Booth Sponsor (unit)',p1d.boothSponsor,hasP2?p2d.boothSponsor:'');
  row('Ambulans Siaga',p1d.ambulans?'Ya':'Tidak',hasP2?(p2d.ambulans?'Ya':'Tidak'):'');
  row('MSA (Media Sosial Ads)',p1d.msa?'Ya':'Tidak',hasP2?(p2d.msa?'Ya':'Tidak'):'');

  // F. KALKULASI OTOMATIS
  sep('F. KALKULASI OTOMATIS (Rp Juta)');
  row('','Fase 1',hasP2?'Fase 2':'');
  row('Penonton Offline',Math.round(p1r.poffSum),hasP2?Math.round(p2r.poffSum):'');
  row('Penonton Online',Math.round(p1r.ponSum),hasP2?Math.round(p2r.ponSum):'');
  row('Total Viewers',Math.round(p1r.totalViewers),hasP2?Math.round(p2r.totalViewers):'');
  row('Sponsor Tier',C.sponsorTiers[p1r.sponsorIdx].tier,hasP2?C.sponsorTiers[p2r.sponsorIdx].tier:'');
  row('Revenue Tiket',Math.round(p1r.revTiket),hasP2?Math.round(p2r.revTiket):'');
  row('Revenue Sponsor',p1r.revSponsor,hasP2?p2r.revSponsor:'');
  row('Revenue Food Stall',Math.round(p1r.revFoodStall),hasP2?Math.round(p2r.revFoodStall):'');
  row('Security VIP (unit)',p1d.securityVip,hasP2?p2d.securityVip:'');
  row('Revenue Booth',Math.round(p1r.revBooth),hasP2?Math.round(p2r.revBooth):'');
  row('TOTAL REVENUE',Math.round(p1r.totalRev),hasP2?Math.round(p2r.totalRev):'');
  row('Biaya Venue',p1r.costVenue,hasP2?p2r.costVenue:'');
  row('Biaya Cabor',Math.round(p1r.costCabor),hasP2?Math.round(p2r.costCabor):'');
  row('Biaya Extras',Math.round(p1r.costExtras),hasP2?Math.round(p2r.costExtras):'');
  row('TOTAL COST',Math.round(p1r.totalCost),hasP2?Math.round(p2r.totalCost):'');
  row('PROFIT',Math.round(p1r.profit),hasP2?Math.round(p2r.profit):'');
  row('Margin (%)',p1r.margin.toFixed(1),hasP2?p2r.margin.toFixed(1):'');

  // G. 6 CONSTRAINT
  sep('G. 6 CONSTRAINT');
  row('Constraint','Fase 1',hasP2?'Fase 2':'');
  [['listrik','Listrik'],['toilet','Toilet'],['security','Security'],
   ['cabor','Cabor'],['medis','Tim Medis'],['budget','Budget']].forEach(([k,n])=>{
    row(n,p1r.constraints[k]?'LULUS':'GAGAL',hasP2?(p2r.constraints[k]?'LULUS':'GAGAL'):'');
  });
  row('Jumlah Constraint Lulus (n_pass)',p1r.nPass,hasP2?p2r.nPass:'');

  // H. RESOURCE STEWARDSHIP
  sep('H. RESOURCE STEWARDSHIP DETAIL (/5 per sub)');
  row('Sub-komponen','Fase 1','Maks',hasP2?'Fase 2':'');
  row('Toilet (rasio)',p1r.rs_toilet,5,hasP2?p2r.rs_toilet:'');
  row('Security (rasio)',p1r.rs_security,5,hasP2?p2r.rs_security:'');
  row('Listrik (genset decision)',p1r.rs_listrik,5,hasP2?p2r.rs_listrik:'');
  row('Budget (sisa)',p1r.rs_budget,5,hasP2?p2r.rs_budget:'');
  row('F&B (catchment)',p1r.rs_fb,5,hasP2?p2r.rs_fb:'');
  row('TOTAL RS',p1r.totalRS,25,hasP2?p2r.totalRS:'');
  row('Catchment Ratio',p1r.catchRatio.toFixed(2),'',hasP2?p2r.catchRatio.toFixed(2):'');
  row('Toilet Ratio',p1r.toiletsReq>0?(p1r.toiletsTotal/p1r.toiletsReq).toFixed(2):'N/A','',
    hasP2?(p2r.toiletsReq>0?(p2r.toiletsTotal/p2r.toiletsReq).toFixed(2):'N/A'):'');
  row('Security Ratio',(p1r.securityTotal/Math.max(p1r.securityReq,1)).toFixed(2),'',
    hasP2?(p2r.securityTotal/Math.max(p2r.securityReq,1)).toFixed(2):'');

  // I. SKOR FASE 1
  sep('I. SKOR FASE 1 (/100)');
  row('Kompetensi','Skor','Maks');
  row('Systems Thinking (n_pass constraint)',p1s.st,25);
  row('Strategic Planning (margin %)',p1s.sp,25);
  row('Resource Stewardship',p1s.rs,25);
  row('Decisiveness (waktu × n_pass)',p1s.dec,25);
  row('TOTAL FASE 1',p1s.total,100);
  row('Grade',gradeLabel(p1s.total).replace(/[🏆🥈🥉📉❌]/g,'').trim());

  if(hasP2){
    // J. EVENT CARD
    sep('J. EVENT CARD');
    row('Kartu',ec.e+' '+ec.name);
    row('Deskripsi',ec.desc);
    row('Target Adaptasi 1',ec.targets[0]);
    row('Target Adaptasi 2',ec.targets[1]);

    // K. PERUBAHAN KEPUTUSAN P1 → P2
    sep('K. PERUBAHAN KEPUTUSAN P1 → P2');
    row('Parameter','Fase 1','Fase 2','Delta');
    const numChg=(lbl,v1,v2)=>row(lbl,v1,v2,v2-v1>0?'+'+(v2-v1):String(v2-v1));
    const boolChg=(lbl,v1,v2)=>row(lbl,v1?'Ya':'Tidak',v2?'Ya':'Tidak',v1===v2?'—':(v1?'Ya→Tidak':'Tidak→Ya'));
    numChg('Genset Kecil',p1d.gensetKecil,p2d.gensetKecil);
    numChg('Genset Besar',p1d.gensetBesar,p2d.gensetBesar);
    numChg('Toilet 5-unit',p1d.toilet5,p2d.toilet5);
    numChg('Toilet 10-unit',p1d.toilet10,p2d.toilet10);
    numChg('Security (regu)',p1d.security,p2d.security);
    numChg('Food Stall',p1d.foodStall,p2d.foodStall);
    numChg('Shuttle Bus',p1d.shuttleBus,p2d.shuttleBus);
    numChg('Security VIP',p1d.securityVip,p2d.securityVip);
    numChg('Booth Sponsor',p1d.boothSponsor,p2d.boothSponsor);
    boolChg('Streaming Upgrade',p1d.streaming,p2d.streaming);
    boolChg('MSA',p1d.msa,p2d.msa);
    boolChg('Ambulans Siaga',p1d.ambulans,p2d.ambulans);
    boolChg('Opening Ceremony',p1d.opening,p2d.opening);
    boolChg('Closing Ceremony',p1d.closing,p2d.closing);

    // M. LEARNING AGILITY
    sep('M. LEARNING AGILITY DETAIL');
    const la=p2s.la_detail;
    row('Sub-komponen','Skor Raw','Maks','Skor ×0.8');
    row('Diagnosis (target variabel tepat)',la.diag,8,Math.round(la.diag*0.8));
    row('Efisiensi Relatif (net rev delta)',la.eff,12,Math.round(la.eff*0.8));
    row('Constraint Integrity (delta n_pass)',la.integ,5,Math.round(la.integ*0.8));
    row('TOTAL LA',la.total,25,Math.round(la.total*0.8));

    // N. SKOR FASE 2
    sep('N. SKOR FASE 2 (/100 — semua ×0.8)');
    row('Kompetensi','Skor Raw (/25)','Skor ×0.8 (/20)');
    row('Systems Thinking',p2s.raw.st,p2s.st);
    row('Strategic Planning',p2s.raw.sp,p2s.sp);
    row('Resource Stewardship',p2s.raw.rs,p2s.rs);
    row('Decisiveness',p2s.raw.dec,p2s.dec);
    row('Learning Agility',la.total,p2s.la);
    row('TOTAL FASE 2','—',p2s.total);
    row('Grade',gradeLabel(p2s.total).replace(/[🏆🥈🥉📉❌]/g,'').trim());
    rows.push('');
    row('Perbandingan','Fase 1','Fase 2');
    row('Total Skor',p1s.total,p2s.total);
    row('Profit (Rp jt)',Math.round(p1r.profit),Math.round(p2r.profit));
    row('n_pass Constraint',p1r.nPass,p2r.nPass);
    row('Total Viewers',Math.round(p1r.totalViewers),Math.round(p2r.totalViewers));
  }

  const csv='\uFEFF'+rows.join('\r\n');
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8;'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url; a.download='level-up-score.csv'; a.click();
  URL.revokeObjectURL(url);
  showToast('CSV berhasil didownload!');
}

// ══════════════════════════════════════════════════════
// CALCULATOR
// ══════════════════════════════════════════════════════
let calcState={cur:'0',prev:null,op:null,fresh:true};

function toggleCalc(){
  const p=document.getElementById('calc-panel');
  const fab=document.getElementById('fab-calc');
  if(p.style.display==='none'){
    p.style.display='block'; fab.classList.add('active');
    document.getElementById('notes-panel').style.display='none';
    document.getElementById('fab-notes').classList.remove('active');
  } else {
    p.style.display='none'; fab.classList.remove('active');
  }
}

function toggleNotes(){
  const p=document.getElementById('notes-panel');
  const fab=document.getElementById('fab-notes');
  if(p.style.display==='none'){
    p.style.display='block'; fab.classList.add('active');
    document.getElementById('calc-panel').style.display='none';
    document.getElementById('fab-calc').classList.remove('active');
  } else {
    p.style.display='none'; fab.classList.remove('active');
  }
}

function calcKey(k){
  const disp=document.getElementById('calc-display');
  const hist=document.getElementById('calc-history');
  const s=calcState;

  if(k==='C'){
    s.cur='0';s.prev=null;s.op=null;s.fresh=true;
    hist.textContent='';
    disp.textContent='0'; return;
  }
  if(k==='±'){
    if(s.cur!=='0') s.cur=s.cur.startsWith('-')?s.cur.slice(1):'-'+s.cur;
    disp.textContent=s.cur; return;
  }
  if(k==='%'){
    s.cur=String(parseFloat(s.cur)/100);
    disp.textContent=s.cur; return;
  }
  if('0123456789'.includes(k)){
    if(s.fresh){s.cur=k;s.fresh=false;}
    else s.cur+=k;
    disp.textContent=s.cur; return;
  }
  if(k==='.'){
    if(s.fresh){s.cur='0.';s.fresh=false;}
    else if(!s.cur.includes('.')) s.cur+='.';
    disp.textContent=s.cur; return;
  }
  if('+-×÷'.includes(k)){
    if(s.op&&!s.fresh) calcExec();
    s.prev=parseFloat(s.cur); s.op=k; s.fresh=true;
    hist.textContent=`${s.prev} ${k}`;
    return;
  }
  if(k==='='){
    if(s.op) calcExec();
    hist.textContent=''; s.op=null; s.prev=null;
  }
}

function calcExec(){
  const s=calcState;
  const a=s.prev, b=parseFloat(s.cur);
  let r=0;
  switch(s.op){
    case '+':r=a+b;break;case '-':r=a-b;break;
    case '×':r=a*b;break;case '÷':r=b!==0?a/b:0;break;
  }
  // Round to avoid floating point issues
  r=Math.round(r*1e10)/1e10;
  s.cur=String(r); s.fresh=true; s.prev=r;
  document.getElementById('calc-display').textContent=s.cur;
  document.getElementById('calc-history').textContent='';
}

// Show/hide floating tools when entering/leaving planning
function showFloatTools(show){
  document.getElementById('float-tools').style.display=show?'flex':'none';
  if(!show){
    document.getElementById('calc-panel').style.display='none';
    document.getElementById('notes-panel').style.display='none';
    document.getElementById('fab-calc').classList.remove('active');
    document.getElementById('fab-notes').classList.remove('active');
  }
}

// ══════════════════════════════════════════════════════
// CALCULATION LOG (QA)
// ══════════════════════════════════════════════════════
function buildCalcLog(){
  const lines=[];
  const ln=(...args)=>lines.push(args.join(''));
  const sep=t=>{ln('');ln('════════════════════════════════════════');ln(t);ln('════════════════════════════════════════');};
  const f=(n,d=0)=>Number(n).toLocaleString('id-ID',{minimumFractionDigits:d,maximumFractionDigits:d});

  const p1d=G.p1d, p1r=G.p1r, p1s=G.p1s;
  const p2d=G.p2d, p2r=G.p2r, p2s=G.p2s;
  const ec=G.eventCard;
  const hasP2=!!(ec&&p2r&&p2s);

  if(!p1r||!p1s){return 'Belum ada data simulasi.';}

  const v=C.venues[p1d.venue];

  // ── FASE 1 LOG ──
  sep('FASE 1 — LOG PERHITUNGAN');
  ln('Venue: ',v.name,' (',v.sub,')');
  ln('  Sewa       = Rp ',f(v.cost),' jt');
  ln('  Listrik    = ',f(v.kW),' kW');
  ln('  Toilet     = ',v.toilets,' unit');
  ln('  BC built-in= ',v.bc?'Ya':'Tidak');
  ln('  Max Offline= ',f(v.maxOff),' pax');
  ln('  Rasio: cabor=',v.r.cabor,'× | off=',v.r.off,'× | rev=',v.r.rev,'×');

  buildCalcLogPhase(lines, p1d, p1r, p1s, null, v, 'Fase 1');

  if(hasP2){
    sep('FASE 2 — LOG PERHITUNGAN (Event Card: '+ec.e+' '+ec.name+')');
    ln('Event Card: ',ec.desc);
    buildCalcLogPhase(lines, p2d, p2r, p2s, ec, v, 'Fase 2');

    // LA detail
    sep('LEARNING AGILITY DETAIL');
    const la=p2s.la_detail;
    ln('Diagnosis: ',la.diag,'/8');
    switch(ec.id){
      case 'C01':
        ln('  C01: Hujan Lebat → cek toilet & security tidak naik');
        ln('  P1 toilet packs=',p1d.toilet5+p1d.toilet10,' → P2=',p2d.toilet5+p2d.toilet10,(p2d.toilet5+p2d.toilet10<=p1d.toilet5+p1d.toilet10)?' ✓ Benar':' ✗ Salah naik');
        ln('  P1 security=',p1d.security,' → P2=',p2d.security,(p2d.security<=p1d.security)?' ✓ Benar':' ✗ Salah naik');
        break;
      case 'S01':
        ln('  S01: Sponsor Mundur → naikkan viewers ATAU kurangi cost');
        ln('  Viewers: P1=',Math.round(p1r.totalViewers),' → P2=',Math.round(p2r.totalViewers),(p2r.totalViewers>p1r.totalViewers)?' ✓':' ✗');
        ln('  Cost: P1=',Math.round(p1r.totalCost),' → P2=',Math.round(p2r.totalCost),(p2r.totalCost<p1r.totalCost)?' ✓':' ✗');
        break;
      case 'L01':
        ln('  L01: Krisis Generator → verifikasi deficit dulu');
        ln('  P1 deficit=',p1r.kWDeficit,' kW',(p1r.kWDeficit>0)?'(ADA deficit)':'(TIDAK ada deficit)');
        ln('  P2 genset dibeli=',(p2d.gensetKecil+p2d.gensetBesar),' unit');
        break;
      case 'A01':
        ln('  A01: Artis Viral → update toilet & security');
        ln('  P2 toilet: ',p2r.toiletsTotal,'/',p2r.toiletsReq,(p2r.toiletsTotal>=p2r.toiletsReq)?' ✓':' ✗');
        ln('  P2 security: ',p2r.securityTotal,'/',p2r.securityReq,(p2r.securityTotal>=p2r.securityReq)?' ✓':' ✗');
        break;
      case 'K01':
        ln('  K01: Kuota Bertambah → update toilet & security');
        ln('  P2 toilet: ',p2r.toiletsTotal,'/',p2r.toiletsReq,(p2r.toiletsTotal>=p2r.toiletsReq)?' ✓':' ✗');
        ln('  P2 security: ',p2r.securityTotal,'/',p2r.securityReq,(p2r.securityTotal>=p2r.securityReq)?' ✓':' ✗');
        break;
    }
    ln('Efisiensi: ',la.eff,'/12');
    const dRev=p2r.totalRev-p1r.totalRev;
    const dCost=Math.max(0,p2r.totalCost-p1r.totalCost);
    const net=dRev-dCost;
    const pct=p1r.totalRev>0?net/p1r.totalRev*100:0;
    ln('  ΔRevenue  = ',f(Math.round(dRev)),' jt');
    ln('  ΔCost     = ',f(Math.round(dCost)),' jt');
    ln('  Net       = ',f(Math.round(net)),' jt (',pct.toFixed(1),'%)');
    ln('Integrity: ',la.integ,'/5');
    ln('  ΔnPass = ',p2r.nPass-p1r.nPass,' (P1:',p1r.nPass,' → P2:',p2r.nPass,')');
    ln('TOTAL LA RAW = ',la.total,'/25 → ×0.8 = ',Math.round(la.total*0.8));
  }

  // ── SCORING SUMMARY ──
  sep('SCORING SUMMARY');
  ln('FASE 1:');
  ln('  ST (n_pass constraint)  = ',p1s.st,'/25');
  ln('  SP (margin)             = ',p1s.sp,'/25');
  ln('  RS (resource stewardship)= ',p1s.rs,'/25');
  ln('  Dec (decisiveness)      = ',p1s.dec,'/25');
  ln('  TOTAL                   = ',p1s.total,'/100');
  if(hasP2){
    ln('');
    ln('FASE 2 (semua ×0.8 + LA):');
    ln('  ST  = ',p2s.raw.st,' ×0.8 = ',p2s.st,'/20');
    ln('  SP  = ',p2s.raw.sp,' ×0.8 = ',p2s.sp,'/20');
    ln('  RS  = ',p2s.raw.rs,' ×0.8 = ',p2s.rs,'/20');
    ln('  Dec = ',p2s.raw.dec,' ×0.8 = ',p2s.dec,'/20');
    ln('  LA  = ',p2s.la_detail.total,' ×0.8 = ',p2s.la,'/20');
    ln('  TOTAL = ',p2s.total,'/100');
  }

  return lines.join('\n');
}

function buildCalcLogPhase(lines, d, r, s, ec, v, label){
  const ln=(...args)=>lines.push(args.join(''));
  const f=(n,d=0)=>Number(n).toLocaleString('id-ID',{minimumFractionDigits:d,maximumFractionDigits:d});

  ln('');
  ln('── CABOR ──');
  ln('Cabor terpilih: ',d.cabor.length,' (kompatibel: ',r.nCompat,', inkompatibel: ',r.nIncompat,')');
  r.caborDetails.forEach(cd=>{
    const c=C.cabor.find(x=>x.id===cd.id);
    if(cd.compat){
      ln('  ',cd.e||'·',' ',cd.name,': biaya=',f(Math.round(c.biaya*v.r.cabor)),'jt, kW=',c.kW,
        ', pOff=',f(Math.round(cd.poff)),', pOn=',f(Math.round(cd.pon)),
        ', revTiket=',f(Math.round(cd.rev/1000)),'jt');
    } else {
      ln('  ⚠ ',cd.name,': INKOMPATIBEL — biaya tetap dikenakan, revenue = 0');
    }
  });

  ln('');
  ln('── LISTRIK ──');
  ln('kW Cabor   = ',f(r.kWCabor));
  ln('kW Extras  = ',f(r.kWExtras),' (BC:',d.bc?200:0,' + Stream:',d.streaming?80:0,' + Open:',d.opening?150:0,' + Close:',d.closing?100:0,')');
  ln('kW Total   = ',f(r.kWTotal));
  ln('kW Venue   = ',f(r.kWVenue));
  ln('kW Genset  = ',f(r.kWGenset),' (Kecil:',d.gensetKecil,'×300 + Besar:',d.gensetBesar,'×700)');
  ln('kW Tersedia= ',f(r.kWAvail));
  ln('Deficit    = ',f(r.kWDeficit),' kW → ',r.blackout?'❌ BLACKOUT':'✅ Aman');

  ln('');
  ln('── PENONTON ──');
  const bcActive = v.bc || d.bc;
  const openMult = d.opening ? (ec?.id==='A01' ? 1.30 : 1.10) : 1;
  const closeMult = d.closing ? 1.08 : 1;
  const rainFactor = (ec?.id==='C01' && (d.venue==='v1'||d.venue==='v3')) ? 0.60 : 1;
  const k01poff = ec?.id==='K01' ? 1.10 : 1;
  const k01pon  = ec?.id==='K01' ? 1.20 : 1;
  const shuttleMult = Math.pow(1.05, d.shuttleBus);
  ln('Modifiers: opening=',openMult,'× | closing=',closeMult,'× | rain=',rainFactor,'× | k01poff=',k01poff,'× | shuttle=',shuttleMult.toFixed(3),'×');
  ln('P.Off Sum (pre-cap) = ',f(Math.round(r.poffSum / (r.capRatio<1 ? r.capRatio : 1))));
  if(r.capRatio<1) ln('Venue cap applied: ',f(v.maxOff),' pax → capRatio=',r.capRatio.toFixed(4));
  ln('P.Off Sum (final)   = ',f(Math.round(r.poffSum)));
  ln('P.On Sum            = ',f(Math.round(r.ponSum)),(bcActive?'':'(no BC → 0)'));
  ln('Total Viewers       = ',f(Math.round(r.totalViewers)));

  ln('');
  ln('── REVENUE ──');
  ln('Rev Tiket   = ΣrevTiket / 1000 × revPerPax(',v.r.rev,') × capRatio(',r.capRatio.toFixed(4),') = Rp ',f(Math.round(r.revTiket)),' jt');
  const tier=C.sponsorTiers[r.sponsorIdx];
  ln('Sponsor     = Tier "',tier.tier,'" (',tier.label,') → Rp ',f(r.revSponsor),' jt');
  if(ec?.id==='S01') ln('  (S01 aktif: tier turun 1 level)');
  ln('F&B         = min(stall=',d.foodStall,', poff/',800,'=',f(Math.round(r.poffSum/800),1),') × 15 = Rp ',f(Math.round(r.revFoodStall)),' jt');
  ln('Booth       = ',d.boothSponsor,' booth × 30 × saturasi(',r.sat.toFixed(2),') = Rp ',f(Math.round(r.revBooth)),' jt');
  ln('TOTAL REV   = Rp ',f(Math.round(r.totalRev)),' jt');

  ln('');
  ln('── COST ──');
  ln('Venue       = Rp ',f(r.costVenue),' jt');
  ln('Cabor       = Rp ',f(Math.round(r.costCabor)),' jt');
  ln('Extras      = Rp ',f(Math.round(r.costExtras)),' jt');
  ln('  BC:',d.bc?80:0,' Stream:',d.streaming?45:0,' Open:',d.opening?60:0,' Close:',d.closing?50:0);
  ln('  GenK:',d.gensetKecil,'×',r.gKCost,'=',d.gensetKecil*r.gKCost,' GenB:',d.gensetBesar,'×',r.gBCost,'=',d.gensetBesar*r.gBCost);
  ln('  Toilet10:',d.toilet10,'×22=',d.toilet10*22,' Toilet5:',d.toilet5,'×12=',d.toilet5*12);
  ln('  Security:',d.security,'×15=',d.security*15,' SecVIP:',d.securityVip,'×12=',d.securityVip*12);
  ln('  Medis:',d.medis?25:0,' Ambulans:',d.ambulans?20:0);
  ln('  FoodStall:',d.foodStall,'×8=',d.foodStall*8,' Booth:',d.boothSponsor,'×10=',d.boothSponsor*10);
  ln('  Shuttle:',d.shuttleBus,'×18=',d.shuttleBus*18,' MSA:',d.msa?35:0);
  ln('TOTAL COST  = Rp ',f(Math.round(r.totalCost)),' jt');
  ln('PROFIT      = Rp ',f(Math.round(r.profit)),' jt (margin: ',r.margin.toFixed(1),'%)');

  ln('');
  ln('── 6 CONSTRAINT ──');
  ln('Listrik  : ',r.constraints.listrik?'LULUS':'GAGAL',' (pakai:',f(r.kWTotal),' / tersedia:',f(r.kWAvail),')');
  ln('Toilet   : ',r.constraints.toilet?'LULUS':'GAGAL',' (',r.toiletsTotal,' / ',r.toiletsReq,' unit)');
  ln('Security : ',r.constraints.security?'LULUS':'GAGAL',' (',r.securityTotal,' / ',r.securityReq,' org)');
  ln('Cabor    : ',r.constraints.cabor?'LULUS':'GAGAL',' (',r.nCompat,' kompatibel)');
  ln('Medis    : ',r.constraints.medis?'LULUS':'GAGAL');
  ln('Budget   : ',r.constraints.budget?'LULUS':'GAGAL',' (cost:',f(Math.round(r.totalCost)),' / 3.000)');
  ln('n_pass   = ',r.nPass,'/6');

  ln('');
  ln('── RESOURCE STEWARDSHIP ──');
  const tRatio=r.toiletsReq>0?(r.toiletsTotal/r.toiletsReq):0;
  const sRatio=r.securityTotal/Math.max(r.securityReq,1);
  ln('Toilet    : rasio=',tRatio.toFixed(2),'× → RS=',r.rs_toilet,'/5');
  ln('Security  : rasio=',sRatio.toFixed(2),'× → RS=',r.rs_security,'/5');
  ln('Listrik   : deficit=',f(r.kWDeficit),'kW, genset=',f(r.kWGenset),'kW → RS=',r.rs_listrik,'/5');
  ln('Budget    : sisa=',f(Math.round(3000-r.totalCost)),'jt (',((3000-r.totalCost)/3000*100).toFixed(0),'%) → RS=',r.rs_budget,'/5');
  ln('F&B       : catchment=',r.catchRatio.toFixed(2),'× → RS=',r.rs_fb,'/5');
  ln('TOTAL RS  = ',r.totalRS,'/25');

  ln('');
  ln('── SCORING ',label,' ──');
  const stLookup=[0,4,8,12,17,21,25];
  ln('ST: n_pass=',r.nPass,' → lookup[',r.nPass,']=',stLookup[clamp(r.nPass,0,6)]);
  ln('SP: margin=',r.margin.toFixed(1),'% → ',s.sp||(s.raw?s.raw.sp:0));
  ln('RS: totalRS=',r.totalRS,' → ',r.totalRS);
  const timeMin = label==='Fase 1'?G.p1time:G.p2time;
  ln('Dec: waktu=',timeMin.toFixed(1),' mnt → ts=',s.ts||0,' → dec=round(ts×n_pass/6)=',s.dec||(s.raw?s.raw.dec:0));
}

function renderCalcLog(){
  const el=document.getElementById('calc-log');
  if(el) el.textContent=buildCalcLog();
}

function exportCalcLog(){
  const log=buildCalcLog();
  const blob=new Blob(['\uFEFF'+log],{type:'text/plain;charset=utf-8;'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url; a.download='level-up-calc-log.txt'; a.click();
  URL.revokeObjectURL(url);
  showToast('Log perhitungan berhasil didownload!');
}

// ══════════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════════
window.addEventListener('load',()=>{
  buildBriefing();
});
