<template id="recurrence-editor">
  <div class="form">

    <div class="form-group" v-if="debug">
      <label for="rfc2445" class="control-label">RFC 2445</label>
      <div class="col-sm">
        <input type="text" name="rfc2445" id="rfc2445" v-model="rfc2445" class="form-control">
        <small class="text-muted">Внутреннее значение, соответствующее спецификации <a
            href="https://www.ietf.org/rfc/rfc2445.txt" target="blank">RFC 2445</a> and <a
            href="https://tools.ietf.org/html/rfc5545#appendix-A" target="blank">RFC 5545</a> </small>
      </div>
      <button class="btn btn-primary" @click="updateRfcString()">Перерассчитать</button>
    </div>

    <div class="form-group">

      <div class="col-sm">
        <label for="repeat" class="control-label">
          Повторять
        </label>
        <select id="repeat" v-model="repeat" class="form-control">
          <option value="never">Никогда</option>
          <option value="daily">Ежедневно</option>
          <option value="weekly">Еженедельно</option>
          <option value="monthly">Ежемесячно</option>
          <option value="yearly">Ежегодно</option>
        </select>
      </div>
    </div>

    <div class="form-group" v-if="repeat === 'daily'">
      <label for="repeat-number-of-days" class="control-label">
        Напоминать каждый(-е)
      </label>
      <div class="col-sm">
        <div class="input-group">
          <input id="repeat-number-of-days" type="number" class="form-control" v-model="numberOfDays">
          <div class="input-group-append">
            <div class="input-group-text">
              {{ numberOfDays === 1 ? 'день' : 'дня(-дней)' }}
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="form-group" v-if="repeat === 'weekly'">
      <label for="repeat-number-of-weeks" class="control-label">
        Напоминать каждую(каждые)
      </label>
      <div class="col-sm">

        <div class="input-group">

          <input id="repeat-number-of-weeks" type="number" class="form-control" v-model="numberOfWeeks">
          <div class="input-group-append">
            <div class="input-group-text">
              {{ numberOfWeeks === 1 ? 'неделю' : 'недель(-и)' }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="form-group" v-if="repeat === 'weekly'">
      <div>
        <label for="repeat-on-day" class="control-label">
          В следующий день недели
        </label>
      </div>

      <div class="col-sm">
        <div class="form-check-inline">
          <label class="checkbox-inline form-check-label">
            <input name="repeat-on-day" class="form-check-input" value="monday" type="checkbox" v-model="repeatOnDay">
            Понедельник
          </label>
        </div>
        <div class="form-check-inline">
          <label class="checkbox-inline form-check-label">
            <input name="repeat-on-day" class="form-check-input" value="tuesday" type="checkbox" v-model="repeatOnDay">
            Вторник
          </label>
        </div>
        <div class="form-check-inline">
          <label class="checkbox-inline form-check-label">
            <input name="repeat-on-day" class="form-check-input" value="wednesday" type="checkbox"
              v-model="repeatOnDay"> Среда
          </label>
        </div>
        <div class="form-check-inline">
          <label class="checkbox-inline form-check-label">
            <input name="repeat-on-day" class="form-check-input" value="thursday" type="checkbox" v-model="repeatOnDay">
            Четверг
          </label>
        </div>
        <div class="form-check-inline">
          <label class="checkbox-inline form-check-label">
            <input name="repeat-on-day" class="form-check-input" value="friday" type="checkbox" v-model="repeatOnDay">
            Пятница
          </label>
        </div>
        <div class="form-check-inline">
          <label class="checkbox-inline form-check-label">
            <input name="repeat-on-day" class="form-check-input" value="saturday" type="checkbox" v-model="repeatOnDay">
            Суббота
          </label>
        </div>
        <div class="form-check-inline">
          <label class="form-check-label">
            <input name="repeat-on-day" class="form-check-input" value="sunday" type="checkbox" v-model="repeatOnDay">
            Воскресенье
          </label>
        </div>

      </div>
    </div>

    <div class="form-group" v-if="repeat === 'monthly'">
      <label for="repeat-number-of-months" class="control-label">
        Напоминать каждый
      </label>
      <div class="col-sm">
        <div class="input-group">

          <input id="repeat-number-of-months" type="number" class="form-control" v-model="numberOfMonths">
          <div class="input-group-append">
            <div class="input-group-text">
              {{ numberOfMonths === 1 ? 'месяц' : 'месяцев(-ца)' }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="form-group" v-if="repeat === 'monthly'">
      <label for="repeat-on-month" class="control-label">
        Напоминать в
      </label>
      <div class="col-sm">
        <div class="form-inline">
          <input id="repeat-on-month" class="form-check-input" name="repeat-on-month" type="radio" value="day"
            v-model="repeatOnMonth">

          <label class="control-label">
            День
            <input name="repeat-on-month-day" v-model="repeatOnMonthDay" type="number" min="1" max="31"
              class="form-control" :disabled="repeatOnMonth !== 'day'">
          </label>
        </div>

        <div class="form-inline">
          <input id="repeat-on-month" class="form-check-input" name="repeat-on-month" type="radio" value="specific"
            v-model="repeatOnMonth">

          <select name="repeat-on-month-specific-iteration" v-model="repeatOnMonthSpecificIteration"
            class="form-control" :disabled="repeatOnMonth !== 'specific'">
            <option value="first">Первый</option>
            <option value="second">Второй</option>
            <option value="third">Третий</option>
            <option value="fourth">Четвертый</option>
            <option value="last">Последний</option>
          </select>

          <select name="repeat-on-month-specific-day" v-model="repeatOnMonthSpecificDay" class="form-control"
            :disabled="repeatOnMonth !== 'specific'">
            <option value="day">День</option>
            <option value="weekday">Рабочий день</option>
            <option value="weekend">Выходной день</option>
            <option disabled></option>
            <option value="monday">Понедельник</option>
            <option value="tuesday">Вторник</option>
            <option value="wednesday">Среда</option>
            <option value="thursday">Четверг</option>
            <option value="friday">Пятница</option>
            <option value="saturday">Суббота</option>
            <option value="sunday">Воскресенье</option>
          </select>
        </div>
      </div>
    </div>

    <div class="form-group" v-if="repeat === 'yearly'">
      <label for="repeat-on-month" class="control-label">
        Повторять каждый(-ые)
      </label>
      <div class="col-sm">
        <div class="input-group">
          <input id="repeat-number-of-years" type="number" class="form-control" v-model="numberOfYears">
          <div class="input-group-append">
            <div class="input-group-text">
              {{ numberOfYears === 1 ? 'год' : 'года' }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="form-group" v-if="repeat === 'yearly'">
      <label for="repeat-on-year" class="control-label">
        Напоминать
      </label>
      <div class="col-sm">
        <div class="form-check-inline">
          <input name="repeat-on-year" class="form-check-input" v-model="repeatOnYear" type="radio" value="month">
          <select name="repeat-on-year-month" v-model="repeatOnYearMonth" class="form-control"
            :disabled="repeatOnYear !== 'month'">
            <option value="1">Январь</option>
            <option value="2">Февраль</option>
            <option value="3">Март</option>
            <option value="4">Апрель</option>
            <option value="5">Май</option>
            <option value="6">Июнь</option>
            <option value="7">Июль</option>
            <option value="8">Август</option>
            <option value="9">Сентябрь</option>
            <option value="10">Октябрь</option>
            <option value="11">Ноябрь</option>
            <option value="12">Декабрь</option>
          </select>
          <input name="repeat-on-year-month-day" v-model="repeatOnYearMonthDay" class="form-control" type="number"
            min="1" max="31" :disabled="repeatOnYear !== 'month'">
        </div>

        <div class="form-check-inline">
          <input name="repeat-on-year" class="form-check-input" v-model="repeatOnYear" type="radio" value="specific">
          <select name="repeat-on-year-specific-iteration" v-model="repeatOnYearSpecificIteration" class="form-control"
            :disabled="repeatOnYear !== 'specific'">
            <option value="first">Певый</option>
            <option value="second">Второй</option>
            <option value="third">Третий</option>
            <option value="fourth">Четвертый</option>
            <option value="last">Последний</option>
          </select>
          <select name="repeat-on-year-specific-day" v-model="repeatOnYearSpecificDay" class="form-control"
            :disabled="repeatOnYear !== 'specific'">
            <option value="day">День</option>
            <option value="weekday">Рабочую неделю</option>
            <option value="weekend">Выходные</option>
            <option disabled></option>
            <option value="monday">Понедельник</option>
            <option value="tuesday">Вторник</option>
            <option value="wednesday">Среда</option>
            <option value="thursday">Четверг</option>
            <option value="friday">Пятница</option>
            <option value="saturday">Суббота</option>
            <option value="sunday">Воскресенье</option>
          </select>
          <small> мес: </small>
          <select name="repeat-on-year-specific-month" v-model="repeatOnYearSpecificMonth" class="form-control"
            :disabled="repeatOnYear !== 'specific'">
            <option value="1">Январь</option>
            <option value="2">Февраль</option>
            <option value="3">Март</option>
            <option value="4">Апрель</option>
            <option value="5">Май</option>
            <option value="6">Июнь</option>
            <option value="7">Июль</option>
            <option value="8">Август</option>
            <option value="9">Сентябрь</option>
            <option value="10">Октябрь</option>
            <option value="11">Ноябрь</option>
            <option value="12">Декабрь</option>
          </select>
        </div>
      </div>
    </div>

    <div class="form-group" v-if="repeat !== 'never'">
      <label for="repeat-end" class="control-label">
        Окончание
      </label>

      <div class="col-sm">
        <div class="form-inline mb-1">
          <label class="control-label mr-1">
            <input id="repeat-end" name="repeat-end" type="radio" v-model="end" value="never" class="mr-1">
            Никогда
          </label>
        </div>

        <div class="form-inline mb-1">
          <label class="control-label mr-1">
            <input id="repeat-end" name="repeat-end" type="radio" v-model="end" value="after" class="mr-1">
            После
          </label>

          <div class="input-group mb-1">
            <input id="repeat-end-after" type="number" class="form-control" v-model="endAfter"
              :disabled="end !== 'after'">
            <div class="input-group-append">
              <div class="input-group-text">
                {{ endAfter === 1 ? 'напоминания' : 'напоминаний' }}
              </div>
            </div>
          </div>
        </div>

        <div class="form-inline">
          <label class="control-label mr-1">
            <input id="repeat-end" name="repeat-end" type="radio" v-model="end" value="on" class="mr-1">
            После следующей даты
          </label>

          <input id="repeat-end-on" type="date" class="form-control" v-model="endOn" :disabled="end !== 'on'">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable prefer-template */
// to-do pass from child to parent component
export default {
  name: 'recurrence',
  props: {
    rfc2445: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      debug: true,
      // rfc2445: '',
      repeat: 'monthly',
      numberOfDays: 1,
      numberOfWeeks: 1,
      numberOfMonths: 1,
      numberOfYears: 1,
      repeatOnMonth: 'day',
      repeatOnMonthDay: 1,
      repeatOnDay: [],
      repeatOnMonthSpecificIteration: 'first',
      repeatOnMonthSpecificDay: 'day',
      repeatOnYear: 'month',
      repeatOnYearMonth: '1',
      repeatOnYearMonthDay: 1,
      repeatOnYearSpecificIteration: 'first',
      repeatOnYearSpecificDay: 'day',
      repeatOnYearSpecificMonth: '1',
      end: 'never',
      endAfter: 1,
      endOn: '',
    };
  },
  watch: {
    repeat() { this.updateRfcString(); },
    numberOfDays() { this.updateRfcString(); },
    numberOfWeeks() { this.updateRfcString(); },
    repeatOnDay() { this.updateRfcString(); },
    numberOfMonths() { this.updateRfcString(); },
    repeatOnMonth() { this.updateRfcString(); },
    repeatOnMonthDay() { this.updateRfcString(); },
    repeatOnMonthSpecificDay() { this.updateRfcString(); },
    repeatOnMonthSpecificIteration() { this.updateRfcString(); },
    numberOfYears() { this.updateRfcString(); },
    repeatOnYear() { this.updateRfcString(); },
    repeatOnYearMonthDay() { this.updateRfcString(); },
    repeatOnYearSpecificIteration() { this.updateRfcString(); },
    repeatOnYearSpecificDay() { this.updateRfcString(); },
    repeatOnYearSpecificMonth() { this.updateRfcString(); },
    end() { this.updateRfcString(); },
    endAfter() { this.updateRfcString(); },
    endOn() { this.updateRfcString(); },
  },
  methods: {
    getFormattedDate(date) {
      if (!(date instanceof Date)) {
        return '';
      }
      return date.getUTCFullYear()
        + ('0' + (date.getUTCMonth() + 1)).slice(-2)
        + ('0' + date.getUTCDate()).slice(-2)
        + 'T'
        + ('0' + date.getUTCHours()).slice(-2)
        + ('0' + date.getUTCMinutes()).slice(-2)
        + ('0' + date.getUTCSeconds()).slice(-2)
        + 'Z';
    },
    getFormattedDay(day) {
      // eslint-disable-next-line no-param-reassign
      day = day.toLowerCase();
      if (day === 'day') {
        return 'MO,TU,WE,TH,FR,SA,SU';
      }
      if (day === 'weekday') {
        return 'MO,TU,WE,TH,FR';
      }
      if (day === 'weekend') {
        return 'SA,SU';
      }
      return day.substring(0, 2).toUpperCase();
    },
    isSingleDay(day) {
      // eslint-disable-next-line no-param-reassign
      day = this.getFormattedDay(day);
      const days = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
      return days.indexOf(day) !== -1;
    },
    getSpecificIterationNumber(value) {
      const mapping = {
        first: '1',
        second: '2',
        third: '3',
        fourth: '4',
        last: '-1',
      };
      if (typeof mapping[value] === 'undefined') {
        return '';
      }
      return mapping[value];
    },
    updateRfcString() {
      this.rfc2445 = this.calculateRfcString();
      if (this.debug) {
        // eslint-disable-next-line no-console
        console.log(this.rfc2445);
      }
    },
    calculateRfcString() {
      if (this.calculateInterval() === 'INTERVAL=0') {
        return '';
      }
      const segments = [
        this.calculateInterval(),
        this.calculateFreq(),
        this.calculateByMonth(),
        this.calculateByDay(),
        this.calculateCount(),
        this.calculateUntil(),
        this.calculateByMonthDay(),
        this.calculateRepeatOnMonthSpecificIteration(),
        this.calculateBySetPos(),
      ];
      return segments.filter(segment => typeof segment !== 'undefined' && segment.length > 0).join(';');
    },
    calculateFreq() {
      if (this.repeat === 'never') {
        return '';
      }
      return 'FREQ=' + this.repeat.toUpperCase();
    },
    calculateInterval() {
      if (this.repeat === 'daily') {
        if (this.numberOfDays === 1) {
          return '';
        }
        return 'INTERVAL=' + this.numberOfDays;
      }
      if (this.repeat === 'weekly') {
        if (this.numberOfWeeks === 1) {
          return '';
        }
        return 'INTERVAL=' + this.numberOfWeeks;
      }
      if (this.repeat === 'monthly') {
        if (this.numberOfMonths === 1) {
          return '';
        }
        return 'INTERVAL=' + this.numberOfMonths;
      }
      if (this.repeat === 'yearly') {
        if (this.numberOfYears === 1) {
          return '';
        }
        return 'INTERVAL=' + this.numberOfYears;
      }
      return '';
    },
    calculateCount() {
      if (this.end !== 'after') {
        return '';
      }
      if (this.repeat === 'never') {
        return '';
      }
      return 'COUNT=' + this.endAfter;
    },
    calculateUntil() {
      if (this.end !== 'on') {
        return '';
      }
      if (this.endOn === '') {
        return '';
      }
      const untilDate = new Date(this.endOn);
      return 'UNTIL=' + this.getFormattedDate(untilDate);
    },
    calculateByDay() {
      if (this.repeat === 'weekly') {
        const days = this.repeatOnDay.map(day => this.getFormattedDay(day));
        return 'BYDAY=' + days.join(',');
      }
      if (this.repeat === 'monthly' && this.repeatOnMonth === 'specific') {
        let prefix = '';
        if (this.isSingleDay(this.repeatOnMonthSpecificDay)) {
          prefix = this.getSpecificIterationNumber(this.repeatOnMonthSpecificIteration);
        }
        return 'BYDAY=' + prefix + this.getFormattedDay(this.repeatOnMonthSpecificDay);
      }
      if (this.repeat === 'yearly' && this.repeatOnYear === 'specific') {
        let prefix = '';
        if (this.isSingleDay(this.repeatOnYearSpecificDay)) {
          prefix = this.getSpecificIterationNumber(this.repeatOnYearSpecificIteration);
        }
        return 'BYDAY=' + prefix + this.getFormattedDay(this.repeatOnYearSpecificDay);
      }
      return '';
    },
    calculateByMonthDay() {
      if (this.repeat === 'monthly') {
        if (this.repeatOnMonth !== 'day') {
          return '';
        }
        return 'BYMONTHDAY=' + this.repeatOnMonthDay;
      }
      if (this.repeat === 'yearly') {
        if (this.repeatOnYear !== 'month') {
          return '';
        }
        return 'BYMONTHDAY=' + this.repeatOnYearMonthDay;
      }
      return '';
    },
    calculateByMonth() {
      if (this.repeat !== 'yearly') {
        return '';
      }
      return 'BYMONTH=' + this.repeatOnYearMonth;
    },
    calculateRepeatOnMonthSpecificIteration() {
      return '';
    },
    calculateBySetPos() {
      if (this.repeat === 'monthly') {
        if (this.repeatOnMonth !== 'specific') {
          return '';
        }
        if (this.isSingleDay(this.repeatOnMonthSpecificDay) || this.isSingleDay(this.repeatOnYearSpecificDay)) {
          return '';
        }
        return 'BYSETPOS=' + this.getSpecificIterationNumber(this.repeatOnMonthSpecificIteration);
      }
      if (this.repeat === 'yearly') {
        if (this.repeatOnYear !== 'specific') {
          return '';
        }
        if (this.isSingleDay(this.repeatOnYearSpecificDay)) {
          return '';
        }
        return 'BYSETPOS=' + this.getSpecificIterationNumber(this.repeatOnYearSpecificIteration);
      }
      return '';
    },
  },
  computed: {
    // store() {
    //   return this.$store.state;
    // }
  },
};
</script>
