<template>
  <div class="box box-full-width rrule-generator">
    <div class="form-horizontal v-padding-5-5">
      <div class="form-group repeat-interval">
        <label class="control-label col-md-2 col-sm-2 col-md-offset-1 col-sm-offset-1">Repeat</label>
        <div class="col-md-6 col-sm-6">
          <v-select label="label" @input="setRepeatType" :options="$store.state.repeatTypes"
            :value="$store.state.activeRepeatType"></v-select>
        </div>
        <span class="repeat-interval-panel">
          <label class="control-label col-md-2 col-sm-2 repeat-interval-pretext">every</label>
          <span class="input-group spinner col-md-2 col-sm-2">
            <input v-model="$store.state.repeatIntervalValue" class="form-control" type="text" value="1" maxlength="3">
          </span>
          <span class="col-md-2 col-sm-2 middle repeat-interval-text">{{$store.state.activeRepeatType.unit}}(s)</span>
        </span>
      </div>
      <div v-if="this.store.activeRepeatType.type === 'weekly'" class="form-group rrule-weekly">
        <div class="col-md-11 col-sm-11 col-md-offset-3 col-sm-offset-3">
          <div class="panel btn-group" role="group">
            <button type="button" class="btn btn-default active" data-value="0">Воскресенье</button>
            <button type="button" class="btn btn-default" data-value="1">Понедельник</button>
            <button type="button" class="btn btn-default" data-value="2">Вторник</button>
            <button type="button" class="btn btn-default" data-value="3">Среда</button>
            <button type="button" class="btn btn-default" data-value="4">Четверг</button>
            <button type="button" class="btn btn-default" data-value="5">Пятница</button>
            <button type="button" class="btn btn-default" data-value="6">Суббота</button>
          </div>
        </div>
      </div>
      <div v-if="this.store.activeRepeatType.type === 'monthly'" class="rrule-monthly">
        <div class="form-group rrule-monthly-date">
          <div class="col-md-3 col-sm-3 col-md-offset-3 col-sm-offset-3">
            <label class="control-label">
              <div class="iradio_minimal-blue checked" style="position: relative;"><input type="radio"
                  name="rruleMonthlyType" value="1" checked="checked" style="position: absolute; opacity: 0;">
                <ins class="iCheck-helper"
                  style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins>
              </div>
              on day
            </label>
          </div>
          <div class="col-md-3 col-sm-3">
            <select class="form-control month-day select2-hidden-accessible" tabindex="-1" aria-hidden="true">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
            </select><span class="select2 select2-container select2-container--default" dir="ltr"
              style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single"
                  role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0"
                  aria-labelledby="select2-0j6w-container"><span class="select2-selection__rendered"
                    id="select2-0j6w-container" title="1">1</span><span class="select2-selection__arrow"
                    role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper"
                aria-hidden="true"></span></span>
          </div>
        </div>
        <div class="form-group rrule-monthly-day">
          <div class="col-md-3 col-sm-3 col-md-offset-3 col-sm-offset-3">
            <label class="control-label">
              <div class="iradio_minimal-blue" style="position: relative;"><input type="radio" name="rruleMonthlyType"
                  value="2" style="position: absolute; opacity: 0;">
                <ins class="iCheck-helper"
                  style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins>
              </div>
              on the
            </label>
          </div>
          <div class="col-md-3 col-sm-3">
            <select class="form-control month-day-pos select2-hidden-accessible" tabindex="-1" aria-hidden="true">
              <option value="1">Первый</option>
              <option value="2">Второй</option>
              <option value="3">Третии</option>
              <option value="4">Четвертый</option>
              <option value="-1">Последний</option>
            </select><span class="select2 select2-container select2-container--default" dir="ltr"
              style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single"
                  role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0"
                  aria-labelledby="select2-kpcc-container"><span class="select2-selection__rendered"
                    id="select2-kpcc-container" title="First">First</span><span class="select2-selection__arrow"
                    role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper"
                aria-hidden="true"></span></span>
          </div>
          <div class="col-md-4 col-sm-4">
            <select class="form-control month-days select2-hidden-accessible" tabindex="-1" aria-hidden="true">
              <option value="0">Воскресенье</option>
              <option value="1">Понедельник</option>
              <option value="2">Вторник</option>
              <option value="3">Среда</option>
              <option value="4">Черверг</option>
              <option value="5">Пятница</option>
              <option value="6">Суббота</option>
              <option value="0,1,2,3,4,5,6">День</option>
              <option value="1,2,3,4,5">Рабочий день</option>
              <option value="0,6">Выходной день</option>
            </select><span class="select2 select2-container select2-container--default" dir="ltr"
              style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single"
                  role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0"
                  aria-labelledby="select2-oc7h-container"><span class="select2-selection__rendered"
                    id="select2-oc7h-container" title="Sunday">Sunday</span><span class="select2-selection__arrow"
                    role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper"
                aria-hidden="true"></span></span>
          </div>
        </div>
      </div>
      <div v-if="this.store.activeRepeatType.type === 'yearly'" class="rrule-yearly">
        <div class="form-group rrule-yearly-date">
          <div class="col-md-3 col-sm-3 col-md-offset-3 col-sm-offset-3">
            <label class="control-label">
              <div class="iradio_minimal-blue checked" style="position: relative;"><input type="radio"
                  name="rruleYearlyType" value="1" checked="checked" style="position: absolute; opacity: 0;">
                <ins class="iCheck-helper"
                  style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins>
              </div>
              on
            </label>
          </div>
          <div class="col-md-3 col-sm-3">
            <select class="form-control year-month select2-hidden-accessible" tabindex="-1" aria-hidden="true">
              <option value="1">Янв</option>
              <option value="2">Февр</option>
              <option value="3">Мар</option>
              <option value="4">Апр</option>
              <option value="5">Май</option>
              <option value="6">Июнь</option>
              <option value="7">Июль</option>
              <option value="8">Авг</option>
              <option value="9">Сент</option>
              <option value="10">Окт</option>
              <option value="11">Нояб</option>
              <option value="12">Дек</option>
            </select><span class="select2 select2-container select2-container--default" dir="ltr"
              style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single"
                  role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0"
                  aria-labelledby="select2-k2x0-container"><span class="select2-selection__rendered"
                    id="select2-k2x0-container" title="Jan">Jan</span><span class="select2-selection__arrow"
                    role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper"
                aria-hidden="true"></span></span>
          </div>
          <div class="col-md-3 col-sm-3">
            <select class="form-control year-month-day select2-hidden-accessible" tabindex="-1" aria-hidden="true">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
            </select><span class="select2 select2-container select2-container--default" dir="ltr"
              style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single"
                  role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0"
                  aria-labelledby="select2-gr0k-container"><span class="select2-selection__rendered"
                    id="select2-gr0k-container" title="1">1</span><span class="select2-selection__arrow"
                    role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper"
                aria-hidden="true"></span></span>
          </div>
        </div>
        <div class="form-group rrule-yearly-day">
          <div class="col-md-3 col-sm-3 col-md-offset-3 col-sm-offset-3">
            <label class="control-label">
              <div class="iradio_minimal-blue" style="position: relative;"><input type="radio" name="rruleYearlyType"
                  value="2" style="position: absolute; opacity: 0;">
                <ins class="iCheck-helper"
                  style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins>
              </div>
              on the
            </label>
          </div>
          <div class="col-md-3 col-sm-3">
            <select class="form-control year-month-day-pos select2-hidden-accessible" tabindex="-1" aria-hidden="true">
              <option value="1">Первый</option>
              <option value="2">Второй</option>
              <option value="3">Третии</option>
              <option value="4">Четвертый</option>
              <option value="-1">Последний</option>
            </select><span class="select2 select2-container select2-container--default" dir="ltr"
              style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single"
                  role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0"
                  aria-labelledby="select2-mww8-container"><span class="select2-selection__rendered"
                    id="select2-mww8-container" title="First">Первый</span><span class="select2-selection__arrow"
                    role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper"
                aria-hidden="true"></span></span>
          </div>
          <div class="col-md-4 col-sm-4">
            <select class="form-control year-month-days select2-hidden-accessible" tabindex="-1" aria-hidden="true">
              <option value="0">Воскресенье</option>
              <option value="1">Понедельник</option>
              <option value="2">Вторник</option>
              <option value="3">Среда</option>
              <option value="4">Четверг</option>
              <option value="5">Пятница</option>
              <option value="6">Суббота</option>
              <option value="0,1,2,3,4,5,6">День</option>
              <option value="1,2,3,4,5">Рабочий день</option>
              <option value="0,6">Выходной день</option>
            </select><span class="select2 select2-container select2-container--default" dir="ltr"
              style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single"
                  role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0"
                  aria-labelledby="select2-s3vv-container"><span class="select2-selection__rendered"
                    id="select2-s3vv-container" title="Sunday">Воскресенье</span><span class="select2-selection__arrow"
                    role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper"
                aria-hidden="true"></span></span>
          </div>
          <div class="col-md-1 col-sm-1 middle">
            of
          </div>
          <div class="col-md-3 col-sm-3">
            <select class="form-control year-month select2-hidden-accessible" tabindex="-1" aria-hidden="true">
              <option value="1">Янв</option>
              <option value="2">Февр</option>
              <option value="3">Мар</option>
              <option value="4">Апр</option>
              <option value="5">Май</option>
              <option value="6">Июнь</option>
              <option value="7">Июль</option>
              <option value="8">Авг</option>
              <option value="9">Сент</option>
              <option value="10">Окт</option>
              <option value="11">Нояб</option>
              <option value="12">Дек</option>
            </select><span class="select2 select2-container select2-container--default" dir="ltr"
              style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single"
                  role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0"
                  aria-labelledby="select2-zuro-container"><span class="select2-selection__rendered"
                    id="select2-zuro-container" title="Jan">Jan</span><span class="select2-selection__arrow"
                    role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper"
                aria-hidden="true"></span></span>
          </div>
        </div>
      </div>
      <hr class="block-separator">
      <div class="form-group rrule-end">
        <label class="control-label col-md-2 col-sm-2 col-md-offset-1 col-sm-offset-1">End</label>
        <div class="col-md-6 col-sm-6">
          <select id="rruleEndAction" class="form-control select2-hidden-accessible" tabindex="-1" aria-hidden="true">
            <option value="never">Никогда</option>
            <option value="after">После</option>
            <option value="date">После следующей даты</option>
          </select><span class="select2 select2-container select2-container--default" dir="ltr"
            style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single"
                role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0"
                aria-labelledby="select2-rruleEndAction-container"><span class="select2-selection__rendered"
                  id="select2-rruleEndAction-container" title="Never">Никогда</span><span class="select2-selection__arrow"
                  role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper"
              aria-hidden="true"></span></span>
        </div>
        <span class="rrule-end-session-panel hide">
          <span class="input-group spinner col-md-2 col-sm-2">
            <input id="rruleEndSessionsCount" type="text" class="form-control" value="1" maxlength="3">
          </span>
          <span class="col-md-6 col-sm-6 middle rrule-end-panel-text">отправленные запланированные сеансы SMS</span>
        </span>
        <span class="rrule-end-date-panel hide">
          <div class="col-md-4 col-sm-4">
            <input id="rruleEndDate" type="text" class="form-control" autocomplete="off" value="8 Мая 2018" readonly="">
          </div>
        </span>
      </div>
      <hr class="block-separator">
      <div class="form-group">
        <label class="control-label col-md-2 col-sm-2 col-md-offset-1 col-sm-offset-1">RRULE</label>
        <div class="col-md-17 col-sm-17">
          <textarea id="rruleResult" v-model="$store.state.rruleResult" class="form-control"
            readonly="readonly"></textarea>
        </div>
        <button @click="rruleGenerate">Update</button>
      </div>
    </div>
  </div>
</template>


<script>
/* eslint-disable default-case */
import vSelect from 'vue-select';
import RRule from 'rrule';
import { mapState } from 'vuex';

export default {
  name: 'recurrence',
  components: {
    'v-select': vSelect,
  },
  methods: {
    setRepeatType(val) {
      this.$store.commit('setRepeatType', val);
    },
    // ...mapMutations('rruleStore', ['setReleseSource', 'setReleaseName', 'setReleaseNumber', 'setReleaseAssetNumber', 'setReleaseGhgSource']),
    rruleGenerate() {
      const options = {};
      switch (this.store.activeRepeatType.type) {
        case 'daily':
          options.freq = RRule.DAILY;
          break;
        case 'hourly':
          options.freq = RRule.HOURLY;
          break;
      }
      if (this.store.activeRepeatType.type !== 'yearly') {
        options.interval = (this.store.repeatIntervalValue >= 1 ? this.store.repeatIntervalValue : 1);
      }
      const rule = new RRule(options);
      this.$store.commit('setRruleResult', rule.toString());
    },
  },
  computed: {
    ...mapState('rruleStore', ['rruleStore']),
    store() {
      return this.$store.state;
    },
  },
};
</script>
