<template>
  <div class="container-fluid">
    <div class="nl-summary-box mb-2">
      <div class="row">
        <div class="col">
          <div class="nl-summary-box--stat">Завершенный</div>
          <div class="nl-summary-box--desc">Статус</div>
        </div>
        <div class="col">
          <div class="nl-summary-box--stat">--</div>
          <div class="nl-summary-box--desc">Media View Reporting</div>
        </div>
        <div class="col">
          <div class="nl-summary-box--stat">Acme Inc.</div>
          <div class="nl-summary-box--desc">Компания</div>
        </div>
        <div class="col">
          <div class="nl-summary-box--stat">0</div>
          <div class="nl-summary-box--desc">Воздействие</div>
        </div>
        <div _ngcontent-c86="" class="col">
          <div class="nl-summary-box--stat">06/13/2016 - 07/13/2016</div>
          <div class="nl-summary-box--desc">Даты компании</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

$nl-light-gray: #767676;
$font-size-xl: 1.125rem;
$font-size-med: .8125rem;

/*
Summary Box

NOTE:
We need a minumim of  ~240px to fit the date range
this 240px is the bases for the media queries
*/
.nl-summary-box {

  // padding-left:15px;
  // padding-right:15px;
  .col {
    flex: 1 0 calc(100% - 2px);
    /* width less border */
    border-bottom: solid 1px transparentize($nl-light-gray, 0);
    padding-top: 15px;
    padding-bottom: 15px;
    background-color: white;

    &:last-of-type {
      border-right: none;
    }
  }

  &--stat {
    font-size: $font-size-xl;
    font-weight: 500;
    line-height: 19.25px;
  }

  &--desc {
    font-size: $font-size-med;
    line-height: 13.75px;
    opacity: .8;
  }
}

/*
NOTE:
Media queries below fix the border issue
as flexbox css cannot specify when an element wraps
so we are change the col widths based on available space
*/

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) and (max-width: 767px) {
  .nl-summary-box {
    .col {
      flex: 1 0 calc(50% - 2px);
      border-right: solid 1px transparentize($nl-light-gray, 0);

      &:nth-child(2n) {
        border-right: none;
      }
    }
  }
}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) and (max-width: 991px) {
  .nl-summary-box {
    .col {
      flex: 1 0 calc(33% - 2px);
      border-right: solid 1px transparentize($nl-light-gray, 0);

      &:nth-child(3n) {
        border-right: none;
      }
    }
  }
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) and (max-width: 1199px) {
  .nl-summary-box {
    .col {
      flex: 1 0 calc(25% - 2px);
      border-right: solid 1px transparentize($nl-light-gray, 0);

      &:nth-child(4n) {
        border-right: none;
      }
    }
  }
}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) and (max-width: 1499px) {
  .nl-summary-box {
    .col {
      flex: 1 0 calc(20% - 2px);
      border-right: solid 1px transparentize($nl-light-gray, 0);

      &:nth-child(5n) {
        border-right: none;
      }
    }
  }
}

// XXL (custom)
@media (min-width: 1500px) {
  .nl-summary-box {
    .col {
      flex: 1 0 calc(16% - 10px);
      border-right: solid 1px transparentize($nl-light-gray, 0);

      &:nth-child(6n) {
        border-right: none;
      }
    }
  }
}
</style>
