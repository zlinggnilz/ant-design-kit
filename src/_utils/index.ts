/** 表单数据 trim */
export const formTrim = (initial = {}) => {
  const handle = (data: any) => {
    if (!data) return data;
    if (typeof data === 'string') {
      data = data.trim();
    } else if (Array.isArray(data)) {
      data.forEach((v, index) => {
        data[index] = handle(v);
      });
    } else if (typeof data === 'object') {
      return formTrim(data);
    }
    return data;
  };
  const itera = (obj: any) => {
    Object.keys(obj).forEach(key => {
      obj[key] = handle(obj[key]);
    });
    return obj;
  };

  return itera(initial);
};

export const urlReg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function flattenData(data: any, childrenColumnName: string) {
  if (!Array.isArray(data)) {
    return [];
  }
  let list: Array<any> = [];
  (data || []).forEach(record => {
    list.push(record);

    if (record && typeof record === 'object' && childrenColumnName in record) {
      list = [
        ...list,
        ...flattenData(record[childrenColumnName], childrenColumnName),
      ];
    }
  });

  return list;
}
