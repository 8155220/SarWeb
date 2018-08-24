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
  celular?: string;
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

export class VoluntarioModel implements VoluntarioInterface{
    
}

