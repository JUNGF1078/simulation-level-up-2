'use strict';
// ═══════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════
const ALL_FASILITAS = [
  "Area Parkir","Kantin","Ruang Ganti","Ruang VIP","Area Pers",
  "Studio Siaran","Klinik Medis","Zona Sponsor","Area Fan",
  "Toko Merchandise","Museum Mini","Area Hiburan"
];

const C = {
  rounds:[
    {id:1, name:"Festival Olahraga Daerah",
     desc:"Rencanakan event olahraga skala daerah. Pilih venue dan cabor yang sesuai kapasitas dan anggaran.",
     budget:2000, minCabor:4, maxCabor:7, minProfit:null, crises:[],
     obj:["Raih profit positif","Penuhi semua constraint operasional","Pilih 4–7 cabang olahraga"]},
    {id:2, name:"Kejuaraan Regional",
     desc:"Selenggarakan babak kualifikasi regional dengan anggaran lebih ketat. Ada peringatan pemadaman listrik daerah.",
     budget:1800, minCabor:6, maxCabor:10, minProfit:null,
     crises:["power_reduction"],
     obj:["Raih profit positif","Pilih 6–10 cabang olahraga","Kelola penurunan kapasitas listrik (−20% kVA)"]},
    {id:3, name:"Pekan Olahraga Nasional",
     desc:"Selenggarakan event nasional di tengah tekanan anggaran. Inflasi dan krisis tenaga kerja meningkatkan biaya.",
     budget:1500, minCabor:8, maxCabor:14, minProfit:100,
     crises:["cost_inflation","staff_shortage"],
     obj:["Raih profit ≥ 100M","Pilih 8–14 cabang olahraga","Kelola inflasi biaya 15%","Kelola kenaikan biaya staf 20%"]}
  ],

  // ── VENUES (specific named facilities) ──
  venues:{
    gorPratama:{
      name:"GOR Remaja Pratama",
      desc:"Gedung olahraga serbaguna skala kecamatan. Cocok untuk cabor indoor ringan.",
      biayaSewa:8,
      kapasitasPengunjung:800,
      kapasitasListrik:60,
      jumlahToilet:4,
      fasilitasOnlineBroadcasting:false,
      fasilitasArea:["Area Parkir","Kantin","Ruang Ganti"],
      ratioBiayaCabor:0.80,
      ratioOffline:0.75,
      ratioPendapatan:0.80,
      caborTersedia:['badminton','voli','pencakSilat','senam','angkatBesi']
    },
    gorUtama:{
      name:"GOR Utama Kodam",
      desc:"Arena indoor berstandar kabupaten dengan fasilitas tribun dan ruang VIP.",
      biayaSewa:22,
      kapasitasPengunjung:3500,
      kapasitasListrik:180,
      jumlahToilet:12,
      fasilitasOnlineBroadcasting:false,
      fasilitasArea:["Area Parkir","Kantin","Ruang Ganti","Ruang VIP","Area Pers"],
      ratioBiayaCabor:0.95,
      ratioOffline:0.92,
      ratioPendapatan:0.98,
      caborTersedia:['badminton','basket','voli','tinju','pencakSilat','senam','angkatBesi']
    },
    pusatAkuatik:{
      name:"Pusat Akuatik Senayan",
      desc:"Fasilitas akuatik berstandar internasional dengan kolam olimpik dan fasilitas siaran.",
      biayaSewa:35,
      kapasitasPengunjung:2500,
      kapasitasListrik:120,
      jumlahToilet:15,
      fasilitasOnlineBroadcasting:true,
      fasilitasArea:["Area Parkir","Kantin","Ruang Ganti","Ruang VIP","Studio Siaran","Klinik Medis"],
      ratioBiayaCabor:1.10,
      ratioOffline:0.90,
      ratioPendapatan:1.15,
      caborTersedia:['renang']
    },
    komplekRagunan:{
      name:"Komplek Olahraga Ragunan",
      desc:"Kompleks multi-venue outdoor dengan lapangan, lintasan, dan arena terbuka.",
      biayaSewa:65,
      kapasitasPengunjung:12000,
      kapasitasListrik:600,
      jumlahToilet:60,
      fasilitasOnlineBroadcasting:true,
      fasilitasArea:["Area Parkir","Kantin","Ruang Ganti","Ruang VIP","Area Pers","Studio Siaran","Klinik Medis","Zona Sponsor","Area Fan"],
      ratioBiayaCabor:1.05,
      ratioOffline:1.10,
      ratioPendapatan:1.15,
      caborTersedia:['sepakBola','atletik','tenis','panahan','balapSepeda','voli']
    },
    geloraNusantara:{
      name:"Stadion Gelora Nusantara",
      desc:"Stadion utama berstandar nasional dengan kapasitas besar dan fasilitas lengkap.",
      biayaSewa:180,
      kapasitasPengunjung:40000,
      kapasitasListrik:1800,
      jumlahToilet:200,
      fasilitasOnlineBroadcasting:true,
      fasilitasArea:["Area Parkir","Kantin","Ruang Ganti","Ruang VIP","Area Pers","Studio Siaran","Klinik Medis","Zona Sponsor","Area Fan","Toko Merchandise","Museum Mini","Area Hiburan"],
      ratioBiayaCabor:1.20,
      ratioOffline:1.30,
      ratioPendapatan:1.35,
      caborTersedia:['sepakBola','atletik','basket','tenis','badminton','tinju','balapSepeda','esport','panahan']
    }
  },

  // ── CABOR (specific named sports) ──
  cabor:{
    sepakBola:   {name:"Sepak Bola",    kelompok:"Outdoor",biayaPelaksanaan:80, kebutuhanListrik:150,penontonOffline:8000, hargaTiket:0.10,penontonOnline:80000},
    basket:      {name:"Bola Basket",   kelompok:"Indoor", biayaPelaksanaan:45, kebutuhanListrik:80, penontonOffline:3000, hargaTiket:0.08,penontonOnline:30000},
    tenis:       {name:"Tenis",         kelompok:"Outdoor",biayaPelaksanaan:30, kebutuhanListrik:50, penontonOffline:2000, hargaTiket:0.07,penontonOnline:20000},
    badminton:   {name:"Bulu Tangkis",  kelompok:"Indoor", biayaPelaksanaan:25, kebutuhanListrik:60, penontonOffline:2500, hargaTiket:0.06,penontonOnline:25000},
    renang:      {name:"Renang",        kelompok:"Indoor", biayaPelaksanaan:35, kebutuhanListrik:100,penontonOffline:1500, hargaTiket:0.06,penontonOnline:15000},
    atletik:     {name:"Atletik",       kelompok:"Outdoor",biayaPelaksanaan:50, kebutuhanListrik:80, penontonOffline:5000, hargaTiket:0.05,penontonOnline:40000},
    voli:        {name:"Bola Voli",     kelompok:"Indoor", biayaPelaksanaan:20, kebutuhanListrik:50, penontonOffline:2000, hargaTiket:0.05,penontonOnline:20000},
    tinju:       {name:"Tinju",         kelompok:"Indoor", biayaPelaksanaan:50, kebutuhanListrik:70, penontonOffline:3500, hargaTiket:0.09,penontonOnline:50000},
    senam:       {name:"Senam Artistik",kelompok:"Indoor", biayaPelaksanaan:20, kebutuhanListrik:40, penontonOffline:1500, hargaTiket:0.05,penontonOnline:15000},
    pencakSilat: {name:"Pencak Silat",  kelompok:"Indoor", biayaPelaksanaan:15, kebutuhanListrik:30, penontonOffline:1200, hargaTiket:0.04,penontonOnline:12000},
    panahan:     {name:"Panahan",       kelompok:"Outdoor",biayaPelaksanaan:20, kebutuhanListrik:40, penontonOffline:1000, hargaTiket:0.04,penontonOnline:10000},
    angkatBesi:  {name:"Angkat Besi",   kelompok:"Indoor", biayaPelaksanaan:25, kebutuhanListrik:50, penontonOffline:1500, hargaTiket:0.05,penontonOnline:15000},
    balapSepeda: {name:"Balap Sepeda",  kelompok:"Outdoor",biayaPelaksanaan:60, kebutuhanListrik:100,penontonOffline:5000, hargaTiket:0.07,penontonOnline:40000},
    esport:      {name:"E-Sport",       kelompok:"Indoor", biayaPelaksanaan:40, kebutuhanListrik:150,penontonOffline:2000, hargaTiket:0.06,penontonOnline:100000}
  },

  sponsor:{base:30, perKOffline:50, perTKOnline:10},
  staffCost:0.8,
  staffPerVisitor:50,
  toiletPerVisitor:80,
  generatorKva:200,
  generatorCost:20,
  broadcastUpgradeCost:40,
  backupInternetCost:15
};

// ═══════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════
const DEFAULT_DECISIONS = ()=>({
  days:3,
  selectedVenues:['gorUtama'],
  selectedCabor:['badminton','basket','voli','pencakSilat'],
  foodstalls:5, foodtrucks:3, extraToilets:0, seating:5,
  generators:0, broadcastUpgrade:false, backupInternet:false,
  marketing:'medium', staff:100
});

let G = {
  round:0, history:[], allResults:null,
  decisions: DEFAULT_DECISIONS()
};

const activeOpts = {marketing:'medium'};

// ═══════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════
function getAvailableCabor(){
  const available = new Set();
  G.decisions.selectedVenues.forEach(vKey=>{
    C.venues[vKey].caborTersedia.forEach(c=>available.add(c));
  });
  return available;
}

// ═══════════════════════════════════════════════
// CALCULATION ENGINE
// ═══════════════════════════════════════════════
function calc(d, roundCfg) {
  const crisis = roundCfg ? roundCfg.crises : [];
  const powerReduction = crisis.includes('power_reduction') ? 0.80 : 1.0;
  const costInflation  = crisis.includes('cost_inflation')  ? 1.15 : 1.0;
  const staffInflation = crisis.includes('staff_shortage')  ? 1.20 : 1.0;

  // ── VENUES ──
  let venueCap=0, venuePower=0, venueCostBase=0, venueToilets=0, hasBroadcasting=false;
  let sumRatioCabor=0, sumRatioOffline=0, sumRatioPendapatan=0;
  const nVenues = Math.max(d.selectedVenues.length, 1);

  d.selectedVenues.forEach(vKey=>{
    const v = C.venues[vKey];
    venueCap          += v.kapasitasPengunjung;
    venuePower        += Math.round(v.kapasitasListrik * powerReduction);
    venueCostBase     += v.biayaSewa;
    venueToilets      += v.jumlahToilet;
    if(v.fasilitasOnlineBroadcasting) hasBroadcasting = true;
    sumRatioCabor     += v.ratioBiayaCabor;
    sumRatioOffline   += v.ratioOffline;
    sumRatioPendapatan+= v.ratioPendapatan;
  });

  const venueCost          = Math.round(venueCostBase * d.days * costInflation);
  const avgRatioCabor      = sumRatioCabor      / nVenues;
  const avgRatioOffline    = sumRatioOffline    / nVenues;
  const avgRatioPendapatan = sumRatioPendapatan / nVenues;
  if(d.broadcastUpgrade) hasBroadcasting = true;

  // ── CABOR ──
  let sportsCost=0, rawOffline=0, rawOnline=0, powerDemand=0, ticketRevBase=0;
  d.selectedCabor.forEach(cKey=>{
    const cb = C.cabor[cKey];
    sportsCost   += Math.round(cb.biayaPelaksanaan * avgRatioCabor * costInflation);
    powerDemand  += cb.kebutuhanListrik;
    const effOff  = cb.penontonOffline * avgRatioOffline;
    rawOffline   += effOff;
    rawOnline    += cb.penontonOnline;
    ticketRevBase+= effOff * cb.hargaTiket;
  });

  const mktBonus = {low:0.05,medium:0.12,high:0.20}[d.marketing]||0.12;
  const mktCost  = {low:20,medium:40,high:70}[d.marketing]||40;
  rawOffline    *= (1 + mktBonus);
  rawOnline     *= (1 + mktBonus);
  ticketRevBase *= (1 + mktBonus);

  const effectiveOffline = Math.min(Math.round(rawOffline), venueCap);
  const capacityFill     = venueCap > 0 ? Math.min(rawOffline, venueCap) / Math.max(rawOffline,1) : 0;
  const broadcastMult    = hasBroadcasting ? 1.30 : 0.40;
  const onlineViewers    = Math.round(rawOnline * broadcastMult);

  // ── POWER ──
  const powerSupply = venuePower + d.generators * C.generatorKva;
  const powerOK     = powerDemand <= powerSupply;

  // ── SANITATION ──
  const totalToilets   = venueToilets + d.extraToilets;
  const toiletRequired = Math.ceil(effectiveOffline / C.toiletPerVisitor);
  const toiletOK       = totalToilets >= toiletRequired;

  // ── STAFF ──
  const staffRequired = Math.ceil(effectiveOffline / C.staffPerVisitor);
  const staffOK       = d.staff >= staffRequired;

  // ── BRANCHES ──
  const totalBranches = d.selectedCabor.length;
  const branchOK      = totalBranches >= (roundCfg ? roundCfg.minCabor : 4);

  // ── COSTS ──
  const facilityCost = d.foodstalls*10 + d.foodtrucks*15 + d.extraToilets*1 + d.seating*5;
  const addonCost    = d.generators*C.generatorCost +
                       (d.broadcastUpgrade ? C.broadcastUpgradeCost : 0) +
                       (d.backupInternet   ? C.backupInternetCost   : 0);
  const staffCost    = Math.round(d.staff * C.staffCost * staffInflation);
  const totalCost    = venueCost + sportsCost + facilityCost + addonCost + mktCost + staffCost;

  const budget   = roundCfg ? roundCfg.budget : C.rounds[G.round].budget;
  const budgetOK = totalCost <= budget;

  // ── PENALTIES ──
  let revenueMultiplier=1.0, sponsorMultiplier=1.0;
  const penalties=[];
  if(!powerOK)  { revenueMultiplier*=0.60; penalties.push({name:'Blackout',        desc:'Kegagalan listrik → −40% total pendapatan'}); }
  if(!toiletOK) { sponsorMultiplier*=0.70; penalties.push({name:'Sanitasi Buruk',  desc:'Kekurangan toilet → −30% pendapatan sponsor'}); }
  if(!staffOK)  { revenueMultiplier*=0.80; penalties.push({name:'Kekurangan Staf', desc:'Understaffed → −20% pendapatan'}); }

  // ── REVENUE ──
  const ticketRevenue  = Math.round(ticketRevBase * capacityFill * avgRatioPendapatan * revenueMultiplier);
  const foodRevenue    = d.foodstalls*8 + d.foodtrucks*12;
  const rawSponsor     = C.sponsor.base + (effectiveOffline/1000)*C.sponsor.perKOffline + (onlineViewers/10000)*C.sponsor.perTKOnline;
  const sponsorRevenue = Math.round(rawSponsor * sponsorMultiplier * revenueMultiplier);
  const totalRevenue   = ticketRevenue + foodRevenue + sponsorRevenue;
  const profit         = totalRevenue - totalCost;

  return {
    venueCost, sportsCost, facilityCost, addonCost, mktCost, staffCost, totalCost,
    ticketRevenue, foodRevenue, sponsorRevenue, totalRevenue,
    profit, effectiveOffline, onlineViewers,
    venueCap, venuePower, powerDemand, powerSupply,
    venueToilets, totalToilets, totalBranches,
    capacityFillPct: Math.round(capacityFill * 100),
    hasBroadcasting,
    constraints:{
      power:  {ok:powerOK,  required:powerDemand,  available:powerSupply},
      toilet: {ok:toiletOK, required:toiletRequired,have:totalToilets},
      staff:  {ok:staffOK,  required:staffRequired, have:d.staff},
      budget: {ok:budgetOK, limit:budget,           cost:totalCost},
      branches:{ok:branchOK,required:roundCfg?.minCabor||4,have:totalBranches}
    },
    penalties, budget
  };
}

// ═══════════════════════════════════════════════
// SCORING
// ═══════════════════════════════════════════════
function score(d, res, roundCfg) {
  const c = res.constraints;
  const profitRatio     = res.profit / res.budget;
  const profitScore     = Math.max(0, Math.min(100, Math.round((profitRatio + 0.2) / 0.6 * 100)));
  const cPass           = [c.power.ok,c.toilet.ok,c.staff.ok,c.budget.ok,c.branches.ok].filter(Boolean).length;
  const complianceScore = Math.round(cPass / 5 * 100);
  const effRatio        = res.totalCost > 0 ? res.totalRevenue / res.totalCost : 0;
  const effScore        = Math.max(0, Math.min(100, Math.round((effRatio - 0.6) / 0.8 * 100)));
  let riskScore = 100;
  if(!c.power.ok)  riskScore -= 35;
  if(!c.toilet.ok) riskScore -= 20;
  if(!c.staff.ok)  riskScore -= 20;
  if(!res.hasBroadcasting && !d.backupInternet) riskScore -= 15;
  if(res.powerDemand > res.powerSupply * 0.95)  riskScore -= 10;
  riskScore = Math.max(0, riskScore);
  const total = Math.round(profitScore*0.35 + complianceScore*0.30 + effScore*0.20 + riskScore*0.15);
  return {profitScore, complianceScore, effScore, riskScore, total};
}

function assessCompetencies(d, res) {
  const c = res.constraints;

  let analytic = 0;
  if(c.power.ok) analytic += 25;
  const tExcess = (c.toilet.have - c.toilet.required) / Math.max(c.toilet.required,1);
  if(c.toilet.ok && tExcess < 0.5) analytic += 25; else if(c.toilet.ok) analytic += 10;
  const sExcess = (c.staff.have - c.staff.required) / Math.max(c.staff.required,1);
  if(c.staff.ok && sExcess < 0.5) analytic += 25; else if(c.staff.ok) analytic += 10;
  const budgetUtil = res.totalCost / res.budget;
  if(budgetUtil >= 0.5 && budgetUtil <= 0.95) analytic += 25; else if(budgetUtil > 0) analytic += 10;

  let strategic = 0;
  const highRevCabor = d.selectedCabor.filter(k=>C.cabor[k].hargaTiket >= 0.08).length;
  if(highRevCabor >= 2) strategic += 25;
  if(res.hasBroadcasting) strategic += 25;
  if(res.profit > 0) strategic += 25;
  if(res.capacityFillPct > 50) strategic += 25;

  let risk = 0;
  if(res.powerDemand <= res.powerSupply * 0.90) risk += 25;
  if(c.toilet.ok) risk += 25;
  if(c.staff.ok)  risk += 25;
  if(d.backupInternet || !res.hasBroadcasting) risk += 25;

  let prioritize = 0;
  if(c.branches.ok) prioritize += 25;
  if(Math.abs(sExcess) < 0.3) prioritize += 25; else prioritize += 10;
  if(res.foodRevenue > 0) prioritize += 25;
  if(d.marketing !== 'low' || res.effectiveOffline < 2000) prioritize += 25;

  let tradeoff = 0;
  if(res.profit / Math.max(res.totalRevenue,1) > 0.05) tradeoff += 25;
  if(res.totalRevenue / Math.max(res.totalCost,1) > 1.1) tradeoff += 25;
  if(res.venueCost < res.totalCost * 0.45) tradeoff += 25;
  if(res.capacityFillPct > 40 && res.capacityFillPct <= 100) tradeoff += 25;

  return {
    analytic:   Math.min(100, analytic),
    strategic:  Math.min(100, strategic),
    risk:       Math.min(100, risk),
    prioritize: Math.min(100, prioritize),
    tradeoff:   Math.min(100, tradeoff)
  };
}

function buildAssessment(d, res, comp) {
  const strengths=[], weaknesses=[];
  if(comp.analytic  >= 75) strengths.push('Analisis ketat — constraint dikelola dengan presisi dan efisiensi tinggi.');
  else weaknesses.push('Manajemen constraint perlu ditingkatkan — review alokasi listrik, staf, dan sanitasi.');
  if(comp.strategic >= 75) strengths.push('Visi strategis jelas — maksimisasi audiens dan diversifikasi pendapatan tercapai.');
  else weaknesses.push('Pilihan strategis meninggalkan potensi pendapatan — pertimbangkan cabor dengan tiket lebih tinggi.');
  if(comp.risk      >= 75) strengths.push('Manajemen risiko efektif — sistem cadangan dan infrastruktur listrik terjaga.');
  else weaknesses.push('Eksposur risiko tinggi — tambah generator, backup internet, atau upgrade venue.');
  if(comp.prioritize>= 75) strengths.push('Prioritisasi sumber daya sangat baik — anggaran dialokasikan ke area dampak tertinggi.');
  else weaknesses.push('Gap prioritisasi teridentifikasi — hindari over-staffing atau under-investasi pada pendapatan utama.');
  if(comp.tradeoff  >= 75) strengths.push('Analisis trade-off matang — keseimbangan venue, cabor, dan fasilitas tercapai.');
  else weaknesses.push('Keseimbangan trade-off perlu penyempurnaan — biaya venue atau utilisasi kapasitas kurang optimal.');
  if(res.profit < 0) weaknesses.push(`Event menghasilkan kerugian ${fmtM(res.profit)} — evaluasi asumsi pendapatan utama.`);
  res.penalties.forEach(p=>weaknesses.push(`${p.name}: ${p.desc}`));
  return {strengths, weaknesses};
}

// ═══════════════════════════════════════════════
// FORMATTING
// ═══════════════════════════════════════════════
function fmt(n){return n==null?'—':n>=0?`+${n.toLocaleString()}`:`${n.toLocaleString()}`}
function fmtM(n){return n==null?'—M':`${n.toLocaleString()}M`}
function color(n){return n>0?'var(--accent)':n<0?'var(--danger)':'var(--muted)'}

// ═══════════════════════════════════════════════
// UI: SCREENS
// ═══════════════════════════════════════════════
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  const stepMap={briefing:0,planning:1,simulation:2,results:3,'final-report':4};
  const si = stepMap[id] ?? -1;
  document.querySelectorAll('.step').forEach((s,i)=>{
    s.classList.toggle('done',   i < si);
    s.classList.toggle('active', i === si);
  });
}

// ═══════════════════════════════════════════════
// BRIEFING
// ═══════════════════════════════════════════════
function renderBriefing(){
  const r = C.rounds[G.round];
  document.getElementById('hdr-budget').textContent = r.budget.toLocaleString();

  const crisisBox = document.getElementById('crisis-box');
  if(r.crises.length){
    crisisBox.style.display='block';
    document.getElementById('crisis-items').innerHTML = r.crises.map(cr=>{
      if(cr==='power_reduction') return '<div class="crisis-item">⚡ Peringatan Listrik: Kapasitas listrik venue berkurang 20%</div>';
      if(cr==='cost_inflation')  return '<div class="crisis-item">📈 Inflasi Biaya: Semua biaya operasional naik 15%</div>';
      if(cr==='staff_shortage')  return '<div class="crisis-item">👷 Kekurangan Tenaga Kerja: Biaya staf naik 20%</div>';
      return '';
    }).join('');
  } else { crisisBox.style.display='none'; }

  document.getElementById('briefing-info').innerHTML = `
    <div class="info-card"><div class="label">Ronde</div><div class="value">${r.id} / 3</div><div class="unit">${r.name}</div></div>
    <div class="info-card"><div class="label">Anggaran</div><div class="value text-primary">${r.budget.toLocaleString()}</div><div class="unit">Juta IDR</div></div>
    <div class="info-card"><div class="label">Jumlah Cabor</div><div class="value">${r.minCabor}–${r.maxCabor}</div><div class="unit">Cabang olahraga</div></div>
    <div class="info-card"><div class="label">Target Profit</div><div class="value ${r.minProfit?'text-warn':'text-accent'}">${r.minProfit?r.minProfit+'+':'Positif'}</div><div class="unit">${r.minProfit?'Minimum (M)':'Break even'}</div></div>
  `;

  document.getElementById('briefing-objectives').innerHTML = `
    <h3>${r.name}</h3>
    <p style="color:var(--muted);font-size:13px;margin:8px 0 16px">${r.desc}</p>
    ${r.obj.map((o,i)=>`<div class="obj-item"><div class="obj-icon" style="background:rgba(14,165,233,.1);color:var(--primary)">${i+1}</div>${o}</div>`).join('')}
  `;

  document.getElementById('round-history').innerHTML = C.rounds.map((rd,i)=>{
    const h = G.history[i];
    const cls = h?'done':(i===G.round?'active':'');
    return `<div class="round-card ${cls}">
      <div class="r-num">Ronde ${rd.id}</div>
      <div class="r-profit" style="color:${h?color(h.profit):'var(--muted)'}">${h?fmtM(h.profit):'—'}</div>
      <div class="r-score">${h?`Skor: ${h.scores.total}`:'Belum dimainkan'}</div>
    </div>`;
  }).join('');
}

// ═══════════════════════════════════════════════
// PLANNING
// ═══════════════════════════════════════════════
function startPlanning(){
  showScreen('planning');
  const r = C.rounds[G.round];
  document.getElementById('min-cabor-label').textContent = r.minCabor;
  document.getElementById('max-cabor-label').textContent = r.maxCabor;

  const d = G.decisions;
  const sliderMap = {
    'rental-days':   [d.days,          'days-val'],
    'foodstalls':    [d.foodstalls,     'stalls-val'],
    'foodtrucks':    [d.foodtrucks,     'trucks-val'],
    'extra-toilets': [d.extraToilets,   'extra-toilet-val'],
    'seating':       [d.seating,        'seat-val'],
    'generators':    [d.generators,     'gen-val'],
    'staff':         [d.staff,          'staff-val']
  };
  Object.entries(sliderMap).forEach(([id,[val,dispId]])=>{
    const el=document.getElementById(id), dp=document.getElementById(dispId);
    if(el) el.value=val; if(dp) dp.textContent=val;
  });
  document.getElementById('broadcast-upgrade').checked = d.broadcastUpgrade;
  document.getElementById('backup-internet').checked   = d.backupInternet;
  document.querySelectorAll('#marketing-group .opt').forEach(b=>{
    b.classList.toggle('active', b.dataset.val === d.marketing);
  });
  activeOpts.marketing = d.marketing;

  renderVenueCards();
  renderCaborTable();
  updatePreview();
}

function switchTab(name){
  document.querySelectorAll('.tab-pane').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('tab-'+name).classList.add('active');
  event.currentTarget.classList.add('active');
}

function selectOpt(btn, groupId, key){
  document.querySelectorAll('#'+groupId+' .opt').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  activeOpts[key] = btn.dataset.val;
  updatePreview();
}

function onSlider(input, valId){ document.getElementById(valId).textContent = input.value; }

// ── VENUE CARDS ──
function renderVenueCards(){
  const sel = G.decisions.selectedVenues;
  document.getElementById('venue-cards').innerHTML = Object.entries(C.venues).map(([key,v])=>{
    const isSel  = sel.includes(key);
    const canAdd = sel.length < 3 || isSel;
    const caborNames = v.caborTersedia.map(k=>C.cabor[k]?.name||k);
    return `
    <div class="venue-card${isSel?' selected':''}${!canAdd?' vc-disabled':''}"
         onclick="${canAdd?`toggleVenue('${key}')`:''}" >
      <div class="vc-header">
        <span class="vc-name">${v.name}</span>
        <span class="vc-badge ${isSel?'sel':'unsel'}">${isSel?'✓ Dipilih':'+ Pilih'}</span>
      </div>
      <div class="vc-desc">${v.desc}</div>
      <div class="vc-attrs">
        <div class="vc-row"><span>Biaya Sewa</span><span class="vc-val">${v.biayaSewa}M/hari</span></div>
        <div class="vc-row"><span>Kapasitas Pengunjung</span><span class="vc-val">${v.kapasitasPengunjung.toLocaleString()} org</span></div>
        <div class="vc-row"><span>Kapasitas Listrik</span><span class="vc-val">${v.kapasitasListrik} kVA</span></div>
        <div class="vc-row"><span>Jumlah Toilet</span><span class="vc-val">${v.jumlahToilet} unit</span></div>
        <div class="vc-row"><span>Fasilitas Online Broadcasting</span><span class="vc-val ${v.fasilitasOnlineBroadcasting?'pos':'neg'}">${v.fasilitasOnlineBroadcasting?'✓ Ya':'✗ Tidak'}</span></div>
        <div class="vc-row"><span>Fasilitas Area</span><span class="vc-val">${v.fasilitasArea.length} / 12</span></div>
        <div class="vc-row"><span>Rasio Biaya Pelaksanaan Cabor</span><span class="vc-val">${v.ratioBiayaCabor}×</span></div>
        <div class="vc-row"><span>Rasio Pengunjung Offline</span><span class="vc-val">${v.ratioOffline}×</span></div>
        <div class="vc-row"><span>Rasio Pendapatan per Pengunjung</span><span class="vc-val">${v.ratioPendapatan}×</span></div>
      </div>
      <div class="vc-areas">
        <div class="vc-areas-label">Fasilitas Area (${v.fasilitasArea.length}/12):</div>
        <div class="area-tags">
          ${ALL_FASILITAS.map(a=>`<span class="area-tag ${v.fasilitasArea.includes(a)?'have':'missing'}">${a}</span>`).join('')}
        </div>
      </div>
      <div class="vc-cabor-wrap">
        <div class="vc-areas-label">Cabor Tersedia (${v.caborTersedia.length}):</div>
        <div class="area-tags">
          ${caborNames.map(n=>`<span class="area-tag have">${n}</span>`).join('')}
        </div>
      </div>
    </div>`;
  }).join('');
  document.getElementById('selected-venue-count').textContent = sel.length;
}

function toggleVenue(key){
  const sel = G.decisions.selectedVenues;
  const idx = sel.indexOf(key);
  if(idx >= 0){
    if(sel.length > 1){
      sel.splice(idx, 1);
      // Auto-remove cabor no longer available at remaining venues
      const nowAvailable = getAvailableCabor();
      const removed = G.decisions.selectedCabor.filter(c=>!nowAvailable.has(c));
      G.decisions.selectedCabor = G.decisions.selectedCabor.filter(c=>nowAvailable.has(c));
      if(removed.length){
        const names = removed.map(k=>C.cabor[k]?.name||k).join(', ');
        showToast(`⚠ Cabor dihapus otomatis (tidak tersedia di sisa venue): ${names}`,'warn');
      }
    }
  } else {
    if(sel.length < 3) sel.push(key);
  }
  renderVenueCards();
  renderCaborTable();
  updatePreview();
}

// ── CABOR TABLE ──
function renderCaborTable(){
  const sel       = G.decisions.selectedCabor;
  const available = getAvailableCabor();
  const r         = C.rounds[G.round];

  document.getElementById('cabor-rows').innerHTML = Object.entries(C.cabor).map(([key,cb])=>{
    const isSel    = sel.includes(key);
    const isAvail  = available.has(key);
    const rowClass = isSel ? 'selected' : (!isAvail ? 'unavailable' : '');
    return `<tr class="cabor-row ${rowClass}" onclick="${isAvail?`toggleCabor('${key}')`:''}" title="${!isAvail?'Tidak tersedia di venue yang dipilih':''}">
      <td><div class="check-box${isSel?' checked':''}${!isAvail?' disabled':''}"></div></td>
      <td><strong style="${!isAvail?'color:var(--muted)':''}">${cb.name}</strong>${!isAvail?'<span class="na-badge">tidak tersedia</span>':''}</td>
      <td><span class="tag ${cb.kelompok==='Indoor'?'tag-blue':'tag-green'}" style="${!isAvail?'opacity:.4':''}">${cb.kelompok}</span></td>
      <td style="${!isAvail?'color:var(--muted)':''}">${cb.biayaPelaksanaan}M</td>
      <td style="${!isAvail?'color:var(--muted)':''}">${cb.kebutuhanListrik} kVA</td>
      <td style="${!isAvail?'color:var(--muted)':''}">${cb.penontonOffline.toLocaleString()}</td>
      <td style="${!isAvail?'color:var(--muted)':''}">${(cb.hargaTiket*1000).toFixed(0)}k</td>
      <td style="${!isAvail?'color:var(--muted)':''}">${(cb.penontonOnline/1000).toFixed(0)}K</td>
    </tr>`;
  }).join('');

  document.getElementById('total-cabor-label').textContent = sel.length;
  const selTotal = sel.reduce((s,k)=>({ kw: s.kw+C.cabor[k].kebutuhanListrik, cost: s.cost+C.cabor[k].biayaPelaksanaan }), {kw:0,cost:0});
  document.getElementById('cabor-power-total').textContent = selTotal.kw+' kVA';
  document.getElementById('cabor-cost-total').textContent  = selTotal.cost+'M';

  // Color the count label based on min/max
  const label = document.getElementById('total-cabor-label');
  if(sel.length < r.minCabor) label.style.color = 'var(--danger)';
  else if(sel.length > r.maxCabor) label.style.color = 'var(--danger)';
  else label.style.color = 'var(--accent)';
}

function toggleCabor(key){
  const sel       = G.decisions.selectedCabor;
  const available = getAvailableCabor();
  const r         = C.rounds[G.round];

  if(!available.has(key)) return; // blocked — not available at selected venues

  const idx = sel.indexOf(key);
  if(idx >= 0){
    sel.splice(idx, 1);
  } else {
    if(sel.length >= r.maxCabor){
      showToast(`Batas maksimum ${r.maxCabor} cabor untuk ronde ini sudah tercapai.`,'warn');
      return;
    }
    sel.push(key);
  }
  renderCaborTable();
  updatePreview();
}

// ── TOAST NOTIFICATION ──
function showToast(msg, type='warn'){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast toast-'+type+' show';
  clearTimeout(t._tid);
  t._tid = setTimeout(()=>t.classList.remove('show'), 3500);
}

// ═══════════════════════════════════════════════
// LIVE PREVIEW
// ═══════════════════════════════════════════════
function getDecisions(){
  return {
    days:            +document.getElementById('rental-days').value,
    selectedVenues:   G.decisions.selectedVenues,
    selectedCabor:    G.decisions.selectedCabor,
    foodstalls:      +document.getElementById('foodstalls').value,
    foodtrucks:      +document.getElementById('foodtrucks').value,
    extraToilets:    +document.getElementById('extra-toilets').value,
    seating:         +document.getElementById('seating').value,
    generators:      +document.getElementById('generators').value,
    broadcastUpgrade: document.getElementById('broadcast-upgrade').checked,
    backupInternet:   document.getElementById('backup-internet').checked,
    marketing:        activeOpts.marketing,
    staff:           +document.getElementById('staff').value
  };
}

function updatePreview(){
  try{
    const d = getDecisions();
    const r = calc(d, C.rounds[G.round]);
    const c = r.constraints;
    const $ = id => document.getElementById(id);

    $('prev-cost').textContent   = fmtM(r.totalCost);
    $('prev-rev').textContent    = fmtM(r.totalRevenue);
    const budgetPct = Math.round(r.totalCost / r.budget * 100);
    $('prev-budget').textContent = `${budgetPct}%`;
    $('prev-budget').className   = `metric-val ${budgetPct>100?'neg':budgetPct>85?'warn':'pos'}`;

    $('prev-offline').textContent       = r.effectiveOffline.toLocaleString();
    $('prev-online').textContent        = r.onlineViewers.toLocaleString();
    $('prev-capacity').textContent      = r.venueCap.toLocaleString();
    $('prev-capacity-fill').textContent = r.capacityFillPct+'%';

    $('prev-power-supply').textContent = r.powerSupply+' kVA';
    $('prev-power-demand').textContent = r.powerDemand+' kVA';
    $('prev-power-demand').className   = `metric-val ${r.powerDemand>r.powerSupply?'neg':r.powerDemand>r.powerSupply*0.85?'warn':'pos'}`;

    const profitEl = $('preview-profit');
    profitEl.textContent = fmtM(r.profit);
    profitEl.style.color = color(r.profit);

    $('venue-power-display').textContent  = r.venuePower+' kVA';
    $('power-demand-display').textContent = r.powerDemand+' kVA';
    $('toilet-required').textContent      = c.toilet.required;
    $('toilet-have').textContent          = r.totalToilets;
    $('staff-required').textContent       = c.staff.required;

    const bcEl = $('bc-status');
    if(bcEl){ bcEl.textContent = r.hasBroadcasting?'✓ Aktif':'✗ Tidak Aktif'; bcEl.className='vc-val '+(r.hasBroadcasting?'pos':'neg'); }

    function dot(id,ok){ $('c-'+id+'-dot').className='constraint-dot '+(ok?'ok':'fail'); }
    dot('power', c.power.ok);   $('c-power-txt').textContent   = `Listrik: ${r.powerDemand}/${r.powerSupply} kVA`;
    dot('toilet',c.toilet.ok);  $('c-toilet-txt').textContent  = `Toilet: ${r.totalToilets}/${c.toilet.required} unit`;
    dot('staff', c.staff.ok);   $('c-staff-txt').textContent   = `Staf: ${d.staff}/${c.staff.required}`;
    dot('budget',c.budget.ok);  $('c-budget-txt').textContent  = `Anggaran: ${fmtM(r.totalCost)}/${fmtM(r.budget)}`;
    dot('branch',c.branches.ok);$('c-branch-txt').textContent  = `Cabor: ${r.totalBranches}/${c.branches.required} min`;
  }catch(e){}
}

// ═══════════════════════════════════════════════
// SIMULATION
// ═══════════════════════════════════════════════
async function runSimulation(){
  G.decisions = getDecisions();
  showScreen('simulation');
  const r = calc(G.decisions, C.rounds[G.round]);

  const steps = [
    {ico:'🏟',name:'Biaya Sewa Venue',        detail:`${G.decisions.selectedVenues.map(k=>C.venues[k].name).join(', ')} × ${G.decisions.days} hari`, val:r.venueCost},
    {ico:'⚽',name:'Biaya Pelaksanaan Cabor',  detail:`${r.totalBranches} cabang olahraga`,                                                            val:r.sportsCost},
    {ico:'🔧',name:'Fasilitas & Sanitasi',     detail:'Food stalls, food trucks, toilet tambahan, seating',                                            val:r.facilityCost},
    {ico:'⚡',name:'Infrastruktur & Teknologi',detail:'Generator, broadcasting, backup internet',                                                      val:r.addonCost},
    {ico:'📢',name:'Marketing & Operasional',  detail:`Marketing ${G.decisions.marketing} + staf`,                                                     val:r.mktCost + r.staffCost},
  ];

  const container = document.getElementById('sim-steps');
  container.innerHTML = steps.map((_,i)=>`
    <div class="sim-step" id="sim-step-${i}">
      <div class="ico">${steps[i].ico}</div>
      <div class="info"><div class="name">${steps[i].name}</div><div class="detail">${steps[i].detail}</div></div>
      <div class="amount" id="sim-amt-${i}">—</div>
    </div>`).join('');

  const totals = document.getElementById('sim-totals');
  totals.classList.remove('visible');
  totals.innerHTML = '';
  document.getElementById('sim-next').style.display = 'none';

  for(let i=0;i<steps.length;i++){
    const el = document.getElementById('sim-step-'+i);
    el.classList.add('running');
    await delay(600);
    document.getElementById('sim-amt-'+i).textContent = fmtM(steps[i].val);
    el.classList.remove('running');
    el.classList.add('done');
    await delay(150);
  }

  await delay(400);
  totals.innerHTML = `
    <div class="total-row"><span>Total Biaya</span><span style="color:var(--danger)">${fmtM(r.totalCost)}</span></div>
    <div class="total-row"><span>Pendapatan Tiket</span><span>${fmtM(r.ticketRevenue)}</span></div>
    <div class="total-row"><span>Pendapatan Sponsor</span><span>${fmtM(r.sponsorRevenue)}</span></div>
    <div class="total-row"><span>Pendapatan F&B</span><span>${fmtM(r.foodRevenue)}</span></div>
    <div class="total-row"><span>Total Pendapatan</span><span style="color:var(--primary)">${fmtM(r.totalRevenue)}</span></div>
    ${r.penalties.map(p=>`<div class="total-row" style="font-size:13px"><span style="color:var(--danger)">⚠ ${p.name}</span><span style="color:var(--danger)">${p.desc}</span></div>`).join('')}
    <div class="total-row ${r.profit<0?'neg':''}"><span>NET PROFIT</span><span style="color:${color(r.profit)}">${fmtM(r.profit)}</span></div>`;

  await delay(200);
  totals.classList.add('visible');

  const sc   = score(G.decisions, r, C.rounds[G.round]);
  const comp = assessCompetencies(G.decisions, r);
  G.allResults = {d:G.decisions, res:r, sc, comp, round:G.round};

  await delay(800);
  document.getElementById('sim-next').style.display = 'block';
}

function delay(ms){ return new Promise(r=>setTimeout(r,ms)); }

// ═══════════════════════════════════════════════
// RESULTS
// ═══════════════════════════════════════════════
function showResults(){
  const {d,res,sc,comp,round} = G.allResults;
  const r      = C.rounds[round];
  const assess = buildAssessment(d,res,comp);
  G.history[round] = {profit:res.profit, scores:sc, comp, res};
  showScreen('results');
  document.getElementById('results-round-label').textContent = `Ronde ${r.id} dari 3 – ${r.name}`;

  document.getElementById('score-cards').innerHTML = `
    <div class="score-card ${sc.profitScore>=60?'good':sc.profitScore>=30?'warn':'bad'}">
      <div class="s-label">Skor Profit</div><div class="s-value">${sc.profitScore}</div>
      <div class="s-sub">${fmtM(res.profit)} net profit · bobot 35%</div>
    </div>
    <div class="score-card ${sc.complianceScore>=80?'good':sc.complianceScore>=50?'warn':'bad'}">
      <div class="s-label">Kepatuhan Constraint</div><div class="s-value">${sc.complianceScore}</div>
      <div class="s-sub">${[res.constraints.power.ok,res.constraints.toilet.ok,res.constraints.staff.ok,res.constraints.budget.ok,res.constraints.branches.ok].filter(Boolean).length}/5 terpenuhi · bobot 30%</div>
    </div>
    <div class="score-card ${sc.effScore>=60?'good':sc.effScore>=30?'warn':'bad'}">
      <div class="s-label">Efisiensi</div><div class="s-value">${sc.effScore}</div>
      <div class="s-sub">Rev/Biaya = ${(res.totalRevenue/Math.max(res.totalCost,1)).toFixed(2)}× · bobot 20%</div>
    </div>
    <div class="score-card ${sc.riskScore>=60?'good':sc.riskScore>=30?'warn':'bad'}">
      <div class="s-label">Stabilitas / Risiko</div><div class="s-value">${sc.riskScore}</div>
      <div class="s-sub">Broadcasting: ${res.hasBroadcasting?'Aktif':'Tidak'} · bobot 15%</div>
    </div>
    <div class="score-card ${sc.total>=70?'good':sc.total>=40?'warn':'bad'}" style="border:2px solid var(--primary)">
      <div class="s-label">Skor Total Ronde</div>
      <div class="s-value" style="font-size:56px">${sc.total}</div>
      <div class="s-sub">${getGrade(sc.total)}</div>
    </div>`;

  const c = res.constraints;
  document.getElementById('constraint-list').innerHTML = `<div class="section-title">Kepatuhan Constraint</div>` +
    [['Kapasitas Listrik', `${res.powerDemand} kVA demand vs ${res.powerSupply} kVA supply`, c.power.ok],
     ['Sanitasi',          `${res.totalToilets} toilet tersedia, ${c.toilet.required} dibutuhkan`, c.toilet.ok],
     ['Tenaga Staf',       `${d.staff} staf, ${c.staff.required} dibutuhkan`, c.staff.ok],
     ['Anggaran',          `${fmtM(res.totalCost)} biaya vs ${fmtM(res.budget)} anggaran`, c.budget.ok],
     ['Jumlah Cabor',      `${res.totalBranches} cabor dipilih, ${r.minCabor}–${r.maxCabor} range`, c.branches.ok]
    ].map(([name,detail,ok])=>`
      <div class="c-item">
        <div><div style="font-weight:600">${name}</div><div style="font-size:12px;color:var(--muted);margin-top:2px">${detail}</div></div>
        <span class="c-badge ${ok?'ok':'fail'}">${ok?'LOLOS':'GAGAL'}</span>
      </div>`).join('');

  const maxCost = res.totalCost||1;
  document.getElementById('cost-bars').innerHTML = [
    ['Venue',res.venueCost,'#0ea5e9'],['Cabor',res.sportsCost,'#8b5cf6'],
    ['Fasilitas',res.facilityCost,'#f59e0b'],['Infrastruktur',res.addonCost,'#10b981'],
    ['Marketing',res.mktCost,'#ec4899'],['Staf',res.staffCost,'#f97316']
  ].map(([l,v,clr])=>barRow(l,v,maxCost,clr)).join('');

  const maxRev = res.totalRevenue||1;
  document.getElementById('rev-bars').innerHTML = [
    ['Tiket',res.ticketRevenue,'#0ea5e9'],
    ['Sponsor',res.sponsorRevenue,'#10b981'],
    ['F&B',res.foodRevenue,'#f59e0b']
  ].map(([l,v,clr])=>barRow(l,v,maxRev,clr)).join('');

  const compData = [
    ['Analitik',      comp.analytic,   '#0ea5e9'],
    ['Strategis',     comp.strategic,  '#10b981'],
    ['Manaj. Risiko', comp.risk,       '#f59e0b'],
    ['Prioritisasi',  comp.prioritize, '#8b5cf6'],
    ['Trade-off',     comp.tradeoff,   '#ec4899']
  ];
  document.getElementById('comp-bars').innerHTML = compData.map(([l,v,clr])=>`
    <div class="comp-row">
      <div class="comp-label">${l}</div>
      <div class="comp-track"><div class="comp-fill" style="width:${v}%;background:${clr}">${v}</div></div>
      <div class="comp-score" style="color:${clr}">${v}</div>
    </div>`).join('');

  setTimeout(()=>{
    drawRadar(document.getElementById('radar-canvas'),
      compData.map(c=>c[0]), compData.map(c=>c[1]/100));
  },100);

  document.getElementById('strengths-list').innerHTML =
    assess.strengths.map(s=>`<div class="strength-item">${s}</div>`).join('') ||
    '<div style="color:var(--muted);font-size:13px">Tidak ada kekuatan signifikan ronde ini.</div>';
  document.getElementById('weaknesses-list').innerHTML =
    assess.weaknesses.map(s=>`<div class="weakness-item">${s}</div>`).join('') ||
    '<div style="color:var(--muted);font-size:13px">Tidak ada kelemahan kritis yang teridentifikasi.</div>';
  document.getElementById('penalty-notices').innerHTML = res.penalties.length ?
    `<div class="penalty-notice"><strong>⚠ Pelanggaran Constraint:</strong><br>${res.penalties.map(p=>`• ${p.name}: ${p.desc}`).join('<br>')}</div>` : '';

  const nextBtn = document.getElementById('next-round-btn');
  if(round >= 2){ nextBtn.textContent='Lihat Laporan Akhir →'; nextBtn.onclick=showFinalReport; }
  else { nextBtn.textContent=`Lanjut ke Ronde ${round+2} →`; nextBtn.onclick=nextRound; }
}

function barRow(label,val,max,clr){
  const pct = Math.round(val/max*100);
  return `<div class="bar-row">
    <div class="bar-label">${label}</div>
    <div class="bar-track"><div class="bar-fill" style="width:${pct}%;background:${clr}">${fmtM(val)}</div></div>
    <div class="bar-val" style="color:${clr}">${pct}%</div>
  </div>`;
}

function getGrade(s){
  if(s>=90)return'★ Luar Biasa';
  if(s>=75)return'✦ Sangat Baik';
  if(s>=60)return'◆ Cakap';
  if(s>=45)return'◇ Berkembang';
  return'△ Perlu Perbaikan';
}

// ═══════════════════════════════════════════════
// RADAR CHART
// ═══════════════════════════════════════════════
function drawRadar(canvas, labels, values){
  const ctx=canvas.getContext('2d');
  const W=canvas.width, H=canvas.height;
  ctx.clearRect(0,0,W,H);
  const cx=W/2, cy=H/2, r=Math.min(W,H)/2-36;
  const n=labels.length;
  const angle=i=>-Math.PI/2+(2*Math.PI/n)*i;
  for(let ring=1;ring<=5;ring++){
    ctx.beginPath();
    for(let i=0;i<n;i++){
      const a=angle(i),rr=r*ring/5;
      i===0?ctx.moveTo(cx+rr*Math.cos(a),cy+rr*Math.sin(a)):ctx.lineTo(cx+rr*Math.cos(a),cy+rr*Math.sin(a));
    }
    ctx.closePath();
    ctx.strokeStyle=ring===5?'#2d4060':'#1e3048';
    ctx.lineWidth=ring===5?1.5:1; ctx.stroke();
  }
  for(let i=0;i<n;i++){
    ctx.beginPath(); ctx.moveTo(cx,cy);
    ctx.lineTo(cx+r*Math.cos(angle(i)),cy+r*Math.sin(angle(i)));
    ctx.strokeStyle='#1e3048'; ctx.lineWidth=1; ctx.stroke();
  }
  ctx.beginPath();
  values.forEach((v,i)=>{
    const a=angle(i),rv=r*v;
    i===0?ctx.moveTo(cx+rv*Math.cos(a),cy+rv*Math.sin(a)):ctx.lineTo(cx+rv*Math.cos(a),cy+rv*Math.sin(a));
  });
  ctx.closePath();
  ctx.fillStyle='rgba(14,165,233,.18)'; ctx.fill();
  ctx.strokeStyle='#0ea5e9'; ctx.lineWidth=2; ctx.stroke();
  values.forEach((v,i)=>{
    const a=angle(i),rv=r*v;
    ctx.beginPath(); ctx.arc(cx+rv*Math.cos(a),cy+rv*Math.sin(a),4,0,Math.PI*2);
    ctx.fillStyle='#0ea5e9'; ctx.fill();
  });
  ctx.fillStyle='#94a3b8'; ctx.font='bold 10px Segoe UI,sans-serif'; ctx.textAlign='center';
  labels.forEach((l,i)=>{
    const a=angle(i),rr=r+22;
    ctx.fillText(l, cx+rr*Math.cos(a), cy+rr*Math.sin(a)+4);
  });
}

// ═══════════════════════════════════════════════
// GAME FLOW
// ═══════════════════════════════════════════════
function nextRound(){
  G.round++;
  if(G.round >= 3){ showFinalReport(); return; }
  G.decisions = DEFAULT_DECISIONS();
  Object.assign(activeOpts, {marketing:'medium'});
  renderBriefing();
  showScreen('briefing');
}

function showFinalReport(){
  showScreen('final-report');
  const totals     = G.history.map(h=>h.scores.total);
  const finalScore = Math.round(totals.reduce((s,t)=>s+t,0)/totals.length);
  const n          = G.history.length;
  const avgComp = {
    analytic:   Math.round(G.history.reduce((s,h)=>s+h.comp.analytic,  0)/n),
    strategic:  Math.round(G.history.reduce((s,h)=>s+h.comp.strategic, 0)/n),
    risk:       Math.round(G.history.reduce((s,h)=>s+h.comp.risk,      0)/n),
    prioritize: Math.round(G.history.reduce((s,h)=>s+h.comp.prioritize,0)/n),
    tradeoff:   Math.round(G.history.reduce((s,h)=>s+h.comp.tradeoff,  0)/n)
  };
  document.getElementById('final-score').textContent = finalScore;
  document.getElementById('grade-label').innerHTML =
    `<span class="tag tag-${finalScore>=75?'green':finalScore>=50?'warn':'red'}" style="font-size:18px;padding:8px 20px">${getGrade(finalScore)}</span>`;

  const compData = [
    ['Analitik',      avgComp.analytic,   '#0ea5e9'],
    ['Strategis',     avgComp.strategic,  '#10b981'],
    ['Manaj. Risiko', avgComp.risk,       '#f59e0b'],
    ['Prioritisasi',  avgComp.prioritize, '#8b5cf6'],
    ['Trade-off',     avgComp.tradeoff,   '#ec4899']
  ];
  document.getElementById('final-comp-bars').innerHTML = compData.map(([l,v,clr])=>`
    <div class="comp-row">
      <div class="comp-label">${l}</div>
      <div class="comp-track"><div class="comp-fill" style="width:${v}%;background:${clr}">${v}</div></div>
      <div class="comp-score" style="color:${clr}">${v}</div>
    </div>`).join('');

  setTimeout(()=>{
    drawRadar(document.getElementById('final-radar'),
      compData.map(c=>c[0]), compData.map(c=>c[1]/100));
  },100);

  const strongest   = compData.reduce((a,b)=>a[1]>=b[1]?a:b);
  const weakest     = compData.reduce((a,b)=>a[1]<=b[1]?a:b);
  const totalProfit = G.history.reduce((s,h)=>s+(h.profit||0),0);

  document.getElementById('final-assessment').innerHTML = `
    <h3>Penilaian Akhir</h3>
    <p style="color:var(--muted);font-size:14px;line-height:1.7;margin-bottom:16px">
      Sepanjang 3 ronde, performa Anda sebagai Event Director menunjukkan kemampuan
      <strong style="color:var(--text)">${getGrade(finalScore).replace(/[★✦◆◇△]\s/,'')}</strong>
      dalam perencanaan ekosistem event olahraga. Total profit bersih: <strong style="color:${color(totalProfit)}">${fmtM(totalProfit)}</strong>.
    </p>
    <div class="divider"></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px">
      <div>
        <div style="font-size:12px;color:var(--accent);text-transform:uppercase;letter-spacing:1px;margin-bottom:10px">Kekuatan Utama</div>
        <div style="font-size:14px;font-weight:700">${strongest[0]}</div>
        <div style="font-size:13px;color:var(--muted);margin-top:4px">Skor: ${strongest[1]}/100. Kompetensi paling konsisten.</div>
      </div>
      <div>
        <div style="font-size:12px;color:var(--danger);text-transform:uppercase;letter-spacing:1px;margin-bottom:10px">Area Pengembangan</div>
        <div style="font-size:14px;font-weight:700">${weakest[0]}</div>
        <div style="font-size:13px;color:var(--muted);margin-top:4px">Skor: ${weakest[1]}/100. Fokus di sini untuk peningkatan.</div>
      </div>
    </div>
    <div class="divider"></div>
    <div style="font-size:13px;color:var(--muted);line-height:1.7;margin-top:12px">
      <strong style="color:var(--text)">Performa Per Ronde:</strong>
      ${G.history.map((h,i)=>`Ronde ${i+1}: Skor ${h.scores.total} (Profit: ${fmtM(h.profit)})`).join(' &nbsp;·&nbsp; ')}
    </div>`;
}

function restartGame(){
  G = {round:0, history:[], allResults:null, decisions:DEFAULT_DECISIONS()};
  Object.assign(activeOpts, {marketing:'medium'});
  renderBriefing();
  showScreen('briefing');
}

// ═══════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════
window.addEventListener('load',()=>{
  renderBriefing();
  showScreen('briefing');
});
