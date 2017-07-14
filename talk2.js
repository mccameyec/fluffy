
var JsCain = ["<q>Greetings</q>, he says in a soft lilt. <q>My name is James Stuart Cain.</q> He paces towards you and offers his hand."]
var patWesley = ["Before you can say anything, he notices you, and begins to speak rapidly. <br /><br /><q>Oh, hello! Pat Wesley, at your service,</q><br /><br />he says in an irish brogue, whiskers quivering when he smirks.<br /><br /> <q>How can I help you?</q> "];

var sheriffHayes = ["The sheriff ponders a moment, then says, <q>Have you met JS Cain yet? If he's not at home, check the bank. He owns it. Hell, he owns most of the town. There's also the cook who's missing. Maybe check the bakery, or Chinatown.</q>"];
var mrPerry = ["The man with the eyepatch stands straight and tall over " +
               "a squared off patch of land. He seems to be about sixty, " +
               "with a strong physique and confident demeanor. He stares " +
               "silently at the square. As you approach him, he looks you " +
               "in the eyes and says, <q>This is the spot I've picked for " +
               "my grave. You may find that odd, but somebody will have " +
               "to do it. I've decided to take the task into my own hands.</q> " +
               "</br></br><q>My name is James Perry. Mono County Supervisor. And you're " +
               "the deputy who's been looking into the fire.</q>"];
var sJ = ["The short man strikes a comical figure, with a bulldog face " +
               "and a round black hat, similar to a sun hat.</br>You begin to " +
               "walk towards the man, but as you do, he saunters towards you " +
               "instead, breaking off his conversation. The tall man turns " +
               "back to the patch of land, brooding.</br>In a thick cornish " +
               "accent, he hollers, <q>Hello! I see you eyeing me. Well, I " +
               "decided I'd come over here, eye you instead. The prop's to " +
               "see how you like it.</q> He gets right up in your face. <q>They " +
               "call me Shotgun Johnny. Wanna guess why?</q> Menace flickers " +
               "in his eyes.</br></br>A tense moment passes, and he suddenly breaks out " +
               "in laughter.</br></br><q>Nah, I'm playin' with ya. What is it you want to say?</q>" +
               "There's still a bit of edge in his voice."];
function findTalk(character,npc,knowledge){
  var text = ""
    if (npc == "JS Cain"){
        if(JsCain.length){
            text += JsCain[0];
            JsCain.splice(0,1);
        }
        else{
            text += npc + " says hello to " + character;
        }
    }
    
    if (npc == "Pat Wesley"){
        if(patWesley.length){
            text += patWesley[0];
            patWesley.splice(0,1);
        }
        else{
            text += npc + " says hello to " + character;
        }
    }

    if (npc == "Sheriff Hayes"){
        if(sheriffHayes.length){
            text += sheriffHayes[0];
            sheriffHayes.splice(0,1);
        }
        else{
            text += npc + " says hello to " + character;
        }
    }

    if (npc == "Mr. Perry"){
        if(mrPerry.length){
            text += mrPerry[0];
            mrPerry.splice(0,1);
        }
        else{
            //if you have the letter then asking him about it will get response
            text += npc + " says hello to " + character;
        }

    }

    if (npc == "Shotgun Johnny"){
        if(sJ.length){
            text += sJ[0];
            sJ.splice(0,1);
        }
        else{
            //if you have the letter then asking him about it will get response
            text += npc + " says hello to " + character;
        }

    }
  return text;
}

/*
Js Cain
"<q>Greetings</q>, he says in a soft lilt. <q>My name is James Stuart Cain.</q> He paces towards you and offers his hand.";

Pat Wesley
"Before you can say anything, he notices you, and begins to speak rapidly. <br /><br /><q>Oh, hello! Pat Wesley, at your service,</q><br /><br />he says in an irish brogue, whiskers quivering when he smirks.<br /><br /> <q>How can I help you?</q> ";

Mrs Perry
"<q>Well, it's a bit rude of you to snoop, but come in.</q></br> She speaks with the slightest French accent. <q>My name is Palmyre.</q></br></br>This must be Mrs. Perry, the restaurant owner.</br></br><q>I suppose you've come to discuss the fire.</q>";
*/