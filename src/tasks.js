/**
 * Как определяется сложность алгоритмов?
 * ScopeChain https://habr.com/ru/post/468943/
 * Какие основыне принципы ООП вы знаете?
 * Что вы знаете о принципах SOLID?
 * Что такое замыкание в в JavaScript?
 * Что такое Web Workers и как они работают?
 * Какие client-side хранилища вы знаете? https://developer.mozilla.org/ru/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage
 * Что такое Event Loop?
 * Что такое Shadow DOM?
 * Что такое Virtual DOM в React?
 * Что и для чего можно передать во второй аргумент функции this.setState? https://upmostly.com/tutorials/how-to-use-the-setstate-callback-in-react
 * Как повторить функционал второго аргумента this.setState из классового компонента для хука useState? https://stackoverflow.com/questions/56247433/how-to-use-setstate-callback-on-react-hooks
 * Что такое всплытие событий ( Bubbling ) в JavaScript?
 * Что такое поднятие переменных ( Hoisting ) в JavaScript?
 * Расскажите про паттерн Dependency Injection
 */

function test(s, t) {}

console.log(test('anagram', 'nagaram'));

function throttle(func, ms) {
  
  let isThrottled = false,
    savedArgs,
    savedThis;
  
  function wrapper() {
    
    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    
    func.apply(this, arguments); // (1)
    
    isThrottled = true;
    
    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }
  
  return wrapper;
}
