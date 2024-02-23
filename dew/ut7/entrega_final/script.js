// letras para validación del dni
const letters = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E']

$(document).ready(function(){
    loadProv();
    loadMun();
	$('#provincia').change(loadMun);
});

function loadProv() {
    let xhr = new XMLHttpRequest();
	xhr.open('GET', 'cargaProvinciasXML.php', false);
	xhr.send();
	let provincias = xhr.responseXML.getElementsByTagName("provincia");
	for (let i=0; i < provincias.length; i++) {
		let new_option = new Option(
			provincias[i].getElementsByTagName("nombre")[0].firstChild.nodeValue, 
			provincias[i].getElementsByTagName("codigo")[0].firstChild.nodeValue
		);
		$('#provincia').append(new_option);
	};
}

function loadMun() {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'cargaMunicipiosXML.php', true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	let payload = `provincia=${$('#provincia').val()}`;
	xhr.onreadystatechange = function() {
		let new_options = '';
		if(xhr.readyState === 4 && xhr.status === 200) {
			let municipios = xhr.responseXML.getElementsByTagName("municipio");
			for (let i=0; i < municipios.length; i++) {
				new_options += `<option value=${municipios[i].getElementsByTagName("codigo")[0].firstChild.nodeValue}>
							${municipios[i].getElementsByTagName("nombre")[0].firstChild.nodeValue}
								</option>`
			};
		};
		$("#municipio").html(new_options);
	};
	xhr.send(payload);	
}

function validate_name() {
	if ( $('#nombre').val() == '' ) {
		$('#nombre').focus();
		$('#err-nombre').text('El nombre es un campo obligatorio.');
	} else {
		$('#err-nombre').html(null);
	}
}

function validate_surnames() {
	if ( $('#apellidos').val() == '' ) {
		$('#apellidos').focus();
		$('#err-apellidos').text('Los apellidos es un campo obligatorio.');
	} else {
		$('#err-apellidos').html(null);
	}
}

function validate_address() {
	if ( $('#direccion').val() == '' ) {
		$('#direccion').focus();
		$('#err-direccion').text('La dirección es un campo obligatorio.');
	} else {
		$('#err-direccion').html(null);
	}
}

function validate_dni() {
	let dni = $('#dni').val();
	if ( dni == '' ) {
		$('#dni').focus();
		$('#err-dni').text('El dni es un campo obligatorio.');
	} else if ( dni.match(/^\d{8}[A-Z]$/) ) {
		index = parseInt(dni) % 23;
		if ( letters[index] != dni[8] ) {
			$('#dni').focus();
			$('#err-dni').text('El dni introducido no es válido.');
		} else {
			$('#err-dni').html(null);
		}
	} else {
		$('#dni').focus();
		$('#err-dni').text('El dni introducido no es válido.');
	} 
}

function validate_phone() {
	let phone = $('#telefono').val();
	if ( phone == '' ) {
		$('#phone').focus();
		$('#err-telefono').text('El teléfono es un campo obligatorio.');
	} else if ( !(phone.match(/^\d{9}$/)) ) {
		$('#telefono').focus();
		$('#err-telefono').text('El teléfono introducido no es válido.');
	} else {
		$('#err-telefono').html(null);
	}
}

function validate_cp() {
	let cp = $('#cp').val();
	if ( cp == '' ) {
		$('#cp').focus();
		$('#err-cp').text('El código postal es un campo obligatorio.');
	} else if ( !(cp.match(/^\d{5}$/)) ) {
		$('#cp').focus();
		$('#err-cp').text('El código postal introducido no es válido.');
	} else {
		$('#err-cp').html(null);
	}
}

function validate_mail() {
	let mail = $('#correo').val();
	if ( mail == '' ) {
		$('#correo').focus();
		$('#err-correo').text('El correo electrónico es un campo obligatorio.');
	} else if ( mail.match(/^.+@[a-z]+\.(?:com|es)$/) ) {
		if ( mail != $('#comprobar-correo').val() ) {
			$('#correo').focus();
			$('#err-correo').text('No coinciden los valores introducidos.');
		} else {
			$('#err-correo').html(null);
		}
	} else {
		$('#correo').focus();
		$('#err-correo').text('El correo introducido no es válido.');
	} 
}

function validate_terms() {
	if ( !($('#condiciones').prop('checked')) ) {
			$('#condiciones').focus();
			$('#err-condiciones').text('Debes aceptar los términos y condiciones para continuar.');
	} else {
		$('#err-condiciones').html(null);
	}
}

function validate_birthdate() {
	if ( $('#nacimiento').val() == null ) {
		$('#nacimiento').focus();
		$('#err-nacimiento').text('La fecha de nacimiento es un campo obligatorio.');
	} else if ( isNaN(Date.parse($('#nacimiento').val())) ) {
		$('#nacimiento').focus();
		$('#err-nacimiento').text('La fecha introducida no es válida.');
	} else {
		$('#err-nacimiento').html(null);
	}
}

function checkFields() {
	validate_terms();
	validate_mail();
	validate_phone();
	validate_cp();
	validate_dni();
	validate_address();
	validate_birthdate();
	validate_surnames();
	validate_name();
}