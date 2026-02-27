const questions=[
 {q:"What does HTML stand for?",options:["Hyper Text Markup Language","Home Tool","Hyper Transfer"],ans:0},
 {q:"Which is used for styling?",options:["CSS","Python","Java"],ans:0},
 {q:"JS is?",options:["Language","Browser","OS"],ans:0},
 {q:"Which tag creates link?",options:["<a>","<p>","<div>"],ans:0},
 {q:"DOM stands for?",options:["Document Object Model","Data Object","Design Object"],ans:0}
];

let index=0,score=0,player="";

function startQuiz(){
    let name=document.getElementById("name").value.trim();
    let email=document.getElementById("email").value.trim();
   
    let emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   
    if(name==="" || email===""){
      document.getElementById("errorMsg").textContent="Fill all fields";
      return;
    }
   
    if(!emailPattern.test(email)){
      document.getElementById("errorMsg").textContent="Enter valid email";
      return;
    }
   
    document.getElementById("errorMsg").textContent="";
   
    player=name;
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("quizPage").classList.remove("hidden");
   
    loadQuestion();
   }
function loadQuestion(){
 document.getElementById("nextBtn").classList.add("hidden");

 let q=questions[index];
 document.getElementById("question").textContent=q.q;

 let html="";
 q.options.forEach((opt,i)=>{
   html += `<button class="option" onclick="selectAns(${i})">${opt}</button>`;
 });

 document.getElementById("options").innerHTML=html;
}

function selectAns(i){
 let correct=questions[index].ans;
 let btns=document.querySelectorAll(".option");

 btns.forEach(b=>b.disabled=true);

 if(i===correct){
   btns[i].classList.add("correct");
   score++;
 }else{
   btns[i].classList.add("wrong");
   btns[correct].classList.add("correct");
 }

 document.getElementById("score").textContent="Score: "+score;
 document.getElementById("nextBtn").classList.remove("hidden");
}

function nextQuestion(){
 index++;
 if(index<questions.length){
   loadQuestion();
 }else{
   showResult();
 }
}

function showResult(){
 document.getElementById("quizPage").classList.add("hidden");
 document.getElementById("resultPage").classList.remove("hidden");

 document.getElementById("finalScore").textContent =
 `${player} scored ${score}/${questions.length}`;

 let lb=JSON.parse(localStorage.getItem("lb")||"[]");
 lb.push({name:player,score});
 lb.sort((a,b)=>b.score-a.score);
 localStorage.setItem("lb",JSON.stringify(lb));

 renderLeaderboard();
}

function renderLeaderboard(){
 let lb=JSON.parse(localStorage.getItem("lb")||"[]");
 let html="";
 lb.slice(0,5).forEach((p,i)=>{
   html += `<p>${i+1}. ${p.name} - ${p.score}</p>`;
 });
 document.getElementById("leaderboard").innerHTML=html;
}

function restart(){
 index=0;
 score=0;
 document.getElementById("resultPage").classList.add("hidden");
 document.getElementById("loginPage").classList.remove("hidden");
 document.getElementById("score").textContent="Score: 0";
}
