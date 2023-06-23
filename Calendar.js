const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();
const months = ["January", "Febuary","March", "April","May", "June","July", "August","September", "October","November", "December"];
const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
  lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
  lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
  lastDateofLastMonth = new Date(currYear, currMonth,0).getDate();
  let liTag = "";
  for(let i = firstDayofMonth; i > 0 ; i--){
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }
  for(let i = 1; i<= lastDateofMonth; i++){
    let isToday = i === date.getDate() && currMonth === new Date().getMonth()
      && currYear === new Date().getFullYear() ? "active" : "";
      liTag += `<li class="${isToday}">${i}</li>`
  }
  for(let i = lastDayofMonth; i < 6 ; i++){
    liTag += `<li class="inactive">${i -lastDayofMonth +1}</li>`
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;
}
renderCalendar();
prevNextIcon.forEach(icon =>{
  icon.addEventListener("click", () => {
    currMonth = icon.id === "prev" ? currMonth -1 : currMonth +1;
    if(currMonth < 0 || currMonth >11 ){
      date = new Date(currYear, currMonth, new Date.getDate());
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    }
    else{
      date = new Date(currYear, currMonth,1);
    }
    renderCalendar();
  });
});
$('.menu-btn').click(function() {
    $('.side-bar').addClass('active')
    $('.menu-btn').css("visibility", "hidden")
})

$('.close-btn').click(function() {
    $('.side-bar').removeClass('active')
    $('.menu-btn').css("visibility", "visible")
})
const history = document.getElementById("history").addEventListener("click", function(event){
  window.location.href="History.html";
  event.preventDefault();
});
const calendar = document.getElementById("calendar").addEventListener("click", function(event){
  window.location.href="Calendar.html";
  event.preventDefault();
});
const statistics = document.getElementById("statistics").addEventListener("click", function(event){
  window.location.href="Statistics.html";
  event.preventDefault();
});
const mywallet = document.getElementById("mywallet").addEventListener("click", function(event){
  window.location.href="MyWallet.html";
  event.preventDefault();
});
const settings = document.getElementById("settings").addEventListener("click", function(event){
  window.location.href="Settings.html";
  event.preventDefault();
});
const dashboard = document.getElementById("dashboard").addEventListener("click", function(event){
  window.location.href="DashBoard.html";
  event.preventDefault();
});
const account = document.getElementById("account").addEventListener("click", function(event){
  window.location.href="Account.html";
  event.preventDefault();
});
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      const postsRef = ref(database, "Posts");
      get(postsRef)
        .then((snapshot) => {
          const calendarDays = document.querySelectorAll(".days li");
          const databaseDates = []; // Mảng chứa các ngày từ cơ sở dữ liệu
          
          snapshot.forEach((childSnapshot) => {
            const post = childSnapshot.val();
            if (post.user === uid) {
              const postDate = new Date(post.date);
              const day = postDate.getDate();
              const month = postDate.getMonth();
              const year = postDate.getFullYear();
              const dateString = `${year}-${month + 1}-${day}`;
              databaseDates.push(dateString);
            }
          });
          // Duyệt qua các ngày trên lịch và kiểm tra xem ngày có trong mảng ngày từ cơ sở dữ liệu hay không
          calendarDays.forEach((dayElement) => {
            const dayString = dayElement.dataset.date;
            if (databaseDates.includes(dayString)) {
              dayElement.classList.add("marked");
            }
          });
        })
        .catch((error) => {
          alert("Lỗi khi lấy thông tin từ cơ sở dữ liệu:", error);
        });
    }
  });


