import {
  pageForDate,
  getMaxPage,
  addPages,
  datesAreEqual,
} from '@/utils/helpers';
import DateInfo from '@/utils/dateInfo';
import { isDate, isObject } from '@/utils/_';

export default class WeekPicker {
  constructor({ locale, format, parse }) {
    this._locale = locale;
    this._format = format;
    this._parse = parse;
  }

  hasValue(value) {
    return isObject(value) && isDate(value.start) && isDate(value.end);
  }

  normalize(value) {
    if (!this.hasValue(value)) return null;
    const { start, end } = new DateInfo(
      {
        start: new Date(value.start),
        end: new Date(value.end),
      },
      { locale: this._locale },
    );
    return { start, end };
  }

  format(value) {
    const nValue = this.normalize(value);
    if (!nValue) return '';
    const { start, end } = nValue;
    const startText = this._format(start);
    const endText = this._format(end);
    if (!startText || !endText) return '';
    return `${startText} - ${endText}`;
  }

  parse(text) {
    let start;
    let end;
    const dateTexts = text.split('-').map(s => s.trim());
    if (dateTexts.length >= 2) {
      start = this._parse(dateTexts[0]);
      end = this._parse(dateTexts[1]);
    }
    return start && end ? this.normalize({ start, end }) : null;
  }

  filterDisabled({ value, isRequired, disabled, fallbackValue }) {
    let newValue = isRequired ? fallbackValue : null;
    if (
      this.hasValue(value) &&
      (!disabled || !disabled.intersectsDate(value))
    ) {
      newValue = value;
    }
    return newValue;
  }

  valuesAreEqual(a, b) {
    const aHasValue = this.hasValue(a);
    const bHasValue = this.hasValue(b);
    if (!aHasValue && !bHasValue) return true;
    if (aHasValue !== bHasValue) return false;
    return datesAreEqual(a.start, b.start) && datesAreEqual(a.end, b.end);
  }

  getPageRange(value) {
    if (!this.hasValue(value)) return null;
    const from = pageForDate(value.start);
    const to = getMaxPage(pageForDate(value.end), addPages(from, 1));
    return { from, to };
  }

  handleDayClick(day, picker) {
    // Disable day selection since week based selection is handled by the
    // checkbox component.
  }

  handleDayMouseEnter(day, picker) {
    // Disable day selection since week based selection is handled by the
    // checkbox component.
  }
}
