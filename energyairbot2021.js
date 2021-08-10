// @name         Energy Air 2021 Game Bot
// @version      1
// @description  Win tickets for the Energy Air 2021 automatically
// @author       ggmanugg, RoadJDK
// @match        *game.energy.ch/*
// @run-at       document-end
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js
// ==/UserScript==


const questions = {
	"IN WIE VIELEN LÄNDERN IST DAS KLEIDERGESCHÄFT TALLY WEIJL VERTRETEN?":"In 39 Ländern",
	"WO KANNST DU, UNTER ANDEREM, ENERGY AIR TICKETS GEWINNEN?":"Am Sender bei Radio Energy",
	"IN WELCHER LOCATION FINDET DAS ENERGY AIR 2021 UNTER FREIEM HIMMEL STATT?":"Stade de Suisse Wankdorf",
	"WIE HEISST DIE AKTUELLE KAMPAGNE GEGEN HASS IM INTERNET, WELCHE SWISSCOM MIT ENERGY LANCIERT HAT?":"Mute the hate",
	"WER WAR DER ALLERERSTE ACT IN DER GESCHICHTE DES ENERGY AIR?":"Bastian Baker",
	"WER WAR DER ÜBERRASCHUNGSACT AM ENERGY AIR 2018?":"Lo &amp; Leduc",
	"IN WELCHEM SCHWEIZER KANTON WURDE TALLY WEIJL 1984 GEGRÜNDET?":"Basel",
	"IN WELCHEM SCHWEIZER KANTON ERÖFFNETE TALLY WEIJL 1987 DEN ERSTEN STORE?":"Fribourg",
	"MIT WELCHER ZUSATZOPTION HAST DU DIE MÖGLICHKEIT, DIREKT VOR DER BÜHNE ZU STEHEN?":"XTRA Circle",
	"WIE LANGE DAUERTE DAS ENERGY AIR 2019?":"6 Stunden",
	"MUSIKGRÖSSEN AUS WIE VIELEN LÄNDERN WAREN AM ENERGY AIR 2019 DABEI?":"Aus 7 Ländern",
	"WANN IST DIE TICKETVERLOSUNG FÜRS ENERGY AIR 2021 GESTARTET?":"Am 2. August 2021",
	"WELCHE ZWEI ENERGY KULTFIGUREN MISCHTEN DAS ENERGY AIR 2017 RICHTIG AUF?":"Tinu &amp; Dänu",
	"WELCHE MUSIKERIN WURDE AM ENERGY AIR 2018 VON EINER 9-JÄHRIGE BESUCHERIN AUF DER BÜHNE GECOVERT?":"Namika",
	"NACH WELCHEM KRITERIUM WÄHLT DAS ENERGY TEAM DIE ACTS FÜR DAS ENERGY AIR AUS?":"Musiker*innen aus der aktuellen Energy Playlist",
	"WAS IST DAS PERFEKTE OPENAIR-OUTFIT?":'Egal, hauptsache du kannst darin tanzen',
	"WAS FOLGT AM DIESJÄHRIGEN ENERGY AIR ALS KRÖNENDER ABSCHLUSS?":"Aftershowparty",
	"UNTER WELCHEM MOTTO FEIERN WIR AM 4. SEPTEMBER 2021 DAS ENERGY AIR?":"We are back.",
	"WAS PASSIERT, WENN ES AM ENERGY AIR REGNET?":"Der Event findet trotzdem statt",
	"VON WELCHER MARKE WAR DAS MOTORRAD, MIT DEM LOCO ESCRITO AM LETZTEN ENERGY AIR ÜBER DIE BÜHNE FUHR?":"Harley-Davidson",
	"MIT WELCHEM ESC-HIT ROCKTE LUCA HÄNNI AM LETZTEN ENERGY AIR DIE BÜHNE?":"She Got Me",
	"WIE HEISST DER OFFIZIELLE INSTAGRAM-ACCOUNT DES ENERGY AIR?":"@energyair_official",
	"IN WELCHEN FARBEN TRITT DAS ENERGY AIR LOGO JÄHRLICH FÜR DAS SOMMERFINALE AUF?":"Blau und Weiss",
	"WAS WAR DAS ERSTE, WAS KÜNSTLER KNACKEBOUL NACH SEINEM AUFTRITT 2014 BACKSTAGE GEMACHT HAT?":"Mit seinem Mami ein kühles Bier getrunken",
	"WELCHER KÜNSTLER MUSSTE AM LETZTEN ENERGY AIR BACKSTAGE EINEN PART AUS DEM DIALEKTRAPSONG VON SANDRO VORRAPPEN?":"Stress",
	"WELCHER ACT FEIERTE AM LETZTEN ENERGY AIR MIT EINEM NEUEN SONG EINE WELTPREMIERE?":"Aloe Blacc",
	"WIE KANNST DU DEINE GEWINNCHANCEN BEI TICKETVERLOSUNGEN FÜR ENERGY EVENTS VERDOPPELN?":"Mit einer Energy One Membership",
	"WIE ALT MUSS MAN SEIN, UM OHNE ERWACHSENE BEGLEITUNG AM ENERGY AIR TEILZUNEHMEN?":"14 Jahre",
	"WELCHE STADT GEHÖRT SEIT AUGUST AUCH ZUR ENERGY FAMILIE UND WIRD AM ENERGY AIR VERTRETEN SEIN?":"Luzern",
	"MIT WELCHEM AUFBLASBAREN TIER KONNTEN ZWEI AUSERWÄHLTE AM LETZTEN ENERGY AIR ÜBER DIE GANZE MEUTE CROWDSURFEN?":"Schwan",
    	"WOMIT ERSCHIENEN DIE ENERGY MEIN MORGEN MODERATOREN MOSER UND SCHELKER AUF DER ENERGY AIR BÜHNE 2019?":"Mit Spielzeug-Pferden",
   	"WELCHES SCHWEIZER DJ-DUO SORGTE AM ENERGY AIR 2019 ZU BEGINN FÜR REICHLICH STIMMUNG?":"Averdeck",
    	"WIE HEISST DIE TRAM- UND BUSHALTESTELLE, WELCHE SICH DIREKT NEBEN DEM STADION WANKDORF BEFINDET?":"Wankdorf Center",
    	"WELCHEN KLEIDUNGSSTIL VERFOLGT TALLY WEIJL GRUNDSÄTZLICH?":"Just in time (voll im Trend)",
    	"WELCHER ACT WAR NOCH NIE AN EINEM ENERGY AIR DABEI?":"Cro",
    	"WIE WIRD TALLY WEIJL AUSGESPROCHEN?":"Talli Weil",
    	"IN WELCHER BELIEBTEN SERIE WAR TALLY WEIJL ZU SEHEN?":"Gossip Girl",
	"IN WELCHEM SCHWEIZER KANTON ERÖFFNETE TALLY WEIJL 1987 DEN ERSTEN STORE?":"Fribourg",
    	"Du hast die erste Hürde geschafft.":"Jetzt Tickets für das Energy Air gewinnen!"
}

function titleIs (title, selector = 'h1') {
	return document.getElementsByTagName(selector)[1].textContent === title
}

function currentQuestion () {
	if ($('h3.question-text').html() != null){
		return $('h3.question-text').html().toUpperCase()
	}
}

function nextQuestion () {
    window.clearTimeout(setTimeout);
    setTimeout(makeAction, Math.floor(Math.random() * (700 - 300) + 300))
    $('button#next-question').trigger('click')
    }

function answerQuestion () {
    window.clearTimeout(setTimeout);
    let curr = currentQuestion()
    console.log(curr, questions[curr])
    $('#answers .answer-wrapper').each((i, el) => {
        if ($(el).children('label').html() === questions[curr]) {
            $(el).children('input').trigger('click')
        }
    })
    setTimeout(nextQuestion, Math.floor(Math.random() * (300 - 100) + 100))
}

function makeAction () {
    window.clearTimeout(setTimeout);
	if (document.getElementsByTagName('h1')[1] != null){
		if (titleIs('Hinter welchem Logo verstecken sich die Tickets?')) {
			console.log('STEP: Memory')
			var star = Math.floor(Math.random() * 12) + 2;
			document.getElementsByTagName('img') [star].click();
			setTimeout(makeAction, Math.floor(Math.random() * (700 - 500) + 500))
		} else if ($('h1:contains("verloren")')) {
            	if ($('p:contains("Starte das Spiel neu.")').length) {
                    setTimeout(makeAction, Math.floor(Math.random() * (1000 - 600) + 600))
                    $('button:contains("Erneut")').trigger('click')
                    console.clear()
                }
            else {
                setTimeout(makeAction, Math.floor(Math.random() * (1500 - 600) + 600))
                document.getElementById('lose').click()
                console.clear()
            }
		}
	}
    else if ($('button:contains("Jetzt Tickets für das Energy Air gewinnen!")').length) {
			$('button:contains("Jetzt Tickets für das Energy Air gewinnen!")').trigger('click')
			setTimeout(makeAction, Math.floor(Math.random() * (2000 - 600) + 600))
	}
    else if ($('button:contains("Game starten")').length) {
			$('button:contains("Game starten")').trigger('click')
			setTimeout(makeAction, Math.floor(Math.random() * (3000 - 600) + 600))
    }
	else {
		answerQuestion()
	}
}

(function() {
    'use strict';

    console.log('starting...')
    makeAction()
})();
