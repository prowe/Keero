
function getBaseStat(statName) {
    return parseInt(document
        .querySelector(`[data-base-stat=${statName}]`)
        .textContent, 10);
}

function getStat(statName) {
    var baseStat = getBaseStat(statName);
    //TODO: find and apply modifiers
    return baseStat;
}

function getAbilityModifier(statName) {
    return Math.trunc(getStat(statName) / 2) - 5
}

function populateModifierElements() {
    [].slice.call(document.querySelectorAll('[data-populate-modifier]'))
        .forEach(function (e) {
            var statName = e.attributes.getNamedItem('data-populate-modifier').value;
            e.textContent = getAbilityModifier(statName);
        });
}

function populateEvalForContent() {
    [].slice.call(document.querySelectorAll('[data-eval-for-content]'))
        .forEach(function (e) {
            var exp = e.attributes.getNamedItem('data-eval-for-content').value;
            e.textContent = eval(exp);
        });
}

function registerRollExpressionHandlers() {
    [].slice.call(document.querySelectorAll('.roll-expression'))
        .forEach(function (e) {
            var exp = e.textContent;
            exp = exp.replace(/\+\s*0/g, ''); //fix adding 0
            //try {
            var de = new DiceExpression(exp);
            e.onclick = function (e) {
                e.preventDefault();
                var roll = de.roll();
                alert('result: ' + roll.roll + " = " + roll.diceRaw);
                return false;
            };
            // } catch (err) {
            //     err.message = `unable to parse expression ${exp}: ${err.message}`;
            //     throw err;
            // }
        });
}

document.onreadystatechange = function (e) {
    populateModifierElements();
    populateEvalForContent();
    registerRollExpressionHandlers();
}

let financialLedger = [
    {
        description: "Balance forward",
        gp: 125
    },
    {
        description: "Expenses in Sharn",
        gp: -7
    },
    {
        description: "Reward for retrieving medallion for MMM",
        pp: 10
    }
];

var app = new Vue({
    el: '#characterSheet',
    data: {
        financialLedger: financialLedger
    },
    computed: {
        financialSummary: function() {
            console.log(this.financialLedger);
            var aggregate = {
                pp: 0,
                gp: 0,
                sp: 0
            };
            this.financialLedger.forEach(function(item) {
                aggregate.pp = aggregate.pp + (item.pp || 0);
                aggregate.gp = aggregate.gp + (item.gp || 0);
            });
            return aggregate;
        }
    }
})