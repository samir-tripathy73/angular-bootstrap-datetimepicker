import {DlModelProvider} from './dl-model-provider';
import * as momentNs from 'moment';
import {DlDateTimePickerModel} from './dl-date-time-picker-model';
import {Component} from '@angular/core';

/** @internal */
const moment = momentNs;

/**
 * Default implementation for the `day` view.
 */
@Component({
  providers: [
    {
      provide: DlDayModelComponent,
      useClass: DlDayModelComponent,
    },
  ],
})
export class DlDayModelComponent implements DlModelProvider {

  /**
   * Returns the `day` model for the specified moment in `local` time with the
   * `active` day set to the first day of the month.
   *
   * The `day` model represents a month (42 days) as six rows with seven columns
   * and each cell representing one-day increments.
   *
   * The `day` always starts at midnight.
   *
   * Each cell represents a one-day increment at midnight.
   *
   * @param milliseconds
   *  the moment in time from which the minute model will be created.
   * @returns
   *  the model representing the specified moment in time.
   */
  getModel(milliseconds: number): DlDateTimePickerModel {

    const startOfMonth = moment(milliseconds).startOf('month');
    const endOfMonth = moment(milliseconds).endOf('month');
    const startOfView = moment(startOfMonth).subtract(Math.abs(startOfMonth.weekday()), 'days');

    const rowNumbers = [0, 1, 2, 3, 4, 5];
    const columnNumbers = [0, 1, 2, 3, 4, 5, 6];

    const previousMonth = moment(startOfMonth).subtract(1, 'month');
    const nextMonth = moment(startOfMonth).add(1, 'month');

    const result: DlDateTimePickerModel = {
      viewName: 'day',
      viewLabel: startOfMonth.format('MMM YYYY'),
      activeDate: moment(milliseconds).startOf('day').valueOf(),
      leftButton: {
        value: previousMonth.valueOf(),
        ariaLabel: `Go to ${previousMonth.format('MMM YYYY')}`,
        classes: {},
      },
      upButton: {
        value: startOfMonth.valueOf(),
        ariaLabel: `Go to month view`,
        classes: {},
      },
      rightButton: {
        value: nextMonth.valueOf(),
        ariaLabel: `Go to ${nextMonth.format('MMM YYYY')}`,
        classes: {},
      },
      rowLabels: columnNumbers.map((column) => moment().weekday(column).format('dd')),
      rows: rowNumbers.map(rowOfDays)
    };

    result.leftButton.classes[`${result.leftButton.value}`] = true;
    result.rightButton.classes[`${result.rightButton.value}`] = true;

    return result;

    function rowOfDays(rowNumber) {
      const currentMoment = moment();
      const cells = columnNumbers.map((columnNumber) => {
        const dayMoment = moment(startOfView).add((rowNumber * columnNumbers.length) + columnNumber, 'days');
        return {
          display: dayMoment.format('D'),
          ariaLabel: dayMoment.format('ll'),
          value: dayMoment.valueOf(),
          classes: {
            past: dayMoment.isBefore(startOfMonth),
            future: dayMoment.isAfter(endOfMonth),
            today: dayMoment.isSame(currentMoment, 'day'),
          }
        };
      });
      return {cells};
    }
  }

  /**
   * Move the active `day` one row `down` from the specified moment in time.
   *
   * Moving `down` can result in the `active` day being part of a different month than
   * the specified `fromMilliseconds`, in this case the month represented by the model
   * will change to show the correct hour.
   *
   * @param fromMilliseconds
   *  the moment in time from which the next `day` model `down` will be constructed.
   * @returns
   *  model containing an `active` `day` one row `down` from the specified moment in time.
   */
  goDown(fromMilliseconds: number): DlDateTimePickerModel {
    return this.getModel(moment(fromMilliseconds).add(7, 'days').valueOf());
  }

  /**
   * Move the active `day` one row `up` from the specified moment in time.
   *
   * Moving `up` can result in the `active` day being part of a different month than
   * the specified `fromMilliseconds`, in this case the month represented by the model
   * will change to show the correct hour.
   *
   * @param fromMilliseconds
   *  the moment in time from which the next `day` model `up` will be constructed.
   * @returns
   *  model containing an `active` `day` one row `up` from the specified moment in time.
   */
  goUp(fromMilliseconds: number): DlDateTimePickerModel {
    return this.getModel(moment(fromMilliseconds).subtract(7, 'days').valueOf());
  }

  /**
   * Move the `active` day one cell `left` in the current `day` view.
   *
   * Moving `left` can result in the `active` day being part of a different month than
   * the specified `fromMilliseconds`, in this case the month represented by the model
   * will change to show the correct year.
   *
   * @param fromMilliseconds
   *  the moment in time from which the `day` model to the `left` will be constructed.
   * @returns
   *  model containing an `active` `day` one cell to the `left` of the specified moment in time.
   */
  goLeft(fromMilliseconds: number): DlDateTimePickerModel {
    return this.getModel(moment(fromMilliseconds).subtract(1, 'day').valueOf());
  }

  /**
   * Move the `active` day one cell `right` in the current `day` view.
   *
   * Moving `right` can result in the `active` day being part of a different month than
   * the specified `fromMilliseconds`, in this case the month represented by the model
   * will change to show the correct year.
   *
   * @param fromMilliseconds
   *  the moment in time from which the `day` model to the `right` will be constructed.
   * @returns
   *  model containing an `active` `day` one cell to the `right` of the specified moment in time.
   */
  goRight(fromMilliseconds: number): DlDateTimePickerModel {
    return this.getModel(moment(fromMilliseconds).add(1, 'day').valueOf());
  }

  /**
   * Move the active `day` one month `down` from the specified moment in time.
   *
   * Paging `down` will result in the `active` day being part of a different month than
   * the specified `fromMilliseconds`. As a result, the month represented by the model
   * will change to show the correct year.
   *
   * @param fromMilliseconds
   *  the moment in time from which the next `day` model page `down` will be constructed.
   * @returns
   *  model containing an `active` `day` one month `down` from the specified moment in time.
   */
  pageDown(fromMilliseconds: number): DlDateTimePickerModel {
    return this.getModel(moment(fromMilliseconds).add(1, 'month').valueOf());
  }

  /**
   * Move the active `day` one month `up` from the specified moment in time.
   *
   * Paging `up` will result in the `active` day being part of a different month than
   * the specified `fromMilliseconds`. As a result, the month represented by the model
   * will change to show the correct year.
   *
   * @param fromMilliseconds
   *  the moment in time from which the next `day` model page `up` will be constructed.
   * @returns
   *  model containing an `active` `day` one month `up` from the specified moment in time.
   */
  pageUp(fromMilliseconds: number): DlDateTimePickerModel {
    return this.getModel(moment(fromMilliseconds).subtract(1, 'month').valueOf());
  }


  /**
   * Move the `active` `day` to the last day of the month.
   *
   * The view or time range will not change unless the `fromMilliseconds` value
   * is in a different day than the displayed decade.
   *
   * @param fromMilliseconds
   *  the moment in time from which the last day of the month will be calculated.
   * @returns
   *  a model with the last cell in the view as the active `day`.
   */
  goEnd(fromMilliseconds: number): DlDateTimePickerModel {
    return this.getModel(moment(fromMilliseconds)
      .endOf('month').startOf('day').valueOf());
  }

  /**
   * Move the `active` `day` to the first day of the month.
   *
   * The view or time range will not change unless the `fromMilliseconds` value
   * is in a different day than the displayed decade.
   *
   * @param fromMilliseconds
   *  the moment in time from which the first day of the month will be calculated.
   * @returns
   *  a model with the first cell in the view as the active `day`.
   */
  goHome(fromMilliseconds: number): DlDateTimePickerModel {
    return this.getModel(moment(fromMilliseconds).startOf('month').valueOf());
  }
}
