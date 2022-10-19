// ==UserScript==
// @name         Star atlas
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://play.staratlas.com/fleet
// @icon         https://www.google.com/s2/favicons?sz=64&domain=staratlas.com
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @grant        none
// ==/UserScript==

var ATLAS_PRICE = 0;

(function() {
    'use strict';
    getPrice();
    setInterval(function() {
        getPrice();
    }, 1000*60*30);

    setInterval(function() {
        var lowest = 100
        $("div[class*='ProgressBarstyles__BarSlider-']").each(function() {
            var percent = parseFloat($(this).css("width")) * 100 / parseFloat($(this).parent().css("width"))
            if(lowest > percent) {
                lowest = percent;
            }
            document.title = lowest.toFixed(2) + "%";
        });

        $("span[class*='FleetRewardsTextstyles__FleetRewardsValue']").each(function() {
            var atlas = parseFloat($(this).text());
            if(!$(this).data("txt")) {
                $(this).append("<span style='font-size: 13px;color:rgba(163, 161, 172, 0.5);margin-left: 5px;float:right;'></span>");
                $(this).data("txt", "txt")
            }
            $(this).find("span").html((atlas * ATLAS_PRICE).toFixed(2) + "$");
        });
    }, 1000);
})();

function getPrice() {
    $.ajax({
        url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=star-atlas",
        context: document.body
    }).done(function(data) {
        ATLAS_PRICE = data[0]['current_price'];
    });
}
