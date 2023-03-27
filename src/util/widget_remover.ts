export function WidgetRemover(code) {
  var firstLine = code.trim().split("(")[0];
  var propertyName = "";
  if (firstLine.indexOf(":") > -1) {
    propertyName = firstLine.split(":")[0].trim();
  }

  let startIndex = code.indexOf("(");
  let endIndex = code.lastIndexOf(")");

  let newCode = code.substring(startIndex + 1, endIndex).trim();
  // let kodeBaru = kodeLama.replace(/^\w+\(.*child:/g, "child: ");

  var arr = newCode.split("\n");
  var childOrChildrenIndex = -1;
  for (var i = 0; i < arr.length; i++) {
    var line = arr[i];
    var key = line.split(":")[0].trim();

    var childProperties = ["child", "children"];
    var containsKey = childProperties.indexOf(key) > -1;

    console.log(`${containsKey ? "v" : ""} ${line}`);

    if (containsKey) {
      childOrChildrenIndex = i;
      break;
    }
  }

  newCode = arr.slice(childOrChildrenIndex).join("\n");

  console.log("XXXXXXXXXXXXxx");
  console.log(newCode);

  console.log("-------------------");
  console.log("-------------------");

  if (newCode.split("(")[0].indexOf(":") > -1) {
    var arr = newCode.split(":");
    var ind = arr[0];
    arr.shift();
    newCode = arr.join(":");
  }

  if (propertyName.length > 0) {
    newCode = `${newCode}`;
  }
  return newCode;
}
