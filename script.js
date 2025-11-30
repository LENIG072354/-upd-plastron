let users = JSON.parse(localStorage.getItem("users")) || [];
let abus = [];
let qa = [];
let bannis = JSON.parse(localStorage.getItem("bannis")) || [];

// 🔐 Inscription
document.getElementById('signup-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Inscription réussie !");
  this.reset();
});

// 🔓 Connexion
document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    document.getElementById('display-name').textContent = "Nom : " + user.name;
    document.getElementById('display-email').textContent = "Email : " + user.email;
    document.getElementById('user-info').classList.remove('hidden');
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('login-form').classList.add('hidden');
  } else {
    alert("Email ou mot de passe incorrect.");
  }
});

// 🔁 Déconnexion
document.getElementById('logout-btn').addEventListener('click', function() {
  document.getElementById('user-info').classList.add('hidden');
  document.getElementById('signup-form').classList.remove('hidden');
  document.getElementById('login-form').classList.remove('hidden');
});

// 🧠 Données fictives
const utilisateurs = {
  "adnan": {
    manchesGagnees: 5,
    documents: ["score.pdf", "profil.jpg", "historique.txt"]
  },
  "abdellah": {
    manchesGagnees: 0,
    documents: ["resultats.docx", "avatar.png"]
  },
  "tahasari": {
    manchesGagnees: 0,
    documents: ["groupe.pdf", "profil.jpg", "historique.txt"]
  },
  "@QL4P4U03849": {
    codeadmin: 2015,
    documents: ["admin2015", "system32", "historique.txt"]
  },
   "A1128679694Q": {
    ouhagamohammed:85,
    documents: ["elemmentok",]
  },
   "H2566978133": {
    aziznadia:85,
    documents: ["elemmentok",]
  },
   "G212367281": {
    ouhagahakim:85,
    documents: ["elemmentNO",]
  },
   "P133001921": {
    ouhagamedyassin:85,
    documents: ["elemmentok",]
  },
   "T216769769681": {
    ouhagamohcine:85,
    documents: ["elemmenthot",]
  },
  
};

// 🔍 Connexion par nom
function(connecterUtilisateur)(code){
  nom = nom.toLowerCase();
  if (bannis.includes(nom)) {
    document.getElementById("message").innerHTML = `<p style="color:red;">${nom} est banni.</p>`;
    return;
  }

  const user = utilisateurs[nom];
  if (user) {
    document.getElementById("message").innerHTML = `
      <h3>Bienvenue ${nom} !</h3>
      <p>Manches gagnées : <strong>${user.manchesGagnees}</strong></p>
      <p>Documents :</p>
      <ul>
        ${user.documents.map(doc => `<li>${doc}</li>`).join("")}
      </ul>
    `;
  } else {
    document.getElementById("message").innerHTML = `<p style="color:red;">Utilisateur inconnu.</p>`;
  }
}

// 🔐 Accès admin
const CODE_ADMIN = "2015";

function verifierCodeAdmin() {
  const code = document.getElementById("admin-code").value;
  if (code === CODE_ADMIN) {
    document.getElementById("admin-panel").classList.remove("hidden");
    document.getElementById("admin-message").textContent = "";
    afficherUtilisateursAdmin();
  } else {
    document.getElementById("admin-message").textContent = "Code incorrect.";
    document.getElementById("admin-message").style.color = "red";
  }
}

function afficherUtilisateursAdmin() {
  const liste = document.getElementById("admin-users-list");
  liste.innerHTML = "";
  users.forEach((user, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${user.name} - ${user.email}`;
    liste.appendChild(li);
  });
}

function fermerAdminPanel() {
  document.getElementById("admin-panel").classList.add("hidden");
}

// 🛑 Admin Abuse
function enregistrerAbus() {
  const texte = document.getElementById("abuse-log").value;
  if (texte.trim()) {
    abus.push(texte);
    alert("Abus enregistré.");
    document.getElementById("abuse-log").value = "";
  }
}

// 💾 Savedir
function sauvegarderFichier() {
  const nom = document.getElementById("savedir-input").value;
  if (nom.trim()) {
    alert(`Fichier "${nom}" sauvegardé (simulation).`);
    document.getElementById("savedir-input").value = "";
  }
}

// ❓ Questions / Réponses
function ajouterQA() {
  const question = document.getElementById("question-input").value;
  const reponse = document.getElementById("reponse-input").value;
  if (question && reponse) {
    qa.push({ question, reponse });
    const li = document.createElement("li");
    li.textContent = `Q: ${question} | R: ${reponse}`;
    document.getElementById("qa-list").appendChild(li);
    document.getElementById("question-input").value = "";
    document.getElementById("reponse-input").value = "";
  }
}

// 🚫 Sethc (Ban)
function bannirUtilisateur() {
  const nom = document.getElementById("ban-user").value.toLowerCase();
  if (nom) {
    bannis.push(nom);
    localStorage.setItem("bannis", JSON.stringify(bannis));

    const li = document.createElement("li");
    li.textContent = `❌ ${nom} banni`;
    document.getElementById("ban-list").appendChild(li);
    document.getElementById("ban-user").value = "";
  }
}

// 🏁 Mini Rallye Conjugaison
document.getElementById("mini-rallye-btn").addEventListener("click", lancerMiniRallye);

function lancerMiniRallye() {
  const zone = document.getElementById("rallye-zone");
  zone.classList.remove("hidden");

  const questions = [
    { question: "Je (manger) une pomme.", reponse: "mange" },
    { question: "Nous (finir) nos devoirs.", reponse: "finissons" },
    { question: "Tu (être) en retard.", reponse: "es" },
    { question: "Ils (avoir) une voiture.", reponse: "ont" },
    { question: "Elle (aller) à l'école.", reponse: "va" }
  ];

  let index = 0;
  let score = 0;

  zone.innerHTML = `
    <h3>Mini Rallye Conjugaison 🏁</h3>
    <p id="question">${questions[index].question}</p>
    <input type="text" id="reponse" placeholder="Ta réponse">
    <button id="valider-btn">Valider</button>
    <p id="feedback"></p>
    <p id="score">Score : 0</p>
  `;

  document.getElementById("valider-btn").addEventListener("click", () => {
    const input = document.getElementById("reponse").value.trim().toLowerCase();
    const bonneReponse = questions[index].reponse;

    if (input === bonneReponse) {
      score++;
      document.getElementById("feedback").textContent = "✅ Bonne réponse !";
    } else {
      document.getElementById("feedback").textContent = `❌ Faux. Réponse attendue : ${bonneReponse}`;
    }

    index++;
    document.getElementById("score").textContent = `Score : ${score}`;

    if (index < questions.length) {
      document.getElementById("question").textContent = questions[index].question;
      document.getElementById("reponse").value = "";
    } else {
      document.getElementById("question").textContent = "🏆 Fin du rallye !";
      document.getElementById("reponse").style.display = "none";
      document.getElementById("valider-btn").style.display = "none";
    }
  });
}