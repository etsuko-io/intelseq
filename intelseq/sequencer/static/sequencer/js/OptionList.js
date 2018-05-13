function OptionList(options, cssClass, cssID, htmlParent ) {
    /*options should be an Object {}
        var options = {value:""

        }
    */
    if(typeof options !== 'object' || options === null) {
   //     throw "First argument is not an object!";
    }

    this.list = document.createElement("select");
    this.list.setAttribute("class", cssClass);
    this.list.setAttribute("id", cssID);

    for(let entry in options) {
        let optionElement = document.createElement("option");
        optionElement.setAttribute("value", entry.value);
        optionElement.textContent = entry.name;
        this.list.appendChild(optionElement);
    }

    htmlParent.appendChild(this.list);
}
