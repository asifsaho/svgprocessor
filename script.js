(function(){
	function processSVG(){
		var svg = document.querySelector('#raw-svg').value;
		var svgforcss = document.querySelector('#cssreadysvg');
		var cssreadysvgoninput = document.querySelector('#cssreadysvgoninput');

		// Replace the Declaration
		var proecssedSource = svg.replace(new RegExp(/<\?xml.*\?>/), '');

		// Remove all comments
		var proecssedSource = proecssedSource.replace(new RegExp(/<!-- .* -->/ig), '');

		// Remove all hash with URL encoded code
		var proecssedSource = proecssedSource.replace(new RegExp(/#/ig), '%23');

		// Remove all whitespace
		var proecssedSource = proecssedSource.replace(new RegExp(/\r?\n|\r/ig), '');

		// Remove all tabs
		var proecssedSource = proecssedSource.replace(new RegExp(/\t/ig), '');

		// Remove andular bracket with html entity
		var proecssedSource = proecssedSource.replace(new RegExp(/</ig), '%3C').replace(new RegExp(/>/ig), '%3E');


		var cssvalue = `url(\'data:image/svg+xml, ${proecssedSource}\')`;

		svgforcss.innerHTML = `<code>background-image: ${cssvalue}</code>`;
		cssreadysvgoninput.value = `background-image: ${cssvalue}`;
		
		document.querySelector('#svgdisplay div').style.backgroundImage = cssvalue;

		return cssvalue;
	}


	function copySVG(){
		cssreadysvgoninput.select();
		document.execCommand('Copy')
	}


	window.addEventListener('load', function(){
		var svgInput = document.querySelector('#raw-svg')

		svgInput.addEventListener('keyup', function(){
			processSVG();
		})

		
		var copyBtn = document.querySelector('#copyBtn')

		copyBtn.addEventListener('click', function(){
			copySVG();
			swal('Copied!', 'Background CSS rule copied to clipboard successfully', 'success');
		});
	})
})()