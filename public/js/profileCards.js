class Carousel {
  
    constructor(element) {
      
      this.board = element
      
      // handle gestures
      this.handle()
      
    }
    
    handle() {
      
      // list all cards
      this.cards = this.board.querySelectorAll('.cardInfo')
      
      // get top card
      this.topCard = this.cards[this.cards.length-1]
      
      if (this.cards.length > 0) {
        
        // listen for pan gesture on top card
        this.hammer = new Hammer(this.topCard)
        this.hammer.add(new Hammer.Pan({
          position: Hammer.position_ALL, threshold: 0
        }))
        
        // pass event data to custom callback
        this.hammer.on('pan', this.onPan)
        
      }
      
    }
    
    onPan(e) {
      console.log("panning...")
    }
    
  }
  
  let board = document.querySelector('#profileCard')
  
  let carousel = new Carousel(board)

  