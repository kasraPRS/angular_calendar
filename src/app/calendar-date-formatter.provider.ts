import {
    CalendarAngularDateFormatter, CalendarDateFormatter,
    DateFormatterParams, getWeekViewPeriod
} from 'angular-calendar';
import { Injectable } from '@angular/core';
import * as moment from 'jalali-moment';
import { InjectionToken } from '@angular/core';
export const MOMENT: InjectionToken<string> = new InjectionToken('Moment');
@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {
    public monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
        return moment(date).locale(locale).format('dddd'); // use short week days
    }

    public monthViewDayNumber({ date, locale }: DateFormatterParams): string {
        return moment(date).locale(locale).format('jD');
    }

    public monthViewTitle({ date, locale }: DateFormatterParams): string {
        return moment(date).locale(locale).format('jMMMM jYYYY');
    }

    public weekViewColumnHeader({ date, locale }: DateFormatterParams): string {
        return moment(date).locale(locale).format('dddd');
    }

    public weekViewHour({ date, locale }: DateFormatterParams): string {
        return moment(date).locale(locale).format('ha');
    }

    public weekViewTitle({
        date,
        locale,
        weekStartsOn,
        excludeDays,
        daysInWeek,
    }: DateFormatterParams): string {

        const { viewStart, viewEnd } = getWeekViewPeriod(
            this.dateAdapter,
            date,
            weekStartsOn,
            excludeDays,
            daysInWeek
        );
        const format = (dateToFormat: Date, showYear: boolean) =>
            moment(dateToFormat)
                .locale(locale)
                .format('jMMM jD' + (showYear ? ', jYYYY' : ''));
        return `${format(
            viewStart,
            viewStart.getUTCFullYear() !== viewEnd.getUTCFullYear()
        )} - ${format(viewEnd, true)}`;
    }

    /**
     * The time formatting down the left hand side of the day view
     */
    public dayViewHour({ date, locale }: DateFormatterParams): string {
        return moment(date).locale(locale).format('ha');
    }

    /**
     * The day view title
     */
    public dayViewTitle({ date, locale }: DateFormatterParams): string {
        return moment(date).locale(locale).format('jdddd, jD jMMMM, jYYYY');
    }

}


// ---------------

