let transactionListEl = document
    .getElementsByClassName("transaction-list-el")[0]
    .cloneNode(true);

const CURRENT_SALE_SESSION_KEY = "currentSaleSession";

const form = document.getElementById("transaction-form");
const saveTransactionBtn = document.getElementsByClassName(
    "save-transaction-btn"
)[0];

//Delete transaction product button
document
    .getElementsByClassName("delete-transaction-li-btn")[0]
    .addEventListener("click", (event) => {
        event.target.parentElement.remove();
    });

//Save CSV data

const makeCSVData = (data) => {
    //accepts an array of objects, with each object corresponding to a transaction
    //validate data
    typeof data != "array" ? new Error("Invalid data input") : "";

    const csvArr = [];

    csvArr.push(Object.keys(data[0]).join(","));

    data.forEach((row) => {
        csvArr.push(Object.values(row).join(","));
    });

    return csvArr.join("\n");
};

const saveCSVFile = (data) => {
    const csvData = makeCSVData(data);

    const blob = new Blob([csvData], { type: "text/csv" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    const dateNow = new Date();

    a.href = url;
    a.download = `sales-session-${dateNow.getHours()}:${dateNow.getMinutes()}-${dateNow.getDate()}/${dateNow.getMonth()}/${dateNow.getFullYear()}.csv`;

    a.click();
};

document
    .getElementsByClassName("save-transaction-file")[0]
    .addEventListener("click", (event) => {
        //backup
        localStorage.setItem(
            "prevSaleSession",
            localStorage.getItem(CURRENT_SALE_SESSION_KEY)
        );
        saveCSVFile(JSON.parse(localStorage.getItem(CURRENT_SALE_SESSION_KEY)));
        //reset
        localStorage.setItem(CURRENT_SALE_SESSION_KEY, "");
    });

// SAVE TRANSACTION btn

//prevent page refresh on button click
saveTransactionBtn.addEventListener("click", (event) => {
    return event.preventDefault();
});

saveTransactionBtn.addEventListener("click", (event) => {
    const transactionArr = [];

    const dateNow = new Date();

    //British/Indian Date Standards - dd/mm/yyyy
    const date = `${dateNow.getDate()}/${dateNow.getMonth()}/${dateNow.getFullYear()}`;
    const sellerName = document.getElementsByClassName("seller-name")[0].value;
    const customerName =
        document.getElementsByClassName("customer-name")[0].value;
    const medium = document.getElementsByClassName("medium")[0].value;

    if (!date || !sellerName || !customerName || !medium) {
        alert("Please input proper data");
        throw new Error("Please input valid data");
    }

    Array.from(
        document.getElementsByClassName("transaction-list")[0].children
    ).forEach((transaction, index) => {
        const productID =
            transaction.getElementsByClassName("product-select")[0].value;
        const price =
            transaction.getElementsByClassName("price-field")[0].value;
        const discount =
            transaction.getElementsByClassName("discount-field")[0].value;
        const quantity =
            transaction.getElementsByClassName("quantity-field")[0].value;

        if (!productID || price <= 0 || quantity <= 0) {
            alert("Please input proper data");
            throw new Error("Please input valid data");
        }

        transactionArr.push({
            productID,
            date,
            price,
            discount,
            quantity,
            totalCost: price * quantity - discount,
            medium,
            customerName,
            sellerName,
        });
    });

    localStorage.setItem(
        CURRENT_SALE_SESSION_KEY,
        !localStorage.getItem(CURRENT_SALE_SESSION_KEY)
            ? JSON.stringify(transactionArr)
            : JSON.stringify(
                  JSON.parse(
                      localStorage.getItem(CURRENT_SALE_SESSION_KEY)
                  ).concat(transactionArr)
              )
    );

    transactionListEl = transactionListEl.cloneNode(true);

    document.getElementsByClassName("transaction-list")[0].innerText = "";

    document
        .getElementsByClassName("transaction-list")[0]
        .appendChild(transactionListEl);

    form.reset();
});

//ADD TRANSACTION btn

document
    .getElementsByClassName("add-transaction-btn")[0]
    .addEventListener("click", (event) => {
        const newListEl = document
            .getElementsByClassName("transaction-list")[0]
            .appendChild(transactionListEl);

        console.log(newListEl)

        newListEl
            .getElementsByClassName("delete-transaction-li-btn")[0]
            .addEventListener("click", (event) => {
                event.target.parentElement.remove();
            });

        //reset the cloned node
        transactionListEl = transactionListEl.cloneNode(true);
    });
