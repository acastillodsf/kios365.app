export const formatTurno = (letra, numero) => {
  return `${letra}${String(numero).padStart(2, "0")}`;
};
export const handlePrint = ({ alfa, secuencia, departamento, servicio, cedula, fecha }) => {
  const printWindow = `
        <html>
          <head>
            <title>Ticket</title>
            <style>
              body { text-align: center; font-family: Arial, sans-serif; }
              .ticket-container { padding: 0px; border: 0.01px solid black;width: 100%; display: inline-block; }
              .logo { width: 80%; margin-bottom: 10px;margin-top:20px;filter: grayscale(100%); }
              .ticket-number { font-size: 48px; font-weight: bold; }
              .service-cedula { font-size: 18px; margin-top: 10px; }
              .service-departamento { font-size: 18px; margin: 0px; }
              .service-servicio { font-size: 18px; margin: 0px; }
              service-fecha { font-size: 18px; margin-top: 5px; }
            </style>
          </head>
          <body>
            <div class="ticket-container">
              <img src="/images/cooppropes.png" class="logo" alt="LogoApp" />
              <h1 class="ticket-number">${formatTurno(alfa, secuencia)}</h1>
              <p class="service-cedula">${cedula}</p>
              <p class="service-departamento">${departamento}</p>
              <p class="service-servicio">${servicio}</p>
              <p class="service-fecha">${fecha}</p>
            </div>
            <script>
              window.onload = function() {
                window.print();
                setTimeout(() => { window.close(); }, 1000);
              }
            </script>
          </body>
        </html>
      `;

  const pri = document.getElementById("ifmcontentstoprint").contentWindow;
  pri.document.open();
  pri.document.write(printWindow);
  pri.document.close();
};

