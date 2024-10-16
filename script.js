let transactionListEl = document
    .getElementsByClassName("transaction-list-el")[0]
    .cloneNode(true);

const form = document.getElementById("transaction-form");
const saveTransactionBtn = document.getElementsByClassName(
    "save-transaction-btn"
)[0];

//prevent page refresh on button click
saveTransactionBtn.addEventListener("click", (event) => {
    return event.preventDefault();
});

console.log(transactionListEl);
console.log(document.getElementsByClassName("price-field"));

console.log("rand", localStorage.getItem("drand"));

const makeCSVData = (data) => {
    //accepts an array of objects, with each object corresponding to a transaction
    //validate data
    typeof data != "array" ? new Error("Invalid data input") : "";

    const csvArr = [];

    csvArr.push(Object.keys(data[0]).join(","));

    csvArr.push(data.forEach((row) => Object.values(row)));
};

saveTransactionBtn.addEventListener("click", (event) => {
    const transactionArr = [];

    const date = Date.now();
    const sellerName = document.getElementsByClassName("seller-name")[0].value;
    const customerName =
        document.getElementsByClassName("customer-name")[0].value;
    const medium = document.getElementsByClassName("medium")[0].value;

    console.log(
        "node list",
        document.getElementsByClassName("transaction-list")[0].children
    );

    Array.from(
        document.getElementsByClassName("transaction-list")[0].children
    ).forEach((transaction, index) => { 
        console.log(transaction);

        const productID =
            transaction.getElementsByClassName("product-select")[0].value;
        const price =
            transaction.getElementsByClassName("price-field")[0].value;
        const discount =
            transaction.getElementsByClassName("discount-field")[0].value;
        const quantity =
            transaction.getElementsByClassName("quantity-field")[0].value;

        transactionArr.push({
            date,
            sellerName,
            customerName,
            medium,
            productID,
            price,
            discount,
            quantity,
        });
    });

    console.log("transactionArr", transactionArr)

    // localStorage.setItem(
    //     "currentSaleSession",
    //     !localStorage.getItem("currentSaleSession")
    //         ? [formData]
    //         : localStorage.getItem("currentSaleSession").push(formData)
    // );
});

document
    .getElementsByClassName("price-field")[0]
    .addEventListener("click", (event) => {
        console.log(event);
        console.log(event.target);
        event.target.innerText = "";
    });

document
    .getElementsByClassName("add-transaction-btn")[0]
    .addEventListener("click", (event) => {
        document
            .getElementsByClassName("transaction-list")[0]
            .append(transactionListEl);

        //reset the cloned node
        transactionListEl = document
            .getElementsByClassName("transaction-list-el")[0]
            .cloneNode(true);
    });
