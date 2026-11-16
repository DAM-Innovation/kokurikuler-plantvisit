// Pengaturan admin: bobot instrumen, ambang predikat, dan isi rubrik. Disimpan di sheet "Pengaturan".
V.setting=()=>{const b=CFG.bobot,a=CFG.ambang;
const bw=[['obs','Observasi guru'],['peer','Teman sebaya'],['diri','Penilaian diri'],['produk','Produk kelompok']];
return`<div class="card"><h3>Bobot instrumen (total harus 100)</h3><div class="g2">${bw.map(([k,n])=>`<div><label>${n} (%)</label><input id="s_${k}" type="number" min="0" max="100" value="${b[k]}"></div>`).join('')}</div></div>
<div class="card"><h3>Batas nilai predikat (skala 1-4)</h3><div class="g2"><div><label>Sangat Baik ≥</label><input id="a0" type="number" step="0.05" value="${a[0]}"></div><div><label>Baik ≥</label><input id="a1" type="number" step="0.05" value="${a[1]}"></div><div><label>Cukup ≥</label><input id="a2" type="number" step="0.05" value="${a[2]}"></div><div><p class="m">Di bawah batas Cukup = Perlu Bimbingan.</p></div></div></div>
<div class="card"><h3>Rubrik indikator</h3>${KN.map((n,i)=>`<b>K${i+1} ${n}</b><div class="g2">${[4,3,2,1].map((v,j)=>`<div><label>Skor ${v}</label><textarea id="r${i}_${j}" rows="2">${esc(CFG.rubrik[i][j])}</textarea></div>`).join('')}</div>`).join('<hr>')}</div>
<button class="btn" onclick="saveCfg()">Simpan pengaturan</button>`};
async function saveCfg(){
  const bobot={};['obs','peer','diri','produk'].forEach(k=>bobot[k]=+$('#s_'+k).value||0);
  if(Object.values(bobot).reduce((t,x)=>t+x,0)!=100)return toast('Total bobot harus 100',1);
  const ambang=[0,1,2].map(i=>+$('#a'+i).value);
  if(!(ambang[0]>ambang[1]&&ambang[1]>ambang[2]))return toast('Batas predikat harus menurun',1);
  const rubrik=KN.map((n,i)=>[0,1,2,3].map(j=>$(`#r${i}_${j}`).value));
  try{await api('saveCfg',{bobot,ambang,rubrik});CFG={bobot,ambang,rubrik};toast('Pengaturan tersimpan')}catch(e){toast(e.message,1)}
}
