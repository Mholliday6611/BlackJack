var deck = []
for(i=2;i<11;i++){
	deck.push(i+"h")
	deck.push(i+"d")
	deck.push(i+"c")
	deck.push(i+"s")
}
var face = ["A","J","k","Q"]
for(i=0;i<face.length;i++){
	deck.push(face[i]+"h")
	deck.push(face[i]+"d")
	deck.push(face[i]+"c")
	deck.push(face[i]+"s")
}
console.log(deck)