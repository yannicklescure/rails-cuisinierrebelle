export const cookiesToObject = (str) => {
  str = str.split('; ');
  var result = {};
  for (var i = 0; i < str.length; i++) {
    var cur = str[i].split('=');
    result[cur[0]] = cur[1];
  }
  return result;
}
