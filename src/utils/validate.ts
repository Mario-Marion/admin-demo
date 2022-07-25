/**
 * @description 判断是否为空,空对象，数组都为 true
 */
export function validatenull(val: any): boolean {
  if (val instanceof Date || typeof val === 'boolean' || typeof val === 'number') return false;

  if (val instanceof Array) {
    if (val.length === 0) return true;
  } else if (val instanceof Object) {
    for (var o in val) {
      return false;
    }
    return true;
  } else {
    if (
      val === 'null' ||
      val == null ||
      val === 'undefined' ||
      val === undefined ||
      val === ''
    ) {
      return true;
    }
    return false;
  }
  return false;
}

