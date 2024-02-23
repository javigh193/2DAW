function table_7(){
    let target = document.getElementById("table_7")
    let table = target.createElement("ul");
    for (let i = 0; i <= 10; i++) {
        let row = table.createElement("li");
        row.innerHTML(`7 x ${i} = ${7 * i}`);
    }
}