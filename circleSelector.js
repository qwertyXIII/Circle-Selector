/* This library was created by DXIII to make it easier to work with apple-style inputs. */

const elements = document.querySelectorAll('circle-selector')

/* -------------------------------------------------------------- */
function observer(selector) {
  function scrollTracking(entries) {
    for (const entry of entries) {
      selector.setAttribute("value", entry.target.getAttribute('value'))
    }
  }
  const observer = new IntersectionObserver(scrollTracking, {
    threshold: [1.0]
  });
  selector.querySelectorAll('.selector__element').forEach(element => observer.observe(element));
}
/* -------------------------------------------------------------- */


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

function circleSelector() {
  elements.forEach(element => {
    const type = element.getAttribute('type')

    switch (type) {
      case 'fullDate':

        break;
      case 'weekDate':

        break;
      case 'mouthDate':

        break;
      case 'custom':

        break;

      default:
        console.error(element, `There is no "${type}" selector type in the library. If you have any suggestions, send a telegram to the developer: @DXIII_tg`);
        break;
    }


  });
}

circleSelector()