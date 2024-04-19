# Проектная работа. МБОУ АЛГОСОШ им. Фибоначчи

Визуализация работы алгоритмов и операций со структурами данных.

## Строка

Алгоритм разворота строки.

**Компоненты**

- Инпут для ввода значений, которые будут выводиться на странице.
- Кнопкa «Добавить», по клику на неё элементы будут выводиться на страницу.

![Начальное состояние страницы](README_static/Untitled.png)

Начальное состояние страницы

**Визуализация**

Сначала на экране должно появиться слово, буквы которого записаны в синие кружки.

![Строка в исходном виде](README_static/Untitled%201.png)

Строка в исходном виде

Двух кандидатов на сортировку подсвечиваем цветом `#D252E1`. Уже отсортированные элементы выделены `#7FE051`. 

На скриншоте показана строка, в которой поменяли местами крайние символы:

![Промежуточный этап разворота строки](README_static/Untitled%202.png)

Промежуточный этап разворота строки

## Последовательность Фибоначчи

Алгоритм отображающий `n` чисел последовательности Фибоначчи. 

**Компоненты**

- Инпут для ввода значений, которые будут выводиться на странице.
- Кнопкa «Добавить», по клику на неё элементы будут выводиться на страницу.

![Начальное состояние страницы](README_static/Untitled%203.png)

Начальное состояние страницы

**Визуализация**

Элементы отображаются постепенно. Сначала появляется один, потом второй, третий и так до `n`.

![Сгенерированная последовательность](README_static/Untitled%204.png)

Сгенерированная последовательность

---

## Сортировка массива

Алгоритмы сортировки массива выбором и пузырьком.

**Компоненты**

- RadioInput для выбора способа сортировки (выбором и пузырьком).
- Кнопка «По убыванию», по клику на неё элементы массива будут сортироваться по убыванию. Алгоритм сортировки будет тот, который указан в RadioInput.
- Кнопка «По возрастанию», по клику на неё элементы массива будут сортироваться по возрастанию. Алгоритм сортировки будет тот, который указан в RadioInput.
- Кнопка «Новый массив», по клику на неё генерируется новый массив.

![Начальное состояние страницы](README_static/Untitled%205.png)

Начальное состояние страницы

**Визуализация**

При нажатии «По убыванию» или «По возрастанию», запустится процесс сортировки в зависимости от выбранного способа: выбором или пузырьком.

В процессе анимации элементы будут менять цвета:

- `#D252E1` — элементы, которые сортируем;
- `#7FE051` — отсортированные элементы массива.

## Стек

Алгоритм удаления и добавления элементов в структуру данных 'Стек'

**Компоненты**

- Инпут для ввода значений, которые будут добавляться в стек.
- Кнопкa «Добавить», по клику на неё элементы будут добавляться в стек.
- Кнопкa «Удалить», по клику на неё элемент из top стека будет удален.
- Кнопка «Очистить», все элементы массива будут удалены.

![Начальное состояние страницы](README_static/Untitled%206.png)

Начальное состояние страницы

**Визуализация добавления** 

Если ввести в инпут значение и нажать «Добавить», на странице появится первый элемент.

Для отображения элементов стека используется компонент Circle. Внутри него будет записано введённое значение, сверху компонента — указатель на вершину стека `top`, а снизу — номер индекса элемента (для первого элемента — `0` и так далее).

При добавлении ещё одного элемента справа от предыдущего должен появиться еще один Circle с новым значением и индексом 1. И теперь уже над ним должна оказаться подпись `top`.

**Визуализация удаления**

Если нажать «Удалить», из стека удаляется только верхний элемент. Удаляемый элемент выделяется цветом `#D252E1`, надпись `top` перемещается на его левого соседа. 

По клику на кнопку «Очистить» из стека удаляются все элементы сразу.

## Очередь

Алгоритм удаления и добавления элементов в структуру данных 'Очередь'

**Компоненты**

- Инпут для ввода значений, которые будут добавляться в стек.
- Кнопкa «Добавить», по клику на неё элементы будут добавляться в стек.
- Кнопкa «Удалить», по клику на неё элемент из top стека будет удален.
- Кнопка «Очистить», все элементы массива будут удалены.
- Все Circle участвующие в очереди заведомо отображены и будут наполняться.

![Начальное состояние страницы](README_static/Untitled%207.png)

Начальное состояние страницы

**Визуализация**

Если ввести в инпут значение 2 и нажать «Добавить», элемент отобразится под индексом 0. Если это первый элемент указатели `head` и `tail` также будут присутствовать на нем.

![Очередь с одним элементом](README_static/Untitled%208.png)

Очередь с одним элементом

При добавлении новых элементов в очередь позиция tail сместится.

![Очередь из трёх элементов в момент добавления](README_static/Untitled%209.png)

Очередь из трёх элементов в момент добавления

Если нажать «Удалить», из очереди должен удалиться элемент под наименьшим индексом, a `head` будет перемещён на элемент со следущим значением индекса.

![Очередь после удаления элемента](README_static/Untitled%2010.png)

## Связный список

Алгоритм удаления и добавления элементов в структуру данных 'Связный список'

**Компоненты**

Для добавления элемента:

- инпут с плейсхолдером «Введите значение», это значение будет добавлено в список;
- кнопка «Добавить в head», по клику на которую значение из инпута должно станет новой головой списка;
- кнопка «Добавить в tail», по клику на которую значение из инпута должно станет новым хвостом списка.

Для удаления элемента:

- кнопка «Удалить из head», по клику на которую удаляется первый элемент из списка;
- кнопка «Удалить из tail», по клику на которую удаляется последний элемент из списка.

Для удаления или добавления по индексу:

- инпут с плейсхолдером «Введите индекс», это значение будет использоваться для работы со списком;
- кнопка «Добавить по индексу», по клику на которую значение из инпута с плейсхолдером «Введите значение» должно занять в списке место под номером из инпута с плейсхолдером «Введите индекс»;
- кнопка «Удалить по индексу», по клику на которую удаляется элемент в списке под номером из инпута с плейсхолдером «Введите индекс».

![Начальное состояние страницы](README_static/Untitled%2011.png)

Начальное состояние страницы

### Визуализация

**При добавлении в head** элемент появится над первым элементом вместо надписи head.

![Добавление в head](README_static/Untitled%2012.png)

Добавление в head

Затем он занимает первое место в списке и на долю секунды выделяется зелёным цветом. Теперь над новым элементом написано head, и он указывает на предыдущий head-элемент.

![Отображение нового элемента в head](README_static/Untitled%2013.png)

Отображение нового элемента в head

**При добавлении в tail** элемент должен появиться в хвосте над элементом с надписью tail. Затем он занимает последнее место в списке и на долю секунды выделяется зелёным цветом. Теперь под новым элементом написано tail.

**При добавлении элемента по индексу** должны быть заполнены два поля: «Введите значение» и «Введите индекс».

![Добавление по индексу. Поиск индекса](README_static/Untitled%2014.png)

Добавление по индексу. Поиск индекса

---
После успешного добавления 10 стоит под порядковым номером 2 и указывает на 34. Новый добавленный элемент выделите цветом. Через долю секунды уберите все цветовые выделения и лоадер на кнопке — вставка завершена.

![Добавление по индексу. Новый элемент в списке](README_static/Untitled%2015.png)

Добавление по индексу. Новый элемент в списке
---

**При удалении элемента по индексу** сначала будет выделяться цветом `#D252E1` элементы, пока не будет достигнут нужный индекс. После этого элемент будет удален.

Например, вы ввели индекс 2 и нажали «Удалить по индексу». Сначала цветом выделяется элемент с индексом 0, потом с индексом 1, и когда мы дошли до нужного индекса, то удаляем элемент из связного списка:

![Удаление элемента под индексом 2](README_static/Untitled%2016.png)

Удаление элемента под индексом 2

**При удалении элемента из tail** кружок замещает надпись tail.

![Удаление элемента из tail](README_static/Untitled%2017.png)

Удаление элемента из tail
