import moment from "moment-timezone";
import { cacheGet, cacheSet } from "../../../cache";
/**
 * @param {string} dateLeft
 * @param {string} dateRight
 * @returns {boolean}
 */
export const isSameDay = (dateLeft, dateRight) => {
  const key = `isSameDay-${dateLeft}-${dateRight}`;
  let result = cacheGet(key);
  if (result == null) {
    result = moment(dateLeft).isSame(moment(dateRight), "day");
  }
  cacheSet(key, result);
  return result;
};

/**
 *
 * @param {string} ts
 * @returns {string}
 */
export const formatTime = (ts) => {
  const key = `formatTime-Hmm-${ts}`;
  let result = cacheGet(key);
  if (result == null) {
    result = moment(ts).format("H:mm");
  }
  cacheSet(key, result);
  return result;
};

/**
 * @param {string} closeAt
 * @param {number | Date} now
 * @returns {string}
 */
export const formatCloseAt = (closeAt, now = new Date()) => {
  if (moment(closeAt).isBefore(now)) {
    return "投票締切";
  }

  if (moment(closeAt).isAfter(moment(now).add(2, "hours"))) {
    return "投票受付中";
  }

  return `締切${moment(closeAt).diff(now, "minutes")}分前`;
};
