let historial = [];
let sumas = [];

function simular() {
    historial = [];
    sumas = [];

    const dados = parseInt(document.getElementById("dados").value);
    const lanzamientos = parseInt(document.getElementById("lanzamientos").value);

    for (let i = 0; i < lanzamientos; i++) {
        let tiro = [];
        let suma = 0;
        for (let j = 0; j < dados; j++) {
            let valor = Math.floor(Math.random() * 6) + 1;
            tiro.push(valor);
            suma += valor;
        }
        historial.push(tiro);
        sumas.push(suma);
    }

    const frecuencias = {};
    sumas.forEach(suma => {
        frecuencias[suma] = (frecuencias[suma] || 0) + 1;
    });

    const masFrecuente = Object.entries(frecuencias).reduce((a,b) => b[1] > a[1] ? b : a);
    document.getElementById("resultado").innerText = `Suma más frecuente: ${masFrecuente[0]} (${masFrecuente[1]} veces)`;

    mostrarHistorial();
}

function mostrarHistorial() {
    const div = document.getElementById("historial");
    div.innerHTML = ""; // Limpiar historial previo

    historial.forEach((tiro, index) => {
        const suma = tiro.reduce((a,b)=>a+b,0);
        const p = document.createElement("p");
        p.textContent = `Lanzamiento ${index+1}: [${tiro.join(", ")}] = ${suma}`;
        div.appendChild(p);
    });
    
}
function mostrarMenorMayor() {
    if (sumas.length === 0) {
        alert("Primero debes simular los lanzamientos.");
        return;
    }

    const menor = Math.min(...sumas);
    const mayor = Math.max(...sumas);

    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerText += `\nSuma menor: ${menor}, Suma mayor: ${mayor}`;
}

let graficoInstancia;

function verHistograma() {
    const ctx = document.getElementById('grafico').getContext('2d');
    const datos = {};
    sumas.forEach(suma => {
        datos[suma] = (datos[suma] || 0) + 1;
    });

    const etiquetas = Object.keys(datos).sort((a,b)=>a-b);
    const valores = etiquetas.map(e => datos[e]);

    if (graficoInstancia) graficoInstancia.destroy();

    graficoInstancia = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: etiquetas,
            datasets: [{
                label: 'Frecuencia de sumas',
                data: valores,
                backgroundColor: '#db15b0ff'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 }
                }
            }
        }
    });
}