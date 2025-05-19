import Validator from "../Validator";

const isvalidEl = document.createElement("input");
const validator = new Validator(isvalidEl);

test("getValuesArr() возвращает массив значений без скобок и пробелов", () => {
  isvalidEl.value = "[   -13, 13]";

  const arr = validator.getValuesArr();
  const result = ["-13", "13"];
  expect(arr).toEqual(result);
});