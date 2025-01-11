document.getElementById('saveButton').addEventListener('click', saveAccount);

function saveAccount() {
    const accountDataInput = document.getElementById('accountData');
    const accountData = accountDataInput.value;
    if (!accountData) return;
    
    const purchaseDate = new Date().toLocaleDateString();
    const expirationDate = calculateExpirationDate(new Date());

    const table = document.getElementById('accountsTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    const cell6 = newRow.insertCell(5);

    cell1.innerText = accountData;
    cell2.innerText = purchaseDate;
    cell3.innerText = 'Disponible';

    const buyerInput = document.createElement('input');
    buyerInput.type = 'text';
    buyerInput.placeholder = 'Correo del comprador';
    buyerInput.addEventListener('change', updateStatus);
    cell4.appendChild(buyerInput);

    cell5.innerText = expirationDate;

    const copyButton = document.createElement('button');
    copyButton.innerText = 'Copiar';
    copyButton.addEventListener('click', () => copyData(accountData, purchaseDate, expirationDate));
    cell6.appendChild(copyButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Eliminar';
    deleteButton.addEventListener('click', () => deleteRow(newRow));
    cell6.appendChild(deleteButton);

    accountDataInput.value = '';
}

function calculateExpirationDate(purchaseDate) {
    const expirationDate = new Date(purchaseDate);
    expirationDate.setDate(expirationDate.getDate() + 30);
    return expirationDate.toLocaleDateString();
}

function updateStatus(event) {
    const email = event.target.value;
    const row = event.target.parentElement.parentElement;
    const statusCell = row.cells[2];
    const purchaseDateCell = row.cells[1];
    const expirationDateCell = row.cells[4];

    if (validateEmail(email)) {
        statusCell.innerText = 'Vendido';
        const purchaseDate = new Date(purchaseDateCell.innerText);
        expirationDateCell.innerText = calculateExpirationDate(purchaseDate);
    } else {
        statusCell.innerText = 'Disponible';
    }
}

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function copyData(accountData, purchaseDate, expirationDate) {
    const data = `Datos de la cuenta: ${accountData}\nFecha de compra: ${purchaseDate}\nFecha de vencimiento: ${expirationDate}`;
    navigator.clipboard.writeText(data).then(() => {
        alert('Datos copiados al portapapeles');
    });
}

function deleteRow(row) {
    row.remove();
}

document.getElementById('filterInput').addEventListener('input', filterTable);

function filterTable() {
    const filter = document.getElementById('filterInput').value.toLowerCase();
    const rows = document.getElementById('accountsTable').getElementsByTagName('tbody')[0].rows;

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].cells;
        let match = false;

        for (let j = 0; j < cells.length; j++) {
            if (cells[j].innerText.toLowerCase().includes(filter)) {
                match = true;
                break;
            }
        }

        rows[i].style.display = match ? '' : 'none';
    }
}