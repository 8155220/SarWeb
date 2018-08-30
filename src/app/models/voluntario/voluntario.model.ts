export interface VoluntarioInterface {
  id?: string;
  nombre?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  sexo?: "masculino" | "femenino" | null;
  fechaNacimiento?: string;
  tipoSangre?: string;
  licenciaConducir?: string;
  direccion?: string;
  alergias?: string;

  lugar?: string;
  provincia?: string;
  celular?: number;
  telefono?: string;
  numeroCarnetIdentidad?: string;
  estadoCivil?: string;
  email?: string;
  idiomas?: string;

  hoobies?: string;

  nombreTutor?: string;
  celularTutor?: string;
  estudiosRealizados?: string;

  profesion?: string;
  ocupacion?: string;
  situacionLaboral?: string;
  experienciaCampoPrimeraRespuesta?: string;

  grado?: string;
  armaEspecialidad?: string;
  numeroCarnetMilitar?: string;
  DatosFamiliares?: string;

  datosFisicos?: string;

  emergenciaLlamar?: string;

  lugarNacimiento?: string;
}

export class VoluntarioModel {
  id?: string;
  nombre?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  sexo?: string;
  fechaNacimiento?: string;
  tipoSangre?: string;
  licenciaConducir?: string;
  direccion?: string;
  alergias?: any;
  pais?: string;
  departamento?: string;
  provincia?: string;
  capital?: string;
  municipio?: string;
  timestamp?: number;
  // lugar: "",
  celular?: number; //number
  telefonoFijo: number;
  numeroCarnetIdentidad?: string;
  estadoCivil?: string;
  email?: string;
  idiomas?: any;

  hoobies?: any;

  nombreTutor?: string;
  celularTutor?: string;
  estudiosRealizados?: any;
  profesion?: string;
  ocupacion?: string;
  situacionLaboral?: string;
  experienciaCampoPrimeraRespuesta?: any;

  grado?: string;
  armaEspecialidad?: string;
  numeroCarnetMilitar?: string;
  datosFamiliares?: any; //pendiente

  estatura?: string; //pendiente
  talla?: number; //pendiente
  colorPiel?: string; //pendiente
  colorOjos?: string; //pendiente
  cabello?: string; //pendiente
  labios?: string; //pendiente
  nariz?: string; //pendiente
  rasgosParticulares?: string; //pendiente

  constructor(voluntario: VoluntarioModel) {
    if (voluntario.id == "") {
      this.id = voluntario.timestamp.toString();
    } else this.id = voluntario.id;
    this.nombre = voluntario.nombre || "";
    this.apellidoPaterno = voluntario.apellidoPaterno || "";
    this.apellidoMaterno = voluntario.apellidoMaterno || "";
    this.sexo = voluntario.sexo || "";
    this.fechaNacimiento = voluntario.fechaNacimiento || "";
    this.tipoSangre = voluntario.tipoSangre || "";
    this.licenciaConducir = voluntario.licenciaConducir || "";
    this.direccion = voluntario.direccion || "";
    this.alergias = voluntario.alergias || "";
    this.pais = voluntario.pais || "";
    this.departamento = voluntario.departamento || "";
    this.provincia = voluntario.provincia || "";
    this.capital = voluntario.capital || "";
    this.municipio = voluntario.municipio || "";
    this.timestamp = voluntario.timestamp || Date.now();
    // lugar: "",
    this.celular = voluntario.celular || 128; //number
    this.telefonoFijo = voluntario.telefonoFijo || 128;
    this.numeroCarnetIdentidad = voluntario.numeroCarnetIdentidad || "";
    this.estadoCivil = voluntario.estadoCivil || "";
    this.email = voluntario.email || "";
    this.idiomas = voluntario.idiomas || "";

    this.hoobies = voluntario.hoobies || "";

    this.nombreTutor = voluntario.nombreTutor || "";
    this.celularTutor = voluntario.celularTutor || "";
    this.estudiosRealizados = voluntario.estudiosRealizados || "";
    this.profesion = voluntario.profesion || "";
    this.ocupacion = voluntario.ocupacion;
    this.situacionLaboral = voluntario.situacionLaboral || "";
    this.experienciaCampoPrimeraRespuesta =
      voluntario.experienciaCampoPrimeraRespuesta || "";

    this.grado = voluntario.grado || "";
    this.armaEspecialidad = voluntario.armaEspecialidad || "";
    this.numeroCarnetMilitar = voluntario.numeroCarnetMilitar || "";
    this.datosFamiliares = voluntario.datosFamiliares || ""; //pendiente

    this.estatura = voluntario.estatura || ""; //pendiente
    this.talla = voluntario.talla || 0; //pendiente
    this.colorPiel = voluntario.colorPiel || ""; //pendiente
    this.colorOjos = voluntario.colorOjos || ""; //pendiente
    this.cabello = voluntario.cabello || ""; //pendiente
    this.labios = voluntario.labios || ""; //pendiente
    this.nariz = voluntario.nariz || ""; //pendiente
    this.rasgosParticulares = voluntario.rasgosParticulares || ""; //pendiente
  }
}
/*export class VoluntarioModel implements VoluntarioInterface{

  id?: string;
  timestamp?:number;
  nombre?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  sexo?: "masculino" | "femenino" | null;
  fechaNacimiento?: string;
  tipoSangre?: string;
  licenciaConducir?: string;
  direccion?: string;
  alergias?: string;
  lugar?: string;
  provincia?: string;
  celular?: number;
  telefono?: string;
  numeroCarnetIdentidad?: string;
  estadoCivil?: string;
  email?: string;
  idiomas?: string;
  hoobies?: string;
  nombreTutor?: string;
  celularTutor?: string;
  estudiosRealizados?: string;
  profesion?: string;
  ocupacion?: string;
  situacionLaboral?: string;
  experienciaCampoPrimeraRespuesta?: string;
  grado?: string;
  armaEspecialidad?: string;
  numeroCarnetMilitar?: string;
  DatosFamiliares?: string;
  datosFisicos?: string;
  emergenciaLlamar?: string;
  lugarNacimiento?: string;
  peso?:string;
  talla?:string;
  grupoSanguineo?:string;
  fecha?:string;
}*/
