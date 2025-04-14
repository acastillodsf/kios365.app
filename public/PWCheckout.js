
PWCheckout.Bind("tokenCreated", OnTokenReceived);
    PWCheckout.SetProperties({
        "name": "Tu Cooperativa Digital",
          "email": "soporte@coopquisqueya.com",
          "image": "https://www.coopquisqueya.com/wp-content/uploads/2022/03/Disen%CC%83o-sin-ti%CC%81tulo-34.png",
          "button_label": "Registrar #monto#",
          "currency": "DOP",
          "amount": "",
          "lang": "ESP",
          "form_id": "form_1",
          "checkout_card": 1,
          "autoSubmit": "false",
          "empty": "false"
    });

    function OnTokenReceived(token) {
        // window.location.href="#/refres="+token.TokenId;
        window.location.reload()
    }

    var UniqueId = document.getElementById("carnettokenUniqueID").value;
    var captureUrl = document.getElementById("carnettokencaptureUrl").value;
    var capturepk = document.getElementById("carnettokencapturePublickey").value;
    

    document.getElementById("btnCheckout").addEventListener("click", function (event) {
        event.preventDefault(); 
        PWCheckout.OpenIframeCustom(captureUrl + "?key=" + capturepk + "&session_id=" + UniqueId, UniqueId);
    });