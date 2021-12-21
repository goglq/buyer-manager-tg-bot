(function() {
    var codePrinter = document.getElementById("code")

    var fr = new FileReader()

    fr.onload = () => {
        codePrinter.textContent = fr.result
    }

    fr.readAsText()
})()