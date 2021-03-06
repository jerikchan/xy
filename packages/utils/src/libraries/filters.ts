// 隐藏 身份证 中间数字
const hideIDMiddle = function(val) {
  val = val.toString();
  if (val.length < 7) {
    return;
  }
  return `${val.substring(0, 3)}****${val.substring(val.length - 3)}`;
};
// 隐藏 手机号 4位中间数字
const hidePhoneMiddle = function(val) {
  val = val.toString();
  if (val.length < 7) {
    return;
  }
  return val.replace(/(\d{3})\d{4}(\d*)/, '$1****$2');
};
// 隐藏 邮箱 中间数字 保留首位2位 结尾3位
const hideMailMiddle = function(val) {
  if (val.length < 5) {
    return;
  }
  return val.replace(/^(\w{2}).+?@.+?(\.\w{2,3})$/, (all, pre, aft) => {
    return `${pre}***@***${aft}`;
  });
};

export { hideIDMiddle, hidePhoneMiddle, hideMailMiddle };
