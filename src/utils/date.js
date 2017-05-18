import { pluralize } from 'utils/pluralize';

export const getTimeAgoFormatter = language => ({
  formatter: (value, unit, suffix, time) => {
    const now = Date.now();

    switch (unit) {
      case 'second':
        unit = pluralize(value, { ru: ['секунду', 'секунды', 'секунд'], en: ['second', 'seconds'] });
        break;
      case 'minute':
        unit = pluralize(value, { ru: ['минуту', 'минуты', 'минут'], en: ['minute', 'minutes'] });
        break;
      case 'hour':
        unit = pluralize(value, { ru: ['час', 'часа', 'часов'], en: ['hour', 'hours'] });
        break;
      case 'day':
        unit = pluralize(value, { ru: ['день', 'дня', 'дней'], en: ['day', 'days'] });
        break;
      case 'week':
        unit = pluralize(value, { ru: ['неделя', 'недели', 'недель'], en: ['week', 'weeks'] });
        break;
      case 'month':
        unit = pluralize(value, { ru: ['месяц', 'месяца', 'месяцев'], en: ['month', 'months'] });
        break;
      case 'year':
        unit = pluralize(value, { ru: ['год', 'года', 'лет'], en: ['year', 'years'] });
        break;
    }

    if (now - time >= 60000) {
      if (language === 'ru') {
        return `${value} ${unit} назад`;
      } else return `${value} ${unit} ${suffix}`;
    } else {
      return language === 'ru' ? 'только что' : 'now';
    }
  },
});
