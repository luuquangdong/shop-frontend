function number2VNCurrency(number) {
  if (!number) return "";
  if (typeof number === "number") number = number.toString();
  return `${number.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}₫`;
}

export { number2VNCurrency };
