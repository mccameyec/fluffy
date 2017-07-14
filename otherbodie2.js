var locations =
  ["Firehouse", "JS Cain's House", "Jail", "Bank",
    "Bakery", "Chinatown", "Town Hall"]

var characters =
  ["You"]

//to see if i can make js cain a character, not treated as an object
var npcs =
  ["Sheriff Hayes", "JS Cain", "Pat Wesley", "William Hang",
    "Mrs. Perry", "Mr. Perry", "Shotgun Johnny"]
    
// State
var location_of =
  {
    "Sheriff Hayes": "Town Hall",
    "JS Cain": "Bank",
    "Pat Wesley": "Bakery",
    "You": "Town Hall",
    "Amulet": "Chinatown",
    "William Hang": "Jail",
    "Insurance Paper": "Bank",
    "Letter": "Wesley House",
    "Mrs. Perry": "Perry House",
    "Shotgun Johnny": "Graveyard",
    "Mr. Perry": "Graveyard",
    "Key": "Sheriff Hayes"
  }

var clothing_on = //for wear function
  {
    "Sheriff Hayes": "",
    "JS Cain": "",
    "Pat Wesley": "",
    "You": ""
  }

var locations_visited = [];

var conversation_log =
  {
    "Firehouse": [],
    "JS Cain's House": [],
    "Jail": [],
    "Bank": [],
    "Bakery": [],
    "Chinatown": [],
    "Town Hall": [],
    "Sheriff Hayes": [],
    "William Hang": [],
  }

var knowledge =
  {
    ["William Hang"]: "unknown",  
    ["Firehouse"]: "unknown", 
    ["You"]: "unknown", 
    ["Pat Wesley"]: "unknown", 
    ["Letter"]: "unknown", 
    ["Mr. Perry"]: "unknown", 
    ["Shotgun Johnny"]: "unknown", 
    ["Hat"]: "unknown", 
    ["Insurance"]: "unknown" 
  }

var descriptions =
  {
    "William Hang": "The town cook. He was the last person at the scene of the crime.",
    "Firehouse": "Firehouse.",
    "Pat Wesley": "Pat Wesley.",
    "Letter": "Letter.",
    "Mr. Perry": "Mr. Perry.",
    "Shotgun Johnny": "SJ - Suspect.",
    "Hat": "Hat.",
    "Insurance": "Insurance."
  }

/*var descriptions =
  [{ thing: "William Hang", descr: "The town cook. He was the last person at the scene of the crime." },
  { thing: "Firehouse", descr: "Firehouse." },
  { thing: "Pat Wesley", descr: "Pat Wesley." },
  { thing: "Letter", descr: "Letter." },
  { thing: "Mr. Perry", descr: "Mr. Perry." },
  { thing: "Shotgun Johnny", descr: "SJ - Suspect." },
  { thing: "Hat", descr: "Hat." },
  { thing: "Insurance", descr: "Insurance." }
  ];*/

var inventory =
  [{ thing: "Town Hall", descr: "The center of the town of Bodie. The Sheriff is usually here." },
  { thing: "Sheriff Hayes", descr: "The town's Sheriff. You met him when you first arrived. If you need a hint, see him at the Town Hall." },
  ];

var current_choices;

function choiceToString(c) {
  var { op, args } = c;
  var str = "";

  switch (op) {
    case "take": {
      return "Take " + args[1];
    }
    case "go": {
      return "Go to " + args[1];
    }
    case "talk": {
      return "Talk to " + args[1];
    }
    case "give": {
      return "Give " + args[2] + " to " + args[1];
    }
    case "wear": {
      return "Wear " + args[1];
    }
    case "ask": {
      return "Ask " + args[1] + " about " + args[2];
    }
    /*case "tell": {
      return "Tell " + args[1] + " about " + args[2];
    }*/
    default: return op + " " + args[args.length - 1];
  }
}

function displayState() {
  toRender = "";
  state = [];
  // stuff at all locations
  for (var i = 0; i < locations.length; i++) {
    var stuff = whatsAt(locations[i]);
    toRender += "<b>At " + locations[i] + ":</b>";
    if (stuff.length > 0) {
      toRender += "<p>" + stuff.toString() + "<br>";
    }

    toRender += "</p>";
    
    if (i == Math.ceil(locations.length / 2 - 1)) {
      document.getElementById("col1").innerHTML = toRender;
      toRender = "";
    }
  }

  document.getElementById("col2").innerHTML = toRender;
  
  //document.getElementById("state").innerHTML = toRender;
}

function displayInventory() {
  toRender = "Information<br>";
  
  for (var i = 0; i < inventory.length; i++) {
    toRender += "<a onclick=describeThing(" + i + ") href=javascript:void(0);>" + inventory[i].thing + "<br>";
  }


  // inventory of knowledge?
  document.getElementById("information").innerHTML = toRender;

  for (var key in descriptions) {
    if (knowledge[key] != "unknown") {
      inventory.push({ thing: key, descr: descriptions[key] });
      delete descriptions[key];
    }
  }
  /*for (var i = 0; i < descriptions.length; i++) {
    if (knowledge[descriptions[i].thing] != "unknown") {
      inventory.push({thing: descriptions[i].thing, descr: descriptions[i].descr)
    }
  }*/
}

function describeThing(t) {
  var display_text = inventory[t].descr;
  document.getElementById("description").innerHTML = display_text;
  render();
}

function displayChoices() {
  // current_choices = generate_choices();
  toRenderAction = "";
  toRenderConversation = "";
  for (var i = 0; i < current_choices.length; i++) {
    var choice = current_choices[i];
    var last_character;
    if (choice.args[0] != last_character) {
      toRenderAction += "<br>" + "Actions for " + choice.args[0] + "<br>";
      toRenderConversation += "<br>" + "Conversation for " + choice.args[0] + "<br>";
    }
    //seperate operators for conversation and action
    if (choice.op == "talk" || choice.op == "ask" || choice.op == "tell"){
      toRenderConversation += "<a onclick=selectChoice(" + i + ") href=javascript:void(0);>" + choiceToString(choice) + "</a><br>";
    }
    else{
      toRenderAction += "<a onclick=selectChoice(" + i + ") href=javascript:void(0);>" + choiceToString(choice) + "</a><br>";
    }
    last_character = choice.args[0];
  }
  document.getElementById("actions").innerHTML = toRenderAction;
  document.getElementById("conversation").innerHTML = toRenderConversation;
}

function render() {
  current_choices = generate_choices();
  displayState();
  displayInventory();
  displayChoices();
}

function selectChoice(index) {

  var display_text = applyOper(current_choices[index]);

  document.getElementById("response").innerHTML = display_text;

  // current_choices = generate_choices();
  render();
}


function cmdToAction(cmd) {
  var { op, args } = cmd;

  switch (op) {
    case "take": {
      return take(args[0], args[1]);
    }
    case "go": {
      return go(args[0], args[1]);
    }
    case "talk": {
      return talk(args[0], args[1]);
    }
    case "give": {
      return give(args[0], args[1], args[2]);
    }
    case "wear": {
      return wear(args[0], args[1]);
    }
    case "ask": {
      return ask(args[0], args[1], args[2]);
    }
    /*case "tell": {
      return tell(args[0], args[1], args[2]);
    }*/
    default: return undefined;
  }
}

// returns text to display upon applying cmd
function applyOper(cmd) {

  var displayText = "Action not defined!"; // to return at the end

  var action = cmdToAction(cmd);

  if (action != undefined) {
    action.text = action.effects(); //call effects and set text
    displayText = action.text;
  }
  return displayText;
}

function whatsAt(loc) {
  var things = [];
  for (var thing in location_of) {
    if (location_of[thing] == loc) {
      things.push(thing);
    }
  }
  return things;
}

function generate_choices() {
  choices = [];
  // for each character, see what they can do
  for (var ci in characters) {
    var c = characters[ci];
    var loc = location_of[c];
    var things = whatsAt(loc);
    var things_held = whatsAt(c);

    //things at location of each character
    for (var ti in things) {
      var thing = things[ti];
      //taking it
      //if (characters.indexOf(thing) < 0 && npcs.indexOf(thing) < 0 && 
      //    loc == location_of[thing]) {
      if (take(c, thing).applies) {
        choices.push({ op: "take", args: [c, thing] });
      }
      else {
        // talking to it
        //if(thing != c && location_of[c] == location_of[thing]) {
        if (talk(c, thing).applies) {
          choices.push({ op: "talk", args: [c, thing] });
        }
      }
    } // end loop over things at location of c

    // giving it
    for (var thi in things_held) {
      thing_held = things_held[thi];

      for (var ci2 in npcs) {
        var c2 = npcs[ci2];
        //if (c != c2 && loc == location_of[c2] && c == location_of[thing_held]) {
        if (give(c, c2, thing_held).applies) {
          choices.push({ op: "give", args: [c, c2, thing_held] });
        }
        if (ask(c, c2, thing_held).applies) {
          choices.push({ op: "ask", args: [c, c2, thing_held] });
        }
        /*if (tell(c, c2, thing_held).applies) {
          choices.push({ op: "tell", args: [c, c2, thing_held] });
        }*/

      }
    }
    // places to move
    for (var li in locations) {
      var l = locations[li];
      //if(l != loc) {
      if (go(c, l).applies) {
        choices.push({ op: "go", args: [c, l] });
      }
    }


  } //end loop over characters
  return choices;

}

function begin() { render(); }

function ask(agent, npc, thing) {
  var applies = (location_of[thing] == agent) && (location_of[agent] == location_of[npc]);
  var text = "";
  function effects() {
    var text = agent + " ask " + npc + " about the " + thing + ".</br></br>";
    text += findQuip(npc, thing);
    return text;
  }
  return { applies: applies, effects: effects, text: text };
}

/*function tell(agent, npc, thing) {
  var applies = (location_of[thing] == agent) && (location_of[agent] == location_of[npc]);
  var text = "";
  function effects() {
    var text = agent + " tell " + npc + " about the " + thing + ".</br></br>";
    return text;
  }
  return { applies: applies, effects: effects, text: text };
}*/


function take(agent, thing) {

  var applies = (location_of[agent] == location_of[thing]) && (characters.indexOf(thing) < 0) &&
    (npcs.indexOf(thing) < 0);
  var text = "";

  function effects() {
    location_of[thing] = agent;
    var text = agent + " take the " + thing + ".";

    if (thing == "Amulet") {//thing is amulet
      knowledge["William Hang"] = "has";
    }

    if (thing == "Insurance Paper") {
      text = "</br ></br >JS Cain reaches to his desk and " +
             "pulls a sheet of paper from a file. <q>Here's a " +
             "partial list of losses for the citizens of the town. " +
             "The damage is huge, exceeding 88,000 dollars...</q>" +
             "</br ></br >" + agent + " take the " + thing + ".</br ></br >" +
             "Cain continues, <q>I already see something fishy. Notice " +
             "that Mrs. Perry lost less than almost anyone? Considering " +
             "that a good number of the lost buildings were in direct " +
             "competition with Perry... Something seems off. I suggest " +
             "you look around her bakery.</q>";
             knowledge["Insurance"] = "known";
    }
    else if (thing == "Letter") {
      text = "You unfold the letter, and see a sketch of " +
             "something called the U.S. Hotel, along with an " +
             "address on Main Street.</br></br>The letter reads</br></br>" +
             "<q>Pat,</br>This is Palmyre's sketch of our new business, " +
             "and where we'd like it to be. We think that it'd be a fantastic " +
             "addition to Bodie's Main Street, and bring quite a pretty penny " +
             "to everyone involved. We'd like to consider it not only the best " +
             "hotel in the county, but a roaring center of trade. Now, if only " +
             "that old man would sell us the rights to his land, we could move " +
             "forward with the plan...</br>Earnestly,</br>James</q>";
             knowledge["Letter"] = "known";
    }

    return text;
  }

  return { applies: applies, effects: effects, text: text };

}


function go(agent, place) {

  var applies = location_of[agent] != place;
  var text = "";

  function effects() {
    location_of[agent] = place;
    var text = "";

    //incorporating specific story line
    if (place == "Firehouse") {
      if (knowledge["You"] == "unknown") {
        text = "The firehouse is empty today, the sun " +
               "gleaming off of its bell. Of interest " +
               "is a ditch containing what seems to be " +
               "the housing for a water valve. You try " +
               "to look inside, but you're stopped by a heavy lock.";
               knowledge["Firehouse"] = "known";
      }
      else {
        text = "You use the key the sheriff gave you to open up " +
               "the lock on the valve housing.</br ></br>You remove the " +
               "cover, and sure enough, there's obvious evidence of " +
               "tampering. You see a flat black hat inside the valve " +
               "housing as well, similar to a sun hat. Stitched onto " +
               "the brim is a monogram, <q>SJ</q>. You grab it. ";
               
               knowledge["Hat"] = "known";
               location_of["You"] = "Hat";
      }
    }
    else if (place == "JS Cain's House") {
      text = "You knock on the door to no avail. " +
             "Peering into the lavish windows, " +
             "you see that nobody's home." +
             "You should check elsewhere.";

    }
    else if (place == "Jail") {
      if (knowledge["William Hang"] == "unknown") {//amulet is not in possesion of you
        text = "The man in the jail cell looks almost asleep. " +
               "</br ></br >Check somewhere else. ";
      }
      else if (knowledge["William Hang"] == "has") {
        text = "Hang looks awake";/*, so you ask about " +
               "the events of the night, but he refuses to talk about that. <q>All I " +
               "want is to find my family,</q> is all you  " +
               "can get out of him. You reply that he's going " +
               "to have to help you out before you can make that " +
               "happen. He sits silently on the other side of the bars. " +
               "Absently, you pull out the amulet you found and take " +
               "another look. </br ></br >Hang's eyes go wide. <q>My god, " +
               "that survived the fire? I never suspected - thank you. " +
               "Please, can I have it?</q> ";*/
      }
      else if (knowledge["William Hang"] == "given") {
        text = "You've already spoken to the cook. He is turned " +
               "away, in the corner of the cell.";
      }
    }
    else if (place == "Bank") {
      text = "You enter the imposing Bodie Bank, " +
             "the most modern and expensive of all " +
             "the buildings in town. The safe stands " +
             "severe in the center, between brick and " +
             "steel bar. Facing the opposite wall is a " +
             "redwood desk. <br /><br />" +

             "Sitting there is a straight backed man with " +
             "salt and pepper hair, furiously filing documents " +
             "and flipping through files. He jerks to a stop as " +
             "you approach, and stands, stiffly. He turns to you " +
             "and you notice his gaunt face and pale eyes. ";
    }
    else if (place == "Bakery") {
      text = "You enter the ruins of the bakery. Scorched " +
             "bricks litter the ground, and white ash is " +
             "mixed into the dirt. The blaze that took out " +
             "half of Bodie started here. You see gnarled " +
             "cast iron about, indicating you're in the kitchen." +
             "<br /><br /> As you make your way through the " +
             "kitchen, you come across a one armed, portly man. " +
             "He is wearing a suit, despite the ashy ruin you " +
             "two stand in.";
    }
    else if (place == "Chinatown") {
      text = "You're struck by the massive amount of damage done " +
             "to the Chinatown of Bodie, north of town. It seems " +
             "that the fire truly torched the neighborhood.<br />You " +
             "recall a faint memory of a celebration here, with " +
             "brightly colored ribbons hanging over the streets " +
             "and a huge parade. Only an echo remains, in the few " +
             "red roofed homes miraculously left standing. <br /><br />" +
             "You investigate the nearest shack, torched on the " +
             "outside but fairly preserved inside. On a ramshackle " +
             "desk is a wooden amulet, on a twine string. Perplexed, " +
             "you pick it up. A faded sketch of a girl is inside. " +
             "<br /><br /> This is a desolate place.";
    }
    else if (place == "Perry House") {
      text = "Poking your head through the doorframe, you see a woman " +
             "in a rocking chair, head buried in her hands. Hearing the " +
             "draft, she looks up and sees you. Her face is lined with " +
             "stress and weathered by sun.</br>";
    }
    else if (place == "Wesley House") {
      text = "The Wesley house is austere and well kept. You go to knock on " +
             "the door, but at the first rap the door creaks open. " +
             "</br></br>You go inside the " + place + ".";

    }
    else {
      text = agent + " go to " + place;
    }

    return text;
  }

  return { applies: applies, effects: effects, text: text };

}

function wear(agent, thing) {

  var applies = (agent == location_of[thing]) && (clothing_on(agent) != thing);
  var text = "";

  function effects() {
    clothing_on[agent] = thing;
    var text = "";

    if (clothing_on[agent] == "") {
      text = agent + " wears " + thing;
    }
    else {
      text = agent + " takes off " + clothing_on[agent] + " and wears " + thing;
    }

    return text;
  }

  return { applies: applies, effects: effects, text: text };

}

function talk(agent1, agent2) {

  var loc = location_of[agent1];
  var applies = loc == location_of[agent2] && agent1 != agent2;
  var text = "";

  function effects() {

   // var text = agent2 + " says hello to " + agent1 + "</br ></br >";
    text += findTalk(agent1,agent2, knowledge);
    return text;
  }

  return { applies: applies, effects: effects, text: text };
}

function give(agent1, agent2, thing) {

  var loc = location_of[agent1];
  var applies = (agent1 != agent2) && (agent1 == location_of[thing]) && (loc == location_of[agent2]);
  var text = "";

  //if npc given thing, i want npc to be "wearing" thing
  function effects() {
    var text = "";
    var graveYardAccess = 0;
    //graveYardAccess variable gives conditions for giving amulet, if we need to include another give this function needs to be edited
    if (thing == "Amulet" && agent2 == "William Hang") {
      graveYardAccess = 1;
    }

    if (graveYardAccess == 0) { }
    else {
      location_of[thing] = agent2
      locations.push("Graveyard");
      knowledge["William Hang"] = "given";
      if (clothing_on[agent1] == thing) {
        clothing_on[agent1] = "";
      }
    }
    if (graveYardAccess == 0) {
      text = "You try to hand the " + thing + " to " + agent2 + ".</br></br>" +
             agent2 + " responds, <q>No thank you, this " + thing + " is not mine.</q>";
    }
    else {
      text = agent1 + " give " + thing + " to " + agent2;
    }
    if (graveYardAccess > 0) {
      text += ". </br></br> <b>You now have access to the Graveyard.</b>";
    }

    return text;
  }

  return { applies: applies, effects: effects, text: text };
}