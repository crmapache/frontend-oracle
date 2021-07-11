/**
 * Тротлинг
 * Дебоунс
 * Как определяется сложность алгоритмов?
 * Что такое стек вызова?
 * Что такое область видимости ( scope )?
 * Что такое лексическое окружение ( Lexical Environment )?
 * Какие основыне принципы ООП вы знаете?
 * Что вы знаете о принципах SOLID?
 * Что такое чистые функции ( Pure Function ) в JavaScript? https://habr.com/ru/post/437512/
 */

const test = function (nums) {
  if (nums.length < 1) {
    return nums;
  }

  let j;

  for (let i = 0; i < nums.length; i++) {
    if (j === nums[i]) {
      nums.splice(i, 1);
      i--;
    } else {
      j = nums[i];
    }
  }

  return nums;
};

console.log(test([0,0,1,1,1,2,2,3,3,4]));
