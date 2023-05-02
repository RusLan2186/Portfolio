"use strict"
// ................BURGER................................................

$(document).ready(function () {
   // на header burger вешаем событие клик
   $('.header__burger').click(function (event) {
      // при клике на бургер и хедер меню добавился класс aktive (нажали-добав класс, нажали-убрался класс) 
      $('.header__burger, .header__menu').toggleClass('open-menu');
      // при открытом бургере блокируем прокрутку страницы
      $('body').toggleClass('lock');
   });
});

// закрытие бургера, при нажатии на меню
const headerLinks = document.querySelectorAll('.header__menu')
headerLinks.forEach((el) => {
   el.addEventListener('click', () => {
      $('.header__burger,.header__menu').toggleClass('open-menu');
      $('body').toggleClass('lock');
   })
})

// ................табы...............................................
$(document).ready(function () {
   $('.projects__tabs_link').click(function (e) {
      e.preventDefault()

      // класс где лежать ссылки(табы)
      // 2класс - тело, где лежить контент
      $('.projects__tabs_link').removeClass(' projects__tabs_link--active');
      $('.tabs-block').removeClass('tabs-block--active');

      $(this).addClass('projects__tabs_link--active');
      $($(this).attr('href')).addClass('tabs-block--active')

   });
   $('.projects__tabs_link:first').click();

});

// .............................отправка данных формы.......................................

document.addEventListener('DOMContentLoaded', function () {
   const form = document.getElementById('form');
   form.addEventListener('submit', formSend);

   async function formSend(e) {
      e.preventDefault();

      let error = formValidate(form);
      // вытягивает все данные с полей
      let formData = new FormData(form);
      // добавляем изображение
      formData.append('image', formImage.files[0]);

      if (error === 0) {
         // бегунок загрузки
         form.classList.add('_sending');
         // отправляем данные формы в файл sendmail
         let response = await fetch('sendmail.php', {
            method: 'POST',
            body: formData
         });
         // получаем ответ успешна наша отправка или нет
         if (response.ok) {
            let result = await response.json();
            alert(result.message);
            // очистка формы после отправки
            formIPreview.innerHTML = '';
            form.reset();
            // после успешной отпраки убираем бегунок загрузки
            form.classList.remove('_sending');
         } else {
            alert('Ошибка');
            form.classList.remove('_sending');
         }

      } else {
         alert('Заполните обязательные поля');
      }


   }
   function formValidate(form) {
      let error = 0;
      let formReq = document.querySelectorAll('._req');

      for (let index = 0; index < formReq.length; index++) {
         const input = formReq[index];
         formRemoveError(input);

         if (input.classList.contains('_email ')) {
            if (emailTest(input)) {
               formAddError(input);
               error++;
            }
         } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
            formAddError(input);
            error++;
         } else {
            if (input.value === '') {
               formAddError(input);
               error++;
            }
         }
      }
      return error;
   }

   function formAddError(input) {
      input.parentElement.classList.add('_error');
      input.classList.add('_error');
   }
   function formRemoveError(input) {
      input.parentElement.classList.remove('_error');
      input.classList.remove('_error');
   }

   //  функция текста email проверяет есть ли @ .
   function emailTest(input) {
      return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
   }

   //  получаем input файл в переменную
   const formImage = document.getElementById('formImage');
   //  получаем div для превью в переменную
   const formIPreview = document.getElementById('formPreview');
   //  слушаем изменения в инпуте file 
   formImage.addEventListener('change', () => {
      uploadFile(formImage.files[0]);
   });

   function uploadFile(file) {
      //  проверяем тип файла
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
         alert('разрешены только изображения');
         formImage.value = '';
         return;
      }
      // проверяем размер файла 
      if (file.size > 2 * 1024 * 1024) {
         alert('файл должен быть менее 2 мб');
         return;
      }

      //  выводим превью

      var reader = new FileReader();
      reader.onload = function (e) {
         formIPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
      };
      reader.onerror = function (e) {
         alert('Ошибка');
      };
      reader.readAsDataURL(file);
   }
})

// замедленный скролл
$(document).ready(function () {
   $('.goto').on('click', function (event) {
      if ($(this).attr('hash') !== "") {
         event.preventDefault();
         let hash = $(this).prop('hash');
         $('html, body').animate({
            scrollTop: $(hash).offset().top
         }, 800, function () {
         });
      }
   });
});

















