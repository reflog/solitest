extends Node2D

var Cards: Array[Card.Data] = []
var TopCard: Card.Data = null

@onready var CardScene = preload("res://Card.tscn")
# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	TopCard = Card.Data.new(Card.Suits.SPADE, Card.Ranks.TWO)
	Cards.push_back(Card.Data.new(Card.Suits.SPADE, Card.Ranks.TWO))
	Cards.push_back(Card.Data.new(Card.Suits.DIAMOND, Card.Ranks.ACE))
	Cards.push_back(Card.Data.new(Card.Suits.DIAMOND, Card.Ranks.ACE))
	Cards.push_back(Card.Data.new(Card.Suits.DIAMOND, Card.Ranks.ACE))
	Cards.push_back(Card.Data.new(Card.Suits.DIAMOND, Card.Ranks.ACE))
	Cards.push_back(Card.Data.new(Card.Suits.DIAMOND, Card.Ranks.ACE))
	Cards.push_back(Card.Data.new(Card.Suits.DIAMOND, Card.Ranks.ACE))
	Cards.push_back(Card.Data.new(Card.Suits.DIAMOND, Card.Ranks.ACE))
	layout()
	
func layout():
	var l = Cards.size()
	$Empty.visible = false
	$Back.visible = false
	$TopCard.visible = false
	if l == 0:
		$Empty.visible = true
	elif l == 1:
		$TopCard.visible = !!TopCard
		$Back.visible = not TopCard
	else:
		$Back.visible = true
		$TopCard.visible = !!TopCard
		

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass
