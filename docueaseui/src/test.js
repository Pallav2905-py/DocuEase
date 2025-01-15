var plantumlEncoder = require('plantuml-encoder')
 
var encoded = plantumlEncoder.encode('A -> B: Hello')
console.log(encoded) // SrJGjLDmibBmICt9oGS0
 
var url = 'http://www.plantuml.com/plantuml/img/' + encoded


console.log(url);

var plantumlEncoder = require('plantuml-encoder')
 
var plain = plantumlEncoder.decode('SrJGjLDmibBmICt9oGS0')
console.log(plain) // A -> B: Hello