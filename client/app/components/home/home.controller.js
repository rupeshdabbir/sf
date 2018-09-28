import jumbleWord from './jumble-algo';

class HomeController {
  constructor() {
    this.name = 'home';
    let output = [], outputstr ="", input = [];

	$( document ).ready(function() { //when jquery is ready

	    $('#evaluate').on('click', function(){
	        const lines = $('textarea').val().split('\n');
	        input = lines;
	        console.log(lines);
	        for(var i = 0;i < lines.length;i=i+2){
	            let word1 = lines[i];
	            let word2 = lines[i+1];
	            output.push(jumbleWord(word1, word2));
	        }

	        for(let j=0; j<lines.length/2; j++){
	            let originalWord1 = lines[j];
	            let originalWord2 = lines[j+1];
	            let result = output[j];
	            outputstr += originalWord2 +" is a "+ result + " scramble of "+originalWord1;
	        }
	        $("li").append(outputstr);
	    });

	});
  }
}

export default HomeController;
