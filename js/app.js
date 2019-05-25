function pageReset() {
    if (confirm("Do you want to reset the form?")) {
        location.reload();
    }
}

function setTotal() {
    let tableRows = document.querySelectorAll("table tbody#field tr").length;
    let subTotal = 0;
    for (let x = 0; x < tableRows; x++) {
        let quantity = parseInt(document.getElementById("quantity-" + x).value);
        let price = parseInt(document.getElementById("price-" + x).value);
        let total = 0;
        if (document.getElementById("quantity-" + x).value == "" || document.getElementById("price-" + x).value == "") {
            document.getElementById("total-" + x).value = 0;
        } else {
            total = document.getElementById("total-" + x).value = quantity * price;
        }
        subTotal += total;
    }
    document.getElementById("sub-total").value = subTotal;
    document.getElementById("pure-total").value = subTotal;
}

function setPureTotal() {
    let subTotal = document.getElementById("sub-total").value;
    let discount = document.getElementById("discount").value;
    let pTotal = document.getElementById("pure-total").value = subTotal - discount;
    
    let tax = document.getElementById("tax").value;
    if (tax != 0) {
        let taxValue = (pTotal * tax) / 100;
        let pureTotal = parseInt(document.getElementById("pure-total").value);
        document.getElementById("pure-total").value = pureTotal + taxValue;
    }
}

$(document).ready(function () {
    let x = parseInt(document.getElementById("counter").value);
    $("#add").click(function () {
        let x = parseInt(document.getElementById("counter").value);
        $("#field").append(
            `<tr id="row-${x}">
                <td><input type="text" id="product-${x}" class="form-control" name="product[]"></td><td><input type="text" id="unit-${x}" class="form-control" name="unit[]"</td>
                <td><input type="number" id="quantity-${x}" class="form-control" name="qtt[]" oninput="setTotal();setPureTotal()" min="0"></td>
                <td><input type="number" id="price-${x}" class="form-control" name="price[]" oninput="setTotal();setPureTotal()"></td>
                <td><input type="text" id="total-${x}" class="form-control" name="total[]" value="0" disabled="disabled"></td>
                <td><button type="button" id="${x}" class="btn btn-danger remove"><i class="fa fa-trash"></i></button></td>
            </tr>`
        );
        x++;
        document.getElementById("counter").value = x;
    });

    $(document).on('click', '.remove', function () {
        let buttonId = $(this).attr("id");
        $("#row-" + buttonId).remove();
        
        // Resets ids
        let rowsLength = $("table tbody#field tr").length;
        let x = 1;
        for (x = 1; x < rowsLength; x++) {
            // Sets row id: row-n
            $("tbody tr")[x].id = 'row-' + x;
            $("tbody tr#row-" + x + " td input")[0].id = 'product-' + x;
            $("tbody tr#row-" + x + " td input")[1].id = 'unit-' + x;
            $("tbody tr#row-" + x + " td input")[2].id = 'quantity-' + x;
            $("tbody tr#row-" + x + " td input")[3].id = 'price-' + x;
            $("tbody tr#row-" + x + " td input")[4].id = 'total-' + x;
            $("tbody tr td button")[x].id = x;
            document.getElementById("counter").value = x;
        }
        document.getElementById("counter").value = x;
        setTotal();
        setPureTotal();
    });
});