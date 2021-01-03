// import { moment } from 'moment';
// import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
// import { getISOWeek } from 'date-fns';
// import { DatePipe } from '@angular/common';

// export class CustomDateFormatter extends CalendarDateFormatter {
//     public weekViewTitle({ date, locale }: DateFormatterParams): string {
//         const year: string = new DatePipe(locale).transform(date, 'y', locale);
//         const weekNumber: number = getISOWeek(date);

//         return `Semaine ${weekNumber} en ${year}`;
//     }
// }



import {
    CalendarAngularDateFormatter, CalendarDateFormatter,
    DateFormatterParams, getWeekViewPeriod
} from 'angular-calendar';
import { Injectable } from '@angular/core';
import * as moment from 'jalali-moment';
@Injectable()
export class CustomDateFormatter extends CalendarAngularDateFormatter {

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
        return moment(date).locale(locale).format('jdddd');
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



// import { InjectionToken, Inject, Injectable } from '@angular/core';
// import {
//     CalendarDateFormatterInterface,
//     DateAdapter, DateFormatterParams,
//     getWeekViewPeriod
// } from 'angular-calendar';


// import * as moment from 'jalali-moment';
// export const MOMENT: InjectionToken<string> = new InjectionToken('Moment');

// @Injectable()
// export class CustomDateFormatter
//     implements CalendarDateFormatterInterface {
//     /**
//      * @hidden
//      */
//     constructor(
//         @Inject(MOMENT) protected moment: any,
//         protected dateAdapter: DateAdapter
//     ) { }

//     /**
//      * The month view header week day labels
//      */
//     public monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
//         return this.moment(date).locale(locale).format('jdddd');
//     }

//     /**
//      * The month view cell day number
//      */
//     public monthViewDayNumber({ date, locale }: DateFormatterParams): string {
//         return this.moment(date).locale(locale).format('jD');
//     }

//     /**
//      * The month view title
//      */
//     public monthViewTitle({ date, locale }: DateFormatterParams): string {
//         return this.moment(date).locale(locale).format('jMMMM jYYYY');
//     }

//     /**
//      * The week view header week day labels
//      */
//     public weekViewColumnHeader({ date, locale }: DateFormatterParams): string {
//         return this.moment(date).locale(locale).format('jdddd');
//     }

//     /**
//      * The week view sub header day and month labels
//      */
//     public weekViewColumnSubHeader({
//         date,
//         locale,
//     }: DateFormatterParams): string {
//         return this.moment(date).locale(locale).format('jMMM jD');
//     }

//     /**
//      * The week view title
//      */
//     public weekViewTitle({
//         date,
//         locale,
//         weekStartsOn,
//         excludeDays,
//         daysInWeek,
//     }: DateFormatterParams): string {
//         const { viewStart, viewEnd } = getWeekViewPeriod(
//             this.dateAdapter,
//             date,
//             weekStartsOn,
//             excludeDays,
//             daysInWeek
//         );
//         const format = (dateToFormat: Date, showYear: boolean) =>
//             this.moment(dateToFormat)
//                 .locale(locale)
//                 .format('jMMM jD' + (showYear ? ', jYYYY' : ''));
//         return `${format(
//             viewStart,
//             viewStart.getUTCFullYear() !== viewEnd.getUTCFullYear()
//         )} - ${format(viewEnd, true)}`;
//     }

//     /**
//      * The time formatting down the left hand side of the week view
//      */
//     public weekViewHour({ date, locale }: DateFormatterParams): string {
//         return this.moment(date).locale(locale).format('ha');
//     }

//     /**
//      * The time formatting down the left hand side of the day view
//      */
//     public dayViewHour({ date, locale }: DateFormatterParams): string {
//         return this.moment(date).locale(locale).format('ha');
//     }

//     /**
//      * The day view title
//      */
//     public dayViewTitle({ date, locale }: DateFormatterParams): string {
//         return this.moment(date).locale(locale).format('jdddd, jD jMMMM, jYYYY');
//     }
// }
