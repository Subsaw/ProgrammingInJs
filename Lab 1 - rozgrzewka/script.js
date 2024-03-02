const countInputs = () => {
  const inputFields = document.getElementsByClassName("input-number");
  let sum = 0;
  let values = [];

  for (var i = 0; i < inputFields.length; i++) {
    var value = parseFloat(inputFields[i].value);
    if (!isNaN(value)) {
      sum += value;
      values.push(value);
    }
  }

  var average = sum / values.length;
  var min = Math.min(...values);
  var max = Math.max(...values);

  document.getElementById("suma").innerHTML = sum;
  document.getElementById("srednia").innerHTML = isNaN(average) ? 0 : average;
  document.getElementById("min").innerHTML = min;
  document.getElementById("max").innerHTML = max;
};

const addInput = () => {
  var inputsContainer = document.getElementById("inputs-container");
  var inputRow = document.createElement("div");
  inputRow.classList.add("count-row");
  inputRow.innerHTML = `
        <input type="text" class="input-number" onkeyup="countInputs()">
        <button onclick="removeInput(this)">Delete</button>
    `;
  inputsContainer.appendChild(inputRow);
};

const removeInput = (button) => {
  var inputRow = button.parentElement;
  inputRow.remove();
  countInputs();
};
