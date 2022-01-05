async function printCode(file) {
  var fr = new FileReader()
  fr.onload = function () {
    document.getElementById('code').textContent = fr.result
  }
  let blob = await fetch(file).then((r) => r.blob())
  fr.readAsText(blob)
}
