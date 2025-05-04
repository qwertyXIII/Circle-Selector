/* This library was created by DXIII to make it easier to work with apple-style inputs. */

// Constants //
const elements = document.querySelectorAll('circle-selector')
const months = {
  ru: [{num: 1, name:'Январь'}, {num: 2, name:'Февраль'}, {num: 3, name:'Март'}, {num: 4, name:'Апрель'}, {num: 5, name:'Май'}, {num: 6, name:'Июнь'}, {num: 7, name:'Июль'}, {num: 8, name:'Август'}, {num: 9, name:'Сентябрь'}, {num: 10, name:'Октябрь'}, {num: 11, name:'Ноябрь'}, {num: 12, name:'Декабрь'}],
  en: [{num: 1, name:'January'}, {num: 2, name:'February'}, {num: 3, name:'March'}, {num: 4, name:'April'}, {num: 5, name:'May'}, {num: 6, name:'June'}, {num: 7, name:'July'}, {num: 8, name:'August'}, {num: 9, name:'September'}, {num: 10, name:'October'}, {num: 11, name:'November'}, {num: 12, name:'December'}]
}

/* Новый метод Date для определения текущего номера недели  */
Date.prototype.getWeek = function () {
  let date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  let week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((
    date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7
  );
}
Date.prototype.getWeekYear = function () {
  let date = new Date(this.getTime());
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  return date.getFullYear();
}
/* функция для определения текущего номера недели [исп.: dateByWeekNumber(год, номер недели);] > //возвращает объект с начальной и конечной датой недели// */
function dateByWeekNumber(year, week) {
  let result = { week: week, startDate: '', endDate: '' };
  const date = new Date(year, 0, 7);
  date.setDate(date.getDate() - (date.getDay() + 10) % 7);
  date.setDate(date.getDate() + (week - 1) * 7);
  date.setDate(date.getDate() - 3);
  result.startDate = date.toLocaleDateString('ru-RU').split('.').reverse().join('-');
  result.endDate = new Date(date.setDate(date.getDate() + 6)).toLocaleDateString('ru-RU').split('.').reverse().join('-');
  return result;
}
function getNumberOfDays(year, month) {
  let day = new Date(year, month, 0);
  return day.getDate();
}
function createSpinner(className) {
  let element = document.createElement('spinner');
  element.classList.add(className);
  element.setAttribute('value', '-')
  return element;
}
function createSpinnerElement(text, value) {
  let element = document.createElement('div');
  element.setAttribute('value', value);
  element.innerHTML = text;
  return element;
}

/* -------------------------------------------------------------- */
function observering(selector) {
  function scrollTracking(entries) {
    for (const entry of entries) {
      selector.setAttribute("value", entry.target.getAttribute('value'))
    }
  }
  const observer = new IntersectionObserver(scrollTracking, {
    threshold: [1.0]
  });
  selector.querySelectorAll('div').forEach(element => {
    observer.observe(element)
  });
}
/* -------------------------------------------------------------- */

function circleSelector() {

  let styles = document.createElement('style')
  styles.innerText = `
    circle-selector {
      display: flex;
      width: max-content;
    }
    circle-selector > spinner {
      scroll-snap-type: y mandatory;
      overflow-x: hidden;
      display: flex;
      flex-flow: column nowrap;
      flex-direction: column;
      box-sizing: border-box;
      height: 50px;
      width: max-content;
      cursor: grab;
      user-select: none;
    }
    circle-selector > spinner > div {
      margin: 0;
      height: 50px;
      gap: 10px;
      scroll-snap-align: center;
      flex: none;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 10px;
    }
    circle-selector > spinner::-webkit-scrollbar { 
      width: 0 !important
    }
  `
  document.querySelector('head').appendChild(styles)

  elements.forEach(element => {
    const type = element.getAttribute('type')
    
    switch (type) {

      case 'fullDate':
        //create a basic structure
        let day = element.appendChild(createSpinner('selector-day-spinner'));
        let month = element.appendChild(createSpinner('selector-month-spinner'));
        let year = element.appendChild(createSpinner('selector-year-spinner'));

        let date = new Date();
        
        for (let i = 1; i <= getNumberOfDays(date.getFullYear(), date.getMonth() + 1); i++) {
          day.appendChild(createSpinnerElement(i, i))
        }
        observering(day)
        day.querySelector(`[value="${date.getDate()}"]`).scrollIntoView({behavior: "smooth"})

        for (let i = 0; i < date.getMonth() + 1; i++) {          
          month.appendChild(createSpinnerElement(months.ru[i].name, i))
        }
        observering(month)
        month.querySelector(`[value="${date.getMonth()}"]`).scrollIntoView({behavior: "smooth"})
        
        for (let i = date.getFullYear() - 500; i <= date.getFullYear(); i++) {
          year.appendChild(createSpinnerElement(i, i))
        }
        observering(year)
        year.querySelector(`[value="${date.getFullYear()}"]`).scrollIntoView({behavior: "smooth"})

        break;

      case 'weekDate':
        element.appendChild(createSpinner('selector-week-spinner'));
        element.appendChild(createSpinner('selector-year-spinner'));

        break;

      case 'monthDate':
        element.appendChild(createSpinner('selector-week-spinner'));
        element.appendChild(createSpinner('selector-year-spinner'));

        break;

      case 'custom':

        break;

      default:
        console.error(element, `There is no "${type}" selector type in the library. If you have any suggestions, send a telegram to the developer: @DXIII_tg`);

        break;
    }
  });
}

circleSelector('ru')



/*


    <p>1</p>
    <p>2</p>
    <p>3</p>
    <p>4</p>
    <p>5</p>
    <p>6</p>


*/

