import { Observable, Subscriber } from "rxjs";
import { VoluntarioModel } from "./../models/voluntario/voluntario.model";
import { Injectable } from "@angular/core";
import {
  paisesArray,
  dataBolivia,
  gruposSanguineos,
  situacionLaboral
} from "../../assets/localdata/arrayData";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { FormGroup } from "@angular/forms";
import { map } from "../../../node_modules/rxjs/operators";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: "root"
})
export class VoluntarioService {

  voluntariosLocal:VoluntarioModel[] = [
    {
      "id": "b4VkyRN7ZAIdAfSYDBdo",
      "apellidoMaterno": "Burgos",
      "apellidoPaterno": "Veizaga",
      "celular": 76661602,
      "direccion": "Av. paurito  B/ 12 de octubre  C/ eden # 351",
      "fechaNacimiento": "7/25/1994",
      "nombre": "Fernando",
      "numeroCarnetIdentidad": "12414835 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609135
    },
    {
      "id": "r1YnYRzZ2wAFlyJFU1wh",
      "apellidoMaterno": "Quenallata",
      "apellidoPaterno": "Carlo",
      "celular": 69185996,
      "direccion": "Villa 1 mayo  C/ guapuru",
      "fechaNacimiento": "5/21/1998",
      "nombre": "Erick Brayan",
      "numeroCarnetIdentidad": "6036285 LP.",
      "sexo": "masculino",
      "timestamp": 1535558609138
    },
    {
      "id": "LgmixDco1anqThkJBe7P",
      "apellidoMaterno": "Cuchallo",
      "apellidoPaterno": "Aluis",
      "celular": 69169617,
      "direccion": "Carretera antigua cochabamba",
      "fechaNacimiento": "3/17/2001",
      "nombre": "Cesar Johan",
      "numeroCarnetIdentidad": "11327763 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609139
    },
    {
      "id": "luuU07NsH00g2BiS0H7R",
      "apellidoMaterno": "Fernandez",
      "apellidoPaterno": "Ninaja",
      "celular": 65012823,
      "direccion": "El torno  B/ 6 de mayo",
      "fechaNacimiento": "9/8/2000",
      "nombre": "Fabio Andres",
      "numeroCarnetIdentidad": "11395042 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609139
    },
    {
      "id": "esyd3rdEWZxfWvygOQvB",
      "apellidoMaterno": "Chavez",
      "apellidoPaterno": "Chumasero",
      "celular": 75945852,
      "direccion": "Satelite norte Warnes",
      "fechaNacimiento": "4/14/1996",
      "nombre": "Jose Eduardo",
      "numeroCarnetIdentidad": "9653368 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609140
    },
    {
      "id": "ibG8iFCPI7uPmfd7tx3K",
      "apellidoMaterno": "Guzman",
      "apellidoPaterno": "Galarza",
      "celular": 74690430,
      "direccion": "Villa 1 de mayo  B/ espinalito",
      "fechaNacimiento": "11/17/1996",
      "nombre": "Jose Luis",
      "numeroCarnetIdentidad": "14436293 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609141
    },
    {
      "id": "1l8QV2VFhWbrwzg2SoS5",
      "apellidoMaterno": "Ortiz",
      "apellidoPaterno": "Franco",
      "celular": 77625663,
      "direccion": "C/ cochabamba esquina irala",
      "fechaNacimiento": "1/18/2002",
      "nombre": "Ezequiel",
      "numeroCarnetIdentidad": "8990103 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609142
    },
    {
      "id": "IUMggRapfEYSQJSlEczB",
      "apellidoMaterno": "Justiniano",
      "apellidoPaterno": "Angulo",
      "celular": 70951135,
      "direccion": "Av. mutualista 2º y 3º anillo # 8",
      "fechaNacimiento": "3/15/1998",
      "nombre": "Jose Andres",
      "numeroCarnetIdentidad": "9621481",
      "sexo": "masculino",
      "timestamp": 1535558609142
    },
    {
      "id": "siLFzyB6ySYcr1GF3S9R",
      "apellidoMaterno": "De la Fuente",
      "apellidoPaterno": "Mejia",
      "celular": 60029219,
      "direccion": "B/ amboro",
      "fechaNacimiento": "9/1/1998",
      "nombre": "Luis Muguel",
      "numeroCarnetIdentidad": "13942694 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609142
    },
    {
      "id": "LBJ30X8T3x6HKnmdFDN0",
      "apellidoMaterno": "Villazon",
      "apellidoPaterno": "Vasquez",
      "celular": 65285395,
      "direccion": "La guardia C/ jose vicente",
      "fechaNacimiento": "12/15/2000",
      "nombre": "Yohan",
      "numeroCarnetIdentidad": "9837094 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609143
    },
    {
      "id": "olLtoPZXY1JpG0rYcX2W",
      "apellidoMaterno": "Pinto",
      "apellidoPaterno": "Montellano",
      "celular": 70079199,
      "direccion": "Satelite",
      "fechaNacimiento": "10/19/1999",
      "nombre": "Jose Enrique",
      "numeroCarnetIdentidad": "13014836",
      "sexo": "masculino",
      "timestamp": 1535558609143
    },
    {
      "id": "4QIELT5LVu2ca4r72OF2",
      "apellidoMaterno": "Paniagua",
      "apellidoPaterno": "Cortez",
      "celular": 76059430,
      "direccion": "Av. bolivia  Los lotes",
      "fechaNacimiento": "1/2/2001",
      "nombre": "Elian Adnian",
      "numeroCarnetIdentidad": "8185468",
      "sexo": "masculino",
      "timestamp": 1535558609144
    },
    {
      "id": "VyZigR7qSHxEqC6haS5p",
      "apellidoMaterno": "Blanco",
      "apellidoPaterno": "Mamani",
      "celular": 72336310,
      "direccion": "B/ san antonio  Plan 3000",
      "fechaNacimiento": "3/20/1999",
      "nombre": "Elmer Jairo",
      "numeroCarnetIdentidad": "7807930 sc.",
      "sexo": "masculino",
      "timestamp": 1535558609144
    },
    {
      "id": "Xj1jCdKbvMR6dLaP6XU2",
      "apellidoMaterno": "Ticona",
      "apellidoPaterno": "Mamani",
      "celular": 71092672,
      "direccion": "Av. doble via la guardia entre 3º y 4º anillo #440",
      "fechaNacimiento": "6/8/2000",
      "nombre": "Lizet",
      "numeroCarnetIdentidad": "8252315",
      "sexo": "femenino",
      "timestamp": 1535558609146
    },
    {
      "id": "vBxYN5gEqPhke5dOKZF1",
      "apellidoMaterno": "Copa",
      "apellidoPaterno": "Aguilar",
      "celular": 73675347,
      "direccion": "Av. fatima C/ 5 la cuchilla",
      "fechaNacimiento": "12/12/2000",
      "nombre": "Yoselin Angela",
      "numeroCarnetIdentidad": "13140596 SC.",
      "sexo": "femenino",
      "timestamp": 1535558609146
    },
    {
      "id": "7b3aqKcjSBLL6ecAwstN",
      "apellidoMaterno": "Cossio",
      "apellidoPaterno": "Benavides",
      "celular": 78076704,
      "direccion": "B/ alto olivo  5º anillo  C/3",
      "fechaNacimiento": "11/24/1998",
      "nombre": "Jhoel",
      "numeroCarnetIdentidad": "11388856 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609147
    },
    {
      "id": "sFX19ak9mKXHWfO9LExk",
      "apellidoMaterno": "Merma",
      "apellidoPaterno": "Quispe",
      "celular": 76304065,
      "direccion": "Zona el dorado  Urb/ san jorge  el bateon",
      "fechaNacimiento": "10/9/2000",
      "nombre": "Miguel Angel",
      "numeroCarnetIdentidad": "12890802",
      "sexo": "masculino",
      "timestamp": 1535558609147
    },
    {
      "id": "h91Z06KbpodZtqphmwTj",
      "apellidoMaterno": "Cano",
      "apellidoPaterno": "Flores",
      "celular": 74937833,
      "direccion": "Radial  17 1/2  5º anillo",
      "fechaNacimiento": "11/20/1992",
      "nombre": "Edwin",
      "numeroCarnetIdentidad": "8168232 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609148
    },
    {
      "id": "CtJVgyIhsQ4QqKaAgFnA",
      "apellidoMaterno": "Cuchallo",
      "apellidoPaterno": "Gutierrez",
      "celular": 62798544,
      "direccion": "La guardia  B/ jardines",
      "fechaNacimiento": "2/26/2000",
      "nombre": "Neyer",
      "numeroCarnetIdentidad": "8223385 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609149
    },
    {
      "id": "ckVDU2RR5SvQ9WZC8oUr",
      "apellidoMaterno": "Canaviri",
      "apellidoPaterno": "Esculcer",
      "celular": 73194788,
      "direccion": "Av. G77  B/ libertad",
      "fechaNacimiento": "5/16/1999",
      "nombre": "Bella Nayda",
      "numeroCarnetIdentidad": "9742284",
      "sexo": "femenino",
      "timestamp": 1535558609149
    },
    {
      "id": "g5AF0gK3ZPHh4B2yNtuv",
      "apellidoMaterno": "Bustillos",
      "apellidoPaterno": "Rodriguez",
      "celular": 73687500,
      "direccion": "4º anillo  B/ villa warnes",
      "fechaNacimiento": "10/20/1999",
      "nombre": "Benjamin Alexander",
      "numeroCarnetIdentidad": "13701579 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609149
    },
    {
      "id": "z2D5r0g6JaoUDcNTxUmL",
      "apellidoMaterno": "Fernandez",
      "apellidoPaterno": "Rodriguez",
      "celular": 78326637,
      "direccion": "Av. cherentade KM-9 doble via a la guardia",
      "fechaNacimiento": "2/8/2000",
      "nombre": "Alexander",
      "numeroCarnetIdentidad": "12872580",
      "sexo": "masculino",
      "timestamp": 1535558609149
    },
    {
      "id": "3Yl9CTJkiZ5HURv9UI8w",
      "apellidoMaterno": "Saldaña",
      "apellidoPaterno": "Sandoval",
      "celular": 1111111,
      "direccion": "B/ 4 de octubre los lotes",
      "fechaNacimiento": "8/30/1999",
      "nombre": "Eibis Jesus",
      "numeroCarnetIdentidad": "14772846",
      "sexo": "masculino",
      "timestamp": 1535558609150
    },
    {
      "id": "QcF3tF3BVCZaVWUiGPM7",
      "apellidoMaterno": "Aguirre",
      "apellidoPaterno": "Flores",
      "celular": 61368756,
      "direccion": "Av. 3 pasos al frente",
      "fechaNacimiento": "8/26/1998",
      "nombre": "Josue",
      "numeroCarnetIdentidad": "9021278",
      "sexo": "masculino",
      "timestamp": 1535558609150
    },
    {
      "id": "T1OSupBXSV6bg3dRpGKE",
      "apellidoMaterno": "Cayu",
      "apellidoPaterno": "Paz",
      "celular": 77813158,
      "direccion": "B/ san jorgue  zona bateo",
      "fechaNacimiento": "12/18/1998",
      "nombre": "Anibal",
      "numeroCarnetIdentidad": "9680356 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609151
    },
    {
      "id": "3vLBsSrjr2irktlcpEHx",
      "apellidoMaterno": "Rojas",
      "apellidoPaterno": "Castro",
      "celular": 69034538,
      "direccion": "Doble via la guardia KM-20",
      "fechaNacimiento": "9/17/1999",
      "nombre": "Lixander",
      "numeroCarnetIdentidad": "9762568",
      "sexo": "masculino",
      "timestamp": 1535558609152
    },
    {
      "id": "5mwpMnijnDJ5L24uxIUx",
      "apellidoMaterno": "Aguirre",
      "apellidoPaterno": "Flores",
      "celular": 61368756,
      "direccion": "Av. 3 pasos al frente",
      "fechaNacimiento": "8/26/1998",
      "nombre": "Josue",
      "numeroCarnetIdentidad": "9021278",
      "sexo": "masculino",
      "timestamp": 1535558609152
    },
    {
      "id": "7Ydh4YT3H35495VAevFM",
      "apellidoMaterno": "Espindola",
      "apellidoPaterno": "Padilla",
      "celular": 73600722,
      "direccion": "KM-15 doble via a la guardia",
      "fechaNacimiento": "3/20/1995",
      "nombre": "Clinder",
      "numeroCarnetIdentidad": "8950499 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609153
    },
    {
      "id": "OLW6pcZ8Raunc9Dld4bK",
      "apellidoMaterno": "Niñez",
      "apellidoPaterno": "Eguez",
      "celular": 77319680,
      "direccion": "Plan 3000  B/ la campana",
      "fechaNacimiento": "2/23/2000",
      "nombre": "Royner",
      "numeroCarnetIdentidad": "9758735 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609153
    },
    {
      "id": "lfq7213gClQn4hRWjmSH",
      "apellidoMaterno": "Palacios",
      "apellidoPaterno": "Cayo",
      "celular": 7905680,
      "direccion": "B/ valparaiso  C/ las dalias KM-9 doble via",
      "fechaNacimiento": "2/17/2001",
      "nombre": "Jose Leandro",
      "numeroCarnetIdentidad": "9656202",
      "sexo": "masculino",
      "timestamp": 1535558609153
    },
    {
      "id": "aMmpcELAE9sBuccVVcpl",
      "apellidoMaterno": "Nina",
      "apellidoPaterno": "Mamani",
      "celular": 60845200,
      "direccion": "B/ 24 de septiembre 7º anillo",
      "fechaNacimiento": "9/14/2000",
      "nombre": "Maria Victoria",
      "numeroCarnetIdentidad": "12388540",
      "sexo": "femenino",
      "timestamp": 1535558609154
    },
    {
      "id": "CPSAhyLidc9dQQSwm95y",
      "apellidoMaterno": "Escobar",
      "apellidoPaterno": "Serrano",
      "celular": 71385838,
      "direccion": "B/ la collorada #100",
      "fechaNacimiento": "8/22/1994",
      "nombre": "Miguel",
      "numeroCarnetIdentidad": "7812201",
      "sexo": "masculino",
      "timestamp": 1535558609155
    },
    {
      "id": "vrvwroIlia6zkg8lsizf",
      "apellidoMaterno": "Gonzaga",
      "apellidoPaterno": "Mercado",
      "celular": 77024705,
      "direccion": "Urb/ trapiche  C/totaises #16",
      "fechaNacimiento": "2/24/2001",
      "nombre": "Anderson",
      "numeroCarnetIdentidad": "8940209",
      "sexo": "masculino",
      "timestamp": 1535558609155
    },
    {
      "id": "6E0rmjQWq1I7EOz24SCg",
      "apellidoMaterno": "Fernandez",
      "apellidoPaterno": "Gonzales",
      "celular": 61329351,
      "direccion": "B/ bicentenario  Urb/ mi rancho",
      "fechaNacimiento": "11/21/1999",
      "nombre": "Bladimir",
      "numeroCarnetIdentidad": "5317266 CBBA.",
      "sexo": "masculino",
      "timestamp": 1535558609156
    },
    {
      "id": "zUishIeGXrBuxmEw3B6E",
      "apellidoMaterno": "Roman",
      "apellidoPaterno": "Quiroz",
      "celular": 79038245,
      "direccion": "B/ los angeles  C/las anzas zona mutualista",
      "fechaNacimiento": "11/3/2001",
      "nombre": "Alfredo",
      "numeroCarnetIdentidad": "14588153 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609156
    },
    {
      "id": "LeXUh5RXBMBo7RaZ9flz",
      "apellidoMaterno": "Inochea",
      "apellidoPaterno": "Osinaga",
      "celular": 75388631,
      "direccion": "B/ 8 de diciembrre  zona el cambodromo",
      "fechaNacimiento": "4/8/2001",
      "nombre": "Kevin Daniel",
      "numeroCarnetIdentidad": "8233394 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609157
    },
    {
      "id": "UOu0Zp7RVqGEfEX9UFP5",
      "apellidoMaterno": "Lucano",
      "apellidoPaterno": "Juaniquina",
      "celular": 67471701,
      "direccion": "B/ covipol  KM-6 doble via a la guardia",
      "fechaNacimiento": "1/15/1988",
      "nombre": "Rolando",
      "numeroCarnetIdentidad": "7303015 OR.",
      "sexo": "masculino",
      "timestamp": 1535558609157
    },
    {
      "id": "VFlimCuo2EUCT7khpjRo",
      "apellidoMaterno": "Quiroga",
      "apellidoPaterno": "Vaca",
      "celular": 75368207,
      "direccion": "Zona villa 1 de mayo  B/ bolivia",
      "fechaNacimiento": "2/4/1993",
      "nombre": "Jose Luis",
      "numeroCarnetIdentidad": "8172973",
      "sexo": "masculino",
      "timestamp": 1535558609158
    },
    {
      "id": "THhiJtAallkKKH4HkR4f",
      "apellidoMaterno": "Condori",
      "apellidoPaterno": "Viraca",
      "celular": 76611877,
      "direccion": "Av. soberania nacional  C/5",
      "fechaNacimiento": "7/20/1999",
      "nombre": "Mario Angel",
      "numeroCarnetIdentidad": "9709075",
      "sexo": "masculino",
      "timestamp": 1535558609159
    },
    {
      "id": "cTFbf6WhdQsvhjoo0X0B",
      "apellidoMaterno": "Montero",
      "apellidoPaterno": "Balcazar",
      "celular": 65930078,
      "direccion": "B/ la monta  C/ umberto salina # 3215",
      "fechaNacimiento": "2/12/1999",
      "nombre": "Daniel",
      "numeroCarnetIdentidad": "8960368 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609159
    },
    {
      "id": "9cgqtfH7ycOy1m4npcuF",
      "apellidoMaterno": "Espinoza",
      "apellidoPaterno": "Guzman",
      "celular": 75503396,
      "direccion": "Urb/ palma real 6º canillo santo dumon",
      "fechaNacimiento": "8/25/1999",
      "nombre": "Jairo",
      "numeroCarnetIdentidad": "12358292 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609161
    },
    {
      "id": "QdOS37Goni91kwm0dVpo",
      "apellidoMaterno": "Llanos",
      "apellidoPaterno": "Ortis",
      "celular": 70841584,
      "direccion": "Radial 15  4º anillo",
      "fechaNacimiento": "10/25/1998",
      "nombre": "Abigail",
      "numeroCarnetIdentidad": "Ninguna",
      "sexo": "femenino",
      "timestamp": 1535558609161
    },
    {
      "id": "CGbSZjmkArRnebzSsUdM",
      "apellidoMaterno": "Apaza",
      "apellidoPaterno": "Basquiez",
      "celular": 60001994,
      "direccion": "Radial 15 4º anillo  C/ ernesto aponte",
      "fechaNacimiento": "9/30/1996",
      "nombre": "Carlos Daniel",
      "numeroCarnetIdentidad": "12758275 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609163
    },
    {
      "id": "o34hUI9eLMzE6ez6rGMV",
      "apellidoMaterno": "Quispe",
      "apellidoPaterno": "Pacci",
      "celular": 35009582,
      "direccion": "Av. grigota  3 º anillo # 1005",
      "fechaNacimiento": "6/30/1996",
      "nombre": "Jesus",
      "numeroCarnetIdentidad": "8185108",
      "sexo": "masculino",
      "timestamp": 1535558609164
    },
    {
      "id": "v69NFMR39gtYBRjCWvAs",
      "apellidoMaterno": "Mancilla",
      "apellidoPaterno": "Lichtenauer",
      "celular": 78109637,
      "direccion": "Omar chavez ortiz # 1054",
      "fechaNacimiento": "6/17/1990",
      "nombre": "Rodruigo",
      "numeroCarnetIdentidad": "6375418",
      "sexo": "masculino",
      "timestamp": 1535558609164
    },
    {
      "id": "QqXyh42wmeInN4cOoatS",
      "apellidoMaterno": "Salazar",
      "apellidoPaterno": "Male",
      "celular": 60824648,
      "direccion": "3 pasos al frente B/ arca de noe",
      "fechaNacimiento": "12/24/1998",
      "nombre": "Jairo",
      "numeroCarnetIdentidad": "8190339",
      "sexo": "masculino",
      "timestamp": 1535558609165
    },
    {
      "id": "8Zbrpt4GnotilAqXymDq",
      "apellidoMaterno": "Suarez",
      "apellidoPaterno": "Zenteno",
      "celular": 65866943,
      "direccion": "6º anillo Urb/ san silvestre santo dumon",
      "fechaNacimiento": "11/11/2000",
      "nombre": "Damian",
      "numeroCarnetIdentidad": "7741575 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609166
    },
    {
      "id": "YnuHCxwtK8TS1cS8450X",
      "apellidoMaterno": "Avila",
      "apellidoPaterno": "Casies",
      "celular": 78196170,
      "direccion": "8º anillo alemana B/ pedro cortes",
      "fechaNacimiento": "10/26/1999",
      "nombre": "Erwin",
      "numeroCarnetIdentidad": "7831962 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609166
    },
    {
      "id": "fM0MyAOSLiiL5y6vnGDI",
      "apellidoMaterno": "Jaimez",
      "apellidoPaterno": "Franco",
      "celular": 70931063,
      "direccion": "Av. prefectoi  rivas  # 401",
      "fechaNacimiento": "1/15/1998",
      "nombre": "David Alejandro",
      "numeroCarnetIdentidad": "19954848",
      "sexo": "masculino",
      "timestamp": 1535558609167
    },
    {
      "id": "NFldEaYAF2dBNIXrmWZl",
      "apellidoMaterno": "Uriola",
      "apellidoPaterno": "Padilla",
      "celular": 60882528,
      "direccion": "B/ el progreso 8º anillo alemana",
      "fechaNacimiento": "4/25/1999",
      "nombre": "Yhamil Josue",
      "numeroCarnetIdentidad": "12757716 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609168
    },
    {
      "id": "eeOGdAVmndtu89I3wJKV",
      "apellidoMaterno": "Torrez",
      "apellidoPaterno": "Barja",
      "celular": 75055873,
      "direccion": "B/ el retoño distrito # 10  C/2",
      "fechaNacimiento": "6/25/1994",
      "nombre": "Luis Gustavo",
      "numeroCarnetIdentidad": "8963100 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609169
    },
    {
      "id": "c1vACCRJgrGkwnJG9pTN",
      "apellidoMaterno": "Portales",
      "apellidoPaterno": "Rivera",
      "celular": 67777414,
      "direccion": "Av. Paragua calle juan de somosa",
      "fechaNacimiento": "6/10/1992",
      "nombre": "Paulo Daniel",
      "numeroCarnetIdentidad": "6245372 SC",
      "sexo": "masculino",
      "timestamp": 1535558609170
    },
    {
      "id": "C1Jk248i0NFgY7D97bVg",
      "apellidoMaterno": "Melgar",
      "apellidoPaterno": "Alce",
      "celular": 78479811,
      "direccion": "doble via a la guardia 3ºanillo c/tristan roca",
      "fechaNacimiento": "7/21/1997",
      "nombre": "Oscar Alfredo",
      "numeroCarnetIdentidad": "12449175",
      "sexo": "masculino",
      "timestamp": 1535558609171
    },
    {
      "id": "eNio2yOMXbVGI7zpDsH4",
      "apellidoMaterno": "Chamani",
      "apellidoPaterno": "Vaca",
      "celular": 78081259,
      "direccion": "B/de septiembre",
      "fechaNacimiento": "6/5/1993",
      "nombre": "Victor Gonzalo",
      "numeroCarnetIdentidad": "8972214 SC",
      "sexo": "masculino",
      "timestamp": 1535558609171
    },
    {
      "id": "iuACbkkK9y7gxOiWoABA",
      "apellidoMaterno": "Chuve",
      "apellidoPaterno": "Chuve",
      "celular": 77889624,
      "direccion": "km9 doble via la guardia B/el carmen",
      "fechaNacimiento": "3/20/1999",
      "nombre": "Mirian Alisson",
      "numeroCarnetIdentidad": "13146891 SC",
      "sexo": "femenino",
      "timestamp": 1535558609171
    },
    {
      "id": "Isaj0Bl9EgCyaVWtPVaB",
      "apellidoMaterno": "Baure",
      "apellidoPaterno": "Cardona",
      "celular": 73154038,
      "direccion": "4º anillo Av. Sudamericana C/3 #7",
      "fechaNacimiento": "3/17/1989",
      "nombre": "Diego",
      "numeroCarnetIdentidad": "7771294 SC",
      "sexo": "masculino",
      "timestamp": 1535558609172
    },
    {
      "id": "lJniN7kJHykTTEVPS9Ad",
      "apellidoMaterno": "Nuñez",
      "apellidoPaterno": "Perez",
      "celular": 77070178,
      "direccion": "Warnes B/pil",
      "fechaNacimiento": "6/23/2001",
      "nombre": "Joed Ezequiel",
      "numeroCarnetIdentidad": "9628821",
      "sexo": "masculino",
      "timestamp": 1535558609172
    },
    {
      "id": "n0SnOTAy4luUgPpqw6FQ",
      "apellidoMaterno": "Escalante",
      "apellidoPaterno": "Ibarbe",
      "celular": 72152094,
      "direccion": "Plan 3000 B/Minero",
      "fechaNacimiento": "11/28/1998",
      "nombre": "Miguel  Angel",
      "numeroCarnetIdentidad": "12631125",
      "sexo": "masculino",
      "timestamp": 1535558609173
    },
    {
      "id": "QevmjAmd0Mdsi7ZNCZeF",
      "apellidoMaterno": "Sautos",
      "apellidoPaterno": "Condori",
      "celular": 78153828,
      "direccion": "Zona Pampa de la isla B/16 de julio",
      "fechaNacimiento": "10/14/1998",
      "nombre": "Jose Luis",
      "numeroCarnetIdentidad": "9679924",
      "sexo": "masculino",
      "timestamp": 1535558609174
    },
    {
      "id": "nKAOKmpgrfhQ5RSsuiNo",
      "apellidoMaterno": "Alvarez",
      "apellidoPaterno": "Condori",
      "celular": 722639507,
      "direccion": "AV/ las campanass C/los penocos plan 3000",
      "fechaNacimiento": "2/15/2001",
      "nombre": "Victor Arturo",
      "numeroCarnetIdentidad": "9678626",
      "sexo": "masculino",
      "timestamp": 1535558609174
    },
    {
      "id": "rCp0wDQgCGd1JjMW4xUl",
      "apellidoMaterno": "Sejas",
      "apellidoPaterno": "Lopez",
      "celular": 72169933,
      "direccion": "carretera alñ norte KM:28  \"WARNES ",
      "fechaNacimiento": "6/26/1998",
      "nombre": "Alejandro",
      "numeroCarnetIdentidad": "9802593",
      "sexo": "masculino",
      "timestamp": 1535558609174
    },
    {
      "id": "0wRF63R180gWfeNNGvzW",
      "apellidoMaterno": "Sosa",
      "apellidoPaterno": "Cespedes",
      "celular": 77858381,
      "direccion": "plan 3000 B/ san agustin",
      "fechaNacimiento": "5/27/1999",
      "nombre": "Victor",
      "numeroCarnetIdentidad": "8898580",
      "sexo": "masculino",
      "timestamp": 1535558609176
    },
    {
      "id": "5AghEh4I274ZVzOP9PFn",
      "apellidoMaterno": "Ninguna",
      "apellidoPaterno": "Jaurequi",
      "celular": 71600299,
      "direccion": "tutumaso 2 Av. moscu C/23 de marzo",
      "fechaNacimiento": "9/3/1995",
      "nombre": "Rolando",
      "numeroCarnetIdentidad": "8961429",
      "sexo": "masculino",
      "timestamp": 1535558609176
    },
    {
      "id": "cwBHRgBRPNix7eiZgIaK",
      "apellidoMaterno": "Ramos",
      "apellidoPaterno": "Chino",
      "celular": 75380163,
      "direccion": "B/carlos la borde \" palmasola",
      "fechaNacimiento": "7/4/1994",
      "nombre": "Jhonatan David",
      "numeroCarnetIdentidad": "8984428",
      "sexo": "masculino",
      "timestamp": 1535558609176
    },
    {
      "id": "KJLCqqiaaJ1w4BUXpJGQ",
      "apellidoMaterno": "Patty",
      "apellidoPaterno": "Gutierrez",
      "celular": 75676934,
      "direccion": "zona los lotes B/24 de junio C/ eucalipto",
      "fechaNacimiento": "2/8/1995",
      "nombre": "Jhamy Alfredo",
      "numeroCarnetIdentidad": "11338530",
      "sexo": "masculino",
      "timestamp": 1535558609177
    },
    {
      "id": "FPaLWOHT1jTKga7DOlPq",
      "apellidoMaterno": "Fuentes",
      "apellidoPaterno": "Gutierrez",
      "celular": 77026768,
      "direccion": "B/ melchor pinto C/3 zona parque industrial",
      "fechaNacimiento": "7/28/1990",
      "nombre": "Juan Carlos",
      "numeroCarnetIdentidad": "7807840",
      "sexo": "masculino",
      "timestamp": 1535558609178
    },
    {
      "id": "qYfCYLgH2fOhS9mkqdvN",
      "apellidoMaterno": "Gutierrez",
      "apellidoPaterno": "Quino",
      "celular": 69012884,
      "direccion": "Los lotes jardines del sur",
      "fechaNacimiento": "10/4/1999",
      "nombre": "Alizson Brenda",
      "numeroCarnetIdentidad": "13634109",
      "sexo": "femenino",
      "timestamp": 1535558609178
    },
    {
      "id": "7xtEjoMLHIJjAcBGh8J8",
      "apellidoMaterno": "Arteaga",
      "apellidoPaterno": "Paniagua",
      "celular": 60008371,
      "direccion": "B/ 4 de octubre C/ maticu",
      "fechaNacimiento": "1/6/1999",
      "nombre": "Guillermo Rodrigo",
      "numeroCarnetIdentidad": "14468225",
      "sexo": "masculino",
      "timestamp": 1535558609180
    },
    {
      "id": "Xd2Kwm2DHXygij6fmyje",
      "apellidoMaterno": "Solis",
      "apellidoPaterno": "Castillo",
      "celular": 72887389,
      "direccion": "KM-27 antigua carretera cochabanba",
      "fechaNacimiento": "6/22/1999",
      "nombre": "Walter Miguel",
      "numeroCarnetIdentidad": "8221226 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609180
    },
    {
      "id": "czSJDFAgpgO31SOeYKZn",
      "apellidoMaterno": "Arnez",
      "apellidoPaterno": "Choque",
      "celular": 76088285,
      "direccion": "B/ Nva. Primavera C/ los claveles",
      "fechaNacimiento": "2/21/1997",
      "nombre": "Alejandra",
      "numeroCarnetIdentidad": "13270236",
      "sexo": "femenino",
      "timestamp": 1535558609180
    },
    {
      "id": "r6i78D5Ua6DkpVVMKBMa",
      "apellidoMaterno": "Rivera",
      "apellidoPaterno": "Siancas",
      "celular": 71330989,
      "direccion": "Plan 3000 Av.la campana",
      "fechaNacimiento": "9/15/2001",
      "nombre": "Maria Yanitza",
      "numeroCarnetIdentidad": "13366561",
      "sexo": "femenino",
      "timestamp": 1535558609181
    },
    {
      "id": "O5DJeKA3biLmKBESxwGX",
      "apellidoMaterno": "Camana",
      "apellidoPaterno": "Villaroel",
      "celular": 74616944,
      "direccion": "5º anillo santos dumon",
      "fechaNacimiento": "6/18/1999",
      "nombre": "Sergio Alejandro",
      "numeroCarnetIdentidad": "10811711",
      "sexo": "masculino",
      "timestamp": 1535558609182
    },
    {
      "id": "bA4YDuboRSsBAMQQCOnP",
      "apellidoMaterno": "Mojica",
      "apellidoPaterno": "Ruiz",
      "celular": 76613562,
      "direccion": "Av. general campero",
      "fechaNacimiento": "9/30/1998",
      "nombre": "Carlos Mauricio",
      "numeroCarnetIdentidad": "9844068",
      "sexo": "masculino",
      "timestamp": 1535558609182
    },
    {
      "id": "yhpxqDQ52bkcm5grJJhS",
      "apellidoMaterno": ".",
      "apellidoPaterno": "Sebstian",
      "celular": 63529641,
      "direccion": "Av.clarancita B/clorocuta",
      "fechaNacimiento": "8/25/2000",
      "nombre": "Aguada Luis",
      "numeroCarnetIdentidad": ".",
      "sexo": "masculino",
      "timestamp": 1535558609183
    },
    {
      "id": "MFdUXzdkHqIsA5zejWSH",
      "apellidoMaterno": "Noe",
      "apellidoPaterno": "Rojas",
      "celular": 61345546,
      "direccion": "8º anilla cambodromo",
      "fechaNacimiento": "10/7/2000",
      "nombre": "Ricardo",
      "numeroCarnetIdentidad": "14929750",
      "sexo": "masculino",
      "timestamp": 1535558609184
    },
    {
      "id": "wgw32mVd8uZy3BKvdP1F",
      "apellidoMaterno": "Zurita",
      "apellidoPaterno": "Arancibia",
      "celular": 67749863,
      "direccion": "B/mira flores C/lidios",
      "fechaNacimiento": "6/15/1995",
      "nombre": "Milton",
      "numeroCarnetIdentidad": "9028915",
      "sexo": "masculino",
      "timestamp": 1535558609184
    },
    {
      "id": "OqTpLWaZKDI9eUnrSKHw",
      "apellidoMaterno": "Bailada",
      "apellidoPaterno": "Solano",
      "celular": 69040149,
      "direccion": "Zona los lotes  B/ plan 4000",
      "fechaNacimiento": "5/27/2000",
      "nombre": "Luz Nela",
      "numeroCarnetIdentidad": "13635671",
      "sexo": "femenino",
      "timestamp": 1535558609185
    },
    {
      "id": "exaK2Rf4llSmWlfzZCgC",
      "apellidoMaterno": "Mirabal",
      "apellidoPaterno": "Guzman",
      "celular": 74652697,
      "direccion": "Av. virgen de cotoca B/ el dorado",
      "fechaNacimiento": "11/13/1998",
      "nombre": "Elias Pablo",
      "numeroCarnetIdentidad": "14807004",
      "sexo": "masculino",
      "timestamp": 1535558609185
    },
    {
      "id": "MHufMgvmkTXSPFzJTmfa",
      "apellidoMaterno": "Arauz",
      "apellidoPaterno": "Zabala",
      "celular": 60926392,
      "direccion": "Portachuelo",
      "fechaNacimiento": "2/5/1997",
      "nombre": "Yeisson",
      "numeroCarnetIdentidad": "8240402 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609186
    },
    {
      "id": "UC8eVNt6hxLPnHlKeMNE",
      "apellidoMaterno": "Rocha",
      "apellidoPaterno": "Gil",
      "celular": 68799846,
      "direccion": "4º anillo doble via a la guardia",
      "fechaNacimiento": "11/17/2001",
      "nombre": "Isaac Samuel",
      "numeroCarnetIdentidad": "12508203",
      "sexo": "masculino",
      "timestamp": 1535558609186
    },
    {
      "id": "VyvysSlumdnuMj5fiuN9",
      "apellidoMaterno": "Nouro",
      "apellidoPaterno": "Yua",
      "celular": 65024929,
      "direccion": "Av. rollito  B/ jausi",
      "fechaNacimiento": "3/28/1999",
      "nombre": "Juan Pablo",
      "numeroCarnetIdentidad": "14771571",
      "sexo": "masculino",
      "timestamp": 1535558609187
    },
    {
      "id": "5aoyYJFEZ8ylbb3tugya",
      "apellidoMaterno": "Pedraza",
      "apellidoPaterno": "Martinez",
      "celular": 65949438,
      "direccion": "Zona plan 3000  la campana",
      "fechaNacimiento": "4/20/2000",
      "nombre": "Miguel",
      "numeroCarnetIdentidad": "6383502",
      "sexo": "masculino",
      "timestamp": 1535558609188
    },
    {
      "id": "8BuLAmbTzlhE65S2BdId",
      "apellidoMaterno": "Choquez",
      "apellidoPaterno": "Carlo",
      "celular": 78069435,
      "direccion": "Villa 1º de mayo  B/ los totaises C/jasmine",
      "fechaNacimiento": "8/26/1996",
      "nombre": "Adalid",
      "numeroCarnetIdentidad": "12418104",
      "sexo": "masculino",
      "timestamp": 1535558609188
    },
    {
      "id": "DlAc4urFHJd47Lw6J86o",
      "apellidoMaterno": "Ssejas",
      "apellidoPaterno": "Fernandez",
      "celular": 78510831,
      "direccion": "Radial 17 1/2 entre 4º y 5º anillo B/ los bosques",
      "fechaNacimiento": "3/20/2000",
      "nombre": "Luis Fernando",
      "numeroCarnetIdentidad": "12383089",
      "sexo": "masculino",
      "timestamp": 1535558609189
    },
    {
      "id": "QPSCxsuCTwUg931b7zVi",
      "apellidoMaterno": "Carrasco",
      "apellidoPaterno": "Muñez",
      "celular": 61514485,
      "direccion": "Plan 3000  B/ san antonio",
      "fechaNacimiento": "5/29/2001",
      "nombre": "Pedro",
      "numeroCarnetIdentidad": "9692494 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609189
    },
    {
      "id": "Ro856e7VdR1Fmu2x1a8F",
      "apellidoMaterno": "Arias",
      "apellidoPaterno": "Vidal",
      "celular": 69056995,
      "direccion": "Av. jebecheru  B/ 24 de julio",
      "fechaNacimiento": "2/22/1999",
      "nombre": "Henry",
      "numeroCarnetIdentidad": "8188045 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609190
    },
    {
      "id": "2WX9lhAVqxIBkN3WXh70",
      "apellidoMaterno": "Vaca",
      "apellidoPaterno": "Torrico",
      "celular": 78502061,
      "direccion": "Prolongacion san pablo C/ cecilio chavez",
      "fechaNacimiento": "5/1/2000",
      "nombre": "Jose Gabriel",
      "numeroCarnetIdentidad": "7747263",
      "sexo": "masculino",
      "timestamp": 1535558609191
    },
    {
      "id": "Dl9VZFpaFIQUSW33Ocz7",
      "apellidoMaterno": "Condori",
      "apellidoPaterno": "Cruz",
      "celular": 69163976,
      "direccion": "KM-6 doble via a la guardia",
      "fechaNacimiento": "1/16/1997",
      "nombre": "Junior",
      "numeroCarnetIdentidad": "12919033 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609192
    },
    {
      "id": "Jjukd4TirLoh6uDeMbTN",
      "apellidoMaterno": "Morales",
      "apellidoPaterno": "Antelo",
      "celular": 78048524,
      "direccion": "KM-9  B/ los piyos",
      "fechaNacimiento": "5/27/1999",
      "nombre": "Luis Carlos",
      "numeroCarnetIdentidad": "12790257 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609192
    },
    {
      "id": "x81brNvIudmcsypHjaoB",
      "apellidoMaterno": "Chacuiry",
      "apellidoPaterno": "Trujillo",
      "celular": 70926880,
      "direccion": "Av. virgen de lugan  8º anillo",
      "fechaNacimiento": "12/6/2001",
      "nombre": "Josue",
      "numeroCarnetIdentidad": "9704223 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609192
    },
    {
      "id": "fBzaILGJBJVT9L8qKIiV",
      "apellidoMaterno": "Quispe",
      "apellidoPaterno": "Fernandez",
      "celular": 73123812,
      "direccion": "4º anillo radial  17 1/2   B/ oriente petrolero",
      "fechaNacimiento": "11/24/2001",
      "nombre": "Nayerlin Patricia",
      "numeroCarnetIdentidad": "12504931 SC.",
      "sexo": "femenino",
      "timestamp": 1535558609194
    },
    {
      "id": "hYr5cUnYq5jLRHXID0M2",
      "apellidoMaterno": "Chipana",
      "apellidoPaterno": "Ticona",
      "celular": 709123620,
      "direccion": "Urb/ el quior",
      "fechaNacimiento": "2/28/1999",
      "nombre": "Jose Alejandro",
      "numeroCarnetIdentidad": "9008429 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609194
    },
    {
      "id": "71EkEfoD8o4BKUHE7UYs",
      "apellidoMaterno": "Menacho",
      "apellidoPaterno": "Terrazas",
      "celular": 77807768,
      "direccion": "Zona plan 3000  C/ 7 de julio",
      "fechaNacimiento": "2/28/2000",
      "nombre": "Fernanda",
      "numeroCarnetIdentidad": "13541780",
      "sexo": "femenino",
      "timestamp": 1535558609195
    },
    {
      "id": "A8ufLOcHesesBl5XfErf",
      "apellidoMaterno": "Chavez",
      "apellidoPaterno": "Rocha",
      "celular": 77048959,
      "direccion": "3º anillo Av. alemana",
      "fechaNacimiento": "9/17/2001",
      "nombre": "Veronica",
      "numeroCarnetIdentidad": "13111008",
      "sexo": "femenino",
      "timestamp": 1535558609195
    },
    {
      "id": "XRZzubd1JCaeG8NK3Ytb",
      "apellidoMaterno": "Vaca",
      "apellidoPaterno": "Zarate",
      "celular": 79011750,
      "direccion": "Zona plan 3000  Urb/ el recreo",
      "fechaNacimiento": "8/17/1993",
      "nombre": "Alvaro",
      "numeroCarnetIdentidad": "9798672",
      "sexo": "masculino",
      "timestamp": 1535558609196
    },
    {
      "id": "x3mQnQp7PNCct1E3x6ik",
      "apellidoMaterno": "Calderon",
      "apellidoPaterno": "Apaza",
      "celular": 61315183,
      "direccion": "B/ jenecheru  calle 1",
      "fechaNacimiento": "8/11/2000",
      "nombre": "Gustavo",
      "numeroCarnetIdentidad": "8236847 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609196
    },
    {
      "id": "GpZLzUrhvWXJsGyF1Chi",
      "apellidoMaterno": "Rojas",
      "apellidoPaterno": "Guzman",
      "celular": 60862179,
      "direccion": "B/ espinalito  C/ tarija",
      "fechaNacimiento": "8/13/1996",
      "nombre": "Franklin",
      "numeroCarnetIdentidad": "14474944",
      "sexo": "masculino",
      "timestamp": 1535558609198
    },
    {
      "id": "lqmFK7T4mHo1anxWGopo",
      "apellidoMaterno": "Mendez",
      "apellidoPaterno": "Gutierrez",
      "celular": 77019817,
      "direccion": "Urb/ el palmar  C/ villaruel  #-8",
      "fechaNacimiento": "4/3/1998",
      "nombre": "Bruno Sebastian",
      "numeroCarnetIdentidad": "7808546 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609198
    },
    {
      "id": "HKn8TOXN6fMZa93qFuMb",
      "apellidoMaterno": "Alegria",
      "apellidoPaterno": "Mamani",
      "celular": 755509307,
      "direccion": "8º anillo  B/ virgen de guadalupe",
      "fechaNacimiento": "6/20/2001",
      "nombre": "Vania",
      "numeroCarnetIdentidad": "13302635",
      "sexo": "femenino",
      "timestamp": 1535558609199
    },
    {
      "id": "tRMeq3qmDc8DVPzP2sqv",
      "apellidoMaterno": "Salvatierra",
      "apellidoPaterno": "Scheidel",
      "celular": 77384683,
      "direccion": "KM- 8 1/2  doble via la giardia  plaza mayor",
      "fechaNacimiento": "9/14/2000",
      "nombre": "Christian",
      "numeroCarnetIdentidad": "15032135",
      "sexo": "masculino",
      "timestamp": 1535558609199
    },
    {
      "id": "4e8jrEGnipzcY7cXbOGp",
      "apellidoMaterno": "Maturno",
      "apellidoPaterno": "Velarde",
      "celular": 79040120,
      "direccion": "B/ guapuro II  Z/ villa 1º de mayo",
      "fechaNacimiento": "10/1/2000",
      "nombre": "Angel Arturo",
      "numeroCarnetIdentidad": "13899991 SC",
      "sexo": "masculino",
      "timestamp": 1535558609200
    },
    {
      "id": "BnBVx0P8ete9wrb9gjxW",
      "apellidoMaterno": "Alvarado",
      "apellidoPaterno": "Mamani",
      "celular": 75365212,
      "direccion": "4º anillo santos dumon  B/ simon bolivar",
      "fechaNacimiento": "11/28/2000",
      "nombre": "Cesar Luis",
      "numeroCarnetIdentidad": "9006042 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609200
    },
    {
      "id": "NMvuDU83qRFMh4wryweE",
      "apellidoMaterno": "Salazar",
      "apellidoPaterno": "Campos",
      "celular": 7463767,
      "direccion": "8º anillo cambodromo",
      "fechaNacimiento": "11/18/1998",
      "nombre": "Gabriel Benjamin",
      "numeroCarnetIdentidad": "12384239 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609201
    },
    {
      "id": "1y8vSCNwk11EAQjUgRzB",
      "apellidoMaterno": "Gutierrez",
      "apellidoPaterno": "Avalos",
      "celular": 69215777,
      "direccion": "Av. virgen de lujan B/ 10 de octubre",
      "fechaNacimiento": "7/3/2000",
      "nombre": "Luis Fernando",
      "numeroCarnetIdentidad": "14474942 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609202
    },
    {
      "id": "KZKKgvpG11yIb4ULmT6k",
      "apellidoMaterno": "Paz",
      "apellidoPaterno": "Viera",
      "celular": 69018339,
      "direccion": "Zona los lotes  B/ triunfo",
      "fechaNacimiento": "11/29/1998",
      "nombre": "Karen",
      "numeroCarnetIdentidad": "8246337",
      "sexo": "femenino",
      "timestamp": 1535558609203
    },
    {
      "id": "Pi6cBGJdBlww8gieyWWN",
      "apellidoMaterno": "Yucra",
      "apellidoPaterno": "Zambrana",
      "celular": 61522682,
      "direccion": "Av. banzer 6º anillo B/ bella vista",
      "fechaNacimiento": "5/7/2001",
      "nombre": "Jhann Felix",
      "numeroCarnetIdentidad": ".",
      "sexo": "masculino",
      "timestamp": 1535558609203
    },
    {
      "id": "WTWW6WikIndEEv3zQS2B",
      "apellidoMaterno": "Rios",
      "apellidoPaterno": "Avalos",
      "celular": 75597555,
      "direccion": "5º anillo  B/ flamingo",
      "fechaNacimiento": "5/8/2001",
      "nombre": "Ariel",
      "numeroCarnetIdentidad": "16919405",
      "sexo": "masculino",
      "timestamp": 1535558609204
    },
    {
      "id": "GDQEQS81k4ow8lBnI3ZT",
      "apellidoMaterno": "Cesari",
      "apellidoPaterno": "Vaca",
      "celular": 79844401,
      "direccion": "8º anillo Virgen de cotoca",
      "fechaNacimiento": "1/28/1993",
      "nombre": "Jesus Antonio",
      "numeroCarnetIdentidad": "9580166 Sc",
      "sexo": "masculino",
      "timestamp": 1535558609205
    },
    {
      "id": "qTn7AHA0gbS2YgdD2J2U",
      "apellidoMaterno": "Lumbarde",
      "apellidoPaterno": "Prado",
      "celular": 77096189,
      "direccion": "Av. nuevo palvar  santos dumon",
      "fechaNacimiento": "9/10/2000",
      "nombre": "Carlos Yoel",
      "numeroCarnetIdentidad": "12886273 SC",
      "sexo": "masculino",
      "timestamp": 1535558609205
    },
    {
      "id": "gbciqaFyYqKdssJXimrE",
      "apellidoMaterno": "Victoria",
      "apellidoPaterno": "Herrera",
      "celular": 61518604,
      "direccion": "Volla amboro  B/ amboro",
      "fechaNacimiento": "4/14/1998",
      "nombre": "Carlin Remberto",
      "numeroCarnetIdentidad": "7474498 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609206
    },
    {
      "id": "s8vBYgLVwR8NaIa6licG",
      "apellidoMaterno": "Herrera",
      "apellidoPaterno": "LLevera",
      "celular": 77097424,
      "direccion": "Plan 3000  guapuru I",
      "fechaNacimiento": "9/11/2000",
      "nombre": "Cristian Brayan",
      "numeroCarnetIdentidad": ".",
      "sexo": "masculino",
      "timestamp": 1535558609206
    },
    {
      "id": "RucaCmzfSSpm03Twck31",
      "apellidoMaterno": "Torrez",
      "apellidoPaterno": "Masay",
      "celular": 75348101,
      "direccion": "Av. suares arana  C/ santiago ortiz",
      "fechaNacimiento": "8/28/1999",
      "nombre": "Agustin Alejandro",
      "numeroCarnetIdentidad": "9689609 SC",
      "sexo": "masculino",
      "timestamp": 1535558609207
    },
    {
      "id": "lHjfjEUlgpoVjRCdisTx",
      "apellidoMaterno": "Velasquez",
      "apellidoPaterno": "Roquez",
      "celular": 76066254,
      "direccion": "B/ la colorada C/ san juan",
      "fechaNacimiento": "4/30/2000",
      "nombre": "Jhonatan Carlos",
      "numeroCarnetIdentidad": "8949671 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609208
    },
    {
      "id": "u9FNnaGr8krjFZeKPQnY",
      "apellidoMaterno": "Palacios",
      "apellidoPaterno": "Zabala",
      "celular": 78169512,
      "direccion": "KM-8 1/2  B/ santiesteban",
      "fechaNacimiento": "5/24/1999",
      "nombre": "Diego",
      "numeroCarnetIdentidad": "10393816",
      "sexo": "masculino",
      "timestamp": 1535558609208
    },
    {
      "id": "MSUDaUoHh1aKD0sdOFN5",
      "apellidoMaterno": "Correon",
      "apellidoPaterno": "Rivero",
      "celular": 77054941,
      "direccion": "Av. el palmar zona los lotes",
      "fechaNacimiento": "10/11/2001",
      "nombre": "Nayra Luana",
      "numeroCarnetIdentidad": "12794161 SC.",
      "sexo": "femenino",
      "timestamp": 1535558609209
    },
    {
      "id": "NOxEUor2Gkue3revejPG",
      "apellidoMaterno": "Arriaga",
      "apellidoPaterno": "Soliz",
      "celular": 60029956,
      "direccion": "KM-8 1/2 B/ guapilo Carretera  cotoca",
      "fechaNacimiento": "2/21/2001",
      "nombre": "Yoan Francisco",
      "numeroCarnetIdentidad": ".",
      "sexo": "masculino",
      "timestamp": 1535558609210
    },
    {
      "id": "gs2VCt5o84XfwlZcigKA",
      "apellidoMaterno": "Arrieta",
      "apellidoPaterno": "Dias",
      "celular": 75068479,
      "direccion": "B/ el bateon C/ 16 de julio",
      "fechaNacimiento": "11/5/2000",
      "nombre": "Nataly",
      "numeroCarnetIdentidad": ".",
      "sexo": "femenino",
      "timestamp": 1535558609210
    },
    {
      "id": "roVU3fdK0JVIKNGA5w9K",
      "apellidoMaterno": "Arias",
      "apellidoPaterno": "Montres",
      "celular": 75076419,
      "direccion": "El palmar del oratorio",
      "fechaNacimiento": "6/11/2000",
      "nombre": "Ricardo",
      "numeroCarnetIdentidad": ".",
      "sexo": "masculino",
      "timestamp": 1535558609210
    },
    {
      "id": "BsMJgqhcgDTfi2aXhS8q",
      "apellidoMaterno": "Mamani",
      "apellidoPaterno": "Nuñes",
      "celular": 75098201,
      "direccion": "Plan 4000",
      "fechaNacimiento": "9/16/1999",
      "nombre": "Grover Orlando",
      "numeroCarnetIdentidad": "13979346 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609211
    },
    {
      "id": "UpkyhBz1ntQRn4GwGoGc",
      "apellidoMaterno": "Chavez",
      "apellidoPaterno": "Colque",
      "celular": 73374747,
      "direccion": "Villa 1º de mayo",
      "fechaNacimiento": "4/18/1991",
      "nombre": "Fabiola",
      "numeroCarnetIdentidad": "4920264 LP.",
      "sexo": "femenino",
      "timestamp": 1535558609213
    },
    {
      "id": "IXmxuiXN7BFMFx3o4nnx",
      "apellidoMaterno": "de La Fuente",
      "apellidoPaterno": "Choque",
      "celular": 67839003,
      "direccion": "Av. el arroyito  B/ tatu",
      "fechaNacimiento": "4/25/1998",
      "nombre": "Oliver",
      "numeroCarnetIdentidad": "12790786 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609214
    },
    {
      "id": "o68i31okCF0g02FzWUZN",
      "apellidoMaterno": "Hitari",
      "apellidoPaterno": "Rodriguez",
      "celular": 75697729,
      "direccion": "Plan 3000",
      "fechaNacimiento": "3/5/2000",
      "nombre": "Jhoan Sevastian",
      "numeroCarnetIdentidad": "9781224",
      "sexo": "masculino",
      "timestamp": 1535558609214
    },
    {
      "id": "hxjawYJPyG2yepcSHsp2",
      "apellidoMaterno": "Araquipa",
      "apellidoPaterno": "Mariscal",
      "celular": 75097987,
      "direccion": "Radial 27  C/ monseñor belardino",
      "fechaNacimiento": "8/17/1994",
      "nombre": "Jose Moises",
      "numeroCarnetIdentidad": "9754096 SC",
      "sexo": "masculino",
      "timestamp": 1535558609215
    },
    {
      "id": "r5QrZFsW1p20JuQg9vUa",
      "apellidoMaterno": "Mamani",
      "apellidoPaterno": "Machaca",
      "celular": 78141512,
      "direccion": "9º anillo parada linea 11",
      "fechaNacimiento": "1/25/1999",
      "nombre": "Cristian Roger",
      "numeroCarnetIdentidad": "..",
      "sexo": "masculino",
      "timestamp": 1535558609216
    },
    {
      "id": "xTmugVHoMozTpxvl6jhs",
      "apellidoMaterno": "Viruez",
      "apellidoPaterno": "Torrez",
      "celular": 75530983,
      "direccion": "Av. Moscu B/Tierra Nueva",
      "fechaNacimiento": "9/27/2001",
      "nombre": "Yenifer",
      "numeroCarnetIdentidad": "12790745 SC",
      "sexo": "femenino",
      "timestamp": 1535558609216
    },
    {
      "id": "tuv8Y8pswVKlvTb5mo88",
      "apellidoMaterno": "Crispin",
      "apellidoPaterno": "Viamonte",
      "celular": 78508636,
      "direccion": "Villa 1º de Mayo C/11 Nº 502",
      "fechaNacimiento": "8/23/1984",
      "nombre": "Wendy",
      "numeroCarnetIdentidad": "6281513 SC",
      "sexo": "femenino",
      "timestamp": 1535558609217
    },
    {
      "id": "SjioC0q1Y7jKu63fdw9e",
      "apellidoMaterno": "Soraire",
      "apellidoPaterno": "Cardenas",
      "celular": 77608172,
      "direccion": "Av. Paragua/3º y 4º Anillo",
      "fechaNacimiento": "8/24/2001",
      "nombre": "Nelson Alain",
      "numeroCarnetIdentidad": "9707383",
      "sexo": "masculino",
      "timestamp": 1535558609218
    },
    {
      "id": "VixaHgd1lZ5YddNluNIJ",
      "apellidoMaterno": "Añez",
      "apellidoPaterno": "Racua",
      "celular": 77356442,
      "direccion": "8º Anillo Virgen de Cotoca",
      "fechaNacimiento": "1/5/2001",
      "nombre": "Kevin Luis",
      "numeroCarnetIdentidad": "8958396 SC",
      "sexo": "masculino",
      "timestamp": 1535558609218
    },
    {
      "id": "hjXhjycmn72TF95RwjE3",
      "apellidoMaterno": "Ramirez",
      "apellidoPaterno": "Flores",
      "celular": 78023516,
      "direccion": "B/El Dorado Norte",
      "fechaNacimiento": "7/16/2001",
      "nombre": "Carlo Francisco",
      "numeroCarnetIdentidad": "..",
      "sexo": "masculino",
      "timestamp": 1535558609218
    },
    {
      "id": "Jy2k3U8B4rYBQYE9yZ50",
      "apellidoMaterno": "Quispe",
      "apellidoPaterno": "Sierra",
      "celular": 69037793,
      "direccion": "B/La Colorada C/Alma Cruceña",
      "fechaNacimiento": "9/17/2001",
      "nombre": "Cristofer Marvin",
      "numeroCarnetIdentidad": "14994444",
      "sexo": "masculino",
      "timestamp": 1535558609219
    },
    {
      "id": "ih28XEKoIq0m2QvotTQW",
      "apellidoMaterno": "Rodriguez",
      "apellidoPaterno": "Aguanta",
      "celular": 76081696,
      "direccion": "Av. che guevara  3 pasos al frente",
      "fechaNacimiento": "8/24/2000",
      "nombre": "Leonardo",
      "numeroCarnetIdentidad": "14253045 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609220
    },
    {
      "id": "xILlfxJHC27nW1RzQJ2l",
      "apellidoMaterno": "vallejos",
      "apellidoPaterno": "Sandoval",
      "celular": 69169387,
      "direccion": "Zona los lotes  B/ loma alta",
      "fechaNacimiento": "7/27/2000",
      "nombre": "Carlos Daniel",
      "numeroCarnetIdentidad": "14990532 Sc.",
      "sexo": "masculino",
      "timestamp": 1535558609220
    },
    {
      "id": "AcJpG1SbdSwjcm0tYFpt",
      "apellidoMaterno": "Chambi",
      "apellidoPaterno": "Paye",
      "celular": 77392476,
      "direccion": "Zona plan 3000  B/ cabo pal  C/ brasil",
      "fechaNacimiento": "1/2/2002",
      "nombre": "David Dennis",
      "numeroCarnetIdentidad": "14707540 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609221
    },
    {
      "id": "UHf9AqNxkDODhBrZyvWI",
      "apellidoMaterno": "Gonzales",
      "apellidoPaterno": "Zeballos",
      "celular": 75322495,
      "direccion": "B/ brijida  C/ 6",
      "fechaNacimiento": "7/7/2000",
      "nombre": "Jose Luis",
      "numeroCarnetIdentidad": "8981709",
      "sexo": "masculino",
      "timestamp": 1535558609221
    },
    {
      "id": "9mpoFB3c3WgLBgjNNbnb",
      "apellidoMaterno": "Yopie",
      "apellidoPaterno": "Alaniz",
      "celular": 70442974,
      "direccion": "B/  libertas",
      "fechaNacimiento": "6/21/2000",
      "nombre": "Christs Aalexander",
      "numeroCarnetIdentidad": "..",
      "sexo": "masculino",
      "timestamp": 1535558609222
    },
    {
      "id": "OF89In2aMjLnSrSoXWCC",
      "apellidoMaterno": "Serrano",
      "apellidoPaterno": "Cabrera",
      "celular": 76895673,
      "direccion": "B/ jhonny fernandes",
      "fechaNacimiento": "1/31/2000",
      "nombre": "Oliver",
      "numeroCarnetIdentidad": "9031759",
      "sexo": "masculino",
      "timestamp": 1535558609223
    },
    {
      "id": "FWwtZrBHALOtySBOncWR",
      "apellidoMaterno": "Camacho",
      "apellidoPaterno": "Miranda",
      "celular": 78414232,
      "direccion": "Av. paurito  B/ santa carla",
      "fechaNacimiento": "3/3/1997",
      "nombre": "Jose Enrrique",
      "numeroCarnetIdentidad": "9038283 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609224
    },
    {
      "id": "UYUHSrreKvNd3aoZ9M8t",
      "apellidoMaterno": "Suerez",
      "apellidoPaterno": "Cortez",
      "celular": 77014943,
      "direccion": "B/ ferbo  C 31 de agosto  #5030",
      "fechaNacimiento": "11/29/1999",
      "nombre": "Ardhison Humberto",
      "numeroCarnetIdentidad": "12414346 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609224
    },
    {
      "id": "51lZHddl60ZeW2BfcUKz",
      "apellidoMaterno": "Copa",
      "apellidoPaterno": "Bartolome",
      "celular": 75553752,
      "direccion": "Km-14 doble via la guardia",
      "fechaNacimiento": "3/16/1996",
      "nombre": "Abel",
      "numeroCarnetIdentidad": "9780669 Sc.",
      "sexo": "masculino",
      "timestamp": 1535558609225
    },
    {
      "id": "Gopdh4zOFz8o6d1n1Px9",
      "apellidoMaterno": "Sarniento",
      "apellidoPaterno": "Chipana",
      "celular": 75613324,
      "direccion": "B/ san silvestre",
      "fechaNacimiento": "1/20/1998",
      "nombre": "Johnny",
      "numeroCarnetIdentidad": "11309262 SC",
      "sexo": "masculino",
      "timestamp": 1535558609225
    },
    {
      "id": "oFjJioPTxSHWbzEYn7rz",
      "apellidoMaterno": "Rebera",
      "apellidoPaterno": "Menacho",
      "celular": 76680562,
      "direccion": "KM-8  1/2 B/ el vallesito  doblñe via la giardia",
      "fechaNacimiento": "7/25/2000",
      "nombre": "Andreson",
      "numeroCarnetIdentidad": "8221674 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609225
    },
    {
      "id": "QABLRVOnQUyd7U5FnsD5",
      "apellidoMaterno": "Tacoo",
      "apellidoPaterno": "Saavedra",
      "celular": 77372947,
      "direccion": "B/ dorado C/ riveralta  #-88",
      "fechaNacimiento": "2/3/1998",
      "nombre": "Miguel Antonio",
      "numeroCarnetIdentidad": "8115377",
      "sexo": "masculino",
      "timestamp": 1535558609226
    },
    {
      "id": "WiUK0aA7w3jBF2aKB39Y",
      "apellidoMaterno": "Cortez",
      "apellidoPaterno": "Villafuerte",
      "celular": 69088206,
      "direccion": "B/ navidad zona norte  C/ 5",
      "fechaNacimiento": "5/20/2000",
      "nombre": "Brandon Ramiros",
      "numeroCarnetIdentidad": "7712288 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609226
    },
    {
      "id": "IyNyB8ruj5HSeJS7XDY5",
      "apellidoMaterno": "Rico",
      "apellidoPaterno": "Suarez",
      "celular": 77802745,
      "direccion": "Plan 3000  Av. libertadores  B/ juana asurdui",
      "fechaNacimiento": "12/3/2000",
      "nombre": "neysa",
      "numeroCarnetIdentidad": "9681394 SC.",
      "sexo": "femenino",
      "timestamp": 1535558609227
    },
    {
      "id": "w4pk7SXbsaLjjOFwzKnj",
      "apellidoMaterno": "Pedraza",
      "apellidoPaterno": "Carvalho",
      "celular": 75576976,
      "direccion": "5º anillo santos dumon",
      "fechaNacimiento": "1/7/2000",
      "nombre": "Carlos Enrique",
      "numeroCarnetIdentidad": "7678968",
      "sexo": "masculino",
      "timestamp": 1535558609227
    },
    {
      "id": "tSq1BPOmTNkjI646nFTR",
      "apellidoMaterno": "Villarruel",
      "apellidoPaterno": "Flores",
      "celular": 72601121,
      "direccion": "av alemana 8º anillo",
      "fechaNacimiento": "7/28/1998",
      "nombre": "Edwin",
      "numeroCarnetIdentidad": "11301732 SC",
      "sexo": "masculino",
      "timestamp": 1535558609228
    },
    {
      "id": "URoeOBhyiA8qyvLImA9j",
      "apellidoMaterno": "Chavez",
      "apellidoPaterno": "Chongara",
      "celular": 65034723,
      "direccion": "Av. virgen de lujan  B/ san jorge",
      "fechaNacimiento": "3/5/1997",
      "nombre": "Gelen Dalma",
      "numeroCarnetIdentidad": "12858835 SC.",
      "sexo": "femenino",
      "timestamp": 1535558609229
    },
    {
      "id": "jqYk8TdjFaBC42Uro1Kz",
      "apellidoMaterno": "Padilla",
      "apellidoPaterno": "Espindola",
      "celular": 73168061,
      "direccion": "KM-15 doble via la guardia",
      "fechaNacimiento": "3/24/1997",
      "nombre": "Jhosxinilda",
      "numeroCarnetIdentidad": "9597093",
      "sexo": "femenino",
      "timestamp": 1535558609229
    },
    {
      "id": "05CRxxF1z8YIX1pLwwMK",
      "apellidoMaterno": "Amurrio",
      "apellidoPaterno": "Zabalaga",
      "celular": 75055512,
      "direccion": "C/ 11 sur  B/ el quior plan 3000",
      "fechaNacimiento": "12/10/1999",
      "nombre": "Nestor Bryan",
      "numeroCarnetIdentidad": "12949269",
      "sexo": "masculino",
      "timestamp": 1535558609230
    },
    {
      "id": "BsIsCuJVcOtr5HSA1QsX",
      "apellidoMaterno": "Laura",
      "apellidoPaterno": "Mullisaca",
      "celular": 68800006,
      "direccion": "Zona los lotes Av. palmar",
      "fechaNacimiento": "5/12/1994",
      "nombre": "Jaime",
      "numeroCarnetIdentidad": "9726245 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609230
    },
    {
      "id": "Gy5od3ejopa3wBrSnKE5",
      "apellidoMaterno": "Guasoma",
      "apellidoPaterno": "Urachianta",
      "celular": 75055951,
      "direccion": "Zona sur  Av. el paraiso  B/ amboro 2",
      "fechaNacimiento": "3/6/1995",
      "nombre": "Brayan",
      "numeroCarnetIdentidad": "11340173 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609231
    },
    {
      "id": "XFFaaC0tgwQ0MOj13fQy",
      "apellidoMaterno": "Romero",
      "apellidoPaterno": "Galvis",
      "celular": 75562926,
      "direccion": "6º anillo Av. moscu",
      "fechaNacimiento": "4/14/2000",
      "nombre": "Brayan",
      "numeroCarnetIdentidad": "14503796 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609231
    },
    {
      "id": "mveKO1KNYFJex3B6X5tI",
      "apellidoMaterno": "Cusipuma",
      "apellidoPaterno": "Choque",
      "celular": 78166595,
      "direccion": "Av. moscu B/ 30 de agosto",
      "fechaNacimiento": "8/5/1999",
      "nombre": "Vladimir",
      "numeroCarnetIdentidad": "7837817 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609231
    },
    {
      "id": "1ZExVA3zPhLOolQAWsih",
      "apellidoMaterno": "Condori",
      "apellidoPaterno": "Flores",
      "celular": 70029551,
      "direccion": "Av. virgen de lujan B/ carmen II",
      "fechaNacimiento": "6/30/2000",
      "nombre": "David",
      "numeroCarnetIdentidad": "8529465 SC",
      "sexo": "masculino",
      "timestamp": 1535558609232
    },
    {
      "id": "1nh3UHCodUANujFdTtdy",
      "apellidoMaterno": "Rosel",
      "apellidoPaterno": "Montaño",
      "celular": 75088693,
      "direccion": "B/ villa warnes C/ favian vaca chavez",
      "fechaNacimiento": "9/15/1997",
      "nombre": "Victor Hugo",
      "numeroCarnetIdentidad": "13603087",
      "sexo": "masculino",
      "timestamp": 1535558609233
    },
    {
      "id": "5CyKLysGjrjlmagyBPQY",
      "apellidoMaterno": "Mamani",
      "apellidoPaterno": "Guarachi",
      "celular": 79160280,
      "direccion": "Av. 3 pasos al frente B/ german alcoba",
      "fechaNacimiento": "10/28/1999",
      "nombre": "Kevin",
      "numeroCarnetIdentidad": "8282601 LP.",
      "sexo": "masculino",
      "timestamp": 1535558609233
    },
    {
      "id": "Ztn1Ogn6w4q6QUGiQEvD",
      "apellidoMaterno": "Medina",
      "apellidoPaterno": "Ibañez",
      "celular": 65051925,
      "direccion": "2º anillo Av beni  C/ ambaibo icushing",
      "fechaNacimiento": "2/3/2001",
      "nombre": "Carlos Nayib",
      "numeroCarnetIdentidad": "13709784",
      "sexo": "masculino",
      "timestamp": 1535558609233
    },
    {
      "id": "OtYo88ioDcs2BtsR68bF",
      "apellidoMaterno": "Paredes",
      "apellidoPaterno": "Pereira",
      "celular": 70976237,
      "direccion": "Zona moscu B/ dulce hogar",
      "fechaNacimiento": "3/27/1997",
      "nombre": "Luis Wilfredo",
      "numeroCarnetIdentidad": "8917085 SC.",
      "sexo": "masculino",
      "timestamp": 1535558609234
    },
    {
      "id": "8LfLSdguK6JWWzKuaDHa",
      "apellidoMaterno": "Padilla",
      "apellidoPaterno": "Cadima",
      "celular": 78068747,
      "direccion": "Km-13 doble via la guardia",
      "fechaNacimiento": "8/18/1998",
      "nombre": "Albert",
      "numeroCarnetIdentidad": "11366919",
      "sexo": "masculino",
      "timestamp": 1535558609235
    },
    {
      "id": "JGW8Bpmz10ij7vQ7sViH",
      "apellidoMaterno": "Lopez",
      "apellidoPaterno": "Colque",
      "celular": 78129983,
      "direccion": "Urb/ juan pablo II Uv-2  M-212  L-5",
      "fechaNacimiento": "4/17/1995",
      "nombre": "Jose",
      "numeroCarnetIdentidad": "8904959 SC",
      "sexo": "masculino",
      "timestamp": 1535558609235
    },
    {
      "id": "JwmGCyI3p9ZbTYlTO32z",
      "apellidoMaterno": "Montaño",
      "apellidoPaterno": "Alcocer",
      "celular": 75627467,
      "direccion": "5º anillo prologancion mutualista",
      "fechaNacimiento": "10/6/1994",
      "nombre": "Marco Antonio",
      "numeroCarnetIdentidad": "8791670",
      "sexo": "masculino",
      "timestamp": 1535558609235
    },
    {
      "id": "LADl9im9zvlElCdwtYiI",
      "apellidoMaterno": "Macias",
      "apellidoPaterno": "Ocampo",
      "celular": 72614296,
      "direccion": "c/freno b/rodeo del norte",
      "fechaNacimiento": "1/26/2000",
      "nombre": "Paul Huascar",
      "numeroCarnetIdentidad": "7454809 OR",
      "sexo": "masculino",
      "timestamp": 1535558609235
    },
    {
      "id": "WS3ZdPuishIcNcI7afMl",
      "apellidoMaterno": "Aguilar",
      "apellidoPaterno": "Paredez",
      "celular": 78581218,
      "direccion": "Av. paurito B/ simon bolivar  C/ 1 #-1",
      "fechaNacimiento": "4/26/1992",
      "nombre": "Israel Jesus",
      "numeroCarnetIdentidad": "8938937 SC",
      "sexo": "masculino",
      "timestamp": 1535558609236
    },
    {
      "id": "8zRk3dnSS7Deh7erMspF",
      "apellidoMaterno": "Gonzales",
      "apellidoPaterno": "Careaga",
      "celular": 75506711,
      "direccion": "Villa 1º de mayo  Av. chegevara  B/ 15 de agosto",
      "fechaNacimiento": "9/29/1998",
      "nombre": "Kevin Rafael",
      "numeroCarnetIdentidad": "14311429",
      "sexo": "masculino",
      "timestamp": 1535558609237
    },
    {
      "id": "l4bMkLnW6T7TrvxVBtJr",
      "apellidoMaterno": "Chambi",
      "apellidoPaterno": "Paye",
      "celular": 71665234,
      "direccion": "Plan 3000 el quior",
      "fechaNacimiento": "1/1/2001",
      "nombre": "Yamil Andre",
      "numeroCarnetIdentidad": "..",
      "sexo": "masculino",
      "timestamp": 1535558609237
    },
    {
      "id": "4p4KkiKnaUADnNhqt6bQ",
      "apellidoMaterno": "Equez",
      "apellidoPaterno": "Nemer",
      "celular": 76688662,
      "direccion": "Fatima 1  C/4  los lotes  nuevo palmar",
      "fechaNacimiento": "8/14/1995",
      "nombre": "Julio Cesar",
      "numeroCarnetIdentidad": "13998459 SC",
      "sexo": "masculino",
      "timestamp": 1535558609238
    },
    {
      "id": "u5SpkjSFekeXy6hQW77q",
      "apellidoMaterno": "Aponte",
      "apellidoPaterno": "Ezpindola",
      "celular": 78557347,
      "direccion": "Av. cambodromo  7º anillo",
      "fechaNacimiento": "1/25/2002",
      "nombre": "Julio Cesar",
      "numeroCarnetIdentidad": "9665014 SC",
      "sexo": "masculino",
      "timestamp": 1535558609238
    },
    {
      "id": "846qR42ttXadpPtpgMqf",
      "apellidoMaterno": "Rodriguez",
      "apellidoPaterno": "Padilla",
      "celular": 69213134,
      "direccion": "KM-7  doble via la guardia",
      "fechaNacimiento": "7/17/2000",
      "nombre": "Felix Bernabe",
      "numeroCarnetIdentidad": "8923233",
      "sexo": "masculino",
      "timestamp": 1535558609239
    },
    {
      "id": "VXClCHx12mUxFrdZmUst",
      "apellidoMaterno": "Torrico",
      "apellidoPaterno": "Guzman",
      "celular": 61520897,
      "direccion": "9152   C/ paraiso",
      "fechaNacimiento": "4/27/2001",
      "nombre": "Sebastian",
      "numeroCarnetIdentidad": "9622562",
      "sexo": "masculino",
      "timestamp": 1535558609239
    },
    {
      "id": "xG9b4PZqCMWxTkFlt6b1",
      "apellidoMaterno": "Pizarro",
      "apellidoPaterno": "Vaca",
      "celular": 60828793,
      "direccion": "Villa 1º de mayo  C/ 9  #-62",
      "fechaNacimiento": "11/24/1991",
      "nombre": "Eduardo",
      "numeroCarnetIdentidad": "9051954 SC",
      "sexo": "masculino",
      "timestamp": 1535558609239
    },
    {
      "id": "ySrjLYaFLPzaBZ8HmkXT",
      "apellidoMaterno": "Carrasco",
      "apellidoPaterno": "Barriga",
      "celular": 70447497,
      "direccion": "Los lotes  B/ ribera guerrida",
      "fechaNacimiento": "11/14/2000",
      "nombre": "Juan Miguel",
      "numeroCarnetIdentidad": "..",
      "sexo": "masculino",
      "timestamp": 1535558609240
    },
    {
      "id": "F9UZ0JTVqXZhRHEarzDs",
      "apellidoMaterno": "Arce",
      "apellidoPaterno": "Mamani",
      "celular": 79891590,
      "direccion": "Km-22 carretera norte  Zona Satelite",
      "fechaNacimiento": "6/24/1995",
      "nombre": "Marco Antonia",
      "numeroCarnetIdentidad": "8134455 sc.",
      "sexo": "masculino",
      "timestamp": 1535558609241
    },
    {
      "id": "kCwj8stvcPuhYDCv30i5",
      "apellidoMaterno": "Lazaro",
      "apellidoPaterno": "Florez",
      "celular": 78177470,
      "direccion": "B/ merchor pinto",
      "fechaNacimiento": "8/12/2000",
      "nombre": "Jhoselin",
      "numeroCarnetIdentidad": "..",
      "sexo": "femenino",
      "timestamp": 1535558609241
    },
    {
      "id": "t6eeNd1N0RkIrqQpGdNc",
      "apellidoMaterno": "guzman",
      "apellidoPaterno": "Rocha",
      "celular": 6504963,
      "direccion": "Portachuelo  C/ 24 de septiembre",
      "fechaNacimiento": "4/30/1998",
      "nombre": "David",
      "numeroCarnetIdentidad": "8205695 SC",
      "sexo": "masculino",
      "timestamp": 1535558609241
    },
    {
      "id": "yLO5pFacp6FyQYVk1pt7",
      "apellidoMaterno": "Guachalla",
      "apellidoPaterno": "Yoel",
      "celular": 76899811,
      "direccion": "B/ el trompillo C/ esteban rosa  #-211",
      "fechaNacimiento": "2/5/2001",
      "nombre": "Camilo",
      "numeroCarnetIdentidad": "6364042 CBBA",
      "sexo": "masculino",
      "timestamp": 1535558609241
    },
    {
      "id": "5BFHRKKtNqAwvgEMuhsL",
      "apellidoMaterno": "Trujillo",
      "apellidoPaterno": "Romero",
      "celular": 78515010,
      "direccion": "Plan 4.000  B/ aluchi",
      "fechaNacimiento": "3/17/1999",
      "nombre": "Jose Milto",
      "numeroCarnetIdentidad": "8151834 sc.",
      "sexo": "masculino",
      "timestamp": 1535558609242
    },
    {
      "id": "OOrySHg5xtn3jO4yPuRU",
      "apellidoMaterno": "Arancibia",
      "apellidoPaterno": "Verbo",
      "celular": 75604707,
      "direccion": "B/ los chacos",
      "fechaNacimiento": "1/6/1998",
      "nombre": "Ronaldinho",
      "numeroCarnetIdentidad": "12666601",
      "sexo": "masculino",
      "timestamp": 1535558609242
    },
    {
      "id": "OXGqtauKam2MFGQJkPrm",
      "apellidoMaterno": "Piza",
      "apellidoPaterno": "Torrico",
      "celular": 63540987,
      "direccion": "AV. vingen de cotoca  C/ papeti",
      "fechaNacimiento": "8/14/1993",
      "nombre": "Albeth",
      "numeroCarnetIdentidad": "8911178 sc.",
      "sexo": "masculino",
      "timestamp": 1535558609243
    },
    {
      "id": "fPPQS7BcGGAckliql0UL",
      "apellidoMaterno": "Chileno",
      "apellidoPaterno": "Ramos",
      "celular": 76697653,
      "direccion": "8º anillo  B/ julio leigue",
      "fechaNacimiento": "12/26/1995",
      "nombre": "Dorcas",
      "numeroCarnetIdentidad": "12474256 sc.",
      "sexo": "femenino",
      "timestamp": 1535558609243
    },
    {
      "id": "gl0MWhE2tvk7Ucil6Qng",
      "apellidoMaterno": "Martinez",
      "apellidoPaterno": "Lopez",
      "celular": 67913959,
      "direccion": "Av. virgen de lujan  B/ los claveles",
      "fechaNacimiento": "10/25/1998",
      "nombre": "Nilda",
      "numeroCarnetIdentidad": "8556489 pot.",
      "sexo": "femenino",
      "timestamp": 1535558609244
    },
    {
      "id": "qEA2UmtBRyrPKCCmrxju",
      "apellidoMaterno": "Rivero",
      "apellidoPaterno": "Vargas",
      "celular": 70855903,
      "direccion": "B/ 1º  de agosto  C/ 3",
      "fechaNacimiento": "7/31/1991",
      "nombre": "Jose Ignacio",
      "numeroCarnetIdentidad": "8232214 sc.",
      "sexo": "masculino",
      "timestamp": 1535558609244
    },
    {
      "id": "rPG6nmT4cRDjev6z1BMa",
      "apellidoMaterno": "Perez",
      "apellidoPaterno": "Tumiri",
      "celular": 69070170,
      "direccion": "Plan 3000   B/ 15 junio",
      "fechaNacimiento": "3/19/1995",
      "nombre": "Damir Juvenal",
      "numeroCarnetIdentidad": "11353432",
      "sexo": "masculino",
      "timestamp": 1535558609245
    },
    {
      "id": "RnLRMwHTGZtMI0QgTkXa",
      "apellidoMaterno": "Jimenez",
      "apellidoPaterno": "Guzman",
      "celular": 78158165,
      "direccion": "C/ barron  #459",
      "fechaNacimiento": "10/24/1990",
      "nombre": "Carlo Alejandro",
      "numeroCarnetIdentidad": "8890218 sc.",
      "sexo": "masculino",
      "timestamp": 1535558609246
    }
  ];
  


  voluntariosCollection: AngularFirestoreCollection<VoluntarioModel>;
  voluntarios: Observable<VoluntarioModel[]>;
  voluntarioDoc: AngularFirestoreDocument<VoluntarioModel>;

  voluntariosBusqueda: VoluntarioModel[];

  constructor(private afs: AngularFirestore) {
    this.voluntariosCollection = afs.collection<VoluntarioModel>("voluntarios",ref=> ref.orderBy('timestamp','desc'));
    this.voluntarios = this.voluntariosCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as VoluntarioModel;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  getPaises(): string[] {
    return paisesArray;
  }
  getDepartamentos(pais: string): string[] {
    if (pais == "Bolivia") {
      let departamentos: string[] = [];
      dataBolivia["departamentos"].forEach(element => {
        departamentos.push(element.nombreDepartamento);
      });
      return departamentos;
    }
    return [];
  }

  getProvincias(departamento: string): string[] {
    let provincias: string[] = [];
    dataBolivia["departamentos"].forEach(itemDepartamento => {
      if (itemDepartamento.nombreDepartamento == departamento) {
        if (itemDepartamento.provincias) {
          itemDepartamento.provincias.forEach(itemProvincia => {
            console.log("aqui:" + itemProvincia.nombreProvincia);
            provincias.push(itemProvincia.nombreProvincia);
          });
        }
      }
    });
    return provincias;
  }

  getCapitals(departamento: string, provincia: string): string[] {
    let capitals: string[] = [];
    dataBolivia["departamentos"].forEach(itemDepartamento => {
      if (itemDepartamento.nombreDepartamento == departamento) {
        if (itemDepartamento.provincias) {
          itemDepartamento.provincias.forEach(pro => {
            if (pro.nombreProvincia == provincia) {
              pro.capitales.forEach(ele => {
                capitals.push(ele.nombreCapital);
              });
            }
          });
        }
      }
    });
    return capitals;
  }
  getGrupoSanguineo(): any {
    return gruposSanguineos;
  }
  getMunicipios(
    departamento: string,
    provincia: string,
    capital: string
  ): string[] {
    let municipios: string[] = [];

    dataBolivia["departamentos"].forEach(itemDepartamento => {
      if (
        itemDepartamento.nombreDepartamento == departamento &&
        itemDepartamento.provincias
      ) {
        itemDepartamento.provincias.forEach(itemProvincia => {
          if (
            itemProvincia.nombreProvincia == provincia &&
            itemProvincia.capitales
          ) {
            itemProvincia.capitales.forEach(itemCapital => {
              if (
                itemCapital.nombreCapital == capital &&
                itemCapital.municipios
              ) {
                itemCapital.municipios.forEach(itemMunicipio => {
                  municipios.push(itemMunicipio.nombreMunicipio);
                });
              }
            });
          }
        });
      }
    });
    return municipios;
  }
  getSituacionLaboral(): any[] {
    return situacionLaboral;
  }

  async submitHandler(
    loading: boolean,
    success: boolean,
    voluntarioForm: FormGroup
  ) {
    loading = true;
    const formValue = voluntarioForm.value;
    try {
      await this.afs.collection("voluntarios2").add(formValue);
      success = true;
    } catch (err) {
      console.log(err);
    }
    loading = false;
  }

  getVoluntarios() {
    if (environment.production) {
      return this.voluntarios;
    }
    else return Observable.create(
      (observer:Subscriber<VoluntarioModel[]>)=>{
        observer.next(this.voluntariosLocal);
        observer.complete();
      }
    );
  }
  deleteVoluntario(id:string){
    this.afs.collection('voluntarios').doc(id).delete();
  }
}
