function obtenerYAgregarRegistros2() {
    console.log("actualziandose");
    fetch("https://sheet.best/api/sheets/ef7150db-3f89-42e9-8abd-790a804eab30")
        .then((response) => response.json())
        .then((data) => {
            console.log(data)

            const registrosHoy = data.filter((fila) => esFechaHoy(fila.fecha) ); 

            agregarRegistros("alba-registros", registrosHoy.filter((registro) => registro.domicilio.startsWith("IkFMQkE")));
            agregarRegistros("caballeros-registros", registrosHoy.filter((registro) => registro.domicilio.startsWith("IkNBQkFMTEVST1M")));
            agregarRegistros("esmeralda-registros", registrosHoy.filter((registro) => registro.domicilio.startsWith("IkVTTUVSQUxEQS")));
            agregarRegistros("eros-registros", registrosHoy.filter((registro) => registro.domicilio.startsWith("IkVST1M")));
            agregarRegistros("magdalena-registros", registrosHoy.filter((registro) => registro.domicilio.startsWith("Ik1BR0RBTEVOQS")));
            agregarRegistros("ibiza-registros", registrosHoy.filter((registro) => registro.domicilio.startsWith("IklCSVpBI")));
            agregarRegistros("hierro-registros", registrosHoy.filter((registro) => registro.domicilio.startsWith("IkhJRVJSTy")));
        })
        .catch((error) => {
            console.error(error);
        });
}

function obtenerFechaObj(fechaTexto) {
    if (!fechaTexto) {
        return null;
    }

    const partes = fechaTexto.split('-');
    const año = parseInt(partes[0]);
    const mes = parseInt(partes[1]) - 1;
    const dia = parseInt(partes[2]);

    return new Date(año, mes, dia);
}

function esFechaHoy(fechaComparar) {
    if (!fechaComparar) {
        return false;
    }

    const fechaCompararObj = obtenerFechaObj(fechaComparar);
    const fechaActual = new Date();
    return fechaCompararObj && fechaCompararObj.toDateString() === fechaActual.toDateString();
}

function agregarRegistros(contenedorId, registros) {
    const contenedor = document.getElementById(contenedorId);
    registros.forEach((registro, index) => {
        if (!registro.cierre && !document.getElementById(`div${registro.idunico}`)) {
            const registroHTML =
                `<div id="div${registro.idunico}" class="registro-item">
                <p><strong>Domicilio:</strong> ${atob(registro.domicilio)}</p>
                <p><strong>Nombre:</strong> ${registro.namevisita}</p>
                <p><strong>Fecha:</strong> ${registro.fecha}</p>
                <p><strong>Tipo:</strong> ${registro.tipo}</p>
                <div id="registro-${registro.idunico}">
                    <div class="contenedor-input">
                        <div class="contenedor" id="registroentarda-${registro.idunico}" style="${registro.fechaentrada ? 'display:none;' : 'display:block;'}">
                            <label for="placa-${registro.idunico}">Placa Vehicular:</label>
                            <input type="text" id="placa-${registro.idunico}" name="placa-${registro.idunico}">
                            <label for="marca-${registro.idunico}">Marca:</label>
                            <input type="text" id="marca-${registro.idunico}" name="marca-${registro.idunico}">
                            <label for="modelo-${registro.idunico}">Modelo:</label>
                            <input type="text" id="modelo-${registro.idunico}" name="modelo-${registro.idunico}">
                            <label for="color-${registro.idunico}">Color:</label>
                            <input type="text" id="color-${registro.idunico}" name="color-${registro.idunico}">
                            <label for="personasenvhe-${registro.idunico}">Personas abordo entrando:</label>
                            <input type="number" id="personasenvhe-${registro.idunico}" name="personasenvhe-${registro.idunico}" min="0">
                            <p></p>
                            <button id="entro-${registro.idunico}" data-registro-id="${registro.idunico}" ${registro.fechaentrada ? 'disabled' : ''} onclick="toggleEntrada(${registro.idunico})">
                            ${registro.fechaentrada ? 'Entrada registrada' : 'Registrar Entrada'}
                            </button>
                        </div>
                        <div id="datosycapturados-${registro.idunico}" class="contenedor">
                            <div class="fecha-entrada" id="fecha-entrada-${registro.idunico}" style="display:block;">${registro.fechaentrada ? 'Fecha de entrada: ' + registro.fechaentrada : ''}</div>
                            <div class="placa-vehicular" id="placa-vehicular-${registro.idunico}" style="display:block;" onclick="editField('placa-vehicular-${registro.idunico}')">${registro.placa ? 'Placa Vehicular: ' + registro.placa : ''}</div>
                            <div class="marca" id="marca-${registro.idunico}" style="display:block;" onclick="editField('marca-${registro.idunico}')">${registro.marca ? 'Marca: ' + registro.marca : ''}</div>
                            <div class="modelo" id="modelo-${registro.idunico}" style="display:block;" onclick="editField('modelo-${registro.idunico}')">${registro.modelo ? 'Modelo: ' + registro.modelo : ''}</div>
                            <div class="color" id="color-${registro.idunico}" style="display:block;" onclick="editField('color-${registro.idunico}')">${registro.color ? 'Color: ' + registro.color : ''}</div>
                            <div class="personasenvhe" id="personasenvheo-${registro.idunico}" style="display:block;" onclick="editField('personasenvhe-${registro.idunico}')">${registro.personasenvhe ? 'Personas abordo entrando: ' + registro.personasenvhe : ''}</div>
                            <div class="personasenvhe" id="fecha-salida-${registro.idunico}" style="display:block;" onclick="editField('personasenvhe-${registro.idunico}')">${registro.fechasalida ? 'Fecha Salida ' + registro.fechasalida : ''}</div>
                        </div>
                        <div class="contenedor" id="registrosalida-${registro.idunico}">
                            <div id="salidapersonas-${registro.idunico}">
                                <p>
                                <label for="personasenvhs-${registro.idunico}">Personas abordo salida:</label>
                                <input type="number" id="personasenvhs-${registro.idunico}" name="personasenvhs-${registro.idunico}" min="0">
                                <p>
                                <button class="salio" id="salio-${registro.idunico}" data-registro-id="${registro.idunico}">Registrar Salida</button>
                            </div>
                            <button class="terminar-registro" data-registro-id="${registro.idunico}">Terminar Servicio</button>
                        <div>

                    </div>
                </div>
            </div>`;
            contenedor.insertAdjacentHTML('beforeend', registroHTML);
        }
    });

    contenedor.addEventListener('click', function(event) {
        const target = event.target;

        if (target.matches('button[id^="entro-"]')) {
            const registroId = target.getAttribute('data-registro-id');
            const fechaEntradaDiv = document.getElementById(`fecha-entrada-${registroId}`);
            const fechaActual = new Date().toLocaleString();
        
            if (!target.disabled) {
                const placaInput = document.getElementById(`placa-${registroId}`).value;
                const marcaInput = document.getElementById(`marca-${registroId}`).value;
                const modeloInput = document.getElementById(`modelo-${registroId}`).value;
                const colorInput = document.getElementById(`color-${registroId}`).value;
                const personasenvheInput = document.getElementById(`personasenvhe-${registroId}`).value;
                
                if (placaInput.trim() !== '' && marcaInput.trim() !== '' && modeloInput.trim() !== '' && colorInput.trim() !== '' && personasenvheInput.trim() !== '') {
                    const placa = placaInput;
                    const marca = marcaInput;
                    const modelo = modeloInput;
                    const color = colorInput;
                    const personasenvhe = personasenvheInput;
                    
                    fechaEntradaDiv.textContent = `Fecha de entrada: ${fechaActual}`;
                    fechaEntradaDiv.style.display = 'block';
                    
                    target.disabled = true;
            
                    enviarFechaEntrada(registroId, placa, marca, modelo, color, personasenvhe, fechaActual);
                } else {
                    alert('Por favor, complete todos de entarda');
                }
            } else {
                fechaEntradaDiv.textContent = '';
                fechaEntradaDiv.style.display = 'none';
            }
        } else if (target.matches('button[id^="salio-"]')) {
            const registroId = target.getAttribute('data-registro-id');
            const personasenvhs = document.getElementById(`personasenvhs-${registroId}`).value;
            const fechaActual = new Date().toLocaleString();

            const fechaSalidaDiv = document.getElementById(`fecha-salida-${registroId}`);
            if (fechaSalidaDiv.textContent !== '') {

                const divSalida = document.getElementById(`salidapersonas-${registroId}`);
                divSalida.style.display = 'none';
                alert('La salida ya está registrada.');
                
                return;
            }
            
            fechaSalidaDiv.textContent = `Fecha de salida: ${fechaActual}`;
            fechaSalidaDiv.style.display = 'block';
            target.disabled = true;
            
            enviarFechaSalida(registroId, fechaActual, personasenvhs);
        } else if (target.matches('.terminar-registro')) {
            const registroId = target.getAttribute('data-registro-id');
            const fechaActual = new Date().toLocaleString();
            enviarDatosRegistro(registroId, fechaActual);
        }
    }
);
}

function enviarDatosRegistro(registroId, fechaActual) {
    fetch("https://sheet.best/api/sheets/ef7150db-3f89-42e9-8abd-790a804eab30")
        .then((response) => response.json())
        .then((data) => {
            const index = data.findIndex((fila) => fila.idunico === registroId);
            if (index !== -1) {
                if (data[index].fechaentrada && data[index].fechasalida) {
                    console.log("Registro encontrado");
                    console.log(data[index]);
                    const datosActualizados = {
                        cierre: fechaActual,
                    };
                    const url = `https://sheet.best/api/sheets/ef7150db-3f89-42e9-8abd-790a804eab30/${index}`;
                    console.log(url);

                    fetch(url, {
                        method: "PATCH",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(datosActualizados)
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("Datos actualizados correctamente:", data);
                        const fechaEntradaDiv = document.getElementById(`div${registroId}`);
                        console.log(fechaEntradaDiv)
                        fechaEntradaDiv.style.display = 'none';
                    })
                    .catch((error) => {
                        console.error("Error al actualizar los datos:", error);
                    });
                } else {
                    alert("Por favor, primero complete la fecha de entrada, fecha de salida y la placa vehicular antes terminar con el servicio.");
                }
            } else {
                console.error("Registro no encontrado");
            }
        })
        .catch((error) => {
            console.error("Error al obtener los datos:", error);
        });
}




function enviarFechaEntrada(registroId, placa, marca, modelo, color, personasenvhe, fechaActual) {
    if (placa && marca && modelo && color && personasenvhe) {
        fetch("https://sheet.best/api/sheets/ef7150db-3f89-42e9-8abd-790a804eab30")
            .then((response) => response.json())
            .then((data) => {
                console.log("Busqueda 2");
                console.log(data);
                const index = data.findIndex((fila) => fila.idunico === registroId);
                if (index !== -1) {
                    console.log("Registro encontrado");
                    console.log(data[index]);
                    const datosActualizados = {
                        fechaentrada: fechaActual,
                        marca: marca,
                        placa: placa,
                        modelo: modelo,
                        color: color,
                        personasenvhe: personasenvhe,
                    };

                    const url = `https://sheet.best/api/sheets/ef7150db-3f89-42e9-8abd-790a804eab30/${index}`;
                    console.log(url);

                    fetch(url, {
                        method: "PATCH",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(datosActualizados)
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("Datos actualizados correctamente:", data);
                    })
                    .catch((error) => {
                        console.error("Error al actualizar los datos:", error);
                    });
                } else {
                    console.error("Registro no encontrado");
                }
            })
            .catch((error) => {
                console.error("Error al obtener los datos:", error);
            });
    } else {
        console.error("Por favor, complete todos los campos antes de enviar los datos.");
    }
}

function enviarFechaSalida(usuarioInput, fechaActual, personasenvhs) {
    fetch("https://sheet.best/api/sheets/ef7150db-3f89-42e9-8abd-790a804eab30")
        .then((response) => response.json())
        .then((data) => {
            const index = data.findIndex((fila) => fila.idunico === usuarioInput);
            if (index !== -1) {
                data[index].fechasalida = fechaActual;
                data[index].personasenvhs = personasenvhs; // Agregar el valor de personasenvhs
                const url = `https://sheet.best/api/sheets/ef7150db-3f89-42e9-8abd-790a804eab30/${index}`;
                fetch(url, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data[index]) // Enviar el registro completo
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Fecha de salida actualizada correctamente:", data);
                })
                .catch((error) => {
                    console.error("Error al actualizar la fecha de salida:", error);
                });
            } else {
                console.error("Registro no encontrado");
            }
        })
        .catch((error) => {
            console.error("Error al obtener los datos de la hoja de cálculo:", error);
        });
}


obtenerYAgregarRegistros2();
