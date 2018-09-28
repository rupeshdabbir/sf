/**
 * Created by rdabbir on 8/14/17.
 */


/*
 * This is the algorithm to run and understand if the given word falls under the following categories:
 * 1) Good.
 * 2) Poor.
 * 3) Fair
 * 4) Not a jumble.
 */

/* Rules set */
const rules = ['AI','AY','EA','EE','EO','IO','OA','OO','OY','YA','YO','YU','BL','BR','CH','CK','CL','CR','DR','FL','FR','GH',
    'GL','GR','KL','KR','KW','PF','PL','PR','SC','SCH','SCR','SH','SHR','SK','SL','SM','SN','SP','SQ','ST','SW','TH','THR','TR','TW','WH','WR'];
const rulesSet = new Set(rules); //For O(1) access

const vowels = ['a','e','i','o','u','y'];
const vowelsSet = new Set(vowels); //For O(1) read

const consonents = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'z'];
const consonentsSet = new Set(consonents);

//Double Consonents are also allowed i.e words not in Vowel.


// -------------------------------- //
/* Business Logic */

function jumbleWord(original, scrambled){

    // let original = origina.split('');
    // let scrambled = scrambled.split('');

    let good = false;
    let poor = false;
    let fair = false;
    let real = false;

    //Convert everything to lowercase
    original = original.toLowerCase();
    scrambled = scrambled.toLowerCase();


    if(isSameWord(original, scrambled)){ //Check for Not
        //Some sort of logging mechanism to log the type of input.
        return "not";
    };


    const testForGood = isGood(original, scrambled);
    const Real = isReal(original, scrambled);


    if(testForGood && Real){ //Check for Good
        good = true;
        return "good";
    } else if(!real & checkPoor){ //Check for Poor
        poor = true;
        return "poor";
    } else {
        fair = true;
        return "fair"
    }

}


/* function to determine if it's the same word */

function isSameWord(w1,w2){
    return w1.split(w2).toString() === ",";
}

/* Rules for good */

function isGood(w1, w2){

    let place = true; //lets imagine that it's scrambled.

    for (let i=0; i<w2.length; i++){
        let curW1 = w1[i];
        let curW2 = w2[i];

        //Rule: None of it's letters are in the correct place.
        if(curW1 == curW2) {
            place = false; //correct place found!
            return false;
        }
    }

    return place;
}

//Check for Real
// Rules:
// Alternate between vowel and consonent
// Must be in rulesIndex (map)
// Double consonents are allowed

// Time-complexity: This is O(N) O(1*K) where (K=number of letters)
function isReal(w1, w2){

    let real = false;

    for(let i=0; i<w2.length; i++){
        let current = w2[i];
        let currentNext = w2[i+1];
        let combinedTwo = current+currentNext;
        let combinedThree = current+currentNext+w2[i+2];

        //Vowel-Consonent (or) consonent-Vowel
        if( ( (vowelsSet.has(current) && consonentsSet.has(currentNext)) || (consonentsSet.has(current) && vowelsSet.has(currentNext)) ) ||
            (rulesSet.has(combinedTwo) || rulesSet.has(combinedTwo) || //If the Two or three are present in rulesset
                (consonentsSet.has(current) && consonentsSet.has(currentNext)) //if two consonents repeat NN or ZZ
            )  //Rules are present in ruleset
        ){
            real = true;
        }
    }
    return real;
}

/* Check for Poor */
function checkPoor(w1, w2){
    let poor = false;

    if(w1[0] === w2[0]){
        poor = true;
        return poor;
    }

    for (let i=0; i<w2.length; i++){
        const curW1 = w1[i];
        const curW2 = w2[i];

        //Rule: None of it's letters are in the correct place.
        if(curW1 == curW2) {
            poor = true; //correct place found!
            break;
        }
    }

    return poor;
}

// If it's node, then..
// export function jumbleWord(){
//     return jumbleWord();
// }

export default jumbleWord;

/* Test cases */

const word1 = "irony";
const word2 = "onyri";


// console.log(jumbleWord(word1, word2));
