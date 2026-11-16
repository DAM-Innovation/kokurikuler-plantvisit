// Pengaturan admin: bobot gabungan nilai dan batas predikat. Disimpan di sheet "Pengaturan".
V.setting=()=>{const b=CFG.bobot,a=CFG.ambang;
return head('Pengaturan','Bobot sumber penilaian dan batas predikat.')+`<div class="card"><h3>Bobot nilai karakter (total 100)</h3><div class="fl">
<div><label>Observasi guru (%)</label><input id="s_obs" type="number" min="0" max="100" value="${b.obs}"></div>
<div><label>Teman sebaya (%)</label><input id="s_peer" type="number" min="0" max="100" value="${b.peer}"></div>
<div><label>Penilaian diri (%)</label><input id="s_diri" type="number" min="0" max="100" value="${b.diri}"></div></div>
<p class="m">Jika suatu sumber belum ada datanya, bobot dibagi ulang ke sumber yang tersedia.</p></div>
<div class="card"><h3>Batas predikat (skor 0-100)</h3><div class="fl">
<div><label>Sangat Baik ≥</label><input id="a0" type="number" value="${a[0]}"></div>
<div><label>Baik ≥</label><input id="a1" type="number" value="${a[1]}"></div>
<div><label>Cukup ≥</label><input id="a2" type="number" value="${a[2]}"></div></div>
<p class="m">Di bawah batas Cukup = Perlu Bimbingan.</p><button class="btn" onclick="saveCfg()">Simpan pengaturan</button></div>`};
async function saveCfg(){
  const bobot={obs:+$('#s_obs').value||0,peer:+$('#s_peer').value||0,diri:+$('#s_diri').value||0};
  if(bobot.obs+bobot.peer+bobot.diri!=100)return toast('Total bobot harus 100',1);
  const ambang=[0,1,2].map(i=>+$('#a'+i).value);
  if(!(ambang[0]>ambang[1]&&ambang[1]>ambang[2]))return toast('Batas predikat harus menurun',1);
  try{await api('saveCfg',{bobot,ambang});CFG={bobot,ambang};toast('Pengaturan tersimpan')}catch(e){toast(e.message,1)}
}
