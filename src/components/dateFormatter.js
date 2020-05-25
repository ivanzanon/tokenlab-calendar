import {format} from 'date-fns';

export default class DateFormatter {
    
    formatDefault(date) {
        return format(date, "yyyy-MM-dd'T'hh:mm");
    }

};