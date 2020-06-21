const GameState = Object.freeze({
    WAKE: Symbol("wake"),
    PRESS: Symbol("PRESS"),
    DRINK: Symbol("DRINK"),
    LIVINGROOM: Symbol("LIVINGROOM"),
    DRINKCHOICE: Symbol("DRINKCHOICE"),
    MILK: Symbol("MILK"),
    JUICE: Symbol("JUICEphone"),
    PHONE: Symbol("PHONE"),
    HELP: Symbol("HELP"),
    PHONECHOICE: Symbol("PHONECHOICE"),
    HIDE: Symbol("HIDE"),
    SOFACHOICE: Symbol("SOFACHOICE"),
    DISCOVERY: Symbol("DISCOVERY")
});

module.exports = class Game {
    constructor() {
        this.stateCur = GameState.WAKE;
    }

    makeAMove(sInput) {

        if (sInput.toLowerCase().match("Start") || sInput.toLowerCase().match("restart")) {
            this.stateCur = GameState.WAKE;
        }

        let sReply = "";
        switch (this.stateCur) {

            case GameState.WAKE:
                sReply = "You woke up in the middle of the night and your parents are at your grandparents' place, you did not go with them because you are having a fever. Press any key to continue";
                this.stateCur = GameState.PRESS;
                break;

            case GameState.PRESS:
                sReply = "You felt extremely thirsty and dizzy perhaps due to sleeping too much. Do you want to go get a drink?";
                this.stateCur = GameState.DRINK;
                break;

            case GameState.DRINK:
                if (sInput.toLowerCase().match("yes") || sInput.toLowerCase().match("sure") || sInput.toLowerCase().match("ok") || sInput.toLowerCase().match("drink")) {
                    sReply = "Ok, time to get a drink. You got up and felt a little dizzy, 'I hate fever', you thought of this on your way to living room..."
                    this.stateCur = GameState.LIVINGROOM;
                } else {
                    sReply = "Too lazy to go, you are thinking and trying to go back to sleep. However, the painful throat wouldnt let you to close your eyes. You opened your bedroom door and going to living room to grab a glass of water. Enter anything to continue";
                    this.stateCur = GameState.LIVINGROOM;
                }
                break;

            case GameState.LIVINGROOM:
                sReply = "The fridge door is open for some reason. Perhaps your parents forgot to close it? Anyway, there are three items in the fridge -> \n 1. Milk \n 2. Juice \n 3.Water \n 4. Unknown Liquid \n 5. Oil \n 6. Not Drink Anything \n What would you like?";
                this.stateCur = GameState.DRINKCHOICE;
                break;

            case GameState.DRINKCHOICE:
                if (sInput.toLowerCase().match("1") || sInput.toLowerCase().match("Milk")) {
                    sReply = "Milk it is, you hope that you can warm the milk up and then it can improve your sleeping quality. You reach for the milk and found out the bottle is empty, unfortunately. Chose other drinks?";
                    this.stateCur = GameState.LIVINGROOM;
                } else if (sInput.toLowerCase().match("2") || sInput.toLowerCase().match("Juice")) {
                    sReply = "Maybe some fresh juice, you grabbed a glass and started pouring out the juice. The juice has a color of deep red, smells like blood? Do you drink it? or dump it? ";
                    this.stateCur = GameState.JUICE;
                } else if (sInput.toLowerCase().match("3") || sInput.toLowerCase().match("Water")) {
                    sReply = "Water is the top choice when you are thirsty. Pouring out some water and started drinking. The phone started ringing.......\n 1. pick up \n 2. ignore";
                    this.stateCur = GameState.PHONE;
                } else if (sInput.toLowerCase().match("4") || sInput.toLowerCase().match("unknown")) {
                    sReply = "This unknown liquid has a color of dark green, seems like some kind of juice. You decided to try it out, and then everything starts to fade away..... YOU ARE DEAD.";
                    this.stateCur = GameState.WAKE;
                    break;
                } else if (sInput.toLowerCase().match("5") || sInput.toLowerCase().match("Oil")) {
                    sReply = "Oil is an interesting choice. You poured some oil into your mouth and starting puking. Meanwhile the phone started ringing.......\n 1. pick up \n 2. ignore";
                    this.stateCur = GameState.PHONE;
                } else {
                    sReply = "You decided not to drink anything, not a smart choice given that you are still having a fever and thirsty. You are quickly dehydrated. The phone started ringing.....\n 1. pick up \n 2. ignore";
                    this.stateCur = GameState.PHONE;
                }
                break;

            case GameState.JUICE:
                if (sInput.toLowerCase().match("drink")) {
                    sReply = "As soon as the red liquid entered your mouth, a taste of blood quickly spread around your mouth. You started puking and coughing out more blood, and your body is discovered three days later after your parents got home.... \n Game Over. Restart to play again";
                    this.stateCur = GameState.WAKE
                    break;
                } else {
                    sReply = "Ewww, what is this? You dumped away the juice and grabbed the water. The phone started ringing.......\n 1. pick up \n 2. ignore"
                    this.stateCur = GameState.PHONE;
                }
                break;

            case GameState.PHONE:
                if (sInput.toLowerCase().match("pick up") || sInput.toLowerCase().match("1") || sInput.toLowerCase().match("pick")) {
                    sReply = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA HELP ME!!!!! THEY ARE COMING....@!%!@#$!$!#!#%!. \n There was this high pitch voice screaming right at your ear over the other side of the phone line. \n 1. Hang up the phone \n 2. Asking him/her what is going on";
                    this.stateCur = GameState.PHONECHOICE;
                } else {
                    sReply = "The phone stopped ringing after a few seconds. And then started ringing again, the caller seems to know that you are there. \n 1. pick up"
                    this.stateCur = GameState.PHONE;
                }
                break;

            case GameState.PHONECHOICE:
                if (sInput.toLowerCase().match("hang up") || sInput.toLowerCase().match("1") || sInput.toLowerCase().match("hang")) {
                    sReply = "You quickly hang up and phone because the screaming on the other side is freaking you out. 'BANG! BANG! BANG!' suddently, someone started knocking hard on the door. You jumped out of sofa and then start finding a place to hide. \n 1. Under Sofa \n 2.In the Closet";
                    this.stateCur = GameState.HIDE;
                    break;
                } else {
                    sReply = "What is going on?? You asked, hello? you there? Who are you?..... You asked the person on the other side \n YOU KILLED ME, YOU THREW ME UPSIDE DOWN INTO A WELL! I AM COMING BACK FOR YOU, the person screamed on the other side. \n 'BANG! BANG! BANG!' suddently, someone started knocking hard on the door. You jumped out of sofa and then start finding a place to hide. \n 1. Under Sofa \n 2.In the Closet";
                    this.stateCur = GameState.HIDE;
                }
                break;

            case GameState.HIDE:
                if (sInput.toLowerCase().match("sofa") || sInput.toLowerCase().match("1") || sInput.toLowerCase().match("couch")) {
                    sReply = "You ran into your bed room and hide under the sofa, the door was slammed open by someone. However, following that was a long dead silence. Who is slamming the door? Why didn't she/he come in? Do you \n 1. Keep hiding \n 2. Go out to check";
                    this.stateCur = GameState.SOFACHOICE;
                    break;
                } else {
                    sReply = "You quickly ran to the closet in the living because it has a good viewing angle straight to the front door. As soon as you hide in the closet, the door was slammed open by someone. However, following that was a long dead silence. You decided to take a look and see an upside-down body floating at the front door. After five mintues, the body slowly started moving into bedroom, it is looking for you...\n 1. Wait for it to go and then run out of the door to seek help";
                    this.stateCur = GameState.DISCOVERY;
                }
                break;
            case GameState.SOFACHOICE:
                if (sInput.toLowerCase().match("1") || sInput.toLowerCase().match("keep") || sInput.toLowerCase().match("hid")) {
                    sReply = "You decided to wait longer and then contact the police. After 5 mintues, by the moon light, you noticed a shadow is approaching your bedroom door. The door was slowly opened, and then......\n You are looking straight at the body's face because it is floating upside down.  YOU ARE DEAD.";
                    this.stateCur = GameState.WAKE;
                    break;
                }

                else {
                    sReply = "You got out of the sofa and accidently hit your head on the edge, 'ouch!' you said, suddenly your bedroom door slammed open and you are looking straight at the body's face because it is floating upside down.  YOU ARE DEAD. \n Type Restart to play again."
                    this.stateCur = GameState.WAKE;
                    break;
                }

            case GameState.DISCOVERY:
                sReply = "As the body moved into the bed room, you sprinted out of the door as quickly as you can. Then you called the police in the middle of the street, and got saved. \n Later, you discovered that the house your parents recently bought is haunted. A maid was murdered by the house owner and he tossed her body upside down into the well trying to hide evidence. That is why the maid's body is floating upside down just like when she died. She came back at 12 o clock to seek for revenge. \n Game Over, You survived.";
                this.stateCur = GameState.WAKE;
                break;
        }

        return ([sReply]);
    }
}
