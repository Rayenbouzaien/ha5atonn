// ================================================
// CAPACITOR IMPORTS
// ================================================
// Note: These imports require running 'npm install' and 'npx cap sync'
// For web: these will be undefined, which is fine
let Preferences, Camera, CameraResultType, CameraSource, Browser;

// Dynamically import Capacitor modules if available (for mobile)
if (typeof window !== 'undefined' && window.location.protocol !== 'file:') {
  Promise.all([
    import('@capacitor/preferences').then(m => { Preferences = m.Preferences; }),
    import('@capacitor/camera').then(m => { 
      Camera = m.Camera; 
      CameraResultType = m.CameraResultType; 
      CameraSource = m.CameraSource; 
    }),
    import('@capacitor/browser').then(m => { Browser = m.Browser; })
  ]).catch(() => console.log('⚠️  Capacitor modules not available on this platform'));
}

// ================================================
// RULE-BASED AI SYSTEM (No External API)
// ================================================
const RuleBasedAI = {
  knowledgeBase: {
    // Scout skills and training
    skills: {
      'knot|عقدة': 'العقدة المربعة من أهم مهارات الكشاف. ابدأ بوضع الطرف الأيمن فوق الأيسر، ثم أمرره من تحته. كرر من الجهة الأخرى واسحب بقوة.',
      'rope|حبل': 'الحبل أداة أساسية في الكشافة. استخدمه لربط الخيمة أو عمل هياكل معسكرية.',
      'flag|علم': 'تحية العلم تعبر عن احترام الوطن. قف منتصباً وارفع يدك اليمنى إلى جبينك.',
      'hand sign|إشارة': 'الإشارات اليدوية طريقة تواصل صامتة. 3 أصابع = شارة الكشافة، الإبهام للأعلى = موافق.',
      'song|نشيد': 'نشيد الكشافة "كشافة تونس يا عز الوطن" يجمع الفريق معاً. تعلمه بقلب يعبر عن الانتماء.',
    },
    // Scout values
    values: {
      'شرف|honor': 'الشرف أساس الكشافة. كن صادقاً ومخلصاً لالتزاماتك.',
      'مسؤولية|responsibility': 'الكشاف يتحمل مسؤوليته تجاه فريقه والمجتمع.',
      'صداقة|friendship': 'الصداقة بين الكشافين تبنى على الثقة والاحترام المتبادل.',
      'خدمة|service': 'خدمة المجتمع واجب أساسي على كل كشاف.',
    },
    // Encouragement
    motivation: {
      'تحفيز|motivat': 'أنت تحقق تقدماً رائعاً! استمر في التدريب وستصبح قائداً مميزاً.',
      'صعب|difficult': 'المهارات الجديدة تبدو صعبة في البداية، لكن التكرار يجعلها سهلة. لا تستسلم!',
      'فشل|fail': 'الفشل ليس نهاية، بل فرصة للتعلم. جرب مرة أخرى بطريقة مختلفة.',
      'تعب|tired': 'استريح قليلاً، لكن لا تنس أن الإصرار هو مفتاح النجاح!',
    },
    // Game tips
    gameTips: {
      'أغنية|song': 'تذكر كلمات النشيد: "كشافة تونس يا عز الوطن، نحن أبناء الجهاد والوطن"',
      'عقدة|knot': 'ركز على خطواتك: فوق وتحت، ثم كرر من الجهة الأخرى.',
      'علم|flag': 'الوقفة المنتصبة تظهر احترامك. راقب اتجاه العلم وتحرك ببطء وثقة.',
      'إشارات|signs': 'كل إشارة لها معنى محدد. تعلمها بترتيب وتدرب عليها.',
    }
  },

  // Smart response generator
  generateResponse(query) {
    query = query.toLowerCase().trim();
    
    // Check knowledge base
    for (const [keywords, response] of Object.entries(this.knowledgeBase.skills)) {
      if (keywords.split('|').some(k => query.includes(k))) return response;
    }
    
    for (const [keywords, response] of Object.entries(this.knowledgeBase.values)) {
      if (keywords.split('|').some(k => query.includes(k))) return response;
    }
    
    for (const [keywords, response] of Object.entries(this.knowledgeBase.motivation)) {
      if (keywords.split('|').some(k => query.includes(k))) return response;
    }
    
    for (const [keywords, response] of Object.entries(this.knowledgeBase.gameTips)) {
      if (keywords.split('|').some(k => query.includes(k))) return response;
    }
    
    // Default helpful response
    return 'استمر في التدريب! كل كشاف يمتلك القدرة على تحقيق أهدافه بالإصرار والعمل الجاد.';
  },

  // Get game feedback
  getGameFeedback(gameId, success) {
    const feedbacks = {
      song: {
        success: '🎵 ممتاز! حفظت النشيد الكشفي بشكل مثالي. روحك الكشفية واضحة!',
        failed: '🎵 حاول مرة أخرى! النشيد يتطلب تركيزاً. ركز على المعنى لا الكلمات فقط.'
      },
      knot: {
        success: '🪢 عظيم! تحكمت بربط العقدة المربعة. هذه مهارة أساسية ستساعدك كثيراً!',
        failed: '🪢 تقريباً! العقدة تحتاج صبراً. أعد محاولتك وركز على الخطوات الأربع.'
      },
      flag: {
        success: '🚩 رائع! تحيتك للعلم تعبر عن احترام حقيقي للوطن. فخور بك!',
        failed: '🚩 حاول مرة أخرى! تحية العلم تحتاج توقار. قف منتصباً وحرك يدك بتمهل.'
      },
      signs: {
        success: '🤟 مذهل! أتقنت الإشارات الكشفية. التواصل الصامت مفيد جداً في الحقل!',
        failed: '🤟 تقدم جيد! الإشارات تحتاج ممارسة. حاول أن تتذكر معنى كل واحدة.'
      }
    };
    
    return feedbacks[gameId]?.[success ? 'success' : 'failed'] || 
           (success ? '👏 أحسنت! استمر هكذا!' : '💪 حاول مرة أخرى! أنت قادر على ذلك!');
  },

  // Get member advice
  getMemberAdvice(memberId) {
    const advices = [
      'استمتع بكل لحظة في المعسكر. الصداقات والمهارات التي تكتسبها ستبقى معك للأبد.',
      'لا تخاف من طلب المساعدة. الكشافة فريق وكل فرد يدعم الآخر.',
      'تذكر أن التدريب يجعل الكمال. كل محاولة تقربك من النجاح.',
      'كن قدوة حسنة لرفاقك. القيادة تبدأ من حسن السلوك.',
      'اسأل أسئلة! الفضول والتعلم جزء من روح الكشاف.',
      'ساعد زملاءك الجدد. تعليم الآخرين ينمي مهاراتك أيضاً.',
    ];
    
    return advices[Math.floor(Math.random() * advices.length)];
  }
};

// Simple async wrapper for compatibility
async function callAI(query) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(RuleBasedAI.generateResponse(query));
    }, 300);
  });
}

// ================================================
// PERSISTENT STORAGE MANAGER (Capacitor Preferences)
// ================================================
const StorageManager = {
  async saveState() {
    try {
      if (Preferences) {
        await Preferences.set({
          key: 'kashafa_app_state',
          value: JSON.stringify(APP_STATE),
        });
        console.log('✅ App state saved to device storage');
      }
    } catch (error) {
      console.error('❌ Save to device storage failed:', error);
    }
  },

  async loadState() {
    try {
      if (Preferences) {
        const result = await Preferences.get({ key: 'kashafa_app_state' });
        if (result.value) {
          const savedState = JSON.parse(result.value);
          // Merge saved state with defaults (preserves any new properties)
          Object.assign(APP_STATE, savedState);
          console.log('✅ App state loaded from device storage');
          return true;
        }
      }
    } catch (error) {
      console.error('❌ Load from device storage failed:', error);
    }
    return false;
  },

  async clearState() {
    try {
      if (Preferences) {
        await Preferences.remove({ key: 'kashafa_app_state' });
        console.log('✅ App state cleared from device storage');
      }
    } catch (error) {
      console.error('❌ Clear from device storage failed:', error);
    }
  }
};

// Auto-save whenever state changes
const autoSaveState = () => {
  StorageManager.saveState();
};

// ================================================
// NATIVE CAMERA PHOTO CAPTURE (Capacitor Camera)
// ================================================
async function capturePhotoNative() {
  try {
    if (!Camera || !CameraResultType || !CameraSource) {
      // Fallback to web file input if Camera not available
      document.getElementById('photoInput').click();
      return;
    }

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt, // Let user choose camera or gallery
    });

    // Update preview
    memberPhotoData = image.dataUrl;
    const prev = document.getElementById('photoPreview');
    prev.innerHTML = `<img src="${image.dataUrl}" style="width:100%;height:100%;border-radius:50%;object-fit:cover"/>`;
    prev.style.animation = 'none';
    
    console.log('✅ Photo captured successfully');
  } catch (error) {
    console.log('Photo capture cancelled or Camera not available');
    // Fallback to web file input
    document.getElementById('photoInput').click();
  }
}

// Keep fallback for web browsers using file input
function previewPhoto(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    memberPhotoData = e.target.result;
    const prev = document.getElementById('photoPreview');
    prev.innerHTML = `<img src="${e.target.result}" style="width:100%;height:100%;border-radius:50%;object-fit:cover"/>`;
    prev.style.animation = 'none';
  };
  reader.readAsDataURL(file);
}

// ================================================
// OPEN EXTERNAL LINKS (Capacitor Browser)
// ================================================
async function openWikipedia(url) {
  try {
    if (Browser) {
      // Open in in-app browser on mobile
      await Browser.open({ url });
    } else {
      // Fallback to system browser on web
      window.open(url, '_blank');
    }
  } catch (error) {
    console.log('Browser.open failed, using window.open fallback:', error);
    window.open(url, '_blank');
  }
}

// ================================================
// STATE
// ================================================
let currentRating = 3;
let selectedMember = null;
let spinning = false;
let spinAngle = 0;
let memberPhotoData = null;

const APP_STATE = {
  leader: { email: 'leader@scouts.tn', pwd: 'scout123', name: 'القائد أحمد' },
  members: [
    { id:'KSF-TN-0001', name:'أمير', family:'بن علي', age:11, rank:'كشاف', section:'الفوج 3', skill:2, xp:10, gamesPlayed:1, photoEmoji:'👦' },
    { id:'KSF-TN-0002', name:'ليلى', family:'الشابي', age:10, rank:'شبل', section:'الفوج 3', skill:4, xp:45, gamesPlayed:3, photoEmoji:'👧' },
    { id:'KSF-TN-0003', name:'كريم', family:'المنصوري', age:12, rank:'مرشد', section:'الفوج 2', skill:3, xp:30, gamesPlayed:2, photoEmoji:'🧒' },
    { id:'KSF-TN-0004', name:'سارة', family:'الزغلامي', age:10, rank:'شبل', section:'الفوج 3', skill:1, xp:5, gamesPlayed:0, photoEmoji:'👧' },
  ],
  games: [
    { id:'song',  title:'أغنية الكشافة',  emoji:'🎵', desc:'ردد النشيد الكشفي مع رفاقك',    difficulty:1, category:'ثقافة',  minXP:0,  priority:'high', xpReward:15 },
    { id:'knot',  title:'العقدة المربعة', emoji:'🪢', desc:'تعلّم ربط العقدة بالخطوات',     difficulty:2, category:'بقاء',   minXP:0,  priority:'high', xpReward:20 },
    { id:'flag',  title:'تحية العلم',     emoji:'🚩', desc:'خطوات تحية العلم الصحيحة',     difficulty:1, category:'ثقافة',  minXP:0,  priority:'mid',  xpReward:12 },
    { id:'signs', title:'إشارات اليد',    emoji:'🤟', desc:'الإشارات الكشفية الرسمية',     difficulty:2, category:'مهارات', minXP:10, priority:'low',  xpReward:18 },
  ],
  currentMemberId: null,
  wheelColors: ['#FFB703','#E63946','#52B788','#FF6B35','#56CFE1','#6A0572','#2D6A4F','#FB8500'],
};

const wikiData = {
  'الكشافة':{ title:'الكشافة', desc:'الكشافة حركة تربوية عالمية تهدف إلى تنمية شخصية الشباب عبر الأنشطة الخارجية والتدريب على القيادة والخدمة المجتمعية.', url:'https://ar.wikipedia.org/wiki/كشافة' },
  'تونس':{ title:'تونس', desc:'الجمهورية التونسية دولة عربية في شمال أفريقيا، عاصمتها تونس. تشتهر بتراثها الحضاري العريق وسواحلها البحرية الجميلة.', url:'https://ar.wikipedia.org/wiki/تونس' },
  'النباتات':{ title:'النباتات', desc:'النباتات كائنات حية ذاتية التغذية تستخدم ضوء الشمس لإنتاج الغذاء عبر البناء الضوئي. تشمل الأشجار والأعشاب والزهور.', url:'https://ar.wikipedia.org/wiki/نبات' },
  'الحيوانات':{ title:'الحيوانات', desc:'الحيوانات كائنات متعددة الخلايا تتغذى على الكائنات الأخرى. تشمل الثدييات والطيور والزواحف والحشرات وغيرها.', url:'https://ar.wikipedia.org/wiki/حيوان' },
  'الإسعافات الأولية':{ title:'الإسعافات الأولية', desc:'الإسعافات الأولية هي المساعدة الفورية المقدمة للمصابين قبل وصول المتخصصين. تشمل وقف النزيف والضغط على الجروح والإنعاش.', url:'https://ar.wikipedia.org/wiki/إسعافات_أولية' },
};

const geoData = [
  { name:'جبال الأطلس', emoji:'⛰️', desc:'سلسلة جبلية تمتد في شمال أفريقيا' },
  { name:'الصحراء الكبرى', emoji:'🏜️', desc:'أكبر صحراء حارة في العالم' },
  { name:'البحر الأبيض المتوسط', emoji:'🌊', desc:'يحيط بتونس من الشمال' },
  { name:'شط الجريد', emoji:'🧂', desc:'أكبر بحيرة ملحية في تونس' },
  { name:'جزيرة جربة', emoji:'🏝️', desc:'أكبر جزيرة في تونس' },
  { name:'وادي مجردة', emoji:'💧', desc:'أطول نهر في تونس' },
];

const natureData = [
  { name:'الزيتون', emoji:'🫒', desc:'شجرة مقدسة ورمز تونس' },
  { name:'النخيل', emoji:'🌴', desc:'نخيل التمر في الجنوب' },
  { name:'الحرباء', emoji:'🦎', desc:'تتغير لونها للتمويه' },
  { name:'الأرنب البري', emoji:'🐇', desc:'يعيش في الغابات والحقول' },
  { name:'الخزامى', emoji:'🌸', desc:'نبات عطري طبي طبيعي' },
  { name:'النسر الملكي', emoji:'🦅', desc:'طائر جارح نادر في تونس' },
];

// ================================================
// INIT DECORATIONS
// ================================================
function createStars(containerId, count) {
  const c = document.getElementById(containerId);
  if (!c) return;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = 1 + Math.random() * 3;
    s.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      top:${Math.random()*70}%;
      animation-delay:${Math.random()*3}s;
      animation-duration:${1.5+Math.random()*2}s;
    `;
    c.appendChild(s);
  }
}

function createFireflies(containerId, count) {
  const c = document.getElementById(containerId);
  if (!c) return;
  for (let i = 0; i < count; i++) {
    const f = document.createElement('div');
    f.className = 'firefly';
    const fx = (Math.random()-0.5)*80 + 'px';
    const fy = (Math.random()-0.5)*80 + 'px';
    const fx2 = (Math.random()-0.5)*120 + 'px';
    const fy2 = (Math.random()-0.5)*100 + 'px';
    f.style.cssText = `
      left:${5+Math.random()*90}%;
      top:${10+Math.random()*80}%;
      --fx:${fx}; --fy:${fy}; --fx2:${fx2}; --fy2:${fy2};
      animation-delay:${Math.random()*6}s;
      animation-duration:${4+Math.random()*4}s;
    `;
    c.appendChild(f);
  }
}

// ================================================
// NAVIGATION
// ================================================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  el.classList.add('active');
  if (id === 'screen-leader') refreshLeaderDashboard();
  if (id === 'screen-spin') { refreshSpinScreen(); createFireflies('spinFireflies',8); }
  if (id === 'screen-games') refreshGamesScreen();
  if (id === 'screen-explore') initExplorer();
}

// ================================================
// LOGIN
// ================================================
function doLogin() {
  const em = document.getElementById('loginEmail').value.trim();
  const pw = document.getElementById('loginPwd').value;
  if (em === APP_STATE.leader.email && pw === APP_STATE.leader.pwd) {
    document.getElementById('loginError').classList.add('hidden');
    showScreen('screen-leader');
  } else {
    document.getElementById('loginError').classList.remove('hidden');
  }
}

function doLogout() { showScreen('screen-login'); APP_STATE.currentMemberId = null; }
function showMemberLogin() { const m = document.getElementById('memberLoginModal'); m.style.display='flex'; }
function hideMemberLogin() { const m = document.getElementById('memberLoginModal'); m.style.display='none'; }

function doMemberLogin() {
  const id = document.getElementById('memberIdInput').value.trim().toUpperCase();
  const m = APP_STATE.members.find(x => x.id === id);
  if (m) {
    hideMemberLogin();
    APP_STATE.currentMemberId = m.id;
    selectedMember = m;
    showScreen('screen-games');
  } else {
    document.getElementById('memberLoginError').classList.remove('hidden');
  }
}

// ================================================
// LEADER DASHBOARD
// ================================================
function leaderTab(btn, id) {
  document.querySelectorAll('.camp-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.leader-tab').forEach(t => t.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

function refreshLeaderDashboard() {
  document.getElementById('statTotal').textContent = APP_STATE.members.length;
  document.getElementById('statActive').textContent = APP_STATE.members.filter(m => m.gamesPlayed > 0).length;
  document.getElementById('statGames').textContent = APP_STATE.members.reduce((a,m) => a + m.gamesPlayed, 0);

  const list = document.getElementById('membersList');
  const none = document.getElementById('noMembers');
  if (!APP_STATE.members.length) {
    list.innerHTML=''; none.classList.remove('hidden'); return;
  }
  none.classList.add('hidden');
  list.innerHTML = APP_STATE.members.map((m,i) => `
    <div class="member-card" style="animation-delay:${i*0.06}s">
      <div class="avatar-frame">${m.photoData?`<img src="${m.photoData}"/>`:(m.photoEmoji||'⚜️')}</div>
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
          <p style="font-family:Fredoka One;font-size:1rem;color:var(--outline)">${m.name} ${m.family}</p>
          <span class="prio-badge prio-${m.skill<=2?'high':m.skill<=3?'mid':'low'}">${m.skill}/5 ⭐</span>
        </div>
        <p style="font-size:0.72rem;color:#888">${m.id} · ${m.rank} · ${m.section}</p>
        <div style="display:flex;align-items:center;gap:8px;margin-top:4px">
          <div class="rope-track" style="flex:1;height:10px">
            <div class="rope-fill" style="width:${Math.min(m.xp,100)}%"></div>
          </div>
          <span style="font-size:0.75rem;font-family:Fredoka One;color:var(--amber)">${m.xp} XP</span>
        </div>
      </div>
      <div style="text-align:center">
        <div style="font-size:0.9rem">${'⭐'.repeat(m.skill)}${'☆'.repeat(5-m.skill)}</div>
        <button class="toon-btn toon-btn-fire mt-2" style="font-size:0.75rem;padding:4px 10px" onclick="removeMember('${m.id}')">🗑️</button>
      </div>
    </div>
  `).join('');

  // Task priorities
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = APP_STATE.games.map(g => `
    <div class="toon-card p-3" style="display:flex;align-items:center;gap:10px">
      <div style="font-size:1.8rem">${g.emoji}</div>
      <div style="flex:1">
        <p style="font-family:Fredoka One;font-size:0.95rem;color:var(--outline)">${g.title}</p>
        <p style="font-size:0.72rem;color:#888">${g.category} · مستوى ${g.difficulty}</p>
      </div>
      <select class="toon-input" style="width:120px;font-size:0.8rem;padding:6px 8px" onchange="setPriority('${g.id}',this.value)">
        <option value="high" ${g.priority==='high'?'selected':''}>🔴 عالية</option>
        <option value="mid" ${g.priority==='mid'?'selected':''}>🟡 متوسطة</option>
        <option value="low" ${g.priority==='low'?'selected':''}>🟢 منخفضة</option>
      </select>
    </div>
  `).join('');
}

function removeMember(id) {
  APP_STATE.members = APP_STATE.members.filter(m => m.id !== id);
  refreshLeaderDashboard();
  autoSaveState();
}

function setPriority(id, val) {
  const g = APP_STATE.games.find(x => x.id === id);
  if (g) {
    g.priority = val;
    autoSaveState();
  }
}

function setRating(n) {
  currentRating = n;
  const stars = document.querySelectorAll('.star-btn');
  stars.forEach((s,i) => { s.textContent = i < n ? '⭐' : '☆'; });
  document.getElementById('ratingDisplay').textContent = n;
}

function previewPhoto(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    memberPhotoData = e.target.result;
    const prev = document.getElementById('photoPreview');
    prev.innerHTML = `<img src="${e.target.result}" style="width:100%;height:100%;border-radius:50%;object-fit:cover"/>`;
    prev.style.animation = 'none';
  };
  reader.readAsDataURL(file);
}

function addMember() {
  const name = document.getElementById('addName').value.trim();
  const family = document.getElementById('addFamily').value.trim();
  const age = parseInt(document.getElementById('addAge').value)||10;
  const section = document.getElementById('addSection').value.trim()||'الفوج 1';
  const rank = document.getElementById('addRank').value;
  if (!name||!family) { alert('الرجاء إدخال الاسم واللقب'); return; }
  const newId = `KSF-TN-${String(APP_STATE.members.length+1).padStart(4,'0')}`;
  APP_STATE.members.push({ id:newId, name, family, age, rank, section, skill:currentRating, xp:0, gamesPlayed:0, photoEmoji: rank==='شبل'?'🐻':rank==='مرشد'?'🌟':'⚜️', photoData:memberPhotoData });
  document.getElementById('addName').value='';
  document.getElementById('addFamily').value='';
  document.getElementById('addAge').value='';
  document.getElementById('addSection').value='';
  memberPhotoData=null;
  document.getElementById('photoPreview').innerHTML='📸';
  document.getElementById('photoPreview').style.animation='treeSway 2s ease-in-out infinite alternate';
  setRating(3);
  const s=document.getElementById('addSuccess');
  s.classList.remove('hidden');
  setTimeout(()=>s.classList.add('hidden'),2500);
  autoSaveState();
}

// ================================================
// SPIN
// ================================================
function getSpinCandidates() {
  return APP_STATE.members.slice().sort((a,b) => {
    const sA = a.skill + (a.xp/10) + (a.gamesPlayed*2);
    const sB = b.skill + (b.xp/10) + (b.gamesPlayed*2);
    return sA - sB;
  });
}

function refreshSpinScreen() {
  document.getElementById('spinResult').classList.add('hidden');
  drawWheel(APP_STATE.members);
  const sorted = getSpinCandidates();
  const list = document.getElementById('spinMembersList');
  list.innerHTML = sorted.map((m,i) => `
    <div style="background:${i===0?'rgba(255,183,3,0.3)':'rgba(255,255,255,0.15)'};border:3px solid ${i===0?'var(--honey)':'rgba(255,255,255,0.3)'};border-radius:14px;padding:10px 12px;display:flex;align-items:center;gap:10px">
      <div style="width:38px;height:38px;border:2px solid ${i===0?'var(--honey)':'rgba(255,255,255,0.4)'};border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:1.3rem">${m.photoEmoji}</div>
      <div style="flex:1">
        <p style="font-family:Fredoka One;color:white;font-size:0.9rem">${m.name} ${m.family}</p>
        <div style="display:flex;gap:6px;align-items:center">
          <span style="font-size:0.75rem;color:rgba(255,255,255,0.7)">${'⭐'.repeat(m.skill)}</span>
          <span style="font-size:0.72rem;color:var(--honey);font-family:Fredoka One">${m.xp} XP</span>
        </div>
      </div>
      ${i===0?`<span style="font-family:Fredoka One;font-size:0.72rem;background:var(--honey);color:var(--outline);border:2px solid var(--outline);border-radius:50px;padding:2px 8px;box-shadow:2px 2px 0 var(--outline)">الأقل نشاطاً!</span>`:''}
    </div>
  `).join('');
}

function drawWheel(members) {
  const canvas = document.getElementById('spinCanvas');
  const ctx = canvas.getContext('2d');
  const cx=canvas.width/2, cy=canvas.height/2, r=128;
  ctx.clearRect(0,0,canvas.width,canvas.height);

  if (!members.length) {
    ctx.fillStyle='#F5E6C8'; ctx.beginPath(); ctx.arc(cx,cy,r,0,2*Math.PI); ctx.fill();
    ctx.fillStyle='#888'; ctx.font='bold 14px Tajawal'; ctx.textAlign='center';
    ctx.fillText('لا يوجد أعضاء',cx,cy); return;
  }

  const sliceAngle = (2*Math.PI)/members.length;
  members.forEach((m,i) => {
    const start = spinAngle + i*sliceAngle;
    const end = start + sliceAngle;
    // Slice
    ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,r,start,end); ctx.closePath();
    ctx.fillStyle = APP_STATE.wheelColors[i%APP_STATE.wheelColors.length];
    ctx.fill();
    ctx.strokeStyle='white'; ctx.lineWidth=3; ctx.stroke();
    // Cartoon outline segments
    ctx.strokeStyle='rgba(0,0,0,0.3)'; ctx.lineWidth=1; ctx.stroke();

    // Label
    ctx.save();
    ctx.translate(cx,cy);
    ctx.rotate(start + sliceAngle/2);
    ctx.textAlign='right';
    ctx.fillStyle='white';
    ctx.strokeStyle='rgba(0,0,0,0.5)';
    ctx.lineWidth=2;
    ctx.font='bold 13px Tajawal,Cairo';
    ctx.strokeText(m.name, r-10, 5);
    ctx.fillText(m.name, r-10, 5);
    ctx.restore();
  });

  // Center medallion
  ctx.beginPath(); ctx.arc(cx,cy,34,0,2*Math.PI);
  ctx.fillStyle='#FFB703'; ctx.fill();
  ctx.strokeStyle='#1A0A00'; ctx.lineWidth=4; ctx.stroke();
  ctx.beginPath(); ctx.arc(cx,cy,26,0,2*Math.PI);
  ctx.fillStyle='#FFCC33'; ctx.fill();
  ctx.fillStyle='#1A0A00'; ctx.font='bold 20px Arial'; ctx.textAlign='center';
  ctx.fillText('⚜️',cx,cy+7);
}

function doSpin() {
  if (spinning || !APP_STATE.members.length) return;
  spinning = true;
  document.getElementById('spinBtn').disabled = true;
  document.getElementById('spinResult').classList.add('hidden');

  const sorted = getSpinCandidates();
  const winner = sorted[0];
  const winnerIndex = APP_STATE.members.findIndex(m => m.id===winner.id);
  const sliceAngle = (2*Math.PI)/APP_STATE.members.length;
  const fullSpins = Math.PI*2*(5+Math.random()*3);
  const targetAngle = fullSpins - (winnerIndex*sliceAngle) - sliceAngle/2;

  let start=null;
  const duration=4500;
  const initial=spinAngle;

  function animate(ts) {
    if (!start) start=ts;
    const progress=(ts-start)/duration;
    const ease=1-Math.pow(1-Math.min(progress,1),4);
    spinAngle=initial+targetAngle*ease;
    drawWheel(APP_STATE.members);
    if (progress<1) { requestAnimationFrame(animate); }
    else {
      spinning=false;
      document.getElementById('spinBtn').disabled=false;
      selectedMember=winner;
      showWin(winner);
    }
  }
  requestAnimationFrame(animate);
}

function showWin(m) {
  document.getElementById('winName').textContent=`${m.name} ${m.family}`;
  document.getElementById('winId').textContent=m.id;
  spawnConfetti();
  document.getElementById('winOverlay').classList.add('show');
  document.getElementById('spinResultName').textContent=`${m.name} ${m.family}`;
  document.getElementById('spinResultId').textContent=m.id;
  document.getElementById('spinResult').classList.remove('hidden');
}

function closeWin() {
  document.getElementById('winOverlay').classList.remove('show');
  sendToGame();
}

function sendToGame() {
  document.getElementById('winOverlay').classList.remove('show');
  if (!selectedMember) return;
  APP_STATE.currentMemberId=selectedMember.id;
  showScreen('screen-games');
}

function sendToExplore() {
  document.getElementById('winOverlay').classList.remove('show');
  showScreen('screen-explore');
}

function spawnConfetti() {
  const container=document.getElementById('confettiContainer');
  container.innerHTML='';
  const colors=['#FFB703','#FF4D6D','#52B788','#56CFE1','#FFFFFF','#FF6B35','#FFCC33','#A0E426'];
  for (let i=0;i<80;i++) {
    const div=document.createElement('div');
    div.className='confetti-piece';
    const w=6+Math.random()*10, h=6+Math.random()*14;
    div.style.cssText=`
      left:${Math.random()*100}%;
      top:-30px;
      width:${w}px; height:${h}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      border-radius:${Math.random()>0.4?'50%':'3px'};
      animation-delay:${Math.random()*2}s;
      animation-duration:${2+Math.random()*2.5}s;
    `;
    container.appendChild(div);
  }
}

// ================================================
// GAMES HUB
// ================================================
function refreshGamesScreen() {
  const m = APP_STATE.members.find(x=>x.id===APP_STATE.currentMemberId)||selectedMember;
  if (!m) return;
  document.getElementById('activeScoutName').textContent=m.name;
  document.getElementById('activeScoutId').textContent=m.id;
  document.getElementById('xpBadge').textContent=`⭐ ${m.xp} XP`;
  document.getElementById('xpText').textContent=m.xp;
  document.getElementById('xpBar').style.width=Math.min(m.xp,100)+'%';

  const sorted = APP_STATE.games.slice().sort((a,b)=>{
    const p={high:0,mid:1,low:2};
    return p[a.priority]-p[b.priority];
  });

  const ribbonColors = {high:'#E63946',mid:'#FFB703',low:'#52B788'};

  document.getElementById('gamesGrid').innerHTML = sorted.map(g => {
    const locked = m.xp < g.minXP;
    return `
    <div class="badge-card ${locked?'':'cursor-pointer'}" onclick="${locked?'':'openGame(\''+g.id+'\')'}">
      <div class="badge-ribbon" style="background:${ribbonColors[g.priority]}"></div>
      ${locked?`<div style="position:absolute;inset:0;background:rgba(0,0,0,0.4);border-radius:inherit;display:flex;align-items:center;justify-content:center;z-index:5;font-size:2rem">🔒</div>`:''}
      <div style="padding:16px 10px 6px;text-align:center">
        <!-- Badge SVG ring -->
        <svg width="70" height="70" viewBox="0 0 70 70" style="margin:0 auto 6px;display:block">
          <circle cx="35" cy="35" r="33" fill="${ribbonColors[g.priority]}" stroke="#1A0A00" stroke-width="3"/>
          <circle cx="35" cy="35" r="25" fill="${locked?'#888':'#FFF8E7'}" stroke="#1A0A00" stroke-width="2"/>
          <text x="35" y="42" text-anchor="middle" font-size="22">${g.emoji}</text>
        </svg>
        <p style="font-family:Fredoka One;font-size:0.9rem;color:var(--outline);line-height:1.2">${g.title}</p>
        <p style="font-size:0.72rem;color:#888;margin-top:3px">${g.desc}</p>
        <span class="prio-badge prio-${g.priority}" style="margin-top:6px;display:inline-block">${g.priority==='high'?'أولوية عالية':g.priority==='mid'?'متوسطة':'منخفضة'}</span>
        ${locked?`<p style="font-size:0.7rem;color:#E63946;margin-top:4px">يلزم ${g.minXP} XP</p>`:`<p style="font-size:0.7rem;color:var(--forest);margin-top:4px;font-family:Fredoka One">+${g.xpReward} XP</p>`}
      </div>
    </div>`;
  }).join('');

  document.getElementById('gameHub').classList.remove('hidden');
  document.getElementById('gameContent').classList.add('hidden');
}

function backToHub() {
  document.getElementById('gameHub').classList.remove('hidden');
  document.getElementById('gameContent').classList.add('hidden');
}

function openGame(id) {
  document.getElementById('gameHub').classList.add('hidden');
  document.getElementById('gameContent').classList.remove('hidden');
  document.getElementById('gameInner').innerHTML = renderGame(id);
}

function showXPToast(msg) {
  const t=document.getElementById('xpToast');
  t.textContent=msg;
  t.classList.remove('show');
  void t.offsetWidth;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2300);
}

function awardXP(amount) {
  const m=APP_STATE.members.find(x=>x.id===APP_STATE.currentMemberId);
  if (!m) return;
  m.xp+=amount; m.gamesPlayed++;
  document.getElementById('xpBadge').textContent=`⭐ ${m.xp} XP`;
  autoSaveState();
  showXPToast(`⭐ +${amount} XP !`);
}

// ================================================
// GAME RENDERERS
// ================================================
function renderGame(id) {
  const rendererNames = {
    song: 'renderSongGame',
    knot: 'renderKnotGame',
    flag: 'renderFlagGame',
    signs: 'renderSignsGame'
  };
  const rendererName = rendererNames[id];
  const renderer = rendererName ? globalThis[rendererName] : null;

  if (typeof renderer === 'function') {
    return renderer();
  }

  console.error('Missing game renderer:', id, rendererName);
  return `<p style="text-align:center;padding:40px;color:#888;font-family:Fredoka One">اللعبة غير متاحة حالياً 🛠️</p>`;
}

function gameCard(content) {
  return `<div class="toon-card p-5">${content}</div>`;
}

function gameHeader(emoji,title,desc) {
  return `
  <div style="text-align:center;margin-bottom:20px">
    <svg width="90" height="90" viewBox="0 0 90 90" style="margin:0 auto 8px;display:block">
      <circle cx="45" cy="45" r="42" fill="var(--honey)" stroke="var(--outline)" stroke-width="4"/>
      <circle cx="45" cy="45" r="33" fill="var(--cream)" stroke="var(--outline)" stroke-width="2"/>
      <text x="45" y="56" text-anchor="middle" font-size="28">${emoji}</text>
    </svg>
    <h2 class="arabic-display" style="font-size:1.6rem;color:var(--outline);margin-bottom:4px">${title}</h2>
    <p style="font-size:0.82rem;color:#888">${desc}</p>
  </div>`;
}

function winCard(emoji,title,msg,xp) {
  return gameCard(`
    <div style="text-align:center">
      <svg width="100" height="100" viewBox="0 0 100 100" style="margin:0 auto 12px;display:block;animation:winPop 0.5s cubic-bezier(0.34,1.56,0.64,1)">
        <circle cx="50" cy="50" r="47" fill="#52B788" stroke="var(--outline)" stroke-width="4"/>
        <circle cx="50" cy="50" r="37" fill="var(--cream)" stroke="var(--outline)" stroke-width="2"/>
        <text x="50" y="62" text-anchor="middle" font-size="32">${emoji}</text>
      </svg>
      <h2 class="arabic-display" style="font-size:1.8rem;color:var(--outline);margin-bottom:4px">${title}</h2>
      <p style="font-size:0.9rem;color:#666;margin-bottom:14px">${msg}</p>
      <div style="background:var(--honey);border:3px solid var(--outline);border-radius:16px;padding:10px;margin-bottom:16px;display:inline-block;box-shadow:4px 4px 0 var(--outline)">
        <p class="display-font" style="font-size:1.5rem;color:var(--outline)">⭐ +${xp} XP !</p>
      </div>
      <br/>
      <button class="toon-btn toon-btn-forest px-8 py-3 arabic-display text-lg" onclick="backToHub();refreshGamesScreen()">🎮 العودة للألعاب</button>
    </div>
  `);
}

// GAME 1: SONG - CLICK-BASED ORDERING
// ================================================
const correctSongOrder = [0, 1, 2]; // The IDs in their correct sequence
let songClickedOrder = []; // Track which items were clicked in order

function renderSongGame() {
  songClickedOrder = []; // Reset
  
  const phrases = [
    { id: 0, text: 'كشّافة تونس', color: 'var(--honey)' },
    { id: 1, text: 'الوطن عز يا', color: 'var(--sky)' },
    { id: 2, text: 'نحن أبناء الجهاد', color: 'var(--leaf)' }
  ];

  // Shuffle the phrases for the challenge
  const shuffled = [...phrases].sort(() => Math.random() - 0.5);

  const itemsHTML = shuffled.map(phrase => `
    <button class="song-click-item" 
         data-id="${phrase.id}"
         onclick="clickSongItem(${phrase.id}, this)"
         style="background:${phrase.color};
                border:3px solid var(--outline);
                border-radius:12px;
                padding:14px 10px;
                text-align:center;
                font-family:Fredoka One;
                cursor:pointer;
                box-shadow:3px 3px 0 var(--outline);
                user-select:none;
                transition: all 0.2s;
                position:relative;
                font-size:1rem;
                color:var(--outline)">
      ${phrase.text}
      <span class="song-order-badge" style="display:none;position:absolute;top:4px;right:4px;background:var(--outline);color:${phrase.color};border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:0.9rem"></span>
    </button>
  `).join('');

  return gameCard(`
    ${gameHeader('🎵','أغنية الكشافة','اضغط على الكلمات بالترتيب الصحيح')}
    
    <div style="background:linear-gradient(135deg,var(--forest),#1d4a36);border:3px solid var(--outline);border-radius:16px;padding:16px;margin-bottom:16px;box-shadow:4px 4px 0 var(--outline)">
      <p class="display-font text-white text-center mb-3" style="font-size:1.1rem">🎶 نشيد الكشاف التونسي</p>
      <div style="text-align:center;line-height:2;color:white;font-family:Tajawal;font-size:1.1rem;font-weight:700">
        <p style="background:rgba(255,255,255,0.1);border-radius:8px;padding:4px 8px;margin:4px 0">كشّافة تونس يا عز الوطن</p>
        <p style="background:rgba(255,255,255,0.1);border-radius:8px;padding:4px 8px;margin:4px 0">نحن أبناء الجهاد والوطن</p>
      </div>
    </div>

    <div style="margin-bottom:16px">
      <p class="display-font" style="font-size:0.9rem;color:var(--outline);margin-bottom:10px">👆 اضغط على الكلمات بالترتيب الصحيح:</p>
      <div id="songOrderContainer" style="display:flex;flex-direction:column;gap:10px">
        ${itemsHTML}
      </div>
      
      <div id="songProgress" style="margin-top:12px;padding:10px;background:#F0F0F0;border-radius:8px;text-align:center">
        <p style="font-size:0.85rem;color:#666;font-family:Fredoka One">تم اختيار: <span id="progressCount">0</span>/3</p>
        <p id="progressOrder" style="font-size:0.9rem;color:var(--outline);font-family:Fredoka One;margin-top:4px">—</p>
      </div>
    </div>

    <div style="display:flex;gap:10px">
      <button id="songCheckBtn" class="toon-btn toon-btn-forest flex-1 py-3 arabic-display text-lg" onclick="checkSongOrder()">
        ✅ تحقق من الترتيب (+15 XP)
      </button>
      <button class="toon-btn flex-1 py-3 arabic-display text-lg" style="background:#FF6B6B;color:white" onclick="resetSongOrder()">
        🔄 إعادة تعيين
      </button>
    </div>
  `);
}

function clickSongItem(id, element) {
  // Prevent clicking the same item twice
  if (songClickedOrder.includes(id)) {
    return;
  }

  // Add to clicked order
  songClickedOrder.push(id);
  const position = songClickedOrder.length;

  // Show position badge on button
  const badge = element.querySelector('.song-order-badge');
  badge.textContent = position;
  badge.style.display = 'flex';

  // Visual feedback - scale and highlight
  element.style.transform = 'scale(0.95)';
  element.style.opacity = '0.7';
  setTimeout(() => {
    element.style.transform = 'scale(1)';
  }, 150);

  // Update progress display
  updateSongProgress();
}

function updateSongProgress() {
  document.getElementById('progressCount').textContent = songClickedOrder.length;
  const orderText = songClickedOrder.map(id => ['كشّافة تونس', 'الوطن عز يا', 'نحن أبناء الجهاد'][id]).join(' → ');
  document.getElementById('progressOrder').textContent = orderText || '—';
}

function resetSongOrder() {
  songClickedOrder = [];
  document.querySelectorAll('.song-click-item').forEach(item => {
    const badge = item.querySelector('.song-order-badge');
    badge.style.display = 'none';
    item.style.opacity = '1';
    item.style.transform = 'scale(1)';
  });
  updateSongProgress();
}

function checkSongOrder() {
  const btn = document.getElementById('songCheckBtn');

  if (JSON.stringify(songClickedOrder) === JSON.stringify(correctSongOrder)) {
    // CORRECT!
    awardXP(15);
    document.getElementById('gameInner').innerHTML = winCard('🎵','أحسنت!','لقد رتبت النشيد بشكل صحيح!',15);
  } else {
    // Wrong order
    const originalText = btn.innerHTML;
    btn.style.backgroundColor = '#E63946';
    btn.style.color = 'white';
    btn.innerHTML = '❌ الترتيب غير صحيح! حاول مرة أخرى';

    setTimeout(() => {
      btn.style.backgroundColor = '';
      btn.style.color = '';
      btn.innerHTML = originalText;
    }, 2200);
  }
}

// GAME 2: Knot
let knotDone=[];
function renderKnotGame() {
  knotDone=[];
  const steps=[
    'خذ حبلاً وضع الطرف الأيمن فوق الأيسر وأمرره من تحته',
    'الآن ضع الطرف الأيسر فوق الأيمن وأمرره من تحته',
    'اسحب الطرفين بقوة متساوية للخارج',
    'تحقق من تناسق العقدة — يجب أن تكون متماثلة',
  ];
  return gameCard(`
    ${gameHeader('🪢','العقدة المربعة','اتبع الخطوات بالترتيب الصحيح')}
    <!-- SVG rope diagram -->
    <div style="text-align:center;margin-bottom:16px">
      <svg width="180" height="70" viewBox="0 0 180 70">
        <path d="M10,25 Q50,10 90,35 Q130,60 170,45" stroke="var(--wood)" stroke-width="8" fill="none" stroke-linecap="round"/>
        <path d="M10,45 Q50,60 90,35 Q130,10 170,25" stroke="var(--bark)" stroke-width="8" fill="none" stroke-linecap="round"/>
        <path d="M10,25 Q50,10 90,35 Q130,60 170,45" stroke="rgba(255,255,255,0.3)" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M10,45 Q50,60 90,35 Q130,10 170,25" stroke="rgba(255,255,255,0.3)" stroke-width="3" fill="none" stroke-linecap="round"/>
        <circle cx="90" cy="35" r="10" fill="var(--honey)" stroke="var(--outline)" stroke-width="2"/>
        <text x="90" y="39" text-anchor="middle" font-size="10" fill="var(--outline)" font-weight="bold">🪢</text>
      </svg>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px" id="knotStepsList">
      ${steps.map((s,i)=>`
        <div class="step-card" id="kstep-${i}">
          <div class="step-num">${i+1}</div>
          <p style="font-family:Tajawal;font-size:0.9rem;color:var(--outline);flex:1">${s}</p>
          <button onclick="doneKnotStep(${i})" style="font-size:1.4rem;background:none;border:none;cursor:pointer;transition:transform 0.1s" onmouseenter="this.style.transform='scale(1.3)'" onmouseleave="this.style.transform='scale(1)'">✓</button>
        </div>
      `).join('')}
    </div>
    <div id="knotFinish" class="hidden">
      <button class="toon-btn toon-btn-forest w-full py-3 arabic-display text-lg" onclick="completeKnot()">🎉 اكتملت العقدة! (+20 XP)</button>
    </div>
  `);
}
function doneKnotStep(i) {
  if (knotDone.includes(i)) return;
  knotDone.push(i);
  document.getElementById(`kstep-${i}`).classList.add('done');
  if (knotDone.length===4) document.getElementById('knotFinish').classList.remove('hidden');
}
function completeKnot() { 
  knotDone=[]; 
  awardXP(20); 
  const feedback = RuleBasedAI.getGameFeedback('knot', true);
  document.getElementById('gameInner').innerHTML=winCard('🪢','ممتاز!',feedback,20); 
}

// GAME 3: Flag
function renderFlagGame() {
  return gameCard(`
    ${gameHeader('🚩','تحية العلم','تعلّم الخطوات الرسمية')}
    <!-- Animated scout SVG -->
    <div style="text-align:center;margin-bottom:16px;position:relative">
      <svg width="220" height="180" viewBox="0 0 220 180">
        <!-- Flag pole -->
        <line x1="160" y1="15" x2="160" y2="170" stroke="var(--wood)" stroke-width="5" stroke-linecap="round"/>
        <rect x="160" y="15" width="50" height="34" fill="var(--red)" rx="2" stroke="var(--outline)" stroke-width="2"/>
        <circle cx="181" cy="32" r="11" fill="white" stroke="var(--outline)" stroke-width="2"/>
        <path d="M175,32 L181,25 L187,32 L181,39 Z" fill="var(--red)"/>
        <!-- Scout body -->
        <circle cx="75" cy="48" r="22" fill="#FDDCB5" stroke="var(--outline)" stroke-width="2.5"/>
        <!-- Hat -->
        <ellipse cx="75" cy="30" rx="27" ry="8" fill="var(--wood)" stroke="var(--outline)" stroke-width="2"/>
        <rect x="55" y="22" width="40" height="12" rx="3" fill="#6B4226" stroke="var(--outline)" stroke-width="2"/>
        <!-- Eyes + smile -->
        <circle cx="68" cy="47" r="3" fill="white" stroke="var(--outline)" stroke-width="1"/>
        <circle cx="82" cy="47" r="3" fill="white" stroke="var(--outline)" stroke-width="1"/>
        <circle cx="69" cy="47" r="1.5" fill="#1A0A00"/>
        <circle cx="83" cy="47" r="1.5" fill="#1A0A00"/>
        <path d="M70,55 Q75,60 80,55" stroke="var(--outline)" stroke-width="2" fill="none" stroke-linecap="round"/>
        <!-- Body/uniform -->
        <rect x="56" y="70" width="38" height="52" rx="8" fill="var(--forest)" stroke="var(--outline)" stroke-width="2.5"/>
        <!-- Neckerchief -->
        <polygon points="75,70 62,82 75,86 88,82" fill="var(--red)" stroke="var(--outline)" stroke-width="1.5"/>
        <!-- Badge -->
        <circle cx="75" cy="78" r="6" fill="var(--honey)" stroke="var(--outline)" stroke-width="1.5"/>
        <text x="75" y="82" text-anchor="middle" font-size="7" fill="var(--outline)">⚜️</text>
        <!-- Left arm (resting) -->
        <rect x="42" y="72" width="14" height="36" rx="6" fill="var(--forest)" stroke="var(--outline)" stroke-width="2"/>
        <!-- Right arm SALUTING (animated) -->
        <g style="transform-origin:88px 78px;animation:salute 2s ease-in-out infinite alternate">
          <rect x="88" y="72" width="14" height="42" rx="6" fill="var(--forest)" stroke="var(--outline)" stroke-width="2"/>
          <circle cx="95" cy="112" r="9" fill="#FDDCB5" stroke="var(--outline)" stroke-width="2"/>
        </g>
        <!-- Legs -->
        <rect x="59" y="120" width="14" height="42" rx="6" fill="#2D3748" stroke="var(--outline)" stroke-width="2"/>
        <rect x="77" y="120" width="14" height="42" rx="6" fill="#2D3748" stroke="var(--outline)" stroke-width="2"/>
        <!-- Shoes -->
        <ellipse cx="66" cy="162" rx="12" ry="6" fill="#1A1A1A" stroke="var(--outline)" stroke-width="1.5"/>
        <ellipse cx="84" cy="162" rx="12" ry="6" fill="#1A1A1A" stroke="var(--outline)" stroke-width="1.5"/>
      </svg>
    </div>
    <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:14px">
      ${['🧍 قف منتصباً في وضعية الانتباه','🤚 ارفع يدك اليمنى إلى مستوى الجبهة','👋 أصابعك مضمومة وراحة اليد للخارج','👁️ انظر إلى العلم باحترام','⬇️ خفّض يدك ببطء عند إشارة القائد'].map((s,i)=>`
        <div class="step-card">
          <div class="step-num">${i+1}</div>
          <p style="font-family:Tajawal;font-size:0.88rem;flex:1">${s}</p>
        </div>
      `).join('')}
    </div>
    <button class="toon-btn toon-btn-forest w-full py-3 arabic-display text-lg" onclick="completeFlag()">✅ تدربت على التحية! (+12 XP)</button>
  `);
}
function completeFlag() { 
  awardXP(12); 
  const feedback = RuleBasedAI.getGameFeedback('flag', true);
  document.getElementById('gameInner').innerHTML=winCard('🚩','أحسنت!',feedback,12); 
}

// GAME 4: Signs
let signsRevealed=[];
const signs=[
  {sign:'✋',name:'توقف',desc:'اليد مرفوعة — كلّ شيء يتوقف'},
  {sign:'👍',name:'حسناً / موافق',desc:'الإبهام للأعلى — كل شيء بخير'},
  {sign:'🤟',name:'نداء الكشاف',desc:'3 أصابع — شارة الكشافة الرسمية'},
  {sign:'👉',name:'اتجه هنا',desc:'السبابة للأمام — تعال هنا'},
  {sign:'🤫',name:'صمت',desc:'الجميع يصمت الآن'},
  {sign:'🔄',name:'عودة',desc:'ارجع إلى نقطة التجمع'},
];

function renderSignsGame() {
  signsRevealed=[];
  return gameCard(`
    ${gameHeader('🤟','إشارات اليد','انقر على كل إشارة لتعلّم معناها')}
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">
      ${signs.map((s,i)=>`
        <div id="sign-${i}" onclick="revealSign(${i})"
          style="background:var(--cream);border:3px solid var(--outline);border-radius:16px;padding:12px;text-align:center;cursor:pointer;transition:transform 0.15s,box-shadow 0.15s;box-shadow:4px 4px 0 var(--outline)"
          onmouseenter="this.style.transform='translateY(-4px) rotate(-2deg)';this.style.boxShadow='6px 8px 0 var(--outline)'"
          onmouseleave="this.style.transform='';this.style.boxShadow='4px 4px 0 var(--outline)'">
          <div style="font-size:2.4rem;margin-bottom:4px">${s.sign}</div>
          <p style="font-family:Fredoka One;font-size:0.85rem;color:var(--outline)">${s.name}</p>
          <p id="signDesc-${i}" style="font-size:0.72rem;color:#666;margin-top:4px;display:none">${s.desc}</p>
          <div id="signCheck-${i}" style="display:none;margin-top:4px">
            <span style="color:var(--forest);font-family:Fredoka One;font-size:0.8rem">✓ فهمت!</span>
          </div>
        </div>
      `).join('')}
    </div>
    <div id="signsFinish" class="hidden">
      <button class="toon-btn toon-btn-forest w-full py-3 arabic-display text-lg" onclick="completeSigns()">🎉 تعلمت الإشارات! (+18 XP)</button>
    </div>
  `);
}
function revealSign(i) {
  if (signsRevealed.includes(i)) return;
  signsRevealed.push(i);
  const el=document.getElementById(`sign-${i}`);
  el.style.background='#D1FAE5';
  el.style.borderColor='#059669';
  el.style.boxShadow='4px 4px 0 #059669';
  document.getElementById(`signDesc-${i}`).style.display='block';
  document.getElementById(`signCheck-${i}`).style.display='block';
  if (signsRevealed.length===6) document.getElementById('signsFinish').classList.remove('hidden');
}
function completeSigns() { 
  signsRevealed=[]; 
  awardXP(18); 
  const feedback = RuleBasedAI.getGameFeedback('signs', true);
  document.getElementById('gameInner').innerHTML=winCard('🤟','رائع!',feedback,18); 
}

// ================================================
// EXPLORER
// ================================================
function explorerTab(btn, id) {
  document.querySelectorAll('.camp-tab').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.explorer-section').forEach(t=>t.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

function initExplorer() {
  const geoGrid=document.getElementById('geoGrid');
  const geoColors=['#FF6B35','#56CFE1','#52B788','#FFB703','#E63946','#6A0572'];
  geoGrid.innerHTML=geoData.map((g,i)=>`
    <div onclick="openWikipedia('https://ar.wikipedia.org/wiki/${encodeURIComponent(g.name)}')" class="field-note" style="text-decoration:none;cursor:pointer">
      <div style="width:44px;height:44px;background:${geoColors[i%geoColors.length]};border:2px solid var(--outline);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.4rem;margin-bottom:8px;box-shadow:2px 2px 0 var(--outline)">${g.emoji}</div>
      <p style="font-family:Fredoka One;font-size:0.9rem;color:var(--outline)">${g.name}</p>
      <p style="font-size:0.72rem;color:#888;margin-top:3px">${g.desc}</p>
      <p style="font-size:0.72rem;color:var(--forest);margin-top:5px;font-family:Fredoka One">اقرأ أكثر ↗</p>
    </div>
  `).join('');

  const natureGrid=document.getElementById('natureGrid');
  const natColors=['#52B788','#FFB703','#FF6B35','#56CFE1','#E63946','#74C69D','#FB8500','#6A0572'];
  natureGrid.innerHTML=natureData.map((n,i)=>`
    <div onclick="openWikipedia('https://ar.wikipedia.org/wiki/${encodeURIComponent(n.name)}')" class="field-note" style="text-decoration:none;cursor:pointer">
      <div style="width:44px;height:44px;background:${natColors[i%natColors.length]};border:2px solid var(--outline);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.4rem;margin-bottom:8px;box-shadow:2px 2px 0 var(--outline)">${n.emoji}</div>
      <p style="font-family:Fredoka One;font-size:0.9rem;color:var(--outline)">${n.name}</p>
      <p style="font-size:0.72rem;color:#888;margin-top:3px">${n.desc}</p>
      <p style="font-size:0.72rem;color:var(--forest);margin-top:5px;font-family:Fredoka One">اقرأ أكثر ↗</p>
    </div>
  `).join('');
}

function searchWiki() {
  const q=document.getElementById('wikiSearch').value.trim();
  if (!q) return;
  const list=document.getElementById('wikiList');
  const match=wikiData[q];
  if (match) {
    list.innerHTML=`
      <div onclick="openWikipedia('${match.url}')" class="field-note" style="display:block;text-decoration:none;border-right:5px solid var(--forest);cursor:pointer">
        <p style="font-family:Fredoka One;font-size:1rem;color:var(--outline);margin-bottom:4px">${match.title}</p>
        <p style="font-size:0.85rem;color:#555;line-height:1.6">${match.desc}</p>
        <p style="font-family:Fredoka One;font-size:0.8rem;color:var(--forest);margin-top:8px">اقرأ المزيد في ويكيبيديا العربية ↗</p>
      </div>`;
  } else {
    list.innerHTML=`
      <div class="field-note">
        <p style="font-family:Fredoka One;color:var(--outline);margin-bottom:8px">🔍 نتيجة البحث عن: "${q}"</p>
        <button onclick="openWikipedia('https://ar.wikipedia.org/wiki/${encodeURIComponent(q)}')" class="toon-btn toon-btn-forest" style="display:inline-block;text-decoration:none;font-size:0.85rem;padding:8px 16px;border:none;cursor:pointer">
          فتح في ويكيبيديا ↗
        </button>
      </div>`;
  }
}

function wikiQuick(topic) {
  document.getElementById('wikiSearch').value=topic;
  searchWiki();
}

// ================================================
// AI TIPS SYSTEM (Rule-Based)
// ================================================
function askAIQuestion(question) {
  document.getElementById('aiQuestion').value = question;
  askAI();
}

async function askAI() {
  const question = document.getElementById('aiQuestion').value.trim();
  if (!question) return;
  
  const responseEl = document.getElementById('aiResponse');
  const responseText = document.getElementById('aiResponseText');
  
  responseText.textContent = '⏳ جاري البحث...';
  responseEl.style.display = 'block';
  
  try {
    const response = await callAI(question);
    responseText.textContent = response;
  } catch (error) {
    responseText.textContent = '❌ حدث خطأ. حاول مرة أخرى.';
  }
}

// ================================================
// INIT
// ================================================
document.addEventListener('DOMContentLoaded', async () => {
  // Load persistent state from device storage (or skip if not available)
  await StorageManager.loadState();
  
  createStars('starField', 70);
  createFireflies('fireflies', 12);

  document.getElementById('loginPwd').addEventListener('keypress', e => {
    if (e.key==='Enter') doLogin();
  });

  // Member modal hidden on load
  document.getElementById('memberLoginModal').style.display='none';

  refreshLeaderDashboard();
});
