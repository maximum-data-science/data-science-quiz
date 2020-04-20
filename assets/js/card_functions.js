/* globals $:false */
"use strict";
/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function divideCards() {
    $("div.file").each(function(i, file) {
        var children = $(file).find("h1");
        $(children).wrap(function() {
            return "<div class='question'></div>";
        });
    });
    $("div.file").each(function(i, file) {
        var children = $(file).find(".question");
        $(children).each(function(j, child) {
            var siblings = $(child).nextUntil(".question");
            $(siblings).wrapAll(function() {
                return "<div class='answer'></div>";
            });
        });
    });
    $("div.file").each(function(i, file) {
        var children = $(file).find(".question");
        $(children).each(function(j, child) {
            var sibling = $(child).next(".answer");
            $(child)
                .add(sibling)
                .wrapAll(function() {
                    return "<div class='card'></div>";
                });
        });
    });
}
function insertNumPointsLabels() {
    $("div.card").each(function(i, card) {
        var children = $(card).children(".question");
        $(children).each(function(j, child) {
            var siblings = $(child)
                .siblings(".answer")
                .first();
            var num_points = $(siblings).find("li").length;
            var str_points =
                num_points > 1 ? `(${num_points} Points)` : "(1 Point)";
            $(child)
                .first()
                .append("<label class='num-points'>" + str_points + "</label>");
        });
    });
}
function insertCardLabels() {
    $("div.card").each(function(i, card) {
        $("<label class='cart'>Card " + i + "</label>").insertBefore(card);
    });
}

function getCardsCsv() {
    return $("div.card")
        .map(function(i, card) {
            if (
                !$(card).children(".question").length ||
                !$(card).children(".answer").length
            ) {
                return `"Card ${i} question or answer undefined.","Card ${i} question or answer undefined."`;
            }

            var htmlQuestion = $(card)
                .children(".question")
                .html();
            var htmlAnswer = $(card)
                .children(".answer")
                .html();

            var strQuestion = htmlQuestion.replace(/["]/g, "'");
            var strAnswer = htmlAnswer.replace(/["]/g, "'");
            return `"${strQuestion}","${strAnswer}"`;
        })
        .get()
        .join("\n");
}

function initCsvExportElements(html) {
    $("textarea.csv-preview").val(html);

    $("a#download-csv").click(function() {
        $(this).attr(
            "href",
            "data:text/plain;charset=utf-8," +
                encodeURIComponent($("textarea.csv-preview").val())
        );
        $(this).attr("download", "export.csv");
    });
}
