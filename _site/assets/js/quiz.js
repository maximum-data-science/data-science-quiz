/* globals $:false */
"use strict";

var STATE = {
    INIT: 0,
    VIEW_QUESTION: 1,
    VIEW_ANSWER: 2,
    END: 3
};
var round = {
    totalCardIds: [],
    knownCardIds: [],
    unseenCardIds: []
};
var game = {
    totalCardIds: [],
    knownCardIds: [],
    unseenCardIds: []
};
var currentCardId = -1;

function initGame(cards, lastRoundKnownCardIds) {
    var totalCardIds = $(cards)
        .map(function(i, o) {
            return i;
        })
        .get();
    shuffleArray(totalCardIds);
    game.totalCardIds = totalCardIds.slice();
    game.knownCardIds = lastRoundKnownCardIds;
    game.unseenCardIds = totalCardIds.filter(function(cardId) {
        return !lastRoundKnownCardIds.includes(cardId);
    });
}
function initRound(game, numCardsInRound) {
    var roundCardIds = game.unseenCardIds.slice(-numCardsInRound);
    round.totalCardIds = roundCardIds.slice();
    round.knownCardIds = [];
    round.unseenCardIds = roundCardIds.slice();
}
function advanceQuestions() {
    if (round.unseenCardIds.length > 0) {
        currentCardId = round.unseenCardIds.pop();
        game.unseenCardIds.pop();
        updateView(STATE.VIEW_QUESTION);
    } else {
        updateView(STATE.END);
    }
}
function getInfoText(subject, numKnownCards, numTotalCards) {
    var rate =
        numTotalCards > 0
            ? Math.round((numKnownCards / numTotalCards) * 100)
            : 100;
    return `${subject}: ${numKnownCards} (${rate}%) of ${numTotalCards} cards were known.`;
}
function updateElementValues() {
    var roundSummaryText = getInfoText(
        "Round",
        round.knownCardIds.length,
        round.totalCardIds.length
    );
    $("#roundSummary").text(roundSummaryText);

    var gameSummaryText = getInfoText(
        "Game",
        game.knownCardIds.length,
        game.totalCardIds.length
    );
    $("#gameSummary").text(gameSummaryText);
    var input = $("input#numCardsInRound");
    var numUnknown = game.totalCardIds.length - game.knownCardIds.length;
    $("input#numCardsInRound").attr("max", numUnknown);
    var val = $("input#numCardsInRound").val();
    if (val > numUnknown) {
        $("input#numCardsInRound").val(numUnknown);
    }
}

function updateView(state) {
    var currentCard = $("div.card").get(currentCardId);
    var currentQuestion = $("div.question").get(currentCardId);
    var currentAnswer = $("div.answer").get(currentCardId);

    console.log("state", state);
    var viewCard = [STATE.VIEW_QUESTION, STATE.VIEW_ANSWER].includes(state);
    var viewResults = [STATE.INIT, STATE.END].includes(state);

    $("div.setup").toggle(viewResults);
    $("#start").toggle(viewResults && game.unseenCardIds.length > 0);

    $("div.deck").toggle(viewCard);
    $("div.card")
        .not(currentCard)
        .hide();
    $(currentCard).toggle(viewCard);
    $(currentQuestion).toggle(viewCard);
    $(currentAnswer).toggle(state === STATE.VIEW_ANSWER);

    $("#show-answer").toggle(state === STATE.VIEW_QUESTION);
    $("#known").toggle(viewCard);
    $("#unknown").toggle(viewCard);
    $("#reset").toggle(viewResults && game.knownCardIds.length > 0);
    $("#save").toggle(state === STATE.END && game.knownCardIds.length > 0);

    updateElementValues();
}
function getLastRoundKnownCardIds() {
    var cookies = Cookies.get();
    var hasCookies =
        Object.keys(cookies).length !== 0 || cookies.constructor !== Object;

    if (hasCookies) {
        var json_str = cookies["knownCardIds"];
        var knownCardIds = JSON.parse(json_str);
        return knownCardIds;
    }
    return [];
}

$(document).ready(function() {
    divideCards();

    var cards = $("div.card");
    var numCardsInRound = $("input#numCardsInRound").val();
    console.log("numCardsInRound:", numCardsInRound);

    var lastRoundKnownCardIds = getLastRoundKnownCardIds();
    initGame(cards, lastRoundKnownCardIds);
    initRound(game, numCardsInRound);

    console.log("game:", game);
    console.log("round:", round);
    updateView(STATE.INIT);
});

$("#start").click(function() {
    var numCardsInRound = $("input#numCardsInRound").val();
    initRound(game, numCardsInRound);
    currentCardId = round.unseenCardIds.pop();
    game.unseenCardIds.pop();
    updateView(STATE.VIEW_QUESTION);
});
$("#show-answer").click(function() {
    updateView(STATE.VIEW_ANSWER);
});

$("#known").click(function() {
    round.knownCardIds.push(currentCardId);
    game.knownCardIds.push(currentCardId);
    advanceQuestions();
});

$("#unknown").click(function() {
    advanceQuestions();
});
$("#save").click(function() {
    var json_str = JSON.stringify(game.knownCardIds);
    Cookies.set("knownCardIds", json_str);
    alert("Cookie saved.");
    updateView(STATE.END);
});
$("#reset").click(function() {
    Cookies.remove("knownCardIds");
    location.reload();
});
