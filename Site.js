// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

function CalculateNetGain(Result, Tax) {
    var Net = 0;
    if (Result > 0) Net = (Result - Tax).toFixed(2);
    $("#Net").val(Net);
}

function CalculateTax() {
    var Result = Number($("#Result").val())
    var Tax = 0;
    var PercTax = Number($("#PercTax").val());
    if (Result > 0) Tax = (Result * PercTax / 100).toFixed(2);
    $("#Tax").val(Tax);
    CalculateNetGain(Result, Tax);
}

function CalculateResult(TotalBuy, TotalSell) {
    var Result = (TotalSell - TotalBuy).toFixed(2);
    $("#Result").val(Result);
    CalculateTax();
}

function SetPercTOBBuy(Value) {
    $("#PercTOBBuy").val(Value);
}

function SetPercTOBSell(Value) {
    $("#PercTOBSell").val(Value);
}

function ChangeInputReadOnly(Id, Bool) {
    document.getElementById(Id).disabled = Bool;
}

function GetMaxTOB() {

    switch ($("#Type :selected").val()) {
        case "1":
            return 1600;
        case "2":
            return 4000;
        default:
            return 0;
    }

}

function DivsHide(Id, Bool) {
    var x = document.getElementById(Id);
    if (Bool == true) x.style.display = "none";
    else x.style.display = "block";
}



function CalculateBuy() {
    var MaxTOB = GetMaxTOB();
    var PercTOBBuy = Number($("#PercTOBBuy").val());

    var BuySharesPrice = Number(Number($("#SharesBuy").val()) * Number($("#PriceBuy").val()));
    var TOB = Number((BuySharesPrice * PercTOBBuy / 100).toFixed(2));

    if (TOB > MaxTOB) TOB = MaxTOB;

    $("#TOBBuy").val(TOB);

    var CommissionBuy = Number($("#CommissionBuy").val());

    var TotalBuy = Number((BuySharesPrice + TOB + CommissionBuy).toFixed(2));

    $("#ResultBuy").val(TotalBuy);

    CalculateResult($("#ResultBuy").val(), $("#ResultSell").val());
}
function CalculateSell() {
    var MaxTOB = GetMaxTOB();
    var PercTOBSell = Number($("#PercTOBSell").val());

    var SellSharesPrice = Number($("#SharesSell").val() * $("#PriceSell").val());
    var TOB = Number((SellSharesPrice * PercTOBSell / 100).toFixed(2));

    if (TOB > MaxTOB) TOB = MaxTOB;

    $("#TOBSell").val(TOB);

    var CommissionSell = Number($("#CommissionSell").val());
    var TotalSell = Number((SellSharesPrice - TOB - CommissionSell).toFixed(2));

    $("#ResultSell").val(TotalSell);

    CalculateResult($("#ResultBuy").val(), $("#ResultSell").val());
}

function ChangeCurrency() {
    var elems = document.getElementsByClassName("SelectedCurrency");

    for (index = 0; index < elems.length; index++) {
        elems[index].textContent = $("#Currency :selected").val();
    }
}

function TypeChanged() {

    switch ($("#Type :selected").val()) {
        case "1":
            ChangeInputReadOnly("PercTOBBuy", false);
            DivsHide("SicavTax", true);
            SetPercTOBBuy(0.35);
            SetPercTOBSell(0.35);
            break;
        case "2":
            ChangeInputReadOnly("PercTOBBuy", true);
            DivsHide("SicavTax", false);
            SetPercTOBBuy(0);
            SetPercTOBSell(1.32);
            break;
        default:
            break;
    }
    CalculateBuy();
    CalculateSell();
}

function validate(evt) {
    var theEvent = evt || window.event;

    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key)

    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }

    var input = $("#" + theEvent.target["id"]).val();

    if (key == "." && input.includes(".")) theEvent.returnValue = false;
}