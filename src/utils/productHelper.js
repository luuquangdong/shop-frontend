function splitSizeAndQuantity(txt) {
  const pairs = txt.split(/ *, */);
  const result = [];
  for (const pair of pairs) {
    const obj = {};
    const sq = pair.split(/ *- */);
    obj.size = parseInt(sq[0]);
    obj.quantity = parseInt(sq[1]);
    result.push(obj);
  }
  return result;
}

export { splitSizeAndQuantity };
