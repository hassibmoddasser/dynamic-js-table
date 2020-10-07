// UI variables
const subTotalUI = document.getElementById('sub-total');
const discountUI = document.getElementById('discount');
const taxUI = document.getElementById('tax');
const grandTotalUI = document.getElementById('grand-total');

const appendAreaUI = document.querySelector('.append-area');
const addButtonUI = document.getElementById('add');

// Append rows to table
addButtonUI.addEventListener('click', () => {
  let counter = parseInt(document.getElementById('counter').value);
  appendAreaUI.insertAdjacentHTML('beforeend', `
    <tr id="row-${counter}">
      <td><button type="button" id="${counter}" class="btn btn-danger btn-sm remove"><i id="${counter}" class="fa fa-trash"></i></button></td>
      <td><input type="text" id="product-${counter}" class="form-control form-control-sm" name="product[]"></td><td><input type="text" id="unit-${counter}" class="form-control form-control-sm" name="unit[]"</td>
      <td><input type="number" id="quantity-${counter}" class="form-control form-control-sm" name="qtt[]" oninput="setTotal();setGrandTotal();" min="0"></td>
      <td><input type="number" id="price-${counter}" class="form-control form-control-sm" name="price[]" oninput="setTotal();setGrandTotal();"></td>
      <td><input type="text" id="total-${counter}" class="form-control form-control-sm" name="total[]" value="0" disabled="disabled"></td>
    </tr>
  `);

  // Update rows counter value
  counter++;
  document.getElementById('counter').value = counter;
});

// Delete table rows
document.addEventListener('click', (e) => {
  let elClassList = e.target.classList;
  if (elClassList.contains('fa-trash') || elClassList.contains('remove')) {
    let removeButtonID = e.target.id;
    document.getElementById('row-' + removeButtonID).remove();

    let tableRows = document.querySelectorAll('.append-area tr').length;
    for (let i = 0; i < tableRows; i++) {
      document.querySelectorAll('.append-area tr')[i].id = 'row-' + i;
      document.querySelectorAll('.append-area tr#row-' + i + ' td input')[0].id = 'product-' + i;
      document.querySelectorAll('.append-area tr#row-' + i + ' td input')[1].id = 'unit-' + i;
      document.querySelectorAll('.append-area tr#row-' + i + ' td input')[2].id = 'quantity-' + i;
      document.querySelectorAll('.append-area tr#row-' + i + ' td input')[3].id = 'price-' + i;
      document.querySelectorAll('.append-area tr#row-' + i + ' td input')[4].id = 'total-' + i;

      document.querySelectorAll('.append-area tr td button')[i].id = i;
      document.querySelectorAll('.append-area tr td button i')[i].id = i;
    }

    document.getElementById('counter').value = tableRows;
    setTotal();
    setGrandTotal();
  }
});

// Form RESET
function pageReset() {
  if (confirm("Do you want to reset the form?")) {
    location.reload();
  }
}

// Calculate row TOTAL
function setTotal() {
  let tableRows = document.querySelectorAll('tbody.append-area tr').length;

  let subTotal = 0;
  for (let i = 0; i < tableRows; i++) {
    let quantity = parseInt(document.getElementById("quantity-" + i).value);
    let price = parseInt(document.getElementById("price-" + i).value);

    let rowTotal = 0;
    if (document.getElementById("quantity-" + i).value == "" || document.getElementById("price-" + i).value == "") {
      document.getElementById("total-" + i).value = 0;
    } else {
      rowTotal = document.getElementById("total-" + i).value = quantity * price;
    }
    subTotal += rowTotal;
  }

  // Set TOTAL & GRAND TOTAL values
  subTotalUI.value = subTotal;
  grandTotalUI.value = subTotal;
}

// Calculate DISCOUNT & TAX
function setGrandTotal() {
  let subTotal = subTotalUI.value;
  let discount = discountUI.value;
  let tax = taxUI.value;

  grandTotalUI.value = subTotal - discount;
  if (tax != 0) {
    let taxValue = (grandTotalUI.value * tax) / 100;
    grandTotalUI.value = parseInt(grandTotalUI.value) + taxValue;
  }
}