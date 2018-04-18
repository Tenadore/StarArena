#pragma strict


var distance : float;
var pinchSpeed : float;
var lastDist : Vector2;
var curDist : Vector2;
var distance2 : float = -1.5;
var xPos : boolean;
var yPos : boolean;
var panSpeed : float = 1.65;
var zoomSpeed : float = 1;
var touchDelta : float = 0.0;
var difX : float;
var difY : float;
//var tempLock : boolean = false;
//var delay : float = .1;
//var timeLast : float;
var tempCamSpeed : float = 1;

function Start () {


tempCamSpeed = .75;



 




}




//function OnTriggerEnter (other : Collider) {
//    this.transform.Translate(0,0,0);
//}

function FixedUpdate(){



	   if (Input.GetKey(KeyCode.UpArrow)){
   	Debug.Log("up pressed");
   	this.transform.Translate(0 , tempCamSpeed  , 0);
   
   }
   if (Input.GetKey(KeyCode.DownArrow)){
   	Debug.Log("up pressed");
   	this.transform.Translate(0 , -tempCamSpeed  , 0);
   
   }
     if (Input.GetKey(KeyCode.LeftArrow)){
   	Debug.Log("up pressed");
   	this.transform.Translate(-tempCamSpeed  , 0 , 0);
   
   }
     if (Input.GetKey(KeyCode.RightArrow)){
   	Debug.Log("up pressed");
   	this.transform.Translate(tempCamSpeed  , 0 , 0);
   
   }
     if (Input.GetKey(KeyCode.Keypad0)){
   	Debug.Log("up pressed");
   	this.transform.Translate(0  , 0 , -tempCamSpeed);
   
   }
     if (Input.GetKey(KeyCode.Keypad1)){
   	Debug.Log("up pressed");
   	this.transform.Translate(0  , 0 , tempCamSpeed);
   
   }
   
   

}

function Update () {


//if(timeLast + delay <= Time.time)
//
//{
//	tempLock = false;
//
//}


//TEMP CAM CONTROLS FOR KEYBOARD


   

 

if (Input.touchCount > 1 && (Input.GetTouch(0).phase == TouchPhase.Moved || Input.GetTouch(1).phase == TouchPhase.Moved)) 

    {
		
        //Two finger touch does pinch to zoom

        var touch1 = Input.GetTouch(0);

        var touch2 = Input.GetTouch(1);

       // curDist = Vector2.Distance(touch1.position, touch2.position);
        curDist = Input.GetTouch(0).position - Input.GetTouch(1).position;
        lastDist = ((Input.GetTouch(0).position - Input.GetTouch(0).deltaPosition) - (Input.GetTouch(1).position - Input.GetTouch(1).deltaPosition));
        touchDelta = (curDist.magnitude - lastDist.magnitude);
       
        
        

//        if(touchDelta <= 1 )
//
//        {

            //distance += Vector2.Distance(touch1.deltaPosition, touch2.deltaPosition)*(pinchSpeed/100)*10;
            
            
            //this.transform.Translate(0 , 0  , (touchDelta/2)*zoomSpeed);
//            this.transform.localPosition.y = this.transform.localPosition.y + (touchDelta*zoomSpeed); 
//            this.transform.localPosition.x = this.transform.localPosition.x -1;
            
//            lastDist = curDist;
            
            
//            
              if(this.transform.position.y >= 98 && this.transform.position.y <= 300 )
            {
            	
            	this.transform.Translate(0 , 0  , (touchDelta/2)*zoomSpeed);
            	
            	
            }
       	   else if (touchDelta < 0 && this.transform.position.y < 98)
            {
            	this.transform.position.y = 98.1;
            }
        	else if ( touchDelta > 0 && this.transform.position.y > 300)
            {
            	this.transform.position.y = 299.9;
            }
            
            lastDist = curDist;
          
            
            

//        }
//        
//        else{
//        
//
//            //distance -= Vector2.Distance(touch1.deltaPosition, touch2.deltaPosition)*(pinchSpeed/100)*10;
//            //this.transform.Translate(0 , 0  , (touchDelta/2)*zoomSpeed);
//           // this.transform.localPosition.y = this.transform.localPosition.y + (touchDelta*zoomSpeed); 
////            this.transform.localPosition.x = this.transform.localPosition.x =1;
//            lastDist = curDist;
//            
//              lastDist = curDist;
//              if(this.transform.position.y >= 40 && this.transform.position.y <= 170 )
//            {
//            	
//            	this.transform.Translate(0 , 0  , (touchDelta/2)*zoomSpeed);
//            	
//            	
//            }
//       	   else if (touchDelta < 0 && this.transform.position.y < 40)
//            {
//            	this.transform.position.y = 40.1;
//            }
//        	else if ( touchDelta > 0 && this.transform.position.y > 170)
//            {
//            	this.transform.position.y = 169.9;
//            }
//          
//            
//            
//
//        }
            
            
            

        
      }
        
        
        
        //One finger drag to pan
if (Input.touchCount == 1 && (Input.GetTouch(0).phase == TouchPhase.Began))
        {
        var touchBegin = Input.GetTouch(0);
        }
        
        
        
if (Input.touchCount == 1 && (Input.GetTouch(0).phase == TouchPhase.Moved))
        {
        var touchEnd = Input.GetTouch(0);
        
        var difference : Vector2 = touchBegin.deltaPosition - touchEnd.deltaPosition;
        
        var delta : Vector2 = touchEnd.position;
        
        
        //makes sure difference in swipes remains positive for use in camera translation
		if(difference.x < 0)
		{
		difX  = difference.x*-1;
		}
		else
		{
		difX = difference.x;
		}
		
		if(difference.y < 0)
		{
		difY  = difference.y*-1;
		}
		else
		{
		difY = difference.y;
		}
        
        
        
        
	        if (touchEnd.deltaPosition.x > 0)
	        {
	        	xPos = true;
	        	touchEnd = Input.GetTouch(0);
	        }
	        else
	        {
	        	xPos = false; 
	            touchEnd = Input.GetTouch(0);   
	        }
	        
	        if (touchEnd.deltaPosition.y > 0)
	         {
	        	yPos = true;
	        	touchEnd = Input.GetTouch(0);
	        }
	        else
	        {
	        	yPos = false; 
	         	touchEnd = Input.GetTouch(0);       
	        }
        
        
        
        	if (xPos == true)
        	{
        	
        	this.transform.Translate(-difX*panSpeed*Time.deltaTime,0,0);   
        	}
        	else
        	{
        	this.transform.Translate(difX*panSpeed*Time.deltaTime,0,0);
        	}
        
        
        
        	if (yPos == true)
        	{
        	
        	this.transform.Translate(0 , -difY*panSpeed*Time.deltaTime,0);
        	}
        	else
        	{
        	this.transform.Translate(0, difY*panSpeed*Time.deltaTime,0);
        	}
        
        
        
        
        
        
        
        
        
        }
        
        
        


}

