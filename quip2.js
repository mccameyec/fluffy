var amuletSheriffHayes = ["This ole amulet looks like it belongs to someone.", 
      "You should find the owner of this amulet.",
      "Good find, I'm sure the owner of this amulet is out there somewhere."];

var amuletJSCain = ["Never seen this before.","Wish I would have found this amulet."];

var amuletWilliamHang = ["Hang's eyes go wide. <q>Did you find my amulet? Please, can I have it?"]
/////////////////////////////////////////////////////////////////////////////////////
function findQuip(npc,thing){

var response = "";

  if(thing == "Amulet"){

    if(npc == "Sheriff Hayes"){

      response += npc + " responds, ";

      if(amuletSheriffHayes.length){
        var track = Math.floor(Math.random() * amuletSheriffHayes.length);
        response += "<q>" + amuletSheriffHayes[track] + "</q>";
        amuletSheriffHayes.splice(track,1);
      }

      else{
        response += "<q>You have asked enough, now go find the owner.</q>";
      }

    }

    if(npc == "JS Cain"){

      response += npc + " responds, ";

      if(amuletJSCain.length){
        var track = Math.floor(Math.random() * amuletJSCain.length);
        response += "<q>" + amuletJSCain[track] + "</q>";
        amuletJSCain.splice(track,1);
      }

      else{
        response += "<q>I have answered you enough.</q>";
      }
    }

    if(npc == "William Hang"){

      if(amuletWilliamHang.length){
        var track = Math.floor(Math.random() * amuletWilliamHang.length);
        response += "<q>" + amuletWilliamHang[track] + "</q>";
        amuletWilliamHang.splice(track,1);
      }

      else{
        response += npc + " responds, ";
        response += "<q>The amulet is mine.</q>";
      }

    }
    if((npc == "Pat Wesley")||(npc == "Mrs Perry")||(npc == "Mr Perry")||(npc == "Shotgun Johnny")){
        response += npc + " responds, ";
        response += "<q>I don't know what this is.</q>";
    }
  }
  if(thing == "Letter"){
    if(npc == "Sheriff Hayes"){}
    if(npc == "JS Cain"){}
    if(npc == "Pat Wesley"){}
    if(npc == "William Hang"){}
    if(npc == "Mrs Perry"){}
    if(npc == "Mr Perry"){}
    if(npc == "Shotgun Johnny"){}
  }
  if(thing == "Insurance Paper"){
    if(npc == "Sheriff Hayes"){}
    if(npc == "JS Cain"){}
    if(npc == "Pat Wesley"){}
    if(npc == "William Hang"){}
    if(npc == "Mrs Perry"){}
    if(npc == "Mr Perry"){}
    if(npc == "Shotgun Johnny"){}
  }

return response;
}