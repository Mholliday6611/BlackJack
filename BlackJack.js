var deck = ["Ah","Ad","As","Ac",
			"2h","2d","2s","2c",
			"3h","3d","3s","3c",
			"4h","4d","4s","4c",
			"5h","5d","5s","5c",
			"6h","6d","6s","6c",
			"7h","7d","7s","7c",
			"8h","8d","8s","8c",
			"9h","9d","9s","9c",
			"10h","10d","10s","10c"
			,"Jh","Jd","Js","Jc",
			"Qh","Qd","Qs","Qc",
			"Kh","Kd","Ks","Kc"]

var dealer =[]

var player = []

var wins = 0

var loses =0

var playerMoney = 500

var currentBet = 0

	function start(){
		localStorage.setItem("test","this is a test")
		deck = ["Ah","Ad","As","Ac",
			"2h","2d","2s","2c",
			"3h","3d","3s","3c",
			"4h","4d","4s","4c",
			"5h","5d","5s","5c",
			"6h","6d","6s","6c",
			"7h","7d","7s","7c",
			"8h","8d","8s","8c",
			"9h","9d","9s","9c",
			"10h","10d","10s","10c"
			,"Jh","Jd","Js","Jc",
			"Qh","Qd","Qs","Qc",
			"Kh","Kd","Ks","Kc"]

		dealer =[]

		player = []

		while (document.getElementById("playerhand").hasChildNodes()) {   
    		document.getElementById("playerhand").removeChild(document.getElementById("playerhand").firstChild);
		}
		while (document.getElementById("dealerhand").hasChildNodes()) {   
    		document.getElementById("dealerhand").removeChild(document.getElementById("dealerhand").firstChild);
		}
		var overBet = function(){
			document.getElementById("bet").value = parseInt(prompt("MAKE THE BET LOWER"))
				if(document.getElementById("bet").value > playerMoney){
				overBet()
			}
		}
		if(document.getElementById("bet").value > playerMoney){
			overBet()
		}


		document.getElementById("btnstay").disabled = false;
		document.getElementById("btnhit").disabled = false;
		document.getElementById("gameStatus").innerHTML=""

		player.push(deck.splice(parseInt(Math.random()*deck.length),1)[0])

		dealer.push(deck.splice(parseInt(Math.random()*deck.length),1)[0])

		player.push(deck.splice(parseInt(Math.random()*deck.length),1)[0])

		dealer.push(deck.splice(parseInt(Math.random()*deck.length),1)[0])

		currentBet = document.getElementById("bet").value
		console.log(currentBet)

		for(i=0;i<player.length;i++){
			var img = new Image();
			document.getElementById("playerhand").appendChild(img);
			img.src = 'images/'+player[i]+".png"
		}
		for(i=0;i<dealer.length-1;i++){
			var img = new Image();
			document.getElementById("dealerhand").appendChild(img);
			img.src = 'images/'+dealer[i]+".png"
		}
		document.getElementById("playermoney").innerHTML=playerMoney
		document.getElementById("yourbet").innerHTML = currentBet

		evaluate()
	}

	function hit(){
		player.push(deck.splice(parseInt(Math.random()*deck.length),1)[0])

		while (document.getElementById("playerhand").hasChildNodes()) {   
    		document.getElementById("playerhand").removeChild(document.getElementById("playerhand").firstChild);
		}

		for(i=0;i<player.length;i++){
			var img = new Image();
			document.getElementById("playerhand").appendChild(img);
			img.src = 'images/'+player[i]+".png"
		}

		evaluate()

	}
	function dealerHit(){
		dealer.push(deck.splice(parseInt(Math.random()*deck.length),1)[0])

		while (document.getElementById("dealerhand").hasChildNodes()) {   
    		document.getElementById("dealerhand").removeChild(document.getElementById("dealerhand").firstChild);
		}

		for(i=0;i<dealer.length;i++){
			var img = new Image();
			document.getElementById("dealerhand").appendChild(img);
			img.src = 'images/'+dealer[i]+".png"
		}

		evaluate()
	}
	function stay(){
		while (document.getElementById("dealerhand").hasChildNodes()) {   
    		document.getElementById("dealerhand").removeChild(document.getElementById("dealerhand").firstChild);
		}

		for(i=0;i<dealer.length;i++){
			var img = new Image();
			document.getElementById("dealerhand").appendChild(img);
			img.src = 'images/'+dealer[i]+".png"
		}
		var playerValue=0
		var dealerValue=0
		var addLater = false
		var getA = function(){
					var answer=prompt("ENTER 1 or 11, you have " + player)
					if(answer==1 || answer == 11){
						playerValue += parseInt(answer)
					}
					else{
						getA()
					}
				}
		var dealerA = function(){

				}
		for(i=0;i<player.length;i++){
			console.log(player)
			var y = player[i].split("")
			y.pop()
			y=y.join("")
			y=y.split(" ")
			console.log(y)
			if(y[0]=="A"){
				getA()
			}
			else if(y[0]=="K" || y[0]=="Q" || y[0]== "J"){
				playerValue += 10
			}
			else{
				playerValue += parseInt(y[0])
			}
		}

		for(i=0;i<dealer.length;i++){
			console.log(dealer)
			var y = dealer[i].split("")
			y.pop()
			y=y.join("")
			y=y.split(" ")
			console.log(y)
			if(y[0]=="A"){
				addLater += 1
			}
			else if(y[0]=="K" || y[0]=="Q" || y[0]== "J"){
				dealerValue += 10
			}
			else{
				dealerValue += parseInt(y[0])
			}
		}

		if(addLater == 1 && dealerValue <= 10){
			dealerValue += 11
			addLater = false
		}
		else if(addLater ==1 && dealerValue >10){
			dealerValue +=1
			addLater =false
		}

		if(dealerValue < 17){
			dealerHit()
		}
		if(dealerValue > 21){
			console.log('YOU WIN')
			document.getElementById("gameStatus").innerHTML="YOU WIN!"
			playerMoney += currentBet
			document.getElementById("playermoney").innerHTML =playerMoney
			wins += 1
			document.getElementById("wins").innerHTML= wins
		}

		console.log(playerValue)

		if(playerValue > dealerValue ){
			console.log('YOU WIN')
			document.getElementById("gameStatus").innerHTML="YOU WIN!"
			document.getElementById("btnstay").disabled = true;
			document.getElementById("btnhit").disabled = true;
			playerMoney += parseInt(currentBet)
			document.getElementById("playermoney").innerHTML =playerMoney
			wins += 1
			document.getElementById("wins").innerHTML= wins
		}
		else if( playerValue < dealerValue){
			console.log("YOU LOSE")
			document.getElementById("gameStatus").innerHTML="YOU LOSE!"
			document.getElementById("btnhit").disabled = true;
			document.getElementById("btnstay").disabled = true;
			playerMoney -= currentBet
			document.getElementById("playermoney").innerHTML =playerMoney
			loses += 1
			document.getElementById("loses").innerHTML = loses
		}
		else{
			document.getElementById("btnhit").disabled = true;
			document.getElementById("btnstay").disabled = true;
			console.log("DRAW")
		}

	}

	function evaluate(){
		var playerValue=0
		var dealerValue=0
		var addLater = 0
		var getA = function(){
					var answer=prompt("ENTER 1 or 11, you have " + player)
					if(answer==1 || answer == 11){
						playerValue += parseInt(answer)
					}
					else{
						getA()
					}
				}
		for(i=0;i<player.length;i++){
			console.log(player)
			var y = player[i].split("")
			y.pop()
			y=y.join("")
			y=y.split(" ")
			console.log(y)
			if(y[0]=="A"){
				getA()
			}
			else if(y[0]=="K" || y[0]=="Q" || y[0]== "J"){
				playerValue += 10
			}
			else{
				playerValue += parseInt(y[0])
			}
		}

		for(i=0;i<dealer.length;i++){
			console.log(dealer)
			var y = dealer[i].split("")
			y.pop()
			y=y.join("")
			y=y.split(" ")
			console.log(y)
			if(y[0]=="A"){
				addLater += 1
			}
			else if(y[0]=="K" || y[0]=="Q" || y[0]== "J"){
				dealerValue += 10
			}
			else{
				dealerValue += parseInt(y[0])
			}
		}

		if(addLater == 1 && dealerValue <= 10){
			dealerValue += 11
			addLater = false
		}
		else if(addLater ==1 && dealerValue >10){
			dealerValue +=1
			addLater =false
		}


		console.log(playerValue)

		if(playerValue ==21 ){
			wins += 1
			document.getElementById("wins").innerHTML= wins
			console.log('YOU WIN')
			document.getElementById("gameStatus").innerHTML="YOU WIN!"
			document.getElementById("btnstay").disabled = true;
			document.getElementById("btnhit").disabled = true;
			playerMoney += pasreInt(currentBet)
			document.getElementById("playermoney").innerHTML =playerMoney
			
		}
		else if( playerValue > 21){
			console.log("YOU LOSE")
			document.getElementById("gameStatus").innerHTML="YOU LOSE!"
			document.getElementById("btnhit").disabled = true;
			document.getElementById("btnstay").disabled = true;
			playerMoney -= currentBet
			document.getElementById("playermoney").innerHTML =playerMoney
			loses += 1
			document.getElementById("loses").innerHTML = loses
		}
		else{
			console.log("THE GAME CONTINUES")
		}

	}