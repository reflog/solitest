@tool
class_name Card
extends Node2D
enum Suits {SPADE, CLUB, DIAMOND, HEART}


enum Ranks  {
 ACE, KING, QUEEN, JACK, TEN, NINE, EIGHT, SEVEN, SIX, FIVE, FOUR, THREE, TWO

 }

class Data:
	var Suit: Suits
	var Rank: Ranks
	func _init(suit: Suits, rank: Ranks):
		Suit = suit
		Rank = rank
	

@export var Suit: Suits: 
	set(v): 
		Suit = v 
		if $TopSuit:
			$TopSuit.text = Suit2Text[v]
		if $BottomSuite:
			$BottomSuite.text = Suit2Text[v]
@export var Rank: Ranks:
	set(v): 
		Rank = v
		if $Rank:
			$Rank.text = Rank2Text[v]



const Rank2Text = {
	Ranks.ACE: "A",
	Ranks.KING: "K",
	Ranks.QUEEN: "Q",
	Ranks.JACK: "J",
	Ranks.TEN: "10",
	Ranks.NINE: "9",
	Ranks.EIGHT: "8",
	Ranks.SEVEN: "7",
	Ranks.SIX: "6",
	Ranks.FIVE: "4",
	Ranks.FOUR: "3",
	Ranks.TWO: "2"
}
 
const Suit2Text = {
		Suits.SPADE:  "♠",
		Suits.DIAMOND:			 "♦",
		Suits.HEART:			 "♥",
				Suits.CLUB:			 "♣"
		}
		
		


# Called when the node enters the scene tree for the first time.
func _ready():
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	pass
