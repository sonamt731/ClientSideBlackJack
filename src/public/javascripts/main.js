document.addEventListener('DOMContentLoaded', main);

//Card class 
class Card{
	constructor(value){
		this.value = value;
	}
}

//forming the deck
function deck(){
	const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
	const cards = [];

	for (let suit = 0; suit<4; suit++){
		for(let v = 0; v<values.length; v++){
				cards.push(new Card(values[v]));
		}
	}
	//console.log(cards.length);
	return cards;
}

//shuffle function - pass in the deck of cards 
//I found this function online as a shuffle function and I altered the code to fit my game
//Source: https://www.frankmitchell.org/2015/01/fisher-yates/
function shuffle(cards){
	for (let i = cards.length-1; i > 0; i-=1){
		const j = Math.floor(Math.random() * (i+1));
		const temp = cards[i];
		cards[i] = cards[j];
		cards[j] = temp;

	}
}

//function to reorder the deck based on user input
function reorder(cards, startValues){
	const vals = [];
	//store all of the card values into an array 
	for (let inc = 0; inc < cards.length; inc++){
		const num = cards[inc].value;
		vals.push(num);
	}
	//now we reorder 
	for (let val = 0; val < startValues.length; val++){
		const index = vals.indexOf(startValues[val].trim(), val); //from index val - handles repeat indices
		let temp = cards[val]; //store card in that position 
		cards[val] = cards[index]; //card at index which has val is moved
		cards[index] = temp;

		//now adjust the vals array 
		temp = vals[val];
		vals[val] = vals[index];
		vals[index] = temp;
	}
}

//code for the front card with value in it 
function addElement(card, divid){
	const newCard = document.createElement('div');
	newCard.setAttribute("id","card");
	const text = document.createElement('h1');
	text.textContent = card.value;
	newCard.appendChild(text);
	divid.appendChild(newCard);
}

//code for the blank card
function blankCard(divid){
	const newCard = document.createElement('div');
	newCard.setAttribute("id","blankcard");
	//const text = document.createElement('h1');
	divid.appendChild(newCard);
}

//function to calculate the total score 
function scoreCalc(cards){
	let sum = 0;
	for (let i = 0; i<cards.length; i++){
		let curr = cards[i].value;
		if(curr === 'J' || curr === 'Q' || curr === 'K'){
			curr = 10;
		}
		//handling case of Ace 
		else if (curr === 'A'){
			//we do not want the sum to exceed 21
			if((sum+=11) > 21){
				curr = 1;
			}
			else{
				curr = 11;
			}
		}
		else{
			curr = parseInt(curr);
		}
		sum +=curr;
	}
	return sum;
}

//first dealing
function initialSetUp(playerCards, computerCards){
	const divC = document.createElement('div');
	divC.setAttribute('id','compDiv');
	const cardsDivC = document.createElement('div');
	cardsDivC.setAttribute('id','cardsC');
	const h1C = document.createElement('h1');
	h1C.textContent = "Computer Cards";
	const scoreC = document.createElement('h2');
	scoreC.setAttribute('id','compScore');
	scoreC.textContent = "Computer Points = ??";
	divC.appendChild(h1C);
	divC.appendChild(scoreC);
	addElement(computerCards[0], cardsDivC);
	blankCard(cardsDivC);
	divC.appendChild(cardsDivC);
	document.body.appendChild(divC);

	const divP = document.createElement('div');
	divP.setAttribute('id','playerDiv');
	const cardsDivP = document.createElement('div');
	cardsDivP.setAttribute('id','cardsP');
	const h1P = document.createElement('h1');
	h1P.textContent = "Player Cards";
	const scoreP = document.createElement('h2');
	scoreP.setAttribute('id','playerScore');
	const currScoreP = scoreCalc(playerCards);
	scoreP.textContent = "Player Points = " + currScoreP;
	divP.appendChild(h1P);
	divP.appendChild(scoreP);
	addElement(playerCards[0], cardsDivP);
	addElement(playerCards[1], cardsDivP);
	divP.appendChild(cardsDivP);
	document.body.appendChild(divP);
}

//score update
function updateScore(cards, id){
	const toChange = document.getElementById(id);
	const newScore = scoreCalc(cards);
	if(id === 'playerScore'){
		toChange.textContent = "Player Points = " + newScore;
	}
	else{
		toChange.textContent = "Computer Points = "+newScore;
	}
}


function getWinner(playerCards, computerCards){
	const PscoreTot = scoreCalc(playerCards);
	const CscoreTot = scoreCalc(computerCards);
	const PAway21 = 21 - PscoreTot;
	const CAway21 = 21 - CscoreTot;
	let winner = "";

	//case of tie 
	if (PscoreTot > 21){
		winner = "Computer";
	}
	else if(CscoreTot > 21){
		winner = "User";
	}
	else if(PAway21 === CAway21){
		winner = "Tie";
	}
	else if(PAway21 < 0 && CAway21 < 0){
		winner = "Tie";
	}
	else if(PAway21 > CAway21){
		winner = "Computer";
	}
	else{
		winner = "User";
	}
	const winnerDiv = document.createElement('div');
	winnerDiv.setAttribute('class','winner');
	winnerDiv.textContent = "Winner: " + winner;
	document.body.appendChild(winnerDiv);
	const blank = document.getElementById('blankcard');
	const toAddCard = computerCards[1];
	const divC = document.getElementById('cardsC');
	addElement(toAddCard, divC);
	blank.remove();
}

//main code
function main(){
	const play = document.querySelector('.playBtn');
	//click event listener for submit button
	play.addEventListener('click', function(evt){
		evt.preventDefault();
		//remove the form
		let startValues = document.querySelector("#startValues").value;
		//console.log(startValues);
		this.parentElement.remove();
		const cards = deck();

		//call shuffle - so now cards stores shuffled cards
		shuffle(cards);
		
		//check to see if something was entered in the user input field 
		//if it was entered - edit the order of the deck of cards so the user entered is on top
		if(startValues!== ""){
			startValues = startValues.split(",");
			//remove white space from both sides of entry to avoid errors
			for(let t = 0; t<startValues; t++){
				startValues[t] = startValues[t].trim();
			}
			reorder(cards, startValues);
		}

		const computerCards = [];
		const playerCards = [];

		computerCards.push(cards[0]);
		playerCards.push(cards[1]);
		computerCards.push(cards[2]);
		playerCards.push(cards[3]);

		console.log(computerCards);
		console.log(playerCards);

		//remove first 4 cards from initial set up 
		cards.shift();
		cards.shift();
		cards.shift();
		cards.shift();

		//headers - set up initial deal 
		initialSetUp(playerCards, computerCards);

		//code for button
		const divButton = document.createElement('div');
		const hit = document.createElement("INPUT");
		hit.setAttribute("type","submit");
		hit.setAttribute("value", "Hit");
		hit.setAttribute("id","hit");
		divButton.appendChild(hit);
		const stand = document.createElement("INPUT");
		stand.setAttribute("type","submit");
		stand.setAttribute("value","Stand");
		stand.setAttribute("id","stand");
		divButton.appendChild(stand);
		divButton.setAttribute('class', 'divB');
		document.body.appendChild(divButton);

		let gameOver = false;

		//letTurns = ['user','computer'];
		while (gameOver !== true){
			const hitButton = document.getElementById('hit');
			const standButton = document.getElementById('stand');

			//user is only one that can hit buttons note!!!!
			hitButton.addEventListener('click', function(){
				const cardNow = cards[0];
				cards.shift();
				playerCards.push(cardNow);
				const divP = document.getElementById('cardsP');
				addElement(cardNow, divP);
				updateScore(playerCards, 'playerScore');
				const PscoreTot = scoreCalc(playerCards);
				if (PscoreTot > 21){
					this.parentElement.remove();

					gameOver = true; //computer won
					getWinner(playerCards,computerCards);
					updateScore(playerCards,'playerScore');
					updateScore(computerCards, 'compScore');
				}
			});

			//case that the user hits stand
			standButton.addEventListener('click', function(){
				//would mean that it is now the users turn 
								//case that game is not over and it is the computers turn
				let CscoreTot = scoreCalc(computerCards);
				//console.log("score before comp decision " + CscoreTot);
				//threshold - if greater than = 18 user will stand

				//case that computer will hit
				while(CscoreTot < 18){
					const cardNow = cards[0];
					cards.shift();
					computerCards.push(cardNow);
					//console.log(computerCards);
					const divC = document.getElementById('cardsC');
					addElement(cardNow, divC);
					CscoreTot = scoreCalc(computerCards);
					//console.log("computer score after decision "+CscoreTot);

					if (CscoreTot > 21){
						gameOver = true;
						//getWinner(playerCards,computerCards);
						this.parentElement.remove();
					}
				}

				//case that the computer will stand - which means that both have chosen to stand
				//computer score is >= 18
				this.parentElement.remove();
				getWinner(playerCards,computerCards);
				updateScore(playerCards,'playerScore');
				updateScore(computerCards, 'compScore');
				gameOver = true;

			});
			gameOver = true;
		}

	});
}

