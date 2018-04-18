#pragma strict

function Start () {

if(PlayerPrefs.GetInt("introPlayed") == 0){
//	Handheld.PlayFullScreenMovie("StarMapIntroV2xxx.mp4", Color.black);
	//iPhoneUtils.PlayMovie("StarMapIntroV1_720p.mp4", Color.black);
	PlayerPrefs.SetInt("introPlayed", 1);
}
//Handheld.PlayFullScreenMovie ("StarMapIntroV1_720p.mp4", Color.black, FullScreenMovieControlMode.CancelOnInput, FullScreenMovieScalingMode.None);
//iPhoneUtils.PlayMovie("StarMapIntroV1_720p.mp4", Color.black, iPhoneMovieControlMode.CancelOnTouch); 

}

function Update () {

}