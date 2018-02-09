import {DlDateTimePickerModel} from './dl-date-time-picker-model';

/**
 * Implemented by classes that provide models for the date/time picker.
 *
 * The terms `left`, `right`, `up`, and `down` are used in place of
 * `previous`, `next`, etc so that the model provider is UI centric
 * rather than time direction centric.
 *
 * For example, another calendar implementations may render `future` dates to the `left`.
 *
 * Having the api method `goLeft` may move the `active` cell to a
 * future or past value depending on the calendar implementation,
 * but both operations are performed with the `left-arrow` key.
 */
export interface DlModelProvider {

  /**
   * Returns the model for the specified moment in time.
   * @param milliseconds
   *  the moment in time the model should represent.
   * @returns
   *  the model representing the specified moment in time.
   */
  getModel(milliseconds: number): DlDateTimePickerModel;

  /**
   * Move the `active` cell one cell down from the specified moment in time.
   *
   * The next cell `down` might be in a different time range than the currently
   * displayed view. In this case, the model time range will include the new active cell.
   *
   * What happens is determined entirely by the implementation and it
   * varies from view-to-view.
   *
   * This is used for keyboard navigation.
   *
   * @param fromMilliseconds
   *  the moment in time from which the next model `down` will be constructed.
   * @returns
   *  the model representing the next model `down` from the specified moment in time.
   */
  goDown(fromMilliseconds: number): DlDateTimePickerModel;

  /**
   * Move the `active` cell to the `last` cell from the specified moment in time.
   *
   * Typically the view or time range will not change. However, changes to the view
   * or time rage are not specifically prohibited.
   *
   * What happens is determined entirely by the implementation and it
   * varies from view-to-view.
   *
   * This is used for keyboard navigation.
   *
   * @param fromMilliseconds
   *  the moment in time from which the `last` active cell will be calculated.
   * @returns
   *  a model with the `last` cell in the view as the active cell.
   */
  goEnd(fromMilliseconds: number): DlDateTimePickerModel;

  /**
   * Move the `active` cell to the `first` cell from the specified moment in time.
   *
   * Typically the view or time range will not change. However, changes to the view
   * or time rage are not specifically prohibited.
   *
   * What happens is determined entirely by the implementation and it
   * varies from view-to-view.
   *
   * This is used for keyboard navigation.
   *
   * @param fromMilliseconds
   *  the moment in time from which the `first` active cell will be calculated.
   * @returns
   *  a model with the `first` cell in the view as the active cell.
   */
  goHome(fromMilliseconds: number): DlDateTimePickerModel;

  /**
   * Move the `active` cell one cell to the `left` from the specified moment in time.
   *
   * The next cell `left` might be in a different time range than the currently
   * displayed view. In this case, the model time range will include the new active cell.
   *
   * What happens is determined entirely by the implementation and it
   * varies from view-to-view.
   *
   * This is used for keyboard navigation.
   *
   * @param fromMilliseconds
   *  the moment in time from which the next model `left` will be constructed.
   * @returns
   *  the model representing the next model `left` from the specified moment in time.
   */
  goLeft(fromMilliseconds: number): DlDateTimePickerModel;

  /**
   * Move the `active` cell one cell to the `right` from the specified moment in time.
   *
   * The next cell `right` might be in a different time range than the currently
   * displayed view. In this case, the model time range will include the new active cell.
   *
   * What happens is determined entirely by the implementation and it
   * varies from view-to-view.
   *
   * This is used for keyboard navigation.
   *
   * @param fromMilliseconds
   *  the moment in time from which the next model `right` will be constructed.
   * @returns
   *  the model representing the next model `right` from the specified moment in time.
   */
  goRight(fromMilliseconds: number): DlDateTimePickerModel;

  /**
   * Move the `active` cell one cell `up` from the specified moment in time.
   *
   * The next cell `up` might be in a different time range than the currently
   * displayed view. In this case, the model time range will include the new active cell.
   *
   * What happens is determined entirely by the implementation and it
   * varies from view-to-view.
   *
   * This is used for keyboard navigation.
   *
   * @param fromMilliseconds
   *  the moment in time from which the next model `up` will be constructed.
   * @returns
   *  the model representing the next model `up` from the specified moment in time.
   */
  goUp(fromMilliseconds: number): DlDateTimePickerModel;

  /**
   * Move the `active` cell one `page-down` from the specified moment in time.
   *
   * The next cell `page-down` will be in a different time range than the currently
   * displayed view and the model time range will include the new active cell.
   *
   * What happens is determined entirely by the implementation and it
   * varies from view-to-view.
   *
   * This is used for keyboard navigation.
   *
   * @param fromMilliseconds
   *  the moment in time from which the next model `page-down` will be constructed.
   * @returns
   *  the model representing the next model `page-down` from the specified moment in time.
   */
  pageDown(fromMilliseconds: number): DlDateTimePickerModel;

  /**
   * Move the `active` cell one `page-up` from the specified moment in time.
   *
   * The next cell `page-up` will be in a different time range than the currently
   * displayed view and the model time range will include the new active cell.
   *
   * What happens is determined entirely by the implementation and it
   * varies from view-to-view.
   *
   * This is used for keyboard navigation.
   *
   * @param fromMilliseconds
   *  the moment in time from which the next model `page-up` will be constructed.
   * @returns
   *  the model representing the next model `page-up` from the specified moment in time.
   */
  pageUp(fromMilliseconds: number): DlDateTimePickerModel;
}
