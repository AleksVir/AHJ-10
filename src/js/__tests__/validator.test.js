import Validator from "../Validator";

describe("Validator", () => {
  let inputEl;
  let validator;

  beforeEach(() => {
    inputEl = document.createElement("input");
    validator = new Validator(inputEl);
  });

  afterEach(() => {
    inputEl.remove(); // Очищаем DOM
  });

  test("getValuesArr() извлекает числа из корректного формата [a, b]", () => {
    inputEl.value = "[   -13, 13]";
    const result = validator.getValuesArr();
    expect(result).toEqual(["-13", "13"]);
  });

  test("getValuesArr() обрабатывает пробелы и табуляции внутри скобок", () => {
    inputEl.value = "[\t1,\t 2\t,\t3\t]";
    const result = validator.getValuesArr();
    expect(result).toEqual(["1", "2", "3"]);
  });

  test("getValuesArr() возвращает пустой массив для пустой строки", () => {
    inputEl.value = "";
    const result = validator.getValuesArr();
    expect(result).toEqual([]);
  });

  test("getValuesArr() игнорирует пробелы вне скобок", () => {
    inputEl.value = "  [1, 2]  ";
    const result = validator.getValuesArr();
    expect(result).toEqual(["1", "2"]);
  });
});
