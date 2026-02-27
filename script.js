// ====== SOUND EFFECTS ======
const correctSound = new Audio("dragon-studio-correct-472358.mp3");
const wrongSound = new Audio("eritnhut1992-buzzer-or-wrong-answer-20582.mp3");
const timeUpSound = new Audio("freesound_community-timeout-90320.mp3");
const finishSound = new Audio("openmindaudio-podcast-outro-stinger-short-clean-end-cue-469091.mp3");

// ป้องกันเสียงซ้อน
function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
const provinces = [
  { name: "กรุงเทพมหานคร", hint: "เมืองหลวงของประเทศไทย" },
  { name: "เชียงใหม่", hint: "มีดอยอินทนนท์" },
  { name: "เชียงราย", hint: "มีวัดร่องขุ่น" },
  { name: "แม่ฮ่องสอน", hint: "ติดพม่า" },
  { name: "ลำปาง", hint: "มีรถม้า" },
  { name: "ลำพูน", hint: "มีวัดพระธาตุหริภุญชัย" },
  { name: "แพร่", hint: "มีเสื้อหม้อห้อม" },
  { name: "น่าน", hint: "มีวัดภูมินทร์" },
  { name: "พะเยา", hint: "มีกว๊านพะเยา" },
  { name: "สุโขทัย", hint: "อุทยานประวัติศาสตร์" },

  { name: "ชลบุรี", hint: "มีพัทยา" },
  { name: "ระยอง", hint: "มีเกาะเสม็ด" },
  { name: "จันทบุรี", hint: "ขึ้นชื่อเรื่องผลไม้" },
  { name: "ตราด", hint: "มีเกาะช้าง" },
  { name: "พระนครศรีอยุธยา", hint: "เมืองหลวงเก่า" },

  { name: "กาญจนบุรี", hint: "สะพานข้ามแม่น้ำแคว" },
  { name: "นครปฐม", hint: "มีพระปฐมเจดีย์" },
  { name: "ราชบุรี", hint: "ตลาดน้ำดำเนินสะดวก" },
  { name: "สุพรรณบุรี", hint: "บ้านเกิดบรรหาร" },
  { name: "สมุทรสงคราม", hint: "ตลาดน้ำอัมพวา" },

  { name: "ภูเก็ต", hint: "ไข่มุกอันดามัน" },
  { name: "กระบี่", hint: "อ่าวมาหยา" },
  { name: "สุราษฎร์ธานี", hint: "มีเกาะสมุย" },
  { name: "นครศรีธรรมราช", hint: "พระบรมธาตุเจดีย์" },
  { name: "สงขลา", hint: "หาดสมิหลา" }
];

let shuffledProvinces = [];
let score = 0;
let currentQuestion = 0;
let totalQuestions = 10;
let timeLeft = 30;
let timerInterval;

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function selectQuestionCount(count) {
  totalQuestions = count;

  if (count > provinces.length) {
  alert("จำนวนข้อเกินจำนวนจังหวัดที่มี");
  return;
}

  document.getElementById("menu").style.display = "none";
  document.getElementById("game").style.display = "block";
  document.getElementById("totalQuestions").innerText = totalQuestions;

  startGame();
}

function startGame() {
  score = 0;
  currentQuestion = 0;
  shuffledProvinces = shuffleArray([...provinces]);

  document.getElementById("score").innerText = score;

  nextQuestion();
}

function startTimer() {
  timeLeft = 30;
  const timerElement = document.getElementById("timer");

  timerElement.innerText = timeLeft;
  timerElement.style.color = "black"; // รีเซ็ตสีตอนเริ่มข้อใหม่

  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.innerText = timeLeft;

    // ถ้าเหลือ 10 วินาทีหรือน้อยกว่า เปลี่ยนเป็นสีแดง
    if (timeLeft <= 10) {
      timerElement.style.color = "red";
    }

    if (timeLeft <= 0) {
  clearInterval(timerInterval);

  playSound(timeUpSound); // 🔊 เสียงหมดเวลา

  document.getElementById("result").innerText =
    "⏰ หมดเวลา! คำตอบคือ " +
    shuffledProvinces[currentQuestion].name;

  currentQuestion++;
  setTimeout(nextQuestion, 1500);
}
  }, 1000);
}

function nextQuestion() {
  clearInterval(timerInterval);

  if (currentQuestion >= totalQuestions) {

    playSound(finishSound); // 🎉 เสียงจบเกม

  let message = "";

  if (score >= totalQuestions * 8) {
    message = "🔥 ยอดเยี่ยมมาก! คุณรู้จักจังหวัดไทยดีมาก";
  } else if (score >= totalQuestions * 5) {
    message = "👍 ดีมาก! แต่ยังพัฒนาได้อีก";
  } else {
    message = "📚 ควรฝึกเพิ่มอีกนิดนะ สู้ ๆ!";
  }

  document.getElementById("game").innerHTML = `
    <h1>🎉 จบเกม!</h1>
    <p>คะแนนรวมของคุณคือ ${score} คะแนน</p>
    <h2>${message}</h2>
    <button onclick="location.reload()">เล่นอีกครั้ง</button>
    <button onclick="window.location.href='index.html'">หน้าหลัก</button>
  `;
  return;
}

  document.getElementById("hint").innerText =
    shuffledProvinces[currentQuestion].hint;
  document.getElementById("questionNumber").innerText = currentQuestion + 1;
  document.getElementById("answer").value = "";
  document.getElementById("result").innerText = "";

  startTimer();
}

function checkAnswer() {
  clearInterval(timerInterval);

  const userAnswer = document.getElementById("answer").value.trim();
  const correctAnswer = shuffledProvinces[currentQuestion].name;

  if (userAnswer === correctAnswer) {
    score += 10;
    document.getElementById("result").innerText = "✅ ถูกต้อง!";
    playSound(correctSound);   // 🔊 เสียงถูก
  } else {
    document.getElementById("result").innerText =
      "❌ ผิด! คำตอบคือ " + correctAnswer;
    playSound(wrongSound);     // 🔊 เสียงผิด
  }

  document.getElementById("score").innerText = score;
  currentQuestion++;

  setTimeout(nextQuestion, 1500);
}

function goHome() {
  window.location.href = "index.html";
}