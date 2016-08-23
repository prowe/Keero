
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
    document.querySelectorAll('[data-populate-modifier]')
        .forEach(e => {
            var statName = e.attributes.getNamedItem('data-populate-modifier').value;
            e.textContent = getAbilityModifier(statName);
        });
}

function populateEvalForContent() {
    document.querySelectorAll('[data-eval-for-content]')
        .forEach(e => {
            var exp = e.attributes.getNamedItem('data-eval-for-content').value;
            e.textContent = eval(exp);
        });
}

document.onreadystatechange = function(e) {
    populateModifierElements();
    populateEvalForContent();
}