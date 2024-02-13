// script.js
window.addEventListener('DOMContentLoaded', () => {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbx1r24tkcvh-U6ZE70hh5HfO-GHRu4Y_FSRvVwYqS7MXedI-8vHFSZtNfhkKM_Wkpag/exec'
    const form = document.forms['submit-to-google-sheet']
    const sendText = document.querySelector("#sendText")
    form.addEventListener('submit', e => {
        e.preventDefault()
        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
            .then(response =>{
                sendText.innerHTML = "Ваши данные успешны отправлены , наши операторы скоро свяжутся с вами"
                setTimeout(function (){
                    sendText.innerHTML = ""
                }, 4000);
                form.reset();
            })
            .catch(error => console.error('Error!', error.message))
    })



    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        grabCursor:true,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

    });




    const deadline = '2024-02-20';

    function getTimeRemaining(endtime) {
        const t =  Date.parse(deadline) - new Date(),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total' : t,
            days,hours,minutes,seconds
        };
    }

    function getZeroNum(num) {
        if (num >= 0 && num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('.days'),
            hours = timer.querySelector(".hours"),
            minutes = timer.querySelector(".minutes"),
            seconds = timer.querySelector(".seconds"),
            timeInterval = setInterval(upateClock, 1000);

        upateClock();

        function upateClock() {
            const t1 = getTimeRemaining(endtime);

            days.innerHTML = getZeroNum(t1.days);
            hours.innerHTML = getZeroNum(t1.hours);
            minutes.innerHTML = getZeroNum(t1.minutes);
            seconds.innerHTML = getZeroNum(t1.seconds);


            if (t1.total <= 0){
                clearInterval(timeInterval);
            }

        }
    }

    setClock(".action-timer", deadline);








    // When the user scrolls the page, execute myFunction
    window.onscroll = function() {myFunction()};

// Get the header
    const header = document.querySelector(".header-navigation");

// Get the offset position of the navbar
    const sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function myFunction() {
        if (window.scrollY > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }


    let questionCards = document.querySelectorAll('.question-card-title');

    questionCards.forEach(function (card) {
        card.addEventListener('click', function (event) {
            event.preventDefault();

            let target = event.currentTarget;

            // Закрываем все другие открытые блоки
            questionCards.forEach(function (otherCard) {
                if (otherCard !== target && otherCard.classList.contains('active')) {
                    otherCard.classList.remove('active');
                    otherCard.nextElementSibling.style.display = 'none';
                }
            });

            // Открываем или закрываем текущий блок
            target.classList.toggle('active');
            let content = target.nextElementSibling;
            if (content) { // Проверяем наличие следующего соседнего элемента
                if (content.style.display === 'block') {
                    content.style.display = 'none';
                } else {
                    content.style.display = 'block';
                }
            }
        });
    });

    const nav = document.querySelector('#nav'),
        navBtn = document.querySelector('#nav-btn'),
        navBtnImg = document.querySelector('#nav-btn-img'),
        navItems = document.querySelectorAll('.nav-item');

    navBtn.addEventListener('click',(e) => {
        e.preventDefault();
        if (nav.classList.toggle('open')) {
            navBtnImg.src = "img/close-nav.svg";
            document.body.style.overflow = 'hidden';
            nav.style.justifyContent = 'space-between';
        } else {
            navBtnImg.src = "img/open-nav.svg";
            document.body.style.overflow = '';
            nav.style.justifyContent = 'flex-end';
        }
    });

    navItems.forEach(item => {
        item.addEventListener('click' , () => {
            if (nav.classList.contains('open')) {
                nav.classList.remove('open');
                document.body.style.overflow = '';
                navBtnImg.src = "img/open-nav.svg";
                nav.style.justifyContent = 'flex-end';
            }
        });
    });

    document.querySelectorAll('.parent-container').forEach(container => {
        container.addEventListener('click', function() {
            // Выполните нужное действие при клике на родительский элемент
            window.location.href = this.querySelector('a').href;
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Очищаем хеш в адресной строке
                history.replaceState({}, document.title, window.location.pathname);
            }
        });
    });


});





