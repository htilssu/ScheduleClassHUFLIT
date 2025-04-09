export function isExpired(now: Date, expiredTime: Date) {
  return now > expiredTime;
}
