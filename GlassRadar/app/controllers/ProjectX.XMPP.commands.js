/*public interface OnXmppMessage {
	void onNewMessage(String message);
}

0. sc - SRV 2 ADM/CL1
{
	"command" : "srv_error",
	"error" : "error description"
}

 1. cs - start game
{
	"command" : "i_wanna_start",
	"type" : "sprint",
	"params" : {
		"from" : {
			"lat" : 25.0,
			"lng" : 50.0,
			"name" : "Opera"
		},
		"to" : {
			"lat" : 50.0,
			"lng" : 150.0,
			"name" : "Park"
		},
		"start" : "time-in-millis",
		"people" : [
			{
				"name" : "Jennie",
				"id" : "test.cl2",
				"url" : "http://......"
			},
			{
				"name" : "Anjelina",
				"id" : "test.cl3",
				"url" : "http://......"
			}
		]
	}
}
 
 2. sc - game initiated SRV 2 ADM
{
	"command" : "srv_game_init",
	"game_id" : 123,
	"admin" : {
		"name" : "Eric",
		"id" : "test.cl1",
		"url" : "http://......"
	}
}

 
 3. sc - game invite SRV 2 CL1
 {
	"command" : "srv_game_invite",
	"game_id" : 123,
	"type" : "sprint",
	"params" : {
		"from" : {
			"lat" : 25.0,
			"lng" : 50.0,
			"name" : "Opera"
		},
		"to" : {
			"lat" : 50.0,
			"lng" : 150.0,
			"name" : "Park"
		},
		"start" : "time-in-millis",
		"people" : [
			{
				"name" : "Jennie",
				"id" : "test.cl2",
				"url" : "http://......"
			},
			{
				"name" : "Anjelina",
				"id" : "test.cl3",
				"url" : "http://......"
			}
		]
	}
}

 4. cs - person status [ready|wait|out]
 {
	"command" : "i_wanna_update",
	"game_id" : 123,
	"status" : "ready"
 }

 5. sc - person status update: [ready|wait|out]
{
	"command" : "srv_player_update",
	"id" : "test.cl3",
	"game_id" : 123,
	"status" : "ready"
}

 6. cs - start game 3-2-1! ADM 2 SRV
{
	"command" : "i_wanna_countdown",	
	"game_id" : 123
}
 
 7. sc - game is about to start COUNTDOWN!
 {
 	"command" : "srv_countdown",
	"game_id" : 123,
	"seconds" : 3
 }
 
 8. cs - person location/speed --> response with race status #10
{
	"command" : "i_update_location",	
	"game_id" : 123,
	"location" : {
		"lat" : 25.0,
		"lng" : 50.0,
		"speed" : 56.2,
		"direction" : 126.0,
		"height" : 100.0
	}
}

 9. cs - person requests leaderboard
{
	"command" : "i_wanna_board",	
	"game_id" : 123
}
 
 9. sc - game stats
 {
	"command" : "srv_board",	
	"game_id" : 123,
	"stats" : [
		{
			"name" : "Jennie",
			"id" : "test.cl2",
			"url" : "http://......",
			"points" : "100 m"
		},
		{
			"name" : "Anjelina",
			"id" : "test.cl3",
			"url" : "http://......",
			"points" : "200 m"
		}
	]
 }
 
10. sc - player's locations
{
	"command" : "srv_race_status",	
	"game_id" : 123,
	"stats" : [
		{
			"id" : "test.cl2",
			"location" : {
				"lat" : 25.0,
				"lng" : 50.0,
				"speed" : 56.2,
				"direction" : 126.0,
				"height" : 100.0
			}
		},
		{
			"id" : "test.cl3",
			"location" : {
				"lat" : 30.0,
				"lng" : 54.0,
				"speed" : 56.2,
				"direction" : 126.0,
				"height" : 100.0
			}
		}
	]
}

11. sc - bonus points
{
	"command" : "srv_bonus",	
	"game_id" : 123,
	"bonus" : 2000,
	"descr" : "1st place!"
}

12. sc - you end/win --> then game stats
{
	"command" : "srv_finish",	
	"game_id" : 123,
	"place" : [-1,1,2,3,...],
	"descr" : "First place, FTW!",
	"time" : "4:45"
}

13. sc - XX win --> 1 min timer -- >
{
	"command" : "srv_min_timer",	
	"game_id" : 123
}

14. sc - you lose: -1 ===  looser @see #12
{
	"command" : "srv_finish",	
	"game_id" : 123,
	"place" : -1,
	"descr" : "You lost",
	"time" : "12:56"
}

15. cs - ok glass, i'm out @see #4
 {
	"command" : "i_wanna_update",
	"game_id" : 123,
	"status" : "out"
 }
 
16. cs - ok glass, stop the race ADM 2 SRV
{
	"command" : "i_wanna_stop",
	"game_id" : 123
}*/
