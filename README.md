# A Client Side Game of Blackjack

The card game is a single hand with the following rules: 

- each player will try to construct a hand of cards that's equal to 21 or as close to 21 as possible, without going over
	- the sum of the numeric values of the cards determine the value of a hand
	- face cards are worth 10
	- aces are worth 1 or 11
	- the player with the hand closest to (or equal to) 21 wins
	- ties are possible
- each player is dealt 2 cards from a 52 card deck, with each card representing some numeric value
- in our version, the initial cards are dealt to the computer and user in an alternating fashion, with the computer being dealt the 1st card:
	- the computer is dealt one card, and the user is dealt another card
	- this repeats one more time so that both the user and computer have 2 cards each
- once the initial two cards are dealt, the user can choose to be dealt more cards ("hit") or stop being dealt cards ("stand")
	- if the user's hand ends up exceeding 21, then the user automatically loses
	- if the user chooses to "stand" (to stop being dealt cards), then the computer can choose to continually "hit" or "stand"
- once both players have either chosen to stand or have a hand with a total that's more than 21 ("bust"), the hands are compared
	- the player with the hand that's closest to 21 without going over wins
	- again ties are possible (either same total, or both player "bust")


Rules are from NYU AIT Course Instructions

Must be completely client side!
April 11, 2020