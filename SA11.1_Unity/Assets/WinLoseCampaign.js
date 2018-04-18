#pragma strict
static var topBaseDead : boolean;
static var bottomBaseDead : boolean;
 


function Start () {

	
	topBaseDead = false;
	bottomBaseDead = false;
}

function Update () {

}

static function WinCampaign(base : int){

	
	if(base == 1){
	topBaseDead = true;
	
	}
	else if(base == 2){
	bottomBaseDead = true;
	
	}
	if (topBaseDead == true && bottomBaseDead == true){
			if(GameObject.Find("SinglePlayer")){
			
			var gosx1 : GameObject[];
		   	var gosbx1 : GameObject[];
		   		 	 
		    gosx1 = GameObject.FindGameObjectsWithTag("blue");
		    gosbx1 = GameObject.FindGameObjectsWithTag("red");
		    	 
		    	for (var gox1 : GameObject in gosx1){ 
		   		Destroy(gox1);	
		    	} 
		    	for (var gobx1 : GameObject in gosbx1){ 
		    	Destroy(gobx1);
		   		} 
		    
		       	     	       	       	    
		    var guiosx1 : GameObject[];
		    
		    guiosx1 = GameObject.FindGameObjectsWithTag("gui");
		    
		    for (var guix1 : GameObject in guiosx1){ 
		   	var tempscriptx1 = guix1.GetComponent(GameGUI_SinglePlayer);
			tempscriptx1.Win();
		    }
			
			
			}
			}
	
	
	
	}
	
