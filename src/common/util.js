export default function clamp(x, fromX, toX) {
  /* eslint-disable */
  if (x < fromX) x = fromX;
  if (x > toX) x = toX;

  return x;
}
